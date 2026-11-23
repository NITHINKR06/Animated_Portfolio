/**
 * @component Hero
 * @description Theatrical Stage Hero Section with 3D Stagehand, Velvet Cloth Physics & Portrait Bloom
 * @author      Nithin K R — https://github.com/NITHINKR06
 * @license     Attribution required — see LICENSE in project root
 */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { Project } from '../data';

export interface HeroProps {
  onResumeClick?: () => void;
  onProjectClick?: (project: Project) => void;
}

// Coordinate & Stage Constants
const BH = 188; // Height in pixels on stage
const ASP = 936 / 1024; // Transparent cutout aspect ratio
const HEAD_Y = 0.32;
const HEAD_H = 0.44;
const R2 = Math.PI / 180;

// Easing math helpers
const cl = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ss = (a: number, b: number, v: number) => {
  const t = cl((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const eio = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const eob = (t: number, s: number) => 1 + (s + 1) * (t - 1) ** 3 + s * (t - 1) ** 2;
const eio3 = (v: number) => (v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2);

// Velvet Cloth Pleating Constants
const CN = 120, CK = 6, PLEAT = 100 / 7.4, GATHER = 0.09;
const PSTOP: [number, number[]][] = [
  [0, [0x24, 0x06, 0x0f]],
  [1.5, [0x4a, 0x10, 0x27]],
  [3, [0x7a, 0x22, 0x42]],
  [3.9, [0xa1, 0x39, 0x5d]],
  [5.1, [0x6d, 0x1b, 0x38]],
  [6.5, [0x3a, 0x0b, 0x1c]],
  [7.4, [0x24, 0x06, 0x0f]],
];

const pleatCol = (ph: number): number[] => {
  const p = (ph - Math.floor(ph)) * 7.4;
  for (let i = 1; i < PSTOP.length; i++) {
    if (p <= PSTOP[i][0]) {
      const a = PSTOP[i - 1], b = PSTOP[i];
      const k = (p - a[0]) / (b[0] - a[0]);
      return a[1].map((v, j) => v + (b[1][j] - v) * k);
    }
  }
  return PSTOP[0][1];
};

const CBASE = Array.from({ length: CN }, (_, j) => pleatCol(((j + 0.5) / CN) * PLEAT));

interface EmberParticle {
  sx: number;
  sy: number;
  tx: number;
  ty: number;
  cx: number;
  cy: number;
  delay: number;
  dur: number;
  t: number;
  s: number;
  c: string;
}

export const Hero: React.FC<HeroProps> = ({ onResumeClick }) => {
  const heroRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Canvases
  const stageCanvasRef = useRef<HTMLCanvasElement>(null);
  const curtainCanvasRef = useRef<HTMLCanvasElement>(null);
  const emberCanvasRef = useRef<HTMLCanvasElement>(null);
  const dustCanvasRef = useRef<HTMLCanvasElement>(null);

  // Button state
  const [isIntroRunning, setIsIntroRunning] = useState<boolean>(true);

  // Three.js instances ref
  const threeRef = useRef<{
    renderer: THREE.WebGLRenderer | null;
    scene: THREE.Scene | null;
    camera: THREE.OrthographicCamera | null;
    manGroup: THREE.Group | null;
    mixer: THREE.AnimationMixer | null;
    actWalk: THREE.AnimationAction | null;
    actIdle: THREE.AnimationAction | null;
    bones: Record<string, THREE.Bone>;
    modelReady: boolean;
  }>({
    renderer: null,
    scene: null,
    camera: null,
    manGroup: null,
    mixer: null,
    actWalk: null,
    actIdle: null,
    bones: {},
    modelReady: false,
  });

  // Animation State Machine ref
  const animStateRef = useRef<{
    name: 'idle' | 'enter' | 'turnIn' | 'reach' | 'tug' | 'pull' | 'release' | 'turnOut' | 'walk2' | 'pause' | 'dissolve' | 'done';
    t: number;
    man: {
      x: number;
      yaw: number;
      amp: number;
      ampT: number;
      alpha: number;
      vis: boolean;
      v: number;
      x0: number;
      armWeight: number;
      armPull: number;
      lean: number;
    };
    target: { x: number; fTop: number; fH: number; fW: number } | null;
    particles: EmberParticle[];
    a0?: number;
  }>({
    name: 'idle',
    t: 0,
    man: {
      x: -70,
      yaw: Math.PI / 2,
      amp: 0,
      ampT: 0,
      alpha: 1,
      vis: false,
      v: 165,
      x0: 0,
      armWeight: 0,
      armPull: 0,
      lean: 0,
    },
    target: null,
    particles: [],
  });

  // Curtain mode ref
  const curtainModeRef = useRef<'idle' | 'tug' | 'open' | 'opened'>('idle');
  const curtainStateRef = useRef<{
    mode: string;
    t0: number;
    X: [Float32Array, Float32Array];
  }>({
    mode: '',
    t0: 0,
    X: [new Float32Array((CN + 1) * (CK + 1)), new Float32Array((CN + 1) * (CK + 1))],
  });

  // Stable reference to go function (declared before go, assigned after go)
  const goRef = useRef<
    | ((
        n:
          | 'idle'
          | 'enter'
          | 'turnIn'
          | 'reach'
          | 'tug'
          | 'pull'
          | 'release'
          | 'turnOut'
          | 'walk2'
          | 'pause'
          | 'dissolve'
          | 'done'
      ) => void)
    | null
  >(null);
  const measureTarget = useCallback(() => {
    if (!heroRef.current || !frameRef.current) return null;
    const hr = heroRef.current.getBoundingClientRect();
    const fr = frameRef.current.getBoundingClientRect();
    const cH = Math.min(fr.height, (fr.width * 1.06) / ASP);
    const cW = cH * ASP;
    return {
      x: fr.left - hr.left + fr.width / 2,
      fTop: fr.bottom - hr.top - cH,
      fH: cH,
      fW: cW,
    };
  }, []);

  // Enter state function
  const go = useCallback(
    (n: 'idle' | 'enter' | 'turnIn' | 'reach' | 'tug' | 'pull' | 'release' | 'turnOut' | 'walk2' | 'pause' | 'dissolve' | 'done') => {
      const state = animStateRef.current;
      state.name = n;
      state.t = 0;
      const hero = heroRef.current;
      const stage = stageRef.current;

      if (n === 'enter') {
        Object.assign(state.man, {
          x: -70,
          yaw: Math.PI / 2,
          amp: 1,
          ampT: 1,
          vis: true,
          alpha: 1,
          armWeight: 0,
          armPull: 0,
          lean: 0,
        });
        curtainModeRef.current = 'idle';
        if (stage) stage.className = 'stage';
      } else if (n === 'turnIn') {
        state.man.x0 = state.man.x;
      } else if (n === 'tug') {
        curtainModeRef.current = 'tug';
        if (stage) stage.className = 'stage tug';
      } else if (n === 'pull') {
        curtainModeRef.current = 'open';
        if (stage) stage.className = 'stage open';
        if (hero) hero.classList.add('flashing');
      } else if (n === 'release') {
        if (hero) hero.classList.add('show-text');
      } else if (n === 'walk2') {
        state.target = measureTarget();
        if (hero) hero.classList.add('show-arch');
        Object.assign(state.man, { yaw: Math.PI / 2, ampT: 1 });
      } else if (n === 'dissolve') {
        const t = state.target || measureTarget();
        state.particles = [];
        if (t && heroRef.current) {
          const H = heroRef.current.clientHeight;
          const groundY = H * 0.93;
          const headR = t.fH * HEAD_H * 0.5;
          const fW = t.fW * 0.62;
          const count = 380;
          for (let i = 0; i < count; i++) {
            let tx: number, ty: number;
            if (Math.random() < 0.4) {
              const a = Math.random() * 6.283;
              const rr = Math.sqrt(Math.random()) * headR;
              tx = t.x + Math.cos(a) * rr * 0.7;
              ty = t.fTop + t.fH * HEAD_Y + Math.sin(a) * rr;
            } else {
              const v = Math.random();
              tx = t.x + (Math.random() - 0.5) * fW * lerp(0.45, 1, v);
              ty = t.fTop + t.fH * lerp(0.66, 1, v);
            }
            const sx = state.man.x + (Math.random() - 0.5) * 50;
            const sy = groundY - Math.random() * BH;
            const rC = Math.floor(245 + Math.random() * 10);
            const gC = Math.floor(170 + Math.random() * 70);
            const bC = Math.floor(100 + Math.random() * 60);

            state.particles.push({
              sx,
              sy,
              tx,
              ty,
              cx: lerp(sx, tx, 0.25) + (Math.random() - 0.5) * 140,
              cy: Math.min(sy, ty) - 70 - Math.random() * 150,
              delay: Math.random() * 0.5,
              dur: 1.1 + Math.random() * 0.6,
              t: 0,
              s: 1.4 + Math.random() * 1.5,
              c: `rgb(${rC},${gC},${bC})`,
            });
          }
        }
      } else if (n === 'done') {
        curtainModeRef.current = 'opened';
        if (stage) stage.className = 'stage opened';
        if (hero) {
          hero.classList.add('show-text', 'show-arch', 'show-photo', 'done');
          hero.classList.remove('flashing');
        }
        setIsIntroRunning(false);
        state.man.vis = false;
      }
    },
    [measureTarget],
  );
  goRef.current = go;

  // Jump to final state (Skip intro)
  const finalState = useCallback(() => {
    const state = animStateRef.current;
    state.name = 'done';
    state.particles = [];
    state.man.vis = false;
    curtainModeRef.current = 'opened';
    const hero = heroRef.current;
    const stage = stageRef.current;
    if (stage) stage.className = 'stage opened';
    if (hero) {
      hero.classList.add('show-text', 'show-arch', 'show-photo', 'done');
      hero.classList.remove('flashing');
    }
    setIsIntroRunning(false);
  }, []);

  // Replay intro
  const replayIntro = useCallback(() => {
    const state = animStateRef.current;
    state.name = 'idle';
    state.target = null;
    state.particles = [];
    state.man.vis = false;
    curtainModeRef.current = 'idle';
    const hero = heroRef.current;
    const stage = stageRef.current;
    if (stage) stage.className = 'stage';
    if (hero) {
      hero.classList.remove('show-text', 'show-arch', 'show-photo', 'done', 'flashing');
    }
    if (frameRef.current) {
      frameRef.current.classList.remove('lit');
      frameRef.current.style.setProperty('--r', '0px');
    }
    setIsIntroRunning(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => goRef.current?.('enter'), 100);
  }, []);

  // Color bloom spotlight
  const bloomRadiusRef = useRef<{ current: number; target: number; raf: number }>({
    current: 0,
    target: 0,
    raf: 0,
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!frameRef.current) return;
    const b = frameRef.current.getBoundingClientRect();
    frameRef.current.style.setProperty('--x', `${e.clientX - b.left}px`);
    frameRef.current.style.setProperty('--y', `${e.clientY - b.top}px`);
  };

  const setBloomLight = (on: boolean) => {
    if (!frameRef.current) return;
    const maxR = Math.hypot(frameRef.current.clientWidth, frameRef.current.clientHeight) * 1.15;
    bloomRadiusRef.current.target = on ? maxR : 0;
    frameRef.current.classList.toggle('lit', on);

    if (!bloomRadiusRef.current.raf) {
      const tick = () => {
        const b = bloomRadiusRef.current;
        b.current += (b.target - b.current) * 0.075;
        if (Math.abs(b.target - b.current) < 0.5) b.current = b.target;
        if (frameRef.current) {
          frameRef.current.style.setProperty('--r', `${b.current}px`);
        }
        if (b.current !== b.target) {
          b.raf = requestAnimationFrame(tick);
        } else {
          b.raf = 0;
        }
      };
      b.raf = requestAnimationFrame(tick);
    }
  };

  // Main lifecycle: Runs ONCE on mount
  useEffect(() => {
    const heroEl = heroRef.current;
    const stageCanvas = stageCanvasRef.current;
    const curtainCanvas = curtainCanvasRef.current;
    const emberCanvas = emberCanvasRef.current;
    const dustCanvas = dustCanvasRef.current;
    if (!heroEl || !stageCanvas || !curtainCanvas || !emberCanvas || !dustCanvas) return;

    let destroyed = false;
    let animFrameId = 0;
    let dustFrameId = 0;

    const emberCtx = emberCanvas.getContext('2d');
    const curtainCtx = curtainCanvas.getContext('2d');
    const dustCtx = dustCanvas.getContext('2d');

    // Initialize Three.js WebGL Stage
    const renderer = new THREE.WebGLRenderer({
      canvas: stageCanvas,
      alpha: true,
      antialias: true,
    });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(heroEl.clientWidth, heroEl.clientHeight);
    if ('outputColorSpace' in renderer) {
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    }
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      0,
      heroEl.clientWidth,
      heroEl.clientHeight,
      0,
      -1000,
      1000,
    );
    camera.position.z = 450;

    // Theatrical lighting
    scene.add(new THREE.AmbientLight(0xffecd8, 0.9));
    const keyLight = new THREE.DirectionalLight(0xfff3e4, 1.8);
    keyLight.position.set(heroEl.clientWidth * 0.45, heroEl.clientHeight + 250, 350);
    scene.add(keyLight);
    const wineRim = new THREE.DirectionalLight(0x873653, 1.4);
    wineRim.position.set(heroEl.clientWidth * 0.6, heroEl.clientHeight * 0.5, -280);
    scene.add(wineRim);
    const fillLight = new THREE.DirectionalLight(0xd6b99a, 0.6);
    fillLight.position.set(heroEl.clientWidth * 0.2, heroEl.clientHeight * 0.2, 200);
    scene.add(fillLight);

    threeRef.current = {
      renderer,
      scene,
      camera,
      manGroup: null,
      mixer: null,
      actWalk: null,
      actIdle: null,
      bones: {},
      modelReady: false,
    };

    // Load 3D Character Model (NO HELMET, NO HAMMER)
    const gltfLoader = new GLTFLoader();
    const glbCandidates = [
      '/wall-blast/man.glb',
      '/public/wall-blast/man.glb',
      '../../public/wall-blast/man.glb',
      './wall-blast/man.glb',
    ];

    const onModelParsed = (gltf: any) => {
      if (destroyed) return;
      const manGroup = new THREE.Group();
      manGroup.rotation.order = 'YXZ';
      const model = gltf.scene;
      manGroup.add(model);
      scene.add(manGroup);

      const bonesMap: Record<string, THREE.Bone> = {};
      model.traverse((o: any) => {
        if (o.isMesh) {
          o.castShadow = true;
          o.receiveShadow = true;
          o.frustumCulled = false;
          // Hide any headwear from model — NO HELMET
          if (o.name === 'Wolf3D_Headwear') o.visible = false;
        }
        if (o.isBone) bonesMap[o.name] = o;
      });

      // Add sleek, stylized dark hair to character head — natural human hair, NO HELMET
      if (bonesMap.Head) {
        const hairGroup = new THREE.Group();
        const hairMat = new THREE.MeshStandardMaterial({ color: 0x181412, roughness: 0.82 });
        const dome = new THREE.Mesh(
          new THREE.SphereGeometry(0.114, 22, 16, 0, Math.PI * 2, 0, Math.PI * 0.6),
          hairMat,
        );
        dome.scale.set(1.02, 0.98, 1.15);
        hairGroup.add(dome);

        const fringe = new THREE.Mesh(
          new THREE.SphereGeometry(0.108, 16, 12, 0, Math.PI, 0, Math.PI * 0.4),
          hairMat,
        );
        fringe.rotation.x = -0.25;
        fringe.position.set(0, 0.02, 0.012);
        hairGroup.add(fringe);

        const attachPos = bonesMap.HeadTop_End
          ? bonesMap.HeadTop_End.position.clone().multiplyScalar(0.58)
          : new THREE.Vector3(0, 0.16, 0);
        hairGroup.position.copy(attachPos);
        hairGroup.position.z += 0.005;
        bonesMap.Head.add(hairGroup);
      }

      // Scale model to match exact 188px stage height
      const bbox = new THREE.Box3().setFromObject(model);
      const modelH = bbox.max.y - bbox.min.y || 1.85;
      manGroup.scale.setScalar(BH / modelH);

      const mixer = new THREE.AnimationMixer(model);

      threeRef.current.manGroup = manGroup;
      threeRef.current.mixer = mixer;
      threeRef.current.bones = bonesMap;

      // Load walk and idle animation clips
      const animCandidates = [
        '/wall-blast/anims.json',
        '/public/wall-blast/anims.json',
        '../../public/wall-blast/anims.json',
        './wall-blast/anims.json',
      ];

      const loadClips = async () => {
        for (const p of animCandidates) {
          try {
            const res = await fetch(p);
            if (res.ok) {
              const data = await res.json();
              const clips = data.map((c: any) => THREE.AnimationClip.parse(c));
              const walkClip = clips.find((c: any) => c.name === 'walk');
              const idleClip = clips.find((c: any) => c.name === 'idle');
              if (walkClip) {
                const actWalk = mixer.clipAction(walkClip);
                actWalk.play();
                actWalk.setEffectiveWeight(0);
                threeRef.current.actWalk = actWalk;
              }
              if (idleClip) {
                const actIdle = mixer.clipAction(idleClip);
                actIdle.play();
                actIdle.setEffectiveWeight(1);
                threeRef.current.actIdle = actIdle;
              }
              return true;
            }
          } catch (_) {}
        }
        return false;
      };

      loadClips().finally(() => {
        if (!destroyed) {
          threeRef.current.modelReady = true;
          goRef.current?.('enter');
        }
      });
    };

    // Multi-path GLB loading
    const loadGlb = async () => {
      for (const p of glbCandidates) {
        try {
          const res = await fetch(p);
          if (res.ok) {
            const buf = await res.arrayBuffer();
            gltfLoader.parse(buf, '', onModelParsed, () => {});
            return;
          }
        } catch (_) {}
      }
      threeRef.current.modelReady = true;
      goRef.current?.('enter');
    };
    loadGlb();

    // Canvas Resize Observer
    const handleResize = () => {
      if (!heroEl) return;
      const w = heroEl.clientWidth;
      const h = heroEl.clientHeight;
      const curDpr = Math.min(window.devicePixelRatio || 1, 2);

      renderer.setPixelRatio(curDpr);
      renderer.setSize(w, h);

      camera.left = 0;
      camera.right = w;
      camera.top = h;
      camera.bottom = 0;
      camera.updateProjectionMatrix();

      for (const c of [curtainCanvas, emberCanvas, dustCanvas]) {
        c.width = Math.round(w * curDpr);
        c.height = Math.round(h * curDpr);
      }
    };
    const ro = new ResizeObserver(handleResize);
    ro.observe(heroEl);
    handleResize();

    // Dust motes particles setup
    let motes = Array.from({ length: Math.round(heroEl.clientWidth / 18) }, () => ({
      x: Math.random() * heroEl.clientWidth,
      y: Math.random() * heroEl.clientHeight,
      r: Math.random() * 1.6 + 0.3,
      v: Math.random() * 0.25 + 0.05,
      t: Math.random() * 6.28,
    }));

    const renderDust = () => {
      if (destroyed || !dustCtx) return;
      const w = heroEl.clientWidth;
      const h = heroEl.clientHeight;
      dustCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dustCtx.clearRect(0, 0, w, h);

      for (const m of motes) {
        m.y -= m.v;
        m.x += Math.sin((m.t += 0.01)) * 0.2;
        if (m.y < -5) {
          m.y = h + 5;
          m.x = Math.random() * w;
        }
        dustCtx.globalAlpha = (0.25 + Math.sin(m.t * 2) * 0.2) * (m.x > w * 0.45 ? 1 : 0.35);
        dustCtx.fillStyle = '#f3dcc0';
        dustCtx.beginPath();
        dustCtx.arc(m.x, m.y, m.r, 0, 6.29);
        dustCtx.fill();
      }
      dustFrameId = requestAnimationFrame(renderDust);
    };
    dustFrameId = requestAnimationFrame(renderDust);

    // Velvet Curtain Canvas Simulation
    const drawCurtainCloth = (now: number) => {
      if (!curtainCtx) return;
      const Ww = heroEl.clientWidth;
      const Hh = heroEl.clientHeight;
      if (!Ww || !Hh) return;

      const mode = curtainModeRef.current;
      const cState = curtainStateRef.current;
      if (mode !== cState.mode) {
        cState.mode = mode;
        cState.t0 = now;
      }
      const T = now - cState.t0;
      const PW = Ww * 0.51;
      const G = PW * GATHER;
      const tugPx = Ww * 0.018;
      let tug = 0;
      if (mode === 'tug') tug = 1 - Math.exp(-9 * T) * Math.cos(11 * T);
      else if (mode === 'open') tug = 1 - ss(0, 0.35, T);

      curtainCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      curtainCtx.clearRect(0, 0, Ww, Hh);

      for (let side = 0; side < 2; side++) {
        const X = cState.X[side];
        for (let k = 0; k <= CK; k++) {
          const yr = k / CK;
          const row = k * (CN + 1);
          for (let j = 0; j <= CN; j++) {
            const u = j / CN;
            const rest = u * PW;
            const fin = u * G;
            const f =
              mode === 'open'
                ? eio3(Math.min(1, Math.max(0, (T - 0.02 - ((1 - u) * 0.34 + yr * yr * 0.2)) / 1.15)))
                : mode === 'opened'
                ? 1
                : 0;
            let x = rest + (fin - rest) * f;
            if (mode !== 'opened') {
              x += tug * tugPx * Math.pow(u, 3) * (1 - 0.45 * yr);
              const sp =
                mode === 'open'
                  ? Math.min(
                      1,
                      Math.abs(
                        eio3(
                          Math.min(
                            1,
                            Math.max(
                              0,
                              (T + 0.03 - 0.02 - (1 - u) * 0.34 - yr * yr * 0.2) / 1.15,
                            ),
                          ),
                        ) - f,
                      ) * 28,
                    )
                  : 0;
              x -= sp * Math.sin(yr * 5.2 + u * 4 - T * 7) * 7 * yr * u;
              if (mode === 'open' && T > 0.5)
                x -= Math.exp(-2.6 * (T - 0.5)) * Math.sin(T * 7 + u * 2) * 11 * yr * yr * u;
              if (mode === 'idle' || mode === 'tug')
                x += Math.sin(now * 1.5 + u * 2) * 1.1 * yr * u;
            }
            X[row + j] = x;
          }
          for (let j = CN - 1; j >= 0; j--)
            if (X[row + j] > X[row + j + 1] - 1.1) X[row + j] = X[row + j + 1] - 1.1;
          for (let j = 1; j <= CN; j++)
            if (X[row + j] < X[row + j - 1] + 0.4) X[row + j] = X[row + j - 1] + 0.4;
        }

        curtainCtx.save();
        if (side) {
          curtainCtx.translate(Ww, 0);
          curtainCtx.scale(-1, 1);
        }
        for (let j = 0; j < CN; j++) {
          const u = (j + 0.5) / CN;
          const colP = CBASE[j];
          for (let k = 0; k < CK; k++) {
            const a = k * (CN + 1) + j;
            const b = (k + 1) * (CN + 1) + j;
            const y0 = (k / CK) * Hh;
            const y1 = ((k + 1) / CK) * Hh;
            const wPleat = (X[a + 1] - X[a] + X[b + 1] - X[b]) / 2;
            const ratio = Math.min(1.4, wPleat / (PW / CN));
            const squeeze = Math.max(0, 1 - ratio);
            const dk =
              1 -
              squeeze * 0.55 * (0.4 + 0.6 * (j % 3 === 0 ? 1 : 0)) -
              Math.pow(u, 8) * 0.5 * (1 - squeeze * 0.3);
            const lift = squeeze * 0.1 * (j & 1);
            curtainCtx.fillStyle = `rgb(${
              Math.min(255, colP[0] * dk * (1 + lift) + 4) | 0
            },${Math.min(255, colP[1] * dk * (1 + lift) + 1) | 0},${
              Math.min(255, colP[2] * dk * (1 + lift) + 2) | 0
            })`;
            curtainCtx.beginPath();
            curtainCtx.moveTo(X[a] - 0.5, y0);
            curtainCtx.lineTo(X[a + 1] + 0.5, y0);
            curtainCtx.lineTo(X[b + 1] + 0.5, y1 + 0.5);
            curtainCtx.lineTo(X[b] - 0.5, y1 + 0.5);
            curtainCtx.closePath();
            curtainCtx.fill();
          }
          const a = CK * (CN + 1) + j;
          const a2 = (CK - 1) * (CN + 1) + j;
          curtainCtx.fillStyle = j & 1 ? 'rgba(201,163,107,.62)' : 'rgba(122,90,44,.62)';
          const hy = Hh - 15;
          const hx0 = X[a2] + (X[a] - X[a2]) * (1 - 15 / (Hh / CK));
          const hx1 = X[a2 + 1] + (X[a + 1] - X[a2 + 1]) * (1 - 15 / (Hh / CK));
          curtainCtx.beginPath();
          curtainCtx.moveTo(hx0 - 0.5, hy);
          curtainCtx.lineTo(hx1 + 0.5, hy);
          curtainCtx.lineTo(X[a + 1] + 0.5, Hh);
          curtainCtx.lineTo(X[a] - 0.5, Hh);
          curtainCtx.closePath();
          curtainCtx.fill();
        }
        curtainCtx.restore();
      }

      curtainCtx.globalCompositeOperation = 'source-atop';
      const vg = curtainCtx.createLinearGradient(0, 0, 0, Hh);
      vg.addColorStop(0, 'rgba(0,0,0,.62)');
      vg.addColorStop(0.2, 'rgba(0,0,0,0)');
      vg.addColorStop(0.72, 'rgba(0,0,0,0)');
      vg.addColorStop(1, 'rgba(0,0,0,.72)');
      curtainCtx.fillStyle = vg;
      curtainCtx.fillRect(0, 0, Ww, Hh);
      curtainCtx.globalCompositeOperation = 'source-over';
    };

    // Main animation tick loop
    let lastTime = performance.now();
    const renderLoop = (nowMs: number) => {
      if (destroyed) return;
      const dt = Math.min(0.05, (nowMs - lastTime) / 1000);
      const now = nowMs / 1000;
      lastTime = nowMs;

      // Update state machine
      const state = animStateRef.current;
      state.t += dt;
      const t = state.t;
      const W = heroEl.clientWidth;
      const H = heroEl.clientHeight;
      const groundY = H * 0.93;

      switch (state.name) {
        case 'enter':
          state.man.amp += (1 - state.man.amp) * Math.min(1, dt * 5);
          state.man.x += state.man.v * dt;
          if (state.man.x >= W / 2 - 85) goRef.current?.('turnIn');
          break;

        case 'turnIn': {
          const u = cl(t / 0.95);
          state.man.yaw = Math.PI / 2 + (Math.PI / 2) * eio(u);
          state.man.amp = 1 - ss(0, 0.85, u);
          state.man.x = state.man.x0 + (W / 2 - state.man.x0) * (1 - (1 - u) * (1 - u));
          if (u >= 1) {
            state.man.amp = 0;
            goRef.current?.('reach');
          }
          break;
        }

        case 'reach':
          state.man.armWeight = eio(cl(t / 0.65));
          state.man.lean = lerp(0, 4 * R2, eio(cl(t / 0.65)));
          if (t > 0.85) goRef.current?.('tug');
          break;

        case 'tug':
          state.man.armWeight = 1;
          state.man.lean = lerp(4 * R2, 1 * R2, eio(cl(t / 0.35)));
          if (t > 0.42) goRef.current?.('pull');
          break;

        case 'pull':
          state.man.armPull = eob(cl(t / 0.55), 1.15);
          state.man.lean = lerp(1 * R2, -4 * R2, eio(cl(t / 0.55)));
          if (t > 0.8) goRef.current?.('release');
          break;

        case 'release':
          state.man.armWeight = 1 - eio(cl(t / 0.7));
          state.man.armPull = 1 - eio(cl(t / 0.7));
          state.man.lean = lerp(-4 * R2, 0, eio(cl(t / 0.7)));
          if (t > 1.05) goRef.current?.('turnOut');
          break;

        case 'turnOut': {
          const u = cl(t / 0.9);
          state.man.yaw = Math.PI - (Math.PI / 2) * eio(u);
          state.man.amp = 0.6 * ss(0, 0.35, u);
          state.man.x += state.man.v * state.man.amp * Math.sin(state.man.yaw) * dt;
          if (u >= 1) goRef.current?.('walk2');
          break;
        }

        case 'walk2': {
          const stop = (state.target ? state.target.x : W * 0.75) - 38;
          if (state.man.x >= stop) state.man.ampT = 0;
          state.man.amp +=
            (state.man.ampT - state.man.amp) * Math.min(1, dt * (state.man.ampT ? 5 : 4));
          if (state.man.amp > 0.03) state.man.x += state.man.v * state.man.amp * dt;
          if (state.man.ampT === 0 && state.man.amp < 0.03) {
            state.man.amp = 0;
            goRef.current?.('pause');
          }
          break;
        }

        case 'pause':
          if (t > 0.45) goRef.current?.('dissolve');
          break;

        case 'dissolve':
          if (state.a0 === undefined) state.a0 = state.man.alpha;
          state.man.alpha = state.a0 * (1 - ss(0, 0.55, t));
          if (t > 0.55 && heroEl && !heroEl.classList.contains('show-photo')) {
            heroEl.classList.add('show-photo');
          }
          if (t > 2.2) goRef.current?.('done');
          break;
      }

      // Draw Curtains
      drawCurtainCloth(now);

      // Render 3D Model
      const tState = threeRef.current;
      if (tState.renderer && tState.modelReady && tState.manGroup) {
        if (tState.mixer) {
          if (tState.actWalk) tState.actWalk.setEffectiveWeight(state.man.amp);
          if (tState.actIdle) tState.actIdle.setEffectiveWeight(1 - state.man.amp);
          tState.mixer.update(dt);
        }

        tState.manGroup.position.x = state.man.x;
        tState.manGroup.position.y = H - groundY;
        tState.manGroup.position.z = 0;
        tState.manGroup.rotation.y = state.man.yaw;

        tState.manGroup.visible = state.man.vis && state.man.alpha > 0.01;
        if (tState.manGroup.visible) {
          tState.manGroup.traverse((o: any) => {
            if (o.isMesh && o.material) {
              o.material.transparent = true;
              o.material.opacity = state.man.alpha;
            }
          });
        }

        // Procedural Arm Gesture Overlays for Curtain Interaction
        const B = tState.bones;
        if (B.LeftArm && B.RightArm && B.Spine1) {
          B.Spine1.rotation.x = state.man.lean;
          if (state.man.armWeight > 0.01) {
            const w = state.man.armWeight;
            B.LeftArm.rotation.x = lerp(B.LeftArm.rotation.x, -1.15, w);
            B.RightArm.rotation.x = lerp(B.RightArm.rotation.x, -1.15, w);
            B.LeftArm.rotation.z = lerp(B.LeftArm.rotation.z, 0.45, w);
            B.RightArm.rotation.z = lerp(B.RightArm.rotation.z, -0.45, w);
            if (B.LeftForeArm && B.RightForeArm) {
              B.LeftForeArm.rotation.x = lerp(B.LeftForeArm.rotation.x, -0.65, w);
              B.RightForeArm.rotation.x = lerp(B.RightForeArm.rotation.x, -0.65, w);
            }
          }
          if (state.man.armPull > 0.01) {
            const p = state.man.armPull;
            B.LeftArm.rotation.z = lerp(B.LeftArm.rotation.z, 1.35, p);
            B.RightArm.rotation.z = lerp(B.RightArm.rotation.z, -1.35, p);
            B.LeftArm.rotation.x = lerp(B.LeftArm.rotation.x, -0.4, p);
            B.RightArm.rotation.x = lerp(B.RightArm.rotation.x, -0.4, p);
          }
        }

        tState.renderer.render(scene, camera);
      }

      // Render Glowing Embers onto 2D Canvas
      if (emberCtx) {
        emberCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        emberCtx.clearRect(0, 0, W, H);
        if (state.particles.length) {
          let alive = 0;
          for (const q of state.particles) {
            q.t += dt;
            const u = (q.t - q.delay) / q.dur;
            if (u < 0 || u >= 1) {
              if (u < 1) alive++;
              continue;
            }
            alive++;
            const e = eio(u),
              m = 1 - e;
            emberCtx.globalAlpha = u < 0.75 ? 1 : 1 - (u - 0.75) / 0.25;
            emberCtx.fillStyle = q.c;
            emberCtx.fillRect(
              m * m * q.sx + 2 * m * e * q.cx + e * e * q.tx,
              m * m * q.sy + 2 * m * e * q.cy + e * e * q.ty,
              q.s,
              q.s,
            );
          }
          emberCtx.globalAlpha = 1;
          if (!alive) state.particles = [];
        }
      }

      animFrameId = requestAnimationFrame(renderLoop);
    };

    animFrameId = requestAnimationFrame(renderLoop);

    // Scroll parallax effect: hero drifts away as user scrolls into Scene Two
    const handleScroll = () => {
      const p = Math.min(1, window.scrollY / window.innerHeight);
      if (leftColRef.current) {
        leftColRef.current.style.transform = `translateY(${-p * 90}px)`;
        leftColRef.current.style.opacity = String(1 - p * 1.15);
      }
      if (rightColRef.current) {
        rightColRef.current.style.transform = `translateY(${p * 70}px) scale(${1 + p * 0.06})`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      destroyed = true;
      cancelAnimationFrame(animFrameId);
      cancelAnimationFrame(dustFrameId);
      ro.disconnect();
      window.removeEventListener('scroll', handleScroll);
      renderer.dispose();
    };
  }, []);

  // Handle smooth scroll to Scene 02 (IdentityScene / About)
  const scrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('about') || document.getElementById('identity');
    if (target) {
      window.dispatchEvent(
        new CustomEvent('lenis-scroll-to', {
          detail: { target: '#about' },
        }),
      );
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="theatrical-hero relative w-full h-[100svh] min-h-[620px] overflow-hidden bg-[#08090B] text-[#F0EAE3]"
      style={{
        background:
          'radial-gradient(120% 80% at 70% 110%, #1d1016 0, transparent 60%), radial-gradient(80% 60% at 20% 0, #14101a 0, transparent 70%), #08090B',
      }}
    >
      <style>{`
        .theatrical-hero .stage{position:absolute;inset:0;z-index:5;pointer-events:none}
        .theatrical-hero .cspot{position:absolute;inset:0;background:radial-gradient(28% 46% at 50% 78%,rgba(255,227,194,0.18),transparent 70%);transition:opacity .8s}
        .theatrical-hero .stage.open .cspot,
        .theatrical-hero .stage.opened .cspot{opacity:0}

        .theatrical-hero .beam{position:absolute;top:-12%;right:4%;width:min(70vw,900px);height:125%;z-index:1;pointer-events:none;
          clip-path:polygon(44% 0,56% 0,100% 100%,0 100%);background:linear-gradient(#ffe8cc30,#ffe8cc08 70%,transparent);filter:blur(10px);opacity:0;transition:opacity 1.5s}
        .theatrical-hero.show-arch .beam{opacity:1}

        .theatrical-hero .ghost{position:absolute;top:2%;left:-6%;right:-10%;text-align:center;color:transparent;-webkit-text-stroke:1px rgba(214,185,154,0.22);font-weight:900;user-select:none;pointer-events:none;opacity:0;transform:translateY(30px);transition:opacity 1.6s .3s,transform 1.6s .3s}
        .theatrical-hero.show-arch .ghost{opacity:1;transform:none}

        .theatrical-hero .arch{position:absolute;left:12%;right:8%;bottom:0;height:74%;border-radius:999px 999px 0 0;
          background:linear-gradient(165deg,#9b3d60,#5A1832 55%,#22070f);box-shadow:inset 0 0 0 1px rgba(255,255,255,0.1),inset 0 -80px 120px rgba(0,0,0,0.6);
          clip-path:inset(100% 0 0 0);transition:clip-path 1.5s cubic-bezier(.7,0,.2,1)}
        .theatrical-hero.show-arch .arch{clip-path:inset(0)}

        .theatrical-hero .dots{position:absolute;left:0;width:46%;bottom:6%;height:52%;background:radial-gradient(rgba(240,234,227,0.3) 1.1px,transparent 1.7px) 0 0/10px 10px;
          mask-image:linear-gradient(90deg,#000,transparent);-webkit-mask-image:linear-gradient(90deg,#000,transparent);opacity:0;transition:opacity 1.4s .6s}
        .theatrical-hero.show-arch .dots{opacity:1}

        .theatrical-hero .left .rv{opacity:0;transform:translateY(22px);transition:opacity .9s,transform .9s cubic-bezier(.2,.8,.2,1);transition-delay:var(--d,0s)}
        .theatrical-hero.show-text .left .rv{opacity:1;transform:none}

        .theatrical-hero h1 .ch{display:inline-block;transform:translateY(110%) rotate(6deg);transition:transform 1s cubic-bezier(.16,.9,.2,1);transition-delay:calc(var(--i)*55ms + .1s)}
        .theatrical-hero.show-text h1 .ch{transform:none}
        .theatrical-hero h1 .ch:hover{color:#D6B99A}
        .theatrical-hero h1 .kr .ch{color:transparent;-webkit-text-stroke:2px #F0EAE3}
        .theatrical-hero h1 .kr .ch:hover{color:#873653;-webkit-text-stroke-color:#873653}

        .theatrical-hero .valance{position:absolute;top:0;left:0;right:0;height:14vh;z-index:7;pointer-events:none;
          background:linear-gradient(rgba(0,0,0,0.8),transparent 70%),repeating-linear-gradient(90deg,#3a0b1c 0,#8e2a4c 2.2%,#3a0b1c 4.4%);
          transition:transform 1.6s cubic-bezier(.7,0,.2,1)}
        .theatrical-hero.show-text .valance{transform:translateY(-102%)}

        .theatrical-hero .flash{position:absolute;inset:0;z-index:6;pointer-events:none;opacity:0;background:radial-gradient(60% 70% at 50% 55%,#ffe9d0,rgba(255,214,168,0) 70%);mix-blend-mode:screen}
        .theatrical-hero.flashing .flash{animation:stageFlash 1.6s ease-out}
        @keyframes stageFlash{0%{opacity:0}14%{opacity:.5}100%{opacity:0}}

        .theatrical-hero .frame{position:absolute;inset:0;--x:50%;--y:30%;--r:0px;touch-action:manipulation}
        .theatrical-hero .frame img{position:absolute;left:50%;bottom:0;height:100%;width:auto;max-width:106%;transform:translateX(-50%);object-fit:contain;object-position:bottom;pointer-events:none;user-select:none}
        .theatrical-hero #edge{opacity:0;transition:opacity 1.1s .15s;filter:drop-shadow(0 6px 18px rgba(42,10,22,0.6))}
        .theatrical-hero.show-photo #edge{opacity:1}
        .theatrical-hero #bw{opacity:0;filter:grayscale(1) contrast(1.12) brightness(1.7) blur(14px);transition:opacity 1.1s,filter 1.4s cubic-bezier(.2,.8,.2,1)}
        .theatrical-hero.show-photo #bw{opacity:1;filter:grayscale(1) contrast(1.12) brightness(.85) blur(0)}
        .theatrical-hero.show-photo .frame.lit #bw{filter:grayscale(1) contrast(1.05) brightness(1.08) blur(0);transition:filter .6s}
        .theatrical-hero #col{opacity:0;transition:opacity .4s;-webkit-mask-image:radial-gradient(circle at var(--x) var(--y),#000 calc(var(--r)*.72),transparent var(--r));
          mask-image:radial-gradient(circle at var(--x) var(--y),#000 calc(var(--r)*.72),transparent var(--r));filter:saturate(1.12)}
        .theatrical-hero.done #col{opacity:1}
      `}</style>

      {/* Stage Floor */}
      <div className="absolute left-0 right-0 bottom-0 h-[24%] bg-gradient-to-t from-[#1b1015] via-[#130c10] to-transparent z-[1] pointer-events-none">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            background:
              'repeating-linear-gradient(90deg, #ffffff08 0 1px, transparent 1px 7vw)',
            transform: 'perspective(300px) rotateX(55deg)',
            transformOrigin: 'bottom',
          }}
        />
      </div>

      {/* Theatrical Overhead Beam Light */}
      <div className="beam" />

      {/* Dust Canvas */}
      <canvas
        ref={dustCanvasRef}
        className="absolute inset-0 w-full h-full z-[3] pointer-events-none"
      />

      {/* Film Grain */}
      <div
        className="fixed inset-[-50%] z-[30] pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main Stage Grid Container */}
      <div className="relative z-[2] h-full grid grid-cols-1 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] px-6 sm:px-12 md:px-20 lg:px-28 gap-8 items-center">
        {/* Left Column: Marquee Headline, Identity, CTAs */}
        <div ref={leftColRef} className="left flex flex-col justify-center pt-10 md:pt-0">
          <p className="rv flex items-center gap-2.5 text-[#D6B99A] font-mono text-sm tracking-wider uppercase mb-3" style={{ '--d': '.1s' } as React.CSSProperties}>
            <span className="w-8 h-[1px] bg-[#D6B99A]" />
            Portfolio, 2026
          </p>

          <h1
            aria-label="Nithin KR"
            className="m-0 font-extrabold uppercase leading-[0.8] tracking-[-0.01em] select-none text-[clamp(68px,11.5vw,190px)]"
            style={{ fontFamily: "'Big Shoulders Display', Impact, sans-serif" }}
          >
            <span className="block overflow-hidden pb-1 whitespace-nowrap">
              {['N', 'I', 'T', 'H', 'I', 'N'].map((char, i) => (
                <span
                  key={i}
                  className="ch"
                  style={{ '--i': i } as React.CSSProperties}
                >
                  {char}
                </span>
              ))}
            </span>
            <span className="block overflow-hidden pb-1 whitespace-nowrap kr">
              {['K', 'R', '.'].map((char, i) => (
                <span
                  key={i}
                  className="ch"
                  style={{ '--i': i + 6 } as React.CSSProperties}
                >
                  {char}
                </span>
              ))}
            </span>
          </h1>

          <p
            className="rv mt-6 text-[clamp(16px,1.4vw,20px)] text-[#F0EAE3] max-w-[32ch] font-normal leading-relaxed"
            style={{ fontFamily: "'Manrope', system-ui, sans-serif", '--d': '.75s' } as React.CSSProperties}
          >
            Full-stack developer &amp; security researcher. I build web systems{' '}
            <em
              className="text-[#D6B99A] not-italic"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '1.25em' }}
            >
              and then try to break them.
            </em>
          </p>

          <dl className="rv flex flex-wrap gap-x-8 gap-y-3 mt-6 text-sm" style={{ '--d': '.95s' } as React.CSSProperties}>
            <div>
              <dt className="text-xs text-[#969099] uppercase tracking-wider font-mono">Focus</dt>
              <dd className="m-0 mt-0.5 font-semibold text-[#F0EAE3] whitespace-nowrap">
                Full-stack × Cybersecurity
              </dd>
            </div>
            <div>
              <dt className="text-xs text-[#969099] uppercase tracking-wider font-mono">Stack</dt>
              <dd className="m-0 mt-0.5 font-semibold text-[#F0EAE3] whitespace-nowrap">
                React · Python · Node · Go
              </dd>
            </div>
            <div>
              <dt className="text-xs text-[#969099] uppercase tracking-wider font-mono">Based in</dt>
              <dd className="m-0 mt-0.5 font-semibold text-[#F0EAE3] whitespace-nowrap">
                Karnataka, India
              </dd>
            </div>
          </dl>

          <div className="rv flex flex-wrap gap-3.5 mt-8 items-center" style={{ '--d': '1.15s' } as React.CSSProperties}>
            <a
              href="#about"
              onClick={scrollToAbout}
              className="inline-flex items-center gap-2 min-h-[48px] px-6 rounded-full bg-[#5A1832] border border-[#873653] text-[#F0EAE3] font-semibold text-sm transition-all duration-300 hover:bg-[#873653] hover:shadow-[0_10px_35px_rgba(135,54,83,0.45)] hover:-translate-y-0.5"
            >
              See the work <span aria-hidden="true">↓</span>
            </a>
            <button
              type="button"
              onClick={() => {
                if (onResumeClick) {
                  onResumeClick();
                } else {
                  window.open('/NithinKR.pdf', '_blank', 'noopener,noreferrer');
                }
              }}
              className="inline-flex items-center gap-2 min-h-[48px] px-6 rounded-full bg-[#151116] border border-[#D6B99A]/30 text-[#F0EAE3] font-semibold text-sm transition-all duration-300 hover:border-[#D6B99A] hover:-translate-y-0.5"
            >
              Resume
            </button>
          </div>
        </div>

        {/* Right Column: Ghost KR, Arch, Transparent Cutout with Bloom */}
        <div
          ref={rightColRef}
          className="right relative self-end h-[88%] flex items-end justify-center pointer-events-none"
        >
          {/* Giant Ghost Outline Typography */}
          <div
            className="ghost"
            style={{
              fontFamily: "'Big Shoulders Display', Impact, sans-serif",
              fontSize: 'clamp(180px, 32vw, 480px)',
              lineHeight: 0.8,
            }}
          >
            KR
          </div>

          {/* Velvet Wine Arch */}
          <div className="arch">
            <div className="absolute inset-[14px] rounded-t-inherit border border-[#F0EAE3]/15 border-b-0" />
          </div>

          {/* Half-Tone Dot Matrix */}
          <div className="dots" />

          {/* Interactive Portrait Cutout Frame */}
          <div
            ref={frameRef}
            className="frame pointer-events-auto cursor-pointer"
            onPointerMove={handlePointerMove}
            onPointerEnter={() => setBloomLight(true)}
            onPointerLeave={() => setBloomLight(false)}
          >
            {/* Edge Shadow Layer */}
            <img
              id="edge"
              src="/nithin-cutout.png"
              alt="Nithin KR"
            />

            {/* Sharp Grayscale Photo */}
            <img
              id="bw"
              src="/nithin-cutout.png"
              alt="Nithin KR"
            />

            {/* Color Bloom Layer — Unmasked on Hover */}
            <img
              id="col"
              src="/nithin-cutout.png"
              alt="Nithin KR"
            />
          </div>
        </div>
      </div>

      {/* Stage Curtains Canvas */}
      <div ref={stageRef} className="stage">
        <canvas ref={curtainCanvasRef} className="curtaincv absolute inset-0 w-full h-full" />
        <div className="cspot" />
      </div>

      {/* WebGL 3D Canvas for Stagehand Human Model (man.glb) */}
      <canvas
        ref={stageCanvasRef}
        className="absolute inset-0 w-full h-full z-[6] pointer-events-none"
      />

      {/* Dedicated Glowing Ember Particle Blend Canvas */}
      <canvas
        ref={emberCanvasRef}
        className="absolute inset-0 w-full h-full z-[6] pointer-events-none"
      />

      {/* Stage Flash Overlay */}
      <div className="flash" />

      {/* Scalloped Top Valance */}
      <div className="valance" />

      {/* Skip / Replay Intro Controls */}
      {isIntroRunning ? (
        <button
          type="button"
          onClick={finalState}
          className="ctrl absolute right-5 bottom-5 z-[25] inline-flex items-center min-h-[42px] px-5 rounded-full border border-[#D6B99A]/30 bg-[#08090B]/85 text-[#F0EAE3] text-xs font-mono tracking-wider backdrop-blur-md transition-all duration-300 hover:border-[#D6B99A] hover:-translate-y-0.5"
        >
          Skip intro
        </button>
      ) : (
        <button
          type="button"
          onClick={replayIntro}
          className="ctrl absolute right-5 bottom-5 z-[25] inline-flex items-center min-h-[42px] px-5 rounded-full border border-[#D6B99A]/30 bg-[#08090B]/85 text-[#F0EAE3] text-xs font-mono tracking-wider backdrop-blur-md transition-all duration-300 hover:border-[#D6B99A] hover:-translate-y-0.5"
        >
          ↺ Replay intro
        </button>
      )}
    </section>
  );
};
