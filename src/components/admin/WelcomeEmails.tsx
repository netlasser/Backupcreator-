import React, { useState } from 'react';

export const WelcomeEmails: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const emails = [
    {
      key: 'email_instant',
      timing: 'SEND IMMEDIATELY ON SIGNUP · FOUNDING ACCESS CONFIRMATION',
      subject1: "You're on the founding list for BackupCreator", // 7 words
      subject2: 'Confirming your recovery readiness audit slot', // 6 words
      body: `Hey,

Thanks for requesting a founding slot for BackupCreator.

As promised, your full Recovery Readiness Audit — normally the $1,500 setup package — is completely waived and free when we open our initial cohort.

We are onboarding creators in controlled batches so each readiness scorecard is reviewed manually against real platform risk, rather than run through a generic template. 

To help me prioritize your slot, reply with one line: which platform is your business most exposed on right now? (Instagram, YouTube, TikTok, or Patreon?)

I read and reply to every email directly.

— Founder, BackupCreator`,
    },
    {
      key: 'email_day2',
      timing: 'SEND DAY 2 · THE BUSINESS DISCOVERY GAP',
      subject1: 'Where do your sponsor contracts actually live?', // 7 words
      subject2: 'The files were never your creator business', // 7 words
      body: `Hey,

When we spoke with full-time creators who survived an automated platform ban, the most brutal realization wasn't losing video files. Almost everyone had raw footage in their camera roll or on a hard drive.

The shock was that the business ended that afternoon:
- Sponsor contracts negotiated in Instagram DMs, with zero off-platform records to invoice against.
- Patreon and community member lists that had never been exported to an offline CSV.
- Zero owned email addresses or contact points to notify 100K+ followers where to go.

A hard drive saves media files; it doesn't preserve the contracts, member rosters, or billing records that pay your rent.

If your primary account went dark tomorrow, what is the single record you would panic about not having backed up? Just hit reply and tell me.

— Founder, BackupCreator`,
    },
    {
      key: 'email_day5',
      timing: 'SEND DAY 5 · ADDRESSING "NOTHING HAS HAPPENED YET"',
      subject1: 'Why prepare before anything happens to you?', // 7 words
      subject2: 'Disaster recovery costs less than one post', // 7 words
      body: `Hey,

The most common hesitation full-time creators have is: "Nothing has happened to my account yet — why should I spend money on continuity now?"

In Q2 of 2026 alone, YouTube removed 2.73 million channels and Meta purged over 10 million accounts. When an algorithmic flag hits, there is no appeal phone number or live human agent — even for paid verified creators.

Once an account dies, third-party recovery services charge $3,500 to $15,999 per incident, and they still cannot resurrect records that were never archived in the first place.

Readiness costs less than one sponsored post a month. It guarantees you have an encrypted business vault, a warm standby site on your own domain, and a drill-tested plan to be live in 48 hours.

We are locking in our first 20 founding audit slots this week. Reply "AUDIT" to confirm your profile intake.

— Founder, BackupCreator`,
    },
  ];

  return (
    <section className="mb-12">
      <div className="mb-4">
        <p className="text-[12px] font-mono uppercase text-[#5C665F] tracking-wider mb-1">
          Nurture Sequence
        </p>
        <h2 className="heading-h2 text-[26px] md:text-[28px] text-[#16211B]">
          Welcome Emails
        </h2>
      </div>

      <div className="space-y-6">
        {emails.map((item) => {
          const fullCopy = `Subject Option 1: ${item.subject1}\nSubject Option 2: ${item.subject2}\n\n${item.body}`;
          const isCopied = copiedKey === item.key;

          return (
            <div
              key={item.key}
              className="bg-[#FFFFFF] border border-[#E3E1DA] rounded-[8px] p-6 text-left flex flex-col justify-between"
            >
              <div>
                <p className="text-[12px] font-mono uppercase tracking-wider text-[#5C665F] mb-3">
                  {item.timing}
                </p>

                <div className="mb-4 pb-4 border-b border-[#E3E1DA] text-[14px]">
                  <p className="text-[#5C665F] mb-1">
                    <span className="font-semibold text-[#16211B]">Subject Option 1:</span> {item.subject1}
                  </p>
                  <p className="text-[#5C665F]">
                    <span className="font-semibold text-[#16211B]">Subject Option 2:</span> {item.subject2}
                  </p>
                </div>

                <div className="text-[15px] text-[#16211B] leading-[1.6] max-w-[75ch] whitespace-pre-line mb-6 font-normal">
                  {item.body}
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => handleCopy(item.key, fullCopy)}
                  className="btn-primary text-[13px] py-2 px-5"
                >
                  {isCopied ? 'Copied to clipboard' : 'Copy email'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
