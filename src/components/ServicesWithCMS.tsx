import { getSystemsWithCMS } from '@/lib/outstatic';
import ServicesClient from './ServicesClient';

// Server component that fetches CMS data and passes to client component
export default function ServicesWithCMS() {
    // Fetch merged systems data from CMS (server-side)
    const systemsData = getSystemsWithCMS();

    return <ServicesClient systemsData={systemsData} />;
}
