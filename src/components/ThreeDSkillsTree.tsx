import { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { portfolioData } from '../data/portfolio';
import { CategoryTab } from './Skills';

interface FlatSkill {
  name: string;
  logo: string;
  link: string;
  color: string;
  category: string;
}

interface ThreeDSkillsTreeProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  categories: string[];
}

/**
 * Branch positions extracted directly from Skeletal_Tree_FREE.obj vertex data.
 *
 * Method: parsed all 3499 vertices, filtered Y > 3.5 (no ground/root),
 * divided into 12-height × 12-angle sectors, picked the outermost vertex
 * per sector (max radial distance from trunk center X=0, Z=0),
 * then filtered out duplicates within 1.5 units of each other.
 *
 * OBJ coordinate space:
 *   X: -4.03 → 19.38  (tree extends heavily to the RIGHT)
 *   Y: -0.06 → 18.88  (height)
 *   Z: -4.68 → 7.04   (depth)
 *
 * After THREE.js transform (sf ≈ 0.396, targetHeight=7.5):
 *   World X: -4.64 → +4.64
 *   World Y: -3.50 → +4.00
 *   Camera sits at Z=14, looking at (0, 0.5, 0)
 */
const BRANCH_POSITIONS: [number, number, number][] = [
  // Low branches (Y 3.5–5)
  [-2.210,  4.389, -1.311],
  [-2.691,  4.393,  1.920],
  [-4.032,  4.404,  0.530],
  [ 4.278,  4.690, -0.810],
  [ 8.556,  4.990, -1.619],
  // Mid-low (Y 5–8)
  [-2.703,  6.353,  1.593],
  [-3.762,  6.499,  0.484],
  [ 7.331,  6.692, -3.913],
  [ 6.996,  6.881,  1.179],
  [13.993,  7.181,  2.358],
  // intermediate along long right branch
  [ 4.655,  7.091,  1.179],
  [ 9.310,  7.955,  0.097],
  [18.620,  8.255,  0.194],
  [-2.915,  8.359,  0.432],
  // Mid (Y 8–10)
  [ 7.973,  9.050,  0.649],
  [-0.310,  9.244,  0.031],
  [15.946,  9.350,  1.298],
  [ 4.434,  9.804,  2.656],
  [-1.727, 10.045,  0.770],
  [ 0.735, 10.764, -0.130],
  // Mid-high (Y 10–12)
  [ 8.563, 10.890,  0.651],
  [ 4.864, 11.015,  5.973],
  [17.127, 11.190,  1.301],
  [ 0.448, 11.259,  1.617],
  [ 5.807, 11.781,  7.036],
  [ 7.125, 11.904, -0.010],
  // High (Y 12–14)
  [14.250, 12.204, -0.020],
  [ 6.335, 12.882,  0.253],
  [ 7.536, 13.053, -0.353],
  [12.670, 13.182,  0.506],
  [ 1.415, 13.313,  0.859],
  [15.072, 13.353, -0.705],
  // Upper canopy (Y 14–16)
  [ 6.478, 14.572,  0.187],
  [ 3.532, 14.719,  2.082],
  [12.955, 14.872,  0.375],
  [ 0.206, 15.095, -0.104],
  // Near-top (Y 16–18)
  [-1.513, 16.326,  0.924],
  [-0.560, 16.408, -1.150],
  [ 3.452, 17.091,  2.866],
  [ 4.972, 17.108,  1.001],
  // Treetop (Y 18+)
  [ 5.692, 18.426,  0.990],
  [-1.424, 18.878,  1.088],
  // Extra intermediates on the very long right branch (X~19)
  [ 6.000,  8.500, -0.500],
  [10.000,  8.700, -0.200],
  [14.000,  8.900,  0.100],
  // Extra back-branch intermediates
  [ 2.000, 11.000,  4.000],
  [ 8.500, 11.300,  3.500],
  [ 2.500, 10.200,  1.500],
  [ 5.000,  9.600,  3.000],
];

