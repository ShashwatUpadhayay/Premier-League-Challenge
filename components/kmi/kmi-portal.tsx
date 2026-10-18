'use client';

import React, { useState } from 'react';
import { KmiRecord } from '@/lib/types';
import { Globe, Users, CheckCircle2, ShieldCheck, TrendingUp, BookOpen, Filter } from 'lucide-react';

interface KmiPortalProps {
  records: KmiRecord[];
}

type Language = 'en' | 'es' | 'fr' | 'ar' | 'hi';

export function KmiPortal({ records }: KmiPortalProps) {
  const [selectedLang, setSelectedLang] = useState<Language>('en');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' }
  ];

  const filteredRecords = selectedCategory === 'ALL'
    ? records
    : records.filter(r => r.category === selectedCategory);

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      {/* Top Banner: Premier League Key Match Incidents Panel */}
      <div className="bg-gradient-to-r from-[#38003c] via-purple-950 to-slate-900 border border-purple-500/30 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-black uppercase tracking-wider text-[#00ff87]">
              Independent KMI Panel Review
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">
              Official Post-Match Dossier
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white">
            Arsenal vs Manchester City • Matchweek 8 Review
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            A comprehensive, multilingual review of all key contested refereeing and VAR decisions evaluated by the 5-member Independent Key Match Incidents Panel.
          </p>
        </div>

        {/* Multilingual Selector */}
        <div className="flex flex-col items-end gap-1.5 self-stretch md:self-auto">
          <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-purple-400" />
            <span>Select Delivery Language:</span>
          </span>
          <div className="flex items-center gap-1 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => setSelectedLang(lang.code)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  selectedLang === lang.code
                    ? 'bg-purple-700 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <Filter className="w-3 h-3" /> Filter by Incident:
        </span>
        {['ALL', 'RED_CARD', 'HANDBALL', 'OFFSIDE'].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
              selectedCategory === cat
                ? 'bg-purple-800 text-white font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat === 'ALL' ? 'All Incidents (3)' : cat.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Incident Review Cards */}
      <div className="flex flex-col gap-4">
        {filteredRecords.map(record => {
          const isSplit = record.panelVerdict.includes('Split');
          const isArabic = selectedLang === 'ar';

          return (
            <div
              key={record.incidentId}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col gap-4 hover:border-slate-700 transition"
            >
              {/* Header: Minute, Title & Panel Verdict */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-950 text-[#00ff87] border border-slate-800">
                    {record.minute}&apos;
                  </span>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400 block">
                      {record.category}
                    </span>
                    <h3 className="text-base font-bold text-white leading-snug">
                      {record.title}
                    </h3>
                  </div>
                </div>

                {/* Panel Vote & Verdict Badge */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                    <Users className="w-3.5 h-3.5 text-purple-400" />
                    <span className="font-mono text-slate-300">
                      Votes: {record.panelVotes.inFavor}-{record.panelVotes.against}
                    </span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                    isSplit
                      ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                      : 'bg-emerald-500/10 text-[#00ff87] border border-emerald-500/30'
                  }`}>
                    {record.panelVerdict}
                  </span>
                </div>
              </div>

              {/* On-Field vs VAR Recommendation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">On-Field Call</span>
                  <span className="text-slate-200 font-medium mt-0.5 block">{record.onFieldCall}</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-purple-400 uppercase font-semibold block">VAR Recommendation</span>
                  <span className="text-[#00ff87] font-medium mt-0.5 block">{record.varRecommendation}</span>
                </div>
              </div>

              {/* Multilingual Official Explanation */}
              <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950/20 p-4 rounded-xl border border-purple-900/40">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-purple-300 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Official KMI Panel Verdict Explanation ({selectedLang.toUpperCase()})</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Deterministic &amp; Fact-Audited
                  </span>
                </div>
                <p className={`text-sm text-slate-100 leading-relaxed ${isArabic ? 'text-right font-serif' : ''}`}>
                  {record.explanation[selectedLang] || record.explanation.en}
                </p>
              </div>

              {/* Key Ground Truth Facts & IFAB Law */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Established Facts &amp; Telemetry</span>
                  </span>
                  <ul className="space-y-1.5 text-slate-400 text-[11px]">
                    {record.keyFacts.map((fact, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-purple-400">•</span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
                      <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                      <span>Applicable IFAB Regulation</span>
                    </span>
                    <p className="text-purple-300 text-xs font-semibold">
                      {record.applicableLaw}
                    </p>
                  </div>

                  {/* Impact Estimate */}
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-slate-400 text-[11px] flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-[#00ff87]" />
                      <span>{record.impactEstimate}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Verified Citations Badge List */}
              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500 font-mono">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Audited Event Citations:</span>
                  {record.citations.map(c => (
                    <span key={c} className="px-1.5 py-0.2 rounded bg-slate-950 text-purple-300 border border-slate-800">
                      {c}
                    </span>
                  ))}
                </div>
                <span>Incident Ref: {record.incidentId}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
