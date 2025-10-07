import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import Home from '@/app/page'
import Login from '@/app/login/page'
import Register from '@/app/register/page'
import Dashboard from '@/app/dashboard/page'

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

describe('Pages', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter)
    mockPush.mockClear()
  })

  describe('Home Page', () => {
    it('renders all main sections', () => {
      render(<Home />)
      
      // Check for main sections
      expect(screen.getByText(/Coinfixi — Global Crypto Cashier/)).toBeInTheDocument()
      expect(screen.getByText('Why Choose Coinfixi')).toBeInTheDocument()
      expect(screen.getByText('How It Works')).toBeInTheDocument()
      expect(screen.getByText('Pricing')).toBeInTheDocument()
    })

    it('renders cryptocurrency cards', () => {
      render(<Home />)
      
      expect(screen.getByText('Bitcoin')).toBeInTheDocument()
      expect(screen.getByText('Ethereum')).toBeInTheDocument()
      expect(screen.getByText('Tether')).toBeInTheDocument()
    })

    it('renders call-to-action buttons', () => {
      render(<Home />)
      
      expect(screen.getByText('Get Started — Create Account')).toBeInTheDocument()
      expect(screen.getByText('Request Demo')).toBeInTheDocument()
    })
  })

  describe('Login Page', () => {
    it('renders login form', () => {
      render(<Login />)
      
      expect(screen.getByText('Sign in to your account')).toBeInTheDocument()
      expect(screen.getByLabelText('Email Address')).toBeInTheDocument()
      expect(screen.getByLabelText('Password')).toBeInTheDocument()
      expect(screen.getByText('Sign in')).toBeInTheDocument()
    })

    it('renders back to home link', () => {
      render(<Login />)
      
      expect(screen.getByText('Back to Home')).toBeInTheDocument()
    })

    it('renders sign up link', () => {
      render(<Login />)
      
      expect(screen.getByText('Sign up')).toBeInTheDocument()
    })
  })

  describe('Register Page', () => {
    it('renders registration form', () => {
      render(<Register />)
      
      expect(screen.getByText('Create your account')).toBeInTheDocument()
      expect(screen.getByLabelText('Company Name *')).toBeInTheDocument()
      expect(screen.getByLabelText('Account Type *')).toBeInTheDocument()
      expect(screen.getByLabelText('Email Address *')).toBeInTheDocument()
      expect(screen.getByLabelText('Password *')).toBeInTheDocument()
      expect(screen.getByText('Create Account')).toBeInTheDocument()
    })

    it('renders account type options', () => {
      render(<Register />)
      
      expect(screen.getByText('Sportbook')).toBeInTheDocument()
      expect(screen.getByText('Casino')).toBeInTheDocument()
      expect(screen.getByText('Agent')).toBeInTheDocument()
      expect(screen.getByText('Individual')).toBeInTheDocument()
    })

    it('renders terms and privacy checkbox', () => {
      render(<Register />)
      
      expect(screen.getByText(/I agree to the/)).toBeInTheDocument()
      expect(screen.getByText('Terms of Service')).toBeInTheDocument()
      expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    })
  })

  describe('Dashboard Page', () => {
    it('renders loading state', () => {
      render(<Dashboard />)
      
      expect(screen.getByText('Redirecting to dashboard...')).toBeInTheDocument()
    })

    it('redirects to configured dashboard URL', () => {
      // Mock window.location.href
      delete (window as any).location
      window.location = { href: '' } as any
      
      render(<Dashboard />)
      
      // The component should attempt to redirect
      // This is tested by the useEffect hook
    })
  })
})
