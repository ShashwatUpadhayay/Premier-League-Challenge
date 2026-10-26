'use client';

import React from 'react';
import { Play, Pause, RotateCcw, AlertCircle, Clock, FastForward } from 'lucide-react';

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
  { 
    id: 'INC_34_RED_CARD', 
    label: "34' Red Card Review", 
    desc: 'Serious Foul Play',
    activeStyle: 'bg-rose-50 text-rose-800 border-rose-300 ring-2 ring-rose-200' 
  },
  { 
    id: 'INC_68_HANDBALL', 
    label: "68' Handball Appeal", 
    desc: 'Unnatural Silhouette',
    activeStyle: 'bg-purple-50 text-purple-900 border-purple-300 ring-2 ring-purple-200' 
  },
  { 
    id: 'INC_88_OFFSIDE', 
    label: "88' Disallowed Goal", 
    desc: 'SAOT Semi-Auto Offside',
    activeStyle: 'bg-sky-50 text-sky-800 border-sky-300 ring-2 ring-sky-200' 
  },
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
    <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs flex flex-wrap items-center justify-between gap-3">

      {/* Left: Clock & Playback controls */}
      <div className="flex items-center gap-2.5 flex-wrap">

        {/* Live Match Clock */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-mono text-base font-bold text-slate-900 tracking-wider tabular-nums">
            {pad(currentMinute)}:{pad(currentSecond)}
          </span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-mono">
            {currentMinute < 45 ? '1H' : '2H'}
          </span>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={onTogglePlay}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition shadow-xs cursor-pointer ${
            isPlaying
              ? 'bg-amber-600 hover:bg-amber-700 text-white'
              : 'bg-[#38003c] hover:bg-purple-950 text-white'
          }`}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          <span>{isPlaying ? 'Pause Feed' : 'Simulate Feed'}</span>
        </button>

        {/* Reset Simulation */}
        <button
          onClick={onReset}
          className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition border border-slate-200 cursor-pointer"
          title="Reset Simulation to 68' Handball"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Speed Multiplier */}
        <div className="flex items-center gap-1 bg-slate-100 px-1 py-0.5 rounded-lg border border-slate-200">
          <FastForward className="w-3 h-3 text-slate-400 ml-1" />
          {[1, 2, 5].map(s => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={`px-2 py-0.5 text-[11px] rounded font-mono font-bold transition cursor-pointer ${
                speed === s
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {s}×
            </button>
          ))}
        </div>
      </div>

      {/* Right: Select Key Incident */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-xs text-slate-500 font-semibold flex items-center gap-1 mr-1">
          <AlertCircle className="w-3.5 h-3.5 text-purple-900" />
          <span className="hidden sm:inline">Incident:</span>
        </span>

        {INCIDENTS.map(inc => (
          <button
            key={inc.id}
            onClick={() => onJumpToIncident(inc.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border cursor-pointer ${
              activeIncidentId === inc.id
                ? inc.activeStyle
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <span>{inc.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
