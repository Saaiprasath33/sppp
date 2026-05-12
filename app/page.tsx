"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import CursorGlow from "@/components/CursorGlow";
import MusicControl from "@/components/MusicControl";
import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import MemoryGallery from "@/components/MemoryGallery";
import ProposalSection from "@/components/ProposalSection";
import YesEffect from "@/components/YesEffect";
import FinalScreen from "@/components/FinalScreen";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showYesEffect, setShowYesEffect] = useState(false);
  const [showFinalScreen, setShowFinalScreen] = useState(false);
  const storyStartRef = useRef<HTMLDivElement>(null);

  const handleStartJourney = () => {
    storyStartRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleYes = () => {
    setShowYesEffect(true);
  };

  const handleYesEffectDone = () => {
    setShowYesEffect(false);
    setShowFinalScreen(true);
    // Scroll to top for final screen
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative">
      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <CursorGlow />
          <MusicControl />

          {!showFinalScreen ? (
            <div className="snap-container">
              <HeroSection onStart={handleStartJourney} />
              <div ref={storyStartRef}>
                <StorySection />
              </div>
              {/* <MemoryGallery /> */}
              <ProposalSection onYes={handleYes} />
            </div>
          ) : (
            <FinalScreen />
          )}

          <AnimatePresence>
            {showYesEffect && <YesEffect onDone={handleYesEffectDone} />}
          </AnimatePresence>
        </>
      )}
    </main>
  );
}
