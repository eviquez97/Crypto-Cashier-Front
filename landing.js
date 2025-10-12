// Landing Page JavaScript
class LandingPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupAnimations();
        this.setupScrollEffects();
    }

    setupEventListeners() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(15, 20, 25, 0.98)';
            } else {
                header.style.background = 'rgba(15, 20, 25, 0.95)';
            }
        });

        // Mobile menu toggle (if needed)
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
    }

    setupAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.feature-card, .crypto-item, .pricing-card').forEach(el => {
            observer.observe(el);
        });

        // Animate chart bars
        this.animateChartBars();
    }

    setupScrollEffects() {
        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroVisual = document.querySelector('.hero-visual');
            if (heroVisual) {
                heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
        });
    }

    animateChartBars() {
        const bars = document.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.setProperty('--height', bar.style.height);
                bar.style.height = '0';
                setTimeout(() => {
                    bar.style.height = bar.style.getPropertyValue('--height');
                }, 100);
            }, index * 100);
        });
    }

    toggleMobileMenu() {
        const nav = document.querySelector('.nav');
        nav.classList.toggle('mobile-open');
    }
}

// Modal Functions
function showLogin() {
    document.getElementById('loginModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function hideLogin() {
    document.getElementById('loginModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showDemo() {
    hideLogin();
    // Redirect to demo request or signup
    window.location.href = '/demo-request';
}

function showVideo() {
    // Show video modal or redirect to video
    alert('Demo video coming soon!');
}

function showContact() {
    hideLogin();
    // Redirect to contact page
    window.location.href = '/contact';
}

// Login Handler
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Show loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Check credentials (in real app, this would be an API call)
        if (email && password) {
            // Successful login - redirect to dashboard
            localStorage.setItem('userEmail', email);
            localStorage.setItem('isLoggedIn', 'true');
            
            // Redirect to dashboard based on role (you can determine this from API response)
            const userRole = email.includes('admin') ? 'admin' : 'agent';
            localStorage.setItem('userRole', userRole);
            
            window.location.href = '/dashboard.html';
        } else {
            // Show error
            showToast('Invalid email or password', 'error');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }, 1500);
}

// Toast Notification System
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas ${getToastIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    // Add toast styles if not already present
    if (!document.querySelector('#toast-styles')) {
        const styles = document.createElement('style');
        styles.id = 'toast-styles';
        styles.textContent = `
            .toast {
                position: fixed;
                top: 2rem;
                right: 2rem;
                background: #1e2432;
                border: 1px solid #2d3748;
                border-radius: 0.5rem;
                padding: 1rem 1.5rem;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
                z-index: 3000;
                animation: slideIn 0.3s ease;
                max-width: 300px;
            }
            .toast-success { border-left: 4px solid #38a169; }
            .toast-error { border-left: 4px solid #e53e3e; }
            .toast-warning { border-left: 4px solid #ed8936; }
            .toast-info { border-left: 4px solid #16f98a; }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function getToastIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

// Check if user is already logged in
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        // User is already logged in, redirect to dashboard
        window.location.href = '/dashboard.html';
    }
}

// Utility Functions
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

function formatNumber(number) {
    return new Intl.NumberFormat('en-US').format(number);
}

// Initialize landing page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    checkAuthStatus();
    
    // Initialize landing page
    new LandingPage();
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .crypto-item, .pricing-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .hero-visual {
            transition: transform 0.1s ease-out;
        }
        
        @media (max-width: 768px) {
            .nav.mobile-open {
                display: flex;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(15, 20, 25, 0.98);
                flex-direction: column;
                padding: 2rem;
                border-top: 1px solid #2d3748;
            }
        }
    `;
    document.head.appendChild(style);
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('loginModal');
    if (event.target === modal) {
        hideLogin();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        hideLogin();
    }
});

// Export for use in other scripts
window.LandingPage = LandingPage;
