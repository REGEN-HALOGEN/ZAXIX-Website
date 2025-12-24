"use client";
import React, { useState } from 'react';
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InquiryModal } from './Modals';
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
  },
  core: {
    tunnels: "/Product/ZAxis%20Core/sterilizing%20%26%20Depyrogenation%20Tunnels/product1.png",
  },
} as const;

const productsData = [
  {
    category: "fill-finish",
    badge: "R&D",
    title: "Z AXIS – R&D Filling & Closing System",
    specs: [
      { label: "Formats", value: "PFS, cartridges, vials, ampoules" },
      { label: "Filling Range", value: "0.2–10 ml" },
      { label: "Throughput", value: "10–15 devices/min" },
      { label: "Stoppering", value: "Vacuum-based / PIPO" },
      { label: "Notes", value: "Compact, silent, LAF compatible" },
    ],
    image: PRODUCT_IMAGES.pro.rAndDClosing,
  },
  {
    category: "fill-finish",
    badge: "Nested",
    title: "Automated Combo Filling & Closing",
    specs: [
      { label: "Formats", value: "Nested PFS, vials, cartridges" },
      { label: "Compliance", value: "EU / PICS compliant" },
      { label: "Filling Range", value: "0.1–10 ml" },
      { label: "Output", value: "50–150 syringes/min" },
      { label: "Automation", value: "Debagging & Tyvek removal" },
    ],
    image: PRODUCT_IMAGES.pro.fullyAutoPfs,
  },
  {
    category: "fill-finish",
    badge: "Robotic",
    title: "Z AXIS – ROBO SERIES",
    specs: [
      { label: "Platform", value: "Cleanroom robotic arm" },
      { label: "Integration", value: "CRABS / Isolator compatible" },
      { label: "Filling Range", value: "0.1–10 ml" },
      { label: "Output", value: "50–150 syringes/min" },
      { label: "Quality", value: "In-line weighing & rejection" },
    ],
    image: PRODUCT_IMAGES.pro.roboticPfs,
  },
  {
    category: "fill-finish",
    badge: "Plunger & Label",
    title: "Z AXIS – PRILAB SERIES",
    specs: [
      { label: "Functions", value: "De-nesting, plunger rod insertion/screwing" },
      { label: "Add-ons", value: "Finger grip placement" },
      { label: "Labelling", value: "With batch verification" },
      { label: "Output", value: "Up to 120 syringes/min" },
    ],
    image: PRODUCT_IMAGES.pro.plungerLabel,
  },
  {
    category: "fill-finish",
    badge: "Flush Syringes",
    title: "Z AXIS – FLS 100 SERIES",
    specs: [
      { label: "Use", value: "Filling & capping for flush syringes" },
      { label: "Support", value: "Luer tip cap" },
      { label: "Line", value: "Composite packaging line available" },
    ],
    image: PRODUCT_IMAGES.pro.flush,
  },
  {
    category: "fill-finish",
    badge: "Cartridges",
    title: "Z AXIS – CART 40/100 SERIES",
    specs: [
      { label: "Cartridges", value: "Both-end open" },
      { label: "Sizes", value: "1.8 ml, 3 ml" },
      { label: "Output", value: "40 or 100 cartridges/min" },
      { label: "Filling", value: "Servo-based precision filling" },
      { label: "Stoppering", value: "Pneumatic or servo" },
    ],
    image: PRODUCT_IMAGES.pro.cartridge,
  },
  {
    category: "processing",
    badge: "Drops",
    title: "Z AXIS – NDEED COMBO 100",
    specs: [
      { label: "Design", value: "Monoblock" },
      { label: "Applications", value: "Eye, ear & nasal drops" },
      { label: "Output", value: "Up to 100 BPM" },
      { label: "Filling Range", value: "2–50 ml" },
      { label: "Pumps", value: "Peristaltic or syringe" },
      { label: "Integration", value: "LAF / RABS compatible" },
    ],
    image: PRODUCT_IMAGES.pro.nasal,
  },
  {
    category: "processing",
    badge: "Vials",
    title: "Z AXIS – VIAL 120/240",
    specs: [
      { label: "Includes", value: "Washing, sterilization & depyrogenation tunnel" },
      { label: "Environment", value: "ISO Class 5 LAF / Isolator" },
      { label: "Process", value: "Filling, stoppering, capping" },
      { label: "Quality", value: "Inspection & environmental monitoring" },
    ],
    image: PRODUCT_IMAGES.pro.vial,
  },
  {
    category: "sterile-support",
    badge: "Containment",
    title: "Aseptic Containment Systems (ISOCLEAN)",
    specs: [
      { label: "Systems", value: "Positive pressure isolator, BSC" },
      { label: "Testing", value: "Glove integrity tester" },
      { label: "Transfer", value: "Contained transfer solutions (SBV, RTP)" },
    ],
    image: PRODUCT_IMAGES.pre.isolator,
  },
  {
    category: "sterile-support",
    badge: "Dry Heat",
    title: "CORE Dry Heat Tunnels (VENERA)",
    specs: [
      { label: "Formats", value: "Vials, ampoules, PFS, cartridges, bottles" },
      { label: "Process", value: "Validated dry heat sterilization" },
      { label: "Benefit", value: "Endotoxin reduction" },
      { label: "Compliance", value: "GMP, FDA, EU Annex 1 compliant" },
    ],
    image: PRODUCT_IMAGES.core.tunnels,
  },
  {
    category: "processing",
    badge: "Formats",
    title: "Supported Fill-Finish Formats",
    specs: [
      { label: "Devices", value: "Pre-filled syringes, cartridges" },
      { label: "Containers", value: "Vials, ampoules" },
      { label: "Liquids", value: "Nasal sprays, eye/ear drops, syrups & suspensions" },
      { label: "Semi-solids", value: "Ointments & creams" },
    ],
    image: PRODUCT_IMAGES.pro.rAndDFilling,
  },
];

