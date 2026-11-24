/**
 * Scene 05: THE PROJECT EXPRESS
 *
 * A pinned, scroll-driven train. The cab enters from the right, and each
 * passenger coach stops in front of the camera in order (01 to 05). When a
 * coach stops, its window is brought into focus automatically.
 *
 * All project text is drawn on a canvas texture inside the coach window.
 * The only DOM elements are the action bar below the scene and a
 * screen-reader-only list.
 *
 * Units: 1 unit = 1 metre. The train runs along X. Camera looks down -Z.
 * Passenger windows face +Z (toward the camera).
 */
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brush, Evaluator, SUBTRACTION } from 'three-bvh-csg';
import { ArrowRight, ExternalLink, Github, Maximize2 } from 'lucide-react';
import type { Project } from '../../../data';

gsap.registerPlugin(ScrollTrigger);

// ── Geometry and layout constants ───────────────────────────────────
export const GAUGE_HALF = 0.838;               // 1676 mm broad gauge
export const RAIL_TOP_Y = 0.25;
export const WHEEL_R = 0.46;
export const WHEEL_RADIUS = WHEEL_R;
export const WHEEL_CENTER_Y = RAIL_TOP_Y + WHEEL_R;

const BODY_BASE_Y = 1.25;                      // underside of body, above wheel tops
const BODY_H = 3.1;
const HALF_W = 1.6;
const CAB_LEN = 9;
const NOSE_LEN = 5.5;
const COACH_LEN = 21.5;
const COACH_COUNT = 5;
const GAP = 1.6;

const WINDOW_W = 9.0;
const WINDOW_H = 1.9;
const WINDOW_Y = 1.35;                         // window centre, above body base
const POCKET = 0.5;                            // depth of the window recess

// ── Passenger entry door constants ──────────────────────────────────
const DOOR_W = 1.35;                           // door opening width
const DOOR_H = 2.25;                           // door opening height
const DOOR_X = 5.8;                            // door position along coach (near vestibule end)
const DOOR_Y = 1.125;                          // door center above body base (from floor 0 to 2.25)

// ── Camera and scroll ───────────────────────────────────────────────
const CAM_FOV = 36;
const CAM_Y = 2.45;                            // Overview camera height: train (rail to roof) vertically centered
const CAM_Z = 10.2;
const FOCUS_Z = 7.8;                           // Closer when a window is focused (frames coach body & window)
const FOCUS_CAM_Y = 2.60;                      // Exactly matches window center Y (BODY_BASE_Y + WINDOW_Y = 1.25 + 1.35)
const LOOK_Y = 2.35;                           // Look target during travel (midpoint of train is 2.30)
const FOCUS_LOOK_Y = 2.60;                     // Look target during focus (dead center of window)
const EXPLORE_DELAY_MS = 2800;                 // 2.8s cinematic boarding into coach cabin
const SCROLL_LENGTH = 4200;

// Train enters from the right (x > 0). Stops are scroll progress values.
const ENTRY_X = 22;
const STOP_AT = [0.14, 0.31, 0.48, 0.65, 0.82];
const HOLD = 0.16;                             // share of progress spent holding at each coach
const FOCUS_RAMP = 0.05;                       // share of progress used to bring the window into focus

const FONT_SANS = '"Space Grotesk", "Inter", system-ui, sans-serif';
const FONT_MONO = '"JetBrains Mono", ui-monospace, monospace';
const FONT_BODY = '"Inter", system-ui, sans-serif';

// ── Coach content ───────────────────────────────────────────────────
type CoachSpec = {
  num: number;
  projectId?: string;
  category: string;
  fallbackTitle: string;
  desc: string;
  fallbackTech: string[];
  archive?: boolean;
};

const COACH_SPECS: CoachSpec[] = [
  {
    num: 1,
    projectId: 'driftguard',
    category: 'CYBER DEFENSE // ML INTRUSION DETECTION',
    fallbackTitle: 'DriftGuard',
    desc: 'Multi-perspective network intrusion detection engine combining Isolation Forest, Deep Autoencoders, and Bi-LSTM with real-time SHAP explainability.',
    fallbackTech: ['Python', 'PyTorch', 'FastAPI', 'SHAP'],
  },
  {
    num: 2,
    projectId: 'haqms',
    category: 'DISTRIBUTED SYSTEMS // HEALTHCARE TRIAGE',
    fallbackTitle: 'HAQMS',
    desc: 'Healthcare Automated Queue Management System with sub-50ms WebSocket telemetry, distributed Redis Pub/Sub synchronisation, and emergency triage pipelines.',
    fallbackTech: ['Node.js', 'Next.js', 'PostgreSQL', 'Redis'],
  },
  {
    num: 3,
    projectId: 'walrus',
    category: 'THREAT INTELLIGENCE // ZERO-SHOT NLP',
    fallbackTitle: 'WALRUS',
    desc: 'AI-powered cybersecurity intelligence platform using zero-shot BART-Large-MNLI classification and temporal attack-surface forecasting.',
    fallbackTech: ['Python', 'Hugging Face', 'FastAPI', 'Next.js'],
  },
  {
    num: 4,
    projectId: 'chc-secure',
    category: 'CRYPTOGRAPHY // INTEGRITY ENGINE',
    fallbackTitle: 'CHC Secure',
    desc: 'Cryptographic contextual hash-chain integrity engine with forward-security invariants, tamper-evident audit ledgers, and secure file storage.',
    fallbackTech: ['Python', 'Cryptography', 'Flask', 'SQLite'],
  },
  {
    num: 5,
    category: 'CENTRAL REPOSITORY ARCHIVE',
    fallbackTitle: 'ALL 20+ REPOSITORIES',
    desc: 'Master directory of all 20+ open-source engineering repositories: cyber defence tools, distributed microservices, cloud infrastructure, and autonomous AI systems.',
    fallbackTech: [],
    archive: true,
  },
];

type ScreenData = { category: string; title: string; desc: string; footer: string[] };

