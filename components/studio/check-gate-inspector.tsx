'use client';

import React from 'react';
import { FactPack, ExplanationDraft, CheckStepAudit } from '@/lib/types';
import { ShieldCheck, ShieldAlert, Sparkles, Check, AlertTriangle, Send, RefreshCw } from 'lucide-react';

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
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-center text-slate-500 h-full flex flex-col items-center justify-center">
        <Sparkles className="w-10 h-10 mb-2 text-slate-700 animate-pulse" />
        <p className="text-sm font-medium">No active incident selected</p>
      </div>
    );
  }

  const isPassed = checkAudit?.status === 'PASSED';

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl flex flex-col gap-4">
      {/* Header & Testing Mode Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              The &quot;Check Step&quot; Gate
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-900/40 text-purple-300 font-mono">
              Explainability Firewall
            </span>
          </div>
          <h2 className="text-sm font-bold text-white">
            Draft Verification &amp; Producer Approval
          </h2>
        </div>

        {/* Flaw Injection Switch for Live Testing / Demos */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => onGenerate()}
            disabled={isGenerating}
            className="px-2 py-1 rounded text-[11px] font-medium bg-emerald-700 hover:bg-emerald-600 text-white transition flex items-center gap-1"
            title="Generate verified draft"
          >
            <Sparkles className="w-3 h-3" />
            <span>Clean AI Draft</span>
          </button>
          <button
            onClick={() => onGenerate('hallucinated_number')}
            disabled={isGenerating}
            className="px-2 py-1 rounded text-[11px] font-medium bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 transition flex items-center gap-1"
            title="Inject fake distance claim (34.5m)"
          >
            <AlertTriangle className="w-3 h-3 text-rose-400" />
            <span>Test Fake Figure</span>
          </button>
          <button
            onClick={() => onGenerate('invalid_id')}
            disabled={isGenerating}
            className="px-2 py-1 rounded text-[11px] font-medium bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-800 transition flex items-center gap-1"
            title="Inject non-existent Event ID (EVT_9999)"
          >
            <AlertTriangle className="w-3 h-3 text-amber-400" />
            <span>Test Fake ID</span>
          </button>
        </div>
      </div>

      {/* Check Step Gate Status Banner */}
      {checkAudit && (
        <div className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all ${
          isPassed
            ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
            : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
        }`}>
          {isPassed ? (
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <ShieldAlert className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
          )}

          <div className="flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="font-bold text-sm tracking-wide flex items-center gap-2">
                <span>CHECK STEP: {checkAudit.status}</span>
                {checkAudit.isFallback && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono">
                    Deterministic Fallback Enforced
                  </span>
                )}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {new Date(checkAudit.timestamp).toLocaleTimeString()}
              </span>
            </div>

            {/* Check Step Criteria Audit */}
            <div className="mt-2.5 grid grid-cols-1 gap-1.5 text-xs">
              <div className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  checkAudit.validCitations ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
                }`}>
                  {checkAudit.validCitations ? '✓' : '✕'}
                </span>
                <span className="text-slate-300">
                  {checkAudit.validCitations
                    ? `Event IDs Verified: [${checkAudit.citedIds.join(', ')}]`
                    : `Citations Flagged: Unrecognized IDs [${checkAudit.unrecognizedEventIds.join(', ')}]`}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  checkAudit.hallucinatedFigures.length === 0 ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
                }`}>
                  {checkAudit.hallucinatedFigures.length === 0 ? '✓' : '✕'}
                </span>
                <span className="text-slate-300">
                  {checkAudit.hallucinatedFigures.length === 0
                    ? 'Numerical Grounding: 0 unverified figures found.'
                    : `Hallucination Flagged: [${checkAudit.hallucinatedFigures.join(', ')}] not in FactPack.`}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  checkAudit.hasEstimateLabel ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
                }`}>
                  {checkAudit.hasEstimateLabel ? '✓' : '✕'}
                </span>
                <span className="text-slate-300">
                  Impact Compliance: Tagged with mandatory [ESTIMATE] label.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Explanation Text Preview */}
      <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 flex flex-col gap-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
            {checkAudit?.isFallback ? 'Deterministic IFAB Fallback Text' : (draft?.headline || 'Verified AI Explanation Draft')}
          </span>
          <span className="text-[10px] font-mono text-purple-400">
            {checkAudit?.isFallback ? 'Zero Hallucination Guaranteed' : 'Passed Strict Audit'}
          </span>
        </div>


        <div>
          <span className="text-[11px] text-slate-500 uppercase font-semibold block mb-0.5">Fan-Facing Delivery:</span>
          <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/60 p-2.5 rounded border border-slate-800/80">
            {checkAudit?.finalExplanation || (isGenerating ? 'Generating grounded draft...' : 'Click "Clean AI Draft" to run.')}
          </p>
        </div>

        <div>
          <span className="text-[11px] text-slate-500 uppercase font-semibold block mb-0.5">Studio / Pundit Brief:</span>
          <p className="text-xs text-slate-300 font-mono leading-relaxed bg-slate-900/60 p-2.5 rounded border border-slate-800/80">
            {checkAudit?.finalStudioBrief || (isGenerating ? 'Synthesizing pundit notes...' : 'Waiting for draft generation.')}
          </p>
        </div>
      </div>

      {/* Producer Actions: 1-Click Approve to Broadcast */}
      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={onApproveBroadcast}
          disabled={!checkAudit}
          className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg ${
            isApproved
              ? 'bg-[#00ff87] text-slate-950 shadow-emerald-500/20'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/40'
          }`}
        >
          {isApproved ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>APPROVED TO BROADCAST (ON AIR)</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>APPROVE TO BROADCAST SCREEN</span>
            </>
          )}
        </button>

        <button
          onClick={onForceFallback}
          className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs transition border border-slate-700 flex items-center gap-1.5"
          title="Force safe rule template"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Force Fallback</span>
        </button>
      </div>
    </div>
  );
}
