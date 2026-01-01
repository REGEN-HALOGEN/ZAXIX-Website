import { getDocuments } from 'outstatic/server'

// Types for CMS content
export interface ProductSpec {
    label: string
    value: string
}

export interface Product {
    title: string
    slug: string
    badge: string
    category: string
    image: string
    specs: ProductSpec[]
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
export function getProducts(): Product[] {
    try {
        const products = getDocuments('products', [
            'title',
            'slug',
            'badge',
            'category',
            'image',
            'specs',
            'publishedAt',
            'status'
        ])

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return products.map((p: any) => ({
            title: p.title || '',
            slug: p.slug || '',
            badge: p.badge || '',
            category: p.category || '',
            image: p.image || '',
            specs: typeof p.specs === 'string' ? JSON.parse(p.specs) : [],
            publishedAt: p.publishedAt || '',
            status: p.status || 'published'
        }))
    } catch (error) {
        // Return empty array if collection doesn't exist yet
        console.log('Products collection not found:', error)
        return []
    }
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
