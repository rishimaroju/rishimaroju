import { useEffect, useRef } from "react";
import * as THREE from "three";

const WireframeGlobe = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const NEON = new THREE.Color(0x14ff82);
    const CYAN = new THREE.Color(0x00ffe1);

    const group = new THREE.Group();
    scene.add(group);

    // Core wireframe globe
    const globeGeo = new THREE.IcosahedronGeometry(1.5, 3);
    const globeMat = new THREE.MeshBasicMaterial({
      color: NEON,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    group.add(globe);

    // Inner solid sphere for occlusion feel
    const innerGeo = new THREE.SphereGeometry(1.49, 48, 48);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0x050505 });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    group.add(inner);

    // ----- Computer "nodes" across the globe -----
    type Node = { pos: THREE.Vector3; mesh: THREE.Mesh; ring: THREE.Mesh };
    const nodes: Node[] = [];
    const NODE_COUNT = 22;
    const R = 1.5;

    const sphericalToCartesian = (lat: number, lon: number, r = R) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
    };

    // Real-ish data center coordinates (lat, lon)
    const cities: [number, number][] = [
      [37.77, -122.41], [40.71, -74.0], [51.5, -0.12], [48.85, 2.35],
      [52.52, 13.4], [55.75, 37.61], [35.68, 139.69], [22.32, 114.17],
      [1.35, 103.81], [-33.86, 151.2], [-23.55, -46.63], [19.07, 72.87],
      [28.61, 77.2], [25.27, 55.3], [-1.29, 36.82], [30.04, 31.23],
      [41.0, 28.97], [59.33, 18.06], [49.28, -123.12], [34.05, -118.24],
      [23.02, 72.57], [-34.6, -58.38],
    ];

    cities.slice(0, NODE_COUNT).forEach(([lat, lon]) => {
      const pos = sphericalToCartesian(lat, lon, R * 1.01);
      const dotGeo = new THREE.SphereGeometry(0.025, 8, 8);
      const dotMat = new THREE.MeshBasicMaterial({ color: NEON });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(pos);
      group.add(dot);

      const ringGeo = new THREE.RingGeometry(0.04, 0.05, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: CYAN,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      ring.lookAt(pos.clone().multiplyScalar(2));
      group.add(ring);

      nodes.push({ pos, mesh: dot, ring });
    });

    // ----- Animated connection arcs between nodes -----
    type Arc = {
      line: THREE.Line;
      curve: THREE.QuadraticBezierCurve3;
      progress: number;
      speed: number;
      packet: THREE.Mesh;
    };
    const arcs: Arc[] = [];
    const ARC_COUNT = 14;

    const buildArc = (a: THREE.Vector3, b: THREE.Vector3): Arc => {
      const mid = a.clone().add(b).multiplyScalar(0.5);
      const dist = a.distanceTo(b);
      mid.normalize().multiplyScalar(R + dist * 0.45);
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
      const points = curve.getPoints(48);
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({
        color: NEON,
        transparent: true,
        opacity: 0.25,
      });
      const line = new THREE.Line(geo, mat);
      group.add(line);

      // packet traveling along the arc
      const packetGeo = new THREE.SphereGeometry(0.035, 8, 8);
      const packetMat = new THREE.MeshBasicMaterial({ color: CYAN });
      const packet = new THREE.Mesh(packetGeo, packetMat);
      group.add(packet);

      return { line, curve, progress: Math.random(), speed: 0.0035 + Math.random() * 0.005, packet };
    };

    for (let i = 0; i < ARC_COUNT; i++) {
      const a = nodes[Math.floor(Math.random() * nodes.length)].pos;
      let b = nodes[Math.floor(Math.random() * nodes.length)].pos;
      while (b === a) b = nodes[Math.floor(Math.random() * nodes.length)].pos;
      arcs.push(buildArc(a, b));
    }

    // outer particle halo
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 400;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 2.3 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeo,
      new THREE.PointsMaterial({ color: CYAN, size: 0.025, transparent: true, opacity: 0.6 })
    );
    scene.add(particles);

    let mx = 0, my = 0;
    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 0.8;
      my = (e.clientY / window.innerHeight - 0.5) * 0.8;
    };
    window.addEventListener("mousemove", onMove);

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    let t = 0;
    const animate = () => {
      t += 0.016;
      group.rotation.y += 0.0018;
      group.rotation.x += 0.0004;
      group.rotation.y += (mx - group.rotation.y * 0.02) * 0.003;
      group.rotation.x += (my - group.rotation.x * 0.02) * 0.003;
      particles.rotation.y -= 0.0008;

      // pulse rings
      nodes.forEach((n, i) => {
        const s = 1 + Math.sin(t * 2 + i) * 0.4;
        n.ring.scale.setScalar(s);
        (n.ring.material as THREE.MeshBasicMaterial).opacity = 0.6 - (s - 0.6) * 0.4;
      });

      // animate packets along arcs
      arcs.forEach((a) => {
        a.progress += a.speed;
        if (a.progress > 1) a.progress = 0;
        const p = a.curve.getPoint(a.progress);
        a.packet.position.copy(p);
        const o = 0.2 + Math.sin(t * 3 + a.speed * 100) * 0.15;
        (a.line.material as THREE.LineBasicMaterial).opacity = o;
      });

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      globeGeo.dispose();
      globeMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      particleGeo.dispose();
      arcs.forEach((a) => {
        a.line.geometry.dispose();
        (a.line.material as THREE.Material).dispose();
        a.packet.geometry.dispose();
        (a.packet.material as THREE.Material).dispose();
      });
      nodes.forEach((n) => {
        n.mesh.geometry.dispose();
        (n.mesh.material as THREE.Material).dispose();
        n.ring.geometry.dispose();
        (n.ring.material as THREE.Material).dispose();
      });
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" />;
};

export default WireframeGlobe;
