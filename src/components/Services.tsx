import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, HardHat, Lightbulb, BookOpen, Check } from 'lucide-react';

const services = [
  {
    icon: <HardHat className="h-8 w-8 text-primary" />,
    title: "Installation & Commissioning",
    description: "Professional setup with complete validation and documentation.",
    features: ["On-site installation", "Performance testing", "IQ/OQ/PQ validation", "Comprehensive training"],
  },
  {
    icon: <Wrench className="h-8 w-8 text-primary" />,
    title: "Maintenance & Support",
    description: "24/7 support with preventive maintenance programs.",
    features: ["Emergency support", "Preventive maintenance", "Remote diagnostics", "Spare parts supply"],
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: "Process Consultation",
    description: "Expert consulting for optimization and compliance.",
    features: ["Process design", "Equipment selection", "Regulatory compliance", "Efficiency optimization"],
  },
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: "Training & Validation",
    description: "Comprehensive training and validation services.",
    features: ["Operator training", "SOP development", "Validation protocols", "Compliance audits"],
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge>Our Services</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tighter mt-2 mb-4">
            Complete Lifecycle Support
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive services from installation to maintenance, ensuring optimal performance.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <div className="p-3 bg-primary/10 rounded-full w-max mb-4">
                  {service.icon}
                </div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
