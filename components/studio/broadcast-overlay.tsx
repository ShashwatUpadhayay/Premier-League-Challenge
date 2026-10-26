'use client';

import React from 'react';
import { FactPack, CheckStepAudit, MatchMetadata } from '@/lib/types';
import { Tv, ShieldCheck, Activity, MonitorPlay } from 'lucide-react';

interface BroadcastOverlayProps {
  factPack: FactPack | null;
  checkAudit: CheckStepAudit | null;
  isApproved: boolean;
  currentMinute: number;
  currentSecond: number;
  match?: MatchMetadata;
}

export function BroadcastOverlay({
  factPack,
  checkAudit,
  isApproved,
  currentMinute,
  currentSecond,
  match
}: BroadcastOverlayProps) {
  const formatTime = (min: number, sec: number) => {
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const homeCode = match ? match.homeTeam.slice(0, 3).toUpperCase() : 'ARS';
  const awayCode = match ? match.awayTeam.slice(0, 3).toUpperCase() : 'MCI';
  const homeScore = match ? match.homeScore : 1;
  const awayScore = match ? match.awayScore : 0;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col gap-3">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-slate-100 text-purple-900 border border-slate-200">
            <Tv className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Live Broadcast Preview
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">Simulated TV Feed &amp; Lower-Third</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isApproved ? 'bg-rose-500 animate-pulse' : 'bg-slate-300'}`} />
          <span className={`text-[11px] font-bold font-mono uppercase px-2.5 py-0.5 rounded-full border ${
            isApproved
              ? 'bg-rose-50 text-rose-800 border-rose-300'
              : 'bg-slate-100 text-slate-600 border-slate-200'
          }`}>
            {isApproved ? 'ON AIR' : 'STAGING'}
          </span>
        </div>
      </div>

      {/* Realistic Television Broadcast Frame */}
      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-md flex flex-col justify-between p-4 select-none">
        {/* Stadium turf gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1810] via-[#0d2818] to-[#06120b] pointer-events-none" />

        {/* Top Broadcast Scorebug: Official Sky Sports / PL Style */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center rounded-lg overflow-hidden text-xs font-bold shadow-lg border border-white/10">
            <div className="bg-[#38003c] text-white px-3 py-1 flex items-center gap-1.5">
              <span className="font-black text-xs text-white">PL</span>
              <span className="font-bold text-white tracking-wider">{homeCode}</span>
              <span className="bg-white/15 px-1.5 py-0.2 rounded font-mono text-white text-xs">{homeScore}</span>
            </div>
            <div className="bg-slate-900/95 text-white px-3 py-1 flex items-center gap-1.5 border-l border-white/10">
              <span className="bg-white/10 px-1.5 py-0.2 rounded font-mono text-slate-300 text-xs">{awayScore}</span>
              <span className="font-bold text-white tracking-wider">{awayCode}</span>
            </div>
            <div className="bg-slate-800 text-white font-mono px-2.5 py-1 font-bold border-l border-white/10 text-xs">
              {formatTime(currentMinute, currentSecond)}
            </div>
          </div>

          {/* Optical Tracking Watermark */}
          <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/10 text-[10px] text-white font-mono shadow-sm">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>HAWKEYE OPTICAL</span>
          </div>
        </div>

        {/* Centered Key Subject Callout */}
        {factPack && (
          <div className="relative z-10 flex items-center justify-center my-auto">
            <div className="flex items-center gap-2 bg-slate-900/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span className="text-xs font-bold text-white">
                {factPack.keyPlayer}
              </span>
              {factPack.telemetry.contactPoint && (
                <span className="text-[10px] font-mono text-slate-300 bg-white/10 px-2 py-0.5 rounded-full">
                  {factPack.telemetry.contactPoint}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Premier League TV Lower-Third Graphic Banner */}
        {factPack && (
          <div className={`relative z-20 transition-all duration-300 ${
            isApproved ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-2 opacity-80 scale-98'
          }`}>
            <div className="rounded-xl overflow-hidden shadow-2xl border border-white/20">
              {/* Lower-Third Header Strip */}
              <div className="bg-[#38003c] px-4 py-2 flex items-center justify-between text-white">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded bg-white text-[#38003c] flex items-center justify-center font-black text-xs shadow-xs">
                    VAR
                  </div>
                  <span className="font-black text-xs uppercase tracking-wider text-white">
                    {factPack.finalDecision}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>CHECK-STEP CERTIFIED</span>
                </div>
              </div>

              {/* Lower-Third Content */}
              <div className="bg-slate-900/95 backdrop-blur-md p-3.5 text-white border-t border-purple-900/60">
                <p className="text-xs text-slate-100 leading-snug font-medium">
                  {checkAudit?.finalExplanation || factPack.description}
                </p>

                {/* Sub-bar: Law Clause & Verified Impact */}
                <div className="mt-2.5 pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[10px]">
                  <span className="text-purple-300 font-bold">
                    {factPack.applicableRules[0]?.law}: {factPack.applicableRules[0]?.title}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono font-bold">
                    [ESTIMATE: {factPack.impact.xgDelta > 0 ? `ΔxG +${factPack.impact.xgDelta}` : factPack.impact.summary.slice(0, 32)}...]
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Frame Footer */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
        <div className="flex items-center gap-1.5">
          <MonitorPlay className="w-3.5 h-3.5 text-purple-900" />
          <span>Real-time on-air rendering (&lt; 2.2s latency)</span>
        </div>
        <span className="font-mono text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          Sky Sports / PL Productions Sync
        </span>
      </div>
    </div>
  );
}
