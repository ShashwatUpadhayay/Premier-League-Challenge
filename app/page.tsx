'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from '@/components/header';
import { SimulationBar } from '@/components/studio/simulation-bar';
import { FactPackPanel } from '@/components/studio/fact-pack-panel';
import { CheckGateInspector } from '@/components/studio/check-gate-inspector';
import { BroadcastOverlay } from '@/components/studio/broadcast-overlay';
import { PitchVisualizer } from '@/components/studio/pitch-visualizer';
import { KmiPortal } from '@/components/kmi/kmi-portal';
import {
  CURRENT_MATCH,
  MATCH_FACT_PACKS,
  KMI_PANEL_RECORDS
} from '@/lib/match-data';
import { FactPack, ExplanationDraft, CheckStepAudit, MatchEvent } from '@/lib/types';
import { Radio, LayoutGrid } from 'lucide-react';

export default function Home() {
  const [activeMode, setActiveMode] = useState<'live' | 'kmi'>('live');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [currentMinute, setCurrentMinute] = useState(68);
  const [currentSecond, setCurrentSecond] = useState(42);
  const [activeIncidentId, setActiveIncidentId] = useState<string | null>('INC_68_HANDBALL');
  const [column3View, setColumn3View] = useState<'both' | 'pitch' | 'broadcast'>('both');

  const [factPack, setFactPack] = useState<FactPack | null>(MATCH_FACT_PACKS['INC_68_HANDBALL']);
  const [draft, setDraft] = useState<ExplanationDraft | null>(null);
  const [checkAudit, setCheckAudit] = useState<CheckStepAudit | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [recentEvents, setRecentEvents] = useState<MatchEvent[]>([]);

  const eventSourceRef = useRef<EventSource | null>(null);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      loadExplanation('INC_68_HANDBALL');
    }, 0);
    return () => clearTimeout(timer);
  }, [loadExplanation]);

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

    sse.onopen = () => setIsStreaming(true);

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
        if (payload.incidentId) handleJumpToIncident(payload.incidentId);
      } catch (err) {
        console.error('Error parsing incident event', err);
      }
    });

    sse.addEventListener('stream_end', () => {
      setIsPlaying(false);
      setIsStreaming(false);
      sse.close();
    });

    sse.onerror = () => setIsStreaming(false);

    return () => {
      sse.close();
      eventSourceRef.current = null;
      setIsStreaming(false);
    };
  }, [isPlaying, speed, handleJumpToIncident]);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans">
      <Header
        match={CURRENT_MATCH}
        activeMode={activeMode}
        onModeChange={setActiveMode}
        isStreaming={isStreaming}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-6 py-5 flex flex-col gap-4">
        {activeMode === 'live' ? (
          <>
            {/* Simulation control strip */}
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

            {/* Live match event ticker */}
            {recentEvents.length > 0 && (
              <div className="bg-[#0f172a] border border-slate-800 rounded-lg px-3 py-2 flex items-center gap-2 overflow-x-auto">
                <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1.5 shrink-0">
                  <Radio className="w-3 h-3 text-slate-600" />
                  Match Feed
                </span>
                <div className="flex items-center gap-1.5">
                  {recentEvents.map(evt => (
                    <div
                      key={evt.eventId}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800/80 shrink-0 text-xs"
                    >
                      <span className="font-mono text-slate-400 font-semibold tabular-nums">{evt.minute}&apos;</span>
                      <span className="font-medium text-slate-300">{evt.player}:</span>
                      <span className="text-slate-500">{evt.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Active contested incident summary bar */}
            {factPack && (
              <div className="bg-[#0f172a] border border-slate-800 rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-[#38003c]/80 flex items-center justify-center border border-purple-900/50 flex-shrink-0">
                    <span className="text-[10px] font-black text-white">VAR</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold text-slate-200">
                        Contested Moment — {factPack.minute}&apos;
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono border border-slate-700/50">
                        {factPack.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{factPack.description}</p>
                  </div>
                </div>
                <div className="text-xs text-slate-500">
                  Official ruling: <span className="font-semibold text-emerald-400">{factPack.finalDecision}</span>
                </div>
              </div>
            )}

            {/* Three-column workstation */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">

              {/* Column 1: Ground Truth Fact Pack */}
              <div>
                <SectionLabel label="Ground Truth" sub="Official FactPack" />
                <FactPackPanel factPack={factPack} />
              </div>

              {/* Column 2: Check Step Gate */}
              <div>
                <SectionLabel label="AI Audit" sub="Check Step Guardrail" />
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
                      setCheckAudit(prev =>
                        prev ? { ...prev, isFallback: true, status: 'FAILED_FALLBACK' } : null
                      );
                    }
                  }}
                  isApproved={isApproved}
                />
              </div>

              {/* Column 3: Visual Output */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <SectionLabel label="Visual Output" sub="Broadcast Staging" />
                  {/* Column 3 view controller */}
                  <div className="flex items-center gap-0.5 bg-slate-900/70 p-0.5 rounded-lg border border-slate-800/60 text-[10px] mb-1.5">
                    <LayoutGrid className="w-3 h-3 text-slate-600 mx-1.5" />
                    {(['both', 'pitch', 'broadcast'] as const).map(v => (
                      <button
                        key={v}
                        onClick={() => setColumn3View(v)}
                        className={`px-2 py-0.5 rounded font-medium capitalize transition ${
                          column3View === v
                            ? 'bg-slate-700 text-slate-100'
                            : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {v === 'both' ? 'Both' : v === 'pitch' ? '2D Pitch' : 'TV Feed'}
                      </button>
                    ))}
                  </div>
                </div>

                {(column3View === 'both' || column3View === 'pitch') && (
                  <PitchVisualizer factPack={factPack} />
                )}

                {(column3View === 'both' || column3View === 'broadcast') && (
                  <BroadcastOverlay
                    factPack={factPack}
                    checkAudit={checkAudit}
                    isApproved={isApproved}
                    currentMinute={currentMinute}
                    currentSecond={currentSecond}
                  />
                )}
              </div>
            </div>
          </>
        ) : (
          <KmiPortal records={KMI_PANEL_RECORDS} />
        )}
      </main>

      <footer className="border-t border-slate-800/60 bg-[#090d16] py-3 px-6 text-center">
        <p className="text-[11px] text-slate-600">
          Microsoft × Premier League &ldquo;Inside the Game&rdquo; Developer Hackathon · Decision Intelligence Architecture
        </p>
      </footer>
    </div>
  );
}

function SectionLabel({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="mb-2">
      <span className="text-xs font-bold text-slate-300">{label}</span>
      <span className="ml-2 text-[10px] text-slate-600 font-mono">{sub}</span>
    </div>
  );
}
