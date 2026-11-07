import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface FloatingPetalsProps {
  count?: number;
}

// Pseudo-random generator with deterministic seed to satisfy React purity rules
const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
};

export const FloatingPetals: React.FC<FloatingPetalsProps> = ({ count = 14 }) => {
  const petals = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const r1 = pseudoRandom(i * 13 + 7);
      const r2 = pseudoRandom(i * 19 + 11);
      const r3 = pseudoRandom(i * 29 + 17);
      const isMarigold = i % 3 === 0;

      return {
        id: i,
        isMarigold,
        left: `${(i * 100) / count + (r1 * 6 - 3)}%`,
        delay: i * 0.65,
        duration: 8 + (i % 4) * 2.2,
        size: 14 + (i % 3) * 6,
        rotateStart: r2 * 360,
        rotateEnd: r2 * 360 + 360,
        flipXStart: r3 * 180,
        flipXEnd: r3 * 180 + 360,
        drift: (i % 2 === 0 ? 1 : -1) * (22 + (i % 5) * 8),
      };
    });
  }, [count]);

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden z-20 preserve-3d" 
      aria-hidden="true"
      style={{ perspective: '1000px' }}
    >
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            y: -50,
            x: 0,
            opacity: 0,
            rotateZ: p.rotateStart,
            rotateX: p.flipXStart,
            rotateY: 0,
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, p.drift, -p.drift * 0.6, p.drift],
            opacity: [0, 0.88, 0.88, 0],
            rotateZ: p.rotateEnd,
            rotateX: [p.flipXStart, p.flipXEnd],
            rotateY: [0, 180, 360],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-0 will-change-transform"
          style={{ left: p.left }}
        >
          {p.isMarigold ? (
            /* Traditional Auspicious Saffron-Gold Marigold (Zendu) Petal */
            <svg
              width={p.size * 0.9}
              height={p.size * 1.25}
              viewBox="0 0 28 38"
              fill="none"
              className="drop-shadow-[0_2px_8px_rgba(217,119,6,0.35)]"
            >
              <path
                d="M14 0 C22 7 28 18 24 30 C20 38 8 38 4 30 C0 18 6 7 14 0 Z"
                fill="url(#marigoldPetalGrad)"
                opacity="0.94"
              />
              <defs>
                <linearGradient id="marigoldPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="35%" stopColor="#f59e0b" />
                  <stop offset="75%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#b45309" />
                </linearGradient>
              </defs>
            </svg>
          ) : (
            /* Natural Velvety Rose Petal */
            <svg
              width={p.size}
              height={p.size * 1.3}
              viewBox="0 0 30 40"
              fill="none"
              className="drop-shadow-[0_2px_8px_rgba(136,19,55,0.4)]"
            >
              <path
                d="M15 0 C24 8 30 20 25 32 C20 40 10 40 5 32 C0 20 6 8 15 0 Z"
                fill="url(#rosePetalGrad)"
                opacity="0.92"
              />
              <defs>
                <linearGradient id="rosePetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fb7185" />
                  <stop offset="45%" stopColor="#e11d48" />
                  <stop offset="85%" stopColor="#9f1239" />
                  <stop offset="100%" stopColor="#4c0519" />
                </linearGradient>
              </defs>
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
};
