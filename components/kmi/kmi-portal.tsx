'use client';

import React, { useState } from 'react';
import { KmiRecord } from '@/lib/types';
import {
  Globe, Users, CheckCircle2, ShieldCheck,
  TrendingUp, BookOpen, SlidersHorizontal
} from 'lucide-react';

interface KmiPortalProps {
  records: KmiRecord[];
}

type Language = 'en' | 'es' | 'fr' | 'ar' | 'hi';

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
];

const CATEGORIES = ['ALL', 'RED_CARD', 'HANDBALL', 'OFFSIDE'] as const;

const CATEGORY_BADGE: Record<string, string> = {
  RED_CARD:    'bg-rose-950/50 text-rose-300 border-rose-800/50',
  HANDBALL:    'bg-purple-950/50 text-purple-300 border-purple-800/50',
  OFFSIDE:     'bg-sky-950/50 text-sky-300 border-sky-800/50',
  PENALTY:     'bg-amber-950/50 text-amber-300 border-amber-800/50',
  GOAL_REVIEW: 'bg-emerald-950/50 text-emerald-300 border-emerald-800/50',
};

export function KmiPortal({ records }: KmiPortalProps) {
  const [selectedLang, setSelectedLang] = useState<Language>('en');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredRecords = selectedCategory === 'ALL'
    ? records
    : records.filter(r => r.category === selectedCategory);

  return (
    <div className="flex flex-col gap-5 max-w-5xl mx-auto">

      {/* Page header */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Official Post-Match Dossier
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/50 font-mono">
              KMI Panel Review
            </span>
          </div>
          <h2 className="text-lg md:text-xl font-bold text-slate-100">
            Arsenal vs Manchester City — Matchweek 8
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Comprehensive review of all contested refereeing and VAR decisions, evaluated by the 5-member Independent Key Match Incidents Panel.
          </p>
        </div>

        {/* Language selector */}
        <div className="flex flex-col items-start md:items-end gap-1.5 flex-shrink-0">
          <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
            <Globe className="w-3 h-3" />
            Delivery language (Azure Translator)
          </span>
          <div className="flex items-center gap-0.5 bg-slate-900/80 p-0.5 rounded-lg border border-slate-800">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => setSelectedLang(lang.code)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition ${
                  selectedLang === lang.code
                    ? 'bg-[#38003c] text-white border border-purple-800/50'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                }`}
              >
                <span>{lang.flag}</span>
                <span className="hidden sm:inline">{lang.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-slate-500 flex items-center gap-1.5">
          <SlidersHorizontal className="w-3 h-3" />
          Filter:
        </span>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition border ${
              selectedCategory === cat
                ? 'bg-slate-700 text-slate-100 border-slate-600'
                : 'bg-slate-900/60 text-slate-500 hover:text-slate-300 border-slate-800/60 hover:border-slate-700'
            }`}
          >
            {cat === 'ALL' ? `All Incidents (${records.length})` : cat.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Incident cards */}
      <div className="flex flex-col gap-4">
        {filteredRecords.map(record => {
          const isSplit = record.panelVerdict.includes('Split');
          const isArabic = selectedLang === 'ar';
          const badgeClass = CATEGORY_BADGE[record.category] ?? 'bg-slate-800 text-slate-400 border-slate-700';

          return (
            <div
              key={record.incidentId}
              className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition"
            >
              {/* Card header */}
              <div className="p-4 border-b border-slate-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-900 text-slate-200 border border-slate-800 tabular-nums">
                    {record.minute}′
                  </span>
                  <div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${badgeClass}`}>
                      {record.category.replace('_', ' ')}
                    </span>
                    <h3 className="text-sm font-bold text-slate-100 mt-0.5 leading-snug">{record.title}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                    <Users className="w-3 h-3 text-slate-500" />
                    <span className="font-mono text-slate-400">
                      {record.panelVotes.inFavor}–{record.panelVotes.against}
                    </span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                    isSplit
                      ? 'bg-amber-950/50 text-amber-300 border-amber-800/50'
                      : 'bg-emerald-950/50 text-emerald-300 border-emerald-800/50'
                  }`}>
                    {record.panelVerdict}
                  </span>
                </div>
              </div>

              <div className="p-4 flex flex-col gap-4">
                {/* On-field vs VAR */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/60">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold block mb-1">On-Field Call</span>
                    <span className="text-slate-300 font-medium">{record.onFieldCall}</span>
                  </div>
                  <div className="bg-slate-900/50 p-2.5 rounded-lg border border-purple-900/20">
                    <span className="text-[10px] text-purple-400/70 uppercase font-semibold block mb-1">VAR Recommendation</span>
                    <span className="text-emerald-400 font-medium">{record.varRecommendation}</span>
                  </div>
                </div>

                {/* Multilingual explanation */}
                <div className="bg-slate-900/40 p-4 rounded-lg border border-slate-800/60">
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <span className="font-medium text-slate-400 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5" />
                      Official Verdict ({selectedLang.toUpperCase()})
                    </span>
                    <span className="text-[10px] text-slate-600 font-mono">Deterministic · Fact-Audited</span>
                  </div>
                  <p className={`text-sm text-slate-200 leading-relaxed ${isArabic ? 'text-right' : ''}`}>
                    {record.explanation[selectedLang] || record.explanation.en}
                  </p>
                </div>

                {/* Facts + IFAB */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-800/60">
                    <span className="font-semibold text-slate-400 flex items-center gap-1.5 mb-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      Established Facts
                    </span>
                    <ul className="space-y-1.5">
                      {record.keyFacts.map((fact, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[11px] text-slate-400">
                          <span className="text-slate-600 mt-0.5 flex-shrink-0">›</span>
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-800/60 flex flex-col justify-between">
                    <div>
                      <span className="font-semibold text-slate-400 flex items-center gap-1.5 mb-2">
                        <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                        Applicable IFAB Law
                      </span>
                      <p className="text-xs text-slate-300 font-medium">{record.applicableLaw}</p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center gap-1.5 text-[11px] text-slate-500">
                      <TrendingUp className="w-3 h-3" />
                      <span>{record.impactEstimate}</span>
                    </div>
                  </div>
                </div>

                {/* Citation trail */}
                <div className="flex items-center justify-between text-[11px] text-slate-600 font-mono pt-0.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span className="text-slate-500">Citations:</span>
                    {record.citations.map(c => (
                      <span key={c} className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-500 border border-slate-800/80 hover:text-slate-300 transition">
                        {c}
                      </span>
                    ))}
                  </div>
                  <span className="text-slate-700 hidden sm:block">{record.incidentId}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
