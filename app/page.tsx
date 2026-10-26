'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from '@/components/header';
import { SimulationBar } from '@/components/studio/simulation-bar';
import { FactPackPanel } from '@/components/studio/fact-pack-panel';
import { CheckGateInspector } from '@/components/studio/check-gate-inspector';
import { BroadcastOverlay } from '@/components/studio/broadcast-overlay';
import { PitchVisualizer } from '@/components/studio/pitch-visualizer';
import { AudioAnnouncer } from '@/components/studio/audio-announcer';
import { KmiPortal } from '@/components/kmi/kmi-portal';
import {
  PREMIER_LEAGUE_MATCHES,
  MATCH_DATABASE,
  ALL_FACT_PACKS
} from '@/lib/match-data';
import { FactPack, ExplanationDraft, CheckStepAudit, MatchEvent } from '@/lib/types';
import { Radio, ShieldCheck, Database, Tv, Crosshair, Volume2, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const [activeMode, setActiveMode] = useState<'live' | 'kmi'>('live');
  const [selectedMatchId, setSelectedMatchId] = useState<string>('PL-2024-MATCH-842');
  
  // Active match data bundle
  const activeBundle = MATCH_DATABASE[selectedMatchId] || MATCH_DATABASE['PL-2024-MATCH-842'];
  const activeMatch = activeBundle.metadata;
  const availableFactPacks = Object.values(activeBundle.factPacks);
  const initialIncident = availableFactPacks[0] || null;

  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [currentMinute, setCurrentMinute] = useState(initialIncident?.minute || 14);
  const [currentSecond, setCurrentSecond] = useState(initialIncident?.second || 22);
  const [activeIncidentId, setActiveIncidentId] = useState<string | null>(initialIncident?.incidentId || 'INC_14_PENALTY');
  
  // Left column tab: 'gate' (AI Audit & Approval) vs 'facts' (Ground Truth Telemetry)
  const [leftTab, setLeftTab] = useState<'gate' | 'facts'>('gate');

  // Right column tab: 'broadcast' (Live TV Feed) vs 'pitch' (Tactical 2D Pitch) vs 'audio' (Stadium PA Mic)
  const [rightTab, setRightTab] = useState<'broadcast' | 'pitch' | 'audio'>('broadcast');

  const [factPack, setFactPack] = useState<FactPack | null>(initialIncident);
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
    const targetFactPack = ALL_FACT_PACKS[incidentId];
    if (targetFactPack) {
      setFactPack(targetFactPack);
      setCurrentMinute(targetFactPack.minute);
      setCurrentSecond(targetFactPack.second);
      loadExplanation(incidentId);
    }
  }, [loadExplanation]);

  // Handle switching active match
  const handleSelectMatch = useCallback((newMatchId: string) => {
    setSelectedMatchId(newMatchId);
    setIsPlaying(false);
    setRecentEvents([]);
    
    const newBundle = MATCH_DATABASE[newMatchId] || MATCH_DATABASE['PL-2024-MATCH-842'];
    const firstInc = Object.values(newBundle.factPacks)[0];
    if (firstInc) {
      setActiveIncidentId(firstInc.incidentId);
      setFactPack(firstInc);
      setCurrentMinute(firstInc.minute);
      setCurrentSecond(firstInc.second);
      loadExplanation(firstInc.incidentId);
    }
  }, [loadExplanation]);

  // Initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      loadExplanation('INC_14_PENALTY');
    }, 0);
    return () => clearTimeout(timer);
  }, [loadExplanation]);

  // Handle SSE streaming for currently selected match
  useEffect(() => {
    if (!isPlaying) {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
        setIsStreaming(false);
      }
      return;
    }

    const sse = new EventSource(`/api/match-stream?matchId=${selectedMatchId}&speed=${speed}`);
    eventSourceRef.current = sse;

    sse.onopen = () => setIsStreaming(true);

    sse.addEventListener('match_event', (e: MessageEvent) => {
      try {
        const payload = JSON.parse(e.data);
        const event: MatchEvent = payload.event;
        setCurrentMinute(event.minute);
        setCurrentSecond(event.second);
        setRecentEvents(prev => [event, ...prev.slice(0, 3)]);
        if (event.isContested && event.incidentId && ALL_FACT_PACKS[event.incidentId]) {
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
  }, [isPlaying, speed, selectedMatchId, handleJumpToIncident]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans selection:bg-purple-100 selection:text-purple-900">
      {/* Premier League Header with Match Selector */}
      <Header
        match={activeMatch}
        matches={PREMIER_LEAGUE_MATCHES}
        onSelectMatch={handleSelectMatch}
        activeMode={activeMode}
        onModeChange={setActiveMode}
        isStreaming={isStreaming}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-6 py-5 flex flex-col gap-4">
        {activeMode === 'live' ? (
          <>
            {/* Top Control Strip: Simulation & Incident Quick Pickers */}
            <SimulationBar
              currentMinute={currentMinute}
              currentSecond={currentSecond}
              isPlaying={isPlaying}
              onTogglePlay={() => setIsPlaying(!isPlaying)}
              onReset={() => {
                setIsPlaying(false);
                if (initialIncident) handleJumpToIncident(initialIncident.incidentId);
              }}
              speed={speed}
              onSpeedChange={setSpeed}
              onJumpToIncident={handleJumpToIncident}
              activeIncidentId={activeIncidentId}
              availableIncidents={availableFactPacks}
            />

            {/* Live Ticker Feed */}
            {recentEvents.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-lg px-3.5 py-2 flex items-center gap-2 overflow-x-auto shadow-2xs">
                <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1.5 shrink-0">
                  <Radio className="w-3 h-3 text-purple-900" />
                  Live Feed:
                </span>
                <div className="flex items-center gap-2">
                  {recentEvents.map((evt, idx) => (
                    <div
                      key={`${evt.eventId}_${evt.minute}_${idx}`}
                      className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-50 border border-slate-200 shrink-0 text-xs"
                    >
                      <span className="font-mono text-purple-900 font-bold tabular-nums">{evt.minute}&apos;</span>
                      <span className="font-bold text-slate-800">{evt.player}:</span>
                      <span className="text-slate-600">{evt.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Active Incident Summary Bar */}
            {factPack && (
              <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#38003c] flex items-center justify-center text-white font-black text-xs shadow-xs flex-shrink-0">
                    VAR
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="text-xs font-bold text-slate-900">
                        {activeMatch.homeTeam} vs {activeMatch.awayTeam} — Minute {factPack.minute}&apos;
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-900 border border-purple-200 uppercase font-mono">
                        {factPack.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 truncate">{factPack.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-xs text-slate-600">
                    Official Ruling: <strong className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{factPack.finalDecision}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Main Workstation: Clean 2-Column Uncluttered Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

              {/* Left Column (7 cols = ~58% width): Decision Intelligence Pipeline */}
              <div className="lg:col-span-7 flex flex-col gap-3">
                {/* Clean Tab Selector for Left Column */}
                <div className="flex items-center justify-between bg-slate-200/70 p-1 rounded-xl border border-slate-300/70">
                  <div className="flex items-center gap-1 w-full sm:w-auto">
                    <button
                      onClick={() => setLeftTab('gate')}
                      className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                        leftTab === 'gate'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4 text-purple-900" />
                      <span>Check Step Audit &amp; Approval</span>
                      {checkAudit && (
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                          checkAudit.status === 'PASSED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {checkAudit.status === 'PASSED' ? 'PASSED' : 'FALLBACK'}
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => setLeftTab('facts')}
                      className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                        leftTab === 'facts'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Database className="w-4 h-4 text-purple-900" />
                      <span>Ground Truth &amp; IFAB Laws</span>
                    </button>
                  </div>

                  <span className="text-[11px] font-mono text-slate-500 hidden md:inline px-3 font-semibold">
                    Explainability Layer
                  </span>
                </div>

                {/* Left Column Active Content */}
                {leftTab === 'gate' ? (
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
                ) : (
                  <FactPackPanel factPack={factPack} />
                )}
              </div>

              {/* Right Column (5 cols = ~42% width): Live Staging & Visual Output */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                {/* Clean Tab Selector for Right Column: TV Feed, 2D Pitch, Stadium PA Mic */}
                <div className="flex items-center justify-between bg-slate-200/70 p-1 rounded-xl border border-slate-300/70">
                  <div className="flex items-center gap-1 w-full sm:w-auto flex-wrap">
                    <button
                      onClick={() => setRightTab('broadcast')}
                      className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                        rightTab === 'broadcast'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Tv className="w-3.5 h-3.5 text-purple-900" />
                      <span>TV Feed</span>
                      {isApproved && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-800 font-bold font-mono">
                          ON AIR
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => setRightTab('pitch')}
                      className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                        rightTab === 'pitch'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Crosshair className="w-3.5 h-3.5 text-purple-900" />
                      <span>2D Pitch</span>
                    </button>

                    <button
                      onClick={() => setRightTab('audio')}
                      className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                        rightTab === 'audio'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5 text-purple-900" />
                      <span>Stadium PA</span>
                    </button>
                  </div>

                  <span className="text-[11px] font-mono text-slate-500 hidden xl:inline px-2 font-semibold">
                    Staging
                  </span>
                </div>

                {/* Right Column Active Content */}
                {rightTab === 'broadcast' && (
                  <BroadcastOverlay
                    factPack={factPack}
                    checkAudit={checkAudit}
                    isApproved={isApproved}
                    currentMinute={currentMinute}
                    currentSecond={currentSecond}
                    match={activeMatch}
                  />
                )}

                {rightTab === 'pitch' && (
                  <PitchVisualizer
                    factPack={factPack}
                    match={activeMatch}
                    availableIncidents={availableFactPacks}
                    onSelectIncident={handleJumpToIncident}
                  />
                )}

                {rightTab === 'audio' && (
                  <AudioAnnouncer
                    factPack={factPack}
                    checkAudit={checkAudit}
                    isApproved={isApproved}
                  />
                )}

                {/* Helpful Guidance Card for Demo Judges */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
                  <div className="flex items-center gap-2 mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-purple-900" />
                    <h4 className="text-xs font-bold text-slate-900">
                      Live Demo Flow for Hackathon Judges
                    </h4>
                  </div>
                  <ol className="text-xs text-slate-600 space-y-1 list-decimal list-inside leading-relaxed">
                    <li>Switch between any of the <strong>5 premier league fixtures</strong> using the match dropdown at the top.</li>
                    <li>Select an incident (e.g. <strong>Penalty Overturns</strong>, <strong>Red Cards</strong>, <strong>SAOT Offside</strong>).</li>
                    <li>Click <strong>&ldquo;Generate Clean Draft&rdquo;</strong> to run the Check Step verification gate.</li>
                    <li>Click <strong>&ldquo;Test Fake Figure&rdquo;</strong> to witness the automatic deterministic rule fallback.</li>
                    <li>Click <strong>&ldquo;Approve for Broadcast&rdquo;</strong> to see the TV lower-third and hear the <strong>Stadium PA Announcer</strong>.</li>
                  </ol>
                </div>
              </div>

            </div>
          </>
        ) : (
          /* Mode 2: Key Match Incidents (KMI) Dossier for selected match */
          <KmiPortal records={activeBundle.kmiRecords} />
        )}
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 px-6 text-center text-xs text-slate-500">
        <p>Microsoft × Premier League &ldquo;Inside the Game&rdquo; Developer Hackathon • Decision Intelligence Architecture</p>
      </footer>
    </div>
  );
}
