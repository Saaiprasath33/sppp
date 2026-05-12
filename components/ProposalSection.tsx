"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import ParticleBackground from "./ParticleBackground";
import NoButton from "./NoButton";

interface ProposalSectionProps {
  onYes: () => void;
}

export default function ProposalSection({ onYes }: ProposalSectionProps) {
  const ref        = useRef<HTMLElement>(null);
  const inView     = useInView(ref, { once: true, margin: "-100px" });
  const containerRef = useRef<HTMLElement | null>(null);

  // Use a callback ref so NoButton can access the container
  const setRef = (el: HTMLElement | null) => {
    (ref as React.MutableRefObject<HTMLElement | null>).current = el;
    containerRef.current = el;
  };

  return (
    <section
      ref={setRef as unknown as React.RefObject<HTMLElement>}
      className="section-snap bg-proposal"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "60px 20px",
        position: "relative",
        overflow: "hidden",
        gap: "0",
        minHeight: "100vh",
      }}
    >
      <ParticleBackground count={50} />

      {/* Deep glow background layers */}
      {["rgba(200,75,142,0.12)", "rgba(255,51,102,0.08)", "rgba(183,110,121,0.1)"].map((c, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width:  `${500 + i * 200}px`,
            height: `${500 + i * 200}px`,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${c}, transparent)`,
            top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            filter: "blur(60px)",
            pointerEvents: "none", zIndex: 0,
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, delay: i }}
        />
      ))}

      {/* Floating roses */}
      {["🌹","🌹","🌸","🌺"].map((rose, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            fontSize: `${Math.random() * 16 + 20}px`,
            left:  `${[8, 88, 15, 82][i]}%`,
            top:   `${[25, 30, 65, 60][i]}%`,
            zIndex: 1, pointerEvents: "none",
          }}
          animate={{
            y:      [0, -20, 0],
            rotate: [0, 15, -15, 0],
            opacity:[0.5, 0.9, 0.5],
          }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.6 }}
        >
          {rose}
        </motion.div>
      ))}

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 680 }}>

        {/* Cinematic zoom-in body text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.p
            className="font-playfair"
            style={{
              fontSize: "clamp(1.1rem, 2.8vw, 1.55rem)",
              color: "rgba(255,220,235,0.8)",
              lineHeight: 1.85,
              marginBottom: "2.5rem",
              fontStyle: "italic",
            }}
            animate={inView ? { opacity: [0, 1] } : {}}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            {inView && (
              <TypeAnimation
                sequence={[
                  600,
                  "From the moment you entered my life,\neverything became more beautiful... ❤️",
                ]}
                speed={65}
                cursor={false}
                style={{ whiteSpace: "pre-line" }}
              />
            )}
          </motion.p>
        </motion.div>

        {/* Divider with sparkles */}
        <motion.div
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "2.5rem" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <div className="section-divider" style={{ flex: 1, margin: 0 }} />
          <motion.span
            style={{ fontSize: "1.5rem" }}
            animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💍
          </motion.span>
          <div className="section-divider" style={{ flex: 1, margin: 0 }} />
        </motion.div>

        {/* THE BIG QUESTION */}
        <motion.h2
          className="font-playfair gradient-text glow-text-rose"
          style={{ fontSize: "clamp(2.8rem, 8vw, 5.5rem)", lineHeight: 1.1, marginBottom: "3rem" }}
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 2.5, duration: 1, type: "spring", bounce: 0.35 }}
        >
          Rithiga, Will You Marry Me? 💍
        </motion.h2>

        {/* Heartbeat pulse ring around question */}
        <motion.div
          style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: 350, height: 120,
            borderRadius: 60,
            border: "2px solid rgba(255,51,102,0.5)",
            pointerEvents: "none",
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />

        {/* Buttons container – position:relative so NO button can teleport inside */}
        <motion.div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(16px, 4vw, 40px)",
            flexWrap: "wrap",
            minHeight: 300,
            width: "100%",
            marginTop: "2rem",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 3, duration: 0.8 }}
        >
          {/* YES button */}
          <motion.button
            className="btn-yes"
            onClick={onYes}
            whileHover={{ scale: 1.12, boxShadow: "0 0 60px rgba(255,51,102,0.9), 0 0 120px rgba(255,51,102,0.4)" }}
            whileTap={{ scale: 0.96 }}
            style={{ position: "relative", zIndex: 5, fontSize: "clamp(1.1rem, 3vw, 1.5rem)" }}
          >
            YES 💖
            {/* Pulse ring */}
            <motion.div
              style={{
                position: "absolute", inset: -6,
                borderRadius: 50,
                border: "2px solid rgba(255,51,102,0.5)",
                pointerEvents: "none",
              }}
              animate={{ scale: [1, 1.3], opacity: [0.6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          </motion.button>

          {/* Runaway NO button – teleports inside this container */}
          <NoButton containerRef={containerRef} />
        </motion.div>
      </div>

      {/* Sparkle stickers */}
      {["✨","💫","⭐","🌟"].map((s, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            fontSize: "1.5rem",
            left:  `${[20, 75, 10, 85][i]}%`,
            top:   `${[15, 12, 80, 78][i]}%`,
            zIndex: 1, pointerEvents: "none",
          }}
          animate={{ rotate: [0, 360], scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
        >
          {s}
        </motion.div>
      ))}
    </section>
  );
}
