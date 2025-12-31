/* --- Mobile Menu Toggle --- */
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const barsIcon = document.getElementById('icon-bars');
    const closeIcon = document.getElementById('icon-close');
    const body = document.body;

    // Toggle menu visibility using CSS transform class
    if (menu.classList.contains('active')) {
        menu.classList.remove('active');
        // Wait for transition to finish before hiding (optional, kept simple here)
        setTimeout(() => menu.classList.add('hidden'), 300);

        barsIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        body.style.overflow = 'auto'; // Enable scroll
    } else {
        menu.classList.remove('hidden');
        // Small delay to allow display:flex to apply before adding active class for transition
        setTimeout(() => menu.classList.add('active'), 10);

        barsIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
        body.style.overflow = 'hidden'; // Disable scroll
    }
}

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        // Adds shadow when you've scrolled down a bit
        navbar.style.boxShadow = '0 10px 30px -10px rgba(2, 12, 27, 0.7)';
        navbar.style.background = 'rgba(10, 25, 47, 0.95)';
    } else {
        // Removes shadow when at the very top
        navbar.style.boxShadow = 'none';
        navbar.style.background = 'rgba(10, 25, 47, 1)'; // Or your preferred top color
    }
});

/* --- Experience Tabs --- */
function switchTab(index) {
    const buttons = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.tab-panel');

    // Remove active class from all buttons and panels
    buttons.forEach(btn => btn.classList.remove('active'));
    panels.forEach(panel => panel.classList.remove('active'));

    // Add active class to clicked button and corresponding panel
    buttons[index].classList.add('active');
    panels[index].classList.add('active');
}