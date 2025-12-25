This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Email sending (direct, no manual mail client)

Forms (Get Quote, Product Inquiry, Contact) send emails directly to `zaxispro1@gmail.com` via the API route at `/api/send-email`.

Set these environment variables (e.g. in `.env.local`):

- `SMTP_HOST` (e.g. `smtp.gmail.com`)
- `SMTP_PORT` (e.g. `587`)
- `SMTP_SECURE` (`true` for 465, otherwise `false`)
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM` (optional; defaults to `SMTP_USER`)

Then run `npm run dev`.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Product updates ✅

- **2025-12-25:** Added **Labelling machine for flush syringes (PFS & cartridges)** to **Z Axis Pro** products.
  - Image path: `/public/Product/ZAxis Pro/Labelling Machine For Flush Syringes  PFS  cartridges/product599.jpeg`
  - Commit: `Add Labelling machine for flush syringes to Z Axis Pro products` on branch `Final`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
