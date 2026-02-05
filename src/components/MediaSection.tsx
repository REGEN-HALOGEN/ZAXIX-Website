"use client";

import React, { useState } from 'react';
import ScrollFloat from '@/components/ui/ScrollFloat';

// ============================================
// NEWSLETTER EDITIONS DATA
// ============================================
// To add a new edition:
// 1. Create a new folder in public/Media/Newsletter/ with date format (e.g., 24126 for Jan 24, 2026)
// 2. Add your newsletter page images (1.jpeg, 2.jpeg, etc.)
// 3. Add a new entry at the BEGINNING of this array (newest editions first)
// ============================================
const newsletterEditions = [
    // Add new editions here at the TOP (they will show first)
    {
        edition: "002",
        title: "Z Axis Shot - Edition 002",
        folder: "020526", // Date folder: Feb 05, 2026
        pageCount: 3,    // Number of pages in this edition
        fileExtension: "jpg", // File extension for images
    },
    {
        edition: "001",
        title: "Z Axis Shot - Edition 001",
        folder: "23126", // Date folder: Jan 23, 2026
        pageCount: 3,    // Number of pages in this edition
        fileExtension: "jpeg", // File extension for images
    },
];

// Helper function to generate page paths for an edition
const getEditionPages = (edition: typeof newsletterEditions[0]) => {
    const ext = edition.fileExtension || "jpeg";
    return Array.from({ length: edition.pageCount }, (_, i) => ({
        src: `/Media/Newsletter/${edition.folder}/${i + 1}.${ext}`,
        alt: `${edition.title} - Page ${i + 1}`,
    }));
};

export default function MediaSection() {
    const [currentEdition, setCurrentEdition] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const activeEdition = newsletterEditions[currentEdition];
    const editionPages = getEditionPages(activeEdition);

    const nextEdition = () => {
        setCurrentEdition((prev) => (prev + 1) % newsletterEditions.length);
        setCurrentPage(0); // Reset to first page when changing edition
    };

    const prevEdition = () => {
        setCurrentEdition((prev) => (prev - 1 + newsletterEditions.length) % newsletterEditions.length);
        setCurrentPage(0); // Reset to first page when changing edition
    };

    const nextPage = () => {
        setCurrentPage((prev) => (prev + 1) % editionPages.length);
    };

    const prevPage = () => {
        setCurrentPage((prev) => (prev - 1 + editionPages.length) % editionPages.length);
    };

    return (
        <section id="media" aria-labelledby="media-heading" className="py-16 lg:py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
                {/* Main Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <ScrollFloat
                        className="text-3xl md:text-4xl lg:text-5xl font-bold italic tracking-tight mb-4"
                        highlightWords={[{ word: 'MEDIA', className: 'text-primary' }]}
                    >
                        MEDIA
                    </ScrollFloat>
                    <p className="text-lg text-muted-foreground">
                        Stay connected with Z-Axis through our latest updates and visual content.
                    </p>
                </div>

                {/* Newsletter Subsection */}
                <div className="mb-20">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">
                            <span className="text-primary">Newsletter</span>
                        </h3>

                        {/* Edition Selector */}
                        <div className="flex items-center justify-center gap-4 mb-3">
                            {newsletterEditions.length > 1 && (
                                <button
                                    onClick={prevEdition}
                                    className="w-8 h-8 flex items-center justify-center bg-primary/20 hover:bg-primary/40 text-primary rounded-full transition-all duration-300"
                                    aria-label="Previous edition"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                    </svg>
                                </button>
                            )}

                            <div className="inline-block px-6 py-2 bg-primary/10 border border-primary/30 rounded-full">
                                <span className="text-sm font-semibold text-primary">
                                    Edition {activeEdition.edition}
                                </span>
                                {newsletterEditions.length > 1 && (
                                    <span className="text-xs text-primary/60 ml-2">
                                        ({currentEdition + 1} of {newsletterEditions.length})
                                    </span>
                                )}
                            </div>

                            {newsletterEditions.length > 1 && (
                                <button
                                    onClick={nextEdition}
                                    className="w-8 h-8 flex items-center justify-center bg-primary/20 hover:bg-primary/40 text-primary rounded-full transition-all duration-300"
                                    aria-label="Next edition"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Insights, innovations, and industry updates delivered straight from Z-Axis.
                        </p>
                    </div>

                    {/* Newsletter Carousel */}
                    <div className="relative max-w-3xl mx-auto">
                        {/* Left Arrow - Page Navigation */}
                        <button
                            onClick={prevPage}
                            className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-primary/90 hover:bg-primary text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                            aria-label="Previous page"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>

                        {/* Newsletter Page */}
                        <div className="overflow-hidden rounded-lg shadow-xl border border-gray-200 dark:border-border/50">
                            <div
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{ transform: `translateX(-${currentPage * 100}%)` }}
                            >
                                {editionPages.map((newsletter, index) => (
                                    <div
                                        key={`${activeEdition.edition}-${index}`}
                                        className="flex-shrink-0 w-full"
                                    >
                                        <div className="relative bg-white dark:bg-card">
                                            <img
                                                src={newsletter.src}
                                                alt={newsletter.alt}
                                                className="w-full h-auto"
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Arrow - Page Navigation */}
                        <button
                            onClick={nextPage}
                            className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-primary/90 hover:bg-primary text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                            aria-label="Next page"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>

                        {/* Page Indicators */}
                        <div className="flex justify-center gap-3 mt-6">
                            {editionPages.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentPage
                                        ? 'bg-primary scale-125'
                                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-primary/50'
                                        }`}
                                    aria-label={`Go to page ${index + 1}`}
                                />
                            ))}
                            <span className="ml-4 text-sm text-muted-foreground">
                                Page {currentPage + 1} of {editionPages.length}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Videos Subsection - Commented out for now
                <div>
                    <div className="text-center mb-8">
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">
                            <span className="text-primary">Videos</span>
                        </h3>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Watch our precision pharmaceutical packaging systems in action.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="relative overflow-hidden rounded-lg shadow-xl border border-gray-200 dark:border-border/50 bg-black">
                            <video
                                className="w-full h-auto"
                                controls
                                preload="metadata"
                                poster=""
                            >
                                <source src="/Media/Videos/Vial filling  z axis.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pointer-events-none">
                                <p className="text-white text-sm md:text-base font-medium">
                                    Vial Filling System - Z-Axis
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                */}
            </div>
        </section>
    );
}
