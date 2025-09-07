// Goshala Website - JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initHeroCarousel();
    initMobileMenu();
    initSmoothScrolling();
    initLanguageSwitcher();
    initScrollEffects();
    initModalFunctionality();
    initDonationFunctionality();
    initProductFunctionality();
    initNewsTickerVariation();
    initAccessibilityFeatures();
    initLoadingAnimation();
    
    console.log('🐄 Goshala Website Loaded Successfully! 🕉️');
});

// Hero Carousel Functionality
function initHeroCarousel() {
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    
    if (slides.length === 0) return;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Auto advance slides every 4 seconds
    setInterval(nextSlide, 4000);
    
    // Add keyboard navigation for carousel
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
}

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdownParents = document.querySelectorAll('.dropdown-parent');
    
    if (!mobileToggle || !navMenu) return;

    // Toggle mobile menu
    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = mobileToggle.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Handle dropdown menus on mobile
    dropdownParents.forEach(parent => {
        const link = parent.querySelector('.nav-link');
        const dropdown = parent.querySelector('.dropdown');
        
        if (window.innerWidth <= 768) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                parent.classList.toggle('active');
            });
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Smooth Scrolling Navigation
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                const mobileToggle = document.querySelector('.mobile-toggle');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });
}

// Language Switcher Functionality
function initLanguageSwitcher() {
    const languageSwitch = document.querySelector('.language-switch');
    let isEnglish = true;
    
    if (!languageSwitch) return;
    
    languageSwitch.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (isEnglish) {
            this.textContent = 'English';
            showNotification('Language switched to Marathi! (Demo)', 'success');
            isEnglish = false;
        } else {
            this.textContent = 'मराठी';
            showNotification('Language switched to English! (Demo)', 'success');
            isEnglish = true;
        }
        
        // Add animation effect
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
}

// Scroll Effects
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    // Navbar shadow effect on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

// Modal Functionality for Gallery
function initModalFunctionality() {
    const modal = document.getElementById('imageModal');
    const modalContent = document.getElementById('modalImage');
    
    if (!modal || !modalContent) return;
    
    // Close modal when clicking outside or on close button
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Keyboard navigation for modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Gallery Modal Functions
function openModal(element) {
    const modal = document.getElementById('imageModal');
    const modalContent = document.getElementById('modalImage');
    
    if (!modal || !modalContent || !element) return;
    
    const overlay = element.querySelector('.gallery-overlay');
    if (!overlay) return;
    
    // Create modal content
    modalContent.innerHTML = `
        <div style="
            background: linear-gradient(135deg, var(--saffron), var(--orange)); 
            color: white; 
            padding: 40px; 
            border-radius: 15px; 
            text-align: center; 
            font-size: 24px; 
            border: 4px solid var(--gold);
            max-width: 90vw;
            margin: 0 auto;
        ">
            ${overlay.innerHTML}
            <p style="margin-top: 20px; font-size: 16px; opacity: 0.9;">
                This would show a full-size image of our ${overlay.textContent.trim()}
            </p>
            <button onclick="closeModal()" style="
                background: white;
                color: var(--orange);
                border: none;
                padding: 10px 20px;
                border-radius: 20px;
                margin-top: 20px;
                cursor: pointer;
                font-weight: bold;
            ">Close</button>
        </div>
    `;
    
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    
    // Focus management for accessibility
    modalContent.focus();
    
    // Add animation
    modalContent.style.animation = 'zoom 0.3s';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    }
}

// Donation Functionality
function initDonationFunctionality() {
    const donateBtn = document.querySelector('.header .donate-btn');
    
    if (donateBtn) {
        donateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const donationSection = document.querySelector('#donation');
            if (donationSection) {
                donationSection.scrollIntoView({ behavior: 'smooth' });
                
                // Add pulse effect to donation section
                donationSection.style.animation = 'pulse 1s ease-in-out';
                setTimeout(() => {
                    donationSection.style.animation = '';
                }, 1000);
            }
        });
    }
    
    // Donation method buttons
    const donationButtons = document.querySelectorAll('.donation-method .hero-btn');
    donationButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const method = this.parentElement.querySelector('h4').textContent;
            showNotification(`Processing ${method}... Please wait.`, 'info');
            
            // Simulate processing
            setTimeout(() => {
                showNotification('Thank you for your interest! Please contact us for more details.', 'success');
            }, 2000);
        });
    });
}

