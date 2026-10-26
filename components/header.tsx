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
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40 px-4 lg:px-8 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">

          {/* Left: Branding + Match Scorebug */}
          <div className="flex items-center gap-3.5">
            {/* Official PL Plum Logo Badge */}
            <div className="w-9 h-9 rounded-lg bg-[#38003c] flex items-center justify-center shadow-xs flex-shrink-0">
              <span className="font-black text-sm text-white tracking-tighter">PL</span>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-900">
                  Decision Intelligence
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  Grounded &amp; Audited
                </span>
              </div>

              {/* Match Details */}
              <h1 className="text-sm lg:text-base font-bold text-slate-900 flex items-center gap-2 flex-wrap">
                <span className="text-slate-900 font-semibold">{match.homeTeam}</span>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-xs font-mono font-bold text-slate-900 border border-slate-200 tabular-nums">
                  {match.homeScore} – {match.awayScore}
                </span>
                <span className="text-slate-900 font-semibold">{match.awayTeam}</span>
                <span className="text-xs text-slate-500 font-normal hidden md:inline">
                  • {match.stadium}
                </span>
              </h1>
            </div>
          </div>

          {/* Right: Controls & Mode Switcher */}
          <div className="flex items-center gap-2 self-end sm:self-auto">

            {/* Azure Architecture button */}
            <button
              onClick={() => setIsAzureModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-medium transition cursor-pointer"
              title="View Microsoft Azure Hackathon Architecture"
            >
              <Cloud className="w-3.5 h-3.5 text-purple-700" />
              <span className="hidden sm:inline font-semibold">Azure Architecture</span>
            </button>

            {/* Live Streaming Status Indicator */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
              {isStreaming ? (
                <Wifi className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              ) : (
                <WifiOff className="w-3.5 h-3.5 text-slate-400" />
              )}
              <span className={`font-mono text-[11px] font-semibold ${isStreaming ? 'text-emerald-700' : 'text-slate-500'}`}>
                {isStreaming ? 'LIVE STREAM' : 'STANDBY'}
              </span>
            </div>

            {/* Mode Switcher */}
            <div className="bg-slate-100 p-0.5 rounded-lg border border-slate-200 flex items-center gap-0.5">
              <button
                onClick={() => onModeChange('live')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition cursor-pointer ${
                  activeMode === 'live'
                    ? 'bg-[#38003c] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                <span>Live Studio</span>
              </button>
              <button
                onClick={() => onModeChange('kmi')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition cursor-pointer ${
                  activeMode === 'kmi'
                    ? 'bg-[#38003c] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Post-Match KMI</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Azure Architecture & Rules Modal */}
      <AzureModal isOpen={isAzureModalOpen} onClose={() => setIsAzureModalOpen(false)} />
    </>
  );
}
