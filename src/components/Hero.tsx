import React from 'react';
import { EmailCaptureForm } from './EmailCaptureForm';
import heroStudioImg from '../assets/images/hero_studio_dusk_1794058134139.jpg';

interface HeroProps {
  onCaptureSuccess?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCaptureSuccess }) => {
  return (
    <section data-enter className="bg-[#FAFAF7] section-spacing pt-12 md:pt-16 pb-20 md:pb-24 overflow-hidden">
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Copy column (left) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF] border border-[#E3E1DA] rounded-[6px] text-[13px] font-mono text-[#5C665F] mb-6">
              <span className="font-semibold text-[#16211B]">DISASTER RECOVERY ARCHITECTURE</span>
              <span className="text-[#E3E1DA]">|</span>
              <span className="text-[#0E7A45] font-semibold">2026 EDITION</span>
            </div>

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
              className="mb-8 w-full max-w-[540px]"
            />

            {/* Supported platforms micro-row */}
            <div className="flex flex-wrap items-center gap-2 mb-8 text-[12px] font-mono text-[#5C665F]">
              <span className="text-[#16211B] font-semibold">ARCHIVES:</span>
              {['YouTube', 'Instagram', 'TikTok', 'Patreon', 'Substack', 'Stripe CRM'].map((plat) => (
                <span
                  key={plat}
                  className="px-2.5 py-0.5 bg-[#FFFFFF] border border-[#E3E1DA] rounded-[4px] text-[#16211B]"
                >
                  {plat}
                </span>
              ))}
            </div>

            {/* Credibility line verbatim from brief */}
            <div className="pt-4 border-t border-[#E3E1DA] w-full max-w-[620px]">
              <p className="text-small text-[#5C665F] leading-relaxed">
                <span className="font-semibold text-[#16211B]">Recorded precedent:</span> YouTube removed 2.7 million channels in Q2 2026. One creator lost $34,000 a month in six minutes — with no human to call.
              </p>
            </div>
          </div>

          {/* Hero visual (right) - taste-skill clean visual, no overlaid captions, photo zoom on hover */}
          <div className="lg:col-span-5 relative group">
            <div className="relative rounded-[8px] overflow-hidden border border-[#E3E1DA] bg-[#16211B] shadow-xs">
              <img
                src={heroStudioImg}
                alt="Creator studio quiet at dusk with locked account screen and single green EXIT sign glow"
                className="w-full h-auto aspect-4/3 object-cover block taste-photo-zoom"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

