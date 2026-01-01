"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cpu, Flame, ShieldCheck } from 'lucide-react';
import Image from "next/image";
import { motion } from 'framer-motion';
import { DEFAULT_PRODUCT_IMAGE_SRC, SYSTEMS, type SystemKey, type Product } from "@/lib/zaxis-systems";
import ScrollFloat from '@/components/ui/ScrollFloat';
import { ProductDetailModal } from '@/components/Modals';

const SYSTEM_ICONS: Record<SystemKey, React.ReactNode> = {
    pro: <Cpu className="h-8 w-8 text-primary" />,
    pre: <ShieldCheck className="h-8 w-8 text-primary" />,
    core: <Flame className="h-8 w-8 text-primary" />,
};

// Map hash to system key
const HASH_TO_SYSTEM: Record<string, SystemKey> = {
    'systems-pro': 'pro',
    'systems-pre': 'pre',
    'systems-core': 'core',
};

interface ServicesClientProps {
    systemsData?: typeof SYSTEMS;
}

const ServicesClient = ({ systemsData }: ServicesClientProps) => {
    const [active, setActive] = useState<SystemKey>("pro");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    // Use provided systems data or fall back to default
    const systems = systemsData || SYSTEMS;
    const activeSystem = useMemo(() => systems[active], [systems, active]);

    // Listen for hash changes and switch to the appropriate system
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '');
            if (hash in HASH_TO_SYSTEM) {
                setActive(HASH_TO_SYSTEM[hash]);
            }
        };

        // Check initial hash on mount
        handleHashChange();

        // Listen for hash changes
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const openProductDetail = (product: Product) => {
        setSelectedProduct(product);
        setIsDetailOpen(true);
    };

    return (
        <>
            <section id="systems" className="relative py-16 lg:py-24">
                {/* Invisible anchors for direct navigation from header dropdown */}
                <div id="systems-pro" className="absolute -mt-24" aria-hidden="true" />
                <div id="systems-pre" className="absolute -mt-24" aria-hidden="true" />
                <div id="systems-core" className="absolute -mt-24" aria-hidden="true" />

                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="inline-block text-sm font-semibold tracking-widest text-primary uppercase mb-4">
                            Our Solutions
                        </span>
                        <ScrollFloat
                            className="text-3xl md:text-4xl lg:text-5xl font-bold italic tracking-tight mb-4"
                            highlightWords={[{ word: 'Z', className: 'text-primary' }]}
                        >
                            Z AXIS SYSTEMS
                        </ScrollFloat>
                        <p className="text-xl font-semibold mb-2">Pro, Pre & Core Platforms</p>
                        <p className="text-lg text-muted-foreground">
                            Select a system category to view the matching product portfolio.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Sticky Sidebar Wrapper */}
                        <div className="w-full md:w-[320px] lg:w-[420px] flex-shrink-0">
                            <div className="md:sticky md:top-24">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Select a System</CardTitle>
                                        <p className="text-sm text-muted-foreground">
                                            Pick Pro, Pre, or Core. Then explore the machines in that category.
                                        </p>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                            {(["pro", "pre", "core"] as const).map((key) => (
                                                <motion.div
                                                    key={key}
                                                    className="w-full"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <Button
                                                        type="button"
                                                        variant={active === key ? "default" : "outline"}
                                                        onClick={() => setActive(key)}
                                                        className="w-full"
                                                    >
                                                        {systems[key].label}
                                                    </Button>
                                                </motion.div>
                                            ))}
                                        </div>

                                        <div className="flex items-start gap-4 rounded-lg border border-border/60 bg-background/60 p-4">
                                            <div className="p-3 bg-primary/10 rounded-full flex-shrink-0">{SYSTEM_ICONS[active]}</div>
                                            <div>
                                                <p className="font-semibold leading-tight">{activeSystem.title}</p>
                                                <p className="text-sm text-muted-foreground mt-1">{activeSystem.subtitle}</p>
                                            </div>
                                        </div>

                                        <div className="rounded-lg border border-border/60 bg-background/60 p-4">
                                            <p className="text-sm font-semibold">Need help?</p>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Share your formats and throughput targets, and we'll recommend the right machines.
                                            </p>
                                            <Button className="w-full mt-3" variant="outline" asChild>
                                                <a href="#contact">Talk to us</a>
                                            </Button>
                                        </div>
                                        <div className="mt-3 text-sm text-muted-foreground">
                                            <strong>**System images are for illustrative purposes only and may not reflect actual product configurations, options, or appearance.</strong>
                                        </div>            </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Products Column */}
                        <div className="flex-1 min-w-0 min-h-[50vh]">
                            <div className="flex items-center justify-between gap-4 mb-4">
                                <div>
                                    <h3 className="text-xl font-bold tracking-tight">Machines in {activeSystem.label}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {activeSystem.products.length} machine{activeSystem.products.length === 1 ? "" : "s"}
                                    </p>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {activeSystem.products.map((product) => (
                                    <motion.div
                                        key={product.title}
                                        whileHover={{ y: -5 }}
                                        transition={{ duration: 0.2 }}
                                        className="h-full"
                                    >
                                        <Card
                                            className="overflow-hidden flex flex-col transition-shadow hover:shadow-lg h-full"
                                        >
                                            <div className="relative h-56 sm:h-64 bg-background flex-shrink-0">
                                                <Image
                                                    src={product.imageSrc ?? DEFAULT_PRODUCT_IMAGE_SRC}
                                                    alt={product.title}
                                                    fill
                                                    className="object-contain"
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                                    priority={false}
                                                />
                                                <div className="absolute top-3 right-3">
                                                    <Badge variant="secondary">{activeSystem.label}</Badge>
                                                </div>
                                            </div>

                                            <CardHeader className="flex-grow">
                                                <CardTitle className="text-base leading-snug line-clamp-3">{product.title}</CardTitle>
                                            </CardHeader>

                                            <CardContent className="pt-0">
                                                <Button
                                                    type="button"
                                                    className="w-full"
                                                    onClick={() => openProductDetail(product)}
                                                >
                                                    Learn More
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Detail Modal */}
            <ProductDetailModal
                isOpen={isDetailOpen}
                onOpenChange={setIsDetailOpen}
                product={selectedProduct}
                systemKey={active}
                systemLabel={activeSystem.label}
            />
        </>
    );
};

export default ServicesClient;
