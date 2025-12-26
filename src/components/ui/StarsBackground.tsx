'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface Star {
    x: number;
    y: number;
    size: number;
    opacity: number;
    speed: number;
}

interface StarsBackgroundProps {
    starCount?: number;
    starColor?: string;
    speed?: number;
    className?: string;
}

const StarsBackground: React.FC<StarsBackgroundProps> = ({
    starCount = 150,
    starColor = 'hsl(29, 100%, 52%)', // Primary orange color
    speed = 0.5,
    className = '',
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<Star[]>([]);
    const animationRef = useRef<number>(0);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    const initStars = useCallback((width: number, height: number) => {
        const stars: Star[] = [];
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.5 + 0.3,
                speed: Math.random() * speed + 0.1,
            });
        }
        starsRef.current = stars;
    }, [starCount, speed]);

    const draw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
        ctx.clearRect(0, 0, width, height);

        const offsetX = (springX.get() - width / 2) * 0.02;
        const offsetY = (springY.get() - height / 2) * 0.02;

        starsRef.current.forEach((star) => {
            // Update position with parallax
            const drawX = star.x + offsetX * star.speed * 2;
            const drawY = star.y + offsetY * star.speed * 2;

            // Animate twinkle
            const twinkle = 0.5 + Math.sin(Date.now() * 0.002 * star.speed + star.x) * 0.5;

            ctx.beginPath();
            ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
            ctx.fillStyle = starColor;
            ctx.globalAlpha = star.opacity * twinkle;
            ctx.fill();
            ctx.globalAlpha = 1;
        });
    }, [starColor, springX, springY]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars(canvas.width, canvas.height);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            draw(ctx, canvas.width, canvas.height);
            animationRef.current = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationRef.current);
        };
    }, [initStars, draw, mouseX, mouseY]);

    return (
        <motion.canvas
            ref={canvasRef}
            className={`fixed inset-0 pointer-events-none -z-10 ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        />
    );
};

export default StarsBackground;
