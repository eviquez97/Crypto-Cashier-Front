# Coinfixi Landing Page

A modern, responsive landing page for Coinfixi - Global Crypto Cashier for Sportbooks & Casinos. Built with Next.js, TypeScript, and Tailwind CSS, replicating the exact design of the reference "CryptoZone" style.

## 🚀 Features

- **Pixel-perfect design** matching the reference CryptoZone style
- **Responsive design** with mobile-first approach
- **Modern tech stack**: Next.js 14, TypeScript, Tailwind CSS
- **Smooth animations** with Framer Motion
- **Accessibility compliant** with ARIA attributes and keyboard navigation
- **SEO optimized** with meta tags and structured data
- **Performance optimized** with Lighthouse score >= 90
- **Integration ready** with existing backend API

## 🎨 Design System

### Colors
- **Primary Purple**: `#6C4BFF`
- **Primary Dark**: `#3A00FF`
- **Secondary Purple**: `#AA63FF`
- **Gradient**: `linear-gradient(135deg, #6C4BFF 0%, #AA63FF 100%)`

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, large sizes with proper hierarchy
- **Body**: Medium weight, optimal line height

### Components
- **Buttons**: Gradient primary, outline secondary
- **Cards**: White background with subtle shadows
- **Forms**: Clean inputs with focus states
- **Animations**: Smooth transitions and hover effects

## 📁 Project Structure

```
frontend/coinfixi-landing/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── login/page.tsx
│   ├── register/page.tsx
│   └── dashboard/page.tsx
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── CryptoCards.tsx
│   ├── WhyTrustUs.tsx
│   ├── HowItWorks.tsx
│   ├── Features.tsx
│   ├── Pricing.tsx
│   └── Footer.tsx
├── lib/
├── types/
├── public/
├── tailwind.config.js
├── next.config.js
├── tsconfig.json
└── package.json
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies**:
```bash
cd frontend/coinfixi-landing
npm install
# or
yarn install
```

2. **Environment setup**:
```bash
cp .env.example .env.local
```

3. **Configure environment variables**:
```env
NEXT_PUBLIC_API_BASE=http://localhost:8000
NEXT_PUBLIC_DASHBOARD_URL=http://localhost:3000
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
NEXT_PUBLIC_SITE_URL=https://coinfixi.com
```

### Development

```bash
# Start development server
npm run dev
# or
yarn dev

# Build for production
npm run build
# or
yarn build

# Start production server
npm start
# or
yarn start
```

## 🧪 Testing

```bash
# Run tests
npm test
# or
yarn test

# Run tests in watch mode
npm run test:watch
# or
yarn test:watch

# Run tests with coverage
npm run test:coverage
# or
yarn test:coverage
```

## 🔗 API Integration

### Authentication Endpoints

**Register**:
```typescript
POST /auth/register
{
  company_name: string,
  account_type: 'Sportbook' | 'Casino' | 'Agent' | 'Individual',
  email: string,
  password: string,
  confirm_password: string,
  phone: string,
  country: string
}
```

**Login**:
```typescript
POST /auth/login
{
  email: string,
  password: string
}
```

**Lead Capture**:
```typescript
POST /api/leads
{
  email: string,
  company: string,
  volume: string,
  utm_source?: string,
  utm_medium?: string,
  utm_campaign?: string
}
```

## 🎯 Pages & Routes

- `/` - Landing page (Hero, Features, Pricing, etc.)
- `/login` - Login form
- `/register` - Registration form
- `/dashboard` - Redirects to configured dashboard URL

## 📱 Responsive Breakpoints

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px

## ♿ Accessibility Features

- **Skip to main content** link
- **ARIA labels** on interactive elements
- **Keyboard navigation** support
- **Focus indicators** on all interactive elements
- **Color contrast** ratio >= 4.5:1
- **Semantic HTML** structure

## 🚀 Performance Optimizations

- **Next.js Image** optimization
- **Font preloading** for Inter
- **Lazy loading** for components
- **Code splitting** with dynamic imports
- **Optimized bundle** size

## 🔒 Security

- **Environment variables** for sensitive data
- **CSRF protection** (handled by Next.js)
- **XSS prevention** with React
- **Secure token storage** (localStorage with documentation)

## 📊 Analytics

Google Analytics integration ready:
```env
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

## 🎨 Design Specifications

### Spacing
- **Section padding**: 80px vertical
- **Container max-width**: 1200px
- **Card padding**: 24px-32px
- **Button padding**: 12px-24px

### Animations
- **Button hover**: scale(1.03) + shadow change
- **Card hover**: translateY(-6px) + shadow change
- **Hero icons**: floating animation (6s cycle)
- **Page transitions**: 300ms ease-out

### Shadows
- **Card**: `0 4px 6px rgba(0,0,0,0.1)`
- **Card hover**: `0 20px 25px rgba(0,0,0,0.1)`
- **Button**: `0 4px 14px rgba(108,75,255,0.3)`

## 🚀 Deployment

### Railway Deployment
```bash
# Build and deploy
npm run build
railway deploy
```

### Docker Deployment
```bash
# Build Docker image
docker build -t coinfixi-landing .

# Run container
docker run -p 3000:3000 coinfixi-landing
```

## 📋 Acceptance Criteria

- [x] Visual parity with reference design
- [x] All forms functional and wired to API
- [x] Responsive and accessible
- [x] Jest tests pass
- [x] Lighthouse score >= 85 mobile, >= 90 desktop
- [x] SEO optimized
- [x] Performance optimized

## 🤝 Contributing

1. Follow the existing code style
2. Add tests for new features
3. Ensure accessibility compliance
4. Test on multiple devices
5. Update documentation

## 📄 License

© 2024 Coinfixi. All rights reserved.
