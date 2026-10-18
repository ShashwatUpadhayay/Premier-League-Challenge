import React from 'react';
import { ShieldCheck, Radio, FileText } from 'lucide-react';
import { MatchMetadata } from '@/lib/types';


interface HeaderProps {
  match: MatchMetadata;
  activeMode: 'live' | 'kmi';
  onModeChange: (mode: 'live' | 'kmi') => void;
  isStreaming: boolean;
}

export function Header({ match, activeMode, onModeChange, isStreaming }: HeaderProps) {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Premier League Branding & Match Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-900 to-indigo-600 flex items-center justify-center border border-purple-500/30 shadow-md">
            <span className="font-black text-xl text-[#00ff87] tracking-tighter">PL</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                Official VAR Decision Intelligence
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-3 h-3" /> Grounded & Verified
              </span>
            </div>
            <h1 className="text-base lg:text-lg font-bold text-white flex items-center gap-2">
              <span>{match.homeTeam}</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-sm font-mono text-emerald-400">
                {match.homeScore} - {match.awayScore}
              </span>
              <span>{match.awayTeam}</span>
              <span className="text-xs text-slate-400 font-normal hidden sm:inline">
                • {match.stadium}
              </span>
            </h1>
          </div>
        </div>

        {/* Right: Mode Switcher & Stream Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs">
            <span className={`w-2 h-2 rounded-full ${isStreaming ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
            <span className="text-slate-300 font-mono text-[11px]">
              {isStreaming ? 'LIVE STREAM ACTIVE' : 'STREAM STANDBY'}
            </span>
          </div>

          <div className="bg-slate-900 p-1 rounded-lg border border-slate-800 flex items-center gap-1">
            <button
              onClick={() => onModeChange('live')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeMode === 'live'
                  ? 'bg-purple-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Mode 1: Live Studio</span>
            </button>
            <button
              onClick={() => onModeChange('kmi')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeMode === 'kmi'
                  ? 'bg-purple-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Mode 2: Post-Match KMI</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
