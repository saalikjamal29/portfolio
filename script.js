// Smooth scrolling and active nav link highlighting
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.style.display = 'none';
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = entry.target.dataset.animation || 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.glass-card, .project-card, .skill-category').forEach(el => {
    observer.observe(el);
});

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;

        // Validate
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Show success message
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>✓ Message Sent!</span><i class="fas fa-check"></i>';
        submitBtn.style.background = 'linear-gradient(135deg, #00d4ff, #00ff88)';

        // Reset form
        this.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
        }, 3000);

        // In production, you would send this data to a server
        console.log('Form Data:', { name, email, message });
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        const scrollPos = window.scrollY;
        heroVisual.style.transform = `translateY(${scrollPos * 0.3}px)`;
    }
});

// Add glow effect to mouse follow
document.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Update CSS variable for glow position
    document.documentElement.style.setProperty('--mouse-x', mouseX + 'px');
    document.documentElement.style.setProperty('--mouse-y', mouseY + 'px');
});

// Animate numbers on scroll
const animateNumbers = () => {
    const numbers = document.querySelectorAll('.number');
    
    numbers.forEach(number => {
        const target = parseInt(number.getAttribute('data-target'));
        let current = 0;
        const increment = target / 30;

        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                number.innerText = target + '+';
                clearInterval(counter);
            } else {
                number.innerText = Math.floor(current);
            }
        }, 50);
    });
};

// Enhanced scroll animations
const scrollElements = document.querySelectorAll('.glass-card, .project-card, .skill-category, .about-card, .experience-card');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const elementOutofView = (el) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop > (window.innerHeight || document.documentElement.clientHeight);
};

const displayScrollElement = (element) => {
    element.classList.add('scrolled');
};

const hideScrollElement = (element) => {
    element.classList.remove('scrolled');
};

window.addEventListener('scroll', () => {
    scrollElements.forEach((element) => {
        if (elementInView(element, 1.25)) {
            displayScrollElement(element);
        } else if (elementOutofView(element)) {
            hideScrollElement(element);
        }
    });
});

// Typing effect for hero title
const typeWriter = (element, text, speed = 100) => {
    let index = 0;
    element.innerText = '';

    const type = () => {
        if (index < text.length) {
            element.innerText += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    };

    type();
};

// Cursor glow effect
const createGlowCursor = () => {
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    cursorGlow.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid rgba(0, 212, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        display: none;
    `;
    document.body.appendChild(cursorGlow);

    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = (e.clientX - 10) + 'px';
        cursorGlow.style.top = (e.clientY - 10) + 'px';
        cursorGlow.style.display = 'block';
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.display = 'none';
    });
};

createGlowCursor();

// Smooth page load animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu.style.display === 'flex') {
            navMenu.style.display = 'none';
        }
    }
});

// Interactive skill tag animation
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.15) rotate(2deg)';
    });
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0)';
    });
});

// Particle effect on click
document.addEventListener('click', function(e) {
    if (e.target.closest('.btn') || e.target.closest('.project-link')) {
        createParticles(e.clientX, e.clientY);
    }
});

function createParticles(x, y) {
    const particleCount = 5;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 5px;
            height: 5px;
            background: linear-gradient(135deg, #00d4ff, #8338ec);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            opacity: 1;
        `;
        document.body.appendChild(particle);

        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 5;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        let life = 1;

        const animate = () => {
            x += vx;
            y += vy;
            life -= 0.02;
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = life;

            if (life > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };

        animate();
    }
}

// Add loading animation
window.addEventListener('load', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s forwards`;
    });
});

console.log('%c⚡ Welcome to SAALIK.AI ⚡', 'color: #00d4ff; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00d4ff;');
console.log('%cAI/ML Developer Portfolio', 'color: #8338ec; font-size: 14px;');
console.log('%cLet\'s build the future together! 🚀', 'color: #ff006e; font-size: 12px;');