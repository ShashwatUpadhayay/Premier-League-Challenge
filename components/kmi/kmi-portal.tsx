'use client';

import React, { useState } from 'react';
import { KmiRecord } from '@/lib/types';
import {
  Globe, Users, CheckCircle2, ShieldCheck,
  TrendingUp, BookOpen, SlidersHorizontal, Award
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
  RED_CARD:    'bg-rose-50 text-rose-800 border-rose-200',
  HANDBALL:    'bg-purple-50 text-purple-800 border-purple-200',
  OFFSIDE:     'bg-sky-50 text-sky-800 border-sky-200',
  PENALTY:     'bg-amber-50 text-amber-800 border-amber-200',
  GOAL_REVIEW: 'bg-emerald-50 text-emerald-800 border-emerald-200',
};

export function KmiPortal({ records }: KmiPortalProps) {
  const [selectedLang, setSelectedLang] = useState<Language>('en');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredRecords = selectedCategory === 'ALL'
    ? records
    : records.filter(r => r.category === selectedCategory);

  return (
    <div className="flex flex-col gap-5 max-w-5xl mx-auto pb-8">

      {/* Top Banner: Independent KMI Panel Review */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-900">
              Independent KMI Panel Review
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-mono font-bold">
              Official Post-Match Dossier
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900">
            Arsenal vs Manchester City — Matchweek 8 Review
          </h2>
          <p className="text-xs text-slate-600 mt-1.5 max-w-2xl leading-relaxed">
            A comprehensive, multilingual analysis of all contested refereeing and VAR decisions evaluated by the 5-member Independent Key Match Incidents Panel.
          </p>
        </div>

        {/* Multilingual Selector */}
        <div className="flex flex-col items-start md:items-end gap-1.5 flex-shrink-0">
          <span className="text-xs text-slate-600 font-semibold flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-purple-900" />
            <span>Delivery Language (Azure Translator):</span>
          </span>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => setSelectedLang(lang.code)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  selectedLang === lang.code
                    ? 'bg-[#38003c] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <span>{lang.flag}</span>
                <span className="hidden sm:inline">{lang.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Filter:
        </span>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition border cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#38003c] text-white border-[#38003c] shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat === 'ALL' ? `All Incidents (${records.length})` : cat.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Incident Review Cards */}
      <div className="flex flex-col gap-4">
        {filteredRecords.map(record => {
          const isSplit = record.panelVerdict.includes('Split');
          const isArabic = selectedLang === 'ar';
          const badgeClass = CATEGORY_BADGE[record.category] ?? 'bg-slate-100 text-slate-800 border-slate-200';

          return (
            <div
              key={record.incidentId}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:border-slate-300 transition"
            >
              {/* Card Header: Minute, Title & Panel Verdict */}
              <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <span className="text-base font-mono font-black px-3 py-1 rounded-lg bg-white text-slate-900 border border-slate-200 shadow-2xs tabular-nums">
                    {record.minute}′
                  </span>
                  <div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${badgeClass}`}>
                      {record.category.replace('_', ' ')}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1 leading-snug">
                      {record.title}
                    </h3>
                  </div>
                </div>

                {/* Panel Vote & Verdict */}
                <div className="flex items-center gap-2 self-start sm:self-center">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs shadow-2xs">
                    <Users className="w-3.5 h-3.5 text-purple-900" />
                    <span className="font-mono font-bold text-slate-800">
                      Panel: {record.panelVotes.inFavor}–{record.panelVotes.against}
                    </span>
                  </div>
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-black border ${
                    isSplit
                      ? 'bg-amber-50 text-amber-900 border-amber-300'
                      : 'bg-emerald-50 text-emerald-900 border-emerald-300'
                  }`}>
                    {record.panelVerdict}
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col gap-4">
                {/* On-Field vs VAR Recommendation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block mb-1">
                      On-Field Call
                    </span>
                    <span className="text-slate-800 font-bold">{record.onFieldCall}</span>
                  </div>
                  <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-200">
                    <span className="text-[10px] text-emerald-800 uppercase font-bold tracking-wider block mb-1">
                      VAR Recommendation
                    </span>
                    <span className="text-emerald-900 font-bold">{record.varRecommendation}</span>
                  </div>
                </div>

                {/* Multilingual Official Explanation */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-purple-900" />
                      Official KMI Panel Verdict Explanation ({selectedLang.toUpperCase()})
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono font-bold">
                      Certified Grounded
                    </span>
                  </div>
                  <p className={`text-sm text-slate-800 leading-relaxed font-medium ${isArabic ? 'text-right' : ''}`}>
                    {record.explanation[selectedLang] || record.explanation.en}
                  </p>
                </div>

                {/* Key Facts & Applicable Regulation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5 mb-2.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Established Facts &amp; Telemetry
                    </span>
                    <ul className="space-y-1.5">
                      {record.keyFacts.map((fact, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <span className="text-purple-900 font-bold mt-0.5">•</span>
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-col justify-between">
                    <div>
                      <span className="font-bold text-slate-900 flex items-center gap-1.5 mb-2">
                        <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                        Applicable IFAB Regulation
                      </span>
                      <p className="text-xs text-amber-950 font-bold leading-snug">
                        {record.applicableLaw}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between text-xs">
                      <span className="text-slate-600 flex items-center gap-1 font-medium">
                        <TrendingUp className="w-3.5 h-3.5 text-purple-900" />
                        <span>{record.impactEstimate}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Citations & Reference */}
                <div className="flex items-center justify-between text-xs text-slate-500 font-mono pt-1 border-t border-slate-100 flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="font-semibold text-slate-600">Audited Citations:</span>
                    {record.citations.map(c => (
                      <span key={c} className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 text-[11px] font-bold">
                        {c}
                      </span>
                    ))}
                  </div>
                  <span className="text-slate-400 text-[11px]">Dossier ID: {record.incidentId}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
