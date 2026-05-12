"use client";

import { motion, AnimatePresence } from "framer-motion";

// ── Magical final ending screen ────────────────────────────────────────────
// Shown after YES celebration completes
export default function FinalScreen() {

  // Lanterns config
  const lanterns = [...Array(8)].map((_, i) => ({
    id: i,
    left:     `${10 + i * 11}%`,
    delay:    i * 1.2,
    duration: 10 + i * 1.5,
    size:     28 + (i % 3) * 8,
  }));

  // Heart rain config
  const rainHearts = [...Array(18)].map((_, i) => ({
    id:       i,
    left:     `${Math.random() * 100}%`,
    delay:    Math.random() * 4,
    duration: Math.random() * 4 + 5,
    size:     Math.random() * 14 + 12,
    emoji:    ["❤️","💕","💖","🌸","💗"][i % 5],
  }));

  return (
    <AnimatePresence>
      <motion.section
        key="final"
        className="section-snap bg-final"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          minHeight: "100vh",
          gap: "2rem",
          padding: "40px 20px",
        }}
      >
        {/* Moonlight glow */}
        <motion.div
          className="animate-moon-glow"
          style={{
            position: "absolute",
            top: "-80px", left: "50%", transform: "translateX(-50%)",
            width: 220, height: 220,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,220,160,0.22) 0%, rgba(255,180,100,0.08) 50%, transparent 70%)",
            filter: "blur(30px)",
            zIndex: 0,
          }}
        />

        {/* Moon circle */}
        <motion.div
          style={{
            position: "absolute",
            top: 20, left: "50%", transform: "translateX(-50%)",
            width: 80, height: 80,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,240,200,0.85), rgba(255,200,120,0.5))",
            boxShadow: "0 0 40px rgba(255,220,150,0.6), 0 0 80px rgba(255,200,100,0.3)",
            zIndex: 1,
          }}
          animate={{ boxShadow: [
            "0 0 40px rgba(255,220,150,0.5), 0 0 80px rgba(255,200,100,0.2)",
            "0 0 70px rgba(255,220,150,0.9), 0 0 140px rgba(255,200,100,0.5)",
            "0 0 40px rgba(255,220,150,0.5), 0 0 80px rgba(255,200,100,0.2)",
          ]}}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Floating lanterns */}
        {lanterns.map(l => (
          <motion.div
            key={l.id}
            style={{
              position: "absolute",
              left: l.left,
              bottom: "-60px",
              fontSize: l.size,
              zIndex: 1,
              pointerEvents: "none",
              filter: "drop-shadow(0 0 10px rgba(255,180,80,0.7))",
            }}
            animate={{
              y:       [0, -(window?.innerHeight || 800) - 100],
              x:       [0, (Math.random() - 0.5) * 80],
              opacity: [0, 0.9, 0.9, 0],
              rotate:  [0, (Math.random() - 0.5) * 20],
            }}
            transition={{
              duration:    l.duration,
              repeat:      Infinity,
              delay:       l.delay,
              ease:        "linear",
            }}
          >
            🏮
          </motion.div>
        ))}

        {/* Heart rain */}
        {rainHearts.map(h => (
          <motion.div
            key={h.id}
            style={{
              position: "absolute",
              left: h.left,
              top:  "-30px",
              fontSize: h.size,
              zIndex: 1,
              pointerEvents: "none",
            }}
            animate={{
              y:       [(window?.innerHeight || 900) + 60],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration:    h.duration,
              repeat:      Infinity,
              delay:       h.delay,
              ease:        "linear",
            }}
          >
            {h.emoji}
          </motion.div>
        ))}

        {/* Couple silhouette */}
        <motion.div
          className="animate-couple-float"
          style={{
            position: "absolute",
            bottom: "8%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1,
            fontSize: "clamp(4rem, 12vw, 7rem)",
            filter: "drop-shadow(0 0 30px rgba(255,107,157,0.5))",
            userSelect: "none",
          }}
        >
          👫
        </motion.div>

        {/* Stars in background */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`fstar-${i}`}
            style={{
              position: "absolute",
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              borderRadius: "50%",
              background: "#fff",
              left:  `${Math.random() * 100}%`,
              top:   `${Math.random() * 70}%`,
              zIndex: 0,
            }}
            animate={{ opacity: [0.1, 1, 0.1], scale: [0.8, 1.4, 0.8] }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 4 }}
          />
        ))}

        {/* Main content */}
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 680 }}>

          {/* Ring */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 10, delay: 0.3 }}
            style={{ fontSize: "clamp(3rem, 10vw, 5rem)", marginBottom: "1.5rem", display: "block" }}
          >
            💍
          </motion.div>

          {/* Ending message */}
          <motion.h2
            className="font-playfair gradient-text glow-text-pink"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3.2rem)", lineHeight: 1.3, marginBottom: "1.5rem" }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            And This Is Just The Beginning
            <br />Of Our Forever, Rithiga ❤️
          </motion.h2>

          <motion.div className="section-divider" style={{ margin: "1.2rem auto" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          />

          <motion.p
            className="font-dancing"
            style={{ color: "#ff6b9d", fontSize: "clamp(1.1rem, 3vw, 1.6rem)", marginBottom: "2.5rem" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            "Two hearts, one forever story 🌙"
          </motion.p>

          {/* Final glow button */}
          <motion.button
            className="btn-primary"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, type: "spring", bounce: 0.4 }}
            whileHover={{
              scale: 1.08,
              boxShadow: "0 0 60px rgba(255,107,157,0.9), 0 0 120px rgba(255,107,157,0.4)",
            }}
            whileTap={{ scale: 0.96 }}
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
              cursor: "pointer",
              padding: "18px 50px",
            }}
            onClick={() => {
              // Scroll back to top for replay
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            I Love You Forever 💕
          </motion.button>

          {/* Floating love texts */}
          {["Forever Yours 💕", "My Soulmate ❤️", "Always & Forever 🌸"].map((t, i) => (
            <motion.p
              key={i}
              className="font-dancing"
              style={{
                position: "absolute",
                fontSize: "1rem",
                color: ["#ff6b9d", "#fbbf24", "#e879f9"][i],
                left:  `${[0, 60, 20][i]}%`,
                top:   `${[35, 40, 75][i]}%`,
                pointerEvents: "none",
                opacity: 0,
              }}
              animate={{ opacity: [0, 0.8, 0], y: [0, -30] }}
              transition={{ duration: 3, delay: 2 + i * 1.2, repeat: Infinity, repeatDelay: 3 }}
            >
              {t}
            </motion.p>
          ))}
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
