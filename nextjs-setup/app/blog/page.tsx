import { Metadata } from 'next';
import Link from 'next/link';
import { getBlogPosts, type BlogPostRecord } from '@/lib/blog-data';
import { generateMetadata as genMeta } from '@/lib/seo';
import MarketingPageShell from '@/components/content/MarketingPageShell';
import ContentPageHeader from '@/components/content/ContentPageHeader';
import MarketingFooter from '@/components/content/MarketingFooter';

export const metadata: Metadata = genMeta({
  title: 'Blog - Restaurant Management Tips & Insights',
  description:
    'Learn about restaurant management, POS systems, inventory management, and more from TasteIQ experts.',
  keywords: [
    'restaurant tips',
    'POS guide',
    'restaurant management',
    'inventory tips',
    'restaurant operations',
    'cloud kitchen',
  ],
  url: '/blog',
  type: 'website',
});

export default async function BlogPage() {
  const { posts } = await getBlogPosts(20);

  return (
    <MarketingPageShell>
      <main className="mkt-page">
        <section className="mkt-sec wrap">
          <ContentPageHeader
            eye="Blog"
            title={
              <>
                restaurant ops, <em>in plain language.</em>
              </>
            }
            subtitle="Expert insights on POS, kitchens, inventory and growth — from the TasteIQ team."
          />

          {posts.length === 0 ? (
            <div className="mkt-empty">
              <p>No posts yet. Check back soon.</p>
            </div>
          ) : (
            <div className="blog-grid">
              {(posts as BlogPostRecord[]).map((post) => (
                <article key={post.id} className="blog-card">
                  {post.image ? (
                    <div className="blog-card-media">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={post.image} alt="" />
                    </div>
                  ) : null}
                  <div className="blog-card-body">
                    <span className="blog-tag">{post.category}</span>
                    <h2 className="blog-card-title">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="blog-card-excerpt">{post.excerpt || post.description}</p>
                    <div className="blog-card-meta">
                      <span>{post.author}</span>
                      <span aria-hidden="true">·</span>
                      <time dateTime={String(post.publishedAt || post.createdAt)}>
                        {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                      <span aria-hidden="true">·</span>
                      <span>{post.readTime} min read</span>
                    </div>
                    {post.tags && post.tags.length > 0 ? (
                      <div className="blog-tags">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="blog-tag-pill">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
      <MarketingFooter />
    </MarketingPageShell>
  );
}
