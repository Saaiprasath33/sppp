"use client";

import { useEffect, useRef } from "react";

// ── Particle system: floating stars + hearts + sparkles ───────────────────
// Pure Canvas-based for performance (no heavy lib required)
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; opacity: number;
  type: "star" | "heart" | "sparkle" | "circle";
  color: string;
  life: number; maxLife: number;
  rotation: number; rotationSpeed: number;
}

const EMOJIS   = ["❤️", "💕", "🌸", "✨", "⭐", "💫"];
const COLORS   = ["#ff6b9d", "#ff3366", "#c84b8e", "#f9a8d4", "#fbbf24", "#e879f9"];

export default function ParticleBackground({ count = 60 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialise particles
    const spawn = (): Particle => ({
      x:             Math.random() * canvas.width,
      y:             Math.random() * canvas.height,
      vx:            (Math.random() - 0.5) * 0.4,
      vy:            -(Math.random() * 0.5 + 0.15),
      size:          Math.random() * 6 + 2,
      opacity:       Math.random() * 0.6 + 0.2,
      type:          (["star", "heart", "sparkle", "circle"] as const)[Math.floor(Math.random() * 4)],
      color:         COLORS[Math.floor(Math.random() * COLORS.length)],
      life:          0,
      maxLife:       Math.random() * 300 + 200,
      rotation:      Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.04,
    });

    particles.current = Array.from({ length: count }, spawn);

    const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const ir    = r * 0.4;
        ctx[i === 0 ? "moveTo" : "lineTo"](x + r * Math.cos(angle), y + r * Math.sin(angle));
        ctx.lineTo(
          x + ir * Math.cos(angle + (2 * Math.PI) / 10),
          y + ir * Math.sin(angle + (2 * Math.PI) / 10)
        );
      }
      ctx.closePath();
    };

    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      const s = size * 0.8;
      ctx.beginPath();
      ctx.moveTo(x, y + s * 0.3);
      ctx.bezierCurveTo(x,       y - s * 0.1, x - s, y - s * 0.1, x - s, y + s * 0.3);
      ctx.bezierCurveTo(x - s,   y + s * 0.7,  x,     y + s * 1.1, x,     y + s * 1.1);
      ctx.bezierCurveTo(x,       y + s * 1.1,  x + s, y + s * 0.7, x + s, y + s * 0.3);
      ctx.bezierCurveTo(x + s,   y - s * 0.1,  x,     y - s * 0.1, x,     y + s * 0.3);
      ctx.closePath();
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((p, i) => {
        p.x        += p.vx;
        p.y        += p.vy;
        p.life     += 1;
        p.rotation += p.rotationSpeed;

        const lifeRatio = p.life / p.maxLife;
        const alpha = lifeRatio < 0.1
          ? lifeRatio / 0.1
          : lifeRatio > 0.8
            ? (1 - lifeRatio) / 0.2
            : 1;

        ctx.save();
        ctx.globalAlpha = p.opacity * alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.strokeStyle = p.color;

        if (p.type === "star") {
          drawStar(ctx, 0, 0, p.size);
          ctx.fill();
        } else if (p.type === "heart") {
          drawHeart(ctx, 0, 0, p.size * 0.6);
          ctx.fill();
        } else if (p.type === "sparkle") {
          // Crosshair sparkle
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(-p.size, 0); ctx.lineTo(p.size, 0);
          ctx.moveTo(0, -p.size); ctx.lineTo(0, p.size);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(-p.size * 0.7, -p.size * 0.7); ctx.lineTo(p.size * 0.7, p.size * 0.7);
          ctx.moveTo(p.size * 0.7, -p.size * 0.7);  ctx.lineTo(-p.size * 0.7, p.size * 0.7);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        // Recycle dead particles
        if (p.life >= p.maxLife || p.y < -20 || p.x < -20 || p.x > canvas.width + 20) {
          particles.current[i] = spawn();
          particles.current[i].y = canvas.height + 10;
        }
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
