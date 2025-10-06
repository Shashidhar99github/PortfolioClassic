document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            initializeAnimations();
        }, 800);
    }, 3000);
});

function initializeAnimations() {
    startTypewriter();
    animateSkillBars();
    initSmoothScrolling();
    initScrollAnimations();
    initContactForm();
    initNavbarScrollEffect();
    initParallaxEffect();
}

function startTypewriter() {
    const typewriterElement = document.querySelector('.typewriter');
    const text = "Fresh Graduate | Aspiring Developer | Dream Chaser";
    typewriterElement.textContent = '';
    typewriterElement.style.borderRight = '3px solid var(--sepia-gold)';
    
    let i = 0;
    const typeSpeed = 100;
    
    function typeChar() {
        if (i < text.length) {
            typewriterElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeChar, typeSpeed);
        } else {
            setInterval(() => {
                typewriterElement.style.borderRight = 
                    typewriterElement.style.borderRight === '3px solid transparent' 
                    ? '3px solid var(--sepia-gold)' 
                    : '3px solid transparent';
            }, 500);
        }
    }
    
    setTimeout(typeChar, 1000);
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 200);
                
                observer.unobserve(progressBar);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => observer.observe(bar));
}

function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                updateActiveNavLink(targetId);
            }
        });
    });
    
    const heroButtons = document.querySelectorAll('.hero-buttons a[href^="#"]');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.quality-card, .skill-badge, .project-card, .contact-method');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

function initNavbarScrollEffect() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 2px 20px var(--vintage-shadow)';
            navbar.style.background = 'rgba(247, 243, 233, 0.98)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(247, 243, 233, 0.95)';
        }
        
        updateActiveSection();
        
        lastScrollTop = scrollTop;
    });
}

function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPos = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    const submitButton = contactForm.querySelector('button[type="submit"]');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }

        fetch('https://formsubmit.co/ajax/shashireddy99124@gmail.com', {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: formData
        })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(() => {
            showNotification('Message sent successfully! Thank you for reaching out.', 'success');
            contactForm.reset();
        })
        .catch(() => {
            showNotification('Failed to send. Please try again, or email me at shashireddy99124@gmail.com', 'error');
        })
        .finally(() => {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }
        });
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">×</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        max-width: 400px;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px var(--vintage-shadow);
        z-index: 9999;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        font-family: 'Crimson Text', serif;
        ${type === 'success' ? 
            'background: var(--soft-white); color: var(--warm-brown); border-left: 4px solid #4CAF50;' : 
            'background: var(--soft-white); color: var(--warm-brown); border-left: 4px solid #f44336;'
        }
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: inherit;
        padding: 0;
        margin-left: 10px;
    `;
    
    closeBtn.addEventListener('click', () => {
        closeNotification(notification);
    });
    
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

function closeNotification(notification) {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function initParallaxEffect() {
    const parallaxBg = document.querySelector('.parallax-bg');
    if (!parallaxBg) return;

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const section = document.querySelector('.about');
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        // Only apply parallax when section is in view
        if (scrollPosition >= sectionTop - window.innerHeight && scrollPosition <= sectionTop + sectionHeight) {
            const offset = (scrollPosition - sectionTop) * 0.3; // Adjust speed (0.3 = 30% of scroll speed)
            parallaxBg.style.transform = `translateY(${offset}px)`;
        }
    });
}

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const speed = scrolled * 0.5;
        hero.style.transform = `translateY(${speed}px)`;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateY(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0)';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const qualityCards = document.querySelectorAll('.quality-card');
    
    qualityCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo-text');
    
    if (logo) {
        logo.addEventListener('click', function(e) {
            createSparkles(e.target);
        });
    }
});

function createSparkles(element) {
    for (let i = 0; i < 6; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: absolute;
            pointer-events: none;
            font-size: 1rem;
            z-index: 10000;
            animation: sparkleFloat 1s ease-out forwards;
        `;
        
        const rect = element.getBoundingClientRect();
        sparkle.style.left = rect.left + Math.random() * rect.width + 'px';
        sparkle.style.top = rect.top + Math.random() * rect.height + 'px';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
}

const sparkleCSS = `
    @keyframes sparkleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg) scale(0);
        }
        50% {
            opacity: 1;
            transform: translateY(-30px) rotate(180deg) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-60px) rotate(360deg) scale(0);
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = sparkleCSS;
document.head.appendChild(styleSheet);

function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const throttledScrollHandler = throttle(() => {
    updateActiveSection();
}, 100);

window.addEventListener('scroll', throttledScrollHandler);