function buildScreenData(spec: CoachSpec, projects: Project[]): ScreenData {
  if (spec.archive) {
    return {
      category: spec.category,
      title: spec.fallbackTitle,
      desc: spec.desc,
      footer: ['Cyber Defense: 14 repos', 'Distributed: 8 repos', 'AI & Systems: 6 repos'],
    };
  }
  const p = projects.find((x) => x.id === spec.projectId);
  return {
    category: spec.category,
    title: p?.title ?? spec.fallbackTitle,
    desc: spec.desc,
    footer: p?.technologies?.length ? p.technologies : spec.fallbackTech,
  };
}

// ── Pure helpers (exported for unit tests) ──────────────────────────
export const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** Largest font size (from startPx down to minPx) at which text fits maxWidth. */
export function fitFontSize(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  startPx: number,
  minPx: number,
  makeFont: ((px: number) => string) | string,
  weight: string = '900'
): number {
  const fontFn =
    typeof makeFont === 'function'
      ? makeFont
      : (px: number) => `${weight} ${px}px ${makeFont}`;
  for (let size = startPx; size > minPx; size -= 2) {
    ctx.font = fontFn(size);
    if (ctx.measureText(text).width <= maxWidth) return size;
  }
  ctx.font = fontFn(minPx);
  return minPx;
}

/** Word-wraps text into at most maxLines lines, adding an ellipsis on overflow. */
export function wrapLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number
): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width <= maxWidth) {
      current = test;
      continue;
    }
    if (current) lines.push(current);
    current = word;
    if (lines.length === maxLines) break;
  }

  if (current) {
    if (lines.length < maxLines) {
      lines.push(current);
    } else {
      let last = lines[maxLines - 1];
      while (last && ctx.measureText(`${last}…`).width > maxWidth) last = last.slice(0, -1).trimEnd();
      lines[maxLines - 1] = `${last}…`;
    }
  }
  return lines;
}

/**
 * Maps scroll progress to the train's X position, the focus amount (0..1), and
 * the coach index it is at (-1 before the first stop). Pure function.
 */
export function sampleTrain(p: number, stopX: number[], entryX: number) {
  const holdEnd = (i: number) => (i === COACH_COUNT - 1 ? 1 : STOP_AT[i] + HOLD);

  if (p < STOP_AT[0]) {
    return { x: lerp(entryX, stopX[0], easeOutCubic(clamp(p / STOP_AT[0], 0, 1))), focus: 0, idx: -1 };
  }
  for (let i = 0; i < COACH_COUNT; i++) {
    const end = holdEnd(i);
    if (p < end) {
      return {
        x: stopX[i],
        focus: easeInOutCubic(clamp((p - STOP_AT[i]) / FOCUS_RAMP, 0, 1)),
        idx: i,
      };
    }
    if (i < COACH_COUNT - 1 && p < STOP_AT[i + 1]) {
      const t = (p - end) / (STOP_AT[i + 1] - end);
      return { x: lerp(stopX[i], stopX[i + 1], easeInOutCubic(clamp(t, 0, 1))), focus: 0, idx: i };
    }
  }
  return { x: stopX[COACH_COUNT - 1], focus: 1, idx: COACH_COUNT - 1 };
}

// ── Canvas texture for a coach screen ───────────────────────────────
async function loadFonts() {
  if (typeof document === 'undefined' || !document.fonts) return;
  try {
    await Promise.all([
      document.fonts.load('900 100px "Space Grotesk"'),
      document.fonts.load('500 30px "JetBrains Mono"'),
      document.fonts.load('400 36px "Inter"'),
    ]);
  } catch {
    // Fallback fonts still go through fitFontSize, so text stays inside the screen.
  }
}

function drawScreen(data: ScreenData): THREE.CanvasTexture {
  const W = 2048;
  const H = Math.round((W * (WINDOW_H - 0.2)) / (WINDOW_W - 0.3));
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  const pad = 120;
  const maxW = W - pad * 2 - 100;

  ctx.fillStyle = '#070A12';
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = 'rgba(214,185,154,0.55)';
  ctx.lineWidth = 6;
  ctx.strokeRect(14, 14, W - 28, H - 28);

  // Category
  ctx.fillStyle = '#D6B99A';
  ctx.font = `500 30px ${FONT_MONO}`;
  ctx.fillText(data.category, pad, 70);

  // Title (auto-fit)
  const titleSize = fitFontSize(ctx, data.title.toUpperCase(), maxW, 150, 50, (px) => `900 ${px}px ${FONT_SANS}`);
  ctx.font = `900 ${titleSize}px ${FONT_SANS}`;
  ctx.fillStyle = '#F0EAE3';
  const titleY = 80 + titleSize * 0.9;
  ctx.fillText(data.title.toUpperCase(), pad, titleY);

  // Description (max 2 lines)
  ctx.font = `400 44px ${FONT_BODY}`;
  ctx.fillStyle = 'rgba(214,185,154,0.92)';
  const lines = wrapLines(ctx, data.desc, maxW, 2);
  lines.forEach((line, i) => ctx.fillText(line, pad, titleY + 62 + i * 54));

  // Footer: tech chips or archive counts (auto-fit to one line)
  const footerText = data.footer.join('   ·   ');
  const footerSize = fitFontSize(ctx, footerText, maxW, 38, 22, (px) => `500 ${px}px ${FONT_MONO}`);
  ctx.font = `500 ${footerSize}px ${FONT_MONO}`;
  ctx.fillStyle = '#F0EAE3';
  ctx.fillText(footerText, pad, H - 40);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

// ── Coach body geometry ─────────────────────────────────────────────
function createShell(length: number): THREE.BufferGeometry {
  const hw = HALF_W;
  const H = BODY_H;
  const s = new THREE.Shape();
  s.moveTo(-hw + 0.3, 0);
  s.quadraticCurveTo(-hw, 0.05, -hw, 0.6);
  s.lineTo(-hw, H - 0.9);
  s.quadraticCurveTo(-hw, H - 0.2, -hw + 0.5, H);
  s.quadraticCurveTo(0, H + 0.22, hw - 0.5, H);
  s.quadraticCurveTo(hw, H - 0.2, hw, H - 0.9);
  s.lineTo(hw, 0.6);
  s.quadraticCurveTo(hw, 0.05, hw - 0.3, 0);
  s.closePath();

  const geo = new THREE.ExtrudeGeometry(s, {
    depth: length,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.06,
    bevelThickness: 0.06,
    curveSegments: 20,
  });
  geo.translate(0, 0, -length / 2); // centre along the length
  geo.rotateY(Math.PI / 2);         // length along X, width along Z
  geo.computeBoundingBox();
  return geo;
}

/** Subtracts hollow saloon cabin, window recess, and passenger doorway from coach shell. Built once, shared by all coaches. */
function cutCoachOpenings(shell: THREE.BufferGeometry, W: number): THREE.BufferGeometry {
  const evaluator = new Evaluator();
  evaluator.attributes = ['position', 'normal'];

  // 1. Hollow interior cabin cavity (so passenger cabin has real hollow space)
  const cavityH = BODY_H - 0.22;
  const cavityW = (HALF_W * 2) - 0.24;
  const cavityL = COACH_LEN - 0.35;
  const cavity = new THREE.BoxGeometry(cavityL, cavityH, cavityW);
  cavity.translate(0, cavityH / 2 + 0.08, 0);

  const hollowBrush = evaluator.evaluate(new Brush(shell), new Brush(cavity), SUBTRACTION);
  cavity.dispose();

  // 2. Panoramic window recess in center
  const depth = POCKET + 0.6;
  const cutGeo = new THREE.BoxGeometry(WINDOW_W, WINDOW_H, depth);
  cutGeo.translate(0, WINDOW_Y, W - POCKET + depth / 2);

  const afterWinBrush = evaluator.evaluate(hollowBrush, new Brush(cutGeo), SUBTRACTION);
  cutGeo.dispose();
  hollowBrush.geometry.dispose();

  // 3. Passenger doorway opening at DOOR_X
  const doorCut = new THREE.BoxGeometry(DOOR_W, DOOR_H, 1.8);
  doorCut.translate(DOOR_X, DOOR_Y, W - 0.6);

  const resultBrush = evaluator.evaluate(afterWinBrush, new Brush(doorCut), SUBTRACTION);
  doorCut.dispose();
  afterWinBrush.geometry.dispose();

  return resultBrush.geometry;
}

// ── Scene builder ───────────────────────────────────────────────────
type SceneHost = {
  getProjects: () => Project[];
  onSelectCoach: (n: number) => void;
  setFocused: (i: number) => void;
};

function buildScene(
  container: HTMLDivElement,
  trigger: HTMLElement,
  host: SceneHost,
  exploreSignal: { current: boolean }
): () => void {
  const canvas = document.createElement('canvas');
  canvas.className = 'w-full h-full block';
  container.appendChild(canvas);

  const width = container.clientWidth || 1200;
  const height = container.clientHeight || 640;

  // Renderer, scene, camera
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height, false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x06070a);
  scene.fog = new THREE.FogExp2(0x06070a, 0.006);

  const camera = new THREE.PerspectiveCamera(CAM_FOV, width / height, 0.5, 400);
  camera.position.set(0, CAM_Y, CAM_Z);
  camera.lookAt(0, LOOK_Y, 0);

  // Materials
  const pearl = new THREE.MeshStandardMaterial({
    color: 0xf2f4f8,
    roughness: 0.25,
    metalness: 0.1,
    side: THREE.DoubleSide,
  });
  const navy = new THREE.MeshStandardMaterial({ color: 0x0b1e3f, roughness: 0.4, metalness: 0.2 });
  const steel = new THREE.MeshStandardMaterial({ color: 0x1a1e28, roughness: 0.5, metalness: 0.7 });
  const railMat = new THREE.MeshStandardMaterial({ color: 0xd9dfe8, roughness: 0.15, metalness: 0.9 });
  const concrete = new THREE.MeshStandardMaterial({ color: 0x3e4554, roughness: 0.9 });
  const ballastMat = new THREE.MeshStandardMaterial({ color: 0x15181f, roughness: 1 });
  const groundMat = new THREE.MeshStandardMaterial({ color: 0x0c0e13, roughness: 1 });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0x221815,
    roughness: 0.85,
    side: THREE.DoubleSide,
  });
  const seatMat = new THREE.MeshStandardMaterial({ color: 0x0f2240, roughness: 0.6 });
  const seatHeadrestMat = new THREE.MeshStandardMaterial({ color: 0xded8cf, roughness: 0.4 });
  const carpetMat = new THREE.MeshStandardMaterial({ color: 0x4a1224, roughness: 0.9 });
  const copper = new THREE.MeshStandardMaterial({ color: 0xc9865a, roughness: 0.3, metalness: 0.9 });
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x0a0f1a,
    roughness: 0.05,
    metalness: 0.2,
    transparent: true,
    opacity: 0.25,
    depthWrite: false,
  });
  const headMat = new THREE.MeshBasicMaterial({ color: 0xfff4d6 });
  const greenMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
  const champagne = new THREE.MeshStandardMaterial({ color: 0xd6b99a, roughness: 0.3, metalness: 0.8 });

  // Lights
  scene.add(new THREE.HemisphereLight(0x8fa4c4, 0x07080b, 0.7));
  const moon = new THREE.DirectionalLight(0xe6edf7, 1.6);
  moon.position.set(-30, 40, 30);
  scene.add(moon);
  const rim = new THREE.DirectionalLight(0x873653, 1.2);
  rim.position.set(30, 10, -30);
  scene.add(rim);

  // Shared wheel, axle, and bogie-frame geometry
  const wheelGeo = new THREE.CylinderGeometry(WHEEL_R, WHEEL_R, 0.14, 28);
  wheelGeo.rotateX(Math.PI / 2); // axis along Z
  const axleGeo = new THREE.CylinderGeometry(0.07, 0.07, GAUGE_HALF * 2 + 0.2, 10);
  axleGeo.rotateX(Math.PI / 2);
  const frameGeo = new THREE.BoxGeometry(4.4, 0.18, 1.9);

  const wheels: THREE.Mesh[] = [];

  const buildBogie = (parent: THREE.Object3D, x: number) => {
    const bogie = new THREE.Group();
    bogie.position.x = x;
    const frame = new THREE.Mesh(frameGeo, steel);
    frame.position.y = WHEEL_CENTER_Y + 0.2;
    bogie.add(frame);
    for (const ax of [-1.5, 1.5]) {
      const axle = new THREE.Mesh(axleGeo, steel);
      axle.position.set(ax, WHEEL_CENTER_Y, 0);
      bogie.add(axle);
      for (const z of [-GAUGE_HALF, GAUGE_HALF]) {
        const wheel = new THREE.Mesh(wheelGeo, steel);
        wheel.position.set(ax, WHEEL_CENTER_Y, z);
        bogie.add(wheel);
        wheels.push(wheel);
      }
    }
    parent.add(bogie);
  };

  // Track (static, world space)
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(800, 800), groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.55;
  scene.add(ground);

  const ballast = new THREE.Mesh(new THREE.BoxGeometry(800, 0.5, 6.2), ballastMat);
  ballast.position.y = -0.25;
  scene.add(ballast);

  for (const z of [-GAUGE_HALF, GAUGE_HALF]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(800, 0.12, 0.07), railMat);
    rail.position.set(0, RAIL_TOP_Y - 0.06, z);
    scene.add(rail);
  }

  const sleeperCount = 760;
  const sleepers = new THREE.InstancedMesh(new THREE.BoxGeometry(0.28, 0.2, 2.6), concrete, sleeperCount);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < sleeperCount; i++) {
    dummy.position.set(-400 + i * 1.05, 0.03, 0);
    dummy.updateMatrix();
    sleepers.setMatrixAt(i, dummy.matrix);
  }
  scene.add(sleepers);

  // Overhead wire and masts (static)
  const contactWire = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 800, 6), copper);
  contactWire.rotation.z = Math.PI / 2;
  contactWire.position.y = 5.8;
  scene.add(contactWire);

  const messengerWire = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 800, 6), steel);
  messengerWire.rotation.z = Math.PI / 2;
  messengerWire.position.y = 6.9;
  scene.add(messengerWire);

  for (let x = -400; x <= 400; x += 32) {
    const mast = new THREE.Mesh(new THREE.BoxGeometry(0.3, 7.6, 0.3), steel);
    mast.position.set(x, 3.8, -3.8);
    scene.add(mast);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 3.8), steel);
    arm.position.set(x, 6.9, -1.9);
    scene.add(arm);
  }

  // Distant signal post (static)
  const signal = new THREE.Group();
  signal.position.set(-70, 0, -3.2);
  const signalPole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 5.5, 10), steel);
  signalPole.position.y = 2.75;
  signal.add(signalPole);
  const lens = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 10), greenMat);
  lens.position.set(0, 5.6, 0.25);
  signal.add(lens);
  const signalLight = new THREE.PointLight(0x10b981, 2.5, 10, 2);
  signalLight.position.copy(lens.position);
  signal.add(signalLight);
  scene.add(signal);

  // Train
  const trainGroup = new THREE.Group();
  scene.add(trainGroup);

  // Cab (no window cut)
  const cab = new THREE.Group();
  trainGroup.add(cab);

  const cabBody = new THREE.Mesh(createShell(CAB_LEN), pearl);
  cabBody.position.y = BODY_BASE_Y;
  cab.add(cabBody);

  const noseProfile: THREE.Vector2[] = [new THREE.Vector2(0, 0)];
  for (let i = 0; i <= 28; i++) {
    const t = i / 28;
    noseProfile.push(
      new THREE.Vector2(1.5 * Math.sqrt(Math.max(0, 1 - Math.pow(t, 2.4))), t * NOSE_LEN)
    );
  }
  const noseGeo = new THREE.LatheGeometry(noseProfile, 40);
  noseGeo.rotateZ(Math.PI / 2); // lathe axis (+Y) points to -X, the direction of travel
  noseGeo.translate(-CAB_LEN / 2, BODY_BASE_Y + BODY_H / 2, 0);
  cab.add(new THREE.Mesh(noseGeo, pearl));

  const cabBand = new THREE.Mesh(new THREE.BoxGeometry(CAB_LEN - 0.6, 0.45, HALF_W * 2 + 0.12), navy);
  cabBand.position.y = BODY_BASE_Y + 1.0;
  cab.add(cabBand);

  for (const z of [-1.25, 1.25]) {
    const hl = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 12), headMat);
    hl.position.set(-CAB_LEN / 2 - NOSE_LEN * 0.6, BODY_BASE_Y + BODY_H / 2 + 0.2, z);
    cab.add(hl);
  }

  const cabSpot = new THREE.SpotLight(0xfff1d6, 40, 120, Math.PI / 7, 0.5, 1.5);
  cabSpot.position.set(-CAB_LEN / 2 - NOSE_LEN, BODY_BASE_Y + 1.9, 0);
  const cabSpotTarget = new THREE.Object3D();
  cabSpotTarget.position.set(-60, 1.0, 0);
  cab.add(cabSpot, cabSpotTarget);
  cabSpot.target = cabSpotTarget;

  buildBogie(cab, -CAB_LEN / 2 + 2.2);
  buildBogie(cab, CAB_LEN / 2 - 2.2);

  // Coaches: one cut body geometry (with panoramic window and doorway), shared by all five
  const coachX = (i: number) => CAB_LEN / 2 + GAP + COACH_LEN / 2 + i * (COACH_LEN + GAP);

  const coachShell = createShell(COACH_LEN);
  const W = coachShell.boundingBox!.max.z; // outer wall on the window side
  const coachBodyGeo = cutCoachOpenings(coachShell, W);
  coachShell.dispose();

  const specs = COACH_SPECS.map((s) => buildScreenData(s, host.getProjects()));
  const screenTextures = specs.map((data) => drawScreen(data));

  const yWin = BODY_BASE_Y + WINDOW_Y;
  const yDoor = BODY_BASE_Y + DOOR_Y;
  const screenZ = W - POCKET + 0.06;
  const cabinBack = W - POCKET - 0.2;
  const cabinFront = screenZ - 0.01;

  // Door tracking
  type CoachDoor = {
    left: THREE.Group;
    right: THREE.Group;
    indicator: THREE.Mesh;
    light: THREE.PointLight;
    defaultLeftX: number;
    defaultRightX: number;
  };
  const coachDoors: CoachDoor[] = [];

  // Shared seating geometries
  const seatBaseGeo = new THREE.BoxGeometry(0.48, 0.12, 0.46);
  const seatBackGeo = new THREE.BoxGeometry(0.48, 0.62, 0.1);
  const headrestGeo = new THREE.BoxGeometry(0.32, 0.16, 0.12);

  for (let i = 0; i < COACH_COUNT; i++) {
    const g = new THREE.Group();
    g.position.x = coachX(i);
    trainGroup.add(g);

    // Body with both window and door openings cut into it
    const body = new THREE.Mesh(coachBodyGeo, pearl);
    body.position.y = BODY_BASE_Y;
    g.add(body);

    // Navy stripes: upper continuous stripe above the window and door
    const upperStripe = new THREE.Mesh(new THREE.BoxGeometry(COACH_LEN - 1.2, 0.1, 0.04), navy);
    upperStripe.position.set(0, yWin + WINDOW_H / 2 + 0.18, W + 0.01);
    g.add(upperStripe);

    // Lower stripe: split around the doorway at DOOR_X
    const yLowerStripe = yWin - WINDOW_H / 2 - 0.18;
    const stripeLeftLen = (DOOR_X - DOOR_W / 2) - (-COACH_LEN / 2 + 0.6);
    const stripeLeft = new THREE.Mesh(new THREE.BoxGeometry(stripeLeftLen, 0.1, 0.04), navy);
    stripeLeft.position.set((-COACH_LEN / 2 + 0.6 + DOOR_X - DOOR_W / 2) / 2, yLowerStripe, W + 0.01);
    g.add(stripeLeft);

    const stripeRightLen = (COACH_LEN / 2 - 0.6) - (DOOR_X + DOOR_W / 2);
    const stripeRight = new THREE.Mesh(new THREE.BoxGeometry(stripeRightLen, 0.1, 0.04), navy);
    stripeRight.position.set((DOOR_X + DOOR_W / 2 + COACH_LEN / 2 - 0.6) / 2, yLowerStripe, W + 0.01);
    g.add(stripeRight);

    // Champagne frame edges along the panoramic window
    for (const y of [yWin + WINDOW_H / 2 + 0.03, yWin - WINDOW_H / 2 - 0.03]) {
      const edge = new THREE.Mesh(new THREE.BoxGeometry(WINDOW_W + 0.2, 0.04, 0.04), champagne);
      edge.position.set(0, y, W + 0.02);
      g.add(edge);
    }

    // Dark cabin behind the screen
    const cabin = new THREE.Mesh(
      new THREE.BoxGeometry(WINDOW_W - 0.4, WINDOW_H - 0.3, cabinFront - cabinBack),
      interiorMat
    );
    cabin.position.set(0, yWin, (cabinFront + cabinBack) / 2);
    g.add(cabin);

    const cabinLight = new THREE.PointLight(0xffe2b8, 2.2, 6, 1.6);
    cabinLight.position.set(0, yWin, (cabinFront + cabinBack) / 2);
    g.add(cabinLight);

    // Project screen inside the window
    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(WINDOW_W - 0.15, WINDOW_H - 0.1),
      new THREE.MeshBasicMaterial({ map: screenTextures[i], toneMapped: false })
    );
    screen.position.set(0, yWin, screenZ);
    g.add(screen);

    // Thin glass for reflections only
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(WINDOW_W, WINDOW_H), glassMat);
    glass.position.set(0, yWin, W + 0.015);
    g.add(glass);

    // ── Passenger Entrance Door & Automatic Sliding Leaves ──────────
    const threshold = new THREE.Mesh(new THREE.BoxGeometry(DOOR_W + 0.1, 0.04, 0.22), champagne);
    threshold.position.set(DOOR_X, BODY_BASE_Y + 0.02, W - 0.04);
    g.add(threshold);

    const indicatorFixture = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.08, 0.08), steel);
    indicatorFixture.position.set(DOOR_X, BODY_BASE_Y + DOOR_H + 0.06, W + 0.01);
    g.add(indicatorFixture);

    const indicatorMat = new THREE.MeshStandardMaterial({
      color: 0x873653,
      emissive: 0x873653,
      emissiveIntensity: 0.8,
      roughness: 0.3,
    });
    const indicator = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.035, 0.09), indicatorMat);
    indicator.position.set(DOOR_X, BODY_BASE_Y + DOOR_H + 0.06, W + 0.015);
    g.add(indicator);

    // Sliding Door Leaves
    const leafW = DOOR_W / 2 - 0.02;
    const leafH = DOOR_H - 0.06;
    const doorZ = W - 0.04;

    const leftDoor = new THREE.Group();
    const leftPanel = new THREE.Mesh(new THREE.BoxGeometry(leafW, leafH, 0.04), pearl);
    leftDoor.add(leftPanel);
    const leftStripe = new THREE.Mesh(new THREE.BoxGeometry(leafW, 0.1, 0.045), navy);
    leftStripe.position.set(0, yLowerStripe - yDoor, 0.005);
    leftDoor.add(leftStripe);
    const leftWin = new THREE.Mesh(new THREE.BoxGeometry(leafW - 0.16, 0.95, 0.048), glassMat);
    leftWin.position.set(0, 0.28, 0.005);
    leftDoor.add(leftWin);
    const defLeftX = DOOR_X - leafW / 2;
    leftDoor.position.set(defLeftX, yDoor, doorZ);
    g.add(leftDoor);

    const rightDoor = new THREE.Group();
    const rightPanel = new THREE.Mesh(new THREE.BoxGeometry(leafW, leafH, 0.04), pearl);
    rightDoor.add(rightPanel);
    const rightStripe = new THREE.Mesh(new THREE.BoxGeometry(leafW, 0.1, 0.045), navy);
    rightStripe.position.set(0, yLowerStripe - yDoor, 0.005);
    rightDoor.add(rightStripe);
    const rightWin = new THREE.Mesh(new THREE.BoxGeometry(leafW - 0.16, 0.95, 0.048), glassMat);
    rightWin.position.set(0, 0.28, 0.005);
    rightDoor.add(rightWin);
    const defRightX = DOOR_X + leafW / 2;
    rightDoor.position.set(defRightX, yDoor, doorZ);
    g.add(rightDoor);

    const doorLight = new THREE.PointLight(0xffe2b8, 2.5, 6, 1.8);
    doorLight.position.set(DOOR_X, yDoor + 0.3, 0.5);
    g.add(doorLight);

    coachDoors.push({
      left: leftDoor,
      right: rightDoor,
      indicator,
      light: doorLight,
      defaultLeftX: defLeftX,
      defaultRightX: defRightX,
    });

    // ── Full Passenger Interior Saloon ──────────────────────────────
    // Interior floor
    const intFloor = new THREE.Mesh(new THREE.BoxGeometry(COACH_LEN - 0.6, 0.06, HALF_W * 2 - 0.2), concrete);
    intFloor.position.set(0, BODY_BASE_Y + 0.03, 0);
    g.add(intFloor);

    const aisleCarpet = new THREE.Mesh(new THREE.BoxGeometry(COACH_LEN - 0.8, 0.02, 0.7), carpetMat);
    aisleCarpet.position.set(0, BODY_BASE_Y + 0.065, 0);
    g.add(aisleCarpet);

    // Interior ceiling & warm cove lighting
    const intCeiling = new THREE.Mesh(new THREE.BoxGeometry(COACH_LEN - 0.6, 0.04, HALF_W * 2 - 0.3), concrete);
    intCeiling.position.set(0, BODY_BASE_Y + BODY_H - 0.08, 0);
    g.add(intCeiling);

    const coveLight = new THREE.Mesh(
      new THREE.BoxGeometry(COACH_LEN - 1.0, 0.03, 0.25),
      new THREE.MeshStandardMaterial({ color: 0xffeedb, emissive: 0xffeedb, emissiveIntensity: 1.5 })
    );
    coveLight.position.set(0, BODY_BASE_Y + BODY_H - 0.1, 0);
    g.add(coveLight);

    // Executive seating rows
    for (let row = -3; row <= 2; row++) {
      const sx = row * 1.5;
      for (const sz of [-0.85, 0.85]) {
        const seat = new THREE.Group();
        const base = new THREE.Mesh(seatBaseGeo, seatMat);
        base.position.set(0, 0.25, 0);
        seat.add(base);

        const back = new THREE.Mesh(seatBackGeo, seatMat);
        back.position.set(-0.16, 0.58, 0);
        back.rotation.z = 0.08;
        seat.add(back);

        const head = new THREE.Mesh(headrestGeo, seatHeadrestMat);
        head.position.set(-0.22, 0.94, 0);
        seat.add(head);

        seat.position.set(sx, BODY_BASE_Y + 0.05, sz);
        g.add(seat);
      }
    }

    // Vestibule bulkhead partition with open executive archway
    const partWallLeft = new THREE.Mesh(new THREE.BoxGeometry(0.06, BODY_H - 0.4, 0.8), steel);
    partWallLeft.position.set(DOOR_X - 1.1, BODY_BASE_Y + (BODY_H - 0.4) / 2 + 0.1, -0.8);
    g.add(partWallLeft);

    const partWallRight = new THREE.Mesh(new THREE.BoxGeometry(0.06, BODY_H - 0.4, 0.8), steel);
    partWallRight.position.set(DOOR_X - 1.1, BODY_BASE_Y + (BODY_H - 0.4) / 2 + 0.1, 0.8);
    g.add(partWallRight);

    const partHeader = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.5, 0.8), steel);
    partHeader.position.set(DOOR_X - 1.1, BODY_BASE_Y + BODY_H - 0.4, 0);
    g.add(partHeader);

    buildBogie(g, -(COACH_LEN / 2 - 4.2));
    buildBogie(g, COACH_LEN / 2 - 4.2);

    // Pantograph on coach 02 only, head touching the contact wire at y = 5.8
    if (i === 1) {
      const base = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.12, 0.9), steel);
      base.position.y = 4.55;
      g.add(base);
      const strut = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.1, 0.08), steel);
      strut.position.y = 5.2;
      g.add(strut);
      const head = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.05, 0.12), copper);
      head.position.y = 5.8;
      g.add(head);
    }
  }

  // Gangways between cars
  const gangwayMat = steel;
  const gangwayXs = [CAB_LEN / 2 + GAP / 2, ...Array.from({ length: COACH_COUNT }, (_, i) => coachX(i) - COACH_LEN / 2 - GAP / 2)];
  for (const x of gangwayXs) {
    const gw = new THREE.Mesh(new THREE.BoxGeometry(GAP, 2.0, 2.4), gangwayMat);
    gw.position.set(x, BODY_BASE_Y + 1.1, 0);
    trainGroup.add(gw);
  }

  // Cabin lights are per coach, so the train group carries no extra lighting.

  // ScrollTrigger: pins the wrapper and maps scroll progress to progress 0..1
  let progress = 0;
  const st = ScrollTrigger.create({
    trigger,
    start: 'top top',
    end: `+=${SCROLL_LENGTH}`,
    pin: true,
    scrub: 0.6,
    onUpdate: (self) => {
      progress = self.progress;
    },
  });

  // Stop position per coach: move the train so the coach is centred on the camera (x = 0)
  const stopX = Array.from({ length: COACH_COUNT }, (_, i) => -coachX(i));

  // Render loop
  let trainX = ENTRY_X;
  let focusAmt = 0;
  let exploreAmt = 0;
  let lastFocus = -1;
  let clock = 0;
  let last = performance.now();
  let raf = 0;

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    clock += dt;

    const s = sampleTrain(progress, stopX, ENTRY_X);

    const dtSafe = Math.max(dt, 1 / 240);
    const prevX = trainX;
    trainX += (s.x - trainX) * (1 - Math.exp(-dtSafe * 7));
    const dx = trainX - prevX;
    const speed = clamp(Math.abs(dx) / dtSafe / 12, 0, 1); // 12 m/s counts as full speed

    trainGroup.position.x = trainX;
    // Bounce and sway, scaled by speed
    trainGroup.position.y = Math.sin(clock * 22) * 0.012 * speed;
    trainGroup.rotation.z = Math.sin(clock * 13) * 0.002 * speed;

    // Wheels roll with distance travelled (leftward travel = positive roll)
    const spin = -dx / WHEEL_R;
    for (const w of wheels) w.rotation.z += spin;

    // Focus on the active window & explore door boarding
    const ex = exploreSignal.current ? 1 : 0;
    exploreAmt += (ex - exploreAmt) * (1 - Math.exp(-dtSafe * 2.8));
    focusAmt += (s.focus - focusAmt) * 0.1;

    // Door animation for the target coach
    for (let i = 0; i < COACH_COUNT; i++) {
      const cd = coachDoors[i];
      if (!cd) continue;
      const isTarget = i === lastFocus || (lastFocus === -1 && i === 0);
      const doorT = isTarget ? easeInOutCubic(clamp((exploreAmt - 0.08) / 0.44, 0, 1)) : 0;
      const slide = 0.72 * doorT;

      cd.left.position.x = cd.defaultLeftX - slide;
      cd.right.position.x = cd.defaultRightX + slide;

      const indMat = cd.indicator.material as THREE.MeshStandardMaterial;
      if (doorT > 0.02) {
        indMat.color.setHex(0x10b981);
        indMat.emissive.setHex(0x10b981);
        indMat.emissiveIntensity = 2.8;
        cd.light.intensity = 2.5 + doorT * 2.5;
      } else {
        indMat.color.setHex(0x873653);
        indMat.emissive.setHex(0x873653);
        indMat.emissiveIntensity = 0.8;
        cd.light.intensity = 1.0;
      }
    }

    // Camera motion:
    // When exploreAmt == 0: locked-in centered focus
    // When exploreAmt > 0: swoops to the active door, doors open, and camera glides inside the coach!
    const zFocus = lerp(CAM_Z, FOCUS_Z, focusAmt);
    const camYBase = lerp(CAM_Y, FOCUS_CAM_Y, focusAmt);
    const lookYBase = lerp(LOOK_Y, FOCUS_LOOK_Y, focusAmt);

    let targetCamX = Math.sin(clock * 9) * 0.02 * speed;
    let targetCamY = camYBase + Math.sin(clock * 17) * 0.025 * speed;
    let targetCamZ = zFocus;
    let targetLookX = 0;
    let targetLookY = lookYBase;
    let targetLookZ = 0;
    let fovTarget = CAM_FOV;

    if (exploreAmt > 0.001) {
      // Phase 1: glide towards entrance door (0 .. 0.35)
      const p1 = easeInOutCubic(clamp(exploreAmt / 0.35, 0, 1));
      // Phase 2: glide through doorway into saloon aisle (0.35 .. 1.0)
      const p2 = easeInOutCubic(clamp((exploreAmt - 0.35) / 0.65, 0, 1));

      const targetCoach = lastFocus >= 0 ? lastFocus : 0;
      const coachWorldX = trainGroup.position.x + coachX(targetCoach);
      const doorCamX = coachWorldX + DOOR_X;
      const doorCamY = BODY_BASE_Y + DOOR_Y;
      const doorCamZ = 3.6;

      targetCamX = lerp(targetCamX, doorCamX - 1.25 * p2, p1);
      targetCamY = lerp(targetCamY, lerp(doorCamY, 2.24, p2), p1);
      targetCamZ = lerp(targetCamZ, lerp(doorCamZ, 0.0, p2), p1);

      targetLookX = lerp(0, lerp(doorCamX, coachWorldX - 6.0, p2), p1);
      targetLookY = lerp(targetLookY, lerp(doorCamY, 2.24, p2), p1);
      targetLookZ = 0;

      fovTarget = lerp(CAM_FOV, 50, p2);
    }

    camera.position.set(targetCamX, targetCamY, targetCamZ);
    if (Math.abs(camera.fov - fovTarget) > 0.01) {
      camera.fov = fovTarget;
      camera.updateProjectionMatrix();
    }
    camera.lookAt(targetLookX, targetLookY, targetLookZ);

    // Report the focused coach to React only when it changes
    const focusedIdx = focusAmt > 0.5 ? s.idx : -1;
    if (focusedIdx !== lastFocus) {
      lastFocus = focusedIdx;
      host.setFocused(focusedIdx);
      if (focusedIdx >= 0) host.onSelectCoach(focusedIdx + 1);
    }

    renderer.render(scene, camera);
  };
  raf = requestAnimationFrame(frame);

  const onResize = () => {
    const w = container.clientWidth || width;
    const h = container.clientHeight || height;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  };
  window.addEventListener('resize', onResize);

  // Teardown
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', onResize);
    st.kill();

    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      const mats = Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : [];
      for (const m of mats) {
        const map = (m as THREE.MeshBasicMaterial).map;
        if (map) map.dispose();
        m.dispose();
      }
    });
    screenTextures.forEach((t) => t.dispose());
    coachBodyGeo.dispose();
    seatBaseGeo.dispose();
    seatBackGeo.dispose();
    headrestGeo.dispose();

    renderer.dispose();
    renderer.forceContextLoss();
    canvas.remove();
  };
}

