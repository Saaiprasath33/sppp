"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ── Memory polaroid gallery ────────────────────────────────────────────────
// Add your own images to /public/images/ and update MEMORIES array
const MEMORIES = [
  { image: "/images/rithiga1.jpg", label: "You Look Breathtaking", caption: "Every time I see you, my heart skips a beat... ❤️", tilt: -4,  color: "#ff6b9d" },
  { image: "/images/rithiga2.jpg", label: "Elegant & Graceful",   caption: "You are the most beautiful person I know ✨",    tilt: 5,  color: "#ff3366" },
  { image: "/images/rithiga1.jpg", label: "Our First Date",       caption: "The day my life changed forever...", tilt: -3,  color: "#c84b8e" },
  { image: "/images/rithiga2.jpg", label: "Beach Day",             caption: "Dancing with you in the waves 🌊", tilt: 6,  color: "#b76e79" },
  { image: "/images/rithiga1.jpg", label: "Late Night Drive",      caption: "Just you, me, and the stars ✨",   tilt: -5,  color: "#ff6b9d" },
  { image: "/images/rithiga2.jpg", label: "Our Secret Spot",       caption: "Where our love grows every day 🌸", tilt: 3,  color: "#ff3366" },
];


function PolaroidCard({
  mem,
  index,
}: {
  mem: typeof MEMORIES[0];
  index: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="polaroid"
      initial={{ opacity: 0, y: 80, rotate: mem.tilt * 2, scale: 0.85 }}
      animate={inView ? { opacity: 1, y: 0, rotate: mem.tilt, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      whileHover={{
        scale: 1.1,
        rotate: 0,
        zIndex: 20,
        boxShadow: `0 24px 60px rgba(0,0,0,0.5), 0 0 40px ${mem.color}66`,
      }}
      style={{
        width: "clamp(140px, 22vw, 190px)",
        cursor: "pointer",
        position: "relative",
        transformOrigin: "center bottom",
      }}
    >
      {/* Photo area */}
      <div
        style={{
          width: "100%",
          paddingBottom: "100%",
          position: "relative",
          background: `linear-gradient(135deg, ${mem.color}22, ${mem.color}44)`,
          overflow: "hidden",
          borderRadius: 2,
        }}
      >
        <div
          style={{
            position: "absolute", inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {/* Render image if exists, otherwise giant emoji */}
          {mem.image ? (
            <motion.img
              src={mem.image}
              alt={mem.label}
              style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.2 }}
            />
          ) : (
            <>
              <motion.div
                style={{ fontSize: "clamp(2.5rem, 8vw, 4rem)" }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
              >
                {(mem as any).emoji}
              </motion.div>

              <span
                style={{
                  fontSize: "0.65rem",
                  color: mem.color,
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  textAlign: "center",
                  padding: "0 8px",
                  zIndex: 1,
                  background: "rgba(255,255,255,0.7)",
                  borderRadius: "4px",
                }}
              >
                {mem.label}
              </span>
            </>
          )}
        </div>

        {/* Heart particle on hover – always visible subtle sparkle */}
        <motion.div
          style={{ position: "absolute", top: 4, right: 4, fontSize: "0.8rem" }}
          animate={{ opacity: [0.4, 1, 0.4], rotate: [0, 20, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
        >
          ✨
        </motion.div>

        {/* Glowing border overlay */}
        <motion.div
          style={{
            position: "absolute", inset: 0,
            border: `2px solid ${mem.color}`,
            borderRadius: 2,
            opacity: 0,
          }}
          whileHover={{ opacity: 0.8 }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Polaroid caption */}
      <div
        style={{
          paddingTop: 10,
          textAlign: "center",
          fontFamily: "Dancing Script, cursive",
          fontSize: "clamp(0.75rem, 2vw, 0.9rem)",
          color: "#333",
          lineHeight: 1.3,
        }}
      >
        {mem.caption}
      </div>

      {/* Tape strip decoration */}
      <div
        style={{
          position: "absolute",
          top: -10,
          left: "50%",
          transform: "translateX(-50%)",
          width: 44,
          height: 18,
          background: `${mem.color}55`,
          borderRadius: 3,
          backdropFilter: "blur(4px)",
        }}
      />
    </motion.div>
  );
}

export default function MemoryGallery() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="section-snap"
      style={{
        background: "radial-gradient(ellipse at top, #1a0028 0%, #0a0010 60%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "80px 20px 60px",
        position: "relative",
        overflow: "hidden",
        gap: "3rem",
        minHeight: "100vh",
      }}
    >
      {/* Background radial glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 20%, rgba(200,75,142,0.12) 0%, transparent 60%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Floating background hearts */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            fontSize: `${Math.random() * 12 + 10}px`,
            left: `${Math.random() * 100}%`,
            top:  `${Math.random() * 100}%`,
            zIndex: 0, pointerEvents: "none", opacity: 0.12,
          }}
          animate={{ y: [0, -40, 0], opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
        >
          {["❤️","💕","🌸","✨","💫"][i % 5]}
        </motion.div>
      ))}

      {/* Section heading */}
      <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <motion.div
          style={{ fontSize: "2rem", marginBottom: "0.5rem" }}
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          📸
        </motion.div>
        <motion.h2
          className="font-playfair gradient-text glow-text-pink"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "0.6rem" }}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Our Beautiful Memories
        </motion.h2>
        <motion.p
          className="font-dancing"
          style={{ color: "#ff6b9d", fontSize: "clamp(1rem, 2.5vw, 1.4rem)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          "Every picture tells the story of us 💕"
        </motion.p>
        <div className="section-divider" style={{ marginTop: "1rem" }} />
      </div>

      {/* Polaroid grid */}
      <div
        style={{
          position: "relative", zIndex: 2,
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(20px, 4vw, 40px)",
          justifyContent: "center",
          alignItems: "flex-end",
          maxWidth: 900,
          padding: "20px 0 40px",
        }}
      >
        {MEMORIES.map((mem, i) => (
          <PolaroidCard key={i} mem={mem} index={i} />
        ))}
      </div>

      {/* Bottom caption */}
      <motion.p
        className="font-inter"
        style={{
          position: "relative", zIndex: 2,
          color: "rgba(255,200,220,0.5)",
          fontSize: "0.85rem",
          textAlign: "center",
          letterSpacing: "0.08em",
        }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        ✨ Each memory, a treasure ✨
      </motion.p>
    </section>
  );
}
