import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQ: React.FC = () => {
  const faqs = [
    {
      q: 'Is this available right now?',
      a: "Not yet — we're opening to a founding group first. Sign up and you'll get early access plus the full $1,500 setup audit free when we launch. We'll tell you exactly where you are in line.",
    },
    {
      q: 'Can you get my account back or restore my followers?',
      a: "No — and no one honestly can. We don't promise account recovery or restored reach. We make sure a ban doesn't erase your records, your members, or your ability to reach people the same week.",
    },
    {
      q: 'Why pay before anything has happened?',
      a: "Because after is too late. Recovery services charge $3,500 to $15,999 per incident after a ban — and they still can't bring back what was never archived. Readiness costs less than one sponsored post a month.",
    },
    {
      q: 'Do you need my passwords?',
      a: 'Never. Everything comes from official platform exports and approved read-only connections. The vault is encrypted and belongs to you — you can download the full restore package anytime and leave.',
    },
    {
      q: 'I already back up to a hard drive. Isn\'t that enough?',
      a: "A drive holds your videos. It doesn't hold your sponsor contracts, your member lists, your captions and analytics, or a standby site your audience can find in 48 hours. That's the difference between files and a business.",
    },
    {
      q: 'The recovery space is full of scams. Why trust you?',
      a: "You're right to be careful — there's a standing scam alert on this whole category. That's why we publish what we can't do, put every claim in a dated drill report you can verify, and never touch your login credentials.",
    },
  ];

  // Accordion state: first open by default
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggle = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section id="faq" className="bg-[#FAFAF7] section-spacing scroll-mt-20">
      <div className="content-container flex flex-col items-center">
        <div className="w-full max-w-[720px] mb-12">
          <p className="text-small font-mono uppercase tracking-wider text-[#5C665F] mb-3">
            Common Questions
          </p>
          <h2 className="heading-h2 text-[#16211B]">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Open single-column accordion, 720px max */}
        <div className="w-full max-w-[720px] divide-y divide-[#E3E1DA] border-y border-[#E3E1DA]">
          {faqs.map((faq, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div key={idx} className="py-5">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between text-left gap-4 group focus-visible:outline-2 focus-visible:outline-[#16211B] focus-visible:outline-offset-4 rounded-[4px]"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-semibold text-[18px] text-[#16211B] group-hover:text-[#5C665F] transition-colors">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#5C665F] shrink-0 transition-transform duration-200 ease-out stroke-[1.5] ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="pt-3 pr-6 text-body text-[#5C665F] leading-[1.6]">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
