'use client';

import React from 'react';
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

interface QuoteModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const QuoteModal = ({ isOpen, onOpenChange }: QuoteModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Request a Quote</DialogTitle>
          <DialogDescription>
            Fill out the form below and we will get back to you with a detailed quote.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="quoteName">Full Name</label>
              <Input id="quoteName" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label htmlFor="quoteEmail">Email Address</label>
              <Input id="quoteEmail" type="email" placeholder="john.doe@example.com" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="quoteCompany">Company</label>
              <Input id="quoteCompany" placeholder="Doe Inc." />
            </div>
            <div className="space-y-2">
              <label htmlFor="quoteProduct">Product Interest</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tablet">Tablet Manufacturing</SelectItem>
                  <SelectItem value="capsule">Capsule Equipment</SelectItem>
                  <SelectItem value="liquid">Liquid Processing</SelectItem>
                  <SelectItem value="processing">Processing Equipment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="quoteMessage">Requirements</label>
            <Textarea id="quoteMessage" placeholder="Describe your project requirements..." />
          </div>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">Cancel</Button>
          </DialogClose>
          <Button type="submit">Submit Request</Button>
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
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Product Inquiry: {productName}</DialogTitle>
          <DialogDescription>
            Have a question about this product? Fill out the form and we&apos;ll be in touch.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4">
          <div className="space-y-2">
            <label>Product</label>
            <Input value={productName} readOnly />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="inquiryName">Full Name</label>
              <Input id="inquiryName" placeholder="Jane Smith" />
            </div>
            <div className="space-y-2">
              <label htmlFor="inquiryEmail">Email Address</label>
              <Input id="inquiryEmail" type="email" placeholder="jane.smith@example.com" />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="inquiryMessage">Message</label>
            <Textarea id="inquiryMessage" placeholder="Your question or message..." />
          </div>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">Cancel</Button>
          </DialogClose>
          <Button type="submit">Send Inquiry</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
