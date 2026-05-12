"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import ParticleBackground from "./ParticleBackground";

// ── Hero / Landing section ─────────────────────────────────────────────────
export default function HeroSection({ onStart }: { onStart: () => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="section-snap bg-romantic-dark"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Animated background particles ── */}
      <ParticleBackground count={80} />

      {/* ── Glowing radial orbs ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "radial-gradient(ellipse at 30% 30%, rgba(200,75,142,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(255,107,157,0.12) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />

      {/* ── Animated floating orb decorations ── */}
      {[
        { size: 300, x: "10%", y: "20%", color: "rgba(200,75,142,0.08)", delay: 0 },
        { size: 200, x: "80%", y: "15%", color: "rgba(255,107,157,0.1)",  delay: 1 },
        { size: 250, x: "60%", y: "70%", color: "rgba(183,110,121,0.08)", delay: 2 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: orb.size, height: orb.size,
            left: orb.x, top: orb.y,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${orb.color}, transparent)`,
            filter: "blur(40px)",
            zIndex: 0,
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 5 + i, repeat: Infinity, delay: orb.delay }}
        />
      ))}

      {/* ── Star field layer ── */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          style={{
            position: "absolute",
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            borderRadius: "50%",
            background: "#fff",
            left:  `${Math.random() * 100}%`,
            top:   `${Math.random() * 100}%`,
            zIndex: 0,
          }}
          animate={{ opacity: [0.1, 1, 0.1], scale: [0.8, 1.3, 0.8] }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        />
      ))}

      {/* ── Main content ── */}
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 20px", maxWidth: 700 }}>

        {/* Floating hearts above title */}
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ fontSize: "3rem", marginBottom: "1rem" }}
        >
          ❤️
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="font-playfair gradient-text glow-text-pink"
          style={{ fontSize: "clamp(2.8rem, 8vw, 5.5rem)", lineHeight: 1.15, marginBottom: "1.2rem" }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Hey Rithiga ❤️
        </motion.h1>

        {/* Typewriter subtitle */}
        <motion.div
          className="font-dancing"
          style={{ fontSize: "clamp(1.2rem, 4vw, 2rem)", color: "rgba(255,200,220,0.85)", marginBottom: "1rem" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          <TypeAnimation
            sequence={[
              800,
              "I Made Something Special Just For You...",
              2000,
              "Something from the bottom of my heart 💕",
              2000,
              "Just press the button below & feel the magic ✨",
              2000,
            ]}
            speed={55}
            repeat={Infinity}
            style={{ display: "inline-block" }}
          />
        </motion.div>

        {/* Divider */}
        <motion.div
          className="section-divider"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          style={{ margin: "1.5rem auto" }}
        />

        {/* Romantic quote */}
        <motion.p
          className="font-inter"
          style={{ color: "rgba(255,180,200,0.6)", fontSize: "0.95rem", marginBottom: "2.5rem", letterSpacing: "0.05em" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          ✨ A journey made with love, just for you ✨
        </motion.p>

        {/* CTA Button */}
        <motion.button
          className="btn-primary"
          onClick={onStart}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.6, type: "spring", bounce: 0.4 }}
          whileHover={{ scale: 1.08, boxShadow: "0 0 40px rgba(255,107,157,0.8), 0 0 80px rgba(255,107,157,0.4)" }}
          whileTap={{ scale: 0.96 }}
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)" }}
        >
          Start the Journey 💫
        </motion.button>

        {/* Scroll hint */}
        <motion.div
          style={{ marginTop: "3rem", color: "rgba(255,255,255,0.3)", fontSize: "0.85rem" }}
          animate={{ opacity: [0.3, 0.8, 0.3], y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          ↓ scroll to explore ↓
        </motion.div>
      </div>

      {/* Floating emoji stickers */}
      {["💕", "🌸", "💫", "✨", "🥰", "🌹"].map((emoji, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            fontSize: `${Math.random() * 16 + 18}px`,
            left:  `${[8, 88, 15, 82, 5, 92][i]}%`,
            top:   `${[20, 25, 70, 65, 45, 50][i]}%`,
            zIndex: 1,
            userSelect: "none",
          }}
          animate={{
            y:       [0, -20, 0],
            rotate:  [0, 10, -10, 0],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </section>
  );
}
