import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, ExternalLink, Copy, Check, Phone } from 'lucide-react';
import { invitationData } from '../config/invitationData';

export const VenueLocation: React.FC = () => {
  const venue = invitationData.venue ?? {
    name: 'Krushna Lawns',
    marathiName: 'कृष्णा लॉन्स',
    address: 'GGVF+FV4, Motibag naka, Sangameshwar, Malegaon, Maharashtra 423203',
    marathiAddress: 'GGVF+FV4, मोतीबाग नाका, संगमेश्वर, मालेगाव, महाराष्ट्र ४२३२०३',
    mapsUrl: 'https://maps.app.goo.gl/zydi4GQYoas6XTrv7',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2678.112104459921!2d74.5236223!3d20.5443239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bde99bd3327bbfb%3A0x428622d8186def61!2sKrushna%20Lawns!5e0!3m2!1smr!2sin!4v1700000000000!5m2!1smr!2sin',
  };

  const [copied, setCopied] = useState<boolean>(false);
  const [iframeLoaded, setIframeLoaded] = useState<boolean>(false);
  const [iframeError, setIframeError] = useState<boolean>(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(`${venue.marathiName}, ${venue.marathiAddress}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <section 
      aria-label="स्थळ व पत्ता (Venue Location)"
      className="w-full max-w-[480px] mx-auto px-3 sm:px-4 pt-10 pb-8 flex flex-col items-center text-center select-none font-marathi-serif"
    >
      
      {/* 1. Auspicious Section Header with Traditional Gold Accents */}
      <div className="flex items-center justify-center gap-3 w-full mb-3">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#d4af37]/60 to-[#ffd700]" />
        <div className="flex items-center gap-1.5 text-[#ffd700]">
          <span className="text-xs">❀</span>
          <span className="text-xs sm:text-sm font-marathi-heading font-bold tracking-widest text-[#fef08a] uppercase">
            ॥ स्थळ व पत्ता ॥
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
        विवाह व साखरपुडा स्थळ
      </motion.h3>

      <p className="text-[11px] sm:text-xs font-marathi-serif text-[#ffd700]/80 tracking-wider mb-6 italic">
        ॥ मांगल्याचे पवित्र स्थान • आपल्या स्वागतास सज्ज ॥
      </p>

      {/* 3. Main Royal Venue Card (Maharashtrian Olive-Green, Ivory Parchment & Antique Gold Motif) */}
      <motion.div 
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65 }}
        className="w-full rounded-3xl p-4 sm:p-5 text-left relative overflow-hidden bg-gradient-to-b from-[#182516]/95 via-[#131d12]/95 to-[#1a2718]/95 border border-[#d4af37]/80 shadow-[0_16px_40px_rgba(0,0,0,0.85)] backdrop-blur-md"
      >
        {/* Subtle Decorative Golden Corner Ornaments */}
        <div className="absolute top-2 left-2 text-[#d4af37]/35 text-xs pointer-events-none select-none">❖</div>
        <div className="absolute top-2 right-2 text-[#d4af37]/35 text-xs pointer-events-none select-none">❖</div>
        <div className="absolute bottom-2 left-2 text-[#d4af37]/35 text-xs pointer-events-none select-none">❖</div>
        <div className="absolute bottom-2 right-2 text-[#d4af37]/35 text-xs pointer-events-none select-none">❖</div>

        {/* Ambient Warm Golden Sheen */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br from-[#ffd700]/15 to-transparent pointer-events-none blur-2xl" />

        {/* Venue Header: Name & Pin */}
        <div className="flex items-start gap-3.5 mb-4 relative z-10">
          {/* Refined Glowing Location Pin Badge */}
          <div className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#2f432b] to-[#1c2919] border border-[#d4af37]/85 shadow-[0_4px_16px_rgba(212,175,55,0.35)] flex items-center justify-center relative group">
            <span className="absolute inset-0 rounded-2xl border border-[#ffd700] animate-sacred-halo opacity-70" />
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#ffd700] drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]" />
          </div>

          <div className="flex-1 min-w-0">
            {/* Marathi Primary Venue Name */}
            <h4 className="text-xl sm:text-2xl font-marathi-heading font-extrabold gold-foil-text tracking-wide leading-tight">
              {venue.marathiName}
            </h4>
            {/* English Subtitle */}
            <p className="text-xs sm:text-sm font-marathi-serif text-[#fef08a]/90 font-medium tracking-wide">
              {venue.name}
            </p>
          </div>
        </div>

        {/* Verified Postal Address Block in Ivory Parchment Plate */}
        <div className="w-full rounded-2xl p-3.5 sm:p-4 mb-4 relative bg-[#faf6ed]/95 text-[#241b12] border border-[#d4af37]/90 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),0_4px_14px_rgba(0,0,0,0.4)]">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] sm:text-[11px] font-marathi-heading font-bold uppercase tracking-wider text-[#7a4806]">
                संपूर्ण पत्ता (Verified Postal Address)
              </span>
              <p className="text-xs sm:text-[13px] font-marathi-serif font-bold text-[#1f1a14] leading-relaxed">
                {venue.marathiAddress}
              </p>
              <p className="text-[11px] font-sans text-[#5c4a35] font-medium leading-snug">
                {venue.address}
              </p>
            </div>

            {/* Quick Copy Address Button */}
            <button
              type="button"
              onClick={handleCopyAddress}
              aria-label="पत्ता कॉपी करा"
              title="पत्ता कॉपी करा (Copy Address)"
              className="shrink-0 p-2 rounded-xl bg-[#ede3cf] hover:bg-[#dfd2b8] active:scale-95 text-[#543810] border border-[#c29d38]/50 shadow-sm transition-all cursor-pointer flex items-center gap-1 text-[11px] font-marathi-serif"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="text-[10px] text-emerald-800 font-bold hidden sm:inline">कॉपी झाले!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#7a4806]" />
                  <span className="text-[10px] font-bold text-[#7a4806] hidden sm:inline">कॉपी</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 4. Live Interactive Google Map Viewport */}
        <div className="w-full relative rounded-2xl overflow-hidden border border-[#d4af37]/85 shadow-[0_8px_24px_rgba(0,0,0,0.7)] bg-[#10170f]">
          {/* Loading Indicator */}
          {!iframeLoaded && !iframeError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#131d12] z-10 p-4 text-center">
              <div className="w-9 h-9 rounded-full border-2 border-[#ffd700]/30 border-t-[#ffd700] animate-spin mb-2" />
              <p className="text-xs font-marathi-serif text-[#fef08a]">
                गुगल नकाशा लोड होत आहे...
              </p>
            </div>
          )}

          {/* Graceful Fallback if map fails */}
          {iframeError ? (
            <div className="w-full h-[280px] p-6 flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#182516] to-[#0e170d]">
              <MapPin className="w-10 h-10 text-[#ffd700] mb-2" />
              <h5 className="text-base font-marathi-heading font-bold text-[#fef08a] mb-1">
                {venue.marathiName} ({venue.name})
              </h5>
              <p className="text-xs font-marathi-serif text-[#fdfbf7]/80 mb-4 max-w-[280px]">
                {venue.marathiAddress}
              </p>
              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f59e0b] text-[#1c281a] font-marathi-heading text-xs font-bold shadow-lg"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>गुगल मॅप्सवर उघडा</span>
              </a>
            </div>
          ) : (
            /* Verified Live Google Maps Embed */
            <iframe
              src={venue.embedUrl}
              title="Krushna Lawns Venue Location Map"
              width="100%"
              height="300"
              style={{ border: 0, display: 'block' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setIframeLoaded(true)}
              onError={() => setIframeError(true)}
              className="w-full h-[280px] sm:h-[320px] filter saturate-[1.1] contrast-[1.05]"
            />
          )}

          {/* Map interactive badge */}
          <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#141d13]/90 text-[10px] font-marathi-serif font-semibold text-[#fef08a] border border-[#d4af37]/60 shadow-md backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              थेट नकाशा (Interactive)
            </span>
          </div>
        </div>

        {/* 5. Prominent Navigation & Directions Action Button */}
        <div className="mt-4 pt-3.5 border-t border-[#d4af37]/35 flex flex-col sm:flex-row items-center gap-2.5">
          <a
            href={venue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="नकाशावर पहा / Get Directions on Google Maps"
            className="w-full group min-h-[48px] flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f59e0b] to-[#d4af37] hover:brightness-110 active:scale-98 text-[#1a2717] font-marathi-heading text-sm sm:text-base font-extrabold shadow-[0_6px_22px_rgba(212,175,55,0.55)] border border-[#fff5cc] transition-all cursor-pointer"
          >
            <Navigation className="w-4 h-4 text-[#1a2717] group-hover:rotate-45 transition-transform" />
            <span className="tracking-wide">नकाशावर पहा • Get Directions</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#1a2717]/80 ml-0.5" />
          </a>
        </div>

        {/* Optional Venue Contact Quick Action */}
        <div className="mt-3 flex items-center justify-center gap-2 text-center">
          <a
            href="tel:09420588240"
            className="inline-flex items-center gap-1.5 text-[11px] font-marathi-serif text-[#fef08a]/85 hover:text-[#ffd700] transition-colors"
          >
            <Phone className="w-3 h-3 text-[#ffd700]" />
            <span>स्थळ संपर्क: ०९४२०५ ८८२४० (094205 88240)</span>
          </a>
        </div>

      </motion.div>

    </section>
  );
};
