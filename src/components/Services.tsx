"use client";

import React, { useMemo, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cpu, Flame, ShieldCheck } from 'lucide-react';
import Image from "next/image";
import { motion } from 'framer-motion';
import { DEFAULT_PRODUCT_IMAGE_SRC, SYSTEMS, type SystemKey } from "@/lib/zaxis-systems";

const SYSTEM_ICONS: Record<SystemKey, React.ReactNode> = {
  pro: <Cpu className="h-8 w-8 text-primary" />,
  pre: <ShieldCheck className="h-8 w-8 text-primary" />,
  core: <Flame className="h-8 w-8 text-primary" />,
};

const Services = () => {
  const [active, setActive] = useState<SystemKey>("pro");

  const activeSystem = useMemo(() => SYSTEMS[active], [active]);

  const openQuoteForProduct = (systemKey: SystemKey, productTitle: string) => {
    window.dispatchEvent(
      new CustomEvent('zaxis:open-quote', {
        detail: { productInterest: systemKey, product: productTitle },
      })
    );
  };

  return (
    <section id="systems" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge>Z Axis Systems</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tighter mt-2 mb-4 animate-in fade-in slide-in-from-bottom-3 duration-700">
            Pro, Pre & Core Platforms
          </h2>
          <p className="text-lg text-muted-foreground animate-in fade-in slide-in-from-bottom-3 duration-700 delay-150">
            Select a system category to view the matching product portfolio.
          </p>
        </div>

        <div className="grid lg:grid-cols-[420px_1fr] gap-8 items-start">
          <Card className="lg:sticky lg:top-24">
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
                      {SYSTEMS[key].label}
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
                <p className="text-sm font-semibold">Need help choosing?</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Share your formats and throughput targets, and we’ll recommend the right machines.
                </p>
                <Button className="w-full mt-3" variant="outline" asChild>
                  <a href="#contact">Talk to us</a>
                </Button>
              </div>
              <div className="mt-3 text-sm text-muted-foreground">
                <strong>**System images are for illustrative purposes only and may not reflect actual product configurations, options, or appearance.</strong>
              </div>            </CardContent>
          </Card>

          <div>
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
                >
                  <Card
                    className="overflow-hidden flex flex-col transition-shadow hover:shadow-lg"
                  >
                  <div className="relative h-56 sm:h-64 bg-background">
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

                  <CardHeader>
                    <CardTitle className="text-base leading-snug">{product.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="flex-grow flex items-end">
                    <Button
                      type="button"
                      className="w-full"
                      onClick={() => openQuoteForProduct(active, product.title)}
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
  );
};

export default Services;
