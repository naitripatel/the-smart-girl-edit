import React, { useState } from 'react';
import { Search, Menu, X, ArrowUpRight } from 'lucide-react';
import { Category } from '../types';

interface HeaderProps {
  currentCategory?: Category | null;
  onNavigateHome: () => void;
  onNavigateCategory: (category: Category) => void;
  onNavigateCreatorCorner: () => void;
  onOpenSearch: () => void;
}

const CATEGORIES: Category[] = ['Beauty', 'Style', 'Money', 'Digital', 'Life'];

const CATEGORY_SYMBOLS: Record<Category, string> = {
  Beauty: '✦',
  Style: '◈',
  Money: '⟡',
  Digital: '⌘',
  Life: '❋',
};

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onNavigateHome,
  onNavigateCategory,
  onNavigateCreatorCorner,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EAE3D9] transition-all">
      {/* Top Bar: Exactly 3 Zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        {/* Zone 1: Brand title, single line wordmark */}
        <button
          onClick={() => {
            onNavigateHome();
            setMobileMenuOpen(false);
          }}
          className="text-left group flex flex-col justify-center cursor-pointer focus-visible:outline-none"
        >
          <span className="font-serif text-2xl sm:text-3xl lg:text-3xl font-semibold tracking-[-0.02em] text-[#2A211D] group-hover:text-[#BA7D70] transition-colors whitespace-nowrap">
            THE SMART GIRL EDIT
          </span>
          <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8C7A70] -mt-1 hidden sm:block">
            Everyday Discernment
          </span>
        </button>

        {/* Zone 2: 5 clean category nav links */}
        <nav className="hidden md:flex items-center space-x-7 lg:space-x-9">
          {CATEGORIES.map((cat) => {
            const isActive = currentCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onNavigateCategory(cat)}
                className={`text-sm lg:text-[15px] font-medium tracking-wide transition-colors relative py-1 cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  isActive ? 'text-[#2A211D]' : 'text-[#66564D] hover:text-[#2A211D]'
                }`}
              >
                <span className={`text-xs ${isActive ? 'text-[#BA7D70]' : 'text-[#8C7A70]'}`}>
                  {CATEGORY_SYMBOLS[cat]}
                </span>
                <span>{cat}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#BA7D70] rounded-full" />
                )}
              </button>
            );
          })}
          <button
            onClick={onNavigateCreatorCorner}
            className="text-xs uppercase tracking-widest text-[#BA7D70] hover:text-[#2A211D] transition-colors font-medium flex items-center gap-1 cursor-pointer whitespace-nowrap pl-2 border-l border-[#EAE3D9]"
          >
            Creator Corner
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </nav>

        {/* Zone 3: Search button + Mobile Menu Toggle */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={onOpenSearch}
            aria-label="Search articles"
            className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#66564D] hover:text-[#2A211D] px-3 py-2 rounded-full border border-[#EAE3D9] hover:border-[#BA7D70] transition-all bg-[#FAF7F2] cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-[#2A211D]" />
            <span className="hidden sm:inline">Search</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 text-[#2A211D] hover:text-[#BA7D70] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#EAE3D9] bg-[#FAF7F2] px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="text-[11px] uppercase tracking-widest text-[#8C7A70] pb-1 border-b border-[#EAE3D9]/60">
            Categories
          </div>
          <div className="flex flex-col space-y-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onNavigateCategory(cat);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-lg font-serif py-1 flex items-center justify-between cursor-pointer ${
                  currentCategory === cat ? 'text-[#BA7D70] font-medium' : 'text-[#2A211D]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-sm text-[#BA7D70]">{CATEGORY_SYMBOLS[cat]}</span>
                  <span>{cat}</span>
                </span>
                <span className="text-xs font-sans text-[#8C7A70] tracking-wider uppercase">Explore</span>
              </button>
            ))}
            <button
              onClick={() => {
                onNavigateCreatorCorner();
                setMobileMenuOpen(false);
              }}
              className="text-left text-base font-serif py-2 text-[#BA7D70] flex items-center justify-between border-t border-[#EAE3D9]/60 pt-3 cursor-pointer"
            >
              <span>Creator Corner</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
