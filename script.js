// Ocultar/Mostrar Navbar no Scroll
let prevScrollpos = window.pageYOffset;
const navbar = document.querySelector('.navbar');

window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;
    
    if (prevScrollpos > currentScrollPos || currentScrollPos < 50) {
        navbar.classList.remove('nav-hidden');
    } else {
        navbar.classList.add('nav-hidden');
    }
    
    if (currentScrollPos > 50) {
        navbar.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.5)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    prevScrollpos = currentScrollPos;
}

// Animação de Texto Typewriter
const typewriter = document.querySelector('.typewriter-text');
const texts = JSON.parse(typewriter.getAttribute('data-texts'));
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    let currentText = texts[textIndex];
    let displayText = isDeleting ? currentText.substring(0, charIndex--) : currentText.substring(0, charIndex++);
    
    typewriter.textContent = displayText;
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 30 : 50);
    }
}
type(); 

// Animação ao rolar a página (Intersection Observer)
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
    });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));