const Products = () => {
  const [filter, setFilter] = useState("all");
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  const handleInquiry = (productTitle: string) => {
    setSelectedProduct(productTitle);
    setIsEnquiryModalOpen(true);
  }

  const filteredProducts = productsData.filter(
    (p) => filter === "all" || p.category === filter
  );

  return (
    <>
      <section id="products" className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge>Product Portfolio</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tighter mt-2 mb-4 animate-in fade-in slide-in-from-bottom-3 duration-700">
              Z AXIS Systems & Series
            </h2>
            <p className="text-lg text-muted-foreground animate-in fade-in slide-in-from-bottom-3 duration-700 delay-150">
              Sterile processing, fill-finish and packaging platforms built for compliance and automation.
            </p>
          </div>

          <div className="flex justify-center space-x-2 md:space-x-4 mb-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')}>All Products</Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant={filter === 'processing' ? 'default' : 'outline'} onClick={() => setFilter('processing')}>Processing</Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant={filter === 'fill-finish' ? 'default' : 'outline'} onClick={() => setFilter('fill-finish')}>Fill-Finish</Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant={filter === 'sterile-support' ? 'default' : 'outline'} onClick={() => setFilter('sterile-support')}>Sterile Support</Button>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="overflow-hidden group transition-shadow hover:shadow-lg">
                  <div className="relative h-64 bg-background">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                      sizes="(min-width: 1024px) 384px, (min-width: 768px) 50vw, 100vw"
                      priority={index < 3}
                    />
                    <Badge className="absolute top-4 right-4">{product.badge}</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle>{product.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                  <div className="space-y-3 mb-6">
                    {product.specs.map((spec, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{spec.label}</span>
                        <span className="font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Button className="w-full" variant="outline" asChild>
                      <a href="#contact">Request Details</a>
                    </Button>
                    <Button className="w-full" onClick={() => handleInquiry(product.title)}>Inquire Now</Button>
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <InquiryModal isOpen={isEnquiryModalOpen} onOpenChange={setIsEnquiryModalOpen} productName={selectedProduct} />
    </>
  );
};

export default Products;
