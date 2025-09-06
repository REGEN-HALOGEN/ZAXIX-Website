import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pill, TestTube, Cog } from 'lucide-react';

const solutions = [
  {
    icon: <Pill className="h-8 w-8 text-primary" />,
    title: "Tablet Manufacturing",
    description: "High-precision tablet presses and coating systems for pharmaceutical excellence.",
    tags: ["PLC Controlled", "FDA Compliant", "Multi-layer"],
  },
  {
    icon: <div className="h-8 w-8 text-primary">⚕️</div>, // Using emoji as fallback
    title: "Capsule Equipment",
    description: "Automated filling systems with precision dosing and quality control.",
    tags: ["High Precision", "Auto Rejection", "Easy Cleaning"],
  },
  {
    icon: <TestTube className="h-8 w-8 text-primary" />,
    title: "Liquid Processing",
    description: "Complete liquid manufacturing and filling solutions with CIP systems.",
    tags: ["316L Steel", "CIP System", "Vision Inspection"],
  },
  {
    icon: <Cog className="h-8 w-8 text-primary" />,
    title: "Processing Equipment",
    description: "Advanced mixing, granulation, and drying solutions for optimal processing.",
    tags: ["High Shear", "Energy Efficient", "Explosion-proof"],
  },
];

const Solutions = () => {
  return (
    <section id="solutions" className="py-20 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge>Our Solutions</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tighter mt-2 mb-4">
            Complete Manufacturing Ecosystem
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive pharmaceutical machinery solutions designed for efficiency, compliance, and scalability.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutions.map((solution, index) => (
            <Card key={index} className="bg-background hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    {solution.icon}
                  </div>
                  <CardTitle>{solution.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{solution.description}</p>
                <div className="flex flex-wrap gap-2">
                  {solution.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
