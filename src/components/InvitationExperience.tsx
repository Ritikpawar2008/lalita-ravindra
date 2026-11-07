import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AnimationStage } from '../types/invitation';
import { FloatingPetals } from './FloatingPetals';
import { AudioController } from './AudioController';
import { LotusPetalBloom } from './LotusPetalBloom';
import { ThreePageInvitationCard } from './ThreePageInvitationCard';
import { ParticleEffects } from './ParticleEffects';
import { Pointer } from 'lucide-react';
import confetti from 'canvas-confetti';

const getInitialStage = (): AnimationStage => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const s = params.get('stage') as AnimationStage;
    if (s && ['idle', 'lotus-opening', 'lighting-diyas', 'card-emerging', 'cover-full', 'cover-ready', 'curtain-opening', 'cover-opening', 'invitation-open', 'card-reveal'].includes(s)) {
      if (s === 'card-reveal' || s === 'cover-ready') return 'cover-full';
      if (s === 'cover-opening') return 'curtain-opening';
      return s;
    }
  }
  return 'idle';
};

const getInitialPage = (): 1 | 2 | 3 => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const p = parseInt(params.get('page') || '1', 10);
    if (p === 1 || p === 2 || p === 3) return p as 1 | 2 | 3;
  }
  return 1;
};

// Coordinated celebration confetti & flower petal cascade (Traditional Marigold & Rose pushpavrushti)
const triggerCelebrationConfetti = () => {
  try {
    // 1. Central gold, saffron & velvety rose petal shower
    confetti({
      particleCount: 65,
      spread: 90,
      origin: { y: 0.45 },
      colors: ['#ffd700', '#f59e0b', '#fbbf24', '#f43f5e', '#e11d48', '#ffffff'],
      disableForReducedMotion: true,
      gravity: 0.75,
      scalar: 1.25,
      ticks: 240,
    });
    // 2. Cascading petals from corners with natural drift
    window.setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.35 },
        colors: ['#ffd700', '#f59e0b', '#f43f5e', '#fb7185', '#fffbeb'],
        gravity: 0.7,
        scalar: 1.15,
        ticks: 220,
      });
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.35 },
        colors: ['#ffd700', '#f59e0b', '#f43f5e', '#fb7185', '#fffbeb'],
        gravity: 0.7,
        scalar: 1.15,
        ticks: 220,
      });
    }, 240);
  } catch {
    // Safe fallback
  }
};

// Symmetrical 7 diyas arranged in a clockwise circular ring around the lotus
const SEVEN_DIYAS = [
  { id: 1, name: 'Top-Left', xPercent: 23.06, yPercent: 53.29, size: 24, flameAsset: '/assets/diya_flame_1.png', delay: 0 },
  { id: 2, name: 'Top-Right', xPercent: 76.09, yPercent: 52.45, size: 24, flameAsset: '/assets/diya_flame_2.png', delay: 0.15 },
  { id: 3, name: 'Mid-Right', xPercent: 87.99, yPercent: 56.99, size: 26, flameAsset: '/assets/diya_flame_3.png', delay: 0.3 },
  { id: 4, name: 'Front-Right', xPercent: 74.18, yPercent: 66.03, size: 32, flameAsset: '/assets/diya_flame_1.png', delay: 0.1 },
  { id: 5, name: 'Front-Center', xPercent: 51.01, yPercent: 71.17, size: 34, flameAsset: '/assets/diya_flame_2.png', delay: 0.25 },
  { id: 6, name: 'Front-Left', xPercent: 27.74, yPercent: 66.57, size: 32, flameAsset: '/assets/diya_flame_3.png', delay: 0.05 },
  { id: 7, name: 'Mid-Left', xPercent: 10.73, yPercent: 59.57, size: 26, flameAsset: '/assets/diya_flame_1.png', delay: 0.2 },
];

