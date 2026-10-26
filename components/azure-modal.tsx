'use client';

import React from 'react';
import { Cloud, CheckCircle2, Cpu, Database, Globe, Volume2, Shield, X, Award } from 'lucide-react';

interface AzureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AzureModal({ isOpen, onClose }: AzureModalProps) {
  if (!isOpen) return null;

  const services = [
    {
      name: 'Microsoft Foundry & Azure OpenAI',
      role: 'Reasoning agent drafting explainable officiating insights strictly grounded in FactPack telemetry.',
      tech: 'GPT-4o / GPT-4o-mini with Pydantic JSON Schema enforcement',
      status: 'Active (Fallback + Live Hook ready)',
      icon: Cpu,
      badgeStyle: 'text-purple-800 bg-purple-50 border-purple-200'
    },
    {
      name: 'Azure AI Translator',
      role: 'Translates verified post-match KMI panel dossiers into 5 languages without altering numerical facts.',
      tech: 'Azure Text Translation API v3.0 (en, es, fr, ar, hi)',
      status: 'Active (Pre-computed + API Hook)',
      icon: Globe,
      badgeStyle: 'text-sky-800 bg-sky-50 border-sky-200'
    },
    {
      name: 'Microsoft Fabric (Eventstream & Lakehouse)',
      role: 'High-throughput ingestion of live Premier League optical tracking and event data directly into Delta Lake.',
      tech: 'Fabric Real-Time Analytics + Lakehouse Delta Tables',
      status: 'Architecture Mapped (SSE Simulation in MVP)',
      icon: Database,
      badgeStyle: 'text-emerald-800 bg-emerald-50 border-emerald-200'
    },
    {
      name: 'Azure AI Search',
      role: 'Hybrid vector & semantic retrieval over the complete IFAB Laws of the Game and PGMOL guidance handbook.',
      tech: 'Azure Cognitive Search with text-embedding-3-small',
      status: 'Rules Codified in lib/ifab-rules.ts',
      icon: Cloud,
      badgeStyle: 'text-amber-800 bg-amber-50 border-amber-200'
    },
    {
      name: 'Azure AI Speech',
      role: 'Generates in-stadium PA and broadcast speech announcements for approved VAR decisions.',
      tech: 'Azure Neural TTS (en-GB-RyanNeural)',
      status: 'Planned / Web Speech API Fallback',
      icon: Volume2,
      badgeStyle: 'text-pink-800 bg-pink-50 border-pink-200'
    },
    {
      name: 'Azure Container Apps',
      role: 'Serverless, scalable microservices hosting for Next.js UI, SSE match stream, and check-step API.',
      tech: 'Azure Container Apps with revision management',
      status: 'Production Deployment Ready',
      icon: Shield,
      badgeStyle: 'text-indigo-800 bg-indigo-50 border-indigo-200'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-purple-900 bg-[#38003c] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-200">
                  Microsoft x Premier League Hackathon
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white font-mono font-bold">
                  Official Brief Alignment
                </span>
              </div>
              <h2 className="text-base font-bold text-white mt-0.5">
                Azure Architecture &amp; Implementation Rules
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="bg-purple-50/60 p-4 rounded-xl border border-purple-200 text-xs text-purple-950 leading-relaxed">
            <strong className="text-purple-900 font-bold block mb-1">Hackathon Rule &amp; Challenge Objective:</strong>
            Build an explainable, trust-first decision intelligence layer for Premier League officiating that analyzes match telemetry, retrieves IFAB Laws, and delivers neutral, certified explanations for live broadcast and post-match KMI reviews using Microsoft Azure services.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <div key={i} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                        <div className={`p-1.5 rounded-md border ${svc.badgeStyle}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span>{svc.name}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {svc.role}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-mono text-[10px]">{svc.tech}</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {svc.status.includes('Active') ? 'Active' : 'Architecture'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Responsible AI Compliance Checklist */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-purple-900" />
              <span>Microsoft Responsible AI Implementation Rules</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
              <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                <span><strong>Neutrality:</strong> Explains rules and sensor facts; never blames or accuses referees.</span>
              </div>
              <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                <span><strong>Human-in-the-Loop:</strong> Studio producer 1-click review before on-air broadcast.</span>
              </div>
              <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                <span><strong>Grounding Firewall:</strong> Rejects unverified numbers; falls back to deterministic rule templates.</span>
              </div>
              <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                <span><strong>Explicit Estimates:</strong> Analytical deltas (xG, win%) are strictly marked as [ESTIMATE].</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Microsoft Foundry • Azure OpenAI • Azure Translator • Microsoft Fabric</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#38003c] hover:bg-purple-950 text-white font-bold transition shadow-xs cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
