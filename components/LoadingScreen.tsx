"use client";

import { motion } from "framer-motion";

// ── Loading screen with animated heart pulse ──────────────────────────────
export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  return (
    <motion.div
      className="loading-overlay"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      onAnimationComplete={onDone}
    >
      {/* Pulsing heart SVG */}
      <motion.div
        animate={{ scale: [1, 1.35, 1, 1.2, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ filter: "drop-shadow(0 0 30px rgba(255,107,157,0.9))" }}
      >
        <svg width="90" height="90" viewBox="0 0 24 24" fill="#ff3366">
          <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
        </svg>
      </motion.div>

      {/* Loading text */}
      <motion.p
        className="font-dancing gradient-text"
        style={{ fontSize: "1.6rem" }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Preparing something magical...
      </motion.p>

      {/* Floating mini hearts */}
      {[...Array(8)].map((_, i) => (
        <motion.span
          key={i}
          style={{
            position: "absolute",
            fontSize: `${Math.random() * 14 + 10}px`,
            left:  `${Math.random() * 100}%`,
            bottom: "-10px",
          }}
          animate={{
            y: [0, -(Math.random() * 300 + 200)],
            opacity: [0, 1, 0],
            rotate: [0, Math.random() * 360],
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeOut",
          }}
        >
          {["❤️","💕","💗","🌸","✨"][i % 5]}
        </motion.span>
      ))}
    </motion.div>
  );
}
