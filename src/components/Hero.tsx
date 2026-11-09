import React from 'react';
import { EmailCaptureForm } from './EmailCaptureForm';
import heroStudioImg from '../assets/images/hero_studio_dusk_1794058134139.jpg';

interface HeroProps {
  onCaptureSuccess?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCaptureSuccess }) => {
  return (
    <section className="bg-[#FAFAF7] section-spacing pt-12 md:pt-16 pb-20 md:pb-24">
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Copy column (left) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <h1 className="heading-h1 text-[#16211B] mb-5 tracking-tight">
              Your account can vanish overnight. Your business doesn't have to.
            </h1>

            <p className="text-body text-[#5C665F] max-w-[58ch] mb-8 leading-[1.6]">
              Encrypted archives, a standby site, and drill-tested recovery for creators earning $5K+/month — and the agencies who manage them.
            </p>

            {/* Email Capture Form directly in Hero */}
            <EmailCaptureForm
              source="hero"
              onSuccess={onCaptureSuccess}
              className="mb-8"
            />

            {/* Credibility line verbatim from brief */}
            <div className="pt-4 border-t border-[#E3E1DA] w-full max-w-[620px]">
              <p className="text-small text-[#5C665F] leading-relaxed">
                <span className="font-semibold text-[#16211B]">Recorded precedent:</span> YouTube removed 2.7 million channels in Q2 2026. One creator lost $34,000 a month in six minutes — with no human to call.
              </p>
            </div>
          </div>

          {/* Hero visual (right) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[8px] overflow-hidden border border-[#E3E1DA] bg-[#16211B]">
              <img
                src={heroStudioImg}
                alt="Creator studio quiet at dusk with locked account screen and single green EXIT sign glow"
                className="w-full h-auto aspect-4/3 object-cover block"
                loading="eager"
              />
              {/* Subtle caption badge */}
              <div className="absolute bottom-3 left-3 right-3 bg-[#16211B]/85 backdrop-blur-xs px-3.5 py-2 rounded-[6px] border border-white/10 flex items-center justify-between">
                <span className="text-[12px] font-mono text-[#FAFAF7]/80">
                  INCIDENT 04:19 PM · ACCOUNT LOCKED
                </span>
                <span className="text-[11px] font-mono font-medium text-[#FFFFFF] bg-[#0E7A45] px-2 py-0.5 rounded-[4px]">
                  STANDBY READY
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
