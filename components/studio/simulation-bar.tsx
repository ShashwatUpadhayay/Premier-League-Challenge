'use client';

import React from 'react';
import { Play, Pause, RotateCcw, FastForward, AlertCircle, Clock } from 'lucide-react';

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
  const formatTime = (min: number, sec: number) => {
    const m = min.toString().padStart(2, '0');
    const s = sec.toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 shadow-lg flex flex-wrap items-center justify-between gap-4">
      {/* Clock & Playback controls */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-950 rounded-lg border border-slate-800">
          <Clock className="w-4 h-4 text-[#00ff87]" />
          <span className="font-mono text-lg font-bold text-white tracking-widest">
            {formatTime(currentMinute, currentSecond)}
          </span>
          <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-purple-900/40 text-purple-300 border border-purple-800">
            {currentMinute < 45 ? '1st Half' : '2nd Half'}
          </span>
        </div>

        <button
          onClick={onTogglePlay}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition shadow-md"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isPlaying ? 'Pause' : 'Play Live'}</span>
        </button>

        <button
          onClick={onReset}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
          title="Reset Simulation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Speed Multiplier */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <FastForward className="w-3 h-3 text-slate-400 ml-1" />
          {[1, 2, 5].map(s => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={`px-2 py-0.5 text-[11px] rounded font-mono font-medium transition ${
                speed === s
                  ? 'bg-purple-700 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      {/* Quick Jump to Contested Moments */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
          <span>Jump to Contested Moment:</span>
        </span>

        <button
          onClick={() => onJumpToIncident('INC_34_RED_CARD')}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition border ${
            activeIncidentId === 'INC_34_RED_CARD'
              ? 'bg-rose-950/80 text-rose-300 border-rose-600 shadow-sm'
              : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
          }`}
        >
          34&apos; Red Card Review
        </button>

        <button
          onClick={() => onJumpToIncident('INC_68_HANDBALL')}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition border ${
            activeIncidentId === 'INC_68_HANDBALL'
              ? 'bg-purple-950/80 text-purple-300 border-purple-500 shadow-sm'
              : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
          }`}
        >
          68&apos; Handball Penalty Shout
        </button>

        <button
          onClick={() => onJumpToIncident('INC_88_OFFSIDE')}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition border ${
            activeIncidentId === 'INC_88_OFFSIDE'
              ? 'bg-blue-950/80 text-blue-300 border-blue-500 shadow-sm'
              : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
          }`}
        >
          88&apos; Disallowed Goal
        </button>
      </div>
    </div>
  );
}
