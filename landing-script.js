// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form Submission Handler
document.getElementById('ctaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: this.querySelector('input[type="text"]').value,
        email: this.querySelector('input[type="email"]').value,
        volume: this.querySelector('select').value
    };
    
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('Thank you for your interest! We will contact you soon.');
    
    // Reset form
    this.reset();
});

// Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(10, 14, 39, 0.98)';
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(10, 14, 39, 0.95)';
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Animate on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Animate numbers on scroll
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start).toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Observe activity value
const activityValue = document.querySelector('.activity-value');
if (activityValue) {
    const activityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateValue(entry.target, 0, 284590, 2000);
            }
        });
    }, { threshold: 0.5 });
    
    activityObserver.observe(activityValue);
}

// Animate metric values
const metricValues = document.querySelectorAll('.metric-value');
metricValues.forEach((metric, index) => {
    const metricObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const endValue = index === 0 ? 142 : 89;
                animateValue(entry.target, 0, endValue, 1500);
            }
        });
    }, { threshold: 0.5 });
    
    metricObserver.observe(metric);
});

// Get Started Button Handler
document.querySelectorAll('.btn-primary, .btn-large.btn-primary').forEach(button => {
    if (!button.form) { // Don't add handler to form submit buttons
        button.addEventListener('click', function(e) {
            // Check if this is the "Sign In" text link
            if (this.classList.contains('btn-text')) return;
            
            e.preventDefault();
            // Scroll to CTA form
            const ctaSection = document.querySelector('.cta-section');
            if (ctaSection) {
                ctaSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    }
});

// Request Demo Button Handler
document.querySelectorAll('.btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        // Scroll to CTA form
        const ctaSection = document.querySelector('.cta-section');
        if (ctaSection) {
            ctaSection.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    });
});

// Add loading animation to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    });
});

console.log('Coinfixi Landing Page Loaded Successfully');
