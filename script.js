// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== CAROUSEL FUNCTIONALITY =====
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;
const track = document.querySelector('.carousel-track');
const indicators = document.querySelectorAll('.indicator');
const currentSlideSpan = document.querySelector('.current-slide');
const totalSlidesSpan = document.querySelector('.total-slides');

// Auto-advance carousel every 5 seconds
let autoAdvanceInterval = setInterval(() => {
    moveCarousel(1);
}, 5000);

// Reset auto-advance on manual navigation
function resetAutoAdvance() {
    clearInterval(autoAdvanceInterval);
    autoAdvanceInterval = setInterval(() => {
        moveCarousel(1);
    }, 5000);
}

function updateCarousel() {
    // Update track position
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update active slide
    slides.forEach(slide => slide.classList.remove('active'));
    slides[currentSlide].classList.add('active');
    
    // Update indicators
    indicators.forEach(indicator => indicator.classList.remove('active'));
    indicators[currentSlide].classList.add('active');
    
    // Update counter
    currentSlideSpan.textContent = currentSlide + 1;
}

function moveCarousel(direction) {
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    updateCarousel();
    resetAutoAdvance();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
    resetAutoAdvance();
}

// Touch/Swipe support for carousel
let touchStartX = 0;
let touchEndX = 0;
const carouselContainer = document.querySelector('.carousel-container');

carouselContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

carouselContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        moveCarousel(1); // Swipe left
    }
    if (touchEndX > touchStartX + 50) {
        moveCarousel(-1); // Swipe right
    }
}

// Pause auto-advance on hover
carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(autoAdvanceInterval);
});

carouselContainer.addEventListener('mouseleave', () => {
    resetAutoAdvance();
});

// ===== SMOOTH SCROLL FOR BUTTONS =====
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

// ===== FORM SUBMISSION =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.client-card, .value-card, .stat').forEach(el => {
    observer.observe(el);
});

// Initialize carousel
updateCarousel();

console.log('YRP CREATION Portfolio Website Loaded Successfully!');
