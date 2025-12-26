"use client";

import React from 'react';
import ScrollFloat from '@/components/ui/ScrollFloat';

export default function MediaSection() {
    return (
        <section id="media" aria-labelledby="media-heading" className="py-16 lg:py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="inline-block text-sm font-semibold tracking-widest text-primary uppercase mb-4">
                        Video Gallery
                    </span>
                    <ScrollFloat
                        className="text-3xl md:text-4xl lg:text-5xl font-bold italic tracking-tight mb-4"
                        highlightWords={[{ word: 'MEDIA', className: 'text-primary' }]}
                    >
                        MEDIA
                    </ScrollFloat>
                    <p className="text-lg text-muted-foreground">
                        Explore our latest videos and media content.
                    </p>
                </div>

                {/* Welcome GIF with Coming Soon */}
                <div className="flex flex-col items-center justify-center">
                    <div className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border border-border/50">
                        <img
                            src="/welcome.gif"
                            alt="Z Axis Welcome"
                            className="w-full h-auto"
                        />
                    </div>
                    <p className="mt-8 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                        Coming Soon...
                    </p>
                    <p className="mt-3 text-lg text-muted-foreground max-w-xl text-center">
                        We&apos;re preparing exciting video content to showcase our machines and capabilities.
                    </p>
                </div>
            </div>
        </section>
    );
}
