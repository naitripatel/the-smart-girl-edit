import React, { useState } from 'react';
import { Check, RotateCcw, Sparkles } from 'lucide-react';
import { SmartGirlCheck } from '../types';

interface SmartGirlCheckCardProps {
  check: SmartGirlCheck;
  className?: string;
}

// Visual configuration for check types
const CHECK_TYPE_CONFIG: Record<
  string,
  { label: string; symbol: string; badgeColor: string; icon: string }
> = {
  buy: {
    label: 'Before You Buy',
    symbol: '🛍️',
    badgeColor: 'bg-[#FAF0ED] text-[#BA7D70] border-[#EAD5CD]',
    icon: '✦',
  },
  cart: {
    label: 'Before You Add to Cart',
    symbol: '🛒',
    badgeColor: 'bg-[#FDF3E8] text-[#9A6B3D] border-[#EBD6C3]',
    icon: '⏳',
  },
  spend: {
    label: 'Before You Spend',
    symbol: '💳',
    badgeColor: 'bg-[#EFF5EE] text-[#4A6B45] border-[#D4E4D0]',
    icon: '⟡',
  },
  click: {
    label: 'Before You Click Checkout',
    symbol: '📱',
    badgeColor: 'bg-[#F2EFF8] text-[#63557A] border-[#DCD5E7]',
    icon: '⚡',
  },
  trend: {
    label: 'Before You Follow the Trend',
    symbol: '👗',
    badgeColor: 'bg-[#F6F2EC] text-[#5A4F48] border-[#DFD5CB]',
    icon: '◈',
  },
  skincare: {
    label: 'The Skincare Restraint Check',
    symbol: '🧴',
    badgeColor: 'bg-[#FAF0ED] text-[#BA7D70] border-[#EAD5CD]',
    icon: '✦',
  },
  wardrobe: {
    label: 'The 30-Wears Closet Check',
    symbol: '🧥',
    badgeColor: 'bg-[#F6F2EC] text-[#5A4F48] border-[#DFD5CB]',
    icon: '◈',
  },
  verify: {
    label: 'Consumer Verification Protocol',
    symbol: '🔍',
    badgeColor: 'bg-[#EEF4F8] text-[#3E5C76] border-[#CFDDE8]',
    icon: '⌕',
  },
  habit: {
    label: 'The Realistic Sunday Reset',
    symbol: '🌿',
    badgeColor: 'bg-[#EFF5EE] text-[#4A6B45] border-[#D4E4D0]',
    icon: '❋',
  },
};

const DEFAULT_TYPE_CONFIG = {
  label: 'The Smart Girl Check',
  symbol: '✦',
  badgeColor: 'bg-[#FAF0ED] text-[#BA7D70] border-[#EAD5CD]',
  icon: '✦',
};

// Default symbols for items if not individually specified
const ITEM_SYMBOLS = ['✦', '🔍', '⏳', '🏷️', '⚖️', '💡', '⌘', '🌿', '✧', '⟡'];

export const SmartGirlCheckCard: React.FC<SmartGirlCheckCardProps> = ({
  check,
  className = '',
}) => {
  const [checkedIndices, setCheckedIndices] = useState<number[]>([]);

  const toggleCheck = (index: number) => {
    setCheckedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const resetAll = () => {
    setCheckedIndices([]);
  };

  const isComplete = checkedIndices.length === check.items.length && check.items.length > 0;
  const typeConfig =
    (check.type && CHECK_TYPE_CONFIG[check.type]) || DEFAULT_TYPE_CONFIG;

  return (
    <div
      className={`border border-[#DDCFC5] bg-[#FAF7F2] p-6 sm:p-8 rounded-sm relative shadow-sm ${className}`}
    >
      {/* Decorative top header with type symbols */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EAE3D9] gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-sans font-semibold tracking-wider uppercase rounded-xs border ${typeConfig.badgeColor}`}
            >
              <span className="text-xs">{check.typeSymbol || typeConfig.symbol}</span>
              <span>{typeConfig.label}</span>
            </span>
            <span className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-[#8C7A70]">
              The Smart Girl Check
            </span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#2A211D] mt-1">
            {check.title}
          </h3>
          {check.subtitle && (
            <p className="text-xs sm:text-sm text-[#66564D] mt-0.5 font-sans">
              {check.subtitle}
            </p>
          )}
        </div>
        <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
          <span className="font-mono text-xs text-[#8C7A70] tracking-wider bg-[#F4EFEA] px-2.5 py-1 border border-[#EAE3D9] rounded-xs">
            {checkedIndices.length} / {check.items.length} Cleared
          </span>
          {checkedIndices.length > 0 && (
            <button
              onClick={resetAll}
              className="text-[11px] text-[#BA7D70] hover:underline mt-1.5 cursor-pointer flex items-center gap-1 font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              Reset All
            </button>
          )}
        </div>
      </div>

      {/* Checklist items with customized symbols */}
      <ul className="space-y-3">
        {check.items.map((item, idx) => {
          const isChecked = checkedIndices.includes(idx);
          const itemSymbol = item.symbol || ITEM_SYMBOLS[idx % ITEM_SYMBOLS.length];

          return (
            <li
              key={idx}
              onClick={() => toggleCheck(idx)}
              className={`group flex items-start gap-3.5 p-3.5 rounded-sm transition-all cursor-pointer select-none border ${
                isChecked
                  ? 'bg-[#F2ECE5] border-[#DDCFC5] text-[#2A211D]'
                  : 'bg-[#FAF7F2] border-[#EAE3D9] hover:bg-[#F6EFEB] hover:border-[#DDCFC5] text-[#4A3D36]'
              }`}
            >
              {/* Check Box with Symbol */}
              <button
                type="button"
                aria-checked={isChecked}
                role="checkbox"
                className={`mt-0.5 w-6 h-6 rounded-xs flex items-center justify-center shrink-0 border transition-all text-xs font-semibold ${
                  isChecked
                    ? 'bg-[#2A211D] border-[#2A211D] text-[#FAF7F2]'
                    : 'border-[#BAA699] bg-[#FAF7F2] text-[#8C7A70] group-hover:border-[#2A211D] group-hover:text-[#2A211D]'
                }`}
              >
                {isChecked ? (
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                ) : (
                  <span>{itemSymbol}</span>
                )}
              </button>

              <div className="flex-1 text-sm sm:text-[15px] leading-relaxed">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-serif font-bold text-[#BA7D70] select-none" aria-hidden="true">
                    {itemSymbol}
                  </span>
                  <span className="font-mono text-[11px] uppercase text-[#BA7D70] tracking-wider">
                    Step 0{idx + 1}
                  </span>
                  <span className="text-[#8C7A70]">·</span>
                  <span
                    className={`font-medium ${
                      isChecked ? 'line-through text-[#8C7A70]' : 'text-[#2A211D]'
                    }`}
                  >
                    {item.text}
                  </span>
                </div>
                {item.detail && (
                  <p className="text-xs text-[#8C7A70] mt-1 font-sans leading-normal pl-5">
                    {item.detail}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {/* Completion feedback */}
      {isComplete && (
        <div className="mt-6 pt-4 border-t border-[#EAE3D9] flex items-center gap-2.5 text-xs sm:text-sm text-[#4A6B45] font-medium bg-[#EFF5EE] p-3 rounded-xs border border-[#D4E4D0] animate-in fade-in duration-300">
          <Sparkles className="w-4 h-4 shrink-0 text-[#4A6B45]" />
          <span>
            ✦ All checks cleared! You have given this decision calm, intentional clarity.
          </span>
        </div>
      )}
    </div>
  );
};
