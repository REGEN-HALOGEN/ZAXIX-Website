'use client';

import Image from 'next/image';
import React, { useMemo } from 'react';

type ScrollingImagesProps = {
  images: Array<{ src: string; alt: string }>
  speedMs?: number;
};

const ScrollingImages = ({ images, speedMs = 22000 }: ScrollingImagesProps) => {
  const safeImages = useMemo(() => images.filter((i) => Boolean(i.src)), [images]);
  if (safeImages.length === 0) return null;

  // Build a denser base sequence, then duplicate it for seamless looping.
  const baseImages = useMemo(() => {
    const repeatCount = Math.max(3, Math.ceil(10 / safeImages.length));
    return Array.from({ length: repeatCount }, () => safeImages).flat();
  }, [safeImages]);
  const loopImages = [...baseImages, ...baseImages];

  return (
    <div className="relative w-full h-24 sm:h-28 lg:h-32 overflow-hidden pointer-events-none select-none">
      <div
        className="relative h-full overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        }}
      >
        <div
          className="zaxis-marquee flex h-full w-max items-stretch gap-0"
          style={{
            animationDuration: `${speedMs}ms`,
            willChange: 'transform',
          }}
        >
          {loopImages.map((img, idx) => (
            <div
              key={`${img.src}-${idx}`}
              className="relative shrink-0 h-full w-56 sm:w-64 lg:w-72"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 288px, (min-width: 640px) 256px, 224px"
                className="object-cover opacity-60 dark:opacity-50 brightness-100 dark:brightness-110"
                unoptimized
              />
            </div>
          ))}
        </div>

        <style jsx>{`
          .zaxis-marquee {
            animation-name: zaxis-marquee;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }

          @keyframes zaxis-marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .zaxis-marquee {
              animation: none !important;
              transform: none !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default ScrollingImages;
