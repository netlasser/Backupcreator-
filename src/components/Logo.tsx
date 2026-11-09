import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 26 }) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Flat vector emblem: life ring (#0E7A45) encircling solid play-button triangle (#16211B) */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden="true"
      >
        {/* Outer life ring */}
        <circle cx="16" cy="16" r="12.5" stroke="#0E7A45" strokeWidth="4" />
        {/* 4 Life ring strap marks in crisp white */}
        <line x1="16" y1="2" x2="16" y2="7.5" stroke="#FFFFFF" strokeWidth="2.5" />
        <line x1="16" y1="24.5" x2="16" y2="30" stroke="#FFFFFF" strokeWidth="2.5" />
        <line x1="2" y1="16" x2="7.5" y2="16" stroke="#FFFFFF" strokeWidth="2.5" />
        <line x1="24.5" y1="16" x2="30" y2="16" stroke="#FFFFFF" strokeWidth="2.5" />
        {/* Center play triangle in solid #16211B */}
        <polygon points="13.5,11.5 20.5,16 13.5,20.5" fill="#16211B" />
      </svg>
      <span className="font-heading font-bold text-[19px] tracking-[-0.015em] text-[#16211B]">
        BackupCreator
      </span>
    </div>
  );
};
