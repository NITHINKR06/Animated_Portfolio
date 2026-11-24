/**
 * @component HAQMSVisual
 * @description Experimental Distributed Healthcare System Visualization for HAQMS
 * Concept: Spatial queue channels, patient flow rails, distributed WebSocket/Redis synchronization nodes.
 *
 * @author Nithin K R (https://github.com/NITHINKR06)
 * @license Attribution required
 */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Server, Users, GitFork, ArrowUpRight, Zap } from 'lucide-react';

interface QueueToken {
  id: string;
  department: string;
  priority: 'EMERGENCY' | 'URGENT' | 'GENERAL';
  status: string;
  waitMin: number;
}

export function HAQMSVisual() {
  const [emergencyOverride, setEmergencyOverride] = useState(false);
  const [latency, setLatency] = useState(38);
  const [syncPulse, setSyncPulse] = useState(true);

  // Live ping simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setLatency(32 + Math.floor(Math.random() * 14));
      setSyncPulse((prev) => !prev);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const triageChannels = [
    {
      railId: 'CH_01',
      name: 'RESUSCITATION // TRAUMA',
      priority: 'PRIORITY 01 [CRITICAL]',
      color: '#873653',
      tokens: emergencyOverride
        ? [
            { id: 'EM-901', wait: '0m', active: true },
            { id: 'EM-902', wait: '1m', active: false },
          ]
        : [{ id: 'EM-884', wait: '0m', active: true }],
      load: emergencyOverride ? '100%' : '45%',
    },
    {
      railId: 'CH_02',
      name: 'CARDIOLOGY & SPECIALTY',
      priority: 'PRIORITY 02 [URGENT]',
      color: '#D6B99A',
      tokens: [
        { id: 'CD-214', wait: '4m', active: true },
        { id: 'CD-215', wait: '9m', active: false },
        { id: 'CD-216', wait: '14m', active: false },
      ],
      load: '65%',
    },
    {
      railId: 'CH_03',
      name: 'OUTPATIENT & CLINICAL',
      priority: 'PRIORITY 03 [ROUTINE]',
      color: 'rgba(214,185,154,0.4)',
      tokens: [
        { id: 'OP-052', wait: '12m', active: true },
        { id: 'OP-053', wait: '18m', active: false },
        { id: 'OP-054', wait: '25m', active: false },
        { id: 'OP-055', wait: '31m', active: false },
      ],
      load: '82%',
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
      <div className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full bg-[#5A1832]/25 blur-3xl pointer-events-none" />

      {/* TOP HUD: Telemetry & Controls */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-[rgba(214,185,154,0.1)] pb-4 font-mono text-[11px]">
        <div className="flex items-center gap-3">
          <span className="flex h-2.5 w-2.5 relative">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                emergencyOverride ? 'bg-[#873653]' : 'bg-[#D6B99A]'
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                emergencyOverride ? 'bg-[#873653]' : 'bg-[#D6B99A]'
              }`}
            />
          </span>
          <span className="text-[#F0EAE3] tracking-wider uppercase font-semibold">
            HAQMS // DISTRIBUTED TRIAGE ENGINE
          </span>
          <span className="text-[#969099] hidden sm:inline">
            LATENCY: &lt;{latency}MS (SOCKET.IO)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[#D6B99A] hidden md:inline">
            BUS: REDIS PUB/SUB SYNC
          </span>
          <button
            onClick={() => setEmergencyOverride(!emergencyOverride)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs transition-all ${
              emergencyOverride
                ? 'bg-[#873653] text-[#F0EAE3] border-[#873653] shadow-[0_0_15px_rgba(135,54,83,0.5)] font-bold'
                : 'bg-[#151116] text-[#D6B99A] border-[rgba(214,185,154,0.2)] hover:border-[#873653]'
            }`}
          >
            <Zap size={12} className={emergencyOverride ? 'animate-bounce' : ''} />
            <span>
              {emergencyOverride ? 'EMERGENCY PRE-EMPTION ACTIVE' : 'DISPATCH EMERGENCY SIM'}
            </span>
          </button>
        </div>
      </div>

      {/* CENTERPIECE: Real-time Distributed Triage Rails & Spatial Patient Flow */}
      <div className="relative z-10 my-auto py-6 space-y-4">
        {triageChannels.map((channel, cIdx) => (
          <div
            key={channel.railId}
            className="p-4 rounded-xl bg-[#151116]/80 border border-[rgba(214,185,154,0.12)] space-y-3 transition-colors hover:border-[rgba(214,185,154,0.25)]"
          >
            {/* Channel Header */}
            <div className="flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: channel.color }}
                />
                <span className="text-[#F0EAE3] font-bold tracking-tight">
                  {channel.name}
                </span>
                <span className="text-[#969099] text-[10px]">[{channel.priority}]</span>
              </div>
              <span className="text-[#D6B99A] text-[10px]">LOAD: {channel.load}</span>
            </div>

            {/* Spatial Rail with Moving Packet Tokens */}
            <div className="relative h-12 rounded-lg bg-[#0A0B0E] border border-[rgba(214,185,154,0.08)] flex items-center px-4 overflow-hidden">
              {/* Rail Guide Line */}
              <div className="absolute inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[rgba(214,185,154,0.15)] to-transparent" />

              {/* Tokens progressing along the rail */}
              <div className="relative z-10 flex items-center gap-4 w-full">
                {channel.tokens.map((tok, tIdx) => (
                  <motion.div
                    key={tok.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: tIdx * 0.1 }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-mono text-[11px] border ${
                      tok.active
                        ? 'bg-[#5A1832] border-[#873653] text-[#F0EAE3] shadow-[0_0_12px_rgba(135,54,83,0.4)]'
                        : 'bg-[#151116] border-[rgba(214,185,154,0.1)] text-[#969099]'
                    }`}
                  >
                    <span className="font-semibold">{tok.id}</span>
                    <span
                      className={`text-[9px] ${
                        tok.active ? 'text-[#D6B99A]' : 'text-[#969099]'
                      }`}
                    >
                      {tok.active ? 'IN TRIAGE' : tok.wait}
                    </span>
                  </motion.div>
                ))}

                {/* Animated Ingress Packet */}
                <motion.div
                  animate={{ x: [0, 40, 0], opacity: [0.3, 0.9, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="ml-auto w-2 h-2 rounded-full bg-[#D6B99A]/60"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Distributed Synchronization Nodes Bus */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
          {[
            { label: 'DOCTOR CONSOLE', status: 'SYNCED', icon: Users },
            { label: 'TRIAGE DESK', status: 'ONLINE', icon: GitFork },
            { label: 'KIOSK TERMINALS', status: 'ACTIVE', icon: Radio },
            { label: 'POSTGRES CLUSTER', status: 'HEALTHY', icon: Server },
          ].map((node) => {
            const Icon = node.icon;
            return (
              <div
                key={node.label}
                className="p-2.5 rounded-lg bg-[#151116]/60 border border-[rgba(214,185,154,0.08)] flex items-center justify-between font-mono text-[10px]"
              >
                <div className="flex items-center gap-1.5 text-[#969099]">
                  <Icon size={12} className="text-[#D6B99A]" />
                  <span>{node.label}</span>
                </div>
                <span className="text-[#873653] font-semibold">{node.status}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM TELEMETRY & ARCHITECTURE SPEC */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-[rgba(214,185,154,0.1)] font-mono text-[11px]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#873653]" />
          <span className="text-[#969099]">SYNC BUS:</span>
          <span className="text-[#D6B99A]">REDIS PUB/SUB &lt;50MS</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D6B99A]" />
          <span className="text-[#969099]">PREDICTION:</span>
          <span className="text-[#F0EAE3]">DYNAMIC WAIT-TIME ESTIMATION</span>
        </div>

        <div className="flex items-center gap-2 md:justify-end">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[#969099]">DATA LAYER:</span>
          <span className="text-[#D6B99A]">POSTGRESQL + PRISMA ORM</span>
        </div>
      </div>
    </div>
  );
}
