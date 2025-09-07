
function initHeroCarousel() {
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

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
}

// Initialize carousel when page loads
initHeroCarousel();

// Smooth scrolling for navigation links
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

// Gallery Modal Functions
function openModal(element) {
    const modal = document.getElementById('imageModal');
    const modalContent = document.getElementById('modalImage');

    // Create a larger version with more details
    modalContent.innerHTML = `
                <div style="background: linear-gradient(135deg, var(--saffron), var(--orange)); color: white; padding: 40px; border-radius: 15px; text-align: center; font-size: 24px; border: 4px solid var(--gold);">
                    ${element.querySelector('.gallery-overlay').innerHTML}
                    <p style="margin-top: 20px; font-size: 16px;">
                        This would show a full-size image of our ${element.querySelector('.gallery-overlay').textContent.trim()}
                    </p>
                </div>
            `;
    modal.style.display = 'block';

    // Add animation
    modalContent.style.animation = 'zoom 0.3s';
}

function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Add floating animation to hero buttons
const heroButtons = document.querySelectorAll('.hero-btn');
heroButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function () {
        this.style.animation = 'float 0.5s ease-in-out';
    });
});

// Language switcher functionality
const languageSwitch = document.querySelector('.language-switch');
let isEnglish = true;

languageSwitch.addEventListener('click', function (e) {
    e.preventDefault();
    if (isEnglish) {
        this.textContent = 'English';
        alert('Language switched to Marathi! (Demo)');
        isEnglish = false;
    } else {
        this.textContent = 'मराठी';
        alert('Language switched to English! (Demo)');
        isEnglish = true;
    }
});

// Mobile menu toggle (for smaller screens)
function createMobileMenu() {
    const navbar = document.querySelector('.navbar .container');
    const navMenu = document.querySelector('.nav-menu');

    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.innerHTML = '☰';
    hamburger.style.cssText = `
                display: none;
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                padding: 10px;
            `;

    // Add mobile styles
    const style = document.createElement('style');
    style.textContent = `
                @media (max-width: 768px) {
                    .navbar .container button {
                        display: block !important;
                    }
                    .nav-menu {
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background: var(--orange);
                        flex-direction: column;
                        display: none;
                        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                    }
                    .nav-menu.active {
                        display: flex !important;
                    }
                    .nav-item .dropdown {
                        position: static;
                        display: block;
                        box-shadow: none;
                        background: var(--dark-orange);
                        margin-left: 20px;
                    }
                }
            `;
    document.head.appendChild(style);

    navbar.insertBefore(hamburger, navMenu);

    hamburger.addEventListener('click', function () {
        navMenu.classList.toggle('active');
    });
}

createMobileMenu();

// Add scroll effect to navbar
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }
});

// Add loading animation
window.addEventListener('load', function () {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Donation button click handler
document.querySelector('.header .donate-btn').addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('#donation').scrollIntoView({ behavior: 'smooth' });
});

// Product order functionality
document.querySelectorAll('.product-card .hero-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const productName = this.parentElement.querySelector('h3').textContent;
        alert(`Thank you for your interest in ${productName}! Please call us at 98XX-XXX-XXXX to place your order.`);
    });
});

// Add CSS animation keyframes
const animationStyles = document.createElement('style');
animationStyles.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .section {
                animation: fadeInUp 0.8s ease-out;
            }
            
            /* Pulse animation for important buttons */
            .donate-btn {
                animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
                0% { box-shadow: 0 4px 8px rgba(230, 81, 0, 0.2); }
                50% { box-shadow: 0 4px 20px rgba(230, 81, 0, 0.4); }
                100% { box-shadow: 0 4px 8px rgba(230, 81, 0, 0.2); }
            }
            
            /* Hover effects for cards */
            .product-card, .gallery-item {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .product-card:hover {
                box-shadow: 0 10px 25px rgba(255, 153, 51, 0.3);
            }
        `;
document.head.appendChild(animationStyles);

// Auto-refresh ticker content
setInterval(function () {
    const tickerItems = [
        '🎉 New Organic Farming Initiative Started • घी और दूध उत्पादन में वृद्धि • Cow Adoption Program Now Available',
        '🕉️ आगामी गोपाष्टमी उत्सव की तैयारी • Free Ayurvedic Consultation Every Sunday • Special Discount on Organic Products',
        '📢 Volunteer Registration Open • नए गौशाला निर्माण की योजना • Monthly Health Camp for Cattle'
    ];

    const ticker = document.querySelector('.ticker-content .ticker-item');
    const randomItem = tickerItems[Math.floor(Math.random() * tickerItems.length)];
    ticker.textContent = randomItem;
}, 10000); // Change every 10 seconds

// Add keyboard navigation support
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeModal();
    }

    // Alt + D for quick donate
    if (e.altKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        document.querySelector('#donation').scrollIntoView({ behavior: 'smooth' });
    }
});

console.log('🐄 Goshala Website Loaded Successfully! 🕉️');
console.log('Use Alt+D for quick donate, Ctrl+F for search, ESC to close modals');
