import React, { useState } from 'react';
import { Check, Mail } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
  };

  return (
    <section className="py-20 sm:py-24 bg-[#FAF7F2] border-t border-[#EAE3D9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle decorative line */}
        <div className="w-12 h-0.5 bg-[#BA7D70] mx-auto mb-6" />

        <span className="text-[11px] font-sans font-semibold tracking-[0.25em] uppercase text-[#8C7A70]">
          The Smart Girl Subscribe
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2A211D] tracking-tight mt-2 max-w-2xl mx-auto leading-tight">
          One useful thing to know, one thing worth trying, and one thing worth skipping.
        </h2>

        <p className="font-sans text-sm sm:text-base text-[#66564D] max-w-xl mx-auto mt-4 leading-relaxed">
          Delivered occasionally to your inbox. No spam, no daily sales clutter — just thoughtful,
          intelligent curation for the things you actually care about.
        </p>

        {/* Newsletter form or success state */}
        <div className="mt-8 max-w-md mx-auto">
          {isSubscribed ? (
            <div className="p-4 bg-[#F2EDE5] border border-[#7D8E78] text-[#2A211D] rounded-sm flex items-center justify-center gap-2 animate-in fade-in duration-300">
              <Check className="w-4 h-4 text-[#7D8E78] stroke-[3]" />
              <span className="font-serif text-sm">
                You&apos;re on the edit list. Check your inbox for our Sunday dispatch.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full px-4 py-3.5 bg-[#FDFBF7] border border-[#DDCFC5] text-sm text-[#2A211D] placeholder:text-[#A09287] focus:outline-none focus:border-[#2A211D] transition-colors rounded-none"
                />
              </div>
              <button
                type="submit"
                className="px-7 py-3.5 bg-[#2A211D] text-[#FAF7F2] hover:bg-[#BA7D70] transition-colors text-xs font-semibold tracking-widest uppercase cursor-pointer whitespace-nowrap"
              >
                JOIN THE EDIT
              </button>
            </form>
          )}

          <p className="text-[11px] text-[#8C7A70] mt-3 font-sans">
            Unsubscribe anytime. We respect your attention and your privacy.
          </p>
        </div>
      </div>
    </section>
  );
};
