"use client";

import { useEffect, useRef, useCallback } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const N = 10000;
const FOV = 550;
const CAMERA_Z = 600;
const REPEL_RADIUS = 100;
const REPEL_FORCE = 8;
const SAMPLE_STEP = 3;
const ALPHA_THRESHOLD = 120;
const SPHERE_SPRING = 0.02;
const TEXT_SPRING = 0.022;
const FRICTION = 0.82;
const ORBITAL_JITTER = 1.8;

// Fisher-Yates shuffle (works on Uint32Array or number[])
function shuffleIndices(arr: Uint32Array | number[]): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
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

// Word-wrap text into lines, handling words longer than maxChars
function wrapText(text: string, maxChars: number): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    if (word.length > maxChars) {
      if (line) { lines.push(line); line = ""; }
      for (let i = 0; i < word.length; i += maxChars) {
        lines.push(word.slice(i, i + maxChars));
      }
      continue;
    }
    const next = line ? line + " " + word : word;
    if (next.length <= maxChars) {
      line = next;
    } else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// Persistent offscreen canvas for text sampling (avoids per-call allocation)
let _textCanvas: HTMLCanvasElement | null = null;
let _textCtx: CanvasRenderingContext2D | null = null;

function getTextCtx(): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  if (!_textCanvas) {
    _textCanvas = document.createElement("canvas");
    _textCtx = _textCanvas.getContext("2d", { willReadFrequently: true })!;
  }
  return { canvas: _textCanvas, ctx: _textCtx! };
}

