/* --- Mobile Menu Toggle --- */
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    const barsIcon = document.getElementById('icon-bars');
    const closeIcon = document.getElementById('icon-close');
    const body = document.body;

    if (menu.classList.contains('active')) {
        menu.classList.remove('active');
        overlay.classList.remove('active');
        setTimeout(() => menu.classList.add('hidden'), 300);

        barsIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        body.style.overflow = 'auto';
    } else {
        menu.classList.remove('hidden');
        overlay.classList.add('active');
        setTimeout(() => menu.classList.add('active'), 10);

        barsIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
        body.style.overflow = 'hidden';
    }
}

const navbar = document.getElementById('navbar');

const progressBar = document.getElementById('progress-bar');
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = maxScroll > 0 ? (currentScroll / maxScroll) * 100 : 0;

    if (progressBar) {
        progressBar.style.width = `${scrollPercent}%`;
    }

    if (backToTopBtn) {
        backToTopBtn.classList.toggle('visible', currentScroll > 400);
    }

    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 10px 30px -10px rgba(88, 66, 39, 0.15)';
        navbar.style.background = 'rgba(247, 239, 231, 0.95)';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.background = 'rgba(247, 239, 231, 0.9)';
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* --- Experience Tabs --- */
function switchTab(index) {
    const buttons = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.tab-panel');

    buttons.forEach(btn => btn.classList.remove('active'));
    panels.forEach(panel => panel.classList.remove('active'));

    buttons[index].classList.add('active');
    panels[index].classList.add('active');
}

/* --- Reveal on Scroll --- */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealElements.forEach(element => revealObserver.observe(element));

/* --- Counter Animation --- */
const counters = document.querySelectorAll('.counter');

const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = Number(el.dataset.target || 0);
        const suffix = el.dataset.suffix || '';
        const duration = 1200;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.floor(progress * target);
            el.textContent = value + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                el.textContent = target + suffix;
            }
        }

        requestAnimationFrame(updateCounter);
        countObserver.unobserve(el);
    });
}, { threshold: 0.6 });

counters.forEach(counter => countObserver.observe(counter));

/* --- Particle Background --- */
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const particles = Array.from({ length: 50 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.8 + 0.5,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.5 + 0.2
}));

function animateParticles() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > window.innerWidth) p.dx *= -1;
        if (p.y < 0 || p.y > window.innerHeight) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 255, 218, ${p.alpha})`;
        ctx.fill();
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();

/* --- Custom Cursor --- */
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

window.addEventListener('mousemove', (event) => {
    cursorDot.style.left = `${event.clientX}px`;
    cursorDot.style.top = `${event.clientY}px`;
    cursorRing.style.left = `${event.clientX}px`;
    cursorRing.style.top = `${event.clientY}px`;
});

document.querySelectorAll('a, button, input, textarea, .project-card, .small-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* --- Mobile Menu Overlay Click --- */
document.getElementById('mobile-menu-overlay').addEventListener('click', toggleMobileMenu);

/* --- Contact Form Submission --- */
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (response.ok) {
                location.reload();
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            alert('Error sending message. Please try again.');
        }
    });
}