/**
 * @component VandeBharatExpressCanvas
 * @description High-performance Three.js Canvas for the Vande Bharat Express Railway Scene
 * Renders the procedural Indian Railways Vande Bharat EMU trainset, steel rails, sleepers,
 * catenary electrification gantries, and volumetric headlight sweep.
 *
 * @author Nithin K R (https://github.com/NITHINKR06)
 * @license Attribution required
 */
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  createVandeBharatTrainset,
  createRailwayInfrastructure,
  TrainsetAssembly,
} from './VandeBharatBuilder';

interface VandeBharatExpressCanvasProps {
  /** Scroll progress from 0 (entry) to 1.0 (final carriage) */
  scrollProgress: number;
  /** When true, triggers acceleration departure into the distance */
  isDeparting?: boolean;
  /** Active coach index (0: locomotive, 1: driftguard, 2: haqms, 3: walrus, 4: chc-secure) */
  activeCoachIndex: number;
}

export function VandeBharatExpressCanvas({
  scrollProgress,
  isDeparting = false,
  activeCoachIndex,
}: VandeBharatExpressCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const trainAssemblyRef = useRef<TrainsetAssembly | null>(null);
  const currentPosRef = useRef({ z: -50 });
  const animFrameRef = useRef<number>(0);
  const departureSpeedRef = useRef<number>(0);

  // Position offsets for each coach alignment in front of camera
  // Train moves forward along positive Z
  const targetZForCoach = (index: number): number => {
    // Coach 0 (Loco): z = -12
    // Coach 1 (DriftGuard): z = 2.5
    // Coach 2 (HAQMS): z = 17.0
    // Coach 3 (WALRUS): z = 31.5
    // Coach 4 (CHC Secure): z = 46.0
    return -12 + index * 14.5;
  };

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 550;
    const isMobile = window.innerWidth < 768;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.background = null; // Transparent so it seamlessly blends with portfolio obsidian background

    // Atmospheric Fog
    const fog = new THREE.FogExp2(0x08090b, 0.018);
    scene.fog = fog;

    // --- Camera Setup: Low-Angle Architectural Railway View ---
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 180);
    // Positioned slightly to the side to capture both the sleek nose and panoramic carriage windows
    camera.position.set(-6.2, 2.8, 11.5);
    camera.lookAt(new THREE.Vector3(0.5, 1.9, 0));

    // --- WebGL Renderer ---
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.75));
      renderer.setSize(width, height);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.warn('Three.js could not be created:', err);
      return;
    }

    // --- Lighting Rig (Obsidian × Burgundy × Champagne) ---
    const ambientLight = new THREE.AmbientLight(0xf0eae3, 0.45);
    scene.add(ambientLight);

    const sunKeyLight = new THREE.DirectionalLight(0xd6b99a, 1.3);
    sunKeyLight.position.set(10, 20, 15);
    scene.add(sunKeyLight);

    const burgundyAccentLight = new THREE.PointLight(0x873653, 3.2, 40, 1.8);
    burgundyAccentLight.position.set(-8, 4, 2);
    scene.add(burgundyAccentLight);

    const champagneFillLight = new THREE.PointLight(0xd6b99a, 1.5, 30, 1.5);
    champagneFillLight.position.set(6, 1.5, -10);
    scene.add(champagneFillLight);

    // --- Add Railway Tracks & Infrastructure ---
    const railway = createRailwayInfrastructure();
    scene.add(railway.trackGroup);

    // --- Add Vande Bharat Express Trainset ---
    const trainset = createVandeBharatTrainset();
    trainset.root.position.set(0, 0, -50);
    scene.add(trainset.root);
    trainAssemblyRef.current = trainset;

    // --- Animation Loop ---
    let clock = new THREE.Clock();
    let prevZ = trainset.root.position.z;

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      if (trainAssemblyRef.current) {
        const root = trainAssemblyRef.current.root;

        if (isDeparting) {
          // Accelerate train out of viewport into the distance
          departureSpeedRef.current += delta * 32.0;
          root.position.z += departureSpeedRef.current * delta;

          // Camera pans slightly to watch departing train
          camera.position.x = THREE.MathUtils.lerp(camera.position.x, -8.0, 0.04);
          camera.position.y = THREE.MathUtils.lerp(camera.position.y, 4.2, 0.04);
          camera.lookAt(new THREE.Vector3(0, 2.0, root.position.z));
        } else {
          // Normal scroll-synchronized position
          const targetZ = targetZForCoach(activeCoachIndex);
          root.position.z = THREE.MathUtils.lerp(root.position.z, targetZ, 0.08);

          // Subtle idling breathing suspension
          const bobbing = Math.sin(time * 3.5) * 0.015;
          root.position.y = bobbing;

          // Subtle dynamic camera tracking
          const targetCamX = isMobile ? -5.0 : -6.2;
          camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, 0.05);
          camera.lookAt(new THREE.Vector3(0.4, 2.0, root.position.z - targetZ));
        }

        // Rotate wheels based on train movement
        const dz = root.position.z - prevZ;
        prevZ = root.position.z;
        const wheelRotSpeed = dz * 2.2;
        trainAssemblyRef.current.wheels.forEach((wheel) => {
          wheel.rotation.x += wheelRotSpeed;
        });

        // Pulsing interior holographic project beacons inside carriages
        trainAssemblyRef.current.coaches.forEach((coach, cIdx) => {
          const beacon = coach.children.find(
            (child) => (child as any).isMesh && (child as THREE.Mesh).geometry.type === 'CylinderGeometry'
          ) as THREE.Mesh | undefined;
          if (beacon && (beacon.material as THREE.MeshStandardMaterial).emissiveIntensity !== undefined) {
            const isActiveCoach = cIdx + 1 === activeCoachIndex;
            const targetIntensity = isActiveCoach ? 1.4 + Math.sin(time * 4) * 0.3 : 0.4;
            (beacon.material as THREE.MeshStandardMaterial).emissiveIntensity = THREE.MathUtils.lerp(
              (beacon.material as THREE.MeshStandardMaterial).emissiveIntensity,
              targetIntensity,
              0.1
            );
          }
        });
      }

      // Signal lights pulse
      railway.signalLights.forEach((light, lIdx) => {
        light.intensity = 1.0 + Math.sin(time * 2 + lIdx) * 0.3;
      });

      renderer.render(scene, camera);
    };

    animate();

    // --- Window Resize Handling ---
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || 550;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // --- Cleanup ---
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (renderer) {
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
      // Recursively dispose geometries and materials
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          if (mesh.geometry) mesh.geometry.dispose();
          if (mesh.material) {
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((m) => m.dispose());
            } else {
              mesh.material.dispose();
            }
          }
        }
      });
    };
  }, [isDeparting, activeCoachIndex]);

  return (
    <div
      ref={mountRef}
      className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] rounded-2xl overflow-hidden pointer-events-none select-none"
    >
      {/* Vignette Gradients */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#08090B] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#08090B] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#08090B] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#08090B] to-transparent pointer-events-none z-10" />
    </div>
  );
}
