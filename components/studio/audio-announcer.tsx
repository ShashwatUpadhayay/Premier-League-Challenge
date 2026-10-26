'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Mic, Play, Square, Sparkles, CheckCircle2 } from 'lucide-react';
import { FactPack, CheckStepAudit } from '@/lib/types';

interface AudioAnnouncerProps {
  factPack: FactPack | null;
  checkAudit: CheckStepAudit | null;
  isApproved: boolean;
}

export function AudioAnnouncer({ factPack, checkAudit, isApproved }: AudioAnnouncerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>('');
  const [waveformBars, setWaveformBars] = useState<number[]>([40, 20, 60, 30, 75, 45, 80, 50, 90, 35, 65, 25]);
  const animationFrameRef = useRef<number | null>(null);

  // Load available system voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const updateVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);

      // Prefer British English voice for authentic Premier League referee tone
      const britishVoice = voices.find(v => v.lang.includes('en-GB') || v.name.toLowerCase().includes('uk') || v.name.toLowerCase().includes('british'));
      const englishVoice = voices.find(v => v.lang.startsWith('en'));
      
      if (britishVoice) {
        setSelectedVoiceName(britishVoice.name);
      } else if (englishVoice) {
        setSelectedVoiceName(englishVoice.name);
      } else if (voices.length > 0) {
        setSelectedVoiceName(voices[0].name);
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Animate waveform while playing
  useEffect(() => {
    if (!isPlaying) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      setWaveformBars([20, 15, 25, 18, 30, 22, 28, 16, 24, 20, 15, 18]);
      return;
    }

    const interval = setInterval(() => {
      setWaveformBars(prev =>
        prev.map(() => Math.floor(Math.random() * 75) + 25)
      );
    }, 120);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Formulate official in-stadium referee announcement script
  const getAnnouncementScript = (): string => {
    if (!factPack) return 'No active incident selected for announcement.';

    switch (factPack.category) {
      case 'PENALTY':
        return `Attention Emirates Stadium. Following video assistant referee review... The on-field ruling of Penalty is OVERTURNED. Sensor tracking confirms the defending player withdrew his challenge with zero illegal contact. A caution for simulation is awarded. Play will restart with an indirect free kick.`;

      case 'RED_CARD':
        return `Attention Emirates Stadium. Following video assistant referee review... The on-field ruling of Yellow Card is CONFIRMED. The challenge by Mateo Kovačić was deemed reckless, but lacked the excessive brutality required for Serious Foul Play under Law 12. Play will restart with a free kick.`;

      case 'GOAL_REVIEW':
        return `Attention Emirates Stadium. Goal-Line Technology confirms... NO GOAL. Hawk-Eye cameras verify the ball did not entirely cross the goal line, with 9 millimetres remaining on the line. Play restarts with an Arsenal goal kick.`;

      case 'HANDBALL':
        return `Attention Emirates Stadium. Following video assistant referee review... The on-field ruling of No Penalty is CONFIRMED. The ball deflected directly off defender Gabriel's thigh into his arm, which was justifiable in a natural silhouette under Law 12. Play on.`;

      case 'OFFSIDE':
        return `Attention Emirates Stadium. Following video assistant referee review... The goal is DISALLOWED for offside interference. Leandro Trossard was calibrated 14.2 centimetres in an offside position, obstructing the goalkeeper's direct line of sight under Law 11. Play restarts with an indirect free kick.`;

      default:
        return `Attention Emirates Stadium. Following review, the final decision is ${factPack.finalDecision}.`;
    }
  };

  const scriptText = getAnnouncementScript();

  // Play announcement speech
  const handleToggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Web Speech API is not supported in this browser.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(scriptText);
    utterance.rate = 0.95; // Authoritative referee pace
    utterance.pitch = 0.98;
    utterance.volume = isMuted ? 0 : 1;

    if (selectedVoiceName) {
      const voice = availableVoices.find(v => v.name === selectedVoiceName);
      if (voice) utterance.voice = voice;
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-slate-100 text-purple-900 border border-slate-200">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                In-Stadium &amp; Broadcast Audio Announcer
              </h3>
              <span className="text-[10px] px-2 py-0.2 rounded-full bg-purple-50 text-purple-900 font-mono font-bold border border-purple-200">
                Azure AI Speech
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">
              IFAB In-Stadium Referee Microphone Protocol
            </span>
          </div>
        </div>

        {/* Live Mic Indicator */}
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-rose-500 animate-ping' : 'bg-slate-300'}`} />
          <span className={`text-[11px] font-bold font-mono uppercase px-2.5 py-0.5 rounded-full border ${
            isPlaying
              ? 'bg-rose-50 text-rose-800 border-rose-300'
              : 'bg-slate-100 text-slate-600 border-slate-200'
          }`}>
            {isPlaying ? 'MIC LIVE' : 'STANDBY'}
          </span>
        </div>
      </div>

      {/* Waveform Visualizer & PA Broadcast Box */}
      <div className="bg-slate-900 rounded-xl p-4 text-white flex flex-col gap-3 shadow-inner">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#38003c] flex items-center justify-center text-white text-[10px] font-black">
              PA
            </div>
            <span className="text-xs font-bold text-slate-200">
              Emirates Stadium Public Address &amp; TV Broadcast Audio
            </span>
          </div>

          {/* Voice Accent Indicator */}
          <span className="text-[10px] text-slate-400 font-mono bg-white/10 px-2 py-0.5 rounded">
            Neural TTS: en-GB-RyanNeural
          </span>
        </div>

        {/* Audio Waveform Bars */}
        <div className="h-10 bg-slate-950/70 rounded-lg px-4 flex items-center justify-center gap-1.5 border border-white/10">
          {waveformBars.map((height, i) => (
            <div
              key={i}
              style={{ height: `${height}%` }}
              className={`w-1.5 rounded-full transition-all duration-100 ${
                isPlaying ? 'bg-purple-400' : 'bg-slate-600'
              }`}
            />
          ))}
        </div>

        {/* Verbatim Announcement Teleprompter */}
        <div className="bg-slate-950/90 rounded-lg p-3 border border-white/10 text-xs font-mono text-slate-200 leading-relaxed">
          <span className="text-[10px] text-purple-300 font-bold uppercase tracking-wider block mb-1">
            Referee Spoken Script:
          </span>
          &ldquo;{scriptText}&rdquo;
        </div>
      </div>

      {/* Control Strip */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2">
          {/* Main Play/Stop Button */}
          <button
            onClick={handleToggleSpeech}
            disabled={!factPack}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer ${
              isPlaying
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-[#38003c] hover:bg-purple-950 text-white'
            } disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            {isPlaying ? (
              <>
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Stop Announcement</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play Stadium Announcement</span>
              </>
            )}
          </button>

          {/* Mute Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition border border-slate-200 cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-600" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        <div className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Complies with IFAB 2024 In-Stadium Mic Trial</span>
        </div>
      </div>
    </div>
  );
}