// ── React component ─────────────────────────────────────────────────
interface VandeBharat3DCanvasProps {
  flagshipProjects: Project[];
  allProjects: Project[];
  activeCoach: number;
  onSelectCoach: (coachNum: number) => void;
  onProjectClick: (project: Project) => void;
  onExploreArchive: () => void;
}

export function VandeBharat3DCanvas({
  flagshipProjects,
  onSelectCoach,
  onProjectClick,
  onExploreArchive,
}: VandeBharat3DCanvasProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [focused, setFocused] = useState<number>(-1);
  const exploreRef = useRef(false);

  // Latest props, read by the scene without rebuilding it
  const propsRef = useRef({ flagshipProjects, onSelectCoach, onProjectClick, onExploreArchive });
  useEffect(() => {
    propsRef.current = { flagshipProjects, onSelectCoach, onProjectClick, onExploreArchive };
  });

  // Esc cancels explore
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') exploreRef.current = false;
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const trigger = wrapperRef.current;
    if (!container || !trigger) return;

    let disposed = false;
    let teardown: () => void = () => {};

    const host: SceneHost = {
      getProjects: () => propsRef.current.flagshipProjects,
      onSelectCoach: (n) => propsRef.current.onSelectCoach(n),
      setFocused,
    };

    void loadFonts().then(() => {
      if (!disposed) teardown = buildScene(container, trigger, host, exploreRef);
    });

    return () => {
      disposed = true;
      teardown();
    };
  }, []);

  const current = focused >= 0 ? COACH_SPECS[focused] : null;
  const project = current?.projectId
    ? flagshipProjects.find((p) => p.id === current.projectId)
    : undefined;

  const handleExplore = () => {
    if (!project) return;
    exploreRef.current = true;
    window.setTimeout(() => {
      propsRef.current.onProjectClick(project);
      exploreRef.current = false;
    }, EXPLORE_DELAY_MS);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-screen min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 lg:px-12 bg-[#08090B] overflow-hidden select-none"
    >
      {/* Background railway atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-[radial-gradient(ellipse_at_top_right,rgba(135,54,83,0.12),transparent_70%)]" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#08090B] via-transparent to-transparent opacity-80" />
      </div>

      <div className="relative z-10 w-full max-w-[1500px] flex flex-col items-center justify-center">
        {/* 3D scene: canvas is created inside this container */}
        <div
          ref={containerRef}
          className="relative w-full h-[480px] sm:h-[540px] md:h-[600px] lg:h-[640px] xl:h-[680px] max-h-[72vh] rounded-2xl overflow-hidden border border-[rgba(214,185,154,0.22)] bg-[#06070A] shadow-[0_35px_100px_rgba(0,0,0,0.9)] select-none"
        />

        {/* Action bar: outside the canvas, so no HTML sits over the 3D scene */}
        <div
          className={`w-full mt-3 min-h-[44px] flex flex-wrap items-center justify-between gap-3 font-mono text-xs transition-opacity duration-500 ${
            current ? 'opacity-100' : 'opacity-0'
          }`}
          aria-live="polite"
        >
        {current && (
          <>
            <div className="text-[#D6B99A] uppercase tracking-wider">
              COACH 0{current.num} · {project?.title ?? current.fallbackTitle}
            </div>

            {current.archive ? (
              <button
                onClick={onExploreArchive}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#873653] border border-[#D6B99A] text-[#F0EAE3] font-bold uppercase tracking-wider hover:bg-[#9a4262] transition-colors"
              >
                CONTINUE TO COMPLETE ARCHIVE <ArrowRight size={14} />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExplore}
                  disabled={!project}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#D6B99A] text-[#F0EAE3] font-bold uppercase tracking-wider hover:bg-[rgba(214,185,154,0.12)] transition-colors disabled:opacity-50"
                >
                  ENTER COACH
                </button>
                <button
                  onClick={() => project && onProjectClick(project)}
                  disabled={!project}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5A1832] border border-[#873653] text-[#F0EAE3] font-bold uppercase tracking-wider hover:bg-[#873653] transition-colors disabled:opacity-50"
                >
                  <Maximize2 size={13} />
                  INSPECT SPEC
                </button>
                {project?.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`GitHub repository for ${project.title}`}
                    className="p-2 rounded-lg border border-[rgba(214,185,154,0.25)] text-[#F0EAE3] hover:border-[#D6B99A] transition-colors"
                  >
                    <Github size={15} />
                  </a>
                )}
                {project?.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Live demo for ${project.title}`}
                    className="p-2 rounded-lg border border-[rgba(214,185,154,0.25)] text-[#D6B99A] hover:border-[#D6B99A] transition-colors"
                  >
                    <ExternalLink size={15} />
                  </a>
                )}
              </div>
            )}
          </>
        )}
      </div>
      </div>

      {/* Screen-reader list of all five projects (the canvas text is not readable by assistive tech) */}
      <ul className="sr-only">
        {COACH_SPECS.map((spec) => {
          const p = spec.projectId ? flagshipProjects.find((x) => x.id === spec.projectId) : undefined;
          const title = p?.title ?? spec.fallbackTitle;
          const tech = spec.archive ? 'Cyber Defense, Distributed, AI and Systems repositories' : (p?.technologies ?? spec.fallbackTech).join(', ');
          return (
            <li key={spec.num}>
              <h3>{`Coach ${spec.num}: ${title}`}</h3>
              <p>{spec.category}</p>
              <p>{spec.desc}</p>
              <p>{`Technologies: ${tech}`}</p>
              {p?.githubUrl && <a href={p.githubUrl}>GitHub repository for {title}</a>}
              {p?.liveUrl && <a href={p.liveUrl}>Live demo for {title}</a>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}