/**
 * @component CHCSecureVisual
 * @description Experimental Cryptographic Integrity Visualization for CHC Secure File Management
 * Concept: Contextual hash chains, forward security verification, HMAC-SHA256 derivation, and tamper-proof audit trails.
 *
 * @author Nithin K R (https://github.com/NITHINKR06)
 * @license Attribution required
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Key, ShieldCheck, CheckCircle2, AlertOctagon, Terminal } from 'lucide-react';

export function CHCSecureVisual() {
  const [compromiseTest, setCompromiseTest] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(2);

  const blocks = [
    {
      index: 0,
      label: 'GENESIS_00',
      hash: '0x8f2a...9b41',
      seed: 'SEED_α',
      state: 'VERIFIED',
    },
    {
      index: 1,
      label: 'BLOCK_01',
      hash: '0x4c1e...7a93',
      seed: 'SEED_β',
      state: 'VERIFIED',
    },
    {
      index: 2,
      label: 'BLOCK_02',
      hash: compromiseTest ? '0xCORRUPT' : '0x9a3d...e201',
      seed: compromiseTest ? 'KEY_REVOKED' : 'SEED_γ',
      state: compromiseTest ? 'ISOLATED' : 'VERIFIED',
    },
    {
      index: 3,
      label: 'BLOCK_03',
      hash: '0x5b7f...c314',
      seed: 'SEED_δ',
      state: 'VERIFIED',
    },
  ];

  return (
    <div className="relative w-full min-h-[460px] sm:min-h-[520px] bg-[#0A0B0E] border border-[rgba(214,185,154,0.14)] rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden select-none">
      {/* Background Architectural Grid */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #D6B99A 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-[#5A1832]/20 blur-3xl pointer-events-none" />

      {/* TOP HUD: Cryptographic Protocol & Test Trigger */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-[rgba(214,185,154,0.1)] pb-4 font-mono text-[11px]">
        <div className="flex items-center gap-3">
          <span className="flex h-2.5 w-2.5 relative">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                compromiseTest ? 'bg-[#873653]' : 'bg-[#D6B99A]'
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                compromiseTest ? 'bg-[#873653]' : 'bg-[#D6B99A]'
              }`}
            />
          </span>
          <span className="text-[#F0EAE3] tracking-wider uppercase font-semibold">
            CHC CIPHER // HMAC-SHA256 CONTEXTUAL CHAIN
          </span>
          <span className="text-[#D6B99A] hidden sm:inline">
            FORWARD SECURITY: {compromiseTest ? 'ISOLATION ACTIVE' : 'GUARANTEED'}
          </span>
        </div>

        <button
          onClick={() => setCompromiseTest(!compromiseTest)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs transition-all ${
            compromiseTest
              ? 'bg-[#873653] text-[#F0EAE3] border-[#873653] shadow-[0_0_15px_rgba(135,54,83,0.5)] font-bold'
              : 'bg-[#151116] text-[#D6B99A] border-[rgba(214,185,154,0.2)] hover:border-[#873653]'
          }`}
        >
          <Key size={12} />
          <span>{compromiseTest ? 'RESET FORWARD TEST' : 'TEST FORWARD SECURITY'}</span>
        </button>
      </div>

      {/* CENTERPIECE: Connected Cryptographic Hash Chain Sequence */}
      <div className="relative z-10 my-auto py-6 space-y-6">
        {/* Chained Blocks Visual Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {blocks.map((block) => {
            const isTarget = block.index === 2;
            const isCorrupted = isTarget && compromiseTest;

            return (
              <motion.div
                key={block.label}
                layout
                onClick={() => setSelectedBlock(block.index)}
                className={`relative p-4 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                  isCorrupted
                    ? 'bg-[#35101F] border-[#873653] shadow-[0_0_20px_rgba(135,54,83,0.4)]'
                    : selectedBlock === block.index
                      ? 'bg-[#151116] border-[#D6B99A] shadow-[0_0_15px_rgba(214,185,154,0.15)]'
                      : 'bg-[#151116]/80 border-[rgba(214,185,154,0.12)] hover:border-[rgba(214,185,154,0.25)]'
                }`}
              >
                {/* Header Icon + Label */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold">
                    {isCorrupted ? (
                      <Unlock size={14} className="text-[#873653]" />
                    ) : (
                      <Lock size={14} className="text-[#D6B99A]" />
                    )}
                    <span className="text-[#F0EAE3]">{block.label}</span>
                  </div>
                  <span
                    className={`font-mono text-[9px] px-1.5 py-0.5 rounded ${
                      isCorrupted
                        ? 'bg-[#873653] text-[#F0EAE3]'
                        : 'bg-emerald-500/20 text-emerald-400'
                    }`}
                  >
                    {block.state}
                  </span>
                </div>

                {/* Hash Digest & Per-file Seed */}
                <div className="space-y-1.5 font-mono text-[11px]">
                  <div className="text-[10px] text-[#969099]">DIGEST HASH:</div>
                  <div
                    className={`truncate text-xs ${
                      isCorrupted ? 'text-[#873653] font-bold' : 'text-[#F0EAE3]'
                    }`}
                  >
                    {block.hash}
                  </div>
                  <div className="text-[10px] text-[#969099] pt-1">ISOLATED SEED:</div>
                  <div className="text-[11px] text-[#D6B99A] font-semibold">
                    {block.seed}
                  </div>
                </div>

                {/* Micro forward-link indicator */}
                <div className="mt-3 pt-2 border-t border-[rgba(214,185,154,0.08)] flex items-center justify-between font-mono text-[9px] text-[#969099]">
                  <span>SHA-256 LINK</span>
                  <span className="text-emerald-400">0% CROSS-LEAK</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Proof of Contextual Derivation Box */}
        <div className="p-4 rounded-xl bg-[#151116] border border-[rgba(214,185,154,0.14)] font-mono text-xs">
          <div className="flex items-center justify-between text-[#D6B99A] font-semibold mb-2">
            <span className="flex items-center gap-2">
              <Terminal size={14} />
              <span>CONTEXTUAL HASH CHAIN DERIVATION PROTOCOL</span>
            </span>
            <span className="text-[10px] text-[#969099]">PYTHON 3.10 CIPHER CORE</span>
          </div>
          <div className="p-2.5 rounded bg-[#0A0B0E] border border-[rgba(214,185,154,0.08)] text-[11px] text-[#F0EAE3] space-y-1">
            <p className="text-[#969099]">
              // Derive unique contextual encryption key per file
            </p>
            <p>
              Seed<sub>i</sub> = HMAC-SHA256(MasterSecret, PrevBlockHash + Timestamp + FileID)
            </p>
            {compromiseTest ? (
              <p className="text-[#873653] font-bold">
                [ALERT] Block_02 simulated breach → Adjacent Block_01 & Block_03 seeds remain cryptographically isolated.
              </p>
            ) : (
              <p className="text-emerald-400">
                [SECURE] Forward-security invariant holds: zero cross-file vulnerability propagation.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM TELEMETRY BAR */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-[rgba(214,185,154,0.1)] font-mono text-[11px]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#873653]" />
          <span className="text-[#969099]">CIPHER ALGORITHM:</span>
          <span className="text-[#D6B99A]">COUNTER-MODE HMAC-SHA256</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D6B99A]" />
          <span className="text-[#969099]">AUDIT TRAIL:</span>
          <span className="text-[#F0EAE3]">IMMUTABLE CHAIN LEDGER</span>
        </div>

        <div className="flex items-center gap-2 md:justify-end">
          <ShieldCheck size={13} className="text-emerald-400" />
          <span className="text-[#969099]">STATUS:</span>
          <span className="text-[#D6B99A]">ZERO CROSS-FILE LEAKAGE</span>
        </div>
      </div>
    </div>
  );
}
