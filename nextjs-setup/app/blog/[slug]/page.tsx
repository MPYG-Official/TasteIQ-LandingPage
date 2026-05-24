import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllBlogSlugs, getBlogPostBySlug } from '@/lib/blog-data';
import { generateMetadata as genMeta, generateArticleStructuredData } from '@/lib/seo';
import { formatBlogContent } from '@/lib/blog-content';
import MarketingPageShell from '@/components/content/MarketingPageShell';
import MarketingFooter from '@/components/content/MarketingFooter';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tasteiq.in';

export const dynamic = 'force-static';
export const dynamicParams = false;

/** Next static export requires ≥1 param; unused placeholder is omitted from sitemap/links */
const STATIC_EXPORT_PLACEHOLDER = '__placeholder__';

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const slugs = await getAllBlogSlugs();
    if (slugs.length === 0) {
      return [{ slug: STATIC_EXPORT_PLACEHOLDER }];
    }
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [{ slug: STATIC_EXPORT_PLACEHOLDER }];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return {};
  }

  return genMeta({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.description || post.excerpt || '',
    keywords:
      post.seoKeywords && post.seoKeywords.length > 0
        ? post.seoKeywords
        : [post.category, 'restaurant management'],
    image: post.image || '/og-image.png',
    url: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: String(post.publishedAt || post.createdAt),
    author: post.author,
    section: post.category,
    tags: post.tags || [post.category],
  });
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  if (params.slug === STATIC_EXPORT_PLACEHOLDER) {
    notFound();
  }

  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const structuredData = generateArticleStructuredData({
    headline: post.title,
    description: post.description || post.excerpt || '',
    image: post.image
      ? post.image.startsWith('http')
        ? post.image
        : `${siteUrl}${post.image}`
      : `${siteUrl}/og-image.png`,
    datePublished: String(post.publishedAt || post.createdAt),
    author: post.author,
    publisher: {
      name: 'TasteIQ',
      logo: `${siteUrl}/og-image.png`,
    },
  });

  const formattedContent = formatBlogContent(post.content);

  return (
    <MarketingPageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <article className="blog-article">
        <div className="wrap blog-article-inner">
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/blog">Blog</Link>
            <span>/</span>
            <span>{post.title}</span>
          </nav>

          <header className="blog-article-header">
            <span className="blog-tag">{post.category}</span>
            <h1 className="blog-article-title">{post.title}</h1>
            <div className="blog-article-meta">
              <span>{post.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={String(post.publishedAt || post.createdAt)}>
                {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span aria-hidden="true">·</span>
              <span>{post.readTime} min read</span>
              {post.views && post.views > 0 ? (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{post.views} views</span>
                </>
              ) : null}
            </div>
            {post.tags && post.tags.length > 0 ? (
              <div className="blog-tags" style={{ marginTop: '16px' }}>
                {post.tags.map((tag: string) => (
                  <span key={tag} className="blog-tag-pill">
                    #{tag}
                  </span>
                ))}
              </div>
            ) : null}
          </header>

          {post.image ? (
            <div className="blog-hero-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.image} alt={post.title} />
            </div>
          ) : null}

          <div className="mkt-prose" dangerouslySetInnerHTML={{ __html: formattedContent }} />

          <div className="mkt-author-box">
            <h3>About the author</h3>
            <p>
              {post.author} is part of the TasteIQ team, helping restaurants run better on one F&amp;B
              stack.
            </p>
          </div>

          <Link href="/blog" className="mkt-back-link">
            ← Back to blog
          </Link>
        </div>
      </article>
      <MarketingFooter />
    </MarketingPageShell>
  );
}
