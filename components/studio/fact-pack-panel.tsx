'use client';

import React from 'react';
import { FactPack } from '@/lib/types';
import { Database, Cpu, BookOpen, TrendingUp, CheckCircle2 } from 'lucide-react';

interface FactPackPanelProps {
  factPack: FactPack | null;
}

const CATEGORY_BADGE: Record<string, string> = {
  HANDBALL:    'bg-purple-50 text-purple-800 border-purple-200',
  RED_CARD:    'bg-rose-50 text-rose-800 border-rose-200',
  OFFSIDE:     'bg-sky-50 text-sky-800 border-sky-200',
  PENALTY:     'bg-amber-50 text-amber-800 border-amber-200',
  GOAL_REVIEW: 'bg-emerald-50 text-emerald-800 border-emerald-200',
};

export function FactPackPanel({ factPack }: FactPackPanelProps) {
  if (!factPack) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-8 text-center h-full flex flex-col items-center justify-center gap-3 shadow-xs">
        <Database className="w-8 h-8 text-slate-300" />
        <div>
          <p className="text-sm font-semibold text-slate-600">No active incident loaded</p>
          <p className="text-xs text-slate-400 mt-1">Select an incident from the timeline above</p>
        </div>
      </div>
    );
  }

  const badgeClass = CATEGORY_BADGE[factPack.category] ?? 'bg-slate-100 text-slate-800 border-slate-200';

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col divide-y divide-slate-100">

      {/* Card Header: Incident Title & Minute */}
      <div className="p-4 bg-slate-50/50 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${badgeClass}`}>
              {factPack.category} REVIEW
            </span>
            <span className="text-xs text-slate-500 font-mono font-bold tabular-nums">
              Minute {factPack.minute}:{factPack.second.toString().padStart(2, '0')}′
            </span>
          </div>
          <h2 className="text-base font-bold text-slate-900 leading-snug">
            {factPack.title}
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            {factPack.description}
          </p>
        </div>
        <div className="p-2 rounded-lg bg-white border border-slate-200 text-purple-900 shadow-xs flex-shrink-0">
          <Database className="w-4 h-4" />
        </div>
      </div>

      {/* Decision Summary: On-Field vs VAR */}
      <div className="p-4 grid grid-cols-2 gap-3">
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
          <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block mb-1">
            On-Field Call
          </span>
          <span className="text-xs font-bold text-slate-800 block">
            {factPack.onFieldDecision}
          </span>
        </div>
        <div className="bg-emerald-50/60 p-3 rounded-lg border border-emerald-200">
          <span className="text-[10px] text-emerald-800 uppercase font-bold tracking-wider block mb-1">
            Official VAR Ruling
          </span>
          <span className="text-xs font-bold text-emerald-900 block">
            {factPack.finalDecision}
          </span>
        </div>
      </div>

      {/* Optical Sensor & Ball Telemetry */}
      <div className="p-4">
        <div className="flex items-center gap-1.5 mb-2.5">
          <Cpu className="w-3.5 h-3.5 text-purple-900 flex-shrink-0" />
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            Optical Sensor &amp; Tracking Telemetry
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {factPack.telemetry.contactPoint && (
            <TelemetryItem label="Contact Point" value={factPack.telemetry.contactPoint} />
          )}
          {factPack.telemetry.proximityMeters !== undefined && (
            <TelemetryItem label="Proximity Distance" value={`${factPack.telemetry.proximityMeters}m`} mono />
          )}
          {factPack.telemetry.speedKmh !== undefined && (
            <TelemetryItem label="Challenge Speed" value={`${factPack.telemetry.speedKmh} km/h`} mono />
          )}
          {factPack.telemetry.deflectedFrom && (
            <TelemetryItem label="Deflection Path" value={`Off ${factPack.telemetry.deflectedFrom}`} accent="emerald" />
          )}
          {factPack.telemetry.armPosition && (
            <TelemetryItem label="Arm Silhouette" value={factPack.telemetry.armPosition} />
          )}
          {factPack.telemetry.marginCm !== undefined && (
            <TelemetryItem label="Offside Margin" value={`+${factPack.telemetry.marginCm}cm`} accent="rose" mono />
          )}
        </div>
      </div>

      {/* Ground-Truth Event Citations */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Ground-Truth Event Citations
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Immutable IDs</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {factPack.eventCitations.map(id => (
            <span
              key={id}
              className="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 border border-slate-200"
            >
              {id}
            </span>
          ))}
        </div>
      </div>

      {/* Applicable IFAB Law */}
      <div className="p-4">
        <div className="flex items-center gap-1.5 mb-2.5">
          <BookOpen className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            Applicable IFAB Law
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {factPack.applicableRules.map((rule, idx) => (
            <div key={idx} className="bg-amber-50/40 p-3 rounded-lg border border-amber-200/80">
              <div className="font-bold text-xs text-amber-950 mb-0.5">
                {rule.law}: {rule.title}
              </div>
              <p className="text-xs text-slate-700 italic leading-relaxed">
                &ldquo;{rule.summary}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Decision Leverage Estimate */}
      <div className="p-4 bg-slate-50/50">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-purple-900 flex-shrink-0" />
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Decision Impact Leverage
            </span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-200 font-mono">
            ESTIMATE
          </span>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed">
          {factPack.impact.summary}
        </p>
      </div>
    </div>
  );
}

function TelemetryItem({
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
  const valueColor = accent === 'emerald'
    ? 'text-emerald-700'
    : accent === 'rose'
    ? 'text-rose-700'
    : 'text-slate-900';

  return (
    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">
        {label}
      </span>
      <span className={`text-xs font-bold ${mono ? 'font-mono' : ''} ${valueColor}`}>
        {value}
      </span>
    </div>
  );
}
