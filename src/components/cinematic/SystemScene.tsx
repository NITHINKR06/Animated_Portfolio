/**
 * @component SystemScene
 * @description Scene 03: SYSTEM - The Interconnected Digital Capabilities Matrix
 * Concept: DIGITAL WORLD × EXPERIMENTAL EDITORIAL
 *
 * Interactive network of nodes, connections, and pathways across 5 subsystem domains:
 * - Frontend Engineering
 * - Backend Architecture
 * - Cloud & Infrastructure
 * - Cybersecurity & Cryptography
 * - Machine Learning & Anomaly Detection
 *
 * @author Nithin K R (https://github.com/NITHINKR06)
 * @license Attribution required
 */
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Server,
  Cloud,
  ShieldCheck,
  BrainCircuit,
  ExternalLink,
  Code2,
  Terminal,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import { portfolioData } from '../../data';

interface SystemCluster {
  id: string;
  name: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  description: string;
  relatedProjects: string[];
  nodes: {
    name: string;
    logo?: string;
    link: string;
    level: string;
    focus: string;
  }[];
}

export function SystemScene() {
  const clusters: SystemCluster[] = useMemo(
    () => [
      {
        id: 'frontend',
        name: 'Frontend Engineering',
        label: 'SYS_NODE // 01',
        icon: Layers,
        description:
          'Engineering modern, high-performance web applications with reactive architectures, spatial depth, and micro-interactions.',
        relatedProjects: ['Animated 3D Portfolio', 'WALRUS', 'HAQMS', 'CSI NMAMIT', 'Orbital-Note'],
        nodes: [
          { name: 'React 18', logo: '/logos/react-original.svg', link: 'https://react.dev', level: '95%', focus: 'Concurrent rendering, custom hooks, memory optimization' },
          { name: 'TypeScript', logo: '/logos/typescript-original.svg', link: 'https://www.typescriptlang.org', level: '92%', focus: 'Strict generics, AST tooling, type guards' },
          { name: 'Three.js / WebGL', logo: '/logos/threejs-original.svg', link: 'https://threejs.org', level: '88%', focus: 'Custom shaders, persistent camera rigs, particle buffers' },
          { name: 'Tailwind CSS', logo: '/logos/tailwindcss-original.svg', link: 'https://tailwindcss.com', level: '96%', focus: 'Design token architecture, editorial styling' },
          { name: 'Framer Motion', logo: 'https://cdn.simpleicons.org/framer', link: 'https://www.framer.com/motion', level: '90%', focus: 'Layout orchestration, gesture tracking' },
          { name: 'GSAP & ScrollTrigger', logo: 'https://cdn.simpleicons.org/greensock', link: 'https://greensock.com', level: '92%', focus: 'Timeline scrub, ticker synchronization, pinned storytelling' },
        ],
      },
      {
        id: 'backend',
        name: 'Backend Architecture',
        label: 'SYS_NODE // 02',
        icon: Server,
        description:
          'Architecting resilient distributed microservices, REST APIs, and asynchronous pipelines designed for low latency.',
        relatedProjects: ['HAQMS', 'GitPulse', 'GlobleBites', 'WALRUS', 'Kaleido'],
        nodes: [
          { name: 'Node.js', logo: '/logos/nodejs-original.svg', link: 'https://nodejs.org', level: '94%', focus: 'Event loops, cluster modules, stream processing' },
          { name: 'Python', logo: '/logos/python-original.svg', link: 'https://python.org', level: '92%', focus: 'FastAPI, cryptographic algorithms, scientific computing' },
          { name: 'FastAPI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', link: 'https://fastapi.tiangolo.com', level: '90%', focus: 'Asynchronous route controllers, Pydantic schemas' },
          { name: 'PostgreSQL', logo: '/logos/postgresql-original.svg', link: 'https://postgresql.org', level: '88%', focus: 'Relational modeling, indexing strategies, Prisma ORM' },
          { name: 'Redis', logo: 'https://cdn.simpleicons.org/redis', link: 'https://redis.io', level: '86%', focus: 'Pub/sub streaming, session caching, rate-limit defense' },
          { name: 'WebSockets / Socket.IO', logo: 'https://cdn.simpleicons.org/socketdotio', link: 'https://socket.io', level: '90%', focus: 'Sub-50ms duplex state sync for live queues & CTFs' },
        ],
      },
      {
        id: 'cybersecurity',
        name: 'Cybersecurity Research',
        label: 'SYS_NODE // 03',
        icon: ShieldCheck,
        description:
          'Conducting offensive vulnerability analysis and designing defensive cryptographic integrity mechanisms.',
        relatedProjects: ['DriftGuard', 'CHC Secure', 'CodeSentinel', 'Packet Defender', 'CTF Dashboard'],
        nodes: [
          { name: 'Contextual Hash Chains (CHC)', logo: '/logos/python-original.svg', link: 'https://github.com/NITHINKR06/chc-secure-file-system', level: '95%', focus: 'Forward-secure contextual encryption via HMAC-SHA256' },
          { name: 'AST Vulnerability Analysis', logo: '/logos/typescript-original.svg', link: 'https://github.com/NITHINKR06/codesentinel', level: '90%', focus: 'Syntax-tree scanning across 12+ critical flaw classes' },
          { name: 'Wireshark & PCAP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/networkx/networkx-original.svg', link: 'https://wireshark.org', level: '92%', focus: 'Packet disassembly, protocol anomaly inspection' },
          { name: 'Kali Linux & Nmap', logo: 'https://cdn.simpleicons.org/kalilinux', link: 'https://kali.org', level: '94%', focus: 'Reconnaissance, network mapping, vulnerability testing' },
          { name: 'Metasploit & Burp Suite', logo: 'https://cdn.simpleicons.org/burpsuite', link: 'https://portswigger.net', level: '88%', focus: 'HTTP request interception, token tampering testing' },
          { name: 'Linux iptables & Firewalls', logo: 'https://cdn.simpleicons.org/linux', link: 'https://netfilter.org', level: '90%', focus: 'Kernel-level packet filtering & automated IP mitigation' },
        ],
      },
      {
        id: 'machine-learning',
        name: 'Machine Learning & AI',
        label: 'SYS_NODE // 04',
        icon: BrainCircuit,
        description:
          'Deploying machine learning models for anomaly detection, network intrusion classification, and NLP safety analysis.',
        relatedProjects: ['DriftGuard', 'WALRUS', 'Kaleido', 'CodeSentinel'],
        nodes: [
          { name: 'Ensemble Anomaly IDS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', link: 'https://github.com/NITHINKR06/DriftGuard', level: '92%', focus: 'Isolation Forest + Dense Autoencoder + Bi-LSTM' },
          { name: 'TensorFlow & scikit-learn', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg', link: 'https://scikit-learn.org', level: '89%', focus: 'Model training, high-dimensional network flow scoring' },
          { name: 'SHAP Explainability', logo: '/logos/python-original.svg', link: 'https://shap.readthedocs.io', level: '87%', focus: 'Interpretable machine learning feature attribution' },
          { name: 'Hugging Face NLP', logo: 'https://cdn.simpleicons.org/huggingface', link: 'https://huggingface.co', level: '90%', focus: 'BART-large-MNLI zero-shot scam classification' },
          { name: 'Local LLMs (Ollama/Groq)', logo: 'https://cdn.simpleicons.org/ollama', link: 'https://ollama.ai', level: '88%', focus: 'Automated exploit generation & patch synthesis' },
        ],
      },
      {
        id: 'devops',
        name: 'Infrastructure & Cloud',
        label: 'SYS_NODE // 05',
        icon: Cloud,
        description:
          'Orchestrating containerized environments, cloud infrastructure, and automated CI/CD deployment pipelines.',
        relatedProjects: ['CodeSentinel', 'GitPulse', 'HAQMS', 'Animated Portfolio'],
        nodes: [
          { name: 'Docker Compose', logo: '/logos/docker-original.svg', link: 'https://docker.com', level: '92%', focus: 'Multi-container orchestration, isolated security sandboxes' },
          { name: 'AWS Cloud Services', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg', link: 'https://aws.amazon.com', level: '86%', focus: 'S3 storage, EC2 instances, cloud networking' },
          { name: 'OCI Cloud Networking', logo: 'https://cdn.simpleicons.org/oracle', link: 'https://oracle.com/cloud', level: '90%', focus: 'Certified OCI Networking Professional (Virtual Cloud Networks)' },
          { name: 'GitHub Actions CI/CD', logo: '/logos/githubactions-original.svg', link: 'https://github.com/features/actions', level: '94%', focus: 'Automated test suites, security linting, deploy jobs' },
          { name: 'Vercel & Edge CDN', logo: '/logos/vercel-original.svg', link: 'https://vercel.com', level: '96%', focus: 'Global edge routing, headless SSR deployments' },
        ],
      },
    ],
    [],
  );

  const [activeClusterId, setActiveClusterId] = useState<string>('frontend');
  const [selectedNode, setSelectedNode] = useState<SystemCluster['nodes'][0] | null>(
    clusters[0].nodes[0],
  );

  const currentCluster = clusters.find((c) => c.id === activeClusterId) || clusters[0];

  return (
    <section
      id="skills"
      className="relative min-h-screen w-full bg-obsidian text-[#F0EAE3] py-24 px-6 md:px-16 border-t border-[rgba(214,185,154,0.12)]"
    >
      {/* SECTION IDENTIFIER HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-[#873653] uppercase mb-2">
            <span className="w-2.5 h-2.5 bg-[#873653]" />
            <span>SCENE 03 // SYSTEM CAPABILITIES MATRIX</span>
          </div>
          <h2 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl tracking-tighter uppercase text-[#F0EAE3]">
            THE DIGITAL <span className="text-[#873653]">LATTICE</span>.
          </h2>
        </div>
        <p className="font-mono text-xs text-[#969099] max-w-md leading-relaxed">
          Technical proficiencies mapped as an interconnected digital system. Select a subsystem to inspect live capability nodes and architectural deployments.
        </p>
      </div>

      {/* CLUSTER SELECTION NAV BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
        {clusters.map((cluster) => {
          const IconComp = cluster.icon;
          const isActive = cluster.id === activeClusterId;
          return (
            <button
              key={cluster.id}
              onClick={() => {
                setActiveClusterId(cluster.id);
                setSelectedNode(cluster.nodes[0]);
              }}
              className={`p-4 rounded-xl border text-left transition-all duration-300 relative overflow-hidden group ${
                isActive
                  ? 'border-[#873653] bg-[#5A1832] shadow-[0_0_20px_rgba(135,54,83,0.3)] text-[#F0EAE3]'
                  : 'border-[rgba(214,185,154,0.1)] bg-[#151116] hover:border-[rgba(214,185,154,0.25)] text-[#969099]'
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#D6B99A] animate-pulse" />
              )}
              <div className="flex items-center justify-between mb-2">
                <IconComp
                  size={18}
                  className={isActive ? 'text-[#D6B99A]' : 'text-[#873653] group-hover:text-[#F0EAE3]'}
                />
                <span className="font-mono text-[10px] text-[#969099]">{cluster.label}</span>
              </div>
              <h3 className="font-heading font-bold text-sm tracking-tight text-[#F0EAE3] uppercase">
                {cluster.name.split(' ')[0]}
              </h3>
              <span className="font-mono text-[10px] text-[#969099] block mt-0.5">
                {cluster.nodes.length} Verified Modules
              </span>
            </button>
          );
        })}
      </div>

      {/* INTERACTIVE SYSTEM MATRIX VIEWPORT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: ACTIVE NODES GRID (7 COLUMNS) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between font-mono text-xs text-[#969099] border-b border-[rgba(214,185,154,0.12)] pb-3">
            <span className="uppercase text-[#F0EAE3] font-semibold">
              // ACTIVE NODES: {currentCluster.name.toUpperCase()}
            </span>
            <span>SYSTEM STATUS: OPTIMAL</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {currentCluster.nodes.map((node) => {
              const isSelected = selectedNode?.name === node.name;
              return (
                <button
                  key={node.name}
                  onClick={() => setSelectedNode(node)}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 group ${
                    isSelected
                      ? 'border-[#873653] bg-[#5A1832]/50 shadow-[0_0_15px_rgba(135,54,83,0.3)]'
                      : 'border-[rgba(214,185,154,0.1)] bg-[#151116] hover:border-[rgba(214,185,154,0.25)]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      {node.logo ? (
                        <img
                          src={node.logo}
                          alt={node.name}
                          className="w-5 h-5 object-contain opacity-85 group-hover:opacity-100"
                        />
                      ) : (
                        <Terminal size={16} className="text-[#873653]" />
                      )}
                      <span className="font-heading font-bold text-sm text-[#F0EAE3] group-hover:text-[#D6B99A] transition-colors">
                        {node.name}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[#D6B99A] font-semibold">
                      {node.level}
                    </span>
                  </div>

                  <p className="font-mono text-[11px] text-[#969099] line-clamp-2 leading-relaxed">
                    {node.focus}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Related Real Projects Cross-Link */}
          <div className="p-4 rounded-xl border border-[rgba(214,185,154,0.1)] bg-[#151116] mt-6">
            <span className="font-mono text-[11px] uppercase text-[#873653] block mb-2 font-semibold">
              [ CROSS-DOMAIN PROJECT DEPLOYMENTS ]
            </span>
            <div className="flex flex-wrap gap-2">
              {currentCluster.relatedProjects.map((proj) => (
                <span
                  key={proj}
                  className="px-2.5 py-1 rounded-md bg-[#0D0B0E] border border-[rgba(214,185,154,0.1)] font-mono text-[11px] text-[#F0EAE3]/90"
                >
                  {proj}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: NODE DEEP TELEMETRY INSPECTOR (5 COLUMNS) */}
        <div className="lg:col-span-5 rounded-2xl border border-[rgba(214,185,154,0.15)] bg-[#151116] p-6 shadow-2xl relative">
          <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-[#873653] uppercase tracking-wider">
            [NODE_INSPECTOR]
          </div>

          <div className="font-mono text-xs tracking-widest text-[#969099] uppercase mb-4 flex items-center gap-2">
            <Activity size={14} className="text-[#873653]" />
            <span>SPECIFICATION TELEMETRY</span>
          </div>

          {selectedNode ? (
            <div className="space-y-6">
              <div>
                <h3 className="font-heading font-black text-3xl text-[#F0EAE3] uppercase tracking-tight flex items-center gap-3">
                  {selectedNode.logo && (
                    <img
                      src={selectedNode.logo}
                      alt={selectedNode.name}
                      className="w-8 h-8 object-contain"
                    />
                  )}
                  <span>{selectedNode.name}</span>
                </h3>
                <span className="font-mono text-xs text-[#D6B99A] block mt-1">
                  Proficiency Index: {selectedNode.level} // Production Verified
                </span>
              </div>

              {/* Progress Level Bar */}
              <div className="w-full bg-[#0D0B0E] h-1.5 rounded-full overflow-hidden border border-[rgba(214,185,154,0.1)]">
                <div
                  className="bg-gradient-to-r from-[#5A1832] to-[#873653] h-full transition-all duration-500"
                  style={{ width: selectedNode.level }}
                />
              </div>

              {/* Architectural Focus */}
              <div>
                <span className="font-mono text-[11px] text-[#969099] uppercase block mb-1">
                  CORE IMPLEMENTATION FOCUS
                </span>
                <p className="font-mono text-xs text-[#F0EAE3]/90 leading-relaxed border-l-2 border-[#873653] pl-3">
                  {selectedNode.focus}
                </p>
              </div>

              {/* Subsystem Context */}
              <div>
                <span className="font-mono text-[11px] text-[#969099] uppercase block mb-1">
                  SUBSYSTEM DOMAIN
                </span>
                <p className="font-mono text-xs text-[#969099] leading-relaxed">
                  {currentCluster.description}
                </p>
              </div>

              {/* Action: Official Documentation / Source Link */}
              <div className="pt-4 border-t border-[rgba(214,185,154,0.1)] flex items-center justify-between">
                <a
                  href={selectedNode.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase text-[#F0EAE3] hover:text-[#D6B99A] transition-colors group"
                >
                  <span>DOCUMENTATION & SPECS</span>
                  <ExternalLink size={12} className="group-hover:translate-x-0.5 text-[#D6B99A]" />
                </a>
                <span className="font-mono text-[10px] text-[#969099]/60">SYS_AUTH: VERIFIED</span>
              </div>
            </div>
          ) : (
            <div className="py-20 text-center font-mono text-xs text-[#969099]">
              Select a capability node to inspect telemetry.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
