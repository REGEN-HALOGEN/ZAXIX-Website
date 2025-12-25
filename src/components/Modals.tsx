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
