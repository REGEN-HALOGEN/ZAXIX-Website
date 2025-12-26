# Z AXIS Pharmachine Concepts

<div align="center">

![Z AXIS Pharmachine](public/logo.svg)

**Next-Edge Pharmaceutical Packaging Systems**

[![Next.js](https://img.shields.io/badge/Next.js-13.5.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.5-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000?style=for-the-badge&logo=vercel)](https://vercel.com/)

[Live Website](https://www.zaxispharmachine.com) • [Contact Us](#contact)

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [SEO Implementation](#seo-implementation)
- [Deployment](#deployment)
- [Product Updates](#product-updates)

---

## 🏢 About

Z AXIS Pharmachine Concepts is a leading provider of pharmaceutical packaging systems with a **Pharma 4.0**, sterile, compliant, automation-first philosophy. This website showcases our products, services, infrastructure, and company information.

---

## 🛠️ Tech Stack

### Core Framework

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 13.5.4 | React framework with App Router for server-side rendering and static generation |
| **React** | 18.2.0 | UI component library |
| **TypeScript** | 5.x | Type-safe JavaScript |

### Styling & UI

| Technology | Version | Purpose |
|------------|---------|---------|
| **Tailwind CSS** | 3.3.5 | Utility-first CSS framework |
| **tailwindcss-animate** | 1.0.7 | Animation utilities for Tailwind |
| **tailwind-merge** | 3.3.1 | Merge Tailwind classes without conflicts |
| **class-variance-authority** | 0.7.0 | Component variant management |
| **clsx** | 2.0.0 | Conditional className utility |

### UI Components

| Technology | Version | Purpose |
|------------|---------|---------|
| **Radix UI** | Latest | Headless, accessible UI primitives |
| └─ `@radix-ui/react-dialog` | 1.1.15 | Modal dialogs |
| └─ `@radix-ui/react-select` | 2.2.6 | Select dropdowns |
| └─ `@radix-ui/react-slot` | 1.2.3 | Slot component for composition |
| **Lucide React** | 0.294.0 | Beautiful, consistent icon library |

### Animation

| Technology | Version | Purpose |
|------------|---------|---------|
| **GSAP** | 3.14.2 | Professional-grade animation library |
| **Framer Motion** | 12.23.26 | React animation library |
| **Lottie** | 0.17.10 | After Effects animations in web |

### Backend & Email

| Technology | Version | Purpose |
|------------|---------|---------|
| **Nodemailer** | 7.0.12 | Email sending via SMTP |
| **Next.js API Routes** | - | Serverless API endpoints |

### Development Tools

| Technology | Version | Purpose |
|------------|---------|---------|
| **ESLint** | 8.56.0 | Code linting |
| **PostCSS** | 8.4.31 | CSS processing |
| **Autoprefixer** | 10.4.16 | CSS vendor prefixing |

---

## ✨ Features

### 🎨 UI/UX
- **Responsive Design** - Fully responsive across all devices
- **Dark/Light Mode** - Theme toggle support
- **Smooth Animations** - GSAP and Framer Motion powered interactions
- **Animated Stars Background** - Site-wide immersive background
- **Prism Effects** - Dynamic glass-morphism card effects

### 🔍 SEO
- **Server-rendered Metadata** - Full SEO via Next.js Metadata API
- **Open Graph & Twitter Cards** - Optimized social sharing
- **JSON-LD Structured Data** - Organization & WebSite schemas
- **Dynamic Sitemap** - Auto-generated sitemap.xml
- **Robots.txt** - Proper crawler directives
- **Canonical URLs** - Non-www to www redirects

### 📧 Contact & Forms
- **Quote Request Modal** - Product inquiry forms
- **Contact Form** - Direct email via SMTP
- **Side Contact Bar** - Quick access contact options

### 🏭 Product Showcase
- **Dynamic Product Gallery** - Category-based filtering
- **Infrastructure Section** - Manufacturing facility showcase
- **Scrolling Image Galleries** - Interactive image displays

---

## 📁 Project Structure

```
zaxix/
├── public/                    # Static assets
│   ├── Product/              # Product images
│   ├── Infra/                # Infrastructure images
│   ├── og_Image.png          # Open Graph image
│   └── logo.svg              # Brand logo
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── api/              # API routes
│   │   │   └── send-email/   # Email endpoint
│   │   ├── infrastructure/   # Infrastructure page
│   │   ├── layout.tsx        # Root layout with global metadata
│   │   ├── page.tsx          # Home page
│   │   ├── robots.ts         # Robots.txt generation
│   │   ├── sitemap.ts        # Sitemap generation
│   │   └── globals.css       # Global styles
│   ├── components/           # React components
│   │   ├── seo/              # SEO components
│   │   │   └── JsonLd.tsx    # Structured data
│   │   ├── ui/               # UI primitives
│   │   ├── Header.tsx        # Navigation header
│   │   ├── Hero.tsx          # Hero section
│   │   ├── About.tsx         # About section
│   │   ├── Services.tsx      # Services/Systems section
│   │   ├── Products.tsx      # Product showcase
│   │   ├── Contact.tsx       # Contact section
│   │   └── Footer.tsx        # Footer
│   ├── lib/                  # Utilities
│   │   ├── seo.config.ts     # SEO configuration
│   │   ├── zaxis-systems.ts  # Product data
│   │   └── utils.ts          # Helper functions
│   └── context/              # React contexts
│       └── LoadingContext.tsx
├── scripts/                  # Build scripts
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-repo/zaxix.git

# Navigate to project directory
cd zaxix

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run generate-infra-manifest` | Generate infrastructure manifest |

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Site URL (for SEO)
NEXT_PUBLIC_SITE_URL=https://www.zaxispharmachine.com

# Google Site Verification (optional)
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code

# SMTP Configuration (for email forms)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
```

---

## 🔍 SEO Implementation

This website implements comprehensive SEO best practices:

### Global Metadata
- **Canonical URL**: `https://www.zaxispharmachine.com`
- **Title Template**: `%s | Z AXIS Pharmachine Concepts`
- **Meta Description**: Optimized 150-160 character descriptions

### Open Graph & Social
- **OG Image**: 1200x630 PNG optimized for social sharing
- **Twitter Card**: `summary_large_image` for rich previews
- **Locale**: `en_IN` for Indian English

### Structured Data (JSON-LD)
- **Organization Schema**: Company details, logo, contact
- **WebSite Schema**: Site search action
- **Breadcrumb Schema**: Navigation structure

### Technical SEO
- **Non-www Redirect**: 308 permanent redirect to www
- **Dynamic Sitemap**: Auto-generated with all routes
- **Robots.txt**: Proper allow/disallow rules
- **Server-rendered**: All SEO metadata rendered server-side

---

## 🚢 Deployment

### Vercel (Recommended)

This project is optimized for deployment on [Vercel](https://vercel.com):

1. Push to your Git repository
2. Import project in Vercel
3. Configure environment variables
4. Deploy

The website auto-deploys on every push to the `Final` branch.

### Other Platforms

Build the production bundle:

```bash
npm run build
npm run start
```

---

## 📦 Product Updates

### 2025-12-27
- Implemented comprehensive SEO system
- Added JSON-LD structured data components
- Enhanced Open Graph and Twitter cards
- Created infrastructure page with page-level SEO

### 2025-12-25
- Added **Labelling machine for flush syringes (PFS & cartridges)** to Z Axis Pro products

---

## 📄 License

This project is proprietary. All rights reserved by Z AXIS Pharmachine Concepts India Private Limited.

---

<div align="center">

**Built with ❤️ by Z AXIS Pharmachine Concepts**

[Website](https://www.zaxispharmachine.com) • [Contact](mailto:info@zaxispharmachine.com)

</div>
