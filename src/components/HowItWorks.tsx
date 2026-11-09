import React from 'react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Take the readiness audit',
      description:
        'Answer questions about your platforms, revenue, and current backups; get a scored report showing exactly what a ban costs you today.',
    },
    {
      num: '02',
      title: 'Build your vault and standby site',
      description:
        'We archive your captions, member lists, contracts, and records into an encrypted vault you own, and stand up an emergency site on your domain.',
    },
    {
      num: '03',
      title: 'Run the drill',
      description:
        'Every quarter we measure how fast you could be live again — in hours, on paper, with a dated certificate your agency and sponsors can see.',
    },
  ];

  return (
    <section id="how-it-works" className="bg-[#FAFAF7] section-spacing scroll-mt-20">
      <div className="content-container">
        <div className="max-w-[720px] mb-14">
          <p className="text-small font-mono uppercase tracking-wider text-[#5C665F] mb-3">
            Execution Protocol
          </p>
          <h2 className="heading-h2 text-[#16211B]">
            Know what survives before you need to.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-[#FFFFFF] border border-[#E3E1DA] rounded-[8px] p-7 md:p-8 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-[14px] font-semibold text-[#5C665F] tracking-wide block mb-6">
                  STEP {step.num}
                </span>
                <h3 className="heading-h3 text-[#16211B] mb-3">
                  {step.title}
                </h3>
                <p className="text-[15px] text-[#5C665F] leading-[1.6]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
