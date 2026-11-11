import React from 'react';
import { Archive, Compass, FileCheck, Timer, ShieldAlert, Layers } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefits = [
    {
      title: 'Own your records, not just your files.',
      description:
        'Contracts, invoices, and member lists preserved outside any platform\'s reach.',
      icon: Archive,
    },
    {
      title: 'Reach your audience on day one.',
      description:
        'A standby site on your own domain, ready before you ever need it.',
      icon: Compass,
    },
    {
      title: 'Proof for appeals and sponsors.',
      description:
        'Posting history, analytics, and ownership records, archived and dated.',
      icon: FileCheck,
    },
    {
      title: 'A number, not a feeling.',
      description:
        'Your drill report says "live again in 48 hours" — measured, not hoped.',
      icon: Timer,
    },
    {
      title: 'Honest about the limits.',
      description:
        'We state plainly what can\'t be restored: followers, reach, the account itself.',
      icon: ShieldAlert,
    },
    {
      title: 'Built for rosters.',
      description:
        'Agencies get per-client readiness on one plan — protection sponsors can verify.',
      icon: Layers,
    },
  ];

  return (
    <section className="bg-[#FAFAF7] section-spacing">
      <div className="content-container">
        <div className="max-w-[720px] mb-14">
          <p className="text-small font-mono uppercase tracking-wider text-[#5C665F] mb-3">
            Core Infrastructure
          </p>
          <h2 className="heading-h2 text-[#16211B]">
            A hard drive saves your videos. This preserves the business.
          </h2>
        </div>

        {/* 3 columns desktop, 1 column mobile per design spec */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#FFFFFF] border border-[#E3E1DA] rounded-[8px] p-7 md:p-8 flex flex-col justify-between taste-card group"
              >
                <div>
                  <div className="w-10 h-10 rounded-[6px] border border-[#E3E1DA] flex items-center justify-center text-[#16211B] mb-5 bg-[#FAFAF7] group-hover:border-[#16211B] transition-colors">
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <h3 className="heading-h3 text-[#16211B] mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-[15px] text-[#5C665F] leading-[1.6]">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
