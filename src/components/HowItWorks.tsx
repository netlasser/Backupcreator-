import React from 'react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Take the readiness audit',
      description:
        'Answer questions about your platforms, revenue, and current backups; get a scored report showing exactly what a ban costs you today.',
      diagramType: 'audit',
    },
    {
      num: '02',
      title: 'Build your vault and standby site',
      description:
        'We archive your captions, member lists, contracts, and records into an encrypted vault you own, and stand up an emergency site on your domain.',
      diagramType: 'vault',
    },
    {
      num: '03',
      title: 'Run the drill',
      description:
        'Every quarter we measure how fast you could be live again — in hours, on paper, with a dated certificate your agency and sponsors can see.',
      diagramType: 'drill',
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
              className="bg-[#FFFFFF] border border-[#E3E1DA] rounded-[8px] p-7 md:p-8 flex flex-col justify-between taste-card group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[14px] font-semibold text-[#5C665F] tracking-wide">
                    STEP {step.num}
                  </span>
                  <span className="text-[11px] font-mono font-medium px-2 py-0.5 bg-[#FAFAF7] border border-[#E3E1DA] rounded text-[#5C665F]">
                    {step.diagramType.toUpperCase()} PHASE
                  </span>
                </div>

                {/* Taste-skill authentic diagram micro-visual inside card */}
                <div className="w-full h-24 mb-6 bg-[#FAFAF7] border border-[#E3E1DA] rounded-[6px] p-3 flex flex-col justify-center overflow-hidden">
                  {step.diagramType === 'audit' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#5C665F]">
                        <span>INPUT: 118K FOLLOWER / DM DEALS</span>
                        <span className="text-[#B91C1C] font-bold">24/100</span>
                      </div>
                      <div className="w-full bg-[#E3E1DA] h-2 rounded-full overflow-hidden">
                        <div className="bg-[#0E7A45] h-full w-[24%]" />
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#16211B]">
                        <span>EXPOSURE: $12,780/MO</span>
                        <span className="text-[#0E7A45]">PARSED IN 4M</span>
                      </div>
                    </div>
                  )}

                  {step.diagramType === 'vault' && (
                    <div className="space-y-1.5 font-mono text-[10px]">
                      <div className="flex items-center justify-between px-2 py-1 bg-white border border-[#E3E1DA] rounded">
                        <span className="text-[#16211B]">LANE 1: POST ARCHIVE & CAPTIONS</span>
                        <span className="text-[#0E7A45] font-semibold">ENCRYPTED</span>
                      </div>
                      <div className="flex items-center justify-between px-2 py-1 bg-white border border-[#E3E1DA] rounded">
                        <span className="text-[#16211B]">LANE 2: SPONSOR CONTRACT VAULT</span>
                        <span className="text-[#0E7A45] font-semibold">PARSED</span>
                      </div>
                      <div className="flex items-center justify-between px-2 py-1 bg-white border border-[#E3E1DA] rounded">
                        <span className="text-[#16211B]">LANE 3: STANDBY DNS ROUTER</span>
                        <span className="text-[#0E7A45] font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0E7A45] animate-pulse" />
                          STANDBY
                        </span>
                      </div>
                    </div>
                  )}

                  {step.diagramType === 'drill' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#16211B]">
                        <span className="text-[#5C665F]">RECOVERY TARGET:</span>
                        <span className="font-bold text-[#0E7A45]">&lt; 48 HOURS</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1 text-center font-mono text-[9px]">
                        <div className="bg-white border border-[#E3E1DA] py-1 rounded text-[#16211B]">
                          DNS: 1H
                        </div>
                        <div className="bg-white border border-[#E3E1DA] py-1 rounded text-[#16211B]">
                          NOTIFY: 2H
                        </div>
                        <div className="bg-white border border-[#0E7A45] py-1 rounded text-[#0E7A45] font-bold">
                          AUDIT: PASS
                        </div>
                      </div>
                    </div>
                  )}
                </div>

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
