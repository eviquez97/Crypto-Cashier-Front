import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import Home from '@/app/page'
import Login from '@/app/login/page'
import Register from '@/app/register/page'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// Mock fetch
global.fetch = jest.fn()

const mockPush = jest.fn()
const mockRouter = {
  push: mockPush,
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
}

describe('Integration Tests', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter)
    mockPush.mockClear()
    ;(fetch as jest.Mock).mockClear()
  })

  describe('Lead Form Submission', () => {
    it('submits lead form and shows success message', async () => {
      const user = userEvent.setup()
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      })

      render(<Home />)
      
      // Find the lead form in HowItWorks section
      const companyInput = screen.getByLabelText('Company Name')
      const emailInput = screen.getByLabelText('Email Address')
      const volumeInput = screen.getByLabelText('Monthly Volume (USD)')
      const submitButton = screen.getByText('Start Now')

      await user.type(companyInput, 'Test Company')
      await user.type(emailInput, 'test@example.com')
      await user.type(volumeInput, '$100,000')

      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Thank you for your interest!')).toBeInTheDocument()
      })

      expect(fetch).toHaveBeenCalledWith('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company: 'Test Company',
          email: 'test@example.com',
          volume: '$100,000',
        }),
      })
    })
  })

  describe('Login Flow', () => {
    it('submits login form and redirects on success', async () => {
      const user = userEvent.setup()
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ access_token: 'mock-token' }),
      })

      render(<Login />)
      
      const emailInput = screen.getByLabelText('Email Address')
      const passwordInput = screen.getByLabelText('Password')
      const submitButton = screen.getByText('Sign in')

      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, 'password123')

      await user.click(submitButton)

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('http://localhost:8000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'test@example.com',
            password: 'password123',
          }),
        })
      })

      expect(mockPush).toHaveBeenCalledWith('http://localhost:3000')
    })

    it('handles login error', async () => {
      const user = userEvent.setup()
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Invalid credentials' }),
      })

      render(<Login />)
      
      const emailInput = screen.getByLabelText('Email Address')
      const passwordInput = screen.getByLabelText('Password')
      const submitButton = screen.getByText('Sign in')

      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, 'wrongpassword')

      await user.click(submitButton)

      await waitFor(() => {
        expect(fetch).toHaveBeenCalled()
      })

      // Should not redirect on error
      expect(mockPush).not.toHaveBeenCalled()
    })
  })

  describe('Registration Flow', () => {
    it('submits registration form and redirects on success', async () => {
      const user = userEvent.setup()
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ access_token: 'mock-token' }),
      })

      render(<Register />)
      
      const companyInput = screen.getByLabelText('Company Name *')
      const emailInput = screen.getByLabelText('Email Address *')
      const passwordInput = screen.getByLabelText('Password *')
      const confirmPasswordInput = screen.getByLabelText('Confirm Password *')
      const phoneInput = screen.getByLabelText('Phone Number *')
      const countryInput = screen.getByLabelText('Country *')
      const termsCheckbox = screen.getByLabelText(/I agree to the/)
      const submitButton = screen.getByText('Create Account')

      await user.type(companyInput, 'Test Company')
      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, 'password123')
      await user.type(confirmPasswordInput, 'password123')
      await user.type(phoneInput, '+1234567890')
      await user.type(countryInput, 'United States')
      await user.click(termsCheckbox)

      await user.click(submitButton)

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('http://localhost:8000/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            company_name: 'Test Company',
            account_type: 'Sportbook',
            email: 'test@example.com',
            password: 'password123',
            confirm_password: 'password123',
            phone: '+1234567890',
            country: 'United States',
            agree_terms: true,
          }),
        })
      })

      expect(mockPush).toHaveBeenCalledWith('http://localhost:3000')
    })
  })

  describe('Navigation', () => {
    it('navigates between pages correctly', () => {
      render(<Home />)
      
      // Check that navigation links are present
      expect(screen.getByText('About')).toBeInTheDocument()
      expect(screen.getByText('Pricing')).toBeInTheDocument()
      expect(screen.getByText('How It Works')).toBeInTheDocument()
      expect(screen.getByText('Docs')).toBeInTheDocument()
      expect(screen.getByText('Contact')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has skip to main content link', () => {
      render(<Home />)
      
      expect(screen.getByText('Skip to main content')).toBeInTheDocument()
    })

    it('has proper ARIA labels', () => {
      render(<Home />)
      
      // Check for ARIA labels on interactive elements
      const menuButton = screen.getByLabelText('Toggle menu')
      expect(menuButton).toBeInTheDocument()
    })

    it('has proper form labels', () => {
      render(<Register />)
      
      expect(screen.getByLabelText('Company Name *')).toBeInTheDocument()
      expect(screen.getByLabelText('Email Address *')).toBeInTheDocument()
      expect(screen.getByLabelText('Password *')).toBeInTheDocument()
    })
  })
})
