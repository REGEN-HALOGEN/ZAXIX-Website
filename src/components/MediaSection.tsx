"use client";

import React from 'react';
import ScrollFloat from '@/components/ui/ScrollFloat';

export default function MediaSection() {
    return (
        <section id="media" aria-labelledby="media-heading" className="py-16 lg:py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="inline-block text-sm font-semibold tracking-widest text-primary uppercase mb-4">
                        Newsletter
                    </span>
                    <ScrollFloat
                        className="text-3xl md:text-4xl lg:text-5xl font-bold italic tracking-tight mb-4"
                        highlightWords={[{ word: 'MEDIA', className: 'text-primary' }]}
                    >
                        MEDIA
                    </ScrollFloat>
                    <p className="text-lg text-muted-foreground">
                        Stay updated with our latest newsletters and industry insights.
                    </p>
                </div>

                {/* Newsletter Gallery */}
                <div className="relative w-full">
                    <div className="flex gap-6 overflow-x-auto pb-4 px-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-transparent">
                        {[
                            { src: '/Media/23126/1.jpeg', alt: 'Z Axis Newsletter Edition 001 - Page 1' },
                            { src: '/Media/23126/2.jpeg', alt: 'Z Axis Newsletter Edition 001 - Page 2' },
                            { src: '/Media/23126/3.jpeg', alt: 'Z Axis Newsletter Edition 001 - Page 3' },
                        ].map((newsletter, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-center"
                            >
                                <div className="relative overflow-hidden shadow-lg border border-gray-200 dark:border-border/50 bg-white dark:bg-card transition-transform hover:scale-[1.02]">
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
                    {/* Scroll indicators */}
                    <div className="flex justify-center gap-2 mt-4">
                        <span className="text-sm text-muted-foreground">← Scroll to explore →</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