// Product Functionality
function initProductFunctionality() {
    document.querySelectorAll('.product-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            
            // Add loading state
            const originalText = this.textContent;
            this.textContent = 'Processing...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
                showNotification(`Thank you for your interest in ${productName}! Please call us at 98XX-XXX-XXXX to place your order.`, 'success');
            }, 1500);
        });
    });
}

// News Ticker Variation
function initNewsTickerVariation() {
    const tickerItems = [
        '🎉 New Organic Farming Initiative Started • घी और दूध उत्पादन में वृद्धि • Cow Adoption Program Now Available',
        '🕉️ आगामी गोपाष्टमी उत्सव की तैयारी • Free Ayurvedic Consultation Every Sunday • Special Discount on Organic Products',
        '📢 Volunteer Registration Open • नए गौशाला निर्माण की योजना • Monthly Health Camp for Cattle',
        '🌱 Organic Product Certification Received • गाय गोबर से बने उत्पाद अब उपलब्ध • Educational Tour Bookings Now Open',
        '🏆 Excellence Award for Best Goshala Management • Daily Fresh Milk Available • Join Our WhatsApp Group for Updates'
    ];
    
    const ticker = document.querySelector('.ticker-content .ticker-item');
    if (!ticker) return;
    
    let currentIndex = 0;
    
    // Change ticker content every 10 seconds
    setInterval(function() {
        currentIndex = (currentIndex + 1) % tickerItems.length;
        
        // Fade out
        ticker.style.opacity = '0';
        
        setTimeout(() => {
            ticker.textContent = tickerItems[currentIndex];
            // Fade in
            ticker.style.opacity = '1';
        }, 500);
        
    }, 10000);
}

// Accessibility Features
function initAccessibilityFeatures() {
    // Keyboard navigation for gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(this);
            }
        });
    });
    
    // Skip links functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // High contrast mode detection
    if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
        document.body.classList.add('high-contrast');
    }
    
    // Reduced motion detection
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduced-motion');
    }
}

// Loading Animation
function initLoadingAnimation() {
    // Page load animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // Add floating animation to hero buttons
    const heroButtons = document.querySelectorAll('.hero-btn');
    heroButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.animation = 'float 0.5s ease-in-out';
        });
        
        btn.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" aria-label="Close notification">&times;</button>
    `;
    
    // Style notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 15px;
        max-width: 350px;
        animation: slideInRight 0.3s ease;
        font-size: 14px;
        line-height: 1.4;
    `;
    
    notification.querySelector('button').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.2s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Keyboard Shortcuts
document.addEventListener('keydown', function(e) {
    // Alt + D for quick donate
    if (e.altKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        const donationSection = document.querySelector('#donation');
        if (donationSection) {
            donationSection.scrollIntoView({ behavior: 'smooth' });
            showNotification('Donation section opened!', 'info');
        }
    }
    
    // Alt + H for home
    if (e.altKey && e.key.toLowerCase() === 'h') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        showNotification('Scrolled to top!', 'info');
    }
    
    // Alt + C for contact
    if (e.altKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            showNotification('Contact section opened!', 'info');
        }
    }
});

// Performance Optimization
const debouncedScrollHandler = debounce(function() {
    // Handle scroll events
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Update scroll progress indicator if needed
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / windowHeight) * 100;
    
    // You can add scroll progress bar here if needed
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add CSS animations dynamically
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .mobile-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .reduced-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    
    .high-contrast {
        filter: contrast(150%);
    }
`;
document.head.appendChild(animationStyles);

// Error Handling
window.addEventListener('error', function(e) {
    console.error('Goshala Website Error:', e.error);
    showNotification('An error occurred. Please refresh the page.', 'error');
});

// Service Worker Registration (if needed for PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // navigator.serviceWorker.register('/sw.js')
        //   .then(function(registration) {
        //     console.log('ServiceWorker registration successful');
        //   })
        //   .catch(function(err) {
        //     console.log('ServiceWorker registration failed');
        //   });
    });
}

// Console welcome message
console.log(`
🕉️ =============================================== 🕉️
    Welcome to Shri Gau Seva Sansthan Website
    
    Keyboard Shortcuts:
    - Alt + D: Quick Donate
    - Alt + H: Go to Home
    - Alt + C: Go to Contact
    - ESC: Close Modal
    - Arrow Keys: Navigate Hero Carousel
    
    Serving Gau Mata with Technology! 🐄
🕉️ =============================================== 🕉️
`);

// Export functions for global access if needed
window.GoshalaSite = {
    openModal,
    closeModal,
    showNotification
};