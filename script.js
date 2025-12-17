document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. MOBILE MENU TOGGLE --- */
    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');

    // Toggle menu on button click
    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuBtn.classList.toggle('open'); // Optional: for animating the hamburger icon
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuBtn.classList.remove('open');
        });
    });

    /* --- 2. HEADER SCROLL EFFECT --- */
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* --- 3. SCROLL REVEAL ANIMATION --- */
    // This looks for any element with the class 'reveal'
    const observerOptions = {
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll('.reveal');
    elementsToReveal.forEach(el => observer.observe(el));
});
/* --- 5. CUSTOM CURSOR LOGIC --- */
const cursor = document.querySelector('.mouse-cursor');
const hoverLinks = document.querySelectorAll('a, button, .btn, .project-card');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Add 'hovered' class when mouse is over interactive elements
hoverLinks.forEach(link => {
    link.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    link.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});
/* --- 3 (UPDATED). STAGGERED SCROLL REVEAL --- */
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Select all cards you want to stagger
const staggeredElements = document.querySelectorAll('.service-card, .project-card');

staggeredElements.forEach((el, index) => {
    el.classList.add('reveal'); // Ensure they have the base reveal class
    // Add dynamic delay based on column position (simple math)
    // This makes the 2nd card wait 200ms, 3rd wait 400ms, etc.
    el.style.transitionDelay = `${(index % 3) * 200}ms`;
    observer.observe(el);
});

// Observe other generic reveal elements normally
document.querySelectorAll('.reveal:not(.service-card):not(.project-card)').forEach(el => {
    observer.observe(el);
});

/* --- 6. HERO BACKGROUND SLIDER --- */
const heroImages = [
    'images/header PROGRAMMING.jpg',
    'images/code running.jpg',
    'images/crypto hack.jpg',
    'images/Cyber security illustration words.jpg'
];

let currentImageIndex = 0;
const hero = document.querySelector('.hero');

function changeHeroBackground() {
    currentImageIndex = (currentImageIndex + 1) % heroImages.length;
    hero.style.backgroundImage = `url(${heroImages[currentImageIndex]})`;
}

// Change background every 5 seconds
setInterval(changeHeroBackground, 5000);