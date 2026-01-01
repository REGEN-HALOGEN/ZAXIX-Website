"use client";

import React from 'react';
import Image from 'next/image';
import ScrollFloat from '@/components/ui/ScrollFloat';

// Types
interface MediaItem {
    title: string;
    slug: string;
    mediaType: 'video' | 'image';
    videoUrl?: string;
    thumbnail?: string;
    description?: string;
    coverImage?: string;
}

interface MediaSectionProps {
    cmsMedia?: MediaItem[];
}

// Helper to extract YouTube video ID
function getYouTubeId(url: string): string | null {
    const match = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/);
    return match ? match[1] : null;
}

export default function MediaSection({ cmsMedia }: MediaSectionProps) {
    const hasMedia = cmsMedia && cmsMedia.length > 0;

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

                {hasMedia ? (
                    // Display CMS media content
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cmsMedia.map((item) => (
                            <div key={item.slug} className="group relative rounded-2xl overflow-hidden shadow-lg border border-border/50 bg-card">
                                {item.mediaType === 'video' && item.videoUrl ? (
                                    // YouTube video embed
                                    <div className="aspect-video">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${getYouTubeId(item.videoUrl)}`}
                                            title={item.title}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full"
                                        />
                                    </div>
                                ) : (
                                    // Image display
                                    <div className="aspect-video relative">
                                        <Image
                                            src={item.coverImage || item.thumbnail || '/welcome.gif'}
                                            alt={item.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                        />
                                    </div>
                                )}
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg text-foreground">{item.title}</h3>
                                    {item.description && (
                                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Fallback: Coming Soon
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
                )}
            </div>
        </section>
    );
}
