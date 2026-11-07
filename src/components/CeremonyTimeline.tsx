import React from 'react';
import { motion } from 'framer-motion';

interface TimelineEvent {
  id: number;
  title: string;
  time: string;
  timeEn: string;
  marathiNum: string;
  icon: React.ReactNode;
}



export const CeremonyTimeline: React.FC = () => {
  const events: TimelineEvent[] = [
    {
      id: 1,
      title: 'गणेश आणि सुपारी',
      time: 'सकाळी १०:३० वाजता',
      timeEn: '10:30 AM',
      marathiNum: '१',
      icon: (
        /* Traditional Ganesha / Supari Auspicious Icon */
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#ffd700] fill-current" aria-hidden="true">
          <path d="M12 2C10.5 2 9 3.2 9 4.8C9 5.8 9.5 6.6 10.2 7.2C8.3 8 7 9.8 7 12C7 13.8 8 15.3 9.5 16.1C9.2 16.8 9 17.6 9 18.5C9 20.4 10.5 22 12.5 22C14.5 22 16 20.4 16 18.5C16 17.6 15.6 16.8 15 16.2C16.8 15.4 18 13.8 18 12C18 9.8 16.7 8 14.8 7.2C15.5 6.6 16 5.8 16 4.8C16 3.2 14.5 2 12 2ZM12 4C13.1 4 14 4.9 14 6C14 7.1 13.1 8 12 8C10.9 8 10 7.1 10 6C10 4.9 10.9 4 12 4ZM12.5 18C12.8 18 13 18.2 13 18.5C13 18.8 12.8 19 12.5 19C12.2 19 12 18.8 12 18.5C12 18.2 12.2 18 12.5 18Z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'साखरपुडा सोहळा',
      time: 'सकाळी ११:३० वाजता',
      timeEn: '11:30 AM',
      marathiNum: '२',
      icon: (
        /* Traditional Sakharpuda / Shagun Kalash Icon */
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#ffd700] fill-current" aria-hidden="true">
          <path d="M12 2C12 2 9 5 9 7C9 8.1 9.9 9 11 9H13C14.1 9 15 8.1 15 7C15 5 12 2 12 2ZM7 10C6.4 10 6 10.4 6 11L7 17C7 19.2 9.2 21 12 21C14.8 21 17 19.2 17 17L18 11C18 10.4 17.6 10 17 10H7ZM12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13Z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: 'रिंग सेरेमनी',
      time: 'दुपारी १:०० वाजता',
      timeEn: '1:00 PM',
      marathiNum: '३',
      icon: (
        /* Sparkling Engagement Ring Icon */
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#ffd700] fill-current" aria-hidden="true">
          <path d="M12 2L15 6L12 8L9 6L12 2ZM12 9C7.6 9 4 12.6 4 17C4 20.3 6.7 23 10 23C13.3 23 16 20.3 16 17C16 14.8 14.8 12.9 13 11.9V9.5C12.7 9.5 12.3 9.5 12 9ZM10 12C12.8 12 15 14.2 15 17C15 19.8 12.8 22 10 22C7.2 22 5 19.8 5 17C5 14.2 7.2 12 10 12Z" />
        </svg>
      ),
    },
    {
      id: 4,
      title: 'स्नेहभोजन',
      time: 'दुपारी २:०० वाजता',
      timeEn: '2:00 PM',
      marathiNum: '४',
      icon: (
        /* Traditional Maharashtrian Feast / Thali Icon */
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#ffd700] fill-current" aria-hidden="true">
          <path d="M12 3C6.5 3 2 7.5 2 13C2 18.5 6.5 23 12 23C17.5 23 22 18.5 22 13C22 7.5 17.5 3 12 3ZM12 5C16.4 5 20 8.6 20 13C20 17.4 16.4 21 12 21C7.6 21 4 17.4 4 13C4 8.6 7.6 5 12 5ZM8 10C7.2 10 6.5 10.7 6.5 11.5C6.5 12.3 7.2 13 8 13C8.8 13 9.5 12.3 9.5 11.5C9.5 10.7 8.8 10 8 10ZM16 10C15.2 10 14.5 10.7 14.5 11.5C14.5 12.3 15.2 13 16 13C16.8 13 17.5 12.3 17.5 11.5C17.5 10.7 16.8 10 16 10ZM12 14C10.6 14 9.5 15.1 9.5 16.5C9.5 17.9 10.6 19 12 19C13.4 19 14.5 17.9 14.5 16.5C14.5 15.1 13.4 14 12 14Z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full max-w-[480px] mx-auto px-3 sm:px-4 pt-10 pb-10 sm:pb-14 flex flex-col items-center text-center select-none font-marathi-serif">
      
      {/* 1. Auspicious Section Header with Traditional Gold Lotus Accents */}
      <div className="flex items-center justify-center gap-3 w-full mb-3">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#d4af37]/60 to-[#ffd700]" />
        <div className="flex items-center gap-1.5 text-[#ffd700]">
          <span className="text-xs">❀</span>
          <span className="text-xs sm:text-sm font-marathi-heading font-bold tracking-widest text-[#fef08a] uppercase">
            ॥ कार्यक्रम पत्रिका ॥
          </span>
          <span className="text-xs">❀</span>
        </div>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#d4af37]/60 to-[#ffd700]" />
      </div>

      {/* 2. Main Title in Royal Marathi Gradient Typography */}
      <motion.h3 
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55 }}
        className="text-xl sm:text-2xl font-marathi-title font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] via-[#fef08a] to-[#f59e0b] tracking-wide mb-1 drop-shadow-sm"
      >
        सोहळा कार्यक्रम
      </motion.h3>

      <p className="text-[11px] sm:text-xs font-marathi-serif text-[#ffd700]/80 tracking-wider mb-6 italic">
        ॥ मांगल्याचे क्षण • आपल्या उपस्थितीत ॥
      </p>

      {/* 3. The Alternating Left-Right Timeline */}
      <div className="relative w-full py-3 my-2">
        
        {/* Continuous Central Golden Vertical Line */}
        <div 
          className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#ffd700] via-60% to-transparent pointer-events-none"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 10px rgba(212, 175, 55, 0.45), 0 0 4px rgba(255, 215, 0, 0.6)',
          }}
        />

        {/* Four Chronological Event Cards Alternating Left and Right */}
        <div className="flex flex-col gap-5 sm:gap-6 w-full">
          {events.map((evt, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <div 
                key={`timeline-event-${evt.id}`}
                className={`relative flex items-center w-full ${isLeft ? 'justify-start' : 'justify-end'}`}
              >
                {/* Center Node / Bindu on the golden line */}
                <motion.div 
                  initial={{ scale: 0.4, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="absolute z-20 flex items-center justify-center rounded-full bg-gradient-to-br from-[#ffd700] via-[#d4af37] to-[#8c6519] border-2 border-[#fff3cc] shadow-[0_0_14px_rgba(212,175,55,0.8)]"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '30px',
                    height: '30px',
                  }}
                >
                  <span className="text-[12px] font-marathi-heading font-extrabold text-[#240612] leading-none">
                    {evt.marathiNum}
                  </span>
                </motion.div>

                {/* Horizontal Connector Arm linking Card to Center Line */}
                <div 
                  className={`absolute top-1/2 h-[1.5px] pointer-events-none ${
                    isLeft 
                      ? 'right-[calc(50%-1px)] bg-gradient-to-r from-[#d4af37]/60 via-[#ffd700] to-[#ffd700]' 
                      : 'left-[calc(50%-1px)] bg-gradient-to-l from-[#d4af37]/60 via-[#ffd700] to-[#ffd700]'
                  }`}
                  style={{
                    width: '20px',
                    transform: 'translateY(-50%)',
                  }}
                />

                {/* Event Card (Ivory Handcrafted Parchment with Antique Gold Filigree Accents) */}
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -25 : 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.58, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.025 }}
                  className={`w-[calc(50%-20px)] sm:w-[calc(50%-24px)] p-3 sm:p-3.5 rounded-2xl parchment-card border border-[#d4af37]/80 relative overflow-hidden flex flex-col items-center text-center group transition-shadow duration-300 ${
                    isLeft ? 'rotate-[-0.75deg]' : 'rotate-[0.75deg]'
                  }`}
                >
                  {/* Subtle Corner Botanical Filigree Accents */}
                  <div className="absolute top-1.5 left-2 text-[#b38728] text-[10px] pointer-events-none select-none opacity-60">
                    ❖
                  </div>
                  <div className="absolute top-1.5 right-2 text-[#b38728] text-[10px] pointer-events-none select-none opacity-60">
                    ❖
                  </div>
                  <div className="absolute bottom-1.5 left-2 text-[#b38728] text-[9px] pointer-events-none select-none opacity-50">
                    •
                  </div>
                  <div className="absolute bottom-1.5 right-2 text-[#b38728] text-[9px] pointer-events-none select-none opacity-50">
                    •
                  </div>

                  {/* Delicate Inner Inset Border */}
                  <div className="absolute inset-1.5 rounded-xl border border-[#d4af37]/35 pointer-events-none" />

                  {/* Auspicious Round Event Icon Badge */}
                  <div className="relative z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#580d24] via-[#6f112e] to-[#3d091e] border border-[#ffd700]/70 shadow-[0_3px_10px_rgba(88,13,36,0.45)] flex items-center justify-center mb-1.5">
                    {evt.icon}
                  </div>

                  {/* Event Title in Royal Maroon Typography */}
                  <h4 className="relative z-10 font-marathi-heading font-extrabold text-[#3a081c] text-xs sm:text-[13px] tracking-wide leading-snug mb-1">
                    {evt.title}
                  </h4>

                  {/* Prominent Gold & Maroon Time Badge */}
                  <div className="relative z-10 inline-flex items-center justify-center gap-1 px-2.5 py-0.5 rounded-full bg-[#580d24]/10 border border-[#d4af37]/75 shadow-xs">
                    <span className="text-[10px] sm:text-[11px] font-marathi-heading font-bold text-[#6d112e] whitespace-nowrap">
                      {evt.time}
                    </span>
                  </div>

                  {/* Subtle English Time subtext */}
                  <span className="relative z-10 text-[9px] font-sans text-[#6d112e]/70 font-semibold mt-0.5 tracking-wider">
                    {evt.timeEn}
                  </span>
                </motion.div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Bottom Flourish */}
      <div className="flex items-center justify-center gap-2 text-[#ffd700]/50 text-xs mt-3 mb-2">
        <span>❖</span>
        <span>•</span>
        <span>❀</span>
        <span>•</span>
        <span>❖</span>
      </div>

    </section>
  );
};
