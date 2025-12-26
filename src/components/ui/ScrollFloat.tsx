'use client';

import { useEffect, useRef, useId } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Only register once
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface ScrollFloatProps {
    children: string;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
    animationDuration?: number;
    ease?: string;
    scrollStart?: string;
    scrollEnd?: string;
    stagger?: number;
    highlightWords?: { word: string; className: string }[];
}

const ScrollFloat = ({
    children,
    className = '',
    as: Component = 'h2',
    animationDuration = 0.8,
    ease = 'back.out(1.7)',
    scrollStart = 'top 85%',
    scrollEnd = 'bottom 20%',
    stagger = 0.04,
    highlightWords = [],
}: ScrollFloatProps) => {
    const containerRef = useRef<HTMLElement>(null);
    const triggerId = useId();

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        // Small delay to ensure DOM is ready
        const timer = setTimeout(() => {
            // Split text into words
            const words = children.split(' ');

            // Create spans for each word
            el.innerHTML = '';
            words.forEach((word, index) => {
                const wordSpan = document.createElement('span');
                wordSpan.style.display = 'inline-block';
                wordSpan.style.willChange = 'transform, opacity';

                // Check if this word should be highlighted
                const highlight = highlightWords.find((h) => h.word === word);
                if (highlight) {
                    wordSpan.className = highlight.className;
                }

                wordSpan.innerHTML = word + (index < words.length - 1 ? '&nbsp;' : '');
                el.appendChild(wordSpan);
            });

            const wordSpans = el.querySelectorAll('span');

            gsap.fromTo(
                wordSpans,
                {
                    opacity: 0,
                    y: 40,
                    rotateX: -60,
                    scale: 0.85,
                },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    scale: 1,
                    duration: animationDuration,
                    ease,
                    stagger,
                    scrollTrigger: {
                        trigger: el,
                        start: scrollStart,
                        end: scrollEnd,
                        toggleActions: 'play none none reverse',
                        id: triggerId,
                    },
                }
            );
        }, 100);

        return () => {
            clearTimeout(timer);
            // Kill only this specific trigger
            const trigger = ScrollTrigger.getById(triggerId);
            if (trigger) {
                trigger.kill();
            }
        };
    }, [children, animationDuration, ease, scrollStart, scrollEnd, stagger, highlightWords, triggerId]);

    return (
        <Component
            ref={containerRef as React.RefObject<HTMLHeadingElement>}
            className={className}
            style={{ perspective: '400px' }}
        >
            {children}
        </Component>
    );
};

export default ScrollFloat;
