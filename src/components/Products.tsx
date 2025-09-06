"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InquiryModal } from './Modals';

const productsData = [
  {
    category: "tablet",
    badge: "High-Speed",
    title: "Rotary Tablet Press ZX-RTP-500",
    specs: [
      { label: "Capacity", value: "500K tablets/hour" },
      { label: "Features", value: "PLC, FDA Compliant" },
      { label: "Price Range", value: "₹25-40 Lakhs" },
    ],
    image: "/tablet-press.jpg", // Replace with actual image path
  },
  {
    category: "capsule",
    badge: "Automated",
    title: "Capsule Filling Machine ZX-ACF-100",
    specs: [
      { label: "Capacity", value: "100K capsules/hour" },
      { label: "Features", value: "High Precision, Auto Rejection" },
      { label: "Price Range", value: "₹35-55 Lakhs" },
    ],
    image: "/capsule-filler.jpg", // Replace with actual image path
  },
  {
    category: "liquid",
    badge: "CIP System",
    title: "Liquid Manufacturing Vessel ZX-LMV-5000",
    specs: [
      { label: "Capacity", value: "500-5000L" },
      { label: "Features", value: "316L Steel, CIP System" },
      { label: "Price Range", value: "₹18-30 Lakhs" },
    ],
    image: "/liquid-vessel.jpg", // Replace with actual image path
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
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tighter mt-2 mb-4">
              Industry-Leading Machinery
            </h2>
            <p className="text-lg text-muted-foreground">
              Engineered for precision, built for reliability, designed for the future.
            </p>
          </div>

          <div className="flex justify-center space-x-2 md:space-x-4 mb-12">
            <Button variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')}>All Products</Button>
            <Button variant={filter === 'tablet' ? 'default' : 'outline'} onClick={() => setFilter('tablet')}>Tablet</Button>
            <Button variant={filter === 'capsule' ? 'default' : 'outline'} onClick={() => setFilter('capsule')}>Capsule</Button>
            <Button variant={filter === 'liquid' ? 'default' : 'outline'} onClick={() => setFilter('liquid')}>Liquid</Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <Card key={index} className="overflow-hidden group">
                <div className="relative h-56 bg-secondary">
                  {/* <Image src={product.image} layout="fill" objectFit="cover" alt={product.title} className="group-hover:scale-105 transition-transform duration-300" /> */}
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
                    <Button className="w-full" variant="outline">Download Specs</Button>
                    <Button className="w-full" onClick={() => handleInquiry(product.title)}>Inquire Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <InquiryModal isOpen={isEnquiryModalOpen} onOpenChange={setIsEnquiryModalOpen} productName={selectedProduct} />
    </>
  );
};

export default Products;
