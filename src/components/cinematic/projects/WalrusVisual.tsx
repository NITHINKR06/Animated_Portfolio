/**
 * @component WalrusVisual
 * @description Experimental AI Threat Intelligence Visualization for WALRUS
 * Concept: Radial scanning beam, multi-layer zero-shot transformer inference (BART-large-MNLI), and 2015-2035 Time Machine spectrum.
 *
 * @author Nithin K R (https://github.com/NITHINKR06)
 * @license Attribution required
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, AlertTriangle, Layers, BrainCircuit, Scan, History } from 'lucide-react';

export function WalrusVisual() {
  const [selectedVector, setSelectedVector] = useState<'quishing' | 'phish' | 'benign'>('quishing');

  const attackVectors = {
    quishing: {
      name: 'QR-CODE QUISHING // SMS FRAUD',
      rawPayload: 'URGENT: Bank account restricted. Scan attached QR code within 15 mins to verify identity.',
      classification: 'PHISHING & CREDENTIAL THEFT',
      confidence: '98.7%',
      riskLevel: 'CRITICAL',
      era: '2025 // GEN-AI VECTOR',
      modelScore: 0.987,
    },
    phish: {
      name: 'DEEPFAKE CEO VOICEMAIL URL',
      rawPayload: 'Wire transfer auth approved by Executive Office: https://portal-corp-auth-secure.io/auth',
      classification: 'IMPERSONATION / EXECUTIVE FRAUD',
      confidence: '95.2%',
      riskLevel: 'HIGH',
      era: '2030 // AUTONOMOUS AGENTIC',
      modelScore: 0.952,
    },
    benign: {
      name: 'CLEAN MULTI-FACTOR TOKEN',
      rawPayload: 'Your single-use security passcode is 492104. This expires in 5 minutes.',
      classification: 'BENIGN // AUTHENTIC VERIFICATION',
      confidence: '99.1%',
      riskLevel: 'SAFE',
      era: 'STANDARD OTP',
      modelScore: 0.009,
    },
  };

  const current = attackVectors[selectedVector];

  return (
    <div className="relative w-full min-h-[460px] sm:min-h-[520px] bg-[#0A0B0E] border border-[rgba(214,185,154,0.14)] rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden select-none">
      {/* Background Architectural Grid & Radar Glow */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #D6B99A 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full bg-[#5A1832]/20 blur-3xl pointer-events-none" />

      {/* TOP HUD: Model Telemetry & Attack Vector Switcher */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-[rgba(214,185,154,0.1)] pb-4 font-mono text-[11px]">
        <div className="flex items-center gap-3">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#873653] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#873653]" />
          </span>
          <span className="text-[#F0EAE3] tracking-wider uppercase font-semibold">
            WALRUS // ZERO-SHOT THREAT RADAR
          </span>
          <span className="text-[#D6B99A] hidden sm:inline">
            MODEL: BART-LARGE-MNLI
          </span>
        </div>

        {/* Vector Switcher Buttons */}
        <div className="flex items-center gap-1.5">
          {(['quishing', 'phish', 'benign'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setSelectedVector(v)}
              className={`px-2.5 py-1 rounded border font-mono text-[10px] uppercase transition-all ${
                selectedVector === v
                  ? 'bg-[#5A1832] border-[#873653] text-[#F0EAE3] font-bold shadow-[0_0_12px_rgba(135,54,83,0.35)]'
                  : 'bg-[#151116] border-[rgba(214,185,154,0.1)] text-[#969099] hover:text-[#F0EAE3]'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* CENTERPIECE: Radial Neural Scanner & Transformer Layers */}
      <div className="relative z-10 my-auto py-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Column: Radial Radar Scope (5 Cols) */}
        <div className="md:col-span-5 flex items-center justify-center">
          <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-full border border-[rgba(214,185,154,0.15)] flex items-center justify-center">
            {/* Concentric Radar Rings */}
            <div className="absolute inset-4 rounded-full border border-[rgba(214,185,154,0.1)]" />
            <div className="absolute inset-10 rounded-full border border-[#873653]/30" />
            <div className="absolute inset-16 rounded-full border border-[rgba(214,185,154,0.1)]" />

            {/* Crosshairs */}
            <div className="absolute inset-x-0 h-[1px] bg-[rgba(214,185,154,0.1)]" />
            <div className="absolute inset-y-0 w-[1px] bg-[rgba(214,185,154,0.1)]" />

            {/* Rotating Radar Sweep Beam */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full pointer-events-none origin-center"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 270deg, rgba(135,54,83,0.15) 330deg, rgba(214,185,154,0.4) 360deg)',
              }}
            />

            {/* Detected Target Blip */}
            <motion.div
              key={selectedVector}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 15 }}
              className={`absolute top-1/4 right-1/4 w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                selectedVector === 'benign'
                  ? 'bg-emerald-500 shadow-[0_0_12px_#10B981]'
                  : 'bg-[#873653] shadow-[0_0_15px_#873653]'
              }`}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </motion.div>

            {/* Center Core HUD */}
            <div className="relative z-10 w-16 h-16 rounded-full bg-[#151116] border border-[#873653] flex flex-col items-center justify-center text-center font-mono">
              <BrainCircuit size={16} className="text-[#D6B99A]" />
              <span className="text-[8px] text-[#969099] mt-0.5">HF NLP</span>
            </div>
          </div>
        </div>

        {/* Right Column: Transformer Inference & Attention Distribution (7 Cols) */}
        <div className="md:col-span-7 space-y-3.5">
          {/* Inbound Payload Inspector */}
          <div className="p-3.5 rounded-xl bg-[#151116] border border-[rgba(214,185,154,0.12)] font-mono">
            <div className="flex items-center justify-between text-[10px] text-[#969099] mb-1.5">
              <span className="text-[#873653] font-bold">PAYLOAD INTERCEPT</span>
              <span>TOKEN COUNT: 18</span>
            </div>
            <p className="text-xs text-[#F0EAE3] line-clamp-2 leading-relaxed italic">
              "{current.rawPayload}"
            </p>
          </div>

          {/* Classification Logit Bars */}
          <div className="p-4 rounded-xl bg-[#151116] border border-[rgba(214,185,154,0.12)] space-y-3">
            <div className="flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2">
                {selectedVector === 'benign' ? (
                  <ShieldCheck size={14} className="text-emerald-400" />
                ) : (
                  <AlertTriangle size={14} className="text-[#873653]" />
                )}
                <span className="text-[#F0EAE3] font-bold">{current.classification}</span>
              </div>
              <span
                className={`font-mono font-bold text-xs ${
                  selectedVector === 'benign' ? 'text-emerald-400' : 'text-[#873653]'
                }`}
              >
                {current.confidence}
              </span>
            </div>

            {/* Confidence Bar Meter */}
            <div className="w-full h-1.5 rounded-full bg-[#0A0B0E] overflow-hidden border border-[rgba(214,185,154,0.1)]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.round(current.modelScore * 100)}%` }}
                transition={{ duration: 0.6 }}
                className={`h-full ${
                  selectedVector === 'benign' ? 'bg-emerald-500' : 'bg-[#873653]'
                }`}
              />
            </div>

            {/* Time Machine Evolution Indicator */}
            <div className="flex items-center justify-between font-mono text-[10px] text-[#969099] pt-1">
              <span className="flex items-center gap-1.5">
                <History size={11} className="text-[#D6B99A]" />
                <span>TIME MACHINE SIMULATION:</span>
              </span>
              <span className="text-[#D6B99A] font-semibold">{current.era}</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM TELEMETRY BAR */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-[rgba(214,185,154,0.1)] font-mono text-[11px]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#873653]" />
          <span className="text-[#969099]">ZERO-SHOT NLI:</span>
          <span className="text-[#D6B99A]">BART-LARGE-MNLI</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D6B99A]" />
          <span className="text-[#969099]">INTELLIGENCE:</span>
          <span className="text-[#F0EAE3]">GOOGLE + CLOUDFLARE SCAN</span>
        </div>

        <div className="flex items-center gap-2 md:justify-end">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[#969099]">LOCALIZATION:</span>
          <span className="text-[#D6B99A]">EN · HINDI · KANNADA</span>
        </div>
      </div>
    </div>
  );
}
