import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: 'https://frontforumfocus.com/', lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: 'https://frontforumfocus.com/faq', lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://frontforumfocus.com/how-to/set-your-north-star', lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];
}

