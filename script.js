const header = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const typeWriterElement = document.querySelector('.typewriter-text');
const textArray = ["Yazılım Geliştirici", "Eğitim Teknolojileri Uzmanı", "Oyun Geliştirici"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = textArray[textIndex];
    
    if (isDeleting) {
        typeWriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeWriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
}

const counters = document.querySelectorAll('.counter-number');
let hasCounted = false;

const startCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 100;
        
        const updateCount = () => {
            const count = +counter.innerText;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

const counterObserver = new IntersectionObserver((entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && !hasCounted) {
        startCounters();
        hasCounted = true;
    }
}, { threshold: 0.5 });

const statsSection = document.getElementById('istatistikler');
if(statsSection) {
    counterObserver.observe(statsSection);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

document.addEventListener('DOMContentLoaded', () => {
    if(textArray.length > 0) setTimeout(type, 800);
});

const mobileMenu = document.getElementById('mobile-menu');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav a');

mobileMenu.addEventListener('click', () => {
    nav.classList.toggle('active');
    
    const icon = mobileMenu.querySelector('i');
    if (nav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if(window.innerWidth <= 768) {
            nav.classList.remove('active');
            const icon = mobileMenu.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });
});
