import { MetadataRoute } from 'next';
import { getAllBlogSlugs } from '@/lib/blog-data';
import { FOODS_SITE_URL } from '@/lib/site-urls';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tasteiq.in';

  const routes = [
    '',
    '/vision',
    '/fnb',
    '/hotels',
    '/pricing',
    '/privacy-policy',
    '/terms-and-condition',
    '/blog',
    '/careers',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority:
      route === ''
        ? 1
        : route === '/vision' || route === '/fnb' || route === '/hotels'
          ? 0.9
          : 0.8,
  }));

  const foodsSite = {
    url: FOODS_SITE_URL,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  };

  const slugs = await getAllBlogSlugs();
  const blogRoutes = slugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, foodsSite, ...blogRoutes];
}
