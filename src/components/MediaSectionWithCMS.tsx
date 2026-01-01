import { getMedia } from '@/lib/outstatic';
import MediaSection from './MediaSection';

// Server component that fetches CMS data and passes to client component
export default function MediaSectionWithCMS() {
    // Fetch media from CMS (server-side)
    const cmsMedia = getMedia();

    // Transform CMS media to match component interface
    const transformedMedia = cmsMedia.map(m => ({
        title: m.title || '',
        slug: m.slug || '',
        mediaType: m.mediaType || 'image',
        videoUrl: m.videoUrl,
        thumbnail: m.thumbnail,
        description: m.description,
        coverImage: m.coverImage,
    }));

    return <MediaSection cmsMedia={transformedMedia.length > 0 ? transformedMedia : undefined} />;
}
