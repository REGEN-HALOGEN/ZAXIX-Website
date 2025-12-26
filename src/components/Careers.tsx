'use client';

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ScrollFloat from '@/components/ui/ScrollFloat';

const pillars = [
  {
    title: "Determination to Excel (The Mindset)",
    body: "We hire people who see a benchmark not as a finish line, but as a starting point. We seek those who possess an innate drive to solve the industry's toughest challenges—particularly within the critical, unforgiving realm of Z-axis control. Your commitment to be the best is what defines our equipment.",
  },
  {
    title: "Skill to Perform (The Competency)",
    body: "In the world of \u03bcm-level accuracy, competence is non-negotiable. We value demonstrated skill, validated expertise, and the intellectual rigor required to engineer systems that guarantee dose integrity and compliance. Bring your specialization, and we will give you the platform to redefine industry standards.",
  },
  {
    title: "Hard Work to Sustain (The Commitment)",
    body: "Precision is not a one-time achievement; it is sustained effort. We demand consistent, focused, and persistent hard work necessary to maintain quality over high-volume, long-term operations. If you view effort as an investment in patient safety, you will thrive here.",
  },
];

const Careers = () => {
  return (
    <section id="careers" className="py-16 lg:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-sm font-semibold tracking-widest text-primary uppercase mb-4">
            Join Our Team
          </span>
          <ScrollFloat
            className="text-3xl md:text-4xl lg:text-5xl font-bold italic tracking-tight mb-4"
            highlightWords={[{ word: 'CAREERS', className: 'text-primary' }]}
          >
            CAREERS AT Z AXIS
          </ScrollFloat>
          <p className="text-lg text-muted-foreground">
            Beyond Family: We hire friends, builders, and driven innovators.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-lg border bg-card">
              <div className="relative aspect-video w-full">
                <Image
                  src="/Carrers.png"
                  alt="Z Axis campus and flag"
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 1024px) 640px, 100vw"
                  priority={false}
                />
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl lg:text-3xl text-primary font-bold">Our Culture</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  At Z Axis Pharmachine, our mission is anchored in the belief: Sarve Santu Niramaya (Wellness to All).
                  This is a serious commitment that demands more than casual dedication—it demands excellence.
                </p>
                <p>
                  That’s why we don’t look for “employees as family.” We seek friends—professionals who share mutual
                  respect, possess unwavering trust, and hold each other accountable to the highest standards of
                  performance and integrity.
                </p>
                <p>
                  If your motivation is rooted in shared purpose and mutual professional elevation, not just comfortable
                  familiarity, you belong here.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl lg:text-2xl text-primary font-bold whitespace-nowrap">What We Look For: The Z Axis Core</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Our entire company is built on precision and reliability. We recruit individuals who embody the three
                pillars required to sustain that level of quality:
              </p>
              <div className="space-y-4">
                {pillars.map((p) => (
                  <div key={p.title}>
                    <p className="font-semibold text-foreground">{p.title}</p>
                    <p className="mt-1">{p.body}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl lg:text-3xl text-primary font-bold">Be a Z Axian</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Under the leadership of Vikram, our strategic vision guides us, but our exponential growth is a testament
                to the collective skill, ownership, and tireless efforts of every individual on the team. He leads the pack,
                but we succeed because we run together.
              </p>
              <p>
                Are you ready to join a team where shared professional purpose and world-class precision define the daily
                work?
              </p>
              <p className="text-foreground">
                Reach to <span className="font-semibold">meeraaj@zaxispharmachine.com</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Careers;
