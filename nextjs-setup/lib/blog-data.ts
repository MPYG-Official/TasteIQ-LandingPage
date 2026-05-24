import { prisma } from '@/lib/db';

export type BlogPostRecord = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  description?: string | null;
  content: string;
  category: string;
  author: string;
  readTime: number;
  image?: string | null;
  publishedAt?: Date | string | null;
  createdAt: Date | string;
  tags?: string[] | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string[] | null;
  views?: number;
};

function canUseDatabase(): boolean {
  if (process.env.SKIP_DATABASE === '1' || process.env.STATIC_EXPORT === '1') {
    return false;
  }
  return Boolean(process.env.DATABASE_URL?.trim());
}

export async function getBlogPosts(limit = 20): Promise<{ posts: BlogPostRecord[]; total: number }> {
  if (!canUseDatabase()) {
    return { posts: [], total: 0 };
  }

  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      take: limit,
    });
    return { posts: posts as BlogPostRecord[], total: posts.length };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return { posts: [], total: 0 };
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostRecord | null> {
  if (!canUseDatabase()) {
    return null;
  }

  try {
    const post = await prisma.blogPost.findFirst({
      where: { slug, published: true },
    });
    return (post as BlogPostRecord | null) ?? null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function getAllBlogSlugs(): Promise<string[]> {
  if (!canUseDatabase()) {
    return [];
  }

  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true },
    });
    return posts.map((p) => p.slug);
  } catch (error) {
    console.error('Error fetching blog slugs:', error);
    return [];
  }
}
