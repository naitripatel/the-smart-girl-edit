import React from 'react';
import { Category } from '../types';

interface FooterProps {
  onNavigateHome: () => void;
  onNavigateCategory: (category: Category) => void;
  onOpenAbout: () => void;
}

const CATEGORIES: Category[] = ['Beauty', 'Style', 'Money', 'Digital', 'Life'];

export const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onNavigateCategory,
  onOpenAbout,
}) => {
  return (
    <footer className="bg-[#241B18] text-[#FAF7F2] border-t border-[#3A2D28] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 pb-12 border-b border-[#3A2D28]">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <button
                onClick={onNavigateHome}
                className="text-left font-serif text-2xl sm:text-3xl font-semibold tracking-[-0.01em] text-[#FAF7F2] hover:text-[#E4B7AD] transition-colors cursor-pointer"
              >
                THE SMART GIRL EDIT
              </button>
              <p className="font-serif italic text-base sm:text-lg text-[#EAE3D9]/80 mt-2">
                Make smarter choices. Live your life.
              </p>
              <p className="font-sans text-xs text-[#EAE3D9]/60 max-w-sm mt-3 leading-relaxed">
                An editorial lifestyle publication for women aged 18–30.
                Practical, trustworthy, and intelligent guidance across beauty, style,
                money, and modern digital culture.
              </p>
            </div>

            {/* Subtle Social Outlets */}
            <div className="mt-6 flex items-center space-x-5 text-xs text-[#EAE3D9]/70">
              <span className="hover:text-[#FAF7F2] cursor-pointer transition-colors">Instagram</span>
              <span>·</span>
              <span className="hover:text-[#FAF7F2] cursor-pointer transition-colors">Pinterest</span>
              <span>·</span>
              <span className="hover:text-[#FAF7F2] cursor-pointer transition-colors">Substack</span>
              <span>·</span>
              <span className="hover:text-[#FAF7F2] cursor-pointer transition-colors">TikTok</span>
            </div>
          </div>

          {/* Explore Col */}
          <div className="md:col-span-4">
            <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#E4B7AD] mb-4">
              Explore The Edit
            </h4>
            <ul className="space-y-2.5">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => onNavigateCategory(cat)}
                    className="text-sm font-sans text-[#EAE3D9]/80 hover:text-[#FAF7F2] hover:translate-x-1 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>{cat}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* About & Standards Col */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#E4B7AD] mb-4">
              Publication
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={onOpenAbout}
                  className="text-sm font-sans text-[#EAE3D9]/80 hover:text-[#FAF7F2] transition-colors cursor-pointer"
                >
                  About the Edit
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAbout}
                  className="text-sm font-sans text-[#EAE3D9]/80 hover:text-[#FAF7F2] transition-colors cursor-pointer"
                >
                  Editorial Manifesto & Transparency
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAbout}
                  className="text-sm font-sans text-[#EAE3D9]/80 hover:text-[#FAF7F2] transition-colors cursor-pointer"
                >
                  Contact & Inquiries
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAbout}
                  className="text-sm font-sans text-[#EAE3D9]/80 hover:text-[#FAF7F2] transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#EAE3D9]/50 gap-4">
          <p>© 2026 The Smart Girl Edit. All rights reserved.</p>
          <p className="font-serif italic text-xs text-[#EAE3D9]/70">
            Be smarter about the things you love.
          </p>
        </div>
      </div>
    </footer>
  );
};
