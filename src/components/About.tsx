import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Globe, Award } from 'lucide-react';

const achievements = [
  {
    icon: <Award className="h-6 w-6 text-primary" />,
    title: "Industry Leadership",
    description: "Market leader with 25+ years of proven expertise.",
  },
  {
    icon: <Globe className="h-6 w-6 text-primary" />,
    title: "Global Reach",
    description: "Serving 50+ countries with local support.",
  },
  {
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
    title: "Quality Excellence",
    description: "ISO 9001:2015, FDA, and GMP certified.",
  },
];

const certifications = [
    { icon: "🏅", title: "ISO 9001:2015", description: "Quality Management" },
    { icon: "🇺🇸", title: "FDA Registration", description: "US Compliance" },
    { icon: "✅", title: "GMP Compliance", description: "Manufacturing Practice" },
    { icon: "🇪🇺", title: "CE Marking", description: "European Conformity" },
];

const About = () => {
  return (
    <section id="about" className="py-20 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge>About Zaxix</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tighter mt-2 mb-4">
              Pioneering Excellence Since 1998
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              For over 25 years, we&apos;ve been at the forefront of pharmaceutical machinery innovation, 
              delivering cutting-edge solutions that transform manufacturing processes worldwide.
            </p>
            <div className="space-y-6">
              {achievements.map((item, index) => (
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
              <CardTitle>Certifications & Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="text-2xl">{cert.icon}</div>
                    <div>
                      <h4 className="font-semibold">{cert.title}</h4>
                      <p className="text-sm text-muted-foreground">{cert.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
