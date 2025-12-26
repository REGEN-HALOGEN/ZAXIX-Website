'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Cpu, Shield, Droplet, Wind, CheckCircle, Crosshair, ShieldCheck } from 'lucide-react';
import ScrollFloat from '@/components/ui/ScrollFloat';
import { GlareCard } from '@/components/ui/glare-card';

const zAxisAdvantages = [
  {
    icon: <Droplet className="h-6 w-6 text-primary" />,
    title: "Direct Product Control",
    description: "Controls nozzle entry, filling depth & withdrawal. Only axis that directly interacts with the product inside the container.",
  },
  {
    icon: <Wind className="h-6 w-6 text-primary" />,
    title: "Bubble-Free, Bottom-Up Filling",
    description: "Enables controlled bottom-up filling. Eliminates air entrapment, foaming & splash. Essential for injectables & biotech products.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-primary" />,
    title: "Aseptic Excellence (Grade A / ISO 5)",
    description: "Smooth vertical motion reduces turbulence. Minimizes particle generation. Supports sterile, compliant filling environments.",
  },
  {
    icon: <Crosshair className="h-6 w-6 text-primary" />,
    title: "Superior Filling Accuracy",
    description: "Precise Z-axis positioning ensures consistent dose accuracy. Servo-controlled, recipe-based, repeatable motion.",
  },
  {
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
    title: "Container & Needle Protection",
    description: "Prevents vial breakage. Avoids needle bending or damage. Ensures smooth insertion & exit every cycle.",
  },
];

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
    <section id="about" className="py-16 lg:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">

          {/* SECTION 1: About Z AXIS Header */}
          <div className="w-full mb-16 text-center">
            <span className="inline-block text-sm font-semibold tracking-widest text-primary uppercase mb-4">
              About Us
            </span>
            <ScrollFloat
              className="text-4xl md:text-5xl lg:text-6xl font-bold italic tracking-tight mb-6"
              highlightWords={[{ word: 'Z', className: 'text-primary', style: { WebkitTextStroke: '1px #333', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' } }]}
            >
              ABOUT Z AXIS
            </ScrollFloat>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl lg:text-2xl font-medium tracking-tight mb-4 text-foreground/80">
                सर्वे भवन्तु सुखिनः । सर्वे सन्तु निरामयाः ।<br />
                सर्वे भद्राणि पश्यन्तु । मा कश्चित् दुःख भाग्भवेत् ॥
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Driven by the philosophy of "Sarve Santu Niramaya (Wellness to All)," we are fundamentally strengthening the foundation of drug quality worldwide.
              </p>
            </div>
          </div>

          {/* Peaceful Image */}
          <div className="w-full mb-12 flex justify-center">
            <img
              src="/peaceful.jpg"
              alt="Peaceful environment"
              className="w-full max-w-4xl h-auto rounded-2xl shadow-xl object-cover"
            />
          </div>

          {/* Company Description */}
          <div className="w-full mb-20 max-w-4xl mx-auto text-center">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Z Axis Pharmachine Concepts India, a FUTURE leader in pharmaceutical equipment engineering, announces the
              introduction of its next-generation precision motion control systems, setting a new benchmark for dose accuracy
              and aseptic integrity in high-speed manufacturing lines. Headquartered in Ahmedabad, India — one of the fastest professionally growing Indian cities.
            </p>
          </div>

          {/* SECTION 2: Why Z Axis */}
          <div className="w-full mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            <div className="text-center mb-10">
              <span className="inline-block text-sm font-semibold tracking-widest text-primary uppercase mb-4">
                The Difference
              </span>
              <ScrollFloat
                className="text-3xl md:text-4xl lg:text-5xl font-bold italic tracking-tight mb-4"
                as="h3"
                highlightWords={[{ word: 'Z', className: 'text-primary', style: { WebkitTextStroke: '1px #333', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' } }]}
              >
                WHY Z AXIS?
              </ScrollFloat>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                In injectable filling machines, X & Y axes only position the nozzle — <strong className="text-foreground">Z-AXIS defines how the product is filled.</strong>
              </p>
            </div>

            {/* Promise Banner */}
            <div className="bg-primary/10 rounded-xl p-6 border border-primary/20 text-center mb-8">
              <p className="text-xl font-semibold mb-2">
                X & Y position the nozzle — <span className="text-primary">Z-AXIS perfects the fill.</span>
              </p>
              <p className="text-muted-foreground">
                <strong>Our Promise:</strong> Precision • Sterility • Reliability
              </p>
            </div>

            {/* Axis Diagram with Surrounding Info Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center mb-8">
              {/* Left Column - First 2 Cards */}
              <div className="flex flex-col gap-4 order-2 lg:order-1">
                {zAxisAdvantages.slice(0, 2).map((item, index) => (
                  <Card key={index} className="h-full border-border/60 bg-background/60 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-full">{item.icon}</div>
                        <CardTitle className="text-base whitespace-nowrap">{item.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Center Column - Axis Diagram */}
              <div className="flex justify-center order-1 lg:order-2">
                <img
                  src="/Photos/whyzaxis/axis_light.png"
                  alt="Z Axis Diagram"
                  className="max-w-sm w-full h-auto dark:hidden"
                />
                <img
                  src="/Photos/whyzaxis/axis_dark.png"
                  alt="Z Axis Diagram"
                  className="max-w-sm w-full h-auto hidden dark:block"
                />
              </div>

              {/* Right Column - Cards 3 & 4 */}
              <div className="flex flex-col gap-4 order-3">
                {zAxisAdvantages.slice(2, 4).map((item, index) => (
                  <Card key={index + 2} className="h-full border-border/60 bg-background/60 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-full">{item.icon}</div>
                        <CardTitle className="text-base whitespace-nowrap">{item.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Bottom Card - Container & Needle Protection */}
            <div className="flex justify-center mb-8">
              <Card className="max-w-md w-full border-border/60 bg-background/60 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">{zAxisAdvantages[4].icon}</div>
                    <CardTitle className="text-base">{zAxisAdvantages[4].title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{zAxisAdvantages[4].description}</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* SECTION 3: Vision, Mission & Values */}
          <div className="grid gap-6 md:grid-cols-3 mb-20">
            <GlareCard className="h-full">
              {/* Background Image */}
              <img
                src="/Photos/Vision_light.png"
                alt=""
                className="absolute inset-0 m-auto w-48 h-48 object-contain opacity-15 pointer-events-none dark:hidden"
              />
              <img
                src="/Photos/Vision_dark.png"
                alt=""
                className="absolute inset-0 m-auto w-48 h-48 object-contain opacity-15 pointer-events-none hidden dark:block"
              />
              <CardHeader className="pb-2 pt-6 px-6 relative z-10">
                <CardTitle className="text-xl lg:text-2xl">Vision</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0 relative z-10">
                <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                  To be the essential, trusted partner in global health, where our technical mastery of the Z-axis translates directly into unwavering trust in every medicine produced, thereby fulfilling our solemn commitment to Sarve Santu Niramaya (Wellness to All).
                </p>
              </CardContent>
            </GlareCard>

            <GlareCard className="h-full">
              {/* Background Image */}
              <img
                src="/Photos/Mission_light.png"
                alt=""
                className="absolute inset-0 m-auto w-48 h-48 object-contain opacity-15 pointer-events-none dark:hidden"
              />
              <img
                src="/Photos/Mission_dark.png"
                alt=""
                className="absolute inset-0 m-auto w-48 h-48 object-contain opacity-15 pointer-events-none hidden dark:block"
              />
              <CardHeader className="pb-2 pt-6 px-6 relative z-10">
                <CardTitle className="text-xl lg:text-2xl">Mission</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0 relative z-10">
                <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                  Our mission is anchored in the sanctity of human life. We design and deliver Z-axis systems with uncompromising precision, ensuring that the burden of dose accuracy and quality compliance is lifted from our partners.
                </p>
              </CardContent>
            </GlareCard>

            <GlareCard className="h-full">
              {/* Background Image */}
              <img
                src="/Photos/Values_light.png"
                alt=""
                className="absolute inset-0 m-auto w-48 h-48 object-contain opacity-15 pointer-events-none dark:hidden"
              />
              <img
                src="/Photos/Values_dark.png"
                alt=""
                className="absolute inset-0 m-auto w-48 h-48 object-contain opacity-15 pointer-events-none hidden dark:block"
              />
              <CardHeader className="pb-2 pt-6 px-6 relative z-10">
                <CardTitle className="text-xl lg:text-2xl">Values</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0 relative z-10">
                <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                  We believe in precision without compromise, quality by design, integrity in every action, continuous innovation, and the philosophy of Sarve Santu Niramaya—wellness to all.
                </p>
              </CardContent>
            </GlareCard>
          </div>

          {/* SECTION 4: Core Pillars */}
          <div className="grid gap-6 md:grid-cols-3 mb-20">
            {highlights.map((item, index) => (
              <Card key={index} className="h-full border-border/60 bg-background/60 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">{item.icon}</div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* SECTION 5: Founder & Team */}
          <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <div className="text-center mb-8">
              <span className="inline-block text-sm font-semibold tracking-widest text-primary uppercase mb-4">
                Leadership
              </span>
              <ScrollFloat
                className="text-3xl md:text-4xl lg:text-5xl font-bold italic tracking-tight"
                as="h3"
                highlightWords={[{ word: 'TEAM', className: 'text-primary' }]}
              >
                THE TEAM
              </ScrollFloat>
            </div>

            <Card className="border-border/60 bg-background/50 shadow-sm max-w-6xl mx-auto overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Founder Image */}
                  <div className="md:w-2/5 flex-shrink-0 bg-background/30">
                    <img
                      src="/founder.png"
                      alt="Vikram - Founder of Z Axis Pharmachine"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {/* Text Content */}
                  <div className="p-6 md:p-8 flex-1">
                    <h4 className="text-xl font-semibold mb-4">Vikram Yeolaker & Team</h4>
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        "While Vikram provides the strategic vision and drives the momentum of Z Axis Pharmachine Concepts India, our growth journey is fundamentally a team achievement. He leads a dedicated pack of engineers and innovators—experts whose collective precision, dedication, and problem-solving drive every single success story we write."
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Vikram, with a distinguished academic background, including a Master's degree and an MBA in Industrial Relation management, brings with him over two decades of invaluable experience in the pharmaceutical industry.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        His expertise spans across drugs, drug delivery devices, and drug delivery systems, providing a rare and unique blend of knowledge that allows him to deeply understand and effectively respond to the evolving needs of pharmaceutical packaging.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
