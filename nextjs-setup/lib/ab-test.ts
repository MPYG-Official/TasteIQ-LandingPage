// A/B Testing utilities
// Supports both client-side and server-side testing

export interface Variant {
  id: string;
  name: string;
  weight: number; // 0-100, percentage of traffic
}

export interface ABTest {
  id: string;
  name: string;
  variants: Variant[];
  active: boolean;
}

// Get variant for a user (server-side)
export const getVariant = (testId: string, userId?: string): string => {
  // Simple hash-based variant selection
  // In production, use a proper A/B testing service
  const hash = userId 
    ? simpleHash(userId + testId)
    : Math.random() * 100;
  
  // Get test configuration (in production, fetch from Edge Config or database)
  const test = getTestConfig(testId);
  
  if (!test || !test.active) {
    return 'control';
  }

  let cumulative = 0;
  for (const variant of test.variants) {
    cumulative += variant.weight;
    if (hash < cumulative) {
      return variant.id;
    }
  }

  return 'control';
};

// Simple hash function
const simpleHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash) % 100;
};

// Get test configuration
// In production, this should fetch from Edge Config, database, or A/B testing service
const getTestConfig = (testId: string): ABTest | null => {
  // Example test configurations
  const tests: Record<string, ABTest> = {
    'hero-headline': {
      id: 'hero-headline',
      name: 'Hero Section Headline',
      active: true,
      variants: [
        { id: 'control', name: 'Original', weight: 50 },
        { id: 'variant-a', name: 'Variant A', weight: 25 },
        { id: 'variant-b', name: 'Variant B', weight: 25 },
      ],
    },
    'cta-button': {
      id: 'cta-button',
      name: 'CTA Button Color',
      active: true,
      variants: [
        { id: 'control', name: 'Purple', weight: 50 },
        { id: 'variant-a', name: 'Green', weight: 50 },
      ],
    },
  };

  return tests[testId] || null;
};

// Track A/B test assignment
export const trackABTestAssignment = (
  testId: string,
  variant: string,
  userId?: string
) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'ab_test_assignment', {
      test_id: testId,
      variant: variant,
      user_id: userId,
    });
  }
};

// Track A/B test conversion
export const trackABTestConversion = (
  testId: string,
  variant: string,
  conversionType: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'ab_test_conversion', {
      test_id: testId,
      variant: variant,
      conversion_type: conversionType,
      value: value,
    });
  }
};

// Client-side variant selection (for client components)
export const getClientVariant = (testId: string): string => {
  if (typeof window === 'undefined') {
    return 'control';
  }

  // Check if variant is already stored in localStorage
  const stored = localStorage.getItem(`ab_test_${testId}`);
  if (stored) {
    return stored;
  }

  // Generate variant
  const variant = getVariant(testId);
  
  // Store in localStorage for consistency
  localStorage.setItem(`ab_test_${testId}`, variant);
  
  // Track assignment
  trackABTestAssignment(testId, variant);
  
  return variant;
};

