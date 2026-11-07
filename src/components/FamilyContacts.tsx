import React from 'react';
import { motion } from 'framer-motion';
import { Phone, PhoneCall } from 'lucide-react';

interface ContactPerson {
  id: number;
  name: string;
  phone: string;
  displayPhone: string;
}

const FAMILY_CONTACTS: ContactPerson[] = [
  {
    id: 1,
    name: 'श्री. संतोष बाळू पवार',
    phone: '9892880411',
    displayPhone: '9892880411',
  },
  {
    id: 2,
    name: 'सौ. उषा संतोष पवार',
    phone: '8928340652',
    displayPhone: '8928340652',
  },
];

export const FamilyContacts: React.FC = () => {
  return (
    <section 
      aria-label="अधिक माहितीसाठी संपर्क साधा (Family Contacts)"
      className="w-full max-w-[480px] mx-auto px-3 sm:px-4 pt-10 pb-28 sm:pb-32 flex flex-col items-center text-center select-none font-marathi-serif"
    >
      {/* 1. Auspicious Section Header with Traditional Gold Accents */}
      <div className="flex items-center justify-center gap-3 w-full mb-3">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#d4af37]/60 to-[#ffd700]" />
        <div className="flex items-center gap-1.5 text-[#ffd700]">
          <span className="text-xs">❀</span>
          <span className="text-xs sm:text-sm font-marathi-heading font-bold tracking-widest text-[#fef08a] uppercase">
            ॥ संपर्क ॥
          </span>
          <span className="text-xs">❀</span>
        </div>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#d4af37]/60 to-[#ffd700]" />
      </div>

      {/* 2. Royal Marathi Section Title */}
      <motion.h3 
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55 }}
        className="text-xl sm:text-2xl font-marathi-title font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] via-[#fef08a] to-[#f59e0b] tracking-wide mb-1 drop-shadow-sm"
      >
        अधिक माहितीसाठी संपर्क साधा
      </motion.h3>

      <p className="text-[11px] sm:text-xs font-marathi-serif text-[#ffd700]/80 tracking-wider mb-6 italic">
        ॥ आपल्या स्वागतासाठी सदैव तत्पर ॥
      </p>

      {/* 3. Elegant Family Contact Cards (Matching Olive-Green and Antique-Gold Theme) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
        {FAMILY_CONTACTS.map((person, idx) => (
          <motion.div
            key={person.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.12 }}
            className="w-full rounded-2xl p-4 sm:p-4.5 text-left relative overflow-hidden bg-gradient-to-b from-[#182516]/95 via-[#131d12]/95 to-[#1a2718]/95 border border-[#d4af37]/80 shadow-[0_12px_28px_rgba(0,0,0,0.7)] backdrop-blur-md flex flex-col justify-between group hover:border-[#ffd700] transition-all"
          >
            {/* Subtle Golden Corner Accent */}
            <div className="absolute top-2 right-2 text-[#d4af37]/35 text-[10px] pointer-events-none select-none">❖</div>

            {/* Person Name & Role */}
            <div className="flex items-start gap-3 mb-3">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#2f432b] to-[#1c2919] border border-[#d4af37]/75 shadow-sm flex items-center justify-center text-[#ffd700] group-hover:scale-105 transition-transform">
                <Phone className="w-4 h-4 text-[#ffd700]" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm sm:text-base font-marathi-heading font-extrabold text-[#fef08a] tracking-wide leading-tight">
                  {person.name}
                </h4>
                <span className="text-[10px] sm:text-[11px] font-marathi-serif text-[#ffd700]/75">
                  पवार परिवार
                </span>
              </div>
            </div>

            {/* Clickable Mobile Dialer Button */}
            <a
              href={`tel:${person.phone}`}
              aria-label={`${person.name} यांना कॉल करा (${person.displayPhone})`}
              className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-[#2a3c26]/90 hover:bg-[#344b2f] active:scale-[0.98] text-[#faf6ed] border border-[#d4af37]/65 shadow-inner transition-all cursor-pointer pointer-events-auto"
            >
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-[#ffd700] shrink-0 animate-pulse" />
                <span className="text-xs sm:text-[13px] font-sans font-bold tracking-wider text-[#fff7df]">
                  +91 {person.displayPhone}
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-marathi-heading font-semibold text-[#fef08a] bg-[#d4af37]/25 px-2 py-0.5 rounded-md border border-[#d4af37]/40">
                कॉल करा
              </span>
            </a>
          </motion.div>
        ))}
      </div>

      {/* Warm Traditional Note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mt-6 text-[11px] sm:text-xs font-marathi-serif text-[#ffd700]/70 tracking-widest text-center italic"
      >
        ॥ सस्नेह निमंत्रण • सहकुटुंब सहपरिवार उपस्थित राहावे ॥
      </motion.p>
    </section>
  );
};
