import { getProducts } from '@/lib/outstatic';
import Products from './Products';

// Server component that fetches CMS data and passes to client component
export default function ProductsWithCMS() {
    // Fetch products from CMS (server-side)
    const cmsProducts = getProducts();

    // Transform CMS products to match component interface
    const transformedProducts = cmsProducts.map(p => ({
        category: p.category || 'processing',
        badge: p.badge || '',
        title: p.title || '',
        specs: p.specs || [],
        image: p.image || '/Product/ZAxis%20Pro/R%26D%20Filling%20machines/product9.png',
    }));

    return <Products cmsProducts={transformedProducts.length > 0 ? transformedProducts : undefined} />;
}
