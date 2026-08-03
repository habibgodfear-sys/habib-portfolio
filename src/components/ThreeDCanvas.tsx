import { useEffect, useRef } from 'react';

export default function ThreeDCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse & Physics Tracking variables
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;
    let prevMouseX = width / 2;
    let prevMouseY = height / 2;
    let mouseVelocity = 0;

    // Shockwaves on click
    interface Shockwave {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      strength: number;
      alpha: number;
    }
    const shockwaves: Shockwave[] = [];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleClick = (e: MouseEvent) => {
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 10,
        maxRadius: Math.max(width, height) * 0.45,
        strength: 25,
        alpha: 0.8,
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    // 3D Particles with physics vectors
    interface Particle3D {
      x: number;
      y: number;
      z: number; // 3D z-depth (50 to 1000)
      baseX: number;
      baseY: number;
      baseZ: number;
      vx: number;
      vy: number;
      vz: number;
      radius: number;
      color: string;
      alpha: number;
      pulseSpeed: number;
      pulseAngle: number;
    }

    const particleCount = Math.min(Math.floor(width / 12), 110);
    const particles: Particle3D[] = [];
    const colors = [
      '#38bdf8', // Cyan 400
      '#3b82f6', // Blue 500
      '#818cf8', // Indigo 400
      '#06b6d4', // Cyan 500
      '#a855f7', // Purple 500
      '#60a5fa', // Blue 400
    ];

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * width * 1.8;
      const y = (Math.random() - 0.5) * height * 1.8;
      const z = Math.random() * 850 + 80;
      particles.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        vz: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.5 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.3,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseAngle: Math.random() * Math.PI * 2,
      });
    }

    // Lusion 3D Wireframe Mesh Nodes (3D Polyhedron Ring Structure)
    interface Node3D {
      x: number;
      y: number;
      z: number;
    }
    const polyNodes: Node3D[] = [];
    const polyEdges: [number, number][] = [];
    const nodeCount = 24;

    // Create a 3D dual torus ring shape
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const r = 180;
      polyNodes.push({
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r,
        z: Math.sin(angle * 2) * 60,
      });

      // Connect adjacent nodes
      polyEdges.push([i, (i + 1) % nodeCount]);
      polyEdges.push([i, (i + 4) % nodeCount]);
    }

    let rotX = 0;
    let rotY = 0;
    let time = 0;

    const render = () => {
      time += 0.015;

      // Smooth mouse spring movement
      const dxMouse = targetMouseX - mouseX;
      const dyMouse = targetMouseY - mouseY;
      mouseX += dxMouse * 0.08;
      mouseY += dyMouse * 0.08;

      // Calculate cursor velocity
      const vxMouse = mouseX - prevMouseX;
      const vyMouse = mouseY - prevMouseY;
      mouseVelocity = Math.sqrt(vxMouse * vxMouse + vyMouse * vyMouse);
      prevMouseX = mouseX;
      prevMouseY = mouseY;

      rotY += 0.005 + (dxMouse * 0.0001);
      rotX += 0.003 + (dyMouse * 0.0001);

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const focalLength = 450;

      // 1. Render Interactive Cursor Liquid Light Aura
      const auraGradient = ctx.createRadialGradient(
        mouseX,
        mouseY,
        0,
        mouseX,
        mouseY,
        220 + mouseVelocity * 2
      );
      auraGradient.addColorStop(0, 'rgba(56, 189, 248, 0.15)');
      auraGradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.06)');
      auraGradient.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = auraGradient;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 220 + mouseVelocity * 2, 0, Math.PI * 2);
      ctx.fill();

      // 2. Process Click Shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += 12;
        sw.alpha -= 0.015;

        if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(s, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${sw.alpha * 0.5})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // 3. Project & Update 3D Particles with Physics Repulsion
      const projectedParticles: {
        x: number;
        y: number;
        z: number;
        radius: number;
        color: string;
        alpha: number;
      }[] = [];

      const angleY = (mouseX / width - 0.5) * 0.5;
      const angleX = (mouseY / height - 0.5) * 0.5;
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.pulseAngle += p.pulseSpeed;
        const radiusPulse = Math.sin(p.pulseAngle) * 0.8;

        // Base drift
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Wrap world boundaries
        if (p.x < -width) p.x = width;
        if (p.x > width) p.x = -width;
        if (p.y < -height) p.y = height;
        if (p.y > height) p.y = -height;
        if (p.z < 40) p.z = 900;
        if (p.z > 900) p.z = 40;

        // 3D perspective rotation
        let rx = p.x * cosY - p.z * sinY;
        let rz = p.z * cosY + p.x * sinY;
        let ry = p.y * cosX - rz * sinX;
        rz = rz * cosX + p.y * sinX;

        const scale = focalLength / (focalLength + rz);
        const px = rx * scale + cx;
        const py = ry * scale + cy;

        // Interactive Mouse Physics Repulsion Force
        const mdx = px - mouseX;
        const mdy = py - mouseY;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        const maxForceDist = 180 + mouseVelocity * 2;

        if (mDist < maxForceDist && mDist > 0) {
          const force = (1 - mDist / maxForceDist) * 8;
          const pushX = (mdx / mDist) * force;
          const pushY = (mdy / mDist) * force;
          p.x += pushX * 2;
          p.y += pushY * 2;
        }

        // Apply Click Shockwave force to 3D particles
        for (let s = 0; s < shockwaves.length; s++) {
          const sw = shockwaves[s];
          const sdx = px - sw.x;
          const sdy = py - sw.y;
          const sDist = Math.sqrt(sdx * sdx + sdy * sdy);
          if (Math.abs(sDist - sw.radius) < 40) {
            const shockPush = (1 - Math.abs(sDist - sw.radius) / 40) * 12;
            p.x += (sdx / (sDist || 1)) * shockPush;
            p.y += (sdy / (sDist || 1)) * shockPush;
          }
        }

        if (scale > 0 && px >= -50 && px <= width + 50 && py >= -50 && py <= height + 50) {
          projectedParticles.push({
            x: px,
            y: py,
            z: rz,
            radius: Math.max(0.8, (p.radius + radiusPulse) * scale * 1.6),
            color: p.color,
            alpha: Math.min(1, Math.max(0.15, (1 - rz / 900) * p.alpha)),
          });
        }
      }

      // Draw Constellation Lines between nearby points
      const pLen = projectedParticles.length;
      for (let i = 0; i < pLen; i++) {
        for (let j = i + 1; j < pLen; j += 2) {
          const p1 = projectedParticles[i];
          const p2 = projectedParticles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const lineAlpha = (1 - dist / 140) * 0.22 * ((p1.alpha + p2.alpha) / 2);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Render Projected 3D Particles
      for (let i = 0; i < pLen; i++) {
        const p = projectedParticles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = p.radius * 6;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      // 4. Render Rotating Lusion 3D Wireframe Polyhedron Structure in Background Center
      const polyProjected: { x: number; y: number; z: number }[] = [];
      const cosRotX = Math.cos(rotX);
      const sinRotX = Math.sin(rotX);
      const cosRotY = Math.cos(rotY);
      const sinRotY = Math.sin(rotY);

      for (let i = 0; i < polyNodes.length; i++) {
        const node = polyNodes[i];

        // 3D rotate
        let nx = node.x * cosRotY - node.z * sinRotY;
        let nz = node.z * cosRotY + node.x * sinRotY;
        let ny = node.y * cosRotX - nz * sinRotX;
        nz = nz * cosRotX + node.y * sinRotX;

        const pScale = focalLength / (focalLength + nz + 300);
        const px = nx * pScale + cx;
        const py = ny * pScale + cy;

        polyProjected.push({ x: px, y: py, z: nz });
      }

      // Draw Polyhedron Wireframe Lines
      ctx.beginPath();
      for (let i = 0; i < polyEdges.length; i++) {
        const [idxA, idxB] = polyEdges[i];
        const pA = polyProjected[idxA];
        const pB = polyProjected[idxB];

        ctx.moveTo(pA.x, pA.y);
        ctx.lineTo(pB.x, pB.y);
      }
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Draw Polyhedron Vertices
      for (let i = 0; i < polyProjected.length; i++) {
        const p = polyProjected[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.globalAlpha = 0.35;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-90"
    />
  );
}
