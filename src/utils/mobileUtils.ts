/**
 * Mobile Utilities for Medera AI Research Platform
 * Provides consistent mobile detection and styling utilities
 */

// Mobile breakpoint configuration
export const MOBILE_BREAKPOINT = 768;

// Mobile detection hook replacement (for non-hook contexts)
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= MOBILE_BREAKPOINT;
};

// Mobile-first responsive design tokens
export const MobileDesignTokens = {
  // Spacing (mobile-first approach)
  spacing: {
    mobile: {
      xs: '8px',
      sm: '12px',
      md: '16px',
      lg: '20px',
      xl: '24px',
      xxl: '32px'
    },
    desktop: {
      xs: '12px',
      sm: '16px',
      md: '24px',
      lg: '32px',
      xl: '40px',
      xxl: '48px'
    }
  },
  
  // Typography (mobile-optimized)
  typography: {
    mobile: {
      headline: '24px',
      subheadline: '18px',
      title: '16px',
      body: '14px',
      caption: '12px',
      small: '11px'
    },
    desktop: {
      headline: '42px',
      subheadline: '24px',
      title: '20px',
      body: '16px',
      caption: '14px',
      small: '12px'
    }
  },
  
  // Layout dimensions
  layout: {
    mobile: {
      containerPadding: '16px',
      cardPadding: '16px',
      cardGap: '12px',
      sectionPadding: '40px 16px'
    },
    desktop: {
      containerPadding: '32px',
      cardPadding: '24px',
      cardGap: '24px',
      sectionPadding: '80px 32px'
    }
  }
};

// Mobile-specific card styles (no animations)
export const getMobileCardStyle = (theme: 'light' | 'dark' = 'light'): React.CSSProperties => ({
  background: theme === 'light' ? '#ffffff' : '#1a1a1a',
  border: theme === 'light' ? '1px solid #e5e5e5' : '1px solid #333333',
  borderRadius: 0, // Minimalistic sharp corners
  padding: '16px',
  marginBottom: '12px',
  width: '100%',
  boxSizing: 'border-box',
  // No transitions or animations for mobile
  transition: 'none',
  transform: 'none',
  cursor: 'default' // No pointer cursor since animations are disabled
});

// Mobile-specific section styles
export const getMobileSectionStyle = (theme: 'light' | 'dark' = 'light'): React.CSSProperties => ({
  background: theme === 'light' ? '#ffffff' : '#000000',
  minHeight: 'auto', // Remove fixed viewport heights
  width: '100%',
  padding: '40px 16px',
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start'
});

// Mobile content container
export const getMobileContentStyle = (): React.CSSProperties => ({
  width: '100%',
  maxWidth: '100%',
  marginTop: 0,
  marginRight: 'auto',
  marginBottom: 0,
  marginLeft: 'auto',
  padding: 0,
  position: 'relative',
  minHeight: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start'
});

// Mobile typography helpers
export const getMobileTypography = (
  variant: 'headline' | 'subheadline' | 'title' | 'body' | 'caption' | 'small',
  theme: 'light' | 'dark' = 'light'
): React.CSSProperties => {
  const color = theme === 'light' ? '#000000' : '#ffffff';
  const secondaryColor = theme === 'light' ? '#666666' : '#cccccc';
  
  const baseStyles: React.CSSProperties = {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    lineHeight: 1.4,
    color: color,
    fontWeight: 400
  };
  
  switch (variant) {
    case 'headline':
      return {
        ...baseStyles,
        fontSize: '24px',
        fontWeight: 700,
        marginBottom: '16px',
        textTransform: 'uppercase',
        letterSpacing: '-0.01em'
      };
    case 'subheadline':
      return {
        ...baseStyles,
        fontSize: '18px',
        fontWeight: 600,
        marginBottom: '12px',
        color: secondaryColor
      };
    case 'title':
      return {
        ...baseStyles,
        fontSize: '16px',
        fontWeight: 600,
        marginBottom: '8px'
      };
    case 'body':
      return {
        ...baseStyles,
        fontSize: '14px',
        lineHeight: 1.5,
        marginBottom: '12px'
      };
    case 'caption':
      return {
        ...baseStyles,
        fontSize: '12px',
        color: secondaryColor,
        marginBottom: '8px'
      };
    case 'small':
      return {
        ...baseStyles,
        fontSize: '11px',
        color: secondaryColor
      };
    default:
      return baseStyles;
  }
};

// Disable GSAP animations on mobile
export const getMobileAnimationConfig = () => ({
  duration: 0,
  ease: 'none',
  stagger: 0,
  delay: 0,
  // Disable all GSAP ScrollTrigger features for mobile
  scrollTrigger: {
    pin: false,
    scrub: false,
    snap: false,
    batch: false
  }
});

// Mobile-specific layout helpers
export const getMobileLayoutConfig = () => ({
  // Single column layout for all mobile content
  gridTemplateColumns: '1fr',
  // Reduced gaps and spacing
  gap: '12px',
  // Stack all elements vertically
  flexDirection: 'column' as const,
  // Remove horizontal scrolling
  overflowX: 'hidden' as const,
  // Optimize for vertical scrolling
  overflowY: 'auto' as const
});

export default {
  MOBILE_BREAKPOINT,
  isMobileDevice,
  MobileDesignTokens,
  getMobileCardStyle,
  getMobileSectionStyle,
  getMobileContentStyle,
  getMobileTypography,
  getMobileAnimationConfig,
  getMobileLayoutConfig
};