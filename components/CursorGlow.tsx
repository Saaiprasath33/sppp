"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Component: Custom cursor dot + ring + heart trail ──────────────────────
export default function CursorGlow() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const heartCounter = useRef(0);
  const lastHeartTime = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      // Move dot immediately
      if (dotRef.current) {
        dotRef.current.style.left  = `${x - 6}px`;
        dotRef.current.style.top   = `${y - 6}px`;
      }
      // Move ring with slight lag via CSS transition
      if (ringRef.current) {
        ringRef.current.style.left = `${x - 18}px`;
        ringRef.current.style.top  = `${y - 18}px`;
      }

      // Spawn heart trail every 120ms
      const now = Date.now();
      if (now - lastHeartTime.current > 120) {
        lastHeartTime.current = now;
        const id = heartCounter.current++;
        setHearts(prev => [...prev.slice(-12), { id, x, y }]);
        setTimeout(() => {
          setHearts(prev => prev.filter(h => h.id !== id));
        }, 900);
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      {/* Cursor dot */}
      <div ref={dotRef}  className="cursor-dot"  style={{ position: "fixed", pointerEvents: "none", zIndex: 99999 }} />
      {/* Cursor ring */}
      <div ref={ringRef} className="cursor-ring" style={{ position: "fixed", pointerEvents: "none", zIndex: 99998 }} />

      {/* Heart trail particles */}
      <AnimatePresence>
        {hearts.map(h => (
          <motion.div
            key={h.id}
            className="heart-trail"
            initial={{ opacity: 0.9, scale: 1,   x: h.x - 8, y: h.y - 8 }}
            animate={{ opacity: 0,   scale: 0.3, y: h.y - 40 }}
            exit={{}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ left: 0, top: 0 }}
          >
            {["❤️","💕","💗","💖","🌸"][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}
