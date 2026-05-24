# CMS Guide

## Overview

The Content Management System (CMS) allows you to manage blog posts through a user-friendly web interface instead of editing seed files or using the API directly.

## Accessing the CMS

1. **Set up your admin password** in `.env.local`:
   ```bash
   ADMIN_PASSWORD=your-secure-password
   ```

2. **Navigate to the login page**: `/admin/login`

3. **Enter your password** and click "Sign in"

4. You'll be redirected to the **CMS Dashboard** at `/admin/cms`

## Features

### Dashboard (`/admin/cms`)
- View all blog posts (published and drafts)
- See post status (Published/Draft, Featured)
- View post metrics (views, creation date)
- Quick actions: Edit or Delete posts
- Create new posts with the "+ New Post" button

### Creating a New Post (`/admin/cms/new`)
- **Title**: The post title (required)
- **Slug**: URL-friendly identifier (auto-generated from title, but editable)
- **Description**: Brief description for SEO (required)
- **Content**: Full blog post content in Markdown (required)
- **Excerpt**: Short excerpt for listing pages (optional)
- **Category**: Post category (required)
- **Author**: Author name (defaults to "TasteIQ Team")
- **Tags**: Comma-separated tags
- **Image URL**: Featured image URL
- **Read Time**: Estimated reading time in minutes
- **SEO Settings**: SEO title, description, and keywords
- **Options**: Featured checkbox, Published checkbox

### Editing a Post (`/admin/cms/[slug]`)
- Same interface as creating, but pre-filled with existing data
- Make changes and click "Save Changes"

### Deleting a Post
- From the dashboard, click "Delete" next to any post
- Confirm the deletion
- The post will be permanently removed

## Content Formatting

The CMS supports **Markdown** for blog post content. You can use:

- Headers: `# H1`, `## H2`, `### H3`
- Bold: `**bold text**`
- Italic: `*italic text*`
- Lists: `- item` or `1. item`
- Links: `[text](url)`
- Code: `` `code` `` or ````code blocks````

## Best Practices

1. **Slugs**: Keep them short, descriptive, and URL-friendly
   - Good: `10-ways-to-reduce-costs`
   - Bad: `10 Ways to Reduce Costs!!!`

2. **SEO**: Fill in SEO fields for better search visibility
   - SEO Title: 50-60 characters
   - SEO Description: 150-160 characters
   - SEO Keywords: 5-10 relevant keywords

3. **Categories**: Use consistent category names
   - Examples: "Operations", "Technology", "Cost Management", "Revenue Growth"

4. **Tags**: Use specific, relevant tags
   - Examples: "POS system", "inventory management", "restaurant profitability"

5. **Content**: Write engaging, valuable content
   - Use headers to break up content
   - Include actionable tips
   - Add internal/external links where relevant

## Security Notes

- **Change the default password** in production
- The CMS is protected by password authentication
- Admin routes are excluded from search engines (see `robots.ts`)
- Consider implementing proper authentication (NextAuth, etc.) for production use

## Troubleshooting

### Can't log in?
- Check that `ADMIN_PASSWORD` is set in `.env.local`
- Restart your development server after changing `.env.local`
- Default password is `admin123` if not set

### Posts not saving?
- Check that all required fields are filled
- Ensure the slug is unique
- Check browser console for errors

### Can't see posts?
- Make sure you've run the database migrations
- Check that the database connection is working
- Verify posts exist in the database (use Prisma Studio: `npx prisma studio`)

## Alternative: Using the API

You can also manage posts via the API:

```bash
# Create a post
curl -X POST http://localhost:3000/api/blog \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "my-post",
    "title": "My Post Title",
    "description": "Post description",
    "content": "Full content here",
    "category": "Technology",
    "published": true
  }'

# Update a post
curl -X PUT http://localhost:3000/api/blog/my-post \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title"}'

# Delete a post
curl -X DELETE http://localhost:3000/api/blog/my-post
```

## Next Steps

- Add more content types (categories, pages, etc.)
- Implement image upload functionality
- Add rich text editor (TinyMCE, Quill, etc.)
- Enhance authentication (multi-user, roles, etc.)
- Add analytics and reporting

