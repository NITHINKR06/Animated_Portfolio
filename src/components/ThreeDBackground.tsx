import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { animate, remove } from 'animejs';

export default function ThreeDBackground(): JSX.Element {
  const mountRef = useRef<HTMLDivElement>(null);
  const objectRef = useRef<THREE.Object3D | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const mousePosition = useRef({ x: 0, y: 0 });
  const animatedTarget = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

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

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const { width, height } = dimensions;
    if (width === 0 || height === 0) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.z = 8;
    camera.position.y = 1.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    const currentMount = mountRef.current;
    if (currentMount) {
      currentMount.innerHTML = '';
      currentMount.appendChild(renderer.domElement);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const neonLight = new THREE.DirectionalLight(0xec4899, 1);
    neonLight.position.set(5, 5, 5);
    scene.add(neonLight);

    const geometry = new THREE.TorusKnotGeometry(3, 1, 150, 16);
    const material = new THREE.MeshPhongMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
      shininess: 100,
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    objectRef.current = torusKnot;
    scene.add(torusKnot);

    const gridHelper = new THREE.GridHelper(100, 100, 0x1e293b, 0x1e293b);
    gridHelper.position.y = -5;
    scene.add(gridHelper);

    const animateLoop = () => {
      requestAnimationFrame(animateLoop);
      if (objectRef.current && cameraRef.current) {
        objectRef.current.rotation.x += 0.00015;
        objectRef.current.rotation.y += 0.0010;
        objectRef.current.rotation.z = animatedTarget.current.rotY * 0.2;

        camera.position.x = animatedTarget.current.x * 0.7;
        camera.position.y = animatedTarget.current.y * 0.7 + 1.5;
        camera.rotation.z = animatedTarget.current.x * 0.05;
      }
      renderer.render(scene, camera);
    };

    animateLoop();

    return () => {
      currentMount?.removeChild(renderer.domElement);
      renderer.dispose();
      objectRef.current = null;
      cameraRef.current = null;
      remove(animatedTarget.current);
    };
  }, [dimensions]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: -2 }}
    />
  );
}


