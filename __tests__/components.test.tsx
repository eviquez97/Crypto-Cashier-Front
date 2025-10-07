import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import CryptoCards from '@/components/CryptoCards'
import WhyTrustUs from '@/components/WhyTrustUs'
import HowItWorks from '@/components/HowItWorks'
import Pricing from '@/components/Pricing'
import Footer from '@/components/Footer'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

const mockPush = jest.fn()
const mockRouter = {
  push: mockPush,
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
}

describe('Landing Page Components', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter)
    mockPush.mockClear()
  })

  describe('Header', () => {
    it('renders logo and navigation links', () => {
      render(<Header />)
      
      expect(screen.getByText('Coinfixi')).toBeInTheDocument()
      expect(screen.getByText('About')).toBeInTheDocument()
      expect(screen.getByText('Pricing')).toBeInTheDocument()
      expect(screen.getByText('How It Works')).toBeInTheDocument()
      expect(screen.getByText('Docs')).toBeInTheDocument()
      expect(screen.getByText('Contact')).toBeInTheDocument()
    })

    it('renders login and register buttons', () => {
      render(<Header />)
      
      expect(screen.getByText('Login')).toBeInTheDocument()
      expect(screen.getByText('Get Started')).toBeInTheDocument()
    })

    it('toggles mobile menu', async () => {
      const user = userEvent.setup()
      render(<Header />)
      
      const menuButton = screen.getByLabelText('Toggle menu')
      await user.click(menuButton)
      
      expect(screen.getByText('About')).toBeInTheDocument()
    })
  })

  describe('Hero', () => {
    it('renders main heading and subtitle', () => {
      render(<Hero />)
      
      expect(screen.getByText(/Coinfixi — Global Crypto Cashier/)).toBeInTheDocument()
      expect(screen.getByText(/Integrate instant crypto deposits/)).toBeInTheDocument()
    })

    it('renders call-to-action buttons', () => {
      render(<Hero />)
      
      expect(screen.getByText('Get Started — Create Account')).toBeInTheDocument()
      expect(screen.getByText('Request Demo')).toBeInTheDocument()
    })

    it('renders stats chips', () => {
      render(<Hero />)
      
      expect(screen.getByText('Trusted by Sportbooks')).toBeInTheDocument()
      expect(screen.getByText('2% fee (standard)')).toBeInTheDocument()
      expect(screen.getByText('One-time QR / address per deposit')).toBeInTheDocument()
    })
  })

  describe('CryptoCards', () => {
    it('renders cryptocurrency price cards', () => {
      render(<CryptoCards />)
      
      expect(screen.getByText('Bitcoin')).toBeInTheDocument()
      expect(screen.getByText('Ethereum')).toBeInTheDocument()
      expect(screen.getByText('Tether')).toBeInTheDocument()
    })

    it('displays correct prices and changes', () => {
      render(<CryptoCards />)
      
      expect(screen.getByText('$16,048.40')).toBeInTheDocument()
      expect(screen.getByText('$1,122.44')).toBeInTheDocument()
      expect(screen.getByText('$1.00')).toBeInTheDocument()
    })
  })

  describe('WhyTrustUs', () => {
    it('renders section title and subtitle', () => {
      render(<WhyTrustUs />)
      
      expect(screen.getByText('Why Choose Coinfixi')).toBeInTheDocument()
      expect(screen.getByText(/Trust comes from experience/)).toBeInTheDocument()
    })

    it('renders all feature cards', () => {
      render(<WhyTrustUs />)
      
      expect(screen.getByText('Competitive Pricing')).toBeInTheDocument()
      expect(screen.getByText('Fast Integrations')).toBeInTheDocument()
      expect(screen.getByText('Secure Custody')).toBeInTheDocument()
      expect(screen.getByText('One-time Addresses')).toBeInTheDocument()
      expect(screen.getByText('Enterprise Dashboard')).toBeInTheDocument()
      expect(screen.getByText('24/7 Support & SLAs')).toBeInTheDocument()
    })
  })

  describe('HowItWorks', () => {
    it('renders section title and steps', () => {
      render(<HowItWorks />)
      
      expect(screen.getByText('How It Works')).toBeInTheDocument()
      expect(screen.getByText('Step 1: Create Tenant / API Key')).toBeInTheDocument()
      expect(screen.getByText('Step 2: Generate One-time Address / QR')).toBeInTheDocument()
      expect(screen.getByText('Step 3: Confirm & Credit')).toBeInTheDocument()
    })

    it('renders lead capture form', () => {
      render(<HowItWorks />)
      
      expect(screen.getByLabelText('Company Name')).toBeInTheDocument()
      expect(screen.getByLabelText('Email Address')).toBeInTheDocument()
      expect(screen.getByLabelText('Monthly Volume (USD)')).toBeInTheDocument()
      expect(screen.getByText('Start Now')).toBeInTheDocument()
    })

    it('submits lead form successfully', async () => {
      const user = userEvent.setup()
      render(<HowItWorks />)
      
      await user.type(screen.getByLabelText('Company Name'), 'Test Company')
      await user.type(screen.getByLabelText('Email Address'), 'test@example.com')
      await user.type(screen.getByLabelText('Monthly Volume (USD)'), '$100,000')
      
      await user.click(screen.getByText('Start Now'))
      
      await waitFor(() => {
        expect(screen.getByText('Thank you for your interest!')).toBeInTheDocument()
      })
    })
  })

  describe('Pricing', () => {
    it('renders pricing section', () => {
      render(<Pricing />)
      
      expect(screen.getByText('Pricing')).toBeInTheDocument()
      expect(screen.getByText('Only 2% per txn (net). No monthly fee.')).toBeInTheDocument()
      expect(screen.getByText('2%')).toBeInTheDocument()
    })

    it('opens contact form modal', async () => {
      const user = userEvent.setup()
      render(<Pricing />)
      
      await user.click(screen.getByText('Contact Sales'))
      
      expect(screen.getByText('Contact Sales')).toBeInTheDocument()
      expect(screen.getByLabelText('Name')).toBeInTheDocument()
      expect(screen.getByLabelText('Email')).toBeInTheDocument()
    })
  })

  describe('Footer', () => {
    it('renders footer links and early access form', () => {
      render(<Footer />)
      
      expect(screen.getByText('Coinfixi')).toBeInTheDocument()
      expect(screen.getByText('Get Early Access')).toBeInTheDocument()
      expect(screen.getByText('About')).toBeInTheDocument()
      expect(screen.getByText('Pricing')).toBeInTheDocument()
      expect(screen.getByText('Docs')).toBeInTheDocument()
      expect(screen.getByText('API')).toBeInTheDocument()
    })

    it('submits early access form', async () => {
      const user = userEvent.setup()
      render(<Footer />)
      
      await user.type(screen.getByPlaceholderText('your@email.com'), 'test@example.com')
      await user.type(screen.getByPlaceholderText('Company name'), 'Test Company')
      
      await user.click(screen.getByText('Get Early Access'))
      
      await waitFor(() => {
        expect(screen.getByText('✓ Thank you for your interest!')).toBeInTheDocument()
      })
    })
  })
})
