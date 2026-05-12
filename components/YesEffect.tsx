"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

// ── YES! effect overlay ────────────────────────────────────────────────────
// Triggered when the user presses YES 💖
export default function YesEffect({ onDone }: { onDone: () => void }) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    // ── Massive confetti burst ──
    const launch = (angle: number, origin: { x: number; y: number }) =>
      confetti({
        particleCount: 120,
        spread: 80,
        angle,
        origin,
        colors: ["#ff6b9d", "#ff3366", "#c84b8e", "#f9a8d4", "#fbbf24", "#ffffff", "#e879f9"],
        scalar: 1.2,
        gravity: 0.9,
        drift: 0.2,
      });

    // Initial burst from center
    launch(90, { x: 0.5, y: 0.6 });

    // Side bursts with delay
    setTimeout(() => {
      launch(60,  { x: 0.1, y: 0.6 });
      launch(120, { x: 0.9, y: 0.6 });
    }, 300);

    // Continuous heart rain confetti
    const interval = setInterval(() => {
      confetti({
        particleCount: 30,
        spread: 120,
        origin: { x: Math.random(), y: -0.1 },
        colors: ["#ff6b9d", "#ff3366", "#fbbf24", "#f9a8d4"],
        shapes: ["circle"],
        gravity: 0.6,
        scalar: 0.9,
      });
    }, 600);

    // More bursts over time
    const timers = [
      setTimeout(() => launch(90, { x: 0.3, y: 0.5 }), 600),
      setTimeout(() => launch(90, { x: 0.7, y: 0.5 }), 900),
      setTimeout(() => launch(70, { x: 0.2, y: 0.4 }), 1200),
      setTimeout(() => launch(110,{ x: 0.8, y: 0.4 }), 1500),
    ];

    // Stop heart rain after 8s then navigate
    setTimeout(() => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
      onDone();
    }, 5500);
  }, [onDone]);

  return (
    <AnimatePresence>
      <motion.div
        key="yes-effect"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed", inset: 0,
          zIndex: 9000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1.5rem",
          background: "radial-gradient(ellipse at center, rgba(45,0,54,0.97) 0%, rgba(10,0,16,0.98) 100%)",
          textAlign: "center",
          padding: "0 20px",
          overflow: "hidden",
        }}
      >
        {/* Flying hearts from all sides */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              fontSize: `${Math.random() * 22 + 16}px`,
              left:   `${Math.random() * 100}%`,
              bottom: "-40px",
              pointerEvents: "none",
            }}
            animate={{
              y:       -(Math.random() * 600 + 400),
              x:       (Math.random() - 0.5) * 200,
              opacity: [0, 1, 1, 0],
              rotate:  [0, Math.random() * 360],
              scale:   [0.5, 1.2, 0.8],
            }}
            transition={{
              duration: Math.random() * 3 + 2.5,
              repeat: Infinity,
              delay:  Math.random() * 2,
              ease:   "easeOut",
            }}
          >
            {["❤️","💕","💖","💗","🌸","✨","💫"][i % 7]}
          </motion.div>
        ))}

        {/* Ring sparkle */}
        <motion.div
          style={{ fontSize: "clamp(4rem, 12vw, 7rem)", position: "relative" }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}
        >
          💍
          {/* Sparkle rays */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                top: "50%", left: "50%",
                width: 3, height: 40,
                background: "linear-gradient(to top, #fbbf24, transparent)",
                transformOrigin: "bottom center",
                transform: `rotate(${i * 45}deg) translateX(-50%)`,
                borderRadius: 2,
              }}
              animate={{ scaleY: [0, 1.4, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </motion.div>

        {/* Main YES message */}
        <motion.h2
          className="font-playfair gradient-text"
          style={{ fontSize: "clamp(2rem, 6vw, 4rem)", lineHeight: 1.25 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          You Just Made Me The Happiest
          <br />Person Alive ❤️
        </motion.h2>

        <motion.p
          className="font-dancing glow-text-pink"
          style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: "#ff6b9d" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, type: "spring", bounce: 0.4 }}
        >
          Forever Starts Now 💍✨
        </motion.p>

        {/* Floating "I Love You" texts */}
        {["I Love You 💕", "Always & Forever ❤️", "You're My Everything 🌸", "My Dream Come True 💍"].map((text, i) => (
          <motion.div
            key={i}
            className="font-dancing"
            style={{
              position: "absolute",
              fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
              color: ["#ff6b9d", "#fbbf24", "#e879f9", "#f9a8d4"][i],
              left:  `${[5, 65, 10, 60][i]}%`,
              top:   `${[15, 20, 70, 75][i]}%`,
              pointerEvents: "none",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale:   [0, 1.1, 1, 0.9],
              y:       [0, -20, -40],
            }}
            transition={{
              duration: 3,
              delay:    1 + i * 0.5,
              repeat:   Infinity,
              repeatDelay: 2,
            }}
          >
            {text}
          </motion.div>
        ))}

        {/* Radial glow rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              width:  `${(i + 1) * 200}px`,
              height: `${(i + 1) * 200}px`,
              borderRadius: "50%",
              border: "2px solid rgba(255,107,157,0.3)",
              top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              pointerEvents: "none",
            }}
            animate={{ scale: [1, 2, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6 }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
