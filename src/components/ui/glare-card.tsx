'use client';

import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface GlareCardProps {
    children: React.ReactNode;
    className?: string;
}

export const GlareCard = ({ children, className }: GlareCardProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setPosition({ x, y });
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
                'relative overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:shadow-lg',
                className
            )}
            style={{
                boxShadow: '0 0 30px 5px hsla(27, 98%, 52%, 0.15), 0 0 60px 10px hsla(27, 98%, 52%, 0.08)',
            }}
        >
            {/* Glare effect - uses primary orange color */}
            <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, 
            hsl(27, 98%, 52%, 0.15), 
            hsl(35, 100%, 50%, 0.08) 25%,
            transparent 50%)`,
                }}
            />

            {/* Border glow effect */}
            <div
                className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, 
            hsl(27, 98%, 52%, 0.25), 
            transparent 40%)`,
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'xor',
                    WebkitMaskComposite: 'xor',
                    padding: '1px',
                }}
            />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default GlareCard;
