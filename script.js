// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Hero Background Slider
const heroImages = document.querySelector('.hero-images');
let heroSliderInterval;

function startHeroSlider() {
    heroSliderInterval = setInterval(() => {
        const firstImg = document.querySelector('.hero-img-1');
        heroImages.style.transition = 'transform 1s ease';
        heroImages.style.transform = 'translateX(-33.33%)';
        
        setTimeout(() => {
            heroImages.appendChild(firstImg);
            heroImages.style.transition = 'none';
            heroImages.style.transform = 'translateX(0)';
        }, 1000);
    }, 5000);
}

startHeroSlider();

// Stop slider on hover
heroImages.addEventListener('mouseenter', () => {
    clearInterval(heroSliderInterval);
});

heroImages.addEventListener('mouseleave', startHeroSlider);

// Pricing Card Interactions
const pricingCards = document.querySelectorAll('.pricing-card');
const bookButtons = document.querySelectorAll('.btn-pricing');

bookButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const card = this.closest('.pricing-card');
        const plan = card.querySelector('h3').textContent;
        const price = card.querySelector('.price').textContent;
        
        // Add animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Show booking modal
        showBookingModal(plan, price);
    });
});

// Booking Modal
function showBookingModal(plan, price) {
    const modal = document.createElement('div');
    modal.className = 'booking-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Book ${plan}</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="modal-image">
                    <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop" alt="Makeup Booking">
                </div>
                <div class="modal-info">
                    <h4>Selected Package: ${plan}</h4>
                    <p class="modal-price">Price: ${price}/session</p>
                    <form class="booking-form">
                        <input type="text" placeholder="Your Name" required>
                        <input type="email" placeholder="Your Email" required>
                        <input type="tel" placeholder="Phone Number" required>
                        <input type="date" placeholder="Preferred Date" required>
                        <textarea placeholder="Special Requests or Notes"></textarea>
                        <button type="submit" class="submit-booking">Confirm Booking</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close modal
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
    });
    
    // Submit booking
    const form = modal.querySelector('.booking-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert(`Thank you for booking ${plan}! We will contact you shortly to confirm your appointment.`);
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
    });
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        }
    });
}

// Stylist Portfolio View
const viewButtons = document.querySelectorAll('.btn-view');

viewButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const stylistCard = this.closest('.stylist-card');
        const stylistName = stylistCard.querySelector('h3').textContent;
        
        // Animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Show portfolio (would open in fancybox gallery)
        alert(`Opening ${stylistName}'s full portfolio in a new window...`);
    });
});

// Testimonial Slider
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto slide testimonials
let testimonialInterval = setInterval(() => {
    showSlide(currentSlide + 1);
}, 8000);

// Pause on hover
const testimonialSlider = document.querySelector('.testimonial-slider');
testimonialSlider.addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
});

testimonialSlider.addEventListener('mouseleave', () => {
    testimonialInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 8000);
});

// Gallery Lightbox (Fancybox)
$(document).ready(function() {
    $('[data-fancybox]').fancybox({
        buttons: [
            "zoom",
            "share",
            "slideShow",
            "fullScreen",
            "download",
            "thumbs",
            "close"
        ],
        animationEffect: "zoom",
        transitionEffect: "slide",
    });
});

// Search Functionality
const searchInputs = document.querySelectorAll('input[type="text"]');
const searchButtons = document.querySelectorAll('.search-footer button, .search-box');

searchButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const input = button.previousElementSibling || button.parentElement.querySelector('input');
        if (input && input.value.trim()) {
            performSearch(input.value);
            input.value = '';
        }
    });
});

searchInputs.forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && input.value.trim()) {
            performSearch(input.value);
            input.value = '';
        }
    });
});

function performSearch(query) {
    alert(`Searching for: "${query}"\n\nIn a real application, this would show search results for makeup services, artists, and tutorials.`);
}

// Animate on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.stat, .pricing-card, .stylist-card, .feature, .gallery-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Add CSS for modal
const modalCSS = `
    .booking-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        padding: 20px;
    }
    
    .modal-content {
        background: white;
        border-radius: 20px;
        width: 100%;
        max-width: 800px;
        overflow: hidden;
        animation: modalFade 0.3s ease;
    }
    
    @keyframes modalFade {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }
    
    .modal-header {
        background: linear-gradient(135deg, #ff6b8b, #ff8e53);
        color: white;
        padding: 25px 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .modal-header h3 {
        margin: 0;
        color: white;
    }
    
    .close-modal {
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        line-height: 1;
    }
    
    .modal-body {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
        padding: 30px;
    }
    
    .modal-image img {
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: 15px;
    }
    
    .modal-info h4 {
        margin-bottom: 10px;
        color: #333;
    }
    
    .modal-price {
        color: #ff6b8b;
        font-weight: 600;
        font-size: 1.2rem;
        margin-bottom: 20px;
    }
    
    .booking-form {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    
    .booking-form input,
    .booking-form textarea {
        padding: 12px 15px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-family: 'Poppins', sans-serif;
        font-size: 0.95rem;
    }
    
    .booking-form textarea {
        height: 100px;
        resize: vertical;
    }
    
    .submit-booking {
        background: linear-gradient(135deg, #ff6b8b, #ff8e53);
        color: white;
        border: none;
        padding: 15px;
        border-radius: 8px;
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        transition: transform 0.3s ease;
    }
    
    .submit-booking:hover {
        transform: translateY(-2px);
    }
    
    @media (max-width: 768px) {
        .modal-body {
            grid-template-columns: 1fr;
        }
    }
`;

const style = document.createElement('style');
style.textContent = modalCSS;
document.head.appendChild(style);

// Initialize
showSlide(0);