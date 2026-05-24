import ReactGA from 'react-ga4';

// Initialize GA4
export const initGA = (measurementId: string) => {
  if (typeof window !== 'undefined' && measurementId) {
    ReactGA.initialize(measurementId, {
      testMode: process.env.NODE_ENV === 'development',
    });
  }
};

// Track page views
export const trackPageView = (path: string, title?: string) => {
  if (typeof window !== 'undefined') {
    ReactGA.send({
      hitType: 'pageview',
      page: path,
      title: title || document.title,
    });
  }
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined') {
    ReactGA.event({
      action,
      category,
      label,
      value,
    });
  }
};

// Track conversions
export const trackConversion = (
  conversionId: string,
  conversionLabel?: string,
  value?: number
) => {
  if (typeof window !== 'undefined') {
    // Google Ads conversion tracking
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: `${conversionId}/${conversionLabel}`,
        value: value,
        currency: 'INR',
      });
    }

    // GA4 conversion event
    trackEvent('conversion', 'engagement', conversionLabel, value);
  }
};

// Track form submissions
export const trackFormSubmission = (formName: string, formData?: Record<string, any>) => {
  trackEvent('form_submit', 'engagement', formName);
  
  // Track as conversion
  trackConversion('AW-CONVERSION_ID', 'CONVERSION_LABEL');
  
  // Facebook Pixel Lead event
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Lead', {
      content_name: formName,
      ...formData,
    });
  }
};

// Track WhatsApp clicks
export const trackWhatsAppClick = (source: string) => {
  trackEvent('whatsapp_click', 'engagement', source);
  
  // Track as conversion
  trackConversion('AW-CONVERSION_ID', 'WHATSAPP_CLICK');
};

// Track button clicks
export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('button_click', 'engagement', `${buttonName}_${location}`);
};

// Track scroll depth
export const trackScrollDepth = (depth: number) => {
  const milestones = [25, 50, 75, 90, 100];
  const milestone = milestones.find(m => depth >= m && depth < m + 25);
  
  if (milestone) {
    trackEvent('scroll_depth', 'engagement', `${milestone}%`);
  }
};

// Track time on page
export const trackTimeOnPage = (seconds: number) => {
  const milestones = [30, 60, 120, 300]; // 30s, 1min, 2min, 5min
  const milestone = milestones.find(m => seconds >= m && seconds < m * 2);
  
  if (milestone) {
    trackEvent('time_on_page', 'engagement', `${milestone}s`);
  }
};

// Track blog engagement
export const trackBlogRead = (postTitle: string, readTime: number) => {
  trackEvent('blog_read', 'content', postTitle, readTime);
};

// Track pricing page views
export const trackPricingView = (planName?: string) => {
  trackEvent('pricing_view', 'engagement', planName || 'general');
};

// Track demo bookings
export const trackDemoBooking = (source: string, formData?: Record<string, any>) => {
  trackFormSubmission('demo_booking', { source, ...formData });
  
  // Enhanced conversion tracking
  trackConversion('AW-CONVERSION_ID', 'DEMO_BOOKING', 1);
};

// Declare global types for gtag and fbq
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

