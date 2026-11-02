/**
 * @component MetallicSculpture
 * @description Monumental 3D Generative Sculpture with Cinematic Opening, WebGL PBR, and Procedural Fallback
 * @author      Nithin K R — https://github.com/NITHINKR06
 * @license     Attribution required — see LICENSE in project root
 */
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface MetallicSculptureProps {
  className?: string;
  isInteractive?: boolean;
  scrollProgress?: number;
}

export function MetallicSculpture({
  className = '',
  isInteractive = true,
  scrollProgress = 0,
}: MetallicSculptureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(scrollProgress);

  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Skip in jsdom/test environments where canvas getContext is not implemented
    if (typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent)) {
      return;
    }

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 650;

    let cleanupFn: (() => void) | null = null;

    // Check if WebGL context can genuinely be created
    let canUseWebGL = false;
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (gl) {
        canUseWebGL = true;
      }
    } catch {
      canUseWebGL = false;
    }

    if (canUseWebGL) {
      try {
        cleanupFn = initThreeScene(container, width, height, isInteractive, scrollProgressRef);
      } catch (err) {
        console.warn('Three.js initialization failed, switching to Canvas2D fallback:', err);
        cleanupFn = initCanvasFallback(container, width, height, isInteractive, scrollProgressRef);
      }
    } else {
      cleanupFn = initCanvasFallback(container, width, height, isInteractive, scrollProgressRef);
    }

    return () => {
      if (cleanupFn) cleanupFn();
    };
  }, [isInteractive]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full min-h-[460px] sm:min-h-[540px] lg:min-h-[640px] flex items-center justify-center pointer-events-none select-none relative z-10 ${className}`}
    />
  );
}

/**
 * High-Fidelity Three.js WebGL Scene (PBR Metallic Core, Amber Lights, Particles)
 */
function initThreeScene(
  container: HTMLDivElement,
  width: number,
  height: number,
  isInteractive: boolean,
  scrollProgressRef: React.MutableRefObject<number>
): () => void {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
  camera.position.set(0, 0, 13.5);

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  container.appendChild(renderer.domElement);

  const rootGroup = new THREE.Group();
  rootGroup.scale.setScalar(0.7);
  rootGroup.rotation.y = -Math.PI * 0.75;
  scene.add(rootGroup);

  // 1. Solid Sculptural Core (Torus Knot)
  const knotGeometry = new THREE.TorusKnotGeometry(2.3, 0.68, 220, 34, 2, 3);
  const knotMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#EAE8E1'),
    roughness: 0.22,
    metalness: 0.65,
  });
  const knotMesh = new THREE.Mesh(knotGeometry, knotMaterial);
  rootGroup.add(knotMesh);

  // 2. Outer Architectural Wireframe Cage
  const wireGeometry = new THREE.TorusKnotGeometry(2.36, 0.71, 140, 24, 2, 3);
  const wireMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color('#D4A373'),
    wireframe: true,
    transparent: true,
    opacity: 0.35,
  });
  const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);
  rootGroup.add(wireMesh);

  // 3. Inner Amber Geometric Crystal
  const coreGeometry = new THREE.IcosahedronGeometry(0.9, 1);
  const coreMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#D4A373'),
    emissive: new THREE.Color('#C88A4A'),
    emissiveIntensity: 0.45,
    roughness: 0.15,
    metalness: 0.8,
    flatShading: true,
  });
  const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
  rootGroup.add(coreMesh);

  // 4. Floating Orbital Dust Particles
  const particlesCount = 75;
  const particlePositions = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount; i++) {
    const radius = 3.6 + Math.random() * 2.2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    particlePositions[i * 3 + 2] = radius * Math.cos(phi);
  }
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const particleMaterial = new THREE.PointsMaterial({
    color: 0xd4a373,
    size: 0.05,
    transparent: true,
    opacity: 0.7,
  });
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  rootGroup.add(particles);

  // 5. Studio Direct Illumination
  const ambientLight = new THREE.AmbientLight(0x22242c, 0);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xfff5ea, 0);
  keyLight.position.set(6, 8, 9);
  scene.add(keyLight);

  const warmAmberLight = new THREE.PointLight(0xd4a373, 0, 25);
  warmAmberLight.position.set(5, -4, 5);
  scene.add(warmAmberLight);

  const coolTitaniumFill = new THREE.PointLight(0x8e929d, 0, 25);
  coolTitaniumFill.position.set(-6, 4, -4);
  scene.add(coolTitaniumFill);

  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let localScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

  const handleMouseMove = (e: MouseEvent) => {
    if (!isInteractive) return;
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = -(e.clientY / window.innerHeight) * 2 + 1;
    mouse.targetX = nx * 0.45;
    mouse.targetY = ny * 0.35;
  };

  const handleScroll = () => {
    localScrollY = window.scrollY;
  };

  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  window.addEventListener('scroll', handleScroll, { passive: true });

  const handleResize = () => {
    if (!container) return;
    const w = container.clientWidth || 800;
    const h = container.clientHeight || 650;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };
  window.addEventListener('resize', handleResize);

  let animId = 0;
  const clock = new THREE.Clock();

  const animate = () => {
    animId = requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    // Opening entrance interpolation (~1.1 seconds cubic-out)
    const introProgress = Math.min(elapsed / 1.1, 1.0);
    const easeIntro = 1 - Math.pow(1 - introProgress, 3);

    ambientLight.intensity = easeIntro * 2.2;
    keyLight.intensity = easeIntro * 3.8;
    warmAmberLight.intensity = easeIntro * 4.5;
    coolTitaniumFill.intensity = easeIntro * 2.8;

    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    // Direct scroll progress from pinned master scrub (or fallback to window scroll)
    const curProgress = scrollProgressRef.current !== undefined
      ? Math.min(Math.max(scrollProgressRef.current, 0), 1.0)
      : Math.min(Math.max(localScrollY / 1000, 0), 1.0);

    // Dynamic scale swells at midpoint (0.5), settles into bridge
    const scaleSwell = 1.0 + Math.sin(curProgress * Math.PI) * 0.45;
    const baseScale = (0.7 + easeIntro * 0.3) * scaleSwell;
    rootGroup.scale.setScalar(baseScale);

    // Camera zooms dynamically at midpoint
    const introCameraZ = (1 - easeIntro) * 4.0;
    camera.position.z = 9.5 + introCameraZ - Math.sin(curProgress * Math.PI) * 1.5;
    camera.position.x = mouse.x * 0.4;
    camera.position.y = mouse.y * 0.3;

    // Accelerated angular momentum on scroll
    const introRotY = (1 - easeIntro) * (-Math.PI * 0.75);
    rootGroup.rotation.y = elapsed * 0.22 + introRotY + mouse.x * 0.45 + curProgress * Math.PI * 3.5;
    rootGroup.rotation.x = elapsed * 0.15 + mouse.y * 0.35 + curProgress * 1.2;
    rootGroup.rotation.z = mouse.x * 0.15;

    coreMesh.rotation.y = -elapsed * 0.5;
    coreMesh.rotation.x = elapsed * 0.35;

    renderer.render(scene, camera);
  };

  animate();

  return () => {
    cancelAnimationFrame(animId);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleResize);

    if (container && renderer.domElement) {
      container.removeChild(renderer.domElement);
    }

    knotGeometry.dispose();
    knotMaterial.dispose();
    wireGeometry.dispose();
    wireMaterial.dispose();
    coreGeometry.dispose();
    coreMaterial.dispose();
    particleGeometry.dispose();
    particleMaterial.dispose();
    renderer.dispose();
  };
}

/**
 * High-Performance Canvas2D Procedural Mathematical Fallback
 * (Renders exact Torus Knot 3D geometry with perspective, wireframe ribs, inner amber core, and particles)
 */
function initCanvasFallback(
  container: HTMLDivElement,
  initialWidth: number,
  initialHeight: number,
  isInteractive: boolean,
  scrollProgressRef: React.MutableRefObject<number>
): () => void {
  const canvas = document.createElement('canvas');
  let ctx: CanvasRenderingContext2D | null = null;
  try {
    ctx = canvas.getContext('2d');
  } catch {
    ctx = null;
  }
  if (!ctx) return () => {};

  container.appendChild(canvas);

  let width = initialWidth;
  let height = initialHeight;

  const updateSize = () => {
    width = container.clientWidth || 800;
    height = container.clientHeight || 650;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  };

  updateSize();
  window.addEventListener('resize', updateSize);

  // Generate 3D Torus Knot Points (p=2, q=3)
  const segments = 240;
  const tubeRings = 12;
  const knotCurves: Array<Array<{ x: number; y: number; z: number }>> = [];

  for (let ring = 0; ring < tubeRings; ring++) {
    const angleOffset = (ring / tubeRings) * Math.PI * 2;
    const curve: Array<{ x: number; y: number; z: number }> = [];

    for (let i = 0; i <= segments; i++) {
      const u = (i / segments) * Math.PI * 4;
      const r = 2.3 + 0.68 * Math.cos(3 * u + angleOffset);
      const x = r * Math.cos(2 * u);
      const y = r * Math.sin(2 * u);
      const z = 1.1 * Math.sin(3 * u + angleOffset);
      curve.push({ x, y, z });
    }
    knotCurves.push(curve);
  }

  // Floating particles
  const particles = Array.from({ length: 65 }, () => ({
    r: 3.2 + Math.random() * 2.2,
    theta: Math.random() * Math.PI * 2,
    phi: Math.acos(Math.random() * 2 - 1),
    size: 1.0 + Math.random() * 2.0,
    speed: 0.15 + Math.random() * 0.35,
  }));

  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let localScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

  const handleMouseMove = (e: MouseEvent) => {
    if (!isInteractive) return;
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = -(e.clientY / window.innerHeight) * 2 + 1;
    mouse.targetX = nx * 0.45;
    mouse.targetY = ny * 0.35;
  };

  const handleScroll = () => {
    localScrollY = window.scrollY;
  };

  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  window.addEventListener('scroll', handleScroll, { passive: true });

  let animId = 0;
  const startTime = performance.now();

  const render = () => {
    animId = requestAnimationFrame(render);
    const elapsed = (performance.now() - startTime) / 1000;

    const introProgress = Math.min(elapsed / 1.1, 1.0);
    const easeIntro = 1 - Math.pow(1 - introProgress, 3);

    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    const curProgress = scrollProgressRef.current !== undefined
      ? Math.min(Math.max(scrollProgressRef.current, 0), 1.0)
      : Math.min(Math.max(localScrollY / 1000, 0), 1.0);

    ctx.clearRect(0, 0, width, height);

    // Center & Scale tied to scroll scrub
    const cx = width / 2;
    const cy = height / 2;
    const scaleSwell = 1.0 + Math.sin(curProgress * Math.PI) * 0.45;
    const baseScale = (Math.min(width, height) * 0.17) * (0.7 + easeIntro * 0.3) * scaleSwell;

    const rotY = elapsed * 0.22 + (1 - easeIntro) * (-Math.PI * 0.75) + mouse.x * 0.45 + curProgress * Math.PI * 3.5;
    const rotX = elapsed * 0.15 + mouse.y * 0.35 + curProgress * 1.2;

    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);

    const project = (p: { x: number; y: number; z: number }) => {
      const x1 = p.x * cosY + p.z * sinY;
      const z1 = -p.x * sinY + p.z * cosY;
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;

      const fov = 7.5;
      const factor = fov / (fov + z2);
      return {
        x: cx + x1 * baseScale * factor,
        y: cy + y2 * baseScale * factor,
        z: z2,
        factor,
      };
    };

    // Ambient Core Glow (swells at midpoint)
    const glowRadius = baseScale * (1.8 + Math.sin(curProgress * Math.PI) * 1.0) * easeIntro;
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowRadius);
    glow.addColorStop(0, 'rgba(212, 163, 115, 0.22)');
    glow.addColorStop(0.5, 'rgba(200, 138, 74, 0.08)');
    glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, glowRadius, 0, Math.PI * 2);
    ctx.fill();

    // Floating particles (expand radially with scroll)
    const particleDispersion = 1 + curProgress * 0.5;
    ctx.fillStyle = `rgba(212, 163, 115, ${0.75 * easeIntro})`;
    for (const p of particles) {
      const angle = p.theta + elapsed * p.speed;
      const px = p.r * particleDispersion * Math.sin(p.phi) * Math.cos(angle);
      const py = p.r * particleDispersion * Math.sin(p.phi) * Math.sin(angle);
      const pz = p.r * particleDispersion * Math.cos(p.phi);
      const proj = project({ x: px, y: py, z: pz });
      if (proj.factor > 0) {
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, p.size * proj.factor, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 3D Torus Knot Ribs
    for (let r = 0; r < knotCurves.length; r++) {
      const curve = knotCurves[r];
      const isMajor = r % 3 === 0;

      ctx.beginPath();
      let started = false;

      for (let i = 0; i < curve.length; i++) {
        const pt = project(curve[i]);
        if (!started) {
          ctx.moveTo(pt.x, pt.y);
          started = true;
        } else {
          ctx.lineTo(pt.x, pt.y);
        }
      }

      if (isMajor) {
        ctx.strokeStyle = `rgba(234, 232, 225, ${0.48 * easeIntro})`;
        ctx.lineWidth = 1.6;
      } else {
        ctx.strokeStyle = `rgba(212, 163, 115, ${0.30 * easeIntro})`;
        ctx.lineWidth = 0.9;
      }
      ctx.stroke();
    }

    // Inner Amber Core Crystal (Octahedron projection)
    const coreRadius = 0.85;
    const coreVertices = [
      { x: 0, y: coreRadius, z: 0 },
      { x: 0, y: -coreRadius, z: 0 },
      { x: coreRadius, y: 0, z: 0 },
      { x: -coreRadius, y: 0, z: 0 },
      { x: 0, y: 0, z: coreRadius },
      { x: 0, y: 0, z: -coreRadius },
    ];
    const coreEdges = [
      [0, 2], [0, 3], [0, 4], [0, 5],
      [1, 2], [1, 3], [1, 4], [1, 5],
      [2, 4], [4, 3], [3, 5], [5, 2],
    ];

    ctx.strokeStyle = `rgba(245, 244, 238, ${0.8 * easeIntro})`;
    ctx.lineWidth = 1.5;
    for (const [i, j] of coreEdges) {
      const p1 = project(coreVertices[i]);
      const p2 = project(coreVertices[j]);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }
  };

  render();

  return () => {
    cancelAnimationFrame(animId);
    window.removeEventListener('resize', updateSize);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('scroll', handleScroll);
    if (container && canvas.parentElement === container) {
      container.removeChild(canvas);
    }
  };
}
