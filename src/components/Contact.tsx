'use client';

import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const contactMethods = [
  {
    icon: <MapPin className="h-6 w-6 text-primary" />,
    title: "Visit Us",
    lines: ["Plot No. 45, Industrial Estate", "Andheri (E), Mumbai - 400099", "Maharashtra, India"],
  },
  {
    icon: <Phone className="h-6 w-6 text-primary" />,
    title: "Call Us",
    lines: ["+91 22 2685 7890", "+91 98765 43210"],
  },
  {
    icon: <Mail className="h-6 w-6 text-primary" />,
    title: "Email Us",
    lines: ["info@zaxixpharma.com", "sales@zaxixpharma.com"],
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: '', email: '', company: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="space-y-8">
            <div>
              <Badge>Get In Touch</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tighter mt-2 mb-4">
                Ready to Transform Your Manufacturing?
              </h2>
              <p className="text-lg text-muted-foreground">
                Connect with our experts to discuss your pharmaceutical manufacturing needs 
                and discover how we can optimize your operations.
              </p>
            </div>
            
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full flex-shrink-0">
                    {method.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{method.title}</h4>
                    <div className="text-muted-foreground">
                      {method.lines.map((line, i) => <p key={i}>{line}</p>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Card>
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="font-medium">Full Name</label>
                    <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="font-medium">Email Address</label>
                    <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="company" className="font-medium">Company</label>
                    <Input type="text" id="company" name="company" value={formData.company} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="font-medium">Phone Number</label>
                    <Input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="font-medium">Message</label>
                  <Textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} required />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                  <Send className="h-4 w-4 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
