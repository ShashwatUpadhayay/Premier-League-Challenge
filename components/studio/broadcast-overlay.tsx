'use client';

import React from 'react';
import { FactPack, CheckStepAudit } from '@/lib/types';
import { Tv, ShieldCheck, Activity } from 'lucide-react';


interface BroadcastOverlayProps {
  factPack: FactPack | null;
  checkAudit: CheckStepAudit | null;
  isApproved: boolean;
  currentMinute: number;
  currentSecond: number;
}

export function BroadcastOverlay({
  factPack,
  checkAudit,
  isApproved,
  currentMinute,
  currentSecond
}: BroadcastOverlayProps) {
  const formatTime = (min: number, sec: number) => {
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl flex flex-col gap-3">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <Tv className="w-4 h-4 text-cyan-400" />
          <h2 className="text-sm font-bold text-white">
            Broadcast Feed &amp; TV Lower-Third Preview
          </h2>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${isApproved ? 'bg-rose-500 animate-ping' : 'bg-slate-600'}`} />
          <span className={`text-[10px] font-bold font-mono uppercase px-2 py-0.5 rounded ${
            isApproved
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              : 'bg-slate-800 text-slate-400'
          }`}>
            {isApproved ? '● ON AIR BROADCAST' : 'STUDIO STAGING'}
          </span>
        </div>
      </div>

      {/* Television Simulation Viewport */}
      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gradient-to-b from-slate-950 via-[#0a1120] to-[#040812] border border-slate-800 shadow-2xl flex flex-col justify-between p-4">
        {/* Subtle Pitch Radar lines / Visualizer in background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute inset-4 border border-dashed border-emerald-500/40 rounded-lg flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border border-emerald-500/30 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div className="absolute top-0 bottom-0 w-px bg-emerald-500/30" />
          </div>
        </div>

        {/* Top Broadcast Scorebug */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center shadow-lg rounded overflow-hidden text-xs font-bold border border-slate-700/60">
            <div className="bg-[#38003c] text-white px-2.5 py-1 flex items-center gap-1.5">
              <span className="font-black text-[#00ff87]">PL</span>
              <span>ARS</span>
              <span className="bg-slate-900/60 px-1.5 py-0.2 rounded font-mono text-emerald-400">1</span>
            </div>
            <div className="bg-slate-900 text-white px-2.5 py-1 flex items-center gap-1.5 border-l border-slate-800">
              <span className="bg-slate-950 px-1.5 py-0.2 rounded font-mono text-slate-300">0</span>
              <span>MCI</span>
            </div>
            <div className="bg-[#00ff87] text-slate-950 font-mono px-2 py-1 font-black">
              {formatTime(currentMinute, currentSecond)}
            </div>
          </div>

          {/* Replay / Telemetry watermark */}
          <div className="flex items-center gap-2 bg-slate-950/80 px-2 py-1 rounded border border-slate-800 text-[10px] text-slate-300 font-mono">
            <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>OPTICAL SENSOR TRACKING</span>
          </div>
        </div>

        {/* Simulated Pitch Incident Coordinates Pin */}
        {factPack && (
          <div className="relative z-10 flex items-center justify-center my-auto">
            <div className="flex items-center gap-2 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-purple-500/50 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-ping" />
              <span className="text-xs font-semibold text-white">
                {factPack.keyPlayer}
              </span>
              <span className="text-[10px] font-mono text-purple-300 bg-purple-950/60 px-1.5 py-0.2 rounded">
                Contact: {factPack.telemetry.contactPoint || 'Verified'}
              </span>
            </div>
          </div>
        )}

        {/* Premier League TV Lower-Third Graphic */}
        {factPack && (
          <div className={`relative z-20 transition-all duration-300 ${
            isApproved ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-70'
          }`}>
            <div className="rounded-lg overflow-hidden shadow-2xl border border-purple-500/40">
              {/* Lower-Third Header */}
              <div className="bg-gradient-to-r from-[#38003c] via-purple-900 to-indigo-900 px-3.5 py-1.5 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-[#00ff87] text-[#38003c] flex items-center justify-center font-black text-xs">
                    VAR
                  </div>
                  <span className="font-bold text-xs uppercase tracking-wider text-emerald-300">
                    {factPack.finalDecision}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-purple-200">
                  <ShieldCheck className="w-3 h-3 text-[#00ff87]" />
                  <span>CHECK-STEP AUDITED</span>
                </div>
              </div>

              {/* Lower-Third Content Body */}
              <div className="bg-slate-950/95 backdrop-blur-md p-3 text-white border-t border-purple-900/50">
                <p className="text-xs text-slate-200 leading-snug font-medium">
                  {checkAudit?.finalExplanation || factPack.description}
                </p>

                {/* Sub-bar: IFAB Law & Impact Estimate */}
                <div className="mt-2 pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[10px]">
                  <span className="text-purple-300 font-semibold">
                    {factPack.applicableRules[0]?.law}: {factPack.applicableRules[0]?.title}
                  </span>

                  <span className="px-2 py-0.5 rounded bg-purple-950 text-[#00ff87] border border-purple-800 font-mono font-bold">
                    [ESTIMATE: {factPack.impact.xgDelta > 0 ? `ΔxG +${factPack.impact.xgDelta}` : factPack.impact.summary.slice(0, 32)}...]
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>Preview mode simulates on-air television overlay.</span>
        <span className="text-[11px] font-mono text-emerald-400">
          Latency: &lt; 2.4s
        </span>
      </div>
    </div>
  );
}
