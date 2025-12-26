'use client';

import React, { useState, useMemo } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { SYSTEMS } from '@/lib/zaxis-systems';
import ScrollFloat from '@/components/ui/ScrollFloat';

const contactMethods = [
  {
    icon: <MapPin className="h-6 w-6 text-primary" />,
    title: "Visit Us",
    lines: [
      "A-1006, Titanium City Centre",
      "Prahladnagar Satellite, Ahmedabad – 380015",
      "India",
    ],
  },
  {
    icon: <Phone className="h-6 w-6 text-primary" />,
    title: "Call Us",
    lines: ["+91 79 45928496", "+91 8200780207", "+91 9664675274"],
  },
  {
    icon: <Mail className="h-6 w-6 text-primary" />,
    title: "Email Us",
    lines: [
      "zaxispharmachine@gmail.com",
      "zaxispro1@gmail.com",
      "vikram@zaxispharmachine.com",
      "Website: www.zaxispharmchine.com",
    ],
  },
];

type FormErrors = Partial<{
  name: string;
  email: string;
  phone: string;
  productSegment: string;
  system: string;
}>;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '', // user-entered 10 digits (without +91)
    message: '',
    productSegment: '',
    system: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    if (name === 'phone') {
      // keep digits only, limit to 10 (user types digits after +91)
      const digits = (value || '').replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, phone: digits }));
      setFormErrors(prev => ({ ...prev, phone: undefined }));
      return;
    }

    // Reset system selection when product segment changes
    if (name === 'productSegment') {
      setFormData(prev => ({ ...prev, productSegment: value, system: '' }));
      setFormErrors(prev => ({ ...prev, productSegment: undefined, system: undefined }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) errors.name = 'Full name is required.';
    if (!emailRegex.test(formData.email.trim())) errors.email = 'Enter a valid email address.';
    if (!phoneRegex.test(formData.phone)) errors.phone = 'Enter a 10-digit mobile number (without +91).';
    if (!formData.productSegment) errors.productSegment = 'Please choose a product segment.';
    if (!formData.system) errors.system = 'Please choose a system.';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isFormValid = useMemo(() => {
    return (
      formData.name.trim().length > 0 &&
      emailRegex.test(formData.email.trim()) &&
      phoneRegex.test(formData.phone) &&
      formData.productSegment.length > 0 &&
      formData.system.length > 0
    );
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const payload = {
        kind: 'contact',
        subject: 'Z AXIS — Contact Form',
        fields: [
          { label: 'Full Name', value: formData.name },
          { label: 'Email', value: formData.email },
          { label: 'Company', value: formData.company },
          { label: 'Phone', value: `+91${formData.phone}` },
          { label: 'Product Segment', value: formData.productSegment },
          { label: 'System', value: formData.system },
          { label: 'Message', value: formData.message },
        ],
      };

      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => null)) as null | { ok?: boolean; error?: string };

      if (!res.ok || !data?.ok) throw new Error(data?.error || 'Failed to send email');

      alert('Message sent. We will get back to you soon.');
      setFormData({ name: '', email: '', company: '', phone: '', message: '', productSegment: '', system: '' });
      setFormErrors({});
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send email';
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const productSegments = [
    { label: 'ZAxis Pro', key: 'pro' as const },
    { label: 'ZAxis Pre', key: 'pre' as const },
    { label: 'ZAxis Core', key: 'core' as const },
  ];

  // Get products based on selected segment
  const getAvailableProducts = () => {
    const segment = productSegments.find(s => s.label === formData.productSegment);
    if (!segment) return [];
    return SYSTEMS[segment.key]?.products ?? [];
  };

  const availableProducts = useMemo(() => getAvailableProducts(), [formData.productSegment]);

  return (
    <section id="contact" className="py-16 lg:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="space-y-8">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="inline-block text-sm font-semibold tracking-widest text-primary uppercase mb-4">
                Get In Touch
              </span>
              <ScrollFloat
                className="text-3xl md:text-4xl lg:text-5xl font-bold italic tracking-tight mb-4"
                highlightWords={[{ word: 'Z', className: 'text-primary', style: { WebkitTextStroke: '1px #333', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' } }]}
              >
                CONTACT Z AXIS
              </ScrollFloat>
              <p className="text-lg text-muted-foreground">
                Share your requirements for sterile processing, fill-finish, packaging, containment, or sterilization systems.
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

            {/* Google Maps */}
            <div className="mt-8 rounded-lg overflow-hidden border border-border/60 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1000!2d72.52329214417888!3d23.012038050973594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1703619567890"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Z Axis Pharmachine Location - Titanium City Centre, Ahmedabad"
                className="w-full"
              />
            </div>
          </div>

          <Card>
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="text-sm text-muted-foreground mb-2">
                  <span className="text-red-600 font-semibold">*</span> Fields marked with <span className="text-red-600 font-semibold">*</span> are required.
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="font-medium">
                      Full Name <span className="text-red-600 ml-1" aria-hidden="true">*</span>
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      aria-required
                      aria-invalid={!!formErrors.name}
                      required
                    />
                    {formErrors.name && <p className="text-sm text-destructive mt-1">{formErrors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="font-medium">
                      Email Address <span className="text-red-600 ml-1" aria-hidden="true">*</span>
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      aria-required
                      aria-invalid={!!formErrors.email}
                      required
                    />
                    {formErrors.email && <p className="text-sm text-destructive mt-1">{formErrors.email}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="company" className="font-medium">Company</label>
                    <Input type="text" id="company" name="company" value={formData.company} onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="font-medium">
                      Phone Number <span className="text-red-600 ml-1" aria-hidden="true">*</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 bg-muted text-sm">+91</span>
                      <Input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter 10-digit mobile number"
                        aria-required
                        aria-invalid={!!formErrors.phone}
                        required
                        className="rounded-l-none"
                      />
                    </div>
                    {formErrors.phone && <p className="text-sm text-destructive mt-1">{formErrors.phone}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="productSegment" className="font-medium">
                      Product Segment <span className="text-red-600 ml-1" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="productSegment"
                      name="productSegment"
                      value={formData.productSegment}
                      onChange={handleChange}
                      className="h-10 w-full rounded-md border border-input bg-background text-foreground px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-ring"
                      aria-required
                      required
                    >
                      <option value="">Select a product segment</option>
                      {productSegments.map((s) => (
                        <option key={s.key} value={s.label}>{s.label}</option>
                      ))}
                    </select>
                    {formErrors.productSegment && <p className="text-sm text-destructive mt-1">{formErrors.productSegment}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="system" className="font-medium">
                      System <span className="text-red-600 ml-1" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="system"
                      name="system"
                      value={formData.system}
                      onChange={handleChange}
                      className="h-10 w-full rounded-md border border-input bg-background text-foreground px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-ring"
                      aria-required
                      required
                    >
                      <option value="">Select a machine</option>
                      {availableProducts.map((product, idx) => (
                        <option key={idx} value={product.title}>{product.title}</option>
                      ))}
                    </select>
                    {formErrors.system && <p className="text-sm text-destructive mt-1">{formErrors.system}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="font-medium">Message</label>
                  <Textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} />
                </div>

                <Button
                  type="submit"
                  className={`w-full ${(!isFormValid || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!isFormValid || isSubmitting}
                  aria-disabled={!isFormValid || isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
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