// ─── Fruit shape: round badge with a tiny stem nub ───────────────────────────
function createFruitGeometry(radius: number): THREE.SphereGeometry {
  return new THREE.SphereGeometry(radius, 10, 10);
}

export default function ThreeDSkillsTree({ activeCategory, setActiveCategory, categories }: ThreeDSkillsTreeProps): JSX.Element {
  const containerRef  = useRef<HTMLDivElement>(null);
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const overlayRef    = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Track zoom target for UI buttons
  const zoomTargetRef = useRef(14);

  // Track active category in a ref so the Three.js loop can read it 
  // without needing to restart the entire scene when it changes.
  const activeCategoryRef = useRef(activeCategory);
  useEffect(() => {
    activeCategoryRef.current = activeCategory;
  }, [activeCategory]);

  // Flatten skills once
  const flatSkills = useMemo<FlatSkill[]>(() => {
    const list: FlatSkill[] = [];
    portfolioData.skills.forEach((cat) =>
      cat.items.forEach((item) =>
        list.push({ ...item, category: cat.category })
      )
    );
    return list;
  }, []);

  // ── Three.js Initialization ────────────────────────────────────────────
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    let isCancelled = false;

    // Capture refs to local variables for cleanup
    const canvas = canvasRef.current;
    const container = containerRef.current;

    let width  = container.clientWidth;
    let height = container.clientHeight;

    // ── Scene ──────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060610, 0.018);

    // ── Camera ─────────────────────────────────────────────────────────────
    // The tree in world space spans X:-4.6→+4.6, Y:-3.5→+4.0
    // We pull back enough to see the whole tree centered
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 200);
    camera.position.set(0, 0.5, 14);
    camera.lookAt(0, 0.5, 0);

    // ── Renderer ───────────────────────────────────────────────────────────
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas:           canvas,
        antialias:        true,
        alpha:            true,
        powerPreference:  'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.shadowMap.enabled = true;
    } catch (e) {
      console.error('Failed to create WebGLRenderer:', e);
      setError('WebGL is not supported or is blocked by your browser.');
      setLoading(false);
      return;
    }

    // ── Lighting ───────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    const dlTop = new THREE.DirectionalLight(0x9f7aea, 2.5);   // purple top
    dlTop.position.set(2, 10, 5);
    scene.add(dlTop);

    const dlFill = new THREE.DirectionalLight(0xec4899, 1.2);  // pink fill
    dlFill.position.set(-5, -2, -3);
    scene.add(dlFill);

    const ptCenter = new THREE.PointLight(0x06b6d4, 4, 25);   // cyan glow
    ptCenter.position.set(0, 2, 4);
    scene.add(ptCenter);

    const ptBase = new THREE.PointLight(0xf59e0b, 2, 15);      // warm root glow
    ptBase.position.set(0, -3, 2);
    scene.add(ptBase);

    // ── Tree group (everything rotates together) ───────────────────────────
    const treeGroup = new THREE.Group();
    scene.add(treeGroup);

    // Pivot point: shift tree so trunk base is at group center
    // After transforms, trunk base is at world Y ≈ -3.5
    // We offset treeGroup.position.y so tree sits centered in view
    treeGroup.position.set(0, 0, 0);

    type SkillDummy = {
      dummy: THREE.Object3D;
      stemLine: THREE.Line;
      fruit: THREE.Mesh;
      data: FlatSkill;
    };
    const skillDummies: SkillDummy[] = [];

    // ── Load OBJ ───────────────────────────────────────────────────────────
    const loader = new OBJLoader();
    loader.load(
      '/3d/Skeletal_Tree_FREE.obj',
      (obj) => {
        if (isCancelled) {
          obj.traverse((c) => {
            if ((c as THREE.Mesh).isMesh) {
              (c as THREE.Mesh).geometry?.dispose();
              if (Array.isArray((c as THREE.Mesh).material)) {
                ((c as THREE.Mesh).material as THREE.Material[]).forEach((m) => m.dispose());
              } else {
                ((c as THREE.Mesh).material as THREE.Material)?.dispose();
              }
            }
          });
          return;
        }

        // Compute bounding box
        const box = new THREE.Box3().setFromObject(obj);
        const sz  = box.getSize(new THREE.Vector3());
        const ctr = box.getCenter(new THREE.Vector3());

        // Scale so total height = 7.5 units
        const targetH = 7.5;
        const sf = targetH / sz.y;

        // Apply scale
        obj.scale.setScalar(sf);

        // Center X/Z on trunk, put bottom at Y = -3.5
        // trunk base ≈ Y_min of mesh = box.min.y
        obj.position.set(
          -ctr.x * sf,
          -box.min.y * sf - 3.5,
          -ctr.z * sf,
        );

        // Bark material: dark indigo with metallic sheen
        const barkMat = new THREE.MeshStandardMaterial({
          color:       0x0f0b2a,
          roughness:   0.65,
          metalness:   0.55,
          flatShading: true,
        });
        obj.traverse((c) => {
          if ((c as THREE.Mesh).isMesh) (c as THREE.Mesh).material = barkMat;
        });

        treeGroup.add(obj);

        // ── Attach skill fruits to REAL branch-tip positions ─────────────

        flatSkills.forEach((skill, i) => {
          const tipIdx = i % BRANCH_POSITIONS.length;
          const raw    = BRANCH_POSITIONS[tipIdx];

          // Convert OBJ mesh coords → THREE world coords
          // (same transform as applied to obj above)
          const worldTip = new THREE.Vector3(
            raw[0] * sf + obj.position.x,
            raw[1] * sf + obj.position.y,
            raw[2] * sf + obj.position.z,
          );

          // Stem length in world space (fruit hangs below tip)
          const stemLen = 0.18 + Math.random() * 0.12;

          // The hanging point (fruit center)
          const hangPos = worldTip.clone();
          hangPos.y -= stemLen;

          // ── Fruit sphere ──────────────────────────────────────────────
          const fruitRadius = 0.055 + Math.random() * 0.025;
          const fruitGeo = createFruitGeometry(fruitRadius);
          const fruitColor = new THREE.Color(skill.color);
          const fruitMat = new THREE.MeshStandardMaterial({
            color:     fruitColor,
            roughness: 0.3,
            metalness: 0.2,
            emissive:  fruitColor,
            emissiveIntensity: 0.25,
          });
          const fruit = new THREE.Mesh(fruitGeo, fruitMat);
          fruit.position.copy(hangPos);
          treeGroup.add(fruit);

          // ── Stem line (branch tip → fruit) ────────────────────────────
          const stemPts = [worldTip.clone(), hangPos.clone()];
          const stemGeo = new THREE.BufferGeometry().setFromPoints(stemPts);
          const stemMat = new THREE.LineBasicMaterial({
            color:       fruitColor,
            transparent: true,
            opacity:     0.55,
            linewidth:   1,
          });
          const stemLine = new THREE.Line(stemGeo, stemMat);
          treeGroup.add(stemLine);

          // ── Knot sphere at branch attachment ─────────────────────────
          const knotGeo = new THREE.SphereGeometry(0.018, 5, 5);
          const knotMat = new THREE.MeshBasicMaterial({
            color:       fruitColor,
            transparent: true,
            opacity:     0.7,
          });
          const knot = new THREE.Mesh(knotGeo, knotMat);
          knot.position.copy(worldTip);
          treeGroup.add(knot);

          // ── Dummy at fruit center (for 2D projection) ─────────────────
          const dummy = new THREE.Object3D();
          dummy.position.copy(hangPos);
          treeGroup.add(dummy);

          skillDummies.push({ dummy, stemLine, fruit, data: skill });
        });

        setLoading(false);
      },
      undefined,
      (err) => {
        console.error('Tree load error:', err);
        setError('Could not load 3D tree model.');
        setLoading(false);
      }
    );

    // ── Mouse / touch rotation ─────────────────────────────────────────────
    let tgtRY = 0, tgtRX = 0;
    let curRY = 0, curRX = 0;
    let autoRotY = 0;          // cumulative auto-rotation
    let dragging = false;
    let prevX = 0, prevY = 0;

    const onMouseMove = (e: MouseEvent) => {
      if (dragging) {
        tgtRY += (e.clientX - prevX) * 0.006;
        tgtRX += (e.clientY - prevY) * 0.004;
        tgtRX  = Math.max(-0.35, Math.min(0.35, tgtRX));
        prevX  = e.clientX;
        prevY  = e.clientY;
      }
    };
    const onMouseDown = (e: MouseEvent) => {
      dragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      // Freeze auto-rotation offset at current value
      tgtRY = curRY;
    };
    const onMouseUp = () => { dragging = false; };

    // Touch support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        dragging = true;
        prevX = e.touches[0].clientX;
        prevY = e.touches[0].clientY;
        tgtRY = curRY;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (dragging && e.touches.length === 1) {
        tgtRY += (e.touches[0].clientX - prevX) * 0.006;
        tgtRX += (e.touches[0].clientY - prevY) * 0.004;
        tgtRX  = Math.max(-0.35, Math.min(0.35, tgtRX));
        prevX  = e.touches[0].clientX;
        prevY  = e.touches[0].clientY;
      }
    };
    const onTouchEnd = () => { dragging = false; };

    // ── Zoom support ───────────────────────────────────────────────────────
    let curZ = 14;

    const onWheel = (e: WheelEvent) => {
      // Prevent default scrolling when zooming the tree
      e.preventDefault();
      const newZ = zoomTargetRef.current + e.deltaY * 0.01;
      zoomTargetRef.current = Math.max(3.5, Math.min(35.0, newZ)); // Clamp zoom between 3.5 and 35.0
    };

    window.addEventListener('mousemove',  onMouseMove);
    window.addEventListener('mouseup',    onMouseUp);
    if (canvas) {
      canvas.addEventListener('mousedown', onMouseDown);
      canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    }
    if (container) {
      container.addEventListener('wheel', onWheel, { passive: false });
    }
    window.addEventListener('touchmove',  onTouchMove, { passive: true });
    window.addEventListener('touchend',   onTouchEnd);

    // ── Resize ─────────────────────────────────────────────────────────────
    const onResize = () => {
      if (!container) return;
      width  = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    // Fullscreen change listener to update state and trigger resize
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      onResize();
      setTimeout(onResize, 100);
      setTimeout(onResize, 300);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);

    // ── Render loop ────────────────────────────────────────────────────────
    const tmpV = new THREE.Vector3();
    let rafId = 0;
    let lastTime = performance.now();

    const loop = () => {
      rafId = requestAnimationFrame(loop);
      const now  = performance.now();
      const dt   = Math.min((now - lastTime) / 1000, 0.05);
      lastTime   = now;

      // Auto-rotate when not dragging
      if (!dragging) {
        autoRotY += dt * 0.18;   // ~10 deg/sec
      }

      // Smooth lerp
      curRY += (tgtRY - curRY) * 0.07;
      curRX += (tgtRX - curRX) * 0.07;
      curZ  += (zoomTargetRef.current - curZ) * 0.07;

      treeGroup.rotation.y = dragging ? curRY : autoRotY + curRY * 0.2;
      treeGroup.rotation.x = curRX;
      camera.position.z = curZ;

      // Gentle point-light pulse for atmosphere
      ptCenter.intensity = 3.5 + Math.sin(now * 0.001) * 0.8;

      // ── Project 3D positions → 2D overlay ────────────────────────────
      const overlayEl = overlayRef.current;
      if (overlayEl && skillDummies.length > 0) {
        const children = overlayEl.children;
        skillDummies.forEach(({ dummy, stemLine, fruit, data }, i) => {
          const el = children[i] as HTMLElement;
          if (!el) return;

          dummy.getWorldPosition(tmpV);
          const ndc    = tmpV.clone().project(camera);
          const behind = ndc.z > 1;

          const sx = (ndc.x *  0.5 + 0.5) * width;
          const sy = (ndc.y * -0.5 + 0.5) * height;

          const currentActiveCat = activeCategoryRef.current;
          const active = currentActiveCat === 'All' || data.category === currentActiveCat;
          let opacity  = active ? 1.0 : 0.08;
          if (behind) opacity = 0;

          // Perspective scale: closer = bigger
          const sc = Math.max(0.5, Math.min(1.1, 1.3 - ndc.z * 0.55));

          el.style.transform = `translate3d(calc(${sx}px - 50%), calc(${sy}px - 50%), 0) scale(${sc})`;
          el.style.opacity   = `${opacity}`;
          el.style.zIndex    = `${Math.round((1 - ndc.z) * 1000)}`;

          // Update stem line opacity
          if (stemLine.material) {
            (stemLine.material as THREE.LineBasicMaterial).opacity =
              behind ? 0 : active ? Math.max(0.15, 0.55 - ndc.z * 0.3) : 0.02;
          }

          // Update fruit glow intensity
          if (fruit.material) {
            const m = fruit.material as THREE.MeshStandardMaterial;
            m.emissiveIntensity = active ? (behind ? 0 : 0.3 + Math.sin(now * 0.003 + i) * 0.1) : 0.02;
          }
        });
      }

      renderer.render(scene, camera);
    };
    loop();

    // ── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      isCancelled = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove',  onMouseMove);
      window.removeEventListener('mouseup',    onMouseUp);
      window.removeEventListener('touchmove',  onTouchMove);
      window.removeEventListener('touchend',   onTouchEnd);
      window.removeEventListener('resize',     onResize);
      if (canvas) {
        canvas.removeEventListener('mousedown',  onMouseDown);
        canvas.removeEventListener('touchstart', onTouchStart);
      }
      if (container) {
        container.removeEventListener('wheel', onWheel);
      }
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh) {
          m.geometry?.dispose();
          if (Array.isArray(m.material)) m.material.forEach((mt) => mt.dispose());
          else m.material?.dispose();
        }
      });
      renderer.dispose();
    };
  }, [flatSkills]); // <-- Stable memoized array dependency, scene is created only once.

  return (
    <div
      ref={containerRef}
      className={`w-full overflow-hidden transition-[border-radius,box-shadow] duration-300 relative bg-slate-900 ${
        isFullscreen
          ? "h-screen rounded-none"
          : "h-[500px] md:h-[650px] lg:h-[70vh] min-h-[500px] max-h-[750px] rounded-3xl"
      }`}
      style={{
        background: 'radial-gradient(ellipse 80% 70% at 50% 60%, rgba(13,11,34,0.4) 0%, rgba(6,6,16,0.95) 100%)',
        border:     '1px solid rgba(139,92,246,0.15)',
        boxShadow:  '0 0 80px rgba(99,60,200,0.08), inset 0 0 60px rgba(0,0,0,0.5)',
      }}
    >
      {/* Side-only blur effect using CSS mask */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          maskImage: 'linear-gradient(to right, black 0%, transparent 15%, transparent 85%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 15%, transparent 85%, black 100%)',
        }}
      />

      {/* Subtle grid floor */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px)
          `,
          backgroundSize:  '48px 48px',
          maskImage:       'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
        }}
      />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Loading */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20"
             style={{ background: 'rgba(6,6,16,0.85)' }}>
          <div className="relative w-14 h-14 mb-5">
            <div className="absolute inset-0 rounded-full border-2 border-purple-500/30" />
            <div className="absolute inset-0 rounded-full border-2 border-t-purple-400 animate-spin" />
            <div className="absolute inset-2 rounded-full border-2 border-t-pink-400 animate-spin"
                 style={{ animationDuration: '0.7s', animationDirection: 'reverse' }} />
          </div>
          <p className="text-purple-300/70 text-sm tracking-widest uppercase font-light">
            Growing Skills Tree…
          </p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="absolute bottom-4 left-6 text-xs text-yellow-400/80 bg-black/50
                        px-3 py-1.5 rounded-lg border border-yellow-500/20 pointer-events-none">
          {error}
        </div>
      )}

      {/* Hint */}
      {/* <div className="absolute top-4 right-5 flex flex-col gap-1.5 text-xs text-slate-400/70
                      bg-white/[0.04] border border-white/[0.07] px-3 py-2 rounded-lg
                      pointer-events-none select-none z-10 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span>🖱</span>
          <span>Drag to rotate</span>
        </div>
        <div className="flex items-center gap-2">
          <span>🔍</span>
          <span>Scroll to zoom</span>
        </div>
      </div> */}

      {/* Zoom & Fullscreen Controls (Right side) */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-30">
        <button
          onClick={() => {
            if (!document.fullscreenElement) {
              containerRef.current?.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
              });
            } else {
              document.exitFullscreen();
            }
          }}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.05] border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:scale-110 active:scale-95 transition-all duration-200 backdrop-blur-md mb-2"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
          )}
        </button>

        <button
          onClick={() => {
            zoomTargetRef.current = Math.max(8, zoomTargetRef.current - 2.5);
          }}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.05] border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:scale-110 active:scale-95 transition-all duration-200 backdrop-blur-md"
          title="Zoom In"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
        <button
          onClick={() => {
            zoomTargetRef.current = Math.min(25, zoomTargetRef.current + 2.5);
          }}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.05] border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:scale-110 active:scale-95 transition-all duration-200 backdrop-blur-md"
          title="Zoom Out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
      </div>

      {/* Vertical Category Tabs (Desktop) */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
        {categories.map((category) => (
          <CategoryTab
            key={category}
            category={category}
            isActive={activeCategory === category}
            onClick={() => setActiveCategory(category)}
            layoutIdSuffix="-desktop"
          />
        ))}
      </div>

      {/* ── Skill label overlay ── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      >
        {flatSkills.map((skill, idx) => {
          const active = activeCategory === 'All' || skill.category === activeCategory;
          return (
            <a
              key={`${skill.name}-${idx}`}
              href={skill.link}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute left-0 top-0 pointer-events-auto flex flex-col items-center justify-center
                         px-2.5 py-2 rounded-xl cursor-pointer select-none
                         transition-all duration-200 hover:scale-110"
              style={{
                /* Frosted-glass card */
                background:   active
                  ? `radial-gradient(circle at 50% 30%, ${skill.color}22, rgba(10,8,25,0.88))`
                  : 'rgba(10,8,20,0.65)',
                border:       `1px solid ${active ? skill.color + '45' : 'rgba(255,255,255,0.06)'}`,
                boxShadow:    active
                  ? `0 0 12px ${skill.color}25, 0 0 28px ${skill.color}10, inset 0 1px 0 ${skill.color}18`
                  : 'none',
                backdropFilter: 'blur(10px)',
                minWidth: '48px',
              }}
            >
              {/* Skill icon */}
              <img
                src={skill.logo}
                alt={skill.name}
                className="w-5 h-5 object-contain flex-shrink-0"
                style={{
                  filter: active
                    ? `drop-shadow(0 0 5px ${skill.color}80)`
                    : 'grayscale(100%) opacity(30%)',
                }}
              />
              {/* Skill name below icon */}
              <span
                className="text-[9px] font-semibold tracking-wide leading-none mt-1.5 text-center whitespace-nowrap"
                style={{ color: active ? '#e2e8f0' : '#475569' }}
              >
                {skill.name}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}