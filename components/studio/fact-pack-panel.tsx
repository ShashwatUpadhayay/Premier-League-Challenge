'use client';

import React from 'react';
import { FactPack } from '@/lib/types';
import { Database, Cpu, BookOpen, TrendingUp, CheckCircle2 } from 'lucide-react';

interface FactPackPanelProps {
  factPack: FactPack | null;
}

const CATEGORY_BADGE: Record<string, string> = {
  HANDBALL:    'bg-purple-950/60 text-purple-300 border-purple-800/60',
  RED_CARD:    'bg-rose-950/60 text-rose-300 border-rose-800/60',
  OFFSIDE:     'bg-sky-950/60 text-sky-300 border-sky-800/60',
  PENALTY:     'bg-amber-950/60 text-amber-300 border-amber-800/60',
  GOAL_REVIEW: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60',
};

export function FactPackPanel({ factPack }: FactPackPanelProps) {
  if (!factPack) {
    return (
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-8 text-center h-full flex flex-col items-center justify-center gap-3">
        <Database className="w-7 h-7 text-slate-700" />
        <div>
          <p className="text-sm font-medium text-slate-500">No incident loaded</p>
          <p className="text-xs text-slate-600 mt-1">Play simulation or jump to 34′, 68′, or 88′</p>
        </div>
      </div>
    );
  }

  const badgeClass = CATEGORY_BADGE[factPack.category] ?? 'bg-slate-800 text-slate-400 border-slate-700';

  return (
    <div className="bg-[#0f172a] border border-slate-800 rounded-xl flex flex-col divide-y divide-slate-800/60">

      {/* Card header */}
      <div className="p-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${badgeClass}`}>
              {factPack.category}
            </span>
            <span className="text-xs text-slate-500 font-mono tabular-nums">
              {factPack.minute}:{factPack.second.toString().padStart(2, '0')}′
            </span>
          </div>
          <h2 className="text-sm font-bold text-slate-100 leading-snug">{factPack.title}</h2>
        </div>
        <div className="p-1.5 rounded-lg bg-slate-800/60 border border-slate-700/40 flex-shrink-0">
          <Database className="w-3.5 h-3.5 text-slate-500" />
        </div>
      </div>

      {/* On-field vs VAR decision */}
      <div className="p-4 grid grid-cols-2 gap-2">
        <div className="bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/60">
          <span className="text-[10px] text-slate-500 uppercase font-semibold block mb-1">On-Field Call</span>
          <span className="text-xs font-semibold text-slate-300">{factPack.onFieldDecision}</span>
        </div>
        <div className="bg-slate-900/50 p-2.5 rounded-lg border border-purple-900/30">
          <span className="text-[10px] text-purple-400/80 uppercase font-semibold block mb-1">VAR Ruling</span>
          <span className="text-xs font-semibold text-emerald-400">{factPack.finalDecision}</span>
        </div>
      </div>

      {/* Event citations */}
      <div className="p-4">
        <div className="flex items-center gap-1.5 mb-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
          <span className="text-xs font-semibold text-slate-300">Official Event Citations</span>
          <span className="ml-auto text-[10px] text-slate-600 font-mono">Ground-Truth IDs</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {factPack.eventCitations.map(id => (
            <span
              key={id}
              className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800/80 hover:text-slate-200 transition"
            >
              {id}
            </span>
          ))}
        </div>
      </div>

      {/* Optical sensor telemetry */}
      <div className="p-4">
        <div className="flex items-center gap-1.5 mb-3">
          <Cpu className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
          <span className="text-xs font-semibold text-slate-300">Optical Sensor Telemetry</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {factPack.telemetry.contactPoint && (
            <TelemetryCell label="Contact Point" value={factPack.telemetry.contactPoint} />
          )}
          {factPack.telemetry.proximityMeters !== undefined && (
            <TelemetryCell label="Proximity" value={`${factPack.telemetry.proximityMeters}m`} mono />
          )}
          {factPack.telemetry.speedKmh !== undefined && (
            <TelemetryCell label="Contact Velocity" value={`${factPack.telemetry.speedKmh} km/h`} mono />
          )}
          {factPack.telemetry.deflectedFrom && (
            <TelemetryCell label="Deflection" value={`Off ${factPack.telemetry.deflectedFrom}`} accent="emerald" />
          )}
          {factPack.telemetry.armPosition && (
            <TelemetryCell label="Arm Silhouette" value={factPack.telemetry.armPosition} />
          )}
          {factPack.telemetry.marginCm !== undefined && (
            <TelemetryCell label="Offside Margin" value={`+${factPack.telemetry.marginCm}cm`} accent="rose" mono />
          )}
        </div>
      </div>

      {/* IFAB Law */}
      <div className="p-4">
        <div className="flex items-center gap-1.5 mb-3">
          <BookOpen className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
          <span className="text-xs font-semibold text-slate-300">Applicable IFAB Law</span>
        </div>
        <div className="flex flex-col gap-2.5">
          {factPack.applicableRules.map((rule, idx) => (
            <div key={idx} className="text-xs">
              <div className="font-semibold text-slate-200 mb-0.5">
                {rule.law}: {rule.title}
              </div>
              <p className="text-slate-500 italic leading-relaxed text-[11px]">
                &quot;{rule.summary}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Decision leverage estimate */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
            <span className="text-xs font-semibold text-slate-400">Decision Leverage</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono border border-slate-700/50">
            ESTIMATE
          </span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          {factPack.impact.summary}
        </p>
      </div>
    </div>
  );
}

function TelemetryCell({
  label,
  value,
  mono = false,
  accent
}: {
  label: string;
  value: string;
  mono?: boolean;
  accent?: 'emerald' | 'rose';
}) {
  const valueClass = accent === 'emerald'
    ? 'text-emerald-400'
    : accent === 'rose'
    ? 'text-rose-400'
    : 'text-slate-200';

  return (
    <div className="bg-slate-900/50 p-2 rounded-lg border border-slate-800/60">
      <span className="text-[10px] text-slate-500 block mb-0.5">{label}</span>
      <span className={`text-xs font-medium ${mono ? 'font-mono' : ''} ${valueClass}`}>{value}</span>
    </div>
  );
}
