# Deployment Guide

## Pre-Deployment Checklist

- [ ] All environment variables are set
- [ ] Analytics IDs are configured
- [ ] All pages are tested
- [ ] Forms are working correctly
- [ ] Images are optimized
- [ ] SEO metadata is complete
- [ ] Sitemap is generated
- [ ] robots.txt is configured

## Deployment Options

### 1. Vercel (Recommended)

**Why Vercel?**
- Zero-config deployment
- Built-in analytics
- Edge functions for A/B testing
- Automatic HTTPS
- Global CDN
- Free tier available

**Steps:**

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Add Environment Variables:**
   - Go to Vercel Dashboard
   - Select your project
   - Go to Settings > Environment Variables
   - Add all variables from `.env.local`

5. **Configure Custom Domain:**
   - Go to Settings > Domains
   - Add your domain (tasteiq.com)
   - Update DNS records as instructed

6. **Enable Analytics:**
   - Go to Analytics tab
   - Enable Web Analytics (free tier available)

### 2. Netlify

**Steps:**

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build Command:**
   ```bash
   npm run build
   ```

3. **Publish Directory:**
   ```
   .next
   ```

4. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

5. **Add Environment Variables:**
   - Go to Netlify Dashboard
   - Site Settings > Environment Variables
   - Add all variables

### 3. AWS Amplify

**Steps:**

1. Connect your GitHub repository
2. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
3. Add environment variables
4. Deploy

### 4. Self-Hosted (Node.js Server)

**Steps:**

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Use PM2 for process management:**
   ```bash
   npm install -g pm2
   pm2 start npm --name "tasteiq" -- start
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx as reverse proxy:**
   ```nginx
   server {
       listen 80;
       server_name tasteiq.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Post-Deployment

### 1. Verify Analytics

- Check GA4 Real-Time reports
- Verify events are firing
- Test conversion tracking

### 2. Test All Features

- Test forms
- Test WhatsApp integration
- Test all links
- Test on mobile devices

### 3. SEO Verification

- Submit sitemap to Google Search Console
- Submit sitemap to Bing Webmaster Tools
- Verify structured data with Google Rich Results Test
- Check meta tags with SEO tools

### 4. Performance Monitoring

- Run Lighthouse audit
- Check Core Web Vitals
- Monitor page load times
- Set up uptime monitoring

### 5. Security

- Enable HTTPS (automatic with Vercel/Netlify)
- Set up security headers
- Configure CSP if needed
- Regular security updates

## Continuous Deployment

### GitHub Actions (CI/CD)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run deploy
```

## Monitoring

### Recommended Tools

1. **Vercel Analytics** (if using Vercel)
2. **Google Analytics 4**
3. **Sentry** (error tracking)
4. **Uptime Robot** (uptime monitoring)
5. **Google Search Console** (SEO monitoring)

## Rollback Plan

If something goes wrong:

1. **Vercel:** Use deployment history to rollback
2. **Netlify:** Use deploy log to rollback
3. **Self-hosted:** Keep previous build and restart with it

## Support

For deployment issues, contact:
- Email: founders@tasteiq.com
- Check Next.js documentation: https://nextjs.org/docs/deployment

