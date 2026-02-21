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
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

    const totalPages = pages.length;

    /* ---------- Compute flipbook page dims to fill the container -------- */
    const computeDimensions = useCallback(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const containerW = rect.width;
        const containerH = rect.height;

        if (containerW === 0 || containerH === 0) return;

        // Each visible page is half the container width (double-page spread)
        const pageW = Math.floor(containerW / 2);
        // The slide images are 16:9 — compute height from width
        const pageH = Math.floor(pageW * (9 / 16));

        // If the computed height exceeds available height, fit to height instead
        if (pageH > containerH) {
            const fittedH = containerH;
            const fittedW = Math.floor(fittedH * (16 / 9));
            setDimensions({ width: fittedW, height: fittedH });
        } else {
            setDimensions({ width: pageW, height: pageH });
        }
    }, []);

    /* ---------- Use ResizeObserver for reliable sizing ------------------ */
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        // Initial compute with a small delay for modal layout to settle
        const timer = setTimeout(computeDimensions, 50);

        const observer = new ResizeObserver(() => {
            computeDimensions();
        });
        observer.observe(el);

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, [computeDimensions]);

    /* ---------- Navigation handlers ----------------------------------- */
    const goToPrev = useCallback(() => {
        flipBookRef.current?.pageFlip()?.flipPrev();
    }, []);

    const goToNext = useCallback(() => {
        flipBookRef.current?.pageFlip()?.flipNext();
    }, []);

    const onFlip = useCallback((e: any) => {
        setCurrentPage(e.data);
    }, []);

    /* ---------- Keyboard navigation ----------------------------------- */
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') goToPrev();
            if (e.key === 'ArrowRight') goToNext();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [goToPrev, goToNext]);

    /* ---------- Empty guard ------------------------------------------- */
    if (totalPages === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
                <p className="text-sm text-muted-foreground">No pages available.</p>
            </div>
        );
    }

    /* ---------- Render ------------------------------------------------ */
    return (
        <div className="flipbook-outer">
            {/* This wrapper measures available space */}
            <div className="flipbook-sizer" ref={containerRef}>
                {dimensions && (
                    <HTMLFlipBook
                        ref={flipBookRef}
                        width={dimensions.width}
                        height={dimensions.height}
                        size="fixed"
                        minWidth={200}
                        maxWidth={2000}
                        minHeight={120}
                        maxHeight={1200}
                        showCover={true}
                        mobileScrollSupport={true}
                        onFlip={onFlip}
                        className="flipbook"
                        style={{}}
                        startPage={0}
                        drawShadow={true}
                        flippingTime={600}
                        usePortrait={false}
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
