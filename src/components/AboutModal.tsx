import React from 'react';
import { X, CheckCircle, ShieldCheck } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E1714]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#FAF7F2] border border-[#DDCFC5] p-6 sm:p-10 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-1.5 text-[#66564D] hover:text-[#2A211D] hover:bg-[#F2ECE5] rounded-full transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-[11px] font-sans font-semibold tracking-[0.25em] uppercase text-[#BA7D70]">
          About The Publication
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#2A211D] mt-1 mb-4">
          Be smarter about the things you love.
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-[#66564D] leading-relaxed font-sans">
          <p>
            <strong>The Smart Girl Edit</strong> was founded on a simple conviction: you don&apos;t have to
            choose between having great taste and being intelligent with your time, money, and mind.
          </p>
          <p>
            Young women in their late teens and twenties are constantly inundated with aesthetic marketing,
            viral micro-trends, algorithmic consumer pressure, and 15-second product hooks. Much of lifestyle
            media either condescends to women or tries to sell them something every two paragraphs.
          </p>
          <p>
            We take a different approach. We believe in:
          </p>

          <div className="my-6 space-y-3 bg-[#F4EFEA] p-5 border border-[#EAE3D9] rounded-xs">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-[#7D8E78] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#2A211D]">Practical Discernment:</strong> Knowing the difference between actual value and marketing theater.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-[#7D8E78] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#2A211D]">Financial Autonomy:</strong> Enjoying lifestyle aesthetics without panic debt or algorithmic impulse buys.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-[#7D8E78] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#2A211D]">Zero Pretension:</strong> Real, accessible advice for college students, new grads, and young professionals.
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#EAE3D9] text-xs text-[#8C7A70] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#BA7D70]" />
            <span>Independent Editorial Standards · Inquiries: edit@thesmartgirledit.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};
