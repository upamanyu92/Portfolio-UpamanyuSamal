"use client";
import { useRef, useEffect, useCallback } from "react";

// Lightweight sphere-only particle background (no text input, no interaction UI)
const N = 6000;
const FOV = 550;
const CAMERA_Z = 600;
const FRICTION = 0.82;

function buildSphere(ox: Float32Array, oy: Float32Array, oz: Float32Array, R: number) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    ox[i] = Math.cos(theta) * r * R;
    oy[i] = y * R;
    oz[i] = Math.sin(theta) * r * R;
  }
}

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const sim = useRef({
    rotY: 0,
    animId: 0,
    R: 200,
    px: new Float32Array(N),
    py: new Float32Array(N),
    pz: new Float32Array(N),
    vx: new Float32Array(N),
    vy: new Float32Array(N),
    vz: new Float32Array(N),
    ox: new Float32Array(N),
    oy: new Float32Array(N),
    oz: new Float32Array(N),
    hue: new Float32Array(N),
    phase: new Float32Array(N),
  });

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const w = container.clientWidth;
    const h = container.clientHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.scale(dpr, dpr); }
    const s = sim.current;
    const baseDim = Math.min(w, h);
    s.R = baseDim * 0.32;
    buildSphere(s.ox, s.oy, s.oz, s.R);
  }, []);

  const startLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { desynchronized: true })!;
    let t = 0;

    function frame() {
      const s = sim.current;
      const container = containerRef.current;
      if (!container) { s.animId = requestAnimationFrame(frame); return; }
      const vw = container.clientWidth;
      const vh = container.clientHeight;
      // Offset sphere to the right side
      const cx = vw * 0.62;
      const cy = vh * 0.5;

      ctx.clearRect(0, 0, vw, vh);

      s.rotY += 0.004;
      const cosR = Math.cos(s.rotY);
      const sinR = Math.sin(s.rotY);

      for (let i = 0; i < N; i++) {
        const oxVal = s.ox[i];
        const ozVal = s.oz[i];
        const txVal = oxVal * cosR - ozVal * sinR;
        const tzVal = oxVal * sinR + ozVal * cosR;
        const tyVal = s.oy[i];

        const wobble = Math.sin(t * 0.025 + s.phase[i]) * 1.5;
        const ax = (txVal - s.px[i]) * 0.018 + wobble * 0.008;
        const ay = (tyVal - s.py[i]) * 0.018 + wobble * 0.008;
        const az = (tzVal - s.pz[i]) * 0.018;

        s.vx[i] = (s.vx[i] + ax) * FRICTION;
        s.vy[i] = (s.vy[i] + ay) * FRICTION;
        s.vz[i] = (s.vz[i] + az) * FRICTION;
        s.px[i] += s.vx[i];
        s.py[i] += s.vy[i];
        s.pz[i] += s.vz[i];

        const z = s.pz[i] + CAMERA_Z;
        if (z <= 0) continue;
        const scale = FOV / z;
        const sx = s.px[i] * scale + cx;
        const sy = s.py[i] * scale + cy;
        const size = Math.max(0.6, scale * 1.1);

        // Subtle, lower-opacity rainbow for background feel
        const h = (s.hue[i] + t * 20) % 360;
        ctx.fillStyle = `hsla(${h},70%,65%,0.35)`;
        ctx.fillRect(sx, sy, size, size);
      }

      t++;
      s.animId = requestAnimationFrame(frame);
    }
    sim.current.animId = requestAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const s = sim.current;
    for (let i = 0; i < N; i++) {
      s.hue[i] = Math.random() * 360;
      s.phase[i] = Math.random() * Math.PI * 2;
    }
    resize();
    for (let i = 0; i < N; i++) {
      s.px[i] = s.ox[i]; s.py[i] = s.oy[i]; s.pz[i] = s.oz[i];
    }
    startLoop();
    const ro = new ResizeObserver(resize);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => { cancelAnimationFrame(s.animId); ro.disconnect(); };
  }, [resize, startLoop]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}

