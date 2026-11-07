import React from 'react';

interface GaneshaArtProps {
  className?: string;
  size?: number;
}

export const GaneshaArt: React.FC<GaneshaArtProps> = ({ className = '', size = 70 }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size * 1.1}
        viewBox="0 0 100 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        <defs>
          <linearGradient id="ganeshaGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e5a93c" />
            <stop offset="50%" stopColor="#8c1d40" />
            <stop offset="100%" stopColor="#aa771c" />
          </linearGradient>
        </defs>

        {/* Traditional Line Art Ganesha matching reference panel 5 & 6 */}
        {/* Crown (Mukut) */}
        <path
          d="M 50 10 L 42 22 L 58 22 Z"
          fill="#d4af37"
          stroke="#8c1d40"
          strokeWidth="1.2"
        />
        <circle cx="50" cy="8" r="2.5" fill="#e11d48" />

        {/* Tilak */}
        <path
          d="M 50 25 L 50 38 M 46 29 Q 50 33 54 29"
          stroke="#b91c1c"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Head and Large Ears */}
        {/* Left Ear */}
        <path
          d="M 40 28 C 24 24 20 40 28 48 C 34 54 40 48 40 40"
          stroke="url(#ganeshaGold)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        {/* Right Ear */}
        <path
          d="M 60 28 C 76 24 80 40 72 48 C 66 54 60 48 60 40"
          stroke="url(#ganeshaGold)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        {/* Forehead Arc */}
        <path
          d="M 38 32 Q 50 36 62 32"
          stroke="url(#ganeshaGold)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Eyes */}
        <ellipse cx="44" cy="38" rx="2" ry="1.2" fill="#8c1d40" />
        <ellipse cx="56" cy="38" rx="2" ry="1.2" fill="#8c1d40" />

        {/* Curved Trunk (Sond) */}
        <path
          d="M 50 38 Q 48 55 46 65 Q 44 76 52 78 Q 58 80 58 72 Q 58 66 52 68"
          stroke="url(#ganeshaGold)"
          strokeWidth="2.6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Modak in Trunk / Hand */}
        <ellipse cx="55" cy="70" rx="3.5" ry="3" fill="#f59e0b" stroke="#8c1d40" strokeWidth="1" />

        {/* Tusk */}
        <path
          d="M 44 48 L 38 52"
          stroke="#fef08a"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Subtle Om symbol accent */}
        <circle cx="50" cy="50" r="1.5" fill="#aa771c" />
      </svg>
    </div>
  );
};
