/**
 * @component DigitalWorldCanvas
 * @description Persistent 3D Digital World for Nithin K R Portfolio
 * Concept: DIGITAL WORLD × EXPERIMENTAL EDITORIAL
 *
 * Continuous Three.js environment featuring:
 * - Obsidian monolithic architectural structures
 * - Procedural kinetic polyhedral core
 * - Dual-color particle field (Signal Red + Warm Cream)
 * - Dynamic data conduits and laser guide rays
 * - Continuous camera rig transitioning seamlessly across 6 scenes
 *
 * @author Nithin K R (https://github.com/NITHINKR06)
 * @license Attribution required
 */
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { checkWebGLSupport } from '../../lib';

interface SceneWaypoints {
  pos: THREE.Vector3;
  lookAt: THREE.Vector3;
  corePos: THREE.Vector3;
  coreRotSpeed: number;
  coreScale: number;
  fogDensity: number;
  redIntensity: number;
}

// 6 Distinct spatial environments mapped to the 6 cinematic scenes
const SCENE_WAYPOINTS: SceneWaypoints[] = [
  // Scene 01: ARRIVAL (0.00 - 0.16) - Deep atmospheric reveal, monolithic corridor
  {
    pos: new THREE.Vector3(0, 4.5, 20),
    lookAt: new THREE.Vector3(0, 0.5, 0),
    corePos: new THREE.Vector3(0, 0, 0),
    coreRotSpeed: 0.008,
    coreScale: 1.0,
    fogDensity: 0.022,
    redIntensity: 1.2,
  },
  // Scene 02: IDENTITY (0.16 - 0.33) - Lateral architectural swoop, low angle
  {
    pos: new THREE.Vector3(-7, 2, 13),
    lookAt: new THREE.Vector3(1, 0, -4),
    corePos: new THREE.Vector3(2.5, 0.5, -3),
    coreRotSpeed: 0.012,
    coreScale: 1.35,
    fogDensity: 0.028,
    redIntensity: 1.6,
  },
  // Scene 03: SYSTEM (0.33 - 0.52) - Network orbit, elevated constellation view
  {
    pos: new THREE.Vector3(8, 6, 11),
    lookAt: new THREE.Vector3(-1.5, -0.5, 0),
    corePos: new THREE.Vector3(-1, 0, 0),
    coreRotSpeed: 0.02,
    coreScale: 1.6,
    fogDensity: 0.02,
    redIntensity: 2.2,
  },
  // Scene 04: JOURNEY (0.52 - 0.70) - Deep z-axis flight corridor, spatial timeline
  {
    pos: new THREE.Vector3(0, -1.2, 7),
    lookAt: new THREE.Vector3(0, -0.5, -28),
    corePos: new THREE.Vector3(0, -0.8, -12),
    coreRotSpeed: 0.01,
    coreScale: 1.1,
    fogDensity: 0.026,
    redIntensity: 1.5,
  },
  // Scene 05: PROJECTS (0.70 - 0.88) - Showcase bay, high-contrast architectural focus
  {
    pos: new THREE.Vector3(-6, 7, 15),
    lookAt: new THREE.Vector3(0, 2, -3),
    corePos: new THREE.Vector3(1, 1.5, -4),
    coreRotSpeed: 0.015,
    coreScale: 1.45,
    fogDensity: 0.024,
    redIntensity: 1.8,
  },
  // Scene 06: CONTACT (0.88 - 1.00) - Infinite minimal horizon, serene laser line
  {
    pos: new THREE.Vector3(0, 1.8, 24),
    lookAt: new THREE.Vector3(0, 0.2, 0),
    corePos: new THREE.Vector3(0, 0, 0),
    coreRotSpeed: 0.005,
    coreScale: 0.9,
    fogDensity: 0.018,
    redIntensity: 1.0,
  },
];

