"use client";

import { useEffect, useRef, useState } from "react";

// ── Component: Ambient music mute/unmute button ────────────────────────────
// Place an ambient audio file at /public/music/ambient.mp3
export default function MusicControl() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element with looping ambient track
    const audio = new Audio("/music/ambient.mp3");
    audio.loop   = true;
    audio.volume = 0.25;
    audioRef.current = audio;

    // Auto-play on first user interaction
    const tryPlay = () => {
      audio.play().then(() => setPlaying(true)).catch(() => {});
      window.removeEventListener("click", tryPlay);
      window.removeEventListener("touchstart", tryPlay);
    };
    window.addEventListener("click",      tryPlay, { once: true });
    window.addEventListener("touchstart", tryPlay, { once: true });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <button
      onClick={toggle}
      className="music-btn"
      title={playing ? "Mute music" : "Play music"}
      style={{ cursor: "pointer" }}
    >
      {playing ? (
        // Animated music waves SVG
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18V5l12-2v13"/>
          <circle cx="6"  cy="18" r="3"/>
          <circle cx="18" cy="16" r="3"/>
        </svg>
      ) : (
        // Muted icon
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="1"  y1="1"  x2="23" y2="23"/>
          <path d="M9 9v9"/>
          <path d="M15 9.34V4L3 14h7"/>
        </svg>
      )}
    </button>
  );
}
