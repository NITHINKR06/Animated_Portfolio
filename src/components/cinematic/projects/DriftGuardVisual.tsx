/**
 * @component DriftGuardVisual
 * @description Experimental Network Anomaly Intelligence Visualization for DriftGuard
 * Concept: Atmospheric network topology, dynamic flow pathways, 3-model ensemble fusion, and live anomaly injection.
 *
 * @author Nithin K R (https://github.com/NITHINKR06)
 * @license Attribution required
 */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldAlert, Cpu, Sparkles, RefreshCw } from 'lucide-react';

export function DriftGuardVisual() {
  const [anomalyMode, setAnomalyMode] = useState(false);
  const [activeModel, setActiveModel] = useState<string | null>(null);
  const [flowCount, setFlowCount] = useState(148290);

  // Live packet stream simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setFlowCount((prev) => prev + Math.floor(Math.random() * 24 + 12));
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const models = [
    {
      id: 'iforest',
      name: 'ISOLATION FOREST',
      weight: '0.30',
      role: 'Unsupervised Partitioning',
      score: anomalyMode ? '0.892' : '0.042',
      status: anomalyMode ? 'ANOMALOUS' : 'NOMINAL',
    },
    {
      id: 'autoencoder',
      name: 'DENSE AUTOENCODER',
      weight: '0.40',
      role: 'Reconstruction Error (77→25→77)',
      score: anomalyMode ? '0.941' : '0.061',
      status: anomalyMode ? 'ANOMALOUS' : 'NOMINAL',
    },
    {
      id: 'lstm',
      name: 'BI-DIRECTIONAL LSTM',
      weight: '0.30',
      role: 'Temporal Flow Window (T=10)',
      score: anomalyMode ? '0.918' : '0.038',
      status: anomalyMode ? 'ANOMALOUS' : 'NOMINAL',
    },
  ];

  return (
    <div className="relative w-full min-h-[460px] sm:min-h-[520px] bg-[#0A0B0E] border border-[rgba(214,185,154,0.14)] rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden select-none">
      {/* Background Architectural Grid & Subtle Radial Depth */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #D6B99A 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-[#5A1832]/20 blur-3xl pointer-events-none" />

      {/* TOP HUD: Telemetry & Interactive Switcher */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-[rgba(214,185,154,0.1)] pb-4 font-mono text-[11px]">
        <div className="flex items-center gap-3">
          <span className="flex h-2.5 w-2.5 relative">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                anomalyMode ? 'bg-[#873653]' : 'bg-[#D6B99A]'
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                anomalyMode ? 'bg-[#873653]' : 'bg-[#D6B99A]'
              }`}
            />
          </span>
          <span className="text-[#F0EAE3] tracking-wider uppercase font-semibold">
            NIDS // DRIFTGUARD ENGINE
          </span>
          <span className="text-[#969099] hidden sm:inline">
            FLOWS: {flowCount.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[#D6B99A] hidden md:inline">
            THROUGHPUT: ~2,380 FLOWS/SEC
          </span>
          <button
            onClick={() => setAnomalyMode(!anomalyMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs transition-all ${
              anomalyMode
                ? 'bg-[#873653] text-[#F0EAE3] border-[#873653] shadow-[0_0_15px_rgba(135,54,83,0.5)] font-bold'
                : 'bg-[#151116] text-[#D6B99A] border-[rgba(214,185,154,0.2)] hover:border-[#873653]'
            }`}
          >
            <RefreshCw size={12} className={anomalyMode ? 'animate-spin' : ''} />
            <span>{anomalyMode ? 'ATTACK BURST DETECTED' : 'INJECT ATTACK SIM'}</span>
          </button>
        </div>
      </div>

      {/* CENTERPIECE: Atmospheric Network Flow & Ensemble Neural Architecture */}
      <div className="relative z-10 my-auto py-6">
        <svg
          viewBox="0 0 680 260"
          className="w-full h-auto max-h-[300px] overflow-visible drop-shadow-2xl"
        >
          <defs>
            <linearGradient id="flowGradNominal" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D6B99A" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#873653" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="flowGradAnomaly" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#873653" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#D6B99A" stopOpacity="0.9" />
            </linearGradient>
            <filter id="packetGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Ingress Conduits */}
          <path
            d="M 60 130 C 120 130, 150 60, 240 60"
            fill="none"
            stroke={anomalyMode ? '#873653' : 'rgba(214,185,154,0.25)'}
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <path
            d="M 60 130 C 120 130, 150 130, 240 130"
            fill="none"
            stroke={anomalyMode ? '#873653' : 'rgba(214,185,154,0.4)'}
            strokeWidth="1.5"
          />
          <path
            d="M 60 130 C 120 130, 150 200, 240 200"
            fill="none"
            stroke={anomalyMode ? '#873653' : 'rgba(214,185,154,0.25)'}
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />

          {/* Fusion Conduits */}
          <path
            d="M 380 60 C 460 60, 480 130, 560 130"
            fill="none"
            stroke={anomalyMode ? '#873653' : 'rgba(135,54,83,0.5)'}
            strokeWidth="1.5"
          />
          <path
            d="M 380 130 L 560 130"
            fill="none"
            stroke={anomalyMode ? '#873653' : 'rgba(214,185,154,0.5)'}
            strokeWidth="2"
          />
          <path
            d="M 380 200 C 460 200, 480 130, 560 130"
            fill="none"
            stroke={anomalyMode ? '#873653' : 'rgba(135,54,83,0.5)'}
            strokeWidth="1.5"
          />

          {/* Animated Flow Packets along pathways */}
          <circle r="4" fill={anomalyMode ? '#873653' : '#D6B99A'} filter="url(#packetGlow)">
            <animateMotion
              path="M 60 130 C 120 130, 150 60, 240 60"
              dur={anomalyMode ? '1.2s' : '2.4s'}
              repeatCount="indefinite"
            />
          </circle>
          <circle r="4.5" fill={anomalyMode ? '#D6B99A' : '#873653'} filter="url(#packetGlow)">
            <animateMotion
              path="M 60 130 C 120 130, 150 130, 240 130"
              dur={anomalyMode ? '1.0s' : '1.8s'}
              repeatCount="indefinite"
            />
          </circle>
          <circle r="4" fill={anomalyMode ? '#873653' : '#D6B99A'} filter="url(#packetGlow)">
            <animateMotion
              path="M 60 130 C 120 130, 150 200, 240 200"
              dur={anomalyMode ? '1.3s' : '2.6s'}
              repeatCount="indefinite"
            />
          </circle>

          {/* Forward Packets into Fusion Head */}
          <circle r="5" fill={anomalyMode ? '#F0EAE3' : '#D6B99A'} filter="url(#packetGlow)">
            <animateMotion
              path="M 380 130 L 560 130"
              dur={anomalyMode ? '0.9s' : '1.5s'}
              repeatCount="indefinite"
            />
          </circle>

          {/* ── STAGE 01: INGRESS NODE ── */}
          <g transform="translate(60, 130)">
            <circle
              r="22"
              fill="#151116"
              stroke="#D6B99A"
              strokeWidth="2"
              className="drop-shadow-lg"
            />
            <circle r="6" fill="#D6B99A" />
            <text
              y="36"
              textAnchor="middle"
              fill="#D6B99A"
              fontSize="10"
              fontFamily="monospace"
              fontWeight="bold"
            >
              FLOW INGEST
            </text>
            <text
              y="48"
              textAnchor="middle"
              fill="#969099"
              fontSize="8"
              fontFamily="monospace"
            >
              77 FEATURES
            </text>
          </g>

          {/* ── STAGE 02: THE 3 ENSEMBLE NODES ── */}
          {/* Node 1: Isolation Forest */}
          <g
            transform="translate(310, 60)"
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setActiveModel('iforest')}
          >
            <rect
              x="-70"
              y="-22"
              width="140"
              height="44"
              rx="8"
              fill="#151116"
              stroke={anomalyMode ? '#873653' : 'rgba(214,185,154,0.25)'}
              strokeWidth="1.5"
            />
            <text
              y="-5"
              textAnchor="middle"
              fill="#F0EAE3"
              fontSize="9"
              fontFamily="monospace"
              fontWeight="bold"
            >
              ISOLATION FOREST
            </text>
            <text
              y="12"
              textAnchor="middle"
              fill={anomalyMode ? '#873653' : '#D6B99A'}
              fontSize="9"
              fontFamily="monospace"
            >
              {anomalyMode ? 'SCORE: 0.892 ▲' : 'SCORE: 0.042'}
            </text>
          </g>

          {/* Node 2: Dense Autoencoder */}
          <g
            transform="translate(310, 130)"
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setActiveModel('autoencoder')}
          >
            <rect
              x="-70"
              y="-22"
              width="140"
              height="44"
              rx="8"
              fill="#151116"
              stroke={anomalyMode ? '#873653' : '#D6B99A'}
              strokeWidth="1.5"
            />
            <text
              y="-5"
              textAnchor="middle"
              fill="#F0EAE3"
              fontSize="9"
              fontFamily="monospace"
              fontWeight="bold"
            >
              DENSE AUTOENCODER
            </text>
            <text
              y="12"
              textAnchor="middle"
              fill={anomalyMode ? '#873653' : '#D6B99A'}
              fontSize="9"
              fontFamily="monospace"
            >
              {anomalyMode ? 'RECON ERR: 0.941 ▲' : 'RECON ERR: 0.061'}
            </text>
          </g>

          {/* Node 3: Bi-LSTM */}
          <g
            transform="translate(310, 200)"
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setActiveModel('lstm')}
          >
            <rect
              x="-70"
              y="-22"
              width="140"
              height="44"
              rx="8"
              fill="#151116"
              stroke={anomalyMode ? '#873653' : 'rgba(214,185,154,0.25)'}
              strokeWidth="1.5"
            />
            <text
              y="-5"
              textAnchor="middle"
              fill="#F0EAE3"
              fontSize="9"
              fontFamily="monospace"
              fontWeight="bold"
            >
              BI-DIRECTIONAL LSTM
            </text>
            <text
              y="12"
              textAnchor="middle"
              fill={anomalyMode ? '#873653' : '#D6B99A'}
              fontSize="9"
              fontFamily="monospace"
            >
              {anomalyMode ? 'TEMPORAL: 0.918 ▲' : 'TEMPORAL: 0.038'}
            </text>
          </g>

          {/* ── STAGE 03: FUSION ARBITER ── */}
          <g transform="translate(560, 130)">
            <circle
              r="28"
              fill="#35101F"
              stroke={anomalyMode ? '#873653' : '#D6B99A'}
              strokeWidth="2.5"
              className={anomalyMode ? 'animate-pulse' : ''}
            />
            <circle r="10" fill={anomalyMode ? '#873653' : '#D6B99A'} />
            <text
              y="42"
              textAnchor="middle"
              fill={anomalyMode ? '#873653' : '#F0EAE3'}
              fontSize="10"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {anomalyMode ? 'ANOMALY DETECTED' : 'ENSEMBLE FUSION'}
            </text>
            <text
              y="54"
              textAnchor="middle"
              fill="#969099"
              fontSize="8"
              fontFamily="monospace"
            >
              {anomalyMode ? 'FUSION CONF: 92.4%' : 'CONFIDENCE: 98.7% BENIGN'}
            </text>
          </g>
        </svg>
      </div>

      {/* BOTTOM EXPLANATION & SHAP READOUT BAR */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-[rgba(214,185,154,0.1)] font-mono text-[11px]">
        <div className="flex items-center gap-2">
          <Activity size={13} className="text-[#873653]" />
          <span className="text-[#969099]">WEIGHTED FUSION:</span>
          <span className="text-[#D6B99A]">0.3 IF + 0.4 AE + 0.3 LSTM</span>
        </div>

        <div className="flex items-center gap-2">
          <Cpu size={13} className="text-[#D6B99A]" />
          <span className="text-[#969099]">DATASETS:</span>
          <span className="text-[#F0EAE3]">CICIDS2017 · UNSW-NB15 · UGR16</span>
        </div>

        <div className="flex items-center gap-2 md:justify-end">
          <ShieldAlert
            size={13}
            className={anomalyMode ? 'text-[#873653]' : 'text-emerald-400'}
          />
          <span className="text-[#969099]">SHAP EXPLANATION:</span>
          <span className={anomalyMode ? 'text-[#873653] font-bold' : 'text-[#D6B99A]'}>
            {anomalyMode ? 'FWD_IAT_MIN · DST_PORT' : 'NORMAL GRADIENTS'}
          </span>
        </div>
      </div>
    </div>
  );
}
