'use client';

import React from 'react';
import { FactPack, ExplanationDraft, CheckStepAudit } from '@/lib/types';
import {
  ShieldCheck, ShieldAlert, Sparkles, Check,
  AlertTriangle, Send, RefreshCw, Loader2
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
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-8 text-center h-full flex flex-col items-center justify-center gap-3">
        <Sparkles className="w-7 h-7 text-slate-700" />
        <p className="text-sm font-medium text-slate-500">No incident selected</p>
      </div>
    );
  }

  const isPassed = checkAudit?.status === 'PASSED';

  return (
    <div className="bg-[#0f172a] border border-slate-800 rounded-xl flex flex-col divide-y divide-slate-800/60">

      {/* Panel header + generation controls */}
      <div className="p-4 flex flex-col gap-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Explainability Gate
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/50 font-mono">
              Check Step
            </span>
          </div>
          <h2 className="text-sm font-bold text-slate-100">Automated Audit &amp; Producer Staging</h2>
        </div>

        {/* Demo controls: flaw injection */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] text-slate-500 font-medium mr-0.5">Generate:</span>

          <button
            onClick={() => onGenerate()}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#38003c] hover:bg-purple-950 text-white text-xs font-semibold transition border border-purple-800/50 disabled:opacity-50"
            title="Generate verified AI draft"
          >
            {isGenerating ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <Sparkles className="w-3 h-3" />
            )}
            <span>Clean Draft</span>
          </button>

          <button
            onClick={() => onGenerate('hallucinated_number')}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/60 hover:bg-rose-950/60 text-rose-300 hover:text-rose-200 text-xs font-medium transition border border-slate-700/50 hover:border-rose-800/60 disabled:opacity-50"
            title="Inject fake distance claim (34.5m)"
          >
            <AlertTriangle className="w-3 h-3" />
            <span>Test: Fake Figure</span>
          </button>

          <button
            onClick={() => onGenerate('invalid_id')}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/60 hover:bg-amber-950/60 text-amber-300 hover:text-amber-200 text-xs font-medium transition border border-slate-700/50 hover:border-amber-800/60 disabled:opacity-50"
            title="Inject non-existent Event ID (EVT_9999)"
          >
            <AlertTriangle className="w-3 h-3" />
            <span>Test: Fake ID</span>
          </button>
        </div>
      </div>

      {/* Gate status banner */}
      {checkAudit && (
        <div className={`p-4 flex items-start gap-3 ${
          isPassed
            ? 'bg-emerald-950/20 border-l-2 border-l-emerald-600'
            : 'bg-rose-950/20 border-l-2 border-l-rose-600'
        }`}>
          {isPassed ? (
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          ) : (
            <ShieldAlert className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className={`text-xs font-bold tracking-wide ${isPassed ? 'text-emerald-300' : 'text-rose-300'}`}>
                GATE: {checkAudit.status}
              </span>
              <div className="flex items-center gap-1.5">
                {checkAudit.isFallback && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950/40 text-amber-300 border border-amber-800/50 font-mono">
                    Fallback Active
                  </span>
                )}
                <span className="text-[10px] text-slate-500 font-mono">
                  {new Date(checkAudit.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>

            {/* Audit checklist */}
            <div className="flex flex-col gap-1.5 text-xs">
              <AuditRow
                passed={checkAudit.validCitations}
                label={checkAudit.validCitations
                  ? `Citations valid: [${checkAudit.citedIds.join(', ')}]`
                  : `Unrecognized IDs: [${checkAudit.unrecognizedEventIds.join(', ')}]`}
              />
              <AuditRow
                passed={checkAudit.hallucinatedFigures.length === 0}
                label={checkAudit.hallucinatedFigures.length === 0
                  ? 'Numerical grounding: 0 unverified figures'
                  : `Hallucination: [${checkAudit.hallucinatedFigures.join(', ')}] not in FactPack`}
              />
              <AuditRow
                passed={checkAudit.hasEstimateLabel}
                label="Impact labelled [ESTIMATE] — compliance verified"
              />
            </div>
          </div>
        </div>
      )}

      {/* Explanation text */}
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs mb-0.5">
          <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">
            {checkAudit?.isFallback ? 'Deterministic IFAB Fallback' : (draft?.headline || 'AI Explanation Draft')}
          </span>
          {checkAudit && (
            <span className="text-[10px] font-mono text-purple-400">
              {checkAudit.isFallback ? '100% Certified' : 'Gate Passed'}
            </span>
          )}
        </div>

        <div>
          <span className="text-[10px] text-slate-600 uppercase font-semibold block mb-1">Fan-Facing Text</span>
          <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/50 p-3 rounded-lg border border-slate-800/60 min-h-[3rem]">
            {checkAudit?.finalExplanation || (isGenerating ? 'Generating grounded draft…' : 'Click "Clean Draft" above to run the AI pipeline.')}
          </p>
        </div>

        <div>
          <span className="text-[10px] text-slate-600 uppercase font-semibold block mb-1">Studio / Commentator Notes</span>
          <p className="text-xs text-slate-300 font-mono leading-relaxed bg-slate-900/50 p-3 rounded-lg border border-slate-800/60 min-h-[2.5rem]">
            {checkAudit?.finalStudioBrief || (isGenerating ? 'Synthesising pundit notes…' : 'Waiting for draft.')}
          </p>
        </div>
      </div>

      {/* Producer action buttons */}
      <div className="p-4 flex items-center gap-2">
        <button
          onClick={onApproveBroadcast}
          disabled={!checkAudit}
          className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
            isApproved
              ? 'bg-emerald-700 hover:bg-emerald-600 text-white'
              : 'bg-[#38003c] hover:bg-purple-900 text-white border border-purple-800/50'
          } disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          {isApproved ? (
            <>
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>Approved — On Air</span>
            </>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>Approve for Broadcast</span>
            </>
          )}
        </button>

        <button
          onClick={onForceFallback}
          className="py-2.5 px-3 rounded-xl bg-slate-800/70 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs font-medium transition border border-slate-700/50 flex items-center gap-1.5"
          title="Force safe IFAB template"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Force Fallback</span>
        </button>
      </div>
    </div>
  );
}

function AuditRow({ passed, label }: { passed: boolean; label: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 ${
        passed ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50' : 'bg-rose-950/60 text-rose-400 border border-rose-800/50'
      }`}>
        {passed ? '✓' : '✕'}
      </span>
      <span className="text-slate-400 text-[11px] leading-relaxed">{label}</span>
    </div>
  );
}
