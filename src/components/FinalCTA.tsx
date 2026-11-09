import React from 'react';
import { EmailCaptureForm } from './EmailCaptureForm';

interface FinalCTAProps {
  onCaptureSuccess?: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onCaptureSuccess }) => {
  return (
    <section className="bg-[#FFFFFF] section-spacing border-t border-[#E3E1DA]">
      <div className="content-container flex flex-col items-center text-center">
        <div className="max-w-[760px] mb-8">
          <p className="text-small font-mono uppercase tracking-wider text-[#5C665F] mb-3">
            Secure Your Slot
          </p>
          <h2 className="heading-h2 text-[#16211B] mb-5">
            One ban shouldn't end a business you spent years building — know today what you could restore tomorrow.
          </h2>
          <p className="text-body text-[#5C665F] max-w-[60ch] mx-auto">
            Founding users get early access and the $1,500 setup audit free at launch.
          </p>
        </div>

        <EmailCaptureForm
          source="final_cta"
          onSuccess={onCaptureSuccess}
          className="flex flex-col items-center"
        />
      </div>
    </section>
  );
};
