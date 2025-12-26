"use client";

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent } from './ui/dialog';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import ScrollFloat from '@/components/ui/ScrollFloat';

type InfraItem = {
  type: 'image' | 'video';
  file: string;
  url: string;
  name: string;
  ext: string;
  poster?: string | null;
};

export default function InfrastructureSection() {
  const [items, setItems] = useState<InfraItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    async function fetchManifest() {
      try {
        const res = await fetch('/Infra/manifest.json');
        if (!res.ok) throw new Error('Failed fetching manifest');
        const json = await res.json();
        setItems(json.items ?? []);
      } catch (e) {
        console.warn('Could not load infra manifest', e);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }
    fetchManifest();
  }, []);

  // If loaded via `/#infrastructure`, smooth scroll to the section on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.hash === '#infrastructure') {
      const el = document.getElementById('infrastructure');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Only show images in the embedded section (videos are excluded here)
  const imageItems = items.filter((i) => i.type === 'image');
  const visibleItems = imageItems.slice(0, visibleCount);

  const openAt = useCallback((i: number) => {
    setIndex(i);
    setOpen(true);
  }, []);

  const prev = useCallback(() => setIndex((s) => (s - 1 + imageItems.length) % imageItems.length), [imageItems.length]);
  const next = useCallback(() => setIndex((s) => (s + 1) % imageItems.length), [imageItems.length]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, prev, next]);
  return (
    <section id="infrastructure" aria-labelledby="infrastructure-heading" ref={(el) => { containerRef.current = el; }} className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-sm font-semibold tracking-widest text-primary uppercase mb-4">
            Our Facilities
          </span>
          <ScrollFloat
            className="text-3xl md:text-4xl lg:text-5xl font-bold italic tracking-tight mb-4"
            highlightWords={[{ word: 'INFRASTRUCTURE', className: 'text-primary' }]}
          >
            INFRASTRUCTURE
          </ScrollFloat>
          <p className="text-lg text-muted-foreground">
            A showcase of our state-of-the-art facilities and manufacturing capabilities.
          </p>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : imageItems.length === 0 ? (
          <div className="py-12 text-center">
            <h3 className="text-xl font-semibold">No infrastructure images available</h3>
            <p className="mt-2 text-muted-foreground">This gallery only shows images. If you only have videos, they will not appear here. Add images to <code>/public/Infra</code> and run <code>npm run generate-infra-manifest</code>.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {visibleItems.map((it, i) => (
                <button
                  key={it.file}
                  onClick={() => openAt(i)}
                  className="group relative overflow-hidden rounded-lg bg-muted focus:outline-none"
                  aria-label={`Open ${it.name}`}
                >
                  {it.type === 'image' ? (
                    <img src={it.url} alt={it.name} loading="lazy" className="w-full h-40 object-cover group-hover:scale-105 transition-transform" />
                  ) : (
                    <div className="relative w-full h-40 bg-black/5 flex items-center justify-center">
                      {it.poster ? (
                        <img src={it.poster} alt={`Poster for ${it.name}`} loading="lazy" className="w-full h-40 object-cover" />
                      ) : (
                        <div className="text-white/80">Video</div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-white/90">
                          <path d="M7 6v12l10-6L7 6z" fill="currentColor" />
                        </svg>
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 right-2 text-xs text-white/90 bg-black/40 backdrop-blur-sm rounded px-2 py-1">
                    {it.name}
                  </div>
                </button>
              ))}
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className="max-w-4xl w-full p-0 bg-transparent shadow-none">
                <div className="relative bg-background rounded-lg overflow-hidden">
                  <div className="absolute top-3 right-3 z-30">
                    <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close">
                      <X />
                    </Button>
                  </div>

                  <div className="flex items-center gap-4 px-4 py-6">
                    <Button variant="ghost" size="icon" onClick={prev} aria-label="Previous">
                      <ArrowLeft />
                    </Button>

                    <div className="flex-1 min-h-[320px] flex items-center justify-center">
                      <img src={imageItems[index]?.url} alt={imageItems[index]?.name} className="max-h-[70vh] w-auto h-auto object-contain" />
                    </div>

                    <Button variant="ghost" size="icon" onClick={next} aria-label="Next">
                      <ArrowRight />
                    </Button>
                  </div>
                  <div className="px-6 pb-6">
                    <div className="text-sm font-medium">{imageItems[index]?.name}</div>
                    <div className="text-xs text-muted-foreground mt-2">{imageItems[index]?.file}</div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </section>
  );
}
