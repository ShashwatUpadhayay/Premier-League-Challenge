'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from '@/components/header';
import { SimulationBar } from '@/components/studio/simulation-bar';
import { FactPackPanel } from '@/components/studio/fact-pack-panel';
import { CheckGateInspector } from '@/components/studio/check-gate-inspector';
import { BroadcastOverlay } from '@/components/studio/broadcast-overlay';
import { KmiPortal } from '@/components/kmi/kmi-portal';
import { 
  CURRENT_MATCH, 
  MATCH_FACT_PACKS, 
  KMI_PANEL_RECORDS 
} from '@/lib/match-data';
import { FactPack, ExplanationDraft, CheckStepAudit, MatchEvent } from '@/lib/types';
import { Radio, Zap } from 'lucide-react';

export default function Home() {
  const [activeMode, setActiveMode] = useState<'live' | 'kmi'>('live');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [currentMinute, setCurrentMinute] = useState(68);
  const [currentSecond, setCurrentSecond] = useState(42);
  const [activeIncidentId, setActiveIncidentId] = useState<string | null>('INC_68_HANDBALL');
  
  const [factPack, setFactPack] = useState<FactPack | null>(MATCH_FACT_PACKS['INC_68_HANDBALL']);
  const [draft, setDraft] = useState<ExplanationDraft | null>(null);
  const [checkAudit, setCheckAudit] = useState<CheckStepAudit | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [recentEvents, setRecentEvents] = useState<MatchEvent[]>([]);

  const eventSourceRef = useRef<EventSource | null>(null);

  // Load and audit explanation for an incident
  const loadExplanation = useCallback(async (incidentId: string, flaw?: 'hallucinated_number' | 'invalid_id') => {
    setIsGenerating(true);
    setIsApproved(false);
    try {
      const res = await fetch('/api/generate-explanation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ incidentId, simulateFlaw: flaw })
      });
      if (res.ok) {
        const data = await res.json();
        setDraft(data.rawDraft);
        setCheckAudit(data.checkAudit);
      }
    } catch (err) {
      console.error('Failed to generate explanation', err);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  // Jump to specific incident
  const handleJumpToIncident = useCallback((incidentId: string) => {
    setActiveIncidentId(incidentId);
    const targetFactPack = MATCH_FACT_PACKS[incidentId];
    if (targetFactPack) {
      setFactPack(targetFactPack);
      setCurrentMinute(targetFactPack.minute);
      setCurrentSecond(targetFactPack.second);
      loadExplanation(incidentId);
    }
  }, [loadExplanation]);

  // Initial load on component mount (deferred to avoid cascading render lint warning)
  useEffect(() => {
    const timer = setTimeout(() => {
      loadExplanation('INC_68_HANDBALL');
    }, 0);
    return () => clearTimeout(timer);
  }, [loadExplanation]);

  // Handle SSE live match event stream
  useEffect(() => {
    if (!isPlaying) {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
        setIsStreaming(false);
      }
      return;
    }

    const sse = new EventSource(`/api/match-stream?speed=${speed}`);
    eventSourceRef.current = sse;

    sse.onopen = () => {
      setIsStreaming(true);
    };

    sse.addEventListener('match_event', (e: MessageEvent) => {
      try {
        const payload = JSON.parse(e.data);
        const event: MatchEvent = payload.event;
        setCurrentMinute(event.minute);
        setCurrentSecond(event.second);
        setRecentEvents(prev => [event, ...prev.slice(0, 4)]);

        if (event.isContested && event.incidentId && MATCH_FACT_PACKS[event.incidentId]) {
          handleJumpToIncident(event.incidentId);
        }
      } catch (err) {
        console.error('Error parsing SSE event', err);
      }
    });

    sse.addEventListener('incident_flagged', (e: MessageEvent) => {
      try {
        const payload = JSON.parse(e.data);
        if (payload.incidentId) {
          handleJumpToIncident(payload.incidentId);
        }
      } catch (err) {
        console.error('Error parsing incident event', err);
      }
    });

    sse.addEventListener('stream_end', () => {
      setIsPlaying(false);
      setIsStreaming(false);
      sse.close();
    });

    sse.onerror = () => {
      setIsStreaming(false);
    };

    return () => {
      sse.close();
      eventSourceRef.current = null;
      setIsStreaming(false);
    };
  }, [isPlaying, speed, handleJumpToIncident]);

  return (
    <div className="min-h-screen bg-[#0b0d17] text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* Premier League Official Header */}
      <Header
        match={CURRENT_MATCH}
        activeMode={activeMode}
        onModeChange={setActiveMode}
        isStreaming={isStreaming}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 flex flex-col gap-6">
        {activeMode === 'live' ? (
          <>
            {/* Live Match Simulation Controls */}
            <SimulationBar
              currentMinute={currentMinute}
              currentSecond={currentSecond}
              isPlaying={isPlaying}
              onTogglePlay={() => setIsPlaying(!isPlaying)}
              onReset={() => {
                setIsPlaying(false);
                handleJumpToIncident('INC_68_HANDBALL');
              }}
              speed={speed}
              onSpeedChange={setSpeed}
              onJumpToIncident={handleJumpToIncident}
              activeIncidentId={activeIncidentId}
            />

            {/* Live Event Feed Ticker */}
            {recentEvents.length > 0 && (
              <div className="bg-slate-950/70 border border-slate-800 rounded-lg px-3 py-2 flex items-center gap-2 overflow-x-auto text-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1 shrink-0">
                  <Zap className="w-3 h-3 text-[#00ff87]" /> Live Ticker:
                </span>
                <div className="flex items-center gap-2">
                  {recentEvents.map(evt => (
                    <div key={evt.eventId} className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 shrink-0 text-slate-300">
                      <span className="font-mono text-[#00ff87] font-semibold">{evt.minute}&apos;</span>
                      <span className="font-medium text-white">{evt.player}:</span>
                      <span className="text-slate-400">{evt.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contested Incident Alert Bar */}
            {factPack && (
              <div className="bg-gradient-to-r from-purple-950/80 via-slate-900 to-slate-950 border border-purple-500/40 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-900/60 flex items-center justify-center border border-purple-500/30">
                    <Radio className="w-4 h-4 text-[#00ff87] animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Contested Moment Triggered • Minute {factPack.minute}&apos;
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-900/60 text-purple-300 font-mono">
                        {factPack.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {factPack.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-mono">
                    Status: <strong className="text-[#00ff87] font-semibold">{factPack.finalDecision}</strong>
                  </span>
                </div>
              </div>
            )}

            {/* Studio 3-Column Workstation Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* Column 1: Ground Truth Fact Pack */}
              <FactPackPanel factPack={factPack} />

              {/* Column 2: The "Check Step" Gate & Producer Console */}
              <CheckGateInspector
                factPack={factPack}
                draft={draft}
                checkAudit={checkAudit}
                isGenerating={isGenerating}
                onGenerate={(flaw) => {
                  if (activeIncidentId) loadExplanation(activeIncidentId, flaw);
                }}
                onApproveBroadcast={() => setIsApproved(true)}
                onForceFallback={() => {
                  if (factPack) {
                    setCheckAudit(prev => prev ? { ...prev, isFallback: true, status: 'FAILED_FALLBACK' } : null);
                  }
                }}
                isApproved={isApproved}
              />

              {/* Column 3: Live Broadcast Feed & Lower-Third Graphic */}
              <BroadcastOverlay
                factPack={factPack}
                checkAudit={checkAudit}
                isApproved={isApproved}
                currentMinute={currentMinute}
                currentSecond={currentSecond}
              />
            </div>
          </>
        ) : (
          /* Mode 2: Key Match Incidents (KMI) Dossier */
          <KmiPortal records={KMI_PANEL_RECORDS} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 px-6 text-center text-xs text-slate-500">
        <p>Premier League Independent Key Match Incidents &amp; Live Explainable VAR Architecture • Hackathon Submission</p>
      </footer>
    </div>
  );
}
