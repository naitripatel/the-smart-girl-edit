import React, { useState } from 'react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  categoryAccent?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle = 'Editorial Feature',
  categoryAccent = '#E4B7AD',
  loading = 'lazy',
  decoding = 'async',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-[#F4EFEA] text-[#66564D] p-6 text-center ${className}`}
        style={{ minHeight: '180px' }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mb-3 text-xs tracking-widest font-serif uppercase border"
          style={{ borderColor: categoryAccent, color: categoryAccent }}
        >
          EDIT
        </div>
        <p className="font-serif italic text-base text-[#2A211D] max-w-xs">{fallbackTitle}</p>
        <span className="text-[11px] tracking-wider uppercase text-[#8C7A70] mt-1">The Smart Girl Edit</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#F4EFEA] ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#EAE3D9]/40 animate-pulse pointer-events-none" />
      )}
      <img
        src={src}
        alt={alt || fallbackTitle}
        loading={loading}
        decoding={decoding}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-all duration-700 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
        {...props}
      />
    </div>
  );
};
