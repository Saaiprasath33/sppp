"use client";

import { useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

// ── Funny messages for the NO button ─────────────────────────────────────
const NO_TEXTS = [
  "No 😅",
  "Are You Sure? 🥺",
  "Think Again 😭",
  "Please Don't 💔",
  "Wrong Choice 😅",
  "My Heart... 😢",
  "Noooo 🙈",
  "Come on! 🥹",
];

interface NoButtonProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

export default function NoButton({ containerRef }: NoButtonProps) {
  const [textIdx, setTextIdx]   = useState(0);
  const [pos,     setPos]       = useState({ x: 150, y: 0 });
  const [isShaking, setShaking] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Spring physics for smooth escape animation
  const springX = useSpring(150, { stiffness: 400, damping: 25 });
  const springY = useSpring(0, { stiffness: 400, damping: 25 });
  const rotate  = useTransform(springX, [-200, 200], [-25, 25]);

  const escape = (e: React.MouseEvent | React.TouchEvent) => {
    // Cycle funny text
    setTextIdx(prev => (prev + 1) % NO_TEXTS.length);

    // Shake for a moment
    setShaking(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShaking(false), 400);

    // Calculate random new position within container
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();

    // Random teleport within ±45% of container
    const maxX = rect.width  * 0.45;
    const maxY = rect.height * 0.45;
    
    let newX = (Math.random() - 0.5) * 2 * maxX;
    let newY = (Math.random() - 0.5) * 2 * maxY;

    // Ensure it moves at least 100px from current spot
    if (Math.abs(newX - pos.x) < 100) newX += newX > 0 ? -150 : 150;
    if (Math.abs(newY - pos.y) < 100) newY += newY > 0 ? -150 : 150;

    setPos({ x: newX, y: newY });
    springX.set(newX);
    springY.set(newY);
  };

  // Prevent any click from registering
  const blockClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    escape(e);
  };

  return (
    <motion.button
      className="btn-no"
      style={{
        x: springX,
        y: springY,
        rotate,
        cursor: "not-allowed",
        userSelect: "none",
        WebkitUserSelect: "none",
        zIndex: 10,
      }}
      onMouseEnter={escape}
      onMouseMove={escape}
      onTouchStart={escape}
      onClick={blockClick}
      animate={isShaking ? {
        x: [pos.x, pos.x - 8, pos.x + 8, pos.x - 5, pos.x + 5, pos.x],
        transition: { duration: 0.4 }
      } : {}}
      whileHover={{ scale: 1.05 }}
    >
      {NO_TEXTS[textIdx]}
    </motion.button>
  );
}
