// --- Menü Kaydırma Efekti ---
const header = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// --- Ana Ekran Daktilo (Typewriter) Efekti ---
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
        typeSpeed = 2000; // Kelime bittiğinde bekleme süresi
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
}

// --- Sayı Saydırma (Counter) Animasyonu ---
const counters = document.querySelectorAll('.counter-number');
let hasCounted = false;

const startCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 100; // Sayma hızı
        
        const updateCount = () => {
            const count = +counter.innerText;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20); // 20ms'de bir yenile
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
        hasCounted = true; // Sadece bir kere çalışsın
    }
}, { threshold: 0.5 }); // Bölümün yarısı görününce başla

const statsSection = document.getElementById('istatistikler');
if(statsSection) {
    counterObserver.observe(statsSection);
}

// --- Aşağı Kaydırdıkça Görünen Elemanlar (Scroll Reveal) ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // İsteğe bağlı: Animasyon bir kere oynasın istiyorsan alttaki satırın yorumunu kaldır
            // observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1 // Elemanın %10'u ekrana girince tetikler
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// Sayfa tamamen yüklendiğinde daktilo efektini başlat
document.addEventListener('DOMContentLoaded', () => {
    if(textArray.length > 0) setTimeout(type, 800);
});

// --- Mobil Menü (Hamburger) İşlemleri ---
const mobileMenu = document.getElementById('mobile-menu');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav a');

// Hamburger ikonuna tıklanınca menüyü aç/kapat
mobileMenu.addEventListener('click', () => {
    nav.classList.toggle('active');
    
    // İkonu değiştir (Menü açılınca Çarpı, kapanınca Hamburger olsun)
    const icon = mobileMenu.querySelector('i');
    if (nav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

// Menüden bir linke tıklandığında menüyü otomatik kapat
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if(window.innerWidth <= 768) { // Sadece mobilde çalışsın
            nav.classList.remove('active');
            const icon = mobileMenu.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });
});