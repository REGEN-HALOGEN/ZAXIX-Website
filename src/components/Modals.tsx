'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from 'framer-motion';
import { SYSTEMS, type SystemKey } from "@/lib/zaxis-systems";

import { FlipBook } from './FlipBook';

interface QuoteModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  prefill?: { productInterest?: SystemKey; product?: string };
}

export const QuoteModal = ({ isOpen, onOpenChange, prefill }: QuoteModalProps) => {
  const [productInterest, setProductInterest] = useState<SystemKey | "">("");
  const [product, setProduct] = useState<string>("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    requirements: "",
  });
  type QuoteErrors = Partial<{
    name: string;
    email: string;
    phone: string;
    productInterest: string;
    product: string;
  }>;
  const [formErrors, setFormErrors] = useState<QuoteErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;
  const productOptions = useMemo(() => {
    if (!productInterest) return [];
    return SYSTEMS[productInterest].products.map((p) => p.title);
  }, [productInterest]);

  const isQuoteValid = useMemo(() => {
    return (
      form.name.trim().length > 0 &&
      emailRegex.test(form.email.trim()) &&
      phoneRegex.test((form.phone || '').replace(/\D/g, '')) &&
      !!productInterest &&
      !!product
    );
  }, [form, productInterest, product]);

  const validateQuote = () => {
    const errors: QuoteErrors = {};
    if (!form.name.trim()) errors.name = 'Full name is required.';
    if (!emailRegex.test(form.email.trim())) errors.email = 'Enter a valid email address.';
    const digits = (form.phone || '').replace(/\D/g, '').slice(0, 10);
    if (!phoneRegex.test(digits)) errors.phone = 'Enter a 10-digit mobile number.';
    if (!productInterest) errors.productInterest = 'Please choose a product segment.';
    if (!product) errors.product = 'Please choose a system.';
    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    if (!isOpen) return;
    if (!prefill) return;
    const nextInterest = prefill.productInterest ?? "";
    setProductInterest(nextInterest);
    setProduct(prefill.product ?? "");
  }, [isOpen, prefill]);

  const onSubmitQuote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validateQuote()) return;

    try {
      setIsSubmitting(true);

      const phoneDigits = (form.phone || '').replace(/\D/g, '').slice(0, 10);

      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind: 'quote',
          subject: 'Z AXIS — Quote Request',
          fields: [
            { label: 'Full Name', value: form.name },
            { label: 'Email', value: form.email },
            { label: 'Company', value: form.company },
            { label: 'Phone', value: `+91${phoneDigits}` },
            {
              label: 'Product Segment',
              value: productInterest ? `ZAxis ${productInterest.toUpperCase()}` : '',
            },
            { label: 'Interested System', value: product },
            { label: 'Requirements', value: form.requirements },
          ],
        }),
      });

      const data = (await res.json().catch(() => null)) as null | { ok?: boolean; error?: string };
      if (!res.ok || !data?.ok) throw new Error(data?.error || 'Failed to send email');

      alert('Request submitted. We will get back to you soon.');
      onOpenChange(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send email';
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!productInterest) {
      if (product) setProduct("");
      return;
    }
    if (!product) return;
    if (!productOptions.includes(product)) setProduct("");
  }, [productInterest, product, productOptions]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Request a Quote</DialogTitle>
          <DialogDescription>
            Fill out the form below and we will get back to you with a detailed quote.
          </DialogDescription>
        </DialogHeader>
        <form id="quoteForm" className="grid gap-4 py-4" onSubmit={onSubmitQuote}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="quoteName" className="font-medium">Full Name <span className="text-red-600 ml-1" aria-hidden>*</span></label>
              <Input
                id="quoteName"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => {
                  setForm((p) => ({ ...p, name: e.target.value }));
                  setFormErrors((f) => ({ ...f, name: undefined }));
                }}
                aria-required
                aria-invalid={!!formErrors.name}
              />
              {formErrors.name && <p className="text-sm text-destructive mt-1">{formErrors.name}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="quoteEmail" className="font-medium">Email Address <span className="text-red-600 ml-1" aria-hidden>*</span></label>
              <Input
                id="quoteEmail"
                type="email"
                placeholder="john.doe@example.com"
                value={form.email}
                onChange={(e) => {
                  setForm((p) => ({ ...p, email: e.target.value }));
                  setFormErrors((f) => ({ ...f, email: undefined }));
                }}
                aria-required
                aria-invalid={!!formErrors.email}
              />
              {formErrors.email && <p className="text-sm text-destructive mt-1">{formErrors.email}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="quoteCompany">Company</label>
              <Input
                id="quoteCompany"
                placeholder="Doe Inc."
                value={form.company}
                onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="quotePhone" className="font-medium">Phone Number <span className="text-red-600 ml-1" aria-hidden>*</span></label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 bg-muted text-sm">+91</span>
                <Input
                  id="quotePhone"
                  type="tel"
                  placeholder="Enter your mobile no."
                  value={form.phone}
                  onChange={(e) => {
                    const digits = (e.target.value || '').replace(/\D/g, '').slice(0, 10);
                    setForm((p) => ({ ...p, phone: digits }));
                    setFormErrors((f) => ({ ...f, phone: undefined }));
                  }}
                  className="rounded-l-none"
                  aria-required
                  aria-invalid={!!formErrors.phone}
                />
              </div>
              {formErrors.phone && <p className="text-sm text-destructive mt-1">{formErrors.phone}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="quoteProduct" className="font-medium">Product Segment <span className="text-red-600 ml-1" aria-hidden>*</span></label>
              <Select
                value={productInterest}
                onValueChange={(value) => {
                  setProductInterest(value as SystemKey);
                  setProduct("");
                  setFormErrors((f) => ({ ...f, productInterest: undefined }));
                }}
              >
                <SelectTrigger className="min-w-0 overflow-hidden">
                  <span className="flex-1 min-w-0 truncate text-left">
                    <SelectValue placeholder="Select a segment" />
                  </span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pro">ZAxis Pro</SelectItem>
                  <SelectItem value="pre">ZAxis Pre</SelectItem>
                  <SelectItem value="core">ZAxis Core</SelectItem>
                </SelectContent>
              </Select>
              {formErrors.productInterest && <p className="text-sm text-destructive mt-1">{formErrors.productInterest}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="quoteProductSpecific" className="font-medium">System <span className="text-red-600 ml-1" aria-hidden>*</span></label>
              <Select
                value={product}
                onValueChange={(value) => {
                  setProduct(value);
                  setFormErrors((f) => ({ ...f, product: undefined }));
                }}
                disabled={!productInterest}
              >
                <SelectTrigger className="min-w-0 overflow-hidden">
                  <span className="flex-1 min-w-0 truncate text-left">
                    <SelectValue
                      placeholder={productInterest ? "Select a system" : "Select a segment first"}
                    />
                  </span>
                </SelectTrigger>
                <SelectContent>
                  {productOptions.map((title) => (
                    <SelectItem key={title} value={title}>
                      {title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formErrors.product && <p className="text-sm text-destructive mt-1">{formErrors.product}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="quoteMessage">Requirements</label>
            <Textarea
              id="quoteMessage"
              placeholder="Describe your project requirements..."
              value={form.requirements}
              onChange={(e) => setForm((p) => ({ ...p, requirements: e.target.value }))}
            />
          </div>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button type="button" variant="secondary">Cancel</Button>
            </motion.div>
          </DialogClose>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              form="quoteForm"
              disabled={!isQuoteValid || isSubmitting}
              className={`${(!isQuoteValid || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Sending…' : 'Submit Request'}
            </Button>
          </motion.div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface InquiryModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  productName: string;
}

export const InquiryModal = ({ isOpen, onOpenChange, productName }: InquiryModalProps) => {
  const [inquiry, setInquiry] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmitInquiry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind: 'inquiry',
          subject: 'Z AXIS — Product Inquiry',
          fields: [
            { label: 'Product', value: productName },
            { label: 'Full Name', value: inquiry.name },
            { label: 'Email', value: inquiry.email },
            { label: 'Message', value: inquiry.message },
          ],
        }),
      });

      const data = (await res.json().catch(() => null)) as null | { ok?: boolean; error?: string };
      if (!res.ok || !data?.ok) throw new Error(data?.error || 'Failed to send email');

      alert('Inquiry sent. We will get back to you soon.');
      onOpenChange(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send email';
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Product Inquiry: {productName}</DialogTitle>
          <DialogDescription>
            Have a question about this product? Fill out the form and we&apos;ll be in touch.
          </DialogDescription>
        </DialogHeader>
        <form id="inquiryForm" className="grid gap-4 py-4" onSubmit={onSubmitInquiry}>
          <div className="space-y-2">
            <label>Product</label>
            <Input value={productName} readOnly />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="inquiryName">Full Name</label>
              <Input
                id="inquiryName"
                placeholder="Jane Smith"
                value={inquiry.name}
                onChange={(e) => setInquiry((p) => ({ ...p, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="inquiryEmail">Email Address</label>
              <Input
                id="inquiryEmail"
                type="email"
                placeholder="jane.smith@example.com"
                value={inquiry.email}
                onChange={(e) => setInquiry((p) => ({ ...p, email: e.target.value }))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="inquiryMessage">Message</label>
            <Textarea
              id="inquiryMessage"
              placeholder="Your question or message..."
              value={inquiry.message}
              onChange={(e) => setInquiry((p) => ({ ...p, message: e.target.value }))}
            />
          </div>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button type="button" variant="secondary">Cancel</Button>
            </motion.div>
          </DialogClose>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button type="submit" form="inquiryForm" disabled={isSubmitting}>
              {isSubmitting ? 'Sending…' : 'Send Inquiry'}
            </Button>
          </motion.div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface ProductDetailModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  product: {
    title: string;
    imageSrc?: string;
    description: string;
    highlights?: string[];
  } | null;
  systemKey: SystemKey;
  systemLabel: string;
}

export const ProductDetailModal = ({
  isOpen,
  onOpenChange,
  product,
  systemKey,
  systemLabel,
}: ProductDetailModalProps) => {
  const openQuoteModal = () => {
    onOpenChange(false);
    // Small delay to allow this modal to close first
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent('zaxis:open-quote', {
          detail: { productInterest: systemKey, product: product?.title },
        })
      );
    }, 150);
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl leading-relaxed pr-8">{product.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
              Z Axis {systemLabel}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Product Image */}
          {product.imageSrc && (
            <div className="relative w-full h-64 bg-secondary/30 rounded-lg overflow-hidden">
              <img
                src={product.imageSrc}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>
          )}

          {/* Description */}
          <div>
            <h4 className="font-bold text-base uppercase tracking-wide text-primary mb-2">
              Overview
            </h4>
            <p className="text-foreground leading-relaxed">{product.description}</p>
          </div>

          {/* Highlights */}
          {product.highlights && product.highlights.length > 0 && (
            <div>
              <h4 className="font-bold text-base uppercase tracking-wide text-primary mb-3">
                Key Features & Specifications
              </h4>
              <ul className="space-y-2">
                {product.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-foreground/90">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <DialogClose asChild>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Button type="button" variant="outline" className="w-full">
                Close
              </Button>
            </motion.div>
          </DialogClose>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <Button type="button" onClick={openQuoteModal} className="w-full">
              Get Quote for This Product
            </Button>
          </motion.div>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  );
};

// Brochure slide images – one per page, in order
const BROCHURE_PAGES: string[] = Array.from({ length: 21 }, (_, i) =>
  `/Brochure/zaxisflipbook/Z Axis  CORP PRESENTATION PPT-${i + 1}.png`
);

interface BrochureModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const BrochureModal = ({ isOpen, onOpenChange }: BrochureModalProps) => {
  const [form, setForm] = useState({
    email: "",
    phone: "",
    company: "",
  });
  type BrochureErrors = Partial<{
    email: string;
    phone: string;
    company: string;
  }>;
  const [formErrors, setFormErrors] = useState<BrochureErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBrochure, setShowBrochure] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  const isFormValid = useMemo(() => {
    return (
      emailRegex.test(form.email.trim()) &&
      phoneRegex.test((form.phone || '').replace(/\D/g, '')) &&
      form.company.trim().length > 0
    );
  }, [form]);

  const validateForm = () => {
    const errors: BrochureErrors = {};
    if (!emailRegex.test(form.email.trim())) errors.email = 'Enter a valid email address.';
    const digits = (form.phone || '').replace(/\D/g, '').slice(0, 10);
    if (!phoneRegex.test(digits)) errors.phone = 'Enter a 10-digit mobile number.';
    if (!form.company.trim()) errors.company = 'Company name is required.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Reset form state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setForm({ email: "", phone: "", company: "" });
      setFormErrors({});
      setShowBrochure(false);
    }
  }, [isOpen]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      const phoneDigits = (form.phone || '').replace(/\D/g, '').slice(0, 10);

      // Try to send email, but don't block brochure access if it fails
      try {
        const res = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            kind: 'brochure',
            subject: 'Z AXIS — Brochure Request',
            fields: [
              { label: 'Email', value: form.email },
              { label: 'Phone', value: `+91${phoneDigits}` },
              { label: 'Company', value: form.company },
            ],
          }),
        });

        const data = (await res.json().catch(() => null)) as null | { ok?: boolean; error?: string };
        if (!res.ok || !data?.ok) {
          console.warn('Email notification failed:', data?.error || 'Unknown error');
        }
      } catch (emailErr) {
        console.warn('Email notification failed:', emailErr);
      }

      // Show flipbook regardless of email status
      setShowBrochure(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={showBrochure ? "max-w-[100vw] sm:max-w-[95vw] lg:max-w-[1200px] h-[90vh] sm:h-auto" : "sm:max-w-[450px]"}>
        {showBrochure ? (
          <>
            <DialogHeader>
              <DialogTitle>Z AXIS Corporate Brochure</DialogTitle>
              <DialogDescription>
                Browse through our corporate presentation.
              </DialogDescription>
            </DialogHeader>
            <FlipBook pages={BROCHURE_PAGES} />
            <DialogFooter>
              <DialogClose asChild>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button type="button" variant="secondary">Close</Button>
                </motion.div>
              </DialogClose>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Get Our Brochure</DialogTitle>
              <DialogDescription>
                Please provide your details to access our corporate brochure.
              </DialogDescription>
            </DialogHeader>
            <form id="brochureForm" className="grid gap-4 py-4" onSubmit={onSubmit}>
              <div className="space-y-2">
                <label htmlFor="brochureEmail" className="font-medium">Email Address <span className="text-red-600 ml-1" aria-hidden>*</span></label>
                <Input
                  id="brochureEmail"
                  type="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={(e) => {
                    setForm((p) => ({ ...p, email: e.target.value }));
                    setFormErrors((f) => ({ ...f, email: undefined }));
                  }}
                  aria-required
                  aria-invalid={!!formErrors.email}
                />
                {formErrors.email && <p className="text-sm text-destructive mt-1">{formErrors.email}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="brochurePhone" className="font-medium">Phone Number <span className="text-red-600 ml-1" aria-hidden>*</span></label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 bg-muted text-sm">+91</span>
                  <Input
                    id="brochurePhone"
                    type="tel"
                    placeholder="Enter your mobile no."
                    value={form.phone}
                    onChange={(e) => {
                      const digits = (e.target.value || '').replace(/\D/g, '').slice(0, 10);
                      setForm((p) => ({ ...p, phone: digits }));
                      setFormErrors((f) => ({ ...f, phone: undefined }));
                    }}
                    className="rounded-l-none"
                    aria-required
                    aria-invalid={!!formErrors.phone}
                  />
                </div>
                {formErrors.phone && <p className="text-sm text-destructive mt-1">{formErrors.phone}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="brochureCompany" className="font-medium">Company Name <span className="text-red-600 ml-1" aria-hidden>*</span></label>
                <Input
                  id="brochureCompany"
                  placeholder="Your Company Ltd."
                  value={form.company}
                  onChange={(e) => {
                    setForm((p) => ({ ...p, company: e.target.value }));
                    setFormErrors((f) => ({ ...f, company: undefined }));
                  }}
                  aria-required
                  aria-invalid={!!formErrors.company}
                />
                {formErrors.company && <p className="text-sm text-destructive mt-1">{formErrors.company}</p>}
              </div>
            </form>
            <DialogFooter>
              <DialogClose asChild>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button type="button" variant="secondary">Cancel</Button>
                </motion.div>
              </DialogClose>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  form="brochureForm"
                  disabled={!isFormValid || isSubmitting}
                  className={`${(!isFormValid || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Processing…' : 'Get Brochure'}
                </Button>
              </motion.div>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
