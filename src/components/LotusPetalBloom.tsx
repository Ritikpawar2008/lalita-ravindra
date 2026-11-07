import React from 'react';
import { motion } from 'framer-motion';

interface LotusPetalBloomProps {
  isOpening: boolean;
  isOpen: boolean;
}

/**
 * LotusPetalBloom
 * Renders the ceremonial sacred lotus with a smooth, direct bloom transition.
 * 
 * Replaces old individual-petal SVG morphing with a direct, high-fidelity
 * crossfade between the closed lotus bud (/assets/lotus_bud.png) and the
 * fully opened royal lotus (/assets/lotus_open.png).
 * 
 * Guarantees zero lateral drift, perfect alignment, consistent scale/perspective,
 * and a warm golden core burst.
 */
export const LotusPetalBloom: React.FC<LotusPetalBloomProps> = ({ isOpening, isOpen }) => {
  const isBlooming = isOpening || isOpen;

  return (
    <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center pointer-events-none select-none">
      {/* 1. Underlying Deep Warm Golden Aura on the Rangoli floor */}
      <motion.div
        animate={
          isBlooming
            ? { scale: [1.1, 1.5, 1.15], opacity: [0.75, 0.98, 0.8] }
            : { scale: [0.96, 1.06, 0.96], opacity: [0.35, 0.55, 0.35] }
        }
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-[-18%] rounded-full bg-radial from-[#ffd700]/35 via-[#f59e0b]/25 to-transparent blur-2xl"
      />

      {/* 2. Concentric Golden Ring & Ray Flares during Bloom */}
      {isBlooming && (
        <motion.div
          initial={{ opacity: 0, scale: 0.35, rotate: 0 }}
          animate={{ opacity: [0.55, 0.85, 0.55], scale: [0.92, 1.12, 0.92], rotate: 360 }}
          transition={{
            opacity: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
            scale: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 36, repeat: Infinity, ease: 'linear' },
          }}
          className="absolute inset-2 rounded-full border border-[#fef08a]/35 pointer-events-none z-10"
          style={{
            boxShadow: '0 0 35px rgba(245, 158, 11, 0.45), inset 0 0 25px rgba(254, 240, 138, 0.25)',
          }}
        />
      )}

      {/* 3. Golden Core Burst / Radiant Stamen Flare during Opening */}
      <motion.div
        initial={false}
        animate={
          isBlooming
            ? { scale: [0.35, 1.3, 1], opacity: [0, 1, 0.85] }
            : { scale: 0.2, opacity: 0 }
        }
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        className="absolute w-36 h-36 rounded-full bg-radial from-[#ffffff] via-[#fef08a] via-45% to-transparent blur-md z-20 pointer-events-none"
      />

      {/* 4. Natural Floor Shadow Anchor beneath the Lotus */}
      <div 
        className="absolute bottom-6 w-44 h-8 rounded-full bg-black/60 blur-md pointer-events-none z-12"
      />

      {/* 5. CLOSED LOTUS BUD (Idle state, breathing gently, perfectly centered) */}
      <motion.div
        initial={false}
        animate={{
          opacity: isBlooming ? 0 : 1,
          scale: isBlooming ? 1.05 : 1,
        }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 flex items-center justify-center z-15"
        style={{ transformOrigin: 'center center' }}
      >
        <img
          src="/assets/lotus_bud.png"
          alt="Sacred Lotus Bud"
          className="w-60 h-60 sm:w-68 sm:h-68 object-contain animate-lotus-breathe drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)]"
        />
      </motion.div>

      {/* 6. FULLY OPENED SACRED ROYAL LOTUS (Organic floral unfolding easing) */}
      <motion.div
        initial={false}
        animate={{
          opacity: isBlooming ? 1 : 0,
          scale: isBlooming ? 1 : 0.93,
        }}
        transition={{ duration: 0.95, delay: isBlooming ? 0.08 : 0, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 flex items-center justify-center z-18"
        style={{ transformOrigin: 'center center' }}
      >
        <img
          src="/assets/lotus_open.png"
          alt="Royal Blooming Lotus"
          className="w-60 h-60 sm:w-68 sm:h-68 object-contain drop-shadow-[0_16px_36px_rgba(0,0,0,0.95)]"
        />
      </motion.div>
    </div>
  );
};
