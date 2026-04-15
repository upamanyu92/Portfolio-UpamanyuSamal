"use client";

import { useEffect, useRef, useCallback } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const N = 10000;
const FOV = 550;
const CAMERA_Z = 600;
const REPEL_RADIUS = 100;
const REPEL_FORCE = 8;
const MAX_CHARS_PER_LINE = 12;
const SAMPLE_STEP = 3;
const ALPHA_THRESHOLD = 120;

// Fisher-Yates shuffle for an array of indices
function shuffleIndices(arr: Uint16Array | number[]): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
}

// Build Fibonacci sphere positions into ox/oy/oz
function buildSphere(
  ox: Float32Array,
  oy: Float32Array,
  oz: Float32Array,
  R: number,
): void {
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

// Sample text into a list of {x,y} pixel positions via off-screen canvas
function sampleText(
  text: string,
  viewW: number,
  viewH: number,
): { x: number; y: number }[] {
  const offscreen = document.createElement("canvas");

  // Split into lines
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if (current.length === 0) {
      current = word;
    } else if (current.length + 1 + word.length <= MAX_CHARS_PER_LINE) {
      current += " " + word;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current.length > 0) lines.push(current);

  const lineCount = lines.length;
  const fontSize = Math.max(
    28,
    Math.min(
      120,
      Math.floor(
        Math.min(viewW * 0.85, viewH * 0.55) /
          Math.max(1, lines.reduce((a, l) => Math.max(a, l.length), 0)) *
          1.45,
      ),
    ),
  );
  const lineHeight = fontSize * 1.25;
  const totalHeight = lineHeight * lineCount;

  offscreen.width = viewW;
  offscreen.height = viewH;
  const ctx = offscreen.getContext("2d")!;
  ctx.clearRect(0, 0, viewW, viewH);
  ctx.fillStyle = "#ffffff";
  ctx.font = `900 ${fontSize}px Arial Black, Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const startY = viewH / 2 - totalHeight / 2 + lineHeight / 2;
  for (let li = 0; li < lines.length; li++) {
    ctx.fillText(lines[li], viewW / 2, startY + li * lineHeight);
  }

  const imageData = ctx.getImageData(0, 0, viewW, viewH);
  const data = imageData.data;
  const pts: { x: number; y: number }[] = [];

  const step = SAMPLE_STEP;
  for (let y = 0; y < viewH; y += step) {
    for (let x = 0; x < viewW; x += step) {
      const alpha = data[(y * viewW + x) * 4 + 3];
      if (alpha > ALPHA_THRESHOLD) {
        pts.push({
          x: x - viewW / 2 + (Math.random() - 0.5) * 0.4,
          y: y - viewH / 2 + (Math.random() - 0.5) * 0.4,
        });
      }
    }
  }
  return pts;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ParticleText() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // All mutable simulation state lives in a single ref to avoid re-renders
  const sim = useRef({
    appState: 0 as 0 | 1,
    rotY: 0,
    mouseX: -9999,
    mouseY: -9999,
    animId: 0,
    R: 200,
    px: new Float32Array(N),
    py: new Float32Array(N),
    pz: new Float32Array(N),
    vx: new Float32Array(N),
    vy: new Float32Array(N),
    vz: new Float32Array(N),
    tx: new Float32Array(N),
    ty: new Float32Array(N),
    tz: new Float32Array(N),
    ox: new Float32Array(N),
    oy: new Float32Array(N),
    oz: new Float32Array(N),
    hue: new Float32Array(N),
    phase: new Float32Array(N),
  });

  // Resize canvas to container, rebuild sphere
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    const w = container.clientWidth;
    const h = container.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const s = sim.current;
    const baseDim = Math.min(w, h);
    s.R = baseDim > 1200 ? baseDim * 0.28 : baseDim * 0.42;
    buildSphere(s.ox, s.oy, s.oz, s.R);

    // Place particles on sphere immediately if in sphere mode
    if (s.appState === 0) {
      s.tx.set(s.ox);
      s.ty.set(s.oy);
      s.tz.set(s.oz);
    }
  }, []);

  // Apply a text target to all particles
  const applyText = useCallback((text: string) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    const pts = sampleText(text, w, h);
    if (pts.length === 0) return;

    const s = sim.current;
    s.appState = 1;

    // Shuffle indices so particle-to-point mapping looks organic
    const indices = new Array(pts.length).fill(0).map((_, i) => i);
    shuffleIndices(indices);

    for (let i = 0; i < N; i++) {
      const pt = pts[indices[i % pts.length]];
      s.tx[i] = pt.x;
      s.ty[i] = pt.y;
      s.tz[i] = 0;
    }
  }, []);

  // Reset to sphere
  const resetToSphere = useCallback(() => {
    const s = sim.current;
    s.appState = 0;
    s.tx.set(s.ox);
    s.ty.set(s.oy);
    s.tz.set(s.oz);
  }, []);

  // Main animation loop
  const startLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let t = 0;

    function frame() {
      const s = sim.current;
      const dpr = window.devicePixelRatio || 1;
      const W = canvas!.width;
      const H = canvas!.height;
      const cx = W / 2;
      const cy = H / 2;

      // Clear
      ctx.clearRect(0, 0, W, H);

      const sp = s.appState === 0 ? 0.02 : 0.022;
      const friction = 0.82;

      // Rotate sphere targets every frame
      if (s.appState === 0) {
        s.rotY += 0.006;
        const cosR = Math.cos(s.rotY);
        const sinR = Math.sin(s.rotY);
        for (let i = 0; i < N; i++) {
          const ox = s.ox[i];
          const oz = s.oz[i];
          s.tx[i] = ox * cosR - oz * sinR;
          s.tz[i] = ox * sinR + oz * cosR;
          s.ty[i] = s.oy[i];
        }
      }

      // Mouse repulsion (text mode only)
      const mx = (s.mouseX - canvas!.offsetLeft) * dpr;
      const my = (s.mouseY - canvas!.offsetTop) * dpr;

      ctx.save();
      for (let i = 0; i < N; i++) {
        // Spring attract to target
        let ax = (s.tx[i] - s.px[i]) * sp;
        let ay = (s.ty[i] - s.py[i]) * sp;
        let az = (s.tz[i] - s.pz[i]) * sp;

        // Orbital wobble in sphere mode
        if (s.appState === 0) {
          const wobble = Math.sin(t * 0.03 + s.phase[i]) * 1.8;
          ax += wobble * 0.01;
          ay += wobble * 0.01;
        }

        // Mouse repulsion in text mode
        if (s.appState === 1) {
          const px2d = (s.px[i] * FOV) / (s.pz[i] + CAMERA_Z) + cx;
          const py2d = (s.py[i] * FOV) / (s.pz[i] + CAMERA_Z) + cy;
          const dx = px2d - mx;
          const dy = py2d - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < REPEL_RADIUS && dist > 0) {
            const force = REPEL_FORCE * (1 - dist / REPEL_RADIUS) * 5;
            ax += (dx / dist) * force;
            ay += (dy / dist) * force;
          }
        }

        s.vx[i] = (s.vx[i] + ax) * friction;
        s.vy[i] = (s.vy[i] + ay) * friction;
        s.vz[i] = (s.vz[i] + az) * friction;

        s.px[i] += s.vx[i];
        s.py[i] += s.vy[i];
        s.pz[i] += s.vz[i];

        // Perspective projection
        const z = s.pz[i] + CAMERA_Z;
        if (z <= 0) continue;
        const scale = FOV / z;
        const sx = s.px[i] * scale + cx;
        const sy = s.py[i] * scale + cy;

        // Colour
        let h: number, sl: number, l: number;
        if (s.appState === 0) {
          h = (s.hue[i] + t * 25) % 360;
          sl = 80;
          l = 65;
        } else {
          h = 190;
          sl = 90;
          l = 85;
        }

        // Size by depth
        const radius = Math.max(0.5, scale * 1.2);
        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${h},${sl}%,${l}%)`;
        ctx.fill();
      }
      ctx.restore();

      t++;
      s.animId = requestAnimationFrame(frame);
    }

    sim.current.animId = requestAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const s = sim.current;

    // Initialise per-particle data
    for (let i = 0; i < N; i++) {
      s.hue[i] = Math.random() * 360;
      s.phase[i] = Math.random() * Math.PI * 2;
    }

    resize();

    // Place particles at sphere position to start
    for (let i = 0; i < N; i++) {
      s.px[i] = s.ox[i];
      s.py[i] = s.oy[i];
      s.pz[i] = s.oz[i];
      s.tx[i] = s.ox[i];
      s.ty[i] = s.oy[i];
      s.tz[i] = s.oz[i];
    }

    startLoop();

    const ro = new ResizeObserver(resize);
    if (containerRef.current) ro.observe(containerRef.current);

    return () => {
      cancelAnimationFrame(s.animId);
      ro.disconnect();
    };
  }, [resize, startLoop]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    sim.current.mouseX = e.clientX - rect.left;
    sim.current.mouseY = e.clientY - rect.top;
  }, []);

  const handleMouseLeave = useCallback(() => {
    sim.current.mouseX = -9999;
    sim.current.mouseY = -9999;
  }, []);

  const handleDoubleClick = useCallback(() => {
    resetToSphere();
    if (inputRef.current) inputRef.current.value = "";
  }, [resetToSphere]);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value.trim();
      if (val.length === 0) {
        resetToSphere();
      } else {
        applyText(val);
      }
    },
    [applyText, resetToSphere],
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col"
      style={{ height: "clamp(380px, 60vh, 680px)" }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onDoubleClick={handleDoubleClick}
      />

      {/* Input overlay */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-full max-w-sm px-4">
        <input
          ref={inputRef}
          type="text"
          maxLength={64}
          placeholder="Type something…"
          onChange={handleInput}
          className="w-full rounded-full bg-slate-950/80 border border-cyan-500/40 text-cyan-300 placeholder-slate-500 text-sm font-medium text-center px-5 py-3 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 backdrop-blur-sm transition-all"
        />
      </div>

      {/* Hint overlay (top-right) */}
      <div className="absolute top-3 right-4 z-10 text-[10px] text-slate-600 select-none pointer-events-none space-y-0.5 text-right">
        <div>Hover over text to repel particles</div>
        <div>Double-click to reset sphere</div>
      </div>
    </div>
  );
}
