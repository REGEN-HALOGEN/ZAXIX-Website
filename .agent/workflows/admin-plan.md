---
description: Implement admin panel with Outstatic CMS for managing products and media
---

# Admin Panel Implementation Plan

## Overview

Add a free, open-source admin panel using **Outstatic CMS** to manage **Products** and **Media** (videos/images).

| Factor | Details |
|--------|---------|
| **Cost** | 100% Free |
| **Architecture** | Git-based (GitHub backend) |
| **Framework** | Built for Next.js |
| **Database** | None required |
| **Media** | Git repo + YouTube embeds for large videos |
| **Auth** | GitHub OAuth |

---

## Implementation Steps

### 1. Install Outstatic
```bash
npm install outstatic
```

### 2. Add Environment Variables to `.env.local`
```env
OST_GITHUB_ID=your_github_oauth_id
OST_GITHUB_SECRET=your_github_oauth_secret
OST_TOKEN_SECRET=random_32_char_string
OST_REPO_SLUG=ZAXIX-Website
```

### 3. Create Admin Route
Create `src/app/outstatic/[[...ost]]/page.tsx` for admin dashboard at `/outstatic`.

### 4. Create Content Directories
- `outstatic/content/products/` - Product markdown files
- `outstatic/content/media/` - Media item files

### 5. Configure Content Schemas

**Products Collection:**
- title, badge, category, image, specs[], publishedAt, status

**Media Collection:**
- title, type (video/image), videoUrl, image, description, publishedAt, status

### 6. Update Components
- Modify `Products.tsx` to fetch from CMS
- Modify `MediaSection.tsx` to display CMS media

### 7. GitHub OAuth Setup
Create a GitHub OAuth App at: https://github.com/settings/developers

---

## Verification
1. Visit `/outstatic` → Login via GitHub
2. Create test product → Verify appears on site
3. Add media item → Verify in media section
4. Deploy to Vercel → Test admin panel

---

## Estimated Time: 3-4 hours
