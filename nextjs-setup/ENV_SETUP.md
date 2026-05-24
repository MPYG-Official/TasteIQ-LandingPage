# Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/tasteiq_db?schema=public"

# Google Analytics 4
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Tag Manager
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Google Ads Conversion Tracking
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX

# Facebook Pixel
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=XXXXXXXXXXXXXXX

# LinkedIn Insight Tag
NEXT_PUBLIC_LINKEDIN_ID=XXXXXX

# Microsoft UET Tag
NEXT_PUBLIC_MICROSOFT_UET_ID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX

# A/B Testing (Optional - for Vercel Edge Config)
EDGE_CONFIG_URL=https://edge-config.vercel.app/your-config-id

# Site URL (canonical domain for SEO, sitemap, Open Graph)
NEXT_PUBLIC_SITE_URL=https://tasteiq.in

# Site theme experiment: classic (Poppins + purple) | prototype (Instrument Serif + terracotta)
# Affects the marketing homepage styling only. /vision and /foods always use the prototype design.
NEXT_PUBLIC_SITE_THEME=classic

# Admin CMS Password (for /admin/login)
ADMIN_PASSWORD=your-secure-password-here
```

## Theme toggle (A/B design system)

Set `NEXT_PUBLIC_SITE_THEME` to compare the legacy purple look vs the new prototype design on `/`:

| Value | Effect on `/` |
|-------|----------------|
| `classic` | Poppins + purple gradients (default) |
| `prototype` | Instrument Serif + Inter Tight + warm off-white + terracotta accent |

- **Production:** change the variable in Vercel (or `.env.local`) and redeploy.
- **Local dev:** append `?theme=prototype` or `?theme=classic` to any URL to preview without redeploying.

`/vision` and `/foods` always render the prototype design system regardless of this variable.

## Database Setup

### 1. Install Prisma CLI (if not already installed)
```bash
npm install -g prisma
# or
npx prisma
```

### 2. Set up your PostgreSQL database
- Create a new PostgreSQL database
- Update the `DATABASE_URL` in `.env.local` with your credentials

### 3. Run Prisma migrations
```bash
npx prisma migrate dev --name init
```

This will:
- Create all the database tables
- Set up the schema
- Generate Prisma Client

### 4. Generate Prisma Client
```bash
npx prisma generate
```

### 5. (Optional) Open Prisma Studio to manage data
```bash
npx prisma studio
```

## How to Get Your IDs

### Google Analytics 4
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property
3. Go to Admin > Data Streams
4. Click on your web stream
5. Copy the Measurement ID (starts with G-)

### Google Tag Manager
1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Create a new container
3. Copy the Container ID (starts with GTM-)

### Google Ads
1. Go to [Google Ads](https://ads.google.com/)
2. Tools & Settings > Conversions
3. Create a new conversion action
4. Copy the Conversion ID and Label

### Facebook Pixel
1. Go to [Facebook Events Manager](https://business.facebook.com/events_manager)
2. Create a new pixel
3. Copy the Pixel ID

### LinkedIn Insight Tag
1. Go to [LinkedIn Campaign Manager](https://www.linkedin.com/campaignmanager/)
2. Account Assets > Insight Tag
3. Copy the Partner ID

### Microsoft UET Tag
1. Go to [Microsoft Advertising](https://ads.microsoft.com/)
2. Tools > UET Tag Helper
3. Create a new UET tag
4. Copy the Tag ID

## CMS Admin Access

The CMS is available at `/admin/cms`. To access it:

1. Set `ADMIN_PASSWORD` in your `.env.local` file
2. Navigate to `/admin/login`
3. Enter the password you set
4. You'll be redirected to the CMS dashboard

**Default password** (if not set): `admin123` (change this in production!)

## Database Schema

The CMS includes the following tables:

- **blog_posts**: Blog articles with SEO fields
- **seo_content**: SEO metadata for static pages
- **blog_categories**: Blog categories

See `prisma/schema.prisma` for the complete schema definition.