// Sample text into parallel xs/ys arrays via off-screen canvas
function sampleText(
  text: string,
  viewW: number,
  viewH: number,
): { xs: number[]; ys: number[] } | null {
  const maxChars = Math.max(8, Math.min(20, Math.floor(viewW / 42)));
  const lines = wrapText(text, maxChars);
  if (!lines.length) return null;

  const { canvas: offscreen, ctx } = getTextCtx();
  offscreen.width = viewW;
  offscreen.height = viewH;
  ctx.clearRect(0, 0, viewW, viewH);

  const longest = lines.reduce((m, l) => Math.max(m, l.length), 1);
  const lineCount = lines.length;
  const fontSize = Math.max(
    26,
    Math.min(
      122,
      Math.floor(
        Math.min(
          (viewW * 0.88) / longest * 1.6,
          (viewH * 0.6) / Math.max(1, lineCount * 0.95),
        ),
      ),
    ),
  );

  const lineHeight = fontSize * 1.18;
  const blockH = lineHeight * lineCount;
  const startY = viewH * 0.5 - blockH * 0.5 + lineHeight * 0.5;

  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `900 ${fontSize}px Arial Black, Arial, sans-serif`;

  for (let li = 0; li < lineCount; li++) {
    ctx.fillText(lines[li], viewW * 0.5, startY + li * lineHeight);
  }

  const data = ctx.getImageData(0, 0, viewW, viewH).data;
  const xs: number[] = [];
  const ys: number[] = [];

  for (let y = 0; y < viewH; y += SAMPLE_STEP) {
    for (let x = 0; x < viewW; x += SAMPLE_STEP) {
      const alpha = data[(y * viewW + x) * 4 + 3];
      if (alpha > ALPHA_THRESHOLD) {
        xs.push(x - viewW * 0.5 + (Math.random() - 0.5) * 0.4);
        ys.push(y - viewH * 0.5 + (Math.random() - 0.5) * 0.4);
      }
    }
  }
  return xs.length > 0 ? { xs, ys } : null;
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

    const dpr = Math.max(1, Math.min(2.5, window.devicePixelRatio || 1));
    const w = container.clientWidth;
    const h = container.clientHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx2d = canvas.getContext("2d");
    if (ctx2d) {
      ctx2d.setTransform(1, 0, 0, 1, 0, 0);
      ctx2d.scale(dpr, dpr);
    }

    const s = sim.current;
    const baseDim = Math.min(w, h);
    s.R = baseDim > 1200 ? baseDim * 0.28 : baseDim * 0.42;
    buildSphere(s.ox, s.oy, s.oz, s.R);

    if (s.appState === 0) {
      s.tx.set(s.ox);
      s.ty.set(s.oy);
      s.tz.set(s.oz);
    } else {
      // Re-sample text targets at new viewport size
      const currentText = inputRef.current?.value.trim();
      if (currentText) {
        const pts = sampleText(currentText, w, h);
        if (pts) {
          const len = pts.xs.length;
          const order = new Uint32Array(len);
          for (let i = 0; i < len; i++) order[i] = i;
          shuffleIndices(order);
          for (let i = 0; i < N; i++) {
            const id = order[i % len];
            s.tx[i] = pts.xs[id];
            s.ty[i] = pts.ys[id];
            s.tz[i] = 0;
          }
        }
      }
    }
  }, []);

  // Apply a text target to all particles
  const applyText = useCallback((text: string) => {
    const container = containerRef.current;
    if (!container) return;

    const w = container.clientWidth;
    const h = container.clientHeight;

    const pts = sampleText(text, w, h);
    if (!pts) return;

    const s = sim.current;
    s.appState = 1;

    const len = pts.xs.length;
    const order = new Uint32Array(len);
    for (let i = 0; i < len; i++) order[i] = i;
    shuffleIndices(order);

    for (let i = 0; i < N; i++) {
      const id = order[i % len];
      s.tx[i] = pts.xs[id];
      s.ty[i] = pts.ys[id];
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
    const ctx = canvas.getContext("2d", { desynchronized: true })!;

    let t = 0;

    function frame() {
      const s = sim.current;
      const container = containerRef.current;
      if (!container) { s.animId = requestAnimationFrame(frame); return; }

      const vw = container.clientWidth;
      const vh = container.clientHeight;
      const cx = vw * 0.5;
      const cy = vh * 0.5;

      ctx.clearRect(0, 0, vw, vh);

      const spring = s.appState === 0 ? SPHERE_SPRING : TEXT_SPRING;

      // Rotate sphere targets every frame
      if (s.appState === 0) {
        s.rotY += 0.006;
        const cosR = Math.cos(s.rotY);
        const sinR = Math.sin(s.rotY);
        for (let i = 0; i < N; i++) {
          const oxVal = s.ox[i];
          const ozVal = s.oz[i];
          s.tx[i] = oxVal * cosR - ozVal * sinR;
          s.tz[i] = oxVal * sinR + ozVal * cosR;
          s.ty[i] = s.oy[i];
        }
      }

      // Batch fillStyle for text mode (all particles same color)
      if (s.appState === 1) {
        ctx.fillStyle = "hsl(190,90%,85%)";
      }

      for (let i = 0; i < N; i++) {
        let ax = (s.tx[i] - s.px[i]) * spring;
        let ay = (s.ty[i] - s.py[i]) * spring;
        const az = (s.tz[i] - s.pz[i]) * spring;

        if (s.appState === 0) {
          const wobble = Math.sin(t * 0.03 + s.phase[i]) * ORBITAL_JITTER;
          ax += wobble * 0.01;
          ay += wobble * 0.01;
        } else {
          // Mouse repulsion in text mode
          const z = s.pz[i] + CAMERA_Z;
          const inv = FOV / z;
          const sx = s.px[i] * inv + cx;
          const sy = s.py[i] * inv + cy;
          const dx = sx - s.mouseX;
          const dy = sy - s.mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 0 && dist < REPEL_RADIUS) {
            const force = REPEL_FORCE * (1 - dist / REPEL_RADIUS) * 5;
            ax += (dx / dist) * force;
            ay += (dy / dist) * force;
          }
        }

        s.vx[i] = (s.vx[i] + ax) * FRICTION;
        s.vy[i] = (s.vy[i] + ay) * FRICTION;
        s.vz[i] = (s.vz[i] + az) * FRICTION;

        s.px[i] += s.vx[i];
        s.py[i] += s.vy[i];
        s.pz[i] += s.vz[i];

        // Perspective projection
        const z = s.pz[i] + CAMERA_Z;
        if (z <= 0) continue;
        const scale = FOV / z;
        const sx = s.px[i] * scale + cx;
        const sy = s.py[i] * scale + cy;
        const size = Math.max(0.8, scale * 1.3);

        // Per-particle rainbow in sphere mode
        if (s.appState === 0) {
          ctx.fillStyle = `hsl(${(s.hue[i] + t * 25) % 360},80%,65%)`;
        }
        ctx.fillRect(sx, sy, size, size);
      }

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
          maxLength={120}
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
