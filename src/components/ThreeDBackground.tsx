import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { animate, remove } from 'animejs';

export default function ThreeDBackground(): JSX.Element {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const objectRef = useRef<THREE.Mesh | null>(null);
  const animateIdRef = useRef<number>(0);
  const mousePosition = useRef({ x: 0, y: 0 });
  const animatedTarget = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    // Handle Mouse Move - Only for non-touch
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(e.clientY / window.innerHeight) * 2 + 1;

      animate(animatedTarget.current, {
        rotX: mousePosition.current.y * 0.4,
        rotY: mousePosition.current.x * 0.4,
        x: mousePosition.current.x * 0.5,
        y: mousePosition.current.y * 0.5,
        duration: 200,
        easing: 'easeOutQuad',
        autoplay: true,
      });
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Initialize Scene
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.z = 8;
    camera.position.y = 1.5;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: false,
        powerPreference: "high-performance"
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      rendererRef.current = renderer;
    } catch (e) {
      console.error('Failed to initialize Three.js renderer:', e);
      return;
    }

    const currentMount = mountRef.current;
    if (currentMount) {
      currentMount.innerHTML = ''; // Ensure mount is empty
      currentMount.appendChild(renderer.domElement);
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const neonLight = new THREE.DirectionalLight(0xec4899, 1);
    neonLight.position.set(5, 5, 5);
    scene.add(neonLight);

    // Geometry - Reduced complexity for mobile
    const geometry = new THREE.TorusKnotGeometry(
      3,
      1,
      isMobile ? 80 : 150,
      isMobile ? 12 : 16
    );
    const material = new THREE.MeshPhongMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
      shininess: 100,
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    objectRef.current = torusKnot;
    scene.add(torusKnot);

    const gridHelper = new THREE.GridHelper(100, 100, 0x1e293b, 0x1e293b);
    gridHelper.position.y = -5;
    scene.add(gridHelper);

    // Resize Handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = w / h;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(w, h);
      }
    };
    window.addEventListener('resize', handleResize);

    // Pause animation when tab is hidden to save resources
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animateIdRef.current) {
          cancelAnimationFrame(animateIdRef.current);
        }
      } else {
        animateLoop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Animation Loop
    const animateLoop = () => {
      animateIdRef.current = requestAnimationFrame(animateLoop);
      if (objectRef.current && cameraRef.current) {
        objectRef.current.rotation.x += 0.00015;
        objectRef.current.rotation.y += 0.0010;
        objectRef.current.rotation.z = animatedTarget.current.rotY * 0.2;

        cameraRef.current.position.x = animatedTarget.current.x * 0.7;
        cameraRef.current.position.y = animatedTarget.current.y * 0.7 + 1.5;
        cameraRef.current.rotation.z = animatedTarget.current.x * 0.05;
      }
      renderer.render(scene, camera);
    };

    animateLoop();

    return () => {
      if (animateIdRef.current) cancelAnimationFrame(animateIdRef.current);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('mousemove', handleMouseMove);

      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }

      // Clean up Three.js resources
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      remove(animatedTarget.current);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 overflow-hidden pointer-events-none bg-[#0a0a0a]"
      style={{ zIndex: -2 }}
    />
  );
}
