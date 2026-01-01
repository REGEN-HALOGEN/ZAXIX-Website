import { getDocuments } from 'outstatic/server'
import { type SystemKey, type Product as ZAxisProduct, SYSTEMS } from './zaxis-systems'

// Types for CMS content
export interface ProductSpec {
    label: string
    value: string
}

export interface CMSProduct {
    title: string
    slug: string
    system: SystemKey // pro, pre, or core
    badge: string
    category: string
    image: string
    specs: ProductSpec[]
    description?: string
    highlights?: string[]
    publishedAt: string
    status: string
}

export interface MediaItem {
    title: string
    slug: string
    mediaType: 'video' | 'image'
    videoUrl?: string
    thumbnail?: string
    description?: string
    coverImage?: string
    publishedAt: string
    status: string
}

/**
 * Fetch all products from Outstatic CMS
 * Returns empty array if no products exist
 */
export function getCMSProducts(): CMSProduct[] {
    try {
        const products = getDocuments('products', [
            'title',
            'slug',
            'system',
            'badge',
            'category',
            'image',
            'specs',
            'content', // Use content field for description/highlights
            'publishedAt',
            'status'
        ])

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return products.map((p: any) => {
            // Parse specs from JSON string
            let specs: ProductSpec[] = []
            try {
                specs = typeof p.specs === 'string' ? JSON.parse(p.specs) : []
            } catch {
                specs = []
            }

            // Parse highlights from content (each line becomes a highlight)
            const highlights = p.content
                ? p.content.split('\n').filter((line: string) => line.trim().startsWith('-') || line.trim().startsWith('*'))
                    .map((line: string) => line.replace(/^[-*]\s*/, '').trim())
                : []

            return {
                title: p.title || '',
                slug: p.slug || '',
                system: (p.system as SystemKey) || 'pro',
                badge: p.badge || '',
                category: p.category || '',
                image: p.image || '',
                specs,
                description: p.content || '',
                highlights: highlights.length > 0 ? highlights : undefined,
                publishedAt: p.publishedAt || '',
                status: p.status || 'published'
            }
        })
    } catch (error) {
        // Return empty array if collection doesn't exist yet
        console.log('Products collection not found:', error)
        return []
    }
}

/**
 * Get products for a specific system (pro, pre, or core)
 * Merges CMS products with default products from SYSTEMS
 */
export function getProductsForSystem(systemKey: SystemKey): ZAxisProduct[] {
    const cmsProducts = getCMSProducts()
    const systemProducts = cmsProducts.filter(p => p.system === systemKey)

    // If we have CMS products for this system, use them
    // Otherwise fall back to the default products
    if (systemProducts.length > 0) {
        return systemProducts.map(p => ({
            title: p.title,
            imageSrc: p.image || undefined,
            description: p.description || '',
            highlights: p.highlights
        }))
    }

    // Return default products from SYSTEMS
    return SYSTEMS[systemKey].products
}

/**
 * Get merged SYSTEMS object with CMS products
 */
export function getSystemsWithCMS(): typeof SYSTEMS {
    const cmsProducts = getCMSProducts()

    // If no CMS products, return original SYSTEMS
    if (cmsProducts.length === 0) {
        return SYSTEMS
    }

    // Create a copy of SYSTEMS and merge CMS products
    const mergedSystems = { ...SYSTEMS }

    for (const key of ['pro', 'pre', 'core'] as SystemKey[]) {
        const systemCMSProducts = cmsProducts.filter(p => p.system === key)

        if (systemCMSProducts.length > 0) {
            mergedSystems[key] = {
                ...SYSTEMS[key],
                products: [
                    // CMS products first
                    ...systemCMSProducts.map(p => ({
                        title: p.title,
                        imageSrc: p.image || undefined,
                        description: p.description || '',
                        highlights: p.highlights
                    })),
                    // Then default products
                    ...SYSTEMS[key].products
                ]
            }
        }
    }

    return mergedSystems
}

/**
 * Fetch all media items from Outstatic CMS
 * Returns empty array if no media exists
 */
export function getMedia(): MediaItem[] {
    try {
        const media = getDocuments('media', [
            'title',
            'slug',
            'mediaType',
            'videoUrl',
            'thumbnail',
            'description',
            'coverImage',
            'publishedAt',
            'status'
        ])

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return media.map((m: any) => ({
            title: m.title || '',
            slug: m.slug || '',
            mediaType: (m.mediaType as 'video' | 'image') || 'image',
            videoUrl: m.videoUrl,
            thumbnail: m.thumbnail,
            description: m.description,
            coverImage: m.coverImage,
            publishedAt: m.publishedAt || '',
            status: m.status || 'published'
        }))
    } catch (error) {
        // Return empty array if collection doesn't exist yet
        console.log('Media collection not found:', error)
        return []
    }
}

// Re-export for backwards compatibility
export { type CMSProduct as Product }
