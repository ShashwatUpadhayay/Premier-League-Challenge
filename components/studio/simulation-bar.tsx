'use client';

import React from 'react';
import { Play, Pause, RotateCcw, AlertCircle, Clock, Gauge } from 'lucide-react';

interface SimulationBarProps {
  currentMinute: number;
  currentSecond: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onReset: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  onJumpToIncident: (incidentId: string) => void;
  activeIncidentId: string | null;
}

const INCIDENTS = [
  { id: 'INC_34_RED_CARD', label: "34' Red Card", colorActive: 'bg-rose-950/70 text-rose-300 border-rose-800/60' },
  { id: 'INC_68_HANDBALL', label: "68' Handball", colorActive: 'bg-purple-950/70 text-purple-300 border-purple-800/60' },
  { id: 'INC_88_OFFSIDE', label: "88' Offside", colorActive: 'bg-sky-950/70 text-sky-300 border-sky-800/60' },
];

export function SimulationBar({
  currentMinute,
  currentSecond,
  isPlaying,
  onTogglePlay,
  onReset,
  speed,
  onSpeedChange,
  onJumpToIncident,
  activeIncidentId
}: SimulationBarProps) {
  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="bg-[#0f172a] border border-slate-800 rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-3">

      {/* Left group: clock + playback */}
      <div className="flex items-center gap-2.5">

        {/* Match clock */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-950 rounded-lg border border-slate-800/80">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-mono text-sm font-bold text-slate-100 tracking-widest tabular-nums">
            {pad(currentMinute)}:{pad(currentSecond)}
          </span>
          <span className="text-[10px] font-bold px-1 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
            {currentMinute < 45 ? '1H' : '2H'}
          </span>
        </div>

        {/* Play / Pause */}
        <button
          onClick={onTogglePlay}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-semibold transition ${
            isPlaying
              ? 'bg-slate-700 hover:bg-slate-600 border border-slate-600'
              : 'bg-[#38003c] hover:bg-purple-900 border border-purple-800/50'
          }`}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isPlaying ? 'Pause' : 'Play'}</span>
        </button>

        {/* Reset */}
        <button
          onClick={onReset}
          className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition border border-slate-700/50"
          title="Reset to 68' Handball"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Speed selector */}
        <div className="flex items-center gap-1 bg-slate-900/80 px-1 py-0.5 rounded-lg border border-slate-800/60">
          <Gauge className="w-3 h-3 text-slate-600 ml-1" />
          {[1, 2, 5].map(s => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={`px-1.5 py-0.5 text-[11px] rounded font-mono font-medium transition ${
                speed === s
                  ? 'bg-slate-700 text-white font-bold'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {s}×
            </button>
          ))}
        </div>
      </div>

      {/* Right group: incident jump buttons */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mr-1">
          <AlertCircle className="w-3 h-3" />
          <span className="hidden sm:inline">Jump to:</span>
        </span>

        {INCIDENTS.map(inc => (
          <button
            key={inc.id}
            onClick={() => onJumpToIncident(inc.id)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition border ${
              activeIncidentId === inc.id
                ? inc.colorActive
                : 'bg-slate-800/60 text-slate-400 border-slate-700/50 hover:text-slate-200 hover:bg-slate-700/60'
            }`}
          >
            {inc.label}
          </button>
        ))}
      </div>
    </div>
  );
}
