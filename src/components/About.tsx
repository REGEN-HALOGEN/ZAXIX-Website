import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Cpu, Shield, User } from 'lucide-react';
import { motion } from 'framer-motion';

const highlights = [
  {
    icon: <Target className="h-6 w-6 text-primary" />,
    title: "Focus",
    description: "Next-edge pharmaceutical processing & packaging systems.",
  },
  {
    icon: <Cpu className="h-6 w-6 text-primary" />,
    title: "Philosophy",
    description: "Pharma 4.0 | Sterile | Compliant | Automation-first.",
  },
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    title: "Application Areas",
    description: "Sterile, fill-finish, inspection-ready lines and validated thermal processes.",
  },
];

const About = () => {
  return (
    <section id="about" className="py-20 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge>About Z AXIS</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tighter mt-2 mb-4">
              Wellness To All / सर्वे सन्तु निरामयाः
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Z Axis Pharmachine Concepts India, a FUTURE leader in pharmaceutical equipment engineering, announces the
              introduction of its next-generation precision motion control systems, setting a new benchmark for dose accuracy
              and aseptic integrity in high-speed manufacturing lines. Driven by the philosophy of "Sarve Santu Niramaya
              (Wellness to All)," the company is fundamentally strengthening the foundation of drug quality worldwide.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              <div className="rounded-lg border border-border/60 bg-background/60 p-4">
                <p className="text-sm font-semibold">Vision</p>
                <p className="text-sm text-muted-foreground mt-1">
                  To be the essential, trusted partner in global health—where mastery of the Z-axis translates into trust in every medicine produced.
                </p>
              </div>
              <div className="rounded-lg border border-border/60 bg-background/60 p-4">
                <p className="text-sm font-semibold">Mission</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Design and deliver Z-axis systems with uncompromising precision, lifting the burden of dose accuracy and quality compliance from our partners.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full mt-1">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Card>
              <CardHeader>
                <CardTitle>Founder</CardTitle>
              </CardHeader>
              <CardContent>
              <div className="flex items-start gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-full">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Vikram</h4>
                  <p className="text-sm text-muted-foreground">
                    Master&apos;s Degree • MBA (Industrial Relation Management) • 20+ years experience in the pharmaceutical industry
                  </p>
                </div>
              </div>

              <h4 className="font-semibold mb-3">Expertise Areas</h4>
              <ul className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">• Drugs</li>
                <li className="flex items-center gap-2">• Drug delivery devices</li>
                <li className="flex items-center gap-2">• Drug delivery systems</li>
                <li className="flex items-center gap-2">• Pharmaceutical packaging</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
