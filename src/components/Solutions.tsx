import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, Package, ShieldCheck, Flame } from 'lucide-react';

const solutions = [
  {
    icon: <Droplets className="h-8 w-8 text-primary" />,
    title: "Sterile & Liquid Processing",
    description: "Pharma 4.0 sterile processing systems and standard liquid processing for syrups, suspensions, ointments, and creams.",
    tags: ["Pharma 4.0", "Sterile", "Quality & Safety"],
  },
  {
    icon: <Package className="h-8 w-8 text-primary" />,
    title: "Fill-Finish & Packaging",
    description: "Support for PFS, cartridges, vials, ampoules, nasal sprays, eye/ear drops, syrups & suspensions, and ointments & creams.",
    tags: ["PFS", "Cartridges", "Vials & Ampoules"],
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "Aseptic Containment (ISOCLEAN)",
    description: "Positive pressure isolators, biological safety cabinets, glove integrity testing, and contained transfer solutions.",
    tags: ["Isolator", "BSC", "SBV / RTP"],
  },
  {
    icon: <Flame className="h-8 w-8 text-primary" />,
    title: "Sterilization & Depyrogenation (VENERA)",
    description: "CORE dry heat tunnels for validated dry heat sterilization and endotoxin reduction across multiple container formats.",
    tags: ["Dry Heat", "Endotoxin Reduction", "EU Annex 1"],
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
