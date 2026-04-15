import React, { useState, useEffect, useRef } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackText?: string;
  className?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  style?: React.CSSProperties;
  loading?: "lazy" | "eager";
}

export default function ImageWithFallback({ src, alt, fallbackText, className, loading = "lazy", ...props }: ImageWithFallbackProps) {
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(loading === 'eager');
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (loading === 'eager') {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-[#121212] text-zinc-500 font-orbitron italic tracking-wider p-4 text-center ${className}`} style={props.style}>
        <div className="flex flex-col items-center gap-2">
          <span className="text-xl opacity-50">📷</span>
          <span className="text-sm">{fallbackText || alt || 'Image Unavailable'}</span>
        </div>
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={isIntersecting ? src : 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'}
      alt={alt}
      className={`${!isLoaded ? 'bg-[#1a1a1a] animate-pulse' : 'bg-[#0a0a0a]'} ${className || ''}`}
      onLoad={() => setIsLoaded(true)}
      onError={(e) => {
        if (isIntersecting) setError(true);
      }}
      {...props}
    />
  );
}
