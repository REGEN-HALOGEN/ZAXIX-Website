'use client';

import React, { useEffect, useState, useRef, useCallback, forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { motion, AnimatePresence } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface FlipBookProps {
    /** Ordered array of image URLs (one per page) */
    pages: string[];
}

interface PageProps {
    src: string;
    pageNum: number;
    totalPages: number;
}

/* ------------------------------------------------------------------ */
/*  Individual page – forwardRef required by react-pageflip             */
/* ------------------------------------------------------------------ */
const Page = forwardRef<HTMLDivElement, PageProps>(({ src, pageNum, totalPages }, ref) => (
    <div ref={ref} className="flipbook-page">
        <img
            src={src}
            alt={`Page ${pageNum} of ${totalPages}`}
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
            draggable={false}
        />
    </div>
));
Page.displayName = 'Page';

/* ------------------------------------------------------------------ */
/*  Main FlipBook component                                            */
/* ------------------------------------------------------------------ */
export const FlipBook: React.FC<FlipBookProps> = ({ pages }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const flipBookRef = useRef<any>(null);
    const sizerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    // null = not yet measured; { width, height } = ready to render
    const [dims, setDims] = useState<{ width: number; height: number } | null>(null);

    const totalPages = pages.length;

    /* ---------------------------------------------------------------- */
    /*  Measure the sizer element and compute page dimensions            */
    /*  react-pageflip does NOT resize dynamically, so we force a full   */
    /*  remount via a React `key` derived from the dimensions.           */
    /* ---------------------------------------------------------------- */
    const measure = useCallback(() => {
        const el = sizerRef.current;
        if (!el) return;

        const w = el.clientWidth;
        const h = el.clientHeight;
        if (w === 0 || h === 0) return;

        const mobile = w < 768;
        setIsMobile(mobile);

        // Mobile: single page (full width) | Desktop: double-page spread (half width)
        let pageW = mobile ? w : Math.floor(w / 2);
        // Slide images are 16:9 — compute page height from width
        let pageH = Math.floor(pageW * (9 / 16));

        // If the computed height exceeds available space, fit to height instead
        if (pageH > h) {
            pageH = h;
            pageW = Math.floor(pageH * (16 / 9));
        }

        setDims((prev) => {
            // Only update if values actually changed to avoid unnecessary remounts
            if (prev && prev.width === pageW && prev.height === pageH) return prev;
            return { width: pageW, height: pageH };
        });
    }, []);

    /* ---------------------------------------------------------------- */
    /*  Observe the sizer with ResizeObserver for robust sizing           */
    /* ---------------------------------------------------------------- */
    useEffect(() => {
        const el = sizerRef.current;
        if (!el) return;

        // Measure immediately, then again after a short delay (modal animation)
        measure();
        const t1 = setTimeout(measure, 100);
        const t2 = setTimeout(measure, 300);

        const ro = new ResizeObserver(measure);
        ro.observe(el);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            ro.disconnect();
        };
    }, [measure]);

    /* ---------------------------------------------------------------- */
    /*  Navigation                                                       */
    /* ---------------------------------------------------------------- */
    const goToPrev = useCallback(() => {
        flipBookRef.current?.pageFlip()?.flipPrev();
    }, []);

    const goToNext = useCallback(() => {
        flipBookRef.current?.pageFlip()?.flipNext();
    }, []);

    const onFlip = useCallback((e: any) => {
        setCurrentPage(e.data);
    }, []);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') goToPrev();
            if (e.key === 'ArrowRight') goToNext();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [goToPrev, goToNext]);

    /* ---------------------------------------------------------------- */
    /*  Empty guard                                                      */
    /* ---------------------------------------------------------------- */
    if (totalPages === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
                <p className="text-sm text-muted-foreground">No pages available.</p>
            </div>
        );
    }

    /* ---------------------------------------------------------------- */
    /*  Render                                                           */
    /* ---------------------------------------------------------------- */
    return (
        <div className="flipbook-outer">
            {/* The sizer has a fixed CSS height — we measure it, then render
          the flipbook inside with matching pixel dimensions. The `key`
          forces a full remount whenever size changes so react-pageflip
          picks up the new dimensions. */}
            <div className="flipbook-sizer" ref={sizerRef}>
                {dims && (
                    <HTMLFlipBook
                        key={`${dims.width}x${dims.height}`}
                        ref={flipBookRef}
                        width={dims.width}
                        height={dims.height}
                        size="fixed"
                        minWidth={100}
                        maxWidth={2000}
                        minHeight={100}
                        maxHeight={1500}
                        showCover={true}
                        mobileScrollSupport={true}
                        onFlip={onFlip}
                        className="flipbook"
                        style={{}}
                        startPage={0}
                        drawShadow={true}
                        flippingTime={600}
                        usePortrait={isMobile}
                        startZIndex={0}
                        autoSize={false}
                        maxShadowOpacity={0.5}
                        showPageCorners={true}
                        disableFlipByClick={false}
                        useMouseEvents={true}
                        swipeDistance={30}
                        clickEventForward={true}
                    >
                        {pages.map((src, index) => (
                            <Page key={index} src={src} pageNum={index + 1} totalPages={totalPages} />
                        ))}
                    </HTMLFlipBook>
                )}
            </div>

            {/* Navigation controls */}
            <AnimatePresence>
                <motion.div
                    className="flipbook-controls"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <button
                        onClick={goToPrev}
                        disabled={currentPage === 0}
                        className="flipbook-nav-btn"
                        aria-label="Previous page"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>

                    <span className="flipbook-page-indicator">
                        {currentPage + 1} / {totalPages}
                    </span>

                    <button
                        onClick={goToNext}
                        disabled={currentPage >= totalPages - 1}
                        className="flipbook-nav-btn"
                        aria-label="Next page"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
