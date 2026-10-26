'use client';

import React from 'react';
import { FactPack, ExplanationDraft, CheckStepAudit } from '@/lib/types';
import {
  ShieldCheck, ShieldAlert, Sparkles, Check,
  AlertTriangle, Send, RefreshCw, Loader2, Award
} from 'lucide-react';

interface CheckGateInspectorProps {
  factPack: FactPack | null;
  draft: ExplanationDraft | null;
  checkAudit: CheckStepAudit | null;
  isGenerating: boolean;
  onGenerate: (flaw?: 'hallucinated_number' | 'invalid_id') => void;
  onApproveBroadcast: () => void;
  onForceFallback: () => void;
  isApproved: boolean;
}

export function CheckGateInspector({
  factPack,
  draft,
  checkAudit,
  isGenerating,
  onGenerate,
  onApproveBroadcast,
  onForceFallback,
  isApproved
}: CheckGateInspectorProps) {
  if (!factPack) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-8 text-center h-full flex flex-col items-center justify-center gap-3 shadow-xs">
        <Sparkles className="w-8 h-8 text-slate-300" />
        <p className="text-sm font-semibold text-slate-600">No active incident selected</p>
      </div>
    );
  }

  const isPassed = checkAudit?.status === 'PASSED';

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col divide-y divide-slate-100">

      {/* Header: Explainability Gate Title & Testing Controls */}
      <div className="p-4 bg-slate-50/50 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-900">
                The &ldquo;Check Step&rdquo; Guardrail
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-mono font-bold">
                Explainability Gate
              </span>
            </div>
            <h2 className="text-base font-bold text-slate-900">
              AI Verification &amp; Broadcast Approval
            </h2>
          </div>
          <div className="p-2 rounded-lg bg-white border border-slate-200 text-purple-900 shadow-xs">
            <Award className="w-4 h-4" />
          </div>
        </div>

        {/* Demo Controls: Generate & Flaw Injection */}
        <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex items-center justify-between gap-2 flex-wrap shadow-2xs">
          <span className="text-xs font-bold text-slate-700">Actions:</span>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => onGenerate()}
              disabled={isGenerating}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#38003c] hover:bg-purple-950 text-white text-xs font-bold transition shadow-xs disabled:opacity-50 cursor-pointer"
              title="Generate verified AI draft"
            >
              {isGenerating ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5" />
              )}
              <span>Generate Clean Draft</span>
            </button>

            <button
              onClick={() => onGenerate('hallucinated_number')}
              disabled={isGenerating}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200 transition disabled:opacity-50 cursor-pointer"
              title="Inject fake figure (34.5m) to verify Check Step rejection"
            >
              <AlertTriangle className="w-3 h-3 text-rose-600" />
              <span>Test Fake Figure</span>
            </button>

            <button
              onClick={() => onGenerate('invalid_id')}
              disabled={isGenerating}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200 transition disabled:opacity-50 cursor-pointer"
              title="Inject unverified Event ID (EVT_9999) to verify rejection"
            >
              <AlertTriangle className="w-3 h-3 text-amber-600" />
              <span>Test Fake ID</span>
            </button>
          </div>
        </div>
      </div>

      {/* Check Step Gate Status Banner */}
      {checkAudit && (
        <div className={`p-4 transition-all ${
          isPassed
            ? 'bg-emerald-50/70 border-l-4 border-l-emerald-600'
            : 'bg-rose-50/70 border-l-4 border-l-rose-600'
        }`}>
          <div className="flex items-start gap-3">
            {isPassed ? (
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0 mt-0.5 border border-emerald-300">
                <ShieldCheck className="w-5 h-5" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 flex-shrink-0 mt-0.5 border border-rose-300">
                <ShieldAlert className="w-5 h-5" />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-black tracking-wide uppercase ${
                    isPassed ? 'text-emerald-900' : 'text-rose-900'
                  }`}>
                    GATE STATUS: {checkAudit.status}
                  </span>
                  {checkAudit.isFallback && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-mono font-bold">
                      Deterministic IFAB Fallback Enforced
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-slate-500 font-mono">
                  Audited at {new Date(checkAudit.timestamp).toLocaleTimeString()}
                </span>
              </div>

              {/* Audit Checklist Items */}
              <div className="flex flex-col gap-1.5 mt-2">
                <AuditRowItem
                  passed={checkAudit.validCitations}
                  title="Event Citations Audit"
                  detail={checkAudit.validCitations
                    ? `All cited Event IDs [${checkAudit.citedIds.join(', ')}] confirmed in FactPack.`
                    : `Flagged unrecognized Event IDs: [${checkAudit.unrecognizedEventIds.join(', ')}]`}
                />
                <AuditRowItem
                  passed={checkAudit.hallucinatedFigures.length === 0}
                  title="Numerical Grounding"
                  detail={checkAudit.hallucinatedFigures.length === 0
                    ? '0 unverified figures detected. All numbers strictly match telemetry.'
                    : `Flagged ungrounded figure(s): [${checkAudit.hallucinatedFigures.join(', ')}] not in FactPack.`}
                />
                <AuditRowItem
                  passed={checkAudit.hasEstimateLabel}
                  title="Editorial Label Compliance"
                  detail="Analytical leverage strictly verified with explicit [ESTIMATE] designation."
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generated Explanation Content */}
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
            {checkAudit?.isFallback ? 'Deterministic IFAB Rule Text' : (draft?.headline || 'Certified Explanation Draft')}
          </span>
          {checkAudit && (
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-900 border border-purple-200">
              {checkAudit.isFallback ? '100% Certified Safe' : 'Audit Certified'}
            </span>
          )}
        </div>

        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Fan-Facing Public Explanation
          </span>
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 leading-relaxed font-medium">
            {checkAudit?.finalExplanation || (isGenerating ? 'Generating certified draft from FactPack...' : 'Click "Generate Clean Draft" above to run the pipeline.')}
          </div>
        </div>

        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Studio Pundit &amp; Commentator Notes
          </span>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 font-mono leading-relaxed">
            {checkAudit?.finalStudioBrief || (isGenerating ? 'Synthesizing commentator brief...' : 'Waiting for verified draft.')}
          </div>
        </div>
      </div>

      {/* Action Strip: 1-Click Approve to Broadcast */}
      <div className="p-4 bg-slate-50/50 flex items-center gap-2">
        <button
          onClick={onApproveBroadcast}
          disabled={!checkAudit}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm cursor-pointer ${
            isApproved
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-[#38003c] hover:bg-purple-950 text-white'
          } disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          {isApproved ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>APPROVED — LIVE ON BROADCAST SCREEN</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>APPROVE FOR BROADCAST OVERLAY</span>
            </>
          )}
        </button>

        <button
          onClick={onForceFallback}
          className="py-3 px-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs transition border border-slate-300 flex items-center gap-1.5 shadow-2xs cursor-pointer"
          title="Force safe rule template"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Force Fallback</span>
        </button>
      </div>
    </div>
  );
}

function AuditRowItem({ passed, title, detail }: { passed: boolean; title: string; detail: string }) {
  return (
    <div className="flex items-start gap-2 text-xs">
      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5 ${
        passed ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
      }`}>
        {passed ? '✓' : '✕'}
      </span>
      <div className="min-w-0">
        <span className="font-bold text-slate-900 mr-1">{title}:</span>
        <span className="text-slate-600 text-[11px] leading-relaxed">{detail}</span>
      </div>
    </div>
  );
}
