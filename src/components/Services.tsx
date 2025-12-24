"use client";

import React, { useMemo, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cpu, Flame, ShieldCheck } from 'lucide-react';
import Image from "next/image";
import { motion } from 'framer-motion';

const PRODUCT_IMAGES = {
  pro: {
    rAndDClosing:
      "/Product/ZAxis%20Pro/Filling%20system%20For%20R%26D%20%20F%26D%20%20For%20All%20Injectable%20Devices%20%28PFS%20CARTRIDGEVIALAMPULE%29/Product3.png",
    fullyAutoPfs: "/Product/ZAxis%20Pro/Fully%20automated%20PFS%20%20FILLING%20SYSTEM/product7.png",
    roboticPfs:
      "/Product/ZAxis%20Pro/Robotized%20PFS%20%20cartridge%20filling%20system%20with%20IPC/product11.png",
    plungerLabel:
      "/Product/ZAxis%20Pro/Rotarty%20plunger%20rod%20instertion%20%26%20labelling%20machine%20for%20Pre%20-%20filled%20syringes/product223.png",
    flush:
      "/Product/ZAxis%20Pro/Flush%20syringe%20tip%20filling%20%26%20cap%20sealing%20machines/product5.jpeg",
    nasal: "/Product/ZAxis%20Pro/Nasal%20Dropseye%20ear%20drops%20filling%20systems/product8.png",
    vial: "/Product/ZAxis%20Pro/Standard%20Vial%20line/product69.png",
    cartridge: "/Product/ZAxis%20Pro/Both%20Ends%20open%20cartridge%20filling%20system/product6.png",
    rAndDFilling: "/Product/ZAxis%20Pro/R%26D%20Filling%20machines/product9.png",
  },
  pre: {
    isolator: "/Product/ZAxis%20Pre/Positive%20pressure%20isolator%20for%20injectables/product434.png",
    bsc: "/Product/ZAxis%20Pre/Biological%20safety%20cabinets%20%28BSC%29/product112.png",
    git: "/Product/ZAxis%20Pre/Glove%20integrity%20tester%20%28GIT%29/product787.png",
    rtp: "/Product/ZAxis%20Pre/Rapid%20transfer%20ports%20%28RTP%29/product342.png",
  },
  core: {
    tunnels: "/Product/ZAxis%20Core/sterilizing%20%26%20Depyrogenation%20Tunnels/product1.png",
  },
} as const;

type SystemKey = "pro" | "pre" | "core";

const SYSTEMS: Record<
  SystemKey,
  {
    key: SystemKey;
    label: string;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    products: Array<{ title: string; imageSrc?: string }>; // imageSrc optional; card still reserves space
  }
> = {
  pro: {
    key: "pro",
    label: "Pro",
    title: "Z Axis Pro Systems",
    subtitle: "Fill-finish and device-facing automation",
    icon: <Cpu className="h-8 w-8 text-primary" />,
    products: [
      {
        title: "R & D filling & closing machines for PFS, vials, cartridges, bottles",
        imageSrc: PRODUCT_IMAGES.pro.rAndDClosing,
      },
      {
        title: "Basic automatic PFS machine for India & South Asia",
        imageSrc: PRODUCT_IMAGES.pro.fullyAutoPfs,
      },
      { title: "Robotic PFS machine", imageSrc: PRODUCT_IMAGES.pro.roboticPfs },
      {
        title: "Plunger rod insertion & labelling machine for PFS",
        imageSrc: PRODUCT_IMAGES.pro.plungerLabel,
      },
      {
        title: "Flush syringe filling & tip capping machine (reverse filling)",
        imageSrc: PRODUCT_IMAGES.pro.flush,
      },
      { title: "Nasal drops / eye-ear drops filling machine", imageSrc: PRODUCT_IMAGES.pro.nasal },
      { title: "Standard vial / micro vial filling line", imageSrc: PRODUCT_IMAGES.pro.vial },
      { title: "Cartridge filling machine", imageSrc: PRODUCT_IMAGES.pro.cartridge },
    ],
  },
  pre: {
    key: "pre",
    label: "Pre",
    title: "Z Axis Pre Systems",
    subtitle: "ISOCLEAN containment and aseptic support",
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    products: [
      { title: "Positive pressure isolator for sterile injectables", imageSrc: PRODUCT_IMAGES.pre.isolator },
      { title: "Biological safety cabinets", imageSrc: PRODUCT_IMAGES.pre.bsc },
      { title: "Glove integrity tester", imageSrc: PRODUCT_IMAGES.pre.git },
      { title: "Contained transfer solutions", imageSrc: PRODUCT_IMAGES.pre.rtp },
    ],
  },
  core: {
    key: "core",
    label: "Core",
    title: "Z Axis Core Systems",
    subtitle: "VENERA sterilization & depyrogenation",
    icon: <Flame className="h-8 w-8 text-primary" />,
    products: [
      {
        title: "Sterilizing & depyrogenation tunnels for vials / ampoules / cartridges",
        imageSrc: PRODUCT_IMAGES.core.tunnels,
      },
    ],
  },
};

const Services = () => {
  const [active, setActive] = useState<SystemKey>("pro");

  const activeSystem = useMemo(() => SYSTEMS[active], [active]);

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
              <CardTitle>Choose a System</CardTitle>
              <p className="text-sm text-muted-foreground">
                Pick Pro, Pre, or Core. Then explore the products in that category.
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
                <div className="p-3 bg-primary/10 rounded-full flex-shrink-0">{activeSystem.icon}</div>
                <div>
                  <p className="font-semibold leading-tight">{activeSystem.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{activeSystem.subtitle}</p>
                </div>
              </div>

              <div className="rounded-lg border border-border/60 bg-background/60 p-4">
                <p className="text-sm font-semibold">Need help choosing?</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Share your formats and throughput targets, and we’ll recommend the right platform.
                </p>
                <Button className="w-full mt-3" variant="outline" asChild>
                  <a href="#contact">Talk to us</a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold tracking-tight">Products in {activeSystem.label}</h3>
                <p className="text-sm text-muted-foreground">
                  {activeSystem.products.length} product{activeSystem.products.length === 1 ? "" : "s"}
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
                      src={product.imageSrc ?? PRODUCT_IMAGES.pro.rAndDClosing}
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
                    <Button className="w-full" asChild>
                      <a href="#contact">Request Details</a>
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
