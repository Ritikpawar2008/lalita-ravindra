import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Target Event Date & Time: 5 December 2026, 10:00 AM in Asia/Kolkata (+05:30)
const TARGET_TIMESTAMP = new Date('2026-12-05T10:00:00+05:30').getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

const calculateTimeLeft = (): TimeLeft => {
  const now = Date.now();
  const diff = TARGET_TIMESTAMP - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isPast: false };
};

const toMarathiDigits = (num: number, minLength: number = 2): string => {
  const marathiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  const formatted = num.toString().padStart(minLength, '0');
  return formatted
    .split('')
    .map((char) => marathiDigits[parseInt(char, 10)] ?? char)
    .join('');
};

export const EventCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    // Update live countdown every second
    const timer = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Guaranteed cleanup on unmount
    return () => window.clearInterval(timer);
  }, []);

  const units = [
    { 
      label: 'दिवस', 
      labelEn: 'DAYS', 
      value: timeLeft.days, 
      marathiVal: toMarathiDigits(timeLeft.days, 2) 
    },
    { 
      label: 'तास', 
      labelEn: 'HOURS', 
      value: timeLeft.hours, 
      marathiVal: toMarathiDigits(timeLeft.hours, 2) 
    },
    { 
      label: 'मिनिटे', 
      labelEn: 'MINUTES', 
      value: timeLeft.minutes, 
      marathiVal: toMarathiDigits(timeLeft.minutes, 2) 
    },
    { 
      label: 'सेकंद', 
      labelEn: 'SECONDS', 
      value: timeLeft.seconds, 
      marathiVal: toMarathiDigits(timeLeft.seconds, 2) 
    },
  ];

  return (
    <section 
      aria-label="साखरपुड्याला उरलेला वेळ (Countdown)"
      className="w-full max-w-[480px] mx-auto px-3 sm:px-4 pt-6 pb-36 flex flex-col items-center text-center select-none font-marathi-serif"
    >
      
      {/* 1. Ornamental Gold Lotus Divider */}
      <div className="flex items-center justify-center gap-3 w-full mb-5">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#d4af37]/60 to-[#ffd700]" />
        <div className="flex items-center gap-1.5 text-[#ffd700]">
          <span className="text-xs">❀</span>
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#ffd700] fill-current drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]" viewBox="0 0 24 24">
            <path d="M12 2C12 2 10 7 10 9C10 10.1 10.9 11 12 11C13.1 11 14 10.1 14 9C14 7 12 2 12 2ZM6.5 6C6.5 6 7.5 9.5 8.5 11C9.5 12.5 10.5 13 10.5 13C10.5 13 9 12.5 7.5 11C6 9.5 6.5 6 6.5 6ZM17.5 6C17.5 6 18 9.5 16.5 11C15 12.5 13.5 13 13.5 13C13.5 13 14.5 12.5 15.5 11C16.5 9.5 17.5 6 17.5 6ZM12 13C10.3 13 9 14.3 9 16C9 17.7 10.3 19 12 19C13.7 19 15 17.7 15 16C15 14.3 13.7 13 12 13Z" />
          </svg>
          <span className="text-xs">❀</span>
        </div>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#d4af37]/60 to-[#ffd700]" />
      </div>

      {/* 2. Heading: साखरपुड्याला उरलेला वेळ */}
      <motion.h3 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="text-lg sm:text-xl font-marathi-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] via-[#fef08a] to-[#f59e0b] tracking-wide mb-3 drop-shadow-sm"
      >
        साखरपुड्याला उरलेला वेळ
      </motion.h3>

      {/* 3. Exact Sakharpuda Date Display: शनिवार, ५ डिसेंबर २०२६ */}
      <div className="flex flex-col items-center gap-2 mb-6">
        <div className="text-xl sm:text-2xl md:text-3xl font-marathi-heading font-extrabold gold-foil-text tracking-wide leading-snug">
          शनिवार, ५ डिसेंबर २०२६
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1b271a]/95 border border-[#d4af37]/80 text-[11px] sm:text-xs font-semibold text-[#fef08a] shadow-[0_4px_14px_rgba(0,0,0,0.6)] backdrop-blur-sm">
          <span>शुभ मुहूर्त: सकाळी १०:०० वाजता</span>
          <span className="text-[#d4af37] opacity-60">•</span>
          <span>५ / १२ / २०२६</span>
        </div>
      </div>

      {/* 4. Live 4-Unit Countdown Cards (Ivory Background with Antique-Gold Accents) */}
      {timeLeft.isPast ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[390px] p-5 rounded-3xl bg-gradient-to-b from-[#faf6ed] via-[#fffdf9] to-[#f5eedc] border-2 border-[#d4af37] shadow-[0_12px_32px_rgba(0,0,0,0.7)] text-center relative overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#ffd700] to-transparent" />
          <p className="text-xl sm:text-2xl font-marathi-heading font-extrabold text-[#4a2e0a] tracking-wide mb-1 drop-shadow-sm">
            आज आपल्या आनंदाचा शुभ दिवस!
          </p>
          <p className="text-xs sm:text-sm font-marathi-serif text-[#7a4806] font-bold">
            ॥ शुभ साखरपुडा सोहळा संपन्न होत आहे ॥
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full max-w-[360px] sm:max-w-[410px]">
          {units.map((unit) => (
            <motion.div
              key={unit.label}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center justify-center py-3 px-1 sm:py-3.5 sm:px-2 rounded-2xl bg-gradient-to-b from-[#fdfbf7] via-[#faf5eb] to-[#f2e7d7] border-2 border-[#d4af37] shadow-[0_8px_20px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.95)] relative overflow-hidden transition-all duration-300 min-w-0"
            >
              {/* Subtle top antique gold metallic trim bevel */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

              {/* Big Marathi Numerals in rich antique bronze-gold (Tabular nums prevent jitter) */}
              <span className="text-2xl sm:text-3xl font-marathi-heading font-extrabold text-[#54340a] tracking-tight leading-none tabular-nums drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)] mb-0.5">
                {unit.marathiVal}
              </span>

              {/* English Digits Sub-indicator */}
              <span className="text-[10px] text-[#855f30] font-sans font-bold tabular-nums mb-1 leading-tight">
                {unit.value.toString().padStart(2, '0')}
              </span>

              {/* Marathi Unit Label */}
              <span className="text-[11px] sm:text-xs font-marathi-serif font-extrabold text-[#2a1a06] tracking-wide leading-tight">
                {unit.label}
              </span>

              {/* English Unit Label */}
              <span className="text-[9px] uppercase tracking-wider text-[#755024] font-sans font-bold mt-0.5 leading-none">
                {unit.labelEn}
              </span>
            </motion.div>
          ))}
        </div>
      )}

      {/* 5. Auspicious Blessing & Bottom Floral Ornament */}
      <div className="mt-7 flex flex-col items-center gap-2">
        <p className="text-xs sm:text-sm font-marathi-serif text-[#ffd700]/90 italic tracking-wider">
          ॥ शुभं भवतु • आपली उपस्थिती प्रार्थनीय आहे ॥
        </p>
        <div className="flex items-center gap-2 text-[#d4af37]/60 text-xs">
          <span>❖</span>
          <span>•</span>
          <span>❀</span>
          <span>•</span>
          <span>❖</span>
        </div>
      </div>

    </section>
  );
};
