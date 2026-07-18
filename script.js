const header = document.getElementById('navbar');
const logo = document.querySelector('.logo');
const mobileMenu = document.getElementById('mobile-menu');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav a');
const typeWriterElement = document.querySelector('.typewriter-text');

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 24);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

logo.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

mobileMenu.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('active');
    mobileMenu.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-label', isOpen ? 'Menüyü kapat' : 'Menüyü aç');
    const icon = mobileMenu.querySelector('i');
    icon.classList.toggle('fa-bars', !isOpen);
    icon.classList.toggle('fa-xmark', isOpen);
});

navLinks.forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('active');
    mobileMenu.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-label', 'Menüyü aç');
    const icon = mobileMenu.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-xmark');
}));

document.addEventListener('click', event => {
    if (window.innerWidth <= 820 && nav.classList.contains('active') && !header.contains(event.target)) {
        nav.classList.remove('active');
        mobileMenu.setAttribute('aria-expanded', 'false');
    }
});

const textArray = ['Yazılım Geliştirici', 'Eğitim Teknolojileri Uzmanı', 'Oyun Geliştirici'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeTimer;

function type() {
    if (!typeWriterElement) return;
    const currentText = textArray[textIndex];
    charIndex += isDeleting ? -1 : 1;
    typeWriterElement.textContent = currentText.substring(0, charIndex);

    let speed = isDeleting ? 35 : 70;
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        speed = 1800;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        speed = 350;
    }
    typeTimer = window.setTimeout(type, speed);
}

const hiddenElements = document.querySelectorAll('.hidden');
if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -35px' });
    hiddenElements.forEach(el => revealObserver.observe(el));
} else {
    hiddenElements.forEach(el => el.classList.add('show'));
}

const counters = document.querySelectorAll('.counter-number');
const statsSection = document.getElementById('istatistikler');
let hasCounted = false;

function startCounters() {
    if (hasCounted) return;
    hasCounted = true;
    counters.forEach(counter => {
        const target = Number(counter.dataset.target || 0);
        const duration = 1500;
        const start = performance.now();
        const formatter = new Intl.NumberFormat('tr-TR');
        const animate = now => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = formatter.format(Math.floor(target * eased));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    });
}

if (statsSection && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            startCounters();
            counterObserver.disconnect();
        }
    }, { threshold: 0.35 });
    counterObserver.observe(statsSection);
} else {
    startCounters();
}

const sections = [...document.querySelectorAll('main section[id]')];
const setActiveNav = () => {
    const current = sections.reduce((active, section) => {
        const top = section.getBoundingClientRect().top;
        return top <= 150 ? section.id : active;
    }, sections[0]?.id || 'hakkimda');
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
};
window.addEventListener('scroll', setActiveNav, { passive: true });
setActiveNav();

window.addEventListener('DOMContentLoaded', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
        typeWriterElement.textContent = textArray[0];
    } else {
        typeTimer = window.setTimeout(type, 500);
    }
});

window.addEventListener('beforeunload', () => window.clearTimeout(typeTimer));
