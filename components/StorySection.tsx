"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import ParticleBackground from "./ParticleBackground";

// ── Story data ─────────────────────────────────────────────────────────────
const STORIES = [
  {
    chapter: "Chapter I",
    title: "The Day We Met",
    emoji: "🌸",
    image: "/images/rithiga1.jpg",
    color: "from-pink-900/40 to-purple-900/40",
    accent: "#ff6b9d",
    quote: "\"In a world of strangers, Rithiga, your smile felt like home.\"",
    body: "That ordinary day became the most extraordinary moment of my life. The moment I saw you, Rithiga, something shifted inside me — like the universe had rearranged itself just for that second.",
    stickers: ["💫", "🌸", "✨", "🦋"],
    floatEmoji: "🌸",
    bg: "radial-gradient(ellipse at 20% 50%, rgba(200,75,142,0.18) 0%, transparent 60%)",
  },
  {
    chapter: "Chapter II",
    title: "You Changed My Life",
    emoji: "💕",
    image: "/images/rithiga2.jpg",
    color: "from-rose-900/40 to-pink-900/40",
    accent: "#ff3366",
    quote: "\"Rithiga, you walked in and made everything make sense.\"",
    body: "Before you, I had pieces — you made them whole. Every laugh we shared, every quiet moment, every adventure — you turned my ordinary world into something breathtaking, Rithiga.",
    stickers: ["❤️", "💕", "🥰", "⭐"],
    floatEmoji: "💕",
    bg: "radial-gradient(ellipse at 80% 40%, rgba(255,51,102,0.15) 0%, transparent 60%)",
  },
  {
    chapter: "Chapter III",
    title: "You Are My Forever",
    emoji: "💍",
    image: "/images/rithiga2.jpg",
    color: "from-purple-900/40 to-rose-900/40",
    accent: "#c84b8e",
    quote: "\"With you, Rithiga, every moment is where I want to be.\"",
    body: "I used to wonder what forever felt like. Then I found you, Rithiga. And now I know — forever feels exactly like this. Like us. Like home. Like love that never stops growing.",
    stickers: ["💍", "🌹", "💖", "🌙"],
    floatEmoji: "💍",
    bg: "radial-gradient(ellipse at 50% 80%, rgba(183,110,121,0.18) 0%, transparent 60%)",
  },
];


// ── Animated text reveal helper ────────────────────────────────────────────
function RevealText({
  children,
  delay = 0,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ── Single story section ───────────────────────────────────────────────────
function StoryCard({ story, index }: { story: typeof STORIES[0]; index: number }) {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <section
      ref={ref}
      className="section-snap"
      style={{
        background: "#0a0010",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "40px 20px",
      }}
    >
      {/* Bg glow */}
      <div style={{ position: "absolute", inset: 0, background: story.bg, zIndex: 0, pointerEvents: "none" }} />
      <ParticleBackground count={35} />

      {/* Chapter label */}
      <motion.div
        style={{
          position: "absolute", top: "30px",
          left: "50%", transform: "translateX(-50%)",
          fontSize: "0.8rem", letterSpacing: "0.3em",
          color: story.accent, textTransform: "uppercase",
          zIndex: 2,
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {story.chapter}
      </motion.div>

      {/* Content grid */}
      <div style={{
        position: "relative", zIndex: 2,
        display: "flex",
        flexDirection: isEven ? "row" : "row-reverse",
        alignItems: "center",
        gap: "clamp(24px, 6vw, 80px)",
        maxWidth: 960,
        width: "100%",
        flexWrap: "wrap",
        justifyContent: "center",
      }}>

        {/* Animated floating image/icon frame */}
        <RevealText delay={0.1}>
          <motion.div
            animate={{ y: [-10, 10, -10], rotate: isEven ? [-2, 2, -2] : [2, -2, 2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "relative" }}
          >
            <div
              className="glass animate-border-glow"
              style={{
                width: "clamp(180px, 30vw, 260px)",
                height: "clamp(180px, 30vw, 260px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "clamp(5rem, 12vw, 8rem)",
                border: `2px solid ${story.accent}55`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {(story as any).image ? (
                <motion.img
                  src={(story as any).image}
                  alt={story.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 1.2 }}
                />
              ) : (
                story.emoji
              )}
              {/* Pulse ring */}
              <motion.div
                style={{
                  position: "absolute", inset: -4,
                  borderRadius: "inherit",
                  border: `2px solid ${story.accent}`,
                  opacity: 0.5,
                }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {/* Heartbeat dots */}
              {story.stickers.map((s, si) => (
                <motion.span
                  key={si}
                  style={{
                    position: "absolute",
                    fontSize: "1.2rem",
                    top:  `${[10, 10, 80, 80][si]}%`,
                    left: `${[10, 80, 10, 80][si]}%`,
                    zIndex: 1,
                  }}
                  animate={{ scale: [1, 1.4, 1], rotate: [0, 20, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: si * 0.4 }}
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </RevealText>

        {/* Text content */}
        <div style={{ flex: 1, minWidth: 260, maxWidth: 480 }}>
          <RevealText delay={0.2}>
            <h2
              className="font-playfair gradient-text"
              style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", marginBottom: "1rem", lineHeight: 1.2 }}
            >
              {story.title}
            </h2>
          </RevealText>

          {/* Italic quote with typewriter */}
          <RevealText delay={0.4}>
            <div
              className="font-dancing"
              style={{
                fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                color: story.accent,
                marginBottom: "1.2rem",
                lineHeight: 1.5,
              }}
            >
              {inView ? (
                <TypeAnimation
                  sequence={[400, story.quote]}
                  speed={60}
                  cursor={false}
                />
              ) : null}
            </div>
          </RevealText>

          <RevealText delay={0.6}>
            <div className="section-divider" style={{ margin: "0 0 1.2rem" }} />
            <p
              className="font-inter"
              style={{
                color: "rgba(255,220,235,0.75)",
                lineHeight: 1.8,
                fontSize: "clamp(0.92rem, 1.8vw, 1.05rem)",
              }}
            >
              {story.body}
            </p>
          </RevealText>

          {/* Animated tag pills */}
          <RevealText delay={0.8}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: "1.5rem" }}>
              {story.stickers.map((s, si) => (
                <motion.span
                  key={si}
                  className="glass"
                  style={{
                    padding: "6px 14px",
                    fontSize: "0.85rem",
                    borderRadius: 50,
                    color: story.accent,
                    border: `1px solid ${story.accent}44`,
                  }}
                  whileHover={{ scale: 1.1 }}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: si * 0.3 }}
                >
                  {s} moment
                </motion.span>
              ))}
            </div>
          </RevealText>
        </div>
      </div>

      {/* Floating background emojis */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            fontSize: `${Math.random() * 10 + 14}px`,
            left:  `${Math.random() * 100}%`,
            top:   `${Math.random() * 100}%`,
            zIndex: 1,
            pointerEvents: "none",
            opacity: 0.15,
          }}
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.7 }}
        >
          {story.floatEmoji}
        </motion.div>
      ))}
    </section>
  );
}

// ── Export all 3 story sections ────────────────────────────────────────────
export default function StorySection() {
  return (
    <>
      {STORIES.map((story, i) => (
        <StoryCard key={i} story={story} index={i} />
      ))}
    </>
  );
}
