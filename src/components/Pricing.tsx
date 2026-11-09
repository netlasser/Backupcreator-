import React from 'react';

interface PricingProps {
  onSelectTier: (tierName: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectTier }) => {
  const tiers = [
    {
      id: 'solo',
      name: 'Solo Creator',
      price: '$99',
      period: '/mo',
      bestFor: 'one-platform creators protecting their first serious income.',
      features: [
        'Readiness audit + scored report',
        'Encrypted vault, up to 2 platforms',
        'Standby page + restore package',
        'Annual recovery drill',
      ],
      isRecommended: false,
    },
    {
      id: 'pro',
      name: 'Creator Pro',
      price: '$149',
      period: '/mo',
      bestFor: 'multi-platform creators with sponsors and members on the line.',
      features: [
        'Everything in Solo, all platforms',
        'Standby site on your own domain',
        'Quarterly drills with dated certificate',
        'Priority support during an incident',
      ],
      isRecommended: true,
    },
    {
      id: 'agency',
      name: 'Agency',
      price: '$999',
      period: '/mo',
      bestFor: 'management agencies protecting a roster.',
      features: [
        'Up to 10 creator seats (more by quote)',
        'Quarterly drills across the roster',
        'Per-client readiness reports for sponsors',
        'Dedicated onboarding support',
      ],
      isRecommended: false,
    },
  ];

  return (
    <section id="pricing" className="bg-[#FFFFFF] section-spacing border-y border-[#E3E1DA] scroll-mt-20">
      <div className="content-container">
        <div className="max-w-[720px] mb-16">
          <p className="text-small font-mono uppercase tracking-wider text-[#5C665F] mb-3">
            Readiness Retainers
          </p>
          <h2 className="heading-h2 text-[#16211B]">
            Pay for readiness, not regret.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative bg-[#FFFFFF] rounded-[8px] p-8 flex flex-col justify-between transition-all ${
                tier.isRecommended
                  ? 'border-2 border-[#0E7A45] pt-10'
                  : 'border border-[#E3E1DA]'
              }`}
            >
              {/* Top-center Recommended badge verbatim: 14px, accent bg, white text, never "Most popular" */}
              {tier.isRecommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0E7A45] text-[#FFFFFF] text-[14px] font-semibold px-4 py-0.5 rounded-[8px] tracking-wide">
                  Recommended
                </div>
              )}

              <div>
                <h3 className="heading-h3 text-[#16211B] mb-2">
                  {tier.name}
                </h3>
                
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="font-heading font-bold text-[38px] text-[#16211B] leading-none">
                    {tier.price}
                  </span>
                  <span className="text-[#5C665F] text-[16px]">
                    {tier.period}
                  </span>
                </div>

                <p className="text-[14px] text-[#5C665F] mb-6 pb-6 border-b border-[#E3E1DA] leading-snug">
                  <span className="font-semibold text-[#16211B]">Best for:</span> {tier.bestFor}
                </p>

                <ul className="space-y-3.5 mb-8 text-[15px] text-[#16211B]">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#5C665F] mt-0.5 select-none text-[13px]" aria-hidden="true">
                        —
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => onSelectTier(tier.name)}
                  className={`w-full ${
                    tier.isRecommended ? 'btn-primary' : 'btn-secondary'
                  }`}
                >
                  Get my free readiness audit
                </button>
                <p className="text-[12px] text-center text-[#5C665F] mt-2">
                  Founding access · $1,500 audit waived
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
