import React from 'react';

export const Problem: React.FC = () => {
  const problems = [
    {
      index: '01',
      statement: 'Your sponsor contracts live in DMs. When the account dies, so does your proof that the deals existed.',
    },
    {
      index: '02',
      statement: 'You have 100K followers and zero ways to reach them off-platform. A ban makes your audience someone else\'s audience.',
    },
    {
      index: '03',
      statement: 'There is no support line. Even paid verification doesn\'t get you a human when the automated flag hits.',
    },
    {
      index: '04',
      statement: '"I back up my videos" isn\'t a plan. The files were never the business — the records, the members, and the reach were.',
    },
  ];

  return (
    <section className="bg-[#FFFFFF] section-spacing border-y border-[#E3E1DA]">
      <div className="content-container">
        <div className="max-w-[760px] mb-14 md:mb-16">
          <p className="text-small font-mono uppercase tracking-wider text-[#5C665F] mb-3">
            The Reality of Platform Risk
          </p>
          <h2 className="heading-h2 text-[#16211B]">
            The ban comes first. The plan never does.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {problems.map((item) => (
            <div
              key={item.index}
              className="border-t border-[#E3E1DA] pt-6 flex flex-col justify-start group hover:border-[#16211B] transition-colors"
            >
              <span className="font-mono text-[13px] font-semibold text-[#5C665F] mb-3 group-hover:text-[#0E7A45] transition-colors">
                {item.index}
              </span>
              <p className="font-heading font-semibold text-[20px] md:text-[22px] text-[#16211B] leading-[1.35] max-w-[50ch]">
                {item.statement}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