export const InvitationExperience: React.FC = () => {
  const [stage, setStage] = useState<AnimationStage>(getInitialStage);
  const [isSequenceRunning, setIsSequenceRunning] = useState<boolean>(false);
  const [isDoorOpening, setIsDoorOpening] = useState<boolean>(() => {
    const initial = getInitialStage();
    return initial === 'curtain-opening';
  });
  const [litDiyasCount, setLitDiyasCount] = useState<number>(0);
  const timeoutsRef = useRef<number[]>([]);

  // Clear all scheduled timeouts safely
  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    return () => clearAllTimeouts();
  }, []);

  // Coordinated state machine:
  // 1. idle: Full-screen temple scene with 7 unlit diyas (/assets/temple_scene_unlit.png), "कमळाला स्पर्श करा"
  // 2. lotus-opening: Lotus blooms directly centered with zero lateral drift
  // 3. lighting-diyas: 7 diyas illuminate sequentially in clockwise order (1 to 7)
  // 4. card-emerging: Card emerges from lotus center & smoothly expands to 100% full screen
  // 5. cover-full: Full-screen olive cover (/images/2nd.png) waiting indefinitely for user tap on "स्पर्श करून उघडा"
  // 6. curtain-opening: User taps seal -> 3D hinged doors open outward -> ivory curtains part -> petals cascade -> Page 1 revealed smoothly
  // 7. invitation-open: 3-page ceremonial invitation (/images/3rd.png, 4th.png, 5th.png) with live countdown below Page 3
  const startOpeningSequence = useCallback(() => {
    if (isSequenceRunning || stage !== 'idle') return;

    // Direct synchronous audio play on user interaction
    const audio = document.querySelector('audio');
    if (audio && audio.paused) {
      audio.play().catch(() => {});
    }

    setIsSequenceRunning(true);
    clearAllTimeouts();

    // 1. Lotus Bloom begins centered on fixed anchor immediately
    setStage('lotus-opening');

    // 2. After lotus opening begins, illuminate the 7 diyas sequentially in clockwise order
    const tDiyas = window.setTimeout(() => {
      setStage('lighting-diyas');
      for (let i = 1; i <= 7; i++) {
        const diyaTimer = window.setTimeout(() => {
          setLitDiyasCount(i);
        }, (i - 1) * 180);
        timeoutsRef.current.push(diyaTimer);
      }
    }, 650);

    // 3. Only after lotus has opened and diyas are lit, card emerges from center
    const tEmerging = window.setTimeout(() => {
      setStage('card-emerging');
    }, 2350);

    // 4. Card reaches 100% full screen edge-to-edge as cover-full, waiting for user tap on the seal
    const tCover = window.setTimeout(() => {
      setStage('cover-full');
      setIsSequenceRunning(false);
    }, 3650);

    timeoutsRef.current.push(tDiyas, tEmerging, tCover);
  }, [isSequenceRunning, stage]);

  // When user taps the central ornamental seal ("स्पर्श करून उघडा") on the full-screen olive cover
  const handleCoverTap = useCallback(() => {
    // Guard against duplicate taps or invalid states
    if (stage !== 'cover-full' || isDoorOpening) return;

    setIsDoorOpening(true);
    clearAllTimeouts();

    // Ensure audio is playing on deliberate seal tap gesture
    const audio = document.querySelector('audio');
    if (audio && audio.paused) {
      audio.play().catch(() => {});
    }

    // Transition to opening sequence
    setStage('curtain-opening');

    // As the ivory curtains part (t = 850ms), shower the celebratory petals!
    const tPetals = window.setTimeout(() => {
      triggerCelebrationConfetti();
    }, 850);

    // Opening animation completes; smoothly transition to invitation-open
    const tOpen = window.setTimeout(() => {
      setStage('invitation-open');
    }, 1950);

    timeoutsRef.current.push(tPetals, tOpen);
  }, [stage, isDoorOpening]);

  // Replay Ceremony back to initial state
  const handleReplay = () => {
    clearAllTimeouts();
    setIsSequenceRunning(false);
    setIsDoorOpening(false);
    setLitDiyasCount(0);
    setStage('idle');
  };

  // Determines whether the invitation card pages are mounted
  const isCardMounted = ['cover-full', 'curtain-opening', 'invitation-open'].includes(stage);

  return (
    <main className="fixed inset-0 w-full h-full min-h-[100vh] h-[100dvh] bg-[#0c0106] overflow-hidden select-none font-marathi-serif box-border m-0 p-0">
      
      {/* 1. Indian Classical Background Audio Controller (Completely invisible, continuous looping, plays /audio/sakharpuda-music.mp3) */}
      <AudioController autoPlayTrigger={isSequenceRunning || stage !== 'idle' || isDoorOpening} />

      {/* 2. Atmospheric Sacred Golden Motes drifting in the candlelight */}
      <ParticleEffects intensity="gentle" dimmed={stage !== 'idle' && stage !== 'lighting-diyas'} />

      {/* 3. Floating Rose and Auspicious Marigold Petals across entire screen */}
      <FloatingPetals count={16} />

      {/* 4. SCENE 1: FULL-SCREEN LOTUS SCENE WITH 7 DIYAS */}
      <div 
        className={`fixed inset-0 z-10 w-full h-full min-h-[100vh] h-[100dvh] overflow-hidden flex items-center justify-center transition-opacity duration-1000 ${
          ['curtain-opening', 'invitation-open'].includes(stage) ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
        }`}
      >
        <div 
          className="relative flex items-center justify-center overflow-hidden"
          style={{
            width: 'max(100vw, calc(100dvh * 941 / 1672))',
            height: 'max(100dvh, calc(100vw * 1672 / 941))',
          }}
        >
          {/* Base unlit temple image in idle with 7 visibly unlit brass diyas on the floor */}
          <img
            src="/assets/temple_scene_unlit.png"
            alt="Sacred Lotus Ceremony"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          />

          {/* Fully illuminated scene crossfades smoothly in as diyas ignite */}
          <motion.img
            src="/images/1st.png"
            alt="Illuminated Temple"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: litDiyasCount === 0 ? 0 : Math.min(1, 0.15 + (litDiyasCount / 7) * 0.85),
              filter: ['curtain-opening', 'invitation-open'].includes(stage) ? 'brightness(0.32) blur(12px)' : 'brightness(1) blur(0px)',
              scale: ['curtain-opening', 'invitation-open'].includes(stage) ? 1.04 : 1,
            }}
            transition={{ duration: 0.75, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          />

          {/* 7 Clockwise Illuminated Realistic Diya Flames with Natural Ignition */}
          {SEVEN_DIYAS.map((diya) => {
            const isLit = litDiyasCount >= diya.id;
            if (!isLit) return null;

            return (
              <motion.div
                key={`diya-flame-${diya.id}`}
                initial={{ scale: 0.2, opacity: 0, y: 5 }}
                animate={{ scale: [0.2, 1.15, 0.95, 1], opacity: 1, y: 0 }}
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                className="absolute pointer-events-none flex flex-col items-center justify-end z-25"
                style={{
                  left: `${diya.xPercent}%`,
                  top: `${diya.yPercent}%`,
                  width: `${diya.size}px`,
                  height: `${diya.size * 1.5}px`,
                  transform: 'translate(-50%, -86%)',
                }}
              >
                {/* Soft warm expanding glow on brass rim & oil pool */}
                <motion.div 
                  initial={{ scale: 0.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.85 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-0 rounded-full pointer-events-none"
                  style={{
                    width: `${diya.size * 1.6}px`,
                    height: `${diya.size * 0.5}px`,
                    background: 'radial-gradient(ellipse at center, rgba(255, 205, 50, 0.6) 0%, rgba(245, 140, 0, 0.22) 55%, transparent 80%)',
                    transform: 'translateY(35%)',
                  }}
                />

                {/* Realistic Photorealistic Diya Flame with natural organic waver */}
                <img
                  src={diya.flameAsset}
                  alt="Diya Flame"
                  className="w-full h-full object-contain object-bottom animate-realistic-flame pointer-events-none drop-shadow-[0_0_8px_rgba(255,190,40,0.65)]"
                  style={{
                    animationDuration: `${1.6 + (diya.id % 3) * 0.25}s`,
                    animationDelay: `${diya.delay}s`,
                  }}
                />
              </motion.div>
            );
          })}

          {/* Dynamic Blooming Lotus Overlay positioned precisely over the central lotus bud in 1st.png */}
          {(stage === 'lotus-opening' || stage === 'lighting-diyas' || stage === 'card-emerging') && (
            <div 
              className="absolute flex items-center justify-center pointer-events-none z-20"
              style={{
                top: '53.8%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '280px',
                height: '280px',
              }}
            >
              <LotusPetalBloom isOpening={true} isOpen={true} />
            </div>
          )}

          {/* Accessible Interactive Lotus Tap Indicator & Click Target */}
          <AnimatePresence>
            {stage === 'idle' && (
              <motion.div
                key="lotus-idle-tap-group"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.35, ease: 'easeOut' } }}
                className="absolute inset-0 pointer-events-none"
              >
                {/* 1. Subtle Golden Tap Effect & Soft Glow Around the Lotus */}
                <motion.div
                  animate={{ 
                    scale: [0.96, 1.03, 0.96],
                    opacity: [0.35, 0.65, 0.35],
                  }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute pointer-events-none rounded-full z-22"
                  style={{
                    top: '53.8%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '260px',
                    height: '260px',
                    background: 'radial-gradient(circle, rgba(255, 215, 0, 0.22) 0%, rgba(245, 158, 11, 0.1) 45%, transparent 70%)',
                  }}
                />

                {/* Subtle soft gold perimeter ripple on lotus */}
                <motion.div
                  animate={{ 
                    scale: [0.95, 1.03, 0.95],
                    opacity: [0.25, 0.55, 0.25],
                  }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                  className="absolute pointer-events-none rounded-full border border-[#ffd700]/35 z-22"
                  style={{
                    top: '53.8%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '210px',
                    height: '210px',
                    boxShadow: '0 0 16px rgba(255, 215, 0, 0.15)',
                  }}
                />

                {/* 2. STRICTLY ONE Hand Pointer: Directly ON TOP OF the Lotus, Antique-Gold Outline, Transparent Inside */}
                <div 
                  className="absolute pointer-events-none flex flex-col items-center justify-center z-30"
                  style={{
                    top: '51.5%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100px',
                    height: '100px',
                  }}
                >
                  {/* Subtle soft warm-gold contact pulse at fingertip */}
                  <motion.span
                    animate={{
                      scale: [0.35, 1.25, 1.65],
                      opacity: [0.65, 0.25, 0],
                    }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: [0.22, 1, 0.36, 1], times: [0, 0.55, 1] }}
                    className="absolute rounded-full border border-[#d4af37]/60 shadow-[0_0_8px_rgba(212,175,55,0.4)]"
                    style={{ width: '32px', height: '32px', top: '10px' }}
                  />

                  {/* Gentle downward tap motion as if tapping the lotus */}
                  <motion.div
                    animate={{
                      y: [0, -4, 4, 0],
                      scale: [1, 1.03, 0.96, 1],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="relative flex items-center justify-center"
                  >
                    <Pointer 
                      className="w-11 h-11 sm:w-12 sm:h-12 text-[#d4af37] stroke-[#d4af37] stroke-[1.6] -rotate-12" 
                      style={{
                        fill: 'none',
                        filter: 'drop-shadow(0 0 5px rgba(212, 175, 55, 0.45)) drop-shadow(0 2px 8px rgba(0, 0, 0, 0.85))',
                      }}
                    />
                  </motion.div>
                </div>

                {/* 3. STRICTLY ONE Instruction Message, Centered Horizontally Neatly Below the Lotus */}
                <motion.div
                  animate={{ opacity: [0.92, 1, 0.92] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute pointer-events-none z-28 flex flex-col items-center justify-center text-center px-4"
                  style={{
                    top: '68%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    maxWidth: '420px',
                  }}
                >
                  <p className="text-sm sm:text-base font-marathi-heading font-extrabold text-[#fef08a] tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                    कमळाला स्पर्श करा • Tap to Open
                  </p>
                </motion.div>

                {/* 4. Single Accessible Interactive Click Target Covering Lotus */}
                <button
                  type="button"
                  onClick={startOpeningSequence}
                  disabled={isSequenceRunning}
                  aria-label="कमळाला स्पर्श करा • Tap to Open"
                  className="absolute cursor-pointer focus:outline-none z-35 rounded-full pointer-events-auto"
                  style={{
                    top: '53.8%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '280px',
                    height: '280px',
                  }}
                >
                  <span className="sr-only">कमळाला स्पर्श करा • Tap to Open</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 4. SCENE 3: SINGLE-MOUNTED INVITATION CARD (Revealed directly behind ivory curtains without duplicate entrance) */}
      {isCardMounted && (
        <div className="fixed inset-0 z-20 w-full h-full min-h-[100vh] h-[100dvh] overflow-hidden">
          <ThreePageInvitationCard onReplay={handleReplay} initialPage={getInitialPage()} />
        </div>
      )}

      {/* 5. SCENE 2: REALISTIC 3D HINGED COVER DOORS & IVORY CURTAIN REVEAL OVERLAY */}
      <AnimatePresence>
        {stage !== 'invitation-open' && ['card-emerging', 'cover-full', 'curtain-opening'].includes(stage) && (
          <motion.div
            key="cover-and-curtain-container"
            initial={stage === 'cover-full' || stage === 'curtain-opening' ? false : { scale: 0.18, y: 70, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeOut' } }}
            transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-35 w-full h-full min-h-[100vh] h-[100dvh] overflow-hidden bg-[#151c11] shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
            style={{
              perspective: '1400px',
              perspectiveOrigin: 'center center',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* LAYER A (BEHIND COVER DOORS): IVORY CURTAIN SCENE */}
            <div className="absolute inset-0 w-full h-full min-h-[100vh] h-[100dvh] overflow-hidden pointer-events-none z-20 bg-[#12040b]">
              {/* Left Ivory Curtain Panel — Parts smoothly to the left like real silk fabric */}
              <motion.div
                initial={{ x: '0%', scaleX: 1, opacity: 1 }}
                animate={isDoorOpening ? { x: '-102%', scaleX: 0.75, opacity: [1, 1, 0.9, 0] } : { x: '0%', scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.55, duration: 1.35, ease: [0.72, 0, 0.28, 1] }}
                style={{ transformOrigin: 'left center' }}
                className="absolute left-0 top-0 bottom-0 w-[53%] overflow-hidden preserve-3d shadow-[12px_0_35px_rgba(0,0,0,0.85)] z-22"
              >
                <img
                  src="/assets/ivory_curtain_left.png"
                  alt="Left Ivory Curtain"
                  className="w-full h-full min-h-[100vh] object-cover object-right pointer-events-none"
                />
              </motion.div>

              {/* Right Ivory Curtain Panel — Parts smoothly to the right like real silk fabric */}
              <motion.div
                initial={{ x: '0%', scaleX: 1, opacity: 1 }}
                animate={isDoorOpening ? { x: '102%', scaleX: 0.75, opacity: [1, 1, 0.9, 0] } : { x: '0%', scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.55, duration: 1.35, ease: [0.72, 0, 0.28, 1] }}
                style={{ transformOrigin: 'right center' }}
                className="absolute right-0 top-0 bottom-0 w-[53%] overflow-hidden preserve-3d shadow-[-12px_0_35px_rgba(0,0,0,0.85)] z-22"
              >
                <img
                  src="/assets/ivory_curtain_right.png"
                  alt="Right Ivory Curtain"
                  className="w-full h-full min-h-[100vh] object-cover object-left pointer-events-none"
                />
              </motion.div>

              {/* Top Valance Arch Shadow */}
              <motion.div
                initial={{ opacity: 1 }}
                animate={isDoorOpening ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.6 }}
                className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-[#240612]/90 to-transparent z-25"
              />
            </div>

            {/* LAYER B (FOREGROUND): REALISTIC 3D HINGED OLIVE-GREEN COVER DOORS */}
            <div 
              className="absolute inset-0 w-full h-full min-h-[100vh] h-[100dvh] overflow-hidden z-30 preserve-3d"
              style={{
                perspective: '1400px',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Central Vertical Crease Shadow representing folded invitation flap */}
              {!isDoorOpening && (
                <div 
                  className="absolute left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 z-35 pointer-events-none bg-gradient-to-r from-black/50 via-black/25 to-transparent" 
                />
              )}

              {/* LEFT COVER PANEL — Rotates realistically around left vertical hinge */}
              <motion.div
                initial={{ rotateY: 0, x: '0%' }}
                animate={isDoorOpening ? { rotateY: -105, x: '-3%' } : { rotateY: 0, x: '0%' }}
                transition={{ duration: 1.4, ease: [0.72, 0, 0.28, 1] }}
                style={{
                  transformOrigin: 'left center',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
                className={`absolute left-0 top-0 bottom-0 w-1/2 h-full overflow-hidden z-32 pointer-events-none ${
                  isDoorOpening ? 'shadow-[16px_0_45px_rgba(0,0,0,0.85)]' : ''
                }`}
              >
                {/* Unified 100vw x 100dvh artwork anchored at screen left */}
                <div className="absolute top-0 left-0 w-[100vw] h-[100dvh] min-h-[100vh] min-w-[100vw]">
                  <img
                    src="/images/2nd.png"
                    alt="Olive-Green Invitation Cover - Left Panel"
                    className="w-full h-full min-h-[100vh] min-w-full object-cover object-center pointer-events-none"
                  />
                </div>

                {/* Dynamic 3D Inner Shadow that deepens as the panel swings open toward the light */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isDoorOpening ? { opacity: 0.7 } : { opacity: 0 }}
                  transition={{ duration: 1.4, ease: [0.72, 0, 0.28, 1] }}
                  className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent pointer-events-none"
                />

                {/* Subtle vertical gold hinge trim accent */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#ffd700]/35 to-transparent pointer-events-none" />
              </motion.div>

              {/* RIGHT COVER PANEL — Rotates realistically around right vertical hinge */}
              <motion.div
                initial={{ rotateY: 0, x: '0%' }}
                animate={isDoorOpening ? { rotateY: 105, x: '3%' } : { rotateY: 0, x: '0%' }}
                transition={{ duration: 1.4, ease: [0.72, 0, 0.28, 1] }}
                style={{
                  transformOrigin: 'right center',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
                className={`absolute right-0 top-0 bottom-0 w-1/2 h-full overflow-hidden z-32 pointer-events-none ${
                  isDoorOpening ? 'shadow-[-16px_0_45px_rgba(0,0,0,0.85)]' : ''
                }`}
              >
                {/* Unified 100vw x 100dvh artwork anchored at screen right */}
                <div className="absolute top-0 right-0 w-[100vw] h-[100dvh] min-h-[100vh] min-w-[100vw]">
                  <img
                    src="/images/2nd.png"
                    alt="Olive-Green Invitation Cover - Right Panel"
                    className="w-full h-full min-h-[100vh] min-w-full object-cover object-center pointer-events-none"
                  />
                </div>

                {/* Dynamic 3D Inner Shadow that deepens as the panel swings open toward the light */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isDoorOpening ? { opacity: 0.7 } : { opacity: 0 }}
                  transition={{ duration: 1.4, ease: [0.72, 0, 0.28, 1] }}
                  className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/25 to-transparent pointer-events-none"
                />

                {/* Subtle vertical gold hinge trim accent */}
                <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#ffd700]/35 to-transparent pointer-events-none" />
              </motion.div>

              {/* TAPPABLE CENTRAL ORNAMENTAL SEAL ("स्पर्श करून उघडा") */}
              {stage === 'cover-full' && !isDoorOpening && (
                <motion.button
                  type="button"
                  onClick={handleCoverTap}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                  aria-label="स्पर्श करून उघडा (Tap to open invitation)"
                  className="absolute z-50 cursor-pointer flex items-center justify-center group focus:outline-none rounded-3xl"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '240px',
                    height: '320px',
                  }}
                >
                  {/* Concentric Golden Ripple Rings with sacred breathing halo over finger touch icon */}
                  <div 
                    className="absolute pointer-events-none flex items-center justify-center"
                    style={{
                      top: '66%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '64px',
                      height: '64px',
                    }}
                  >
                    <span className="absolute inset-0 rounded-full border border-[#ffd700] animate-sacred-halo opacity-90" />
                    <span className="absolute inset-2 rounded-full border border-[#fef08a] shadow-[0_0_26px_rgba(255,215,0,0.95)] opacity-90 group-hover:scale-110 group-active:scale-95 transition-transform" />
                  </div>
                </motion.button>
              )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
};
