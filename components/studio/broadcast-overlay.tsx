'use client';

import React from 'react';
import { FactPack, CheckStepAudit } from '@/lib/types';
import { Tv, ShieldCheck, Activity, MonitorPlay } from 'lucide-react';

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
    <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-4 shadow-sm flex flex-col gap-3">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-slate-800/80 border border-slate-700/50">
            <Tv className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <h2 className="text-sm font-bold text-slate-100">
            Broadcast Preview
          </h2>
          <span className="text-[10px] text-slate-500 font-mono">TV Lower-Third</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${isApproved ? 'bg-rose-500' : 'bg-slate-600'}`} />
          <span className={`text-[10px] font-bold font-mono uppercase px-2 py-0.5 rounded ${
            isApproved
              ? 'bg-rose-950/40 text-rose-300 border border-rose-800/60'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}>
            {isApproved ? 'ON AIR' : 'STAGING'}
          </span>
        </div>
      </div>

      {/* Television Broadcast Viewport */}
      <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-slate-950 border border-slate-800 shadow-inner flex flex-col justify-between p-3">
        {/* Subtle gradient background simulating broadcast environment */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1627] via-[#080d18] to-slate-950 pointer-events-none" />

        {/* Top Broadcast Scorebug */}
        <div className="relative z-10 flex items-center justify-between">
          {/* PL-style scorebug — clean, no neon */}
          <div className="flex items-center rounded overflow-hidden text-xs font-bold border border-slate-700/50 shadow-md">
            <div className="bg-[#38003c] text-white px-2.5 py-1 flex items-center gap-1.5">
              <span className="font-black text-white text-[10px]">PL</span>
              <span className="text-slate-100">ARS</span>
              <span className="bg-white/10 px-1.5 rounded font-mono text-white">1</span>
            </div>
            <div className="bg-slate-900 text-white px-2.5 py-1 flex items-center gap-1.5 border-l border-slate-800">
              <span className="bg-white/5 px-1.5 rounded font-mono text-slate-300">0</span>
              <span className="text-slate-100">MCI</span>
            </div>
            <div className="bg-slate-800 text-slate-200 font-mono px-2 py-1 font-bold border-l border-slate-700 text-[11px]">
              {formatTime(currentMinute, currentSecond)}
            </div>
          </div>

          {/* Telemetry watermark */}
          <div className="flex items-center gap-1 bg-slate-950/80 px-2 py-1 rounded border border-slate-800/60 text-[10px] text-slate-400 font-mono">
            <Activity className="w-3 h-3 text-sky-500" />
            <span>OPTICAL TRACK</span>
          </div>
        </div>

        {/* Central player indicator */}
        {factPack && (
          <div className="relative z-10 flex items-center justify-center my-auto">
            <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-1.5 rounded-full border border-slate-700/60 shadow">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span className="text-xs font-semibold text-slate-100">
                {factPack.keyPlayer}
              </span>
              {factPack.telemetry.contactPoint && (
                <span className="text-[10px] font-mono text-slate-400 bg-slate-950/80 px-1.5 rounded">
                  {factPack.telemetry.contactPoint}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Premier League TV Lower-Third */}
        {factPack && (
          <div className={`relative z-20 transition-all duration-300 ${
            isApproved ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-80'
          }`}>
            <div className="rounded-lg overflow-hidden shadow-xl border border-purple-900/40">
              {/* Lower-Third Header strip */}
              <div className="bg-gradient-to-r from-[#38003c] to-[#1e0020] px-3 py-1.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-white text-[#38003c] flex items-center justify-center font-black text-[10px]">
                    VAR
                  </div>
                  <span className="font-bold text-xs uppercase tracking-wider text-white">
                    {factPack.finalDecision}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-300">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>CHECK-STEP VERIFIED</span>
                </div>
              </div>

              {/* Lower-Third Body */}
              <div className="bg-[#0b1120]/95 p-3 text-white border-t border-purple-950/60">
                <p className="text-xs text-slate-200 leading-snug font-medium">
                  {checkAudit?.finalExplanation || factPack.description}
                </p>

                <div className="mt-2 pt-2 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-2 text-[10px]">
                  <span className="text-purple-300 font-medium">
                    {factPack.applicableRules[0]?.law}: {factPack.applicableRules[0]?.title}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60 font-mono">
                    [ESTIMATE: {factPack.impact.xgDelta > 0 ? `ΔxG +${factPack.impact.xgDelta}` : factPack.impact.summary.slice(0, 28)}...]
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer metadata */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 px-0.5">
        <div className="flex items-center gap-1.5">
          <MonitorPlay className="w-3 h-3" />
          <span>Simulates Sky Sports / PL Productions broadcast feed</span>
        </div>
        <span className="font-mono text-emerald-500">
          &lt; 2.2s latency
        </span>
      </div>
    </div>
  );
}
