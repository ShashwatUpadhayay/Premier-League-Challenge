'use client';

import React, { useState } from 'react';
import { Radio, FileText, Cloud, CheckCircle2, Wifi, WifiOff } from 'lucide-react';
import { MatchMetadata } from '@/lib/types';
import { AzureModal } from '@/components/azure-modal';

interface HeaderProps {
  match: MatchMetadata;
  activeMode: 'live' | 'kmi';
  onModeChange: (mode: 'live' | 'kmi') => void;
  isStreaming: boolean;
}

export function Header({ match, activeMode, onModeChange, isStreaming }: HeaderProps) {
  const [isAzureModalOpen, setIsAzureModalOpen] = useState(false);

  return (
    <>
      <header className="border-b border-slate-800/60 bg-[#0c121e]/98 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">

          {/* Left: Branding + Match Info */}
          <div className="flex items-center gap-3.5">
            {/* PL logo mark */}
            <div className="w-9 h-9 rounded-lg bg-[#38003c] flex items-center justify-center border border-purple-800/40 flex-shrink-0">
              <span className="font-black text-sm text-white tracking-tighter">PL</span>
            </div>

            <div className="min-w-0">
              {/* Sub-label row */}
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                  Decision Intelligence
                </span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-950/50 text-emerald-400 border border-emerald-900/60">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  Grounded &amp; Certified
                </span>
              </div>

              {/* Match scoreline */}
              <h1 className="text-sm lg:text-base font-bold text-slate-100 flex items-center gap-2 flex-wrap">
                <span className="text-slate-100">{match.homeTeam}</span>
                <span className="px-2 py-0.5 rounded-md bg-slate-800 text-xs font-mono font-bold text-white border border-slate-700/60 tabular-nums">
                  {match.homeScore} – {match.awayScore}
                </span>
                <span className="text-slate-100">{match.awayTeam}</span>
                <span className="text-xs text-slate-500 font-normal hidden md:inline">
                  · {match.stadium}
                </span>
              </h1>
            </div>
          </div>

          {/* Right: controls */}
          <div className="flex items-center gap-2 self-end sm:self-auto">

            {/* Azure Architecture button */}
            <button
              onClick={() => setIsAzureModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700/60 text-xs font-medium transition"
              title="Azure Hackathon Architecture & Rules"
            >
              <Cloud className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Azure Architecture</span>
            </button>

            {/* Stream status */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50 text-xs">
              {isStreaming ? (
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <WifiOff className="w-3.5 h-3.5 text-slate-500" />
              )}
              <span className={`font-mono text-[11px] ${isStreaming ? 'text-emerald-400' : 'text-slate-500'}`}>
                {isStreaming ? 'LIVE' : 'STANDBY'}
              </span>
            </div>

            {/* Mode switcher */}
            <div className="bg-slate-800/60 p-0.5 rounded-lg border border-slate-700/50 flex items-center gap-0.5">
              <button
                onClick={() => onModeChange('live')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                  activeMode === 'live'
                    ? 'bg-[#38003c] text-white border border-purple-800/50'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                }`}
              >
                <Radio className="w-3 h-3" />
                <span>Live Studio</span>
              </button>
              <button
                onClick={() => onModeChange('kmi')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                  activeMode === 'kmi'
                    ? 'bg-[#38003c] text-white border border-purple-800/50'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                }`}
              >
                <FileText className="w-3 h-3" />
                <span>Post-Match KMI</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <AzureModal isOpen={isAzureModalOpen} onClose={() => setIsAzureModalOpen(false)} />
    </>
  );
}
