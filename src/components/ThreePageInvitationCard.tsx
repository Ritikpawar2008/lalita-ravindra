import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ChevronRight, ChevronLeft, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { EventCountdown } from './EventCountdown';
import { CeremonyTimeline } from './CeremonyTimeline';
import { VenueLocation } from './VenueLocation';
import { FamilyContacts } from './FamilyContacts';

interface ThreePageInvitationCardProps {
  onReplay: () => void;
  initialPage?: 1 | 2 | 3;
}

export const ThreePageInvitationCard: React.FC<ThreePageInvitationCardProps> = ({ 
  onReplay, 
  initialPage = 1 
}) => {
  const [currentPage, setCurrentPage] = useState<1 | 2 | 3>(initialPage);
  const [direction, setDirection] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const toggleAudio = () => {
    const audio = document.getElementById('bgMusic') as HTMLAudioElement | null;
    if (audio) {
      if (audio.paused || audio.muted) {
        audio.muted = false;
        audio.play().catch(() => {});
        setIsMuted(false);
      } else {
        audio.pause();
        setIsMuted(true);
      }
    } else {
      setIsMuted(!isMuted);
    }
  };

  const goToPage = (page: 1 | 2 | 3) => {
    if (page < 1 || page > 3 || page === currentPage) return;
    setDirection(page > currentPage ? 1 : -1);
    setCurrentPage(page);
  };

  // Touch Swipe Gesture Support for Natural Mobile Navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Trigger page turn only when horizontal swipe is distinct and exceeds 50px
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4) {
      if (deltaX < 0 && currentPage < 3) {
        goToPage((currentPage + 1) as 1 | 2 | 3);
      } else if (deltaX > 0 && currentPage > 1) {
        goToPage((currentPage - 1) as 1 | 2 | 3);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Tactile 3D Card Turn Physics (Subtle rotation angle, realistic paper ease)
  const pageVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      rotateY: dir > 0 ? 6 : -6,
      opacity: 0,
      scale: 0.97,
    }),
    center: {
      x: '0%',
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
        rotateY: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.35, ease: 'easeOut' },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      rotateY: dir > 0 ? -6 : 6,
      opacity: 0,
      scale: 0.97,
      transition: {
        x: { duration: 0.44, ease: [0.22, 1, 0.36, 1] },
        rotateY: { duration: 0.44, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.28, ease: 'easeIn' },
      },
    }),
  };

  const pages = [
    { id: 1, src: '/images/3rd.png', alt: '॥ श्री गणेशाय नमः ॥ - Ganpati Bappa Welcome' },
    { id: 2, src: '/images/4th.png', alt: 'साखरपुडा सोहळा - Bride & Groom Sakharpuda' },
    { id: 3, src: '/images/5th.png', alt: '॥ निमंत्रण ॥ - Family Invitation' },
  ];

  return (
    <div 
      className="fixed inset-0 w-full h-full min-h-[100vh] h-[100dvh] flex flex-col items-center justify-center bg-[#0d0207] overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      
      {/* Top Floating Controls Bar with Safe-Area Inset Support */}
      <div 
        className="fixed inset-x-0 w-full max-w-[480px] mx-auto z-40 flex items-center justify-between px-3.5 sm:px-5 pointer-events-auto"
        style={{
          top: 'max(12px, calc(env(safe-area-inset-top, 0px) + 8px))',
        }}
      >
        {/* Page progress indicator with embossed gold border */}
        <div className="flex items-center gap-1.5 bg-[#230510]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#d4af37]/60 shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => goToPage(num as 1 | 2 | 3)}
              aria-label={`पान ${num}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentPage === num
                  ? 'w-6 bg-gradient-to-r from-[#ffd700] via-[#fef08a] to-[#f59e0b] shadow-[0_0_8px_rgba(255,215,0,0.6)]'
                  : 'w-2 bg-[#d4af37]/40 hover:bg-[#d4af37]/75'
              }`}
            />
          ))}
          <span className="text-[11px] font-marathi-heading text-[#fef08a] font-bold ml-1.5 tracking-wide">
            पान {currentPage}/३
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Background Music Mute / Unmute Button */}
          <button
            type="button"
            onClick={toggleAudio}
            aria-label={isMuted ? "संगीत सुरु करा (Unmute music)" : "संगीत बंद करा (Mute music)"}
            className="p-2 rounded-full bg-[#230510]/90 text-[#ffd700] hover:text-white border border-[#d4af37]/60 shadow-[0_4px_16px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all active:scale-95 cursor-pointer"
            title={isMuted ? "संगीत सुरु करा" : "संगीत बंद करा"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Restart Ceremony Icon */}
          <button
            type="button"
            onClick={onReplay}
            aria-label="पुन्हा पहा"
            className="p-2 rounded-full bg-[#230510]/90 text-[#ffd700] hover:text-white border border-[#d4af37]/60 shadow-[0_4px_16px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all active:scale-95 cursor-pointer"
            title="पुन्हा सुरु करा (Restart Ceremony)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Full-Screen Edge-to-Edge Invitation Page Viewport with 3D Perspective */}
      <div 
        className="relative w-full h-full min-h-[100vh] h-[100dvh] flex items-center justify-center overflow-hidden"
        style={{ perspective: '1200px' }}
      >
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={`invitation-page-${currentPage}`}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full min-h-[100vh] flex items-center justify-center overflow-hidden preserve-3d"
          >
            {currentPage === 3 ? (
              /* Page 3: Natural vertical scroll container to reveal live event countdown below family invitation */
              <div className="w-full h-full min-h-[100vh] overflow-y-auto overflow-x-hidden flex flex-col items-center pointer-events-auto">
                {/* 1. Full-Screen Exact 5th.png Family Invitation (Unshrunk, Unaltered) */}
                <div className="relative w-full h-full min-h-[100vh] h-[100dvh] shrink-0 flex items-center justify-center">
                  <img
                    src="/images/5th.png"
                    alt="॥ निमंत्रण ॥ - Family Invitation"
                    className="w-full h-full min-h-[100vh] min-w-full object-cover object-center pointer-events-none drop-shadow-[0_12px_40px_rgba(0,0,0,0.92)]"
                  />
                  {/* Floating scroll cue positioned cleanly above mobile navigation with enhanced visibility */}
                  <div 
                    className="absolute inset-x-0 flex flex-col items-center justify-center pointer-events-none z-25 px-4"
                    style={{
                      bottom: 'max(132px, calc(env(safe-area-inset-bottom, 0px) + 116px))',
                    }}
                  >
                    <motion.div 
                      animate={{ y: [0, 4, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-[#faf6ed]/96 via-[#fffdf9]/98 to-[#faf6ed]/96 border-2 border-[#d4af37] shadow-[0_8px_24px_rgba(0,0,0,0.7),0_0_14px_rgba(212,175,55,0.35)] backdrop-blur-md max-w-[92vw]"
                    >
                      <span className="text-xs sm:text-[13px] font-marathi-heading font-extrabold text-[#382308] tracking-wide whitespace-nowrap drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">
                        कार्यक्रम, स्थळ व वेळ पाहण्यासाठी खाली स्क्रोल करा
                      </span>
                      <span className="text-[#b8860b] text-xs font-bold shrink-0">
                        ▼
                      </span>
                    </motion.div>
                  </div>
                </div>

                {/* 2. Maharashtrian Ceremony Schedule Timeline */}
                <CeremonyTimeline />

                {/* 3. Venue Location & Interactive Google Map */}
                <VenueLocation />

                {/* 4. Event Date & Live Countdown Section Below */}
                <EventCountdown />

                {/* 5. Family Contacts Section at the End */}
                <FamilyContacts />
              </div>
            ) : currentPage === 2 ? (
              /* Page 2: Full-Screen Edge-to-Edge 4th.png Invitation Artwork */
              <div className="relative w-full h-full min-h-[100vh] h-[100dvh] w-[100vw] flex items-center justify-center overflow-hidden pointer-events-auto">
                {/* Desktop ambient warm glow backdrop — prevents black gaps on ultra-wide / landscape displays */}
                <div 
                  className="hidden md:block absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
                  aria-hidden="true"
                >
                  <img
                    src="/images/4th.png"
                    alt=""
                    className="w-full h-full object-cover object-center filter blur-3xl scale-125 opacity-40 brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0d0207]/60 via-transparent to-[#0d0207]/80" />
                </div>

                {/* Main Full-Screen Invitation Artwork */}
                <img
                  src="/images/4th.png"
                  alt="साखरपुडा सोहळा - ची.सौ.कां. ललिता आणि ची. रवींद्र"
                  className="relative z-10 w-full h-full min-h-[100vh] h-[100dvh] object-cover object-center pointer-events-none md:w-auto md:max-w-full md:h-full md:object-contain drop-shadow-[0_0_50px_rgba(0,0,0,0.9)]"
                />
              </div>
            ) : (
              /* Page 1: Full-screen exact artwork image */
              <img
                src={pages[currentPage - 1].src}
                alt={pages[currentPage - 1].alt}
                className="w-full h-full min-h-[100vh] min-w-full object-cover object-center pointer-events-none drop-shadow-[0_12px_40px_rgba(0,0,0,0.92)]"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Floating Navigation Pill — Mobile-Optimized with Safe-Area Inset Support */}
      <div 
        className="fixed inset-x-0 z-40 flex items-center justify-center gap-2.5 sm:gap-3 px-3 sm:px-4 pointer-events-auto"
        style={{
          bottom: 'max(24px, calc(env(safe-area-inset-bottom, 0px) + 16px))',
        }}
      >
        {currentPage > 1 && (
          <button
            type="button"
            onClick={() => goToPage((currentPage - 1) as 1 | 2 | 3)}
            aria-label="मागील पान (Previous Page)"
            className="min-h-[44px] flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-[#2a0614]/94 hover:bg-[#3d091e] active:scale-95 text-[#ffe4a0] font-marathi-heading text-xs sm:text-sm font-bold border border-[#d4af37]/75 shadow-[0_6px_20px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all cursor-pointer select-none"
          >
            <ChevronLeft className="w-4 h-4 text-[#ffd700] shrink-0" />
            <span className="whitespace-nowrap">मागील पान</span>
          </button>
        )}

        {currentPage < 3 ? (
          <button
            type="button"
            onClick={() => goToPage((currentPage + 1) as 1 | 2 | 3)}
            aria-label="पुढील पान (Next Page)"
            className="min-h-[44px] group flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#580d24] via-[#751131] to-[#580d24] hover:brightness-110 active:scale-95 text-[#fff6df] font-marathi-heading text-xs sm:text-sm font-bold border border-[#d4af37]/85 shadow-[0_6px_24px_rgba(88,13,36,0.7)] backdrop-blur-md transition-all cursor-pointer select-none"
          >
            <span className="whitespace-nowrap">पुढील पान</span>
            <ChevronRight className="w-4 h-4 text-[#ffd700] shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onReplay}
            aria-label="पुन्हा पहा (Restart Ceremony)"
            className="min-h-[44px] group flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f59e0b] to-[#d4af37] hover:brightness-110 active:scale-95 text-[#2c0514] font-marathi-heading text-xs sm:text-sm font-bold shadow-[0_6px_24px_rgba(212,175,55,0.6)] transition-all cursor-pointer select-none"
          >
            <RotateCcw className="w-4 h-4 text-[#2c0514] shrink-0 group-hover:-rotate-90 transition-transform" />
            <span className="whitespace-nowrap">पुन्हा पहा</span>
          </button>
        )}
      </div>

    </div>
  );
};
