import React from 'react';
import { FactPack } from '@/lib/types';
import { Database, Cpu, BookOpen, TrendingUp, CheckCircle2 } from 'lucide-react';


interface FactPackPanelProps {
  factPack: FactPack | null;
}

export function FactPackPanel({ factPack }: FactPackPanelProps) {
  if (!factPack) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-center text-slate-500 h-full flex flex-col items-center justify-center">
        <Database className="w-10 h-10 mb-2 text-slate-700 animate-pulse" />
        <p className="text-sm font-medium">Waiting for contested match moment...</p>
        <p className="text-xs text-slate-600 mt-1">Play simulation or jump to 34&apos;, 68&apos;, or 88&apos;</p>
      </div>
    );
  }

  const categoryColor = {
    HANDBALL: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    RED_CARD: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    OFFSIDE: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    PENALTY: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    GOAL_REVIEW: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
  }[factPack.category] || 'bg-slate-500/10 text-slate-400 border-slate-500/30';

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl flex flex-col gap-4">
      {/* Title & Category Header */}
      <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${categoryColor}`}>
              {factPack.category} REVIEW
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Minute {factPack.minute}:{factPack.second.toString().padStart(2, '0')}
            </span>
          </div>
          <h2 className="text-sm font-bold text-white leading-snug">
            {factPack.title}
          </h2>
        </div>
        <div className="p-1.5 rounded-lg bg-slate-800 text-purple-400">
          <Database className="w-4 h-4" />
        </div>
      </div>

      {/* Decisions: On-Field vs VAR */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
          <span className="text-[10px] text-slate-500 uppercase font-semibold block">On-Field Call</span>
          <span className="font-semibold text-slate-200 mt-0.5 block">{factPack.onFieldDecision}</span>
        </div>
        <div className="bg-slate-950 p-2.5 rounded-lg border border-purple-900/30">
          <span className="text-[10px] text-purple-400 uppercase font-semibold block">VAR Review Ruling</span>
          <span className="font-semibold text-[#00ff87] mt-0.5 block">{factPack.finalDecision}</span>
        </div>
      </div>

      {/* Official Event ID Citations (Ground Truth) */}
      <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Certified Ground-Truth Event IDs</span>
          </span>
          <span className="text-[10px] text-slate-500 font-mono">Allowed Citations</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {factPack.eventCitations.map(id => (
            <span key={id} className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-800 text-purple-300 border border-slate-700">
              {id}
            </span>
          ))}
        </div>
      </div>

      {/* Telemetry Facts */}
      <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800">
        <span className="font-semibold text-xs text-slate-300 flex items-center gap-1.5 mb-2.5">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>Sensor & Video Telemetry</span>
        </span>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          {factPack.telemetry.contactPoint && (
            <div className="bg-slate-900 p-2 rounded border border-slate-800/60">
              <span className="text-slate-500 block">Contact Point</span>
              <span className="text-slate-200 font-medium">{factPack.telemetry.contactPoint}</span>
            </div>
          )}
          {factPack.telemetry.proximityMeters !== undefined && (
            <div className="bg-slate-900 p-2 rounded border border-slate-800/60">
              <span className="text-slate-500 block">Proximity / Distance</span>
              <span className="text-slate-200 font-mono font-medium">{factPack.telemetry.proximityMeters}m</span>
            </div>
          )}
          {factPack.telemetry.speedKmh !== undefined && (
            <div className="bg-slate-900 p-2 rounded border border-slate-800/60">
              <span className="text-slate-500 block">Ball / Tackle Velocity</span>
              <span className="text-slate-200 font-mono font-medium">{factPack.telemetry.speedKmh} km/h</span>
            </div>
          )}
          {factPack.telemetry.deflectedFrom && (
            <div className="bg-slate-900 p-2 rounded border border-slate-800/60">
              <span className="text-slate-500 block">Deflection Trajectory</span>
              <span className="text-emerald-400 font-medium">Off {factPack.telemetry.deflectedFrom}</span>
            </div>
          )}
          {factPack.telemetry.armPosition && (
            <div className="bg-slate-900 p-2 rounded border border-slate-800/60">
              <span className="text-slate-500 block">Arm Silhouette</span>
              <span className="text-slate-200 font-medium">{factPack.telemetry.armPosition}</span>
            </div>
          )}
          {factPack.telemetry.marginCm !== undefined && (
            <div className="bg-slate-900 p-2 rounded border border-slate-800/60">
              <span className="text-slate-500 block">Offside Margin</span>
              <span className="text-rose-400 font-mono font-medium">+{factPack.telemetry.marginCm}cm</span>
            </div>
          )}
        </div>
      </div>

      {/* Bound IFAB Rule Clause */}
      <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800">
        <span className="font-semibold text-xs text-slate-300 flex items-center gap-1.5 mb-2">
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>Applicable IFAB Law</span>
        </span>
        {factPack.applicableRules.map((rule, idx) => (
          <div key={idx} className="text-[11px] mb-2 last:mb-0">
            <div className="flex items-center justify-between font-semibold text-purple-300">
              <span>{rule.law}: {rule.title}</span>
            </div>
            <p className="text-slate-400 mt-1 italic leading-relaxed">
              &quot;{rule.summary}&quot;
            </p>
          </div>
        ))}
      </div>

      {/* Impact Metric (Marked as Estimate) */}
      <div className="bg-purple-950/20 border border-purple-800/40 p-3 rounded-lg text-xs">
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold text-purple-300 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
            <span>Decision Leverage</span>
          </span>
          <span className="px-1.5 py-0.2 rounded bg-purple-900/60 text-purple-300 text-[10px] font-mono font-bold">
            ESTIMATE
          </span>
        </div>
        <p className="text-slate-300 text-[11px] leading-relaxed">
          {factPack.impact.summary}
        </p>
      </div>
    </div>
  );
}
