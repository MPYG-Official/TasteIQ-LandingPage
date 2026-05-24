# Migration Guide: HTML to Next.js

This guide will help you migrate your existing HTML pages to Next.js.

## Step-by-Step Migration

### 1. Home Page Migration

The home page (`index.html`) should be migrated to `app/page.tsx`. 

**Key Changes:**
- Convert HTML to JSX
- Move inline styles to CSS modules or Tailwind classes
- Convert JavaScript to React hooks and event handlers
- Use Next.js Image component for images
- Implement analytics tracking using the provided utilities

### 2. Component Structure

Break down the large HTML file into reusable components:

```
components/
├── Header.tsx          # Navigation bar
├── Hero.tsx            # Hero section
├── QuickStart.tsx      # 15-minute setup section
├── WhySwitch.tsx       # Why switch section
├── Features.tsx        # Features section
├── Pricing.tsx         # Pricing section
├── Testimonials.tsx    # Testimonials section
├── ContactForm.tsx     # Contact form (WhatsApp)
├── FAQ.tsx             # FAQ section
└── Footer.tsx          # Footer
```

### 3. Styling Migration

**Option 1: Tailwind CSS (Recommended)**
- Convert existing CSS classes to Tailwind utility classes
- Use Tailwind's responsive utilities
- Maintain custom styles in `globals.css` if needed

**Option 2: CSS Modules**
- Create `.module.css` files for each component
- Import and use in components

### 4. JavaScript to React

**Before (Vanilla JS):**
```javascript
document.getElementById('demoForm').addEventListener('submit', function(e) {
  e.preventDefault();
  // form handling
});
```

**After (React):**
```tsx
'use client';

export default function ContactForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // form handling with React state
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
}
```

### 5. Analytics Integration

Replace inline `gtag` calls with the analytics utilities:

**Before:**
```javascript
gtag('event', 'demo_booking', {
  'event_category': 'engagement',
  'event_label': 'whatsapp_form_submission'
});
```

**After:**
```tsx
import { trackDemoBooking } from '@/lib/analytics';

trackDemoBooking('homepage', formData);
```

### 6. SEO Optimization

Add metadata to each page:

```tsx
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Home - TasteIQ',
  description: 'TasteIQ - The Intelligent Restaurant OS',
  keywords: ['restaurant POS', 'restaurant management'],
  url: '/',
});
```

### 7. Image Optimization

Replace `<img>` tags with Next.js Image:

**Before:**
```html
<img src="https://images.unsplash.com/..." alt="Restaurant" />
```

**After:**
```tsx
import Image from 'next/image';

<Image
  src="https://images.unsplash.com/..."
  alt="Restaurant"
  width={1200}
  height={800}
  priority
/>
```

### 8. Routing

Next.js uses file-based routing:

- `app/page.tsx` → `/`
- `app/pricing/page.tsx` → `/pricing`
- `app/privacy-policy/page.tsx` → `/privacy-policy`
- `app/blog/[slug]/page.tsx` → `/blog/:slug`

### 9. Form Handling

Convert forms to React components with proper state management:

```tsx
'use client';

import { useState } from 'react';
import { trackDemoBooking } from '@/lib/analytics';

export default function DemoForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track conversion
    trackDemoBooking('homepage', formData);
    
    // Create WhatsApp message
    const message = createWhatsAppMessage(formData);
    const whatsappURL = `https://wa.me/916207466460?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappURL, '_blank');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
}
```

### 10. Countdown Timer

Convert to React component:

```tsx
'use client';

import { useState, useEffect } from 'react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const endDate = new Date(2026, 2, 31, 23, 59, 59).getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate - now;
      
      if (distance < 0) {
        clearInterval(timer);
        return;
      }
      
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-timer">
      {/* render countdown */}
    </div>
  );
}
```

## Migration Checklist

- [ ] Convert HTML structure to JSX
- [ ] Break down into reusable components
- [ ] Migrate CSS to Tailwind or CSS Modules
- [ ] Convert JavaScript to React hooks
- [ ] Implement analytics tracking
- [ ] Add SEO metadata
- [ ] Optimize images
- [ ] Test all forms and interactions
- [ ] Test on mobile devices
- [ ] Verify analytics events
- [ ] Test A/B testing (if implemented)
- [ ] Performance optimization
- [ ] Accessibility audit

## Testing

After migration:

1. **Functionality Testing**
   - Test all forms
   - Test all buttons and links
   - Test WhatsApp integration
   - Test countdown timer

2. **Analytics Testing**
   - Verify GA4 events are firing
   - Check conversion tracking
   - Test UTM parameter tracking

3. **SEO Testing**
   - Check meta tags
   - Verify structured data
   - Test sitemap
   - Check robots.txt

4. **Performance Testing**
   - Run Lighthouse audit
   - Check Core Web Vitals
   - Test page load times
   - Test on slow connections

## Deployment

1. Build the project: `npm run build`
2. Test the production build: `npm start`
3. Deploy to Vercel or your preferred platform
4. Update DNS settings
5. Verify all tracking IDs are working
6. Monitor analytics for first few days

