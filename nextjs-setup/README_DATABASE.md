# Database Setup Guide

## Quick Start

1. **Add your database URL to `.env.local`:**
   ```bash
   DATABASE_URL="postgresql://username:password@host:5432/database_name?schema=public"
   ```

2. **Run migrations:**
   ```bash
   npx prisma migrate dev --name init
   ```

3. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## Creating Blog Posts

### Via API (Recommended for production)

You can create blog posts via the API:

```bash
POST /api/blog
Content-Type: application/json

{
  "slug": "your-blog-post-slug",
  "title": "Your Blog Post Title",
  "description": "A brief description for SEO",
  "content": "Full blog post content in markdown or HTML",
  "excerpt": "Short excerpt for listing pages",
  "author": "TasteIQ Team",
  "category": "Technology",
  "tags": ["POS", "restaurant", "technology"],
  "image": "/images/blog/your-image.jpg",
  "featured": false,
  "seoTitle": "Custom SEO Title",
  "seoDescription": "Custom SEO description",
  "seoKeywords": ["keyword1", "keyword2"],
  "readTime": 5,
  "published": true
}
```

### Via Prisma Studio (For development)

1. Open Prisma Studio:
   ```bash
   npx prisma studio
   ```

2. Navigate to `BlogPost` model
3. Click "Add record"
4. Fill in the fields and save

## API Endpoints

### Blog Posts

- `GET /api/blog` - Get all published blog posts
  - Query params: `category`, `featured`, `limit`, `offset`
- `GET /api/blog/[slug]` - Get a single blog post
- `POST /api/blog` - Create a new blog post
- `PUT /api/blog/[slug]` - Update a blog post
- `DELETE /api/blog/[slug]` - Delete a blog post
- `GET /api/blog/categories` - Get all categories with post counts

## Example: Creating Your First Blog Post

```bash
curl -X POST http://localhost:3000/api/blog \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "10-ways-to-reduce-restaurant-costs",
    "title": "10 Ways to Reduce Restaurant Operating Costs",
    "description": "Discover practical strategies to cut costs and increase profitability in your restaurant.",
    "content": "# 10 Ways to Reduce Restaurant Operating Costs\n\nRunning a restaurant can be expensive...",
    "excerpt": "Learn how to reduce costs without compromising quality.",
    "author": "TasteIQ Team",
    "category": "Cost Management",
    "tags": ["cost reduction", "restaurant management", "profitability"],
    "image": "/images/blog/cost-reduction.jpg",
    "featured": true,
    "seoTitle": "10 Ways to Reduce Restaurant Costs | TasteIQ",
    "seoDescription": "Practical strategies to cut restaurant operating costs and increase profitability.",
    "seoKeywords": ["restaurant costs", "cost reduction", "restaurant profitability"],
    "readTime": 8,
    "published": true
  }'
```

## Database Models

### BlogPost
- `id`: Unique identifier
- `slug`: URL-friendly identifier (unique)
- `title`: Blog post title
- `description`: SEO description
- `content`: Full blog content
- `excerpt`: Short excerpt for listings
- `author`: Author name
- `category`: Category name
- `tags`: Array of tags
- `image`: Featured image URL
- `featured`: Boolean for featured posts
- `published`: Boolean for published status
- `publishedAt`: Publication date
- `seoTitle`: Custom SEO title
- `seoDescription`: Custom SEO description
- `seoKeywords`: Array of SEO keywords
- `readTime`: Reading time in minutes
- `views`: View count
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

### SEOContent
- For managing SEO metadata for static pages
- Fields: `page`, `title`, `description`, `keywords`, `ogImage`, `structuredData`

### BlogCategory
- For managing blog categories
- Fields: `name`, `slug`, `description`

## Production Considerations

1. **Add authentication** to POST/PUT/DELETE endpoints
2. **Add rate limiting** to prevent abuse
3. **Add image upload** functionality
4. **Add content validation**
5. **Set up database backups**
6. **Use connection pooling** for production

## Troubleshooting

### Connection Issues
- Verify your `DATABASE_URL` is correct
- Check if PostgreSQL is running
- Verify network/firewall settings

### Migration Issues
- Make sure you're using the latest Prisma version
- Check for existing tables that might conflict
- Use `prisma migrate reset` (WARNING: deletes all data) if needed

### Prisma Client Issues
- Run `npx prisma generate` after schema changes
- Restart your development server

