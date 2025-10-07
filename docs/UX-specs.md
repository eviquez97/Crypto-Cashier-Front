# Coinfixi Landing Page - UX Specifications

## Design System

### Color Palette
```css
/* Primary Colors */
--primary-500: #6C4BFF    /* Main purple */
--primary-700: #3A00FF    /* Dark purple */
--secondary-500: #AA63FF  /* Light purple for gradients */

/* Gradients */
--gradient-primary: linear-gradient(135deg, #6C4BFF 0%, #AA63FF 100%)
--gradient-hero: linear-gradient(135deg, #3A00FF 0%, #6C4BFF 50%, #AA63FF 100%)

/* Neutral Colors */
--gray-50: #f8fafc
--gray-100: #f1f5f9
--gray-200: #e2e8f0
--gray-300: #cbd5e1
--gray-400: #94a3b8
--gray-500: #64748b
--gray-600: #475569
--gray-700: #334155
--gray-800: #1e293b
--gray-900: #0f172a

/* Status Colors */
--success-500: #10b981
--danger-500: #ef4444
--warning-500: #f59e0b
```

### Typography
```css
/* Font Family */
font-family: 'Inter', system-ui, sans-serif

/* Font Sizes */
text-xs: 0.75rem    /* 12px */
text-sm: 0.875rem   /* 14px */
text-base: 1rem     /* 16px */
text-lg: 1.125rem   /* 18px */
text-xl: 1.25rem    /* 20px */
text-2xl: 1.5rem    /* 24px */
text-3xl: 1.875rem  /* 30px */
text-4xl: 2.25rem   /* 36px */
text-5xl: 3rem      /* 48px */
text-6xl: 3.75rem   /* 60px */
text-7xl: 4.5rem    /* 72px */

/* Font Weights */
font-light: 300
font-normal: 400
font-medium: 500
font-semibold: 600
font-bold: 700
font-extrabold: 800
font-black: 900

/* Line Heights */
leading-tight: 1.25
leading-snug: 1.375
leading-normal: 1.5
leading-relaxed: 1.625
leading-loose: 2
```

### Spacing System
```css
/* Padding & Margins */
space-1: 0.25rem    /* 4px */
space-2: 0.5rem     /* 8px */
space-3: 0.75rem    /* 12px */
space-4: 1rem       /* 16px */
space-5: 1.25rem    /* 20px */
space-6: 1.5rem     /* 24px */
space-8: 2rem       /* 32px */
space-10: 2.5rem    /* 40px */
space-12: 3rem      /* 48px */
space-16: 4rem      /* 64px */
space-20: 5rem      /* 80px */
space-24: 6rem      /* 96px */
space-32: 8rem      /* 128px */

/* Section Padding */
section-padding: 80px 0
container-padding: 0 20px
```

### Border Radius
```css
rounded-sm: 0.125rem   /* 2px */
rounded: 0.25rem       /* 4px */
rounded-md: 0.375rem   /* 6px */
rounded-lg: 0.5rem     /* 8px */
rounded-xl: 0.75rem    /* 12px */
rounded-2xl: 1rem      /* 16px */
rounded-3xl: 1.5rem    /* 24px */
rounded-full: 9999px
```

### Shadows
```css
/* Card Shadows */
shadow-card: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
shadow-card-hover: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)

/* Button Shadows */
shadow-button: 0 4px 14px 0 rgba(108, 75, 255, 0.3)
shadow-button-hover: 0 8px 25px 0 rgba(108, 75, 255, 0.4)
```

## Component Specifications

### Buttons
```css
/* Primary Button */
.btn-primary {
  background: linear-gradient(135deg, #6C4BFF 0%, #AA63FF 100%);
  color: white;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 14px 0 rgba(108, 75, 255, 0.3);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 25px 0 rgba(108, 75, 255, 0.4);
}

/* Outline Button */
.btn-outline {
  background: transparent;
  color: #6C4BFF;
  border: 2px solid #6C4BFF;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-outline:hover {
  background: #6C4BFF;
  color: white;
  transform: scale(1.03);
}
```

### Cards
```css
.card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

### Forms
```css
.input-field {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s ease;
}

.input-field:focus {
  outline: none;
  border-color: #6C4BFF;
  box-shadow: 0 0 0 3px rgba(108, 75, 255, 0.1);
}
```

## Responsive Breakpoints

### Mobile First Approach
```css
/* Base styles (mobile) */
.container {
  max-width: 100%;
  padding: 0 16px;
}

/* Small devices (640px and up) */
@media (min-width: 640px) {
  .container {
    padding: 0 20px;
  }
}

/* Medium devices (768px and up) */
@media (min-width: 768px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}

/* Large devices (1024px and up) */
@media (min-width: 1024px) {
  .hero-title {
    font-size: 4.5rem;
  }
}

/* Extra large devices (1280px and up) */
@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}
```

## Animation Specifications

### Timing Functions
```css
/* Standard easing */
ease-out: cubic-bezier(0, 0, 0.2, 1)
ease-in: cubic-bezier(0.4, 0, 1, 1)
ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)

/* Custom easing */
smooth: cubic-bezier(0.4, 0, 0.2, 1)
bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55)
```

### Animation Durations
```css
/* Fast animations */
duration-150: 150ms
duration-200: 200ms
duration-300: 300ms

/* Medium animations */
duration-500: 500ms
duration-700: 700ms

/* Slow animations */
duration-1000: 1000ms
```

### Keyframe Animations
```css
/* Float animation */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Pulse glow animation */
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(108, 75, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(108, 75, 255, 0.6);
  }
}
```

## Accessibility Standards

### Color Contrast
- **Minimum contrast ratio**: 4.5:1 for normal text
- **Enhanced contrast ratio**: 7:1 for large text
- **Button contrast**: 4.5:1 minimum

### Focus Indicators
```css
.focus-visible:focus {
  outline: none;
  ring: 2px solid #6C4BFF;
  ring-offset: 2px;
}
```

### ARIA Labels
- All interactive elements have proper ARIA labels
- Form inputs have associated labels
- Navigation has proper landmark roles
- Skip to main content link provided

## Performance Targets

### Lighthouse Scores
- **Performance**: >= 90 (mobile & desktop)
- **Accessibility**: >= 95
- **Best Practices**: >= 90
- **SEO**: >= 90

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Optimization Strategies
- Image optimization with Next.js Image component
- Font preloading for Inter
- Code splitting with dynamic imports
- Lazy loading for below-the-fold content
- Minimal JavaScript bundle size

## Browser Support

### Supported Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Progressive Enhancement
- Core functionality works without JavaScript
- Enhanced experience with JavaScript enabled
- Graceful degradation for older browsers

## Testing Requirements

### Unit Tests
- Component rendering tests
- User interaction tests
- Form validation tests
- API integration tests

### Integration Tests
- End-to-end user flows
- Cross-browser compatibility
- Mobile responsiveness
- Accessibility compliance

### Performance Tests
- Lighthouse audits
- Core Web Vitals monitoring
- Bundle size analysis
- Load time measurements