export function DigitalWorldCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return checkWebGLSupport();
  });

  useEffect(() => {
    if (!hasWebGL || !mountRef.current) return;

    const container = mountRef.current;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;
    const isMobile = window.innerWidth < 768;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x08090b);
    const initialFog = new THREE.FogExp2(0x08090b, 0.022);
    scene.fog = initialFog;

    // --- Camera Rig ---
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 150);
    camera.position.copy(SCENE_WAYPOINTS[0].pos);
    const currentLookAt = new THREE.Vector3().copy(SCENE_WAYPOINTS[0].lookAt);
    camera.lookAt(currentLookAt);

    // --- WebGL Renderer ---
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: false,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.8));
      renderer.setSize(width, height);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('Three.js renderer could not be created:', e);
      return;
    }

    // --- Lighting Rig ---
    const ambientLight = new THREE.AmbientLight(0xf0eae3, 0.35);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xd6b99a, 1.15);
    keyLight.position.set(12, 18, 14);
    scene.add(keyLight);

    const burgundyAccentLight = new THREE.PointLight(0x873653, 2.8, 35, 1.8);
    burgundyAccentLight.position.set(-4, 3, 6);
    scene.add(burgundyAccentLight);

    const burgundyFillLight = new THREE.PointLight(0x5a1832, 1.8, 45, 1.5);
    burgundyFillLight.position.set(6, -2, -8);
    scene.add(burgundyFillLight);

    // --- Architectural Structures: Monolithic Pillars ---
    const monolithGroup = new THREE.Group();
    const monolithMaterial = new THREE.MeshStandardMaterial({
      color: 0x0c0b0e,
      roughness: 0.28,
      metalness: 0.85,
    });
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x873653,
      transparent: true,
      opacity: 0.35,
    });

    const monolithData = [
      { x: -14, y: 0, z: -10, w: 2.4, h: 18, d: 2.4 },
      { x: 13, y: -2, z: -15, w: 2.8, h: 22, d: 2.8 },
      { x: -18, y: -4, z: -30, w: 3.5, h: 26, d: 3.5 },
      { x: 16, y: -1, z: -35, w: 3.2, h: 24, d: 3.2 },
      { x: -8, y: 4, z: -45, w: 2.0, h: 16, d: 2.0 },
      { x: 9, y: 3, z: -55, w: 2.5, h: 18, d: 2.5 },
      { x: -15, y: -6, z: 8, w: 2.2, h: 14, d: 2.2 },
      { x: 14, y: -5, z: 6, w: 2.0, h: 12, d: 2.0 },
    ];

    const monolithGeometries: THREE.BoxGeometry[] = [];
    const edgeGeometries: THREE.EdgesGeometry[] = [];

    monolithData.forEach((item) => {
      const geo = new THREE.BoxGeometry(item.w, item.h, item.d);
      monolithGeometries.push(geo);
      const mesh = new THREE.Mesh(geo, monolithMaterial);
      mesh.position.set(item.x, item.y, item.z);
      monolithGroup.add(mesh);

      const edges = new THREE.EdgesGeometry(geo);
      edgeGeometries.push(edges);
      const line = new THREE.LineSegments(edges, edgeMaterial);
      line.position.copy(mesh.position);
      monolithGroup.add(line);
    });
    scene.add(monolithGroup);

    // --- Spatial Ground Grid ---
    const gridHelper = new THREE.GridHelper(160, 80, 0x873653, 0x1f1820);
    gridHelper.position.y = -6;
    if (Array.isArray(gridHelper.material)) {
      gridHelper.material.forEach((m) => {
        m.transparent = true;
        m.opacity = 0.22;
      });
    } else {
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.22;
    }
    scene.add(gridHelper);

    // --- Procedural Central Kinetic Core ---
    const coreGroup = new THREE.Group();

    // Inner glowing geometric core
    const coreGeometry = new THREE.IcosahedronGeometry(2.2, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x08090b,
      emissive: 0x5a1832,
      emissiveIntensity: 0.55,
      roughness: 0.18,
      metalness: 0.9,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    coreGroup.add(coreMesh);

    // Outer wireframe constellation cage
    const cageGeometry = new THREE.IcosahedronGeometry(3.2, 1);
    const cageEdges = new THREE.EdgesGeometry(cageGeometry);
    const cageMaterial = new THREE.LineBasicMaterial({
      color: 0xd6b99a,
      transparent: true,
      opacity: 0.45,
    });
    const cageMesh = new THREE.LineSegments(cageEdges, cageMaterial);
    coreGroup.add(cageMesh);

    // Dual orbital gimbal rings
    const ringGeo1 = new THREE.TorusGeometry(3.9, 0.035, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x873653,
      transparent: true,
      opacity: 0.8,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    coreGroup.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(4.4, 0.025, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xd6b99a,
      transparent: true,
      opacity: 0.5,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = Math.PI / 2.8;
    coreGroup.add(ringMesh2);

    scene.add(coreGroup);

    // --- Particle System (2,400 Particles) ---
    const particleCount = isMobile ? 1200 : 2400;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    const colorBurgundy = new THREE.Color(0x873653);
    const colorChampagne = new THREE.Color(0xd6b99a);
    const colorMuted = new THREE.Color(0x443a42);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 60;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 80 - 10;

      // Color distribution: 35% burgundy, 45% champagne, 20% muted
      const r = Math.random();
      let chosenColor = colorMuted;
      if (r < 0.35) chosenColor = colorBurgundy;
      else if (r < 0.8) chosenColor = colorChampagne;

      particleColors[i * 3] = chosenColor.r;
      particleColors[i * 3 + 1] = chosenColor.g;
      particleColors[i * 3 + 2] = chosenColor.b;

      particleSpeeds[i] = 0.2 + Math.random() * 0.8;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    // Canvas-generated circular particle texture for round particles without external assets
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 32;
    particleCanvas.height = 32;
    const pctx = particleCanvas.getContext('2d')!;
    const grad = pctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.35, 'rgba(255,255,255,0.7)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    pctx.fillStyle = grad;
    pctx.fillRect(0, 0, 32, 32);
    const particleTexture = new THREE.CanvasTexture(particleCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.32 : 0.42,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // --- Burgundy Energy Conduits / Laser Horizon ---
    const conduitCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-25, -5, -40),
      new THREE.Vector3(-10, -2, -20),
      new THREE.Vector3(0, 0, -5),
      new THREE.Vector3(12, 3, 5),
      new THREE.Vector3(22, 1, 20),
    ]);
    const conduitGeo = new THREE.TubeGeometry(conduitCurve, 64, 0.06, 8, false);
    const conduitMat = new THREE.MeshBasicMaterial({
      color: 0x873653,
      transparent: true,
      opacity: 0.75,
    });
    const conduitMesh = new THREE.Mesh(conduitGeo, conduitMat);
    scene.add(conduitMesh);

    // Horizontal Laser Guide Line in Highlight Burgundy
    const laserGeo = new THREE.CylinderGeometry(0.04, 0.04, 90, 8);
    const laserMat = new THREE.MeshBasicMaterial({
      color: 0x873653,
      transparent: true,
      opacity: 0.75,
    });
    const laserMesh = new THREE.Mesh(laserGeo, laserMat);
    laserMesh.rotation.z = Math.PI / 2;
    laserMesh.position.set(0, -3.8, -10);
    scene.add(laserMesh);

    // --- Interactive State & Scroll Synchronization ---
    const targetCamPos = new THREE.Vector3().copy(SCENE_WAYPOINTS[0].pos);
    const targetLookAt = new THREE.Vector3().copy(SCENE_WAYPOINTS[0].lookAt);
    const targetCorePos = new THREE.Vector3().copy(SCENE_WAYPOINTS[0].corePos);
    let targetCoreScale = SCENE_WAYPOINTS[0].coreScale;
    let targetFogDensity = SCENE_WAYPOINTS[0].fogDensity;
    let targetRedIntensity = SCENE_WAYPOINTS[0].redIntensity;
    let currentCoreRotSpeed = SCENE_WAYPOINTS[0].coreRotSpeed;

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Compute active waypoint interpolation based on total page scroll progress (0.0 to 1.0)
    const updateScrollProgress = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;

      // Map progress to segments between the 6 waypoints
      const numSegments = SCENE_WAYPOINTS.length - 1;
      const scaledProgress = progress * numSegments;
      const index = Math.min(Math.floor(scaledProgress), numSegments - 1);
      const factor = scaledProgress - index;

      const pA = SCENE_WAYPOINTS[index];
      const pB = SCENE_WAYPOINTS[index + 1];

      // Smooth cubic ease interpolation
      const smoothFactor = factor * factor * (3 - 2 * factor);

      targetCamPos.lerpVectors(pA.pos, pB.pos, smoothFactor);
      targetLookAt.lerpVectors(pA.lookAt, pB.lookAt, smoothFactor);
      targetCorePos.lerpVectors(pA.corePos, pB.corePos, smoothFactor);
      targetCoreScale = THREE.MathUtils.lerp(pA.coreScale, pB.coreScale, smoothFactor);
      targetFogDensity = THREE.MathUtils.lerp(pA.fogDensity, pB.fogDensity, smoothFactor);
      targetRedIntensity = THREE.MathUtils.lerp(pA.redIntensity, pB.redIntensity, smoothFactor);
      currentCoreRotSpeed = THREE.MathUtils.lerp(pA.coreRotSpeed, pB.coreRotSpeed, smoothFactor);
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // --- Main Render Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Mouse Parallax Damping
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Smooth Camera Interpolation
      const offsetPos = targetCamPos.clone();
      offsetPos.x += mouse.x * 1.2;
      offsetPos.y += mouse.y * 0.8;

      camera.position.lerp(offsetPos, 0.055);
      currentLookAt.lerp(targetLookAt, 0.055);
      camera.lookAt(currentLookAt);

      // Core Transformations
      coreGroup.position.lerp(targetCorePos, 0.06);
      const currentScale = coreGroup.scale.x;
      const newScale = THREE.MathUtils.lerp(currentScale, targetCoreScale, 0.06);
      coreGroup.scale.set(newScale, newScale, newScale);

      // Core kinetic rotations
      coreMesh.rotation.x += currentCoreRotSpeed * 1.2;
      coreMesh.rotation.y += currentCoreRotSpeed * 1.5;
      cageMesh.rotation.x -= currentCoreRotSpeed * 0.7;
      cageMesh.rotation.y += currentCoreRotSpeed * 0.9;
      ringMesh1.rotation.z += currentCoreRotSpeed * 2.2;
      ringMesh2.rotation.y += currentCoreRotSpeed * 1.6;

      // Subtle breath pulse on inner core emissive
      const breath = Math.sin(elapsedTime * 2.2) * 0.15 + 0.5;
      coreMaterial.emissiveIntensity = breath * targetRedIntensity;
      burgundyAccentLight.intensity = (1.8 + breath) * targetRedIntensity;

      // Particle Drift
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        // Subtle vertical drifting
        positions[i * 3 + 1] += Math.sin(elapsedTime + i) * 0.006 * particleSpeeds[i];
        // Subtle rotational flow around z
        positions[i * 3] += Math.cos(elapsedTime * 0.5 + i * 0.2) * 0.004;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Fog interpolation
      if (scene.fog) {
        (scene.fog as THREE.FogExp2).density = THREE.MathUtils.lerp(
          (scene.fog as THREE.FogExp2).density,
          targetFogDensity,
          0.05,
        );
      }

      renderer.render(scene, camera);
    };

    render();

    // --- Cleanup on unmount ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', handleResize);

      // Dispose Geometries & Materials
      monolithGeometries.forEach((g) => g.dispose());
      edgeGeometries.forEach((e) => e.dispose());
      monolithMaterial.dispose();
      edgeMaterial.dispose();
      gridHelper.dispose();

      coreGeometry.dispose();
      coreMaterial.dispose();
      cageGeometry.dispose();
      cageEdges.dispose();
      cageMaterial.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();

      particleGeo.dispose();
      particleMat.dispose();
      particleTexture.dispose();

      conduitGeo.dispose();
      conduitMat.dispose();
      laserGeo.dispose();
      laserMat.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [hasWebGL]);

  if (!hasWebGL) {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-obsidian"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 30%, rgba(135, 54, 83, 0.16) 0%, transparent 60%),
            linear-gradient(to bottom, #08090B 0%, #0D0B0E 100%)
          `,
        }}
      >
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'linear-gradient(rgba(214, 185, 154, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(214, 185, 154, 0.08) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-obsidian"
      aria-hidden="true"
    />
  );
}
