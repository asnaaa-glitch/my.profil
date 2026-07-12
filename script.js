/* =======================
   HUSNA PORTFOLIO - FINAL SCRIPT
======================= */
console.log(" Husna's Portfolio Loaded! ✨");

// =======================
// CUSTOM CURSOR (Fixed - Smaller & Clean)
// =======================
const cursorDot = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');

if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX - 4 + 'px';
        cursorDot.style.top = mouseY - 4 + 'px';
    });
    
    function animateCursor() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        
        cursorRing.style.left = ringX - 15 + 'px';
        cursorRing.style.top = ringY - 15 + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-row, .tech-tag, .stat-card, .contact-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
    });
}

// =======================
// PARTICLES BACKGROUND
// =======================
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        container.appendChild(particle);
    }
}

// =======================
// LOADING SCREEN
// =======================
window.addEventListener('load', () => {
    createParticles();
    
    const loader = document.getElementById('loader');
    
    setTimeout(() => {
        if (loader) loader.classList.add('hidden');
        
        setTimeout(() => {
            animateSkillBars();
            animateCounters();
        }, 500);
    }, 2000);
});

// =======================
// SMOOTH SCROLL
// =======================
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        
        window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
        });
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// =======================
// ACTIVE NAVIGATION
// =======================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-item');

function updateActiveNav() {
    const scrollY = window.scrollY + window.innerHeight / 3;
    
    sections.forEach(section => {
        if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
            const id = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === id) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// =======================
// SCROLL REVEAL
// =======================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            if (entry.target.querySelector('.skill-fill')) {
                animateSkillBars();
            }
            if (entry.target.querySelector('.counter')) {
                animateCounters();
            }
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// =======================
// COUNTER ANIMATION
// =======================
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        if (counter.dataset.animated) return;
        
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
                counter.dataset.animated = 'true';
            }
        };
        
        updateCounter();
    });
}

// =======================
// SKILL BARS ANIMATION (Updated with stagger)
// =======================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    const skillRows = document.querySelectorAll('.skill-row');
    
    // Stagger animation untuk rows
    skillRows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            row.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            row.style.opacity = '1';
            row.style.transform = 'translateX(0)';
        }, index * 100);
    });
    
    // Animate fill bars
    skillBars.forEach((bar, index) => {
        if (bar.dataset.animated) return;
        
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width + '%';
            bar.dataset.animated = 'true';
        }, 300 + (index * 150));
    });
}

// =======================
// SKILL ROW HOVER SOUND EFFECT (Visual feedback)
// =======================
const skillRows = document.querySelectorAll('.skill-row');

skillRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
        const icon = row.querySelector('.skill-icon');
        if (icon) {
            icon.style.transform = 'scale(1.15) rotate(8deg)';
        }
    });
    
    row.addEventListener('mouseleave', () => {
        const icon = row.querySelector('.skill-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
    
    // Click effect
    row.addEventListener('click', () => {
        const skillName = row.querySelector('.skill-title').textContent;
        const skillValue = row.querySelector('.skill-value').textContent;
        showNotification(`${skillName}: ${skillValue} proficiency`, 'info');
    });
    
    row.style.cursor = 'pointer';
});

// =======================
// TYPING EFFECT
// =======================
const roles = ['Frontend Developer', 'UI/UX Designer', 'Web Developer'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const roleElement = document.querySelector('.role-text');

function typeEffect() {
    if (!roleElement) return;
    
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        roleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        roleElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeEffect, typeSpeed);
}

setTimeout(typeEffect, 2500);

// =======================
// PROJECT FILTER
// =======================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        projectCards.forEach((card, index) => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// =======================
// CV DOWNLOAD
// =======================
function downloadCV() {
    showNotification(' Downloading CV...', 'success');
    
    setTimeout(() => {
        showNotification('✅ CV downloaded successfully!', 'success');
    }, 1500);
}

// =======================
// NOTIFICATION
// =======================
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#10b981' : '#06b6d4'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.4s ease;
    `;
    
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(400px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// =======================
// CONTACT FORM
// =======================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const button = this.querySelector('button[type="submit"]');
        const originalContent = button.innerHTML;
        
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        button.disabled = true;
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        const emailBody = `
New message from Portfolio Website!

From: ${formData.name} (${formData.email})
Subject: ${formData.subject || 'Portfolio Inquiry'}

Message:
${formData.message}

---
Sent from Husna's Portfolio
        `.trim();
        
        const mailtoLink = `mailto:as.husna06@gmail.com?subject=${encodeURIComponent('Portfolio: ' + (formData.subject || 'New Message'))}&body=${encodeURIComponent(emailBody)}`;
        
        setTimeout(() => {
            window.location.href = mailtoLink;
            this.reset();
            button.innerHTML = originalContent;
            button.disabled = false;
            showNotification('✉️ Email client opened!', 'success');
        }, 1500);
    });
}

// =======================
// BACK TO TOP
// =======================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop?.classList.add('show');
    } else {
        backToTop?.classList.remove('show');
    }
    
    updateActiveNav();
});

// =======================
// INITIALIZE
// =======================
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNav();
	// Tambahkan di bagian akhir script.js, sebelum closing

// =======================
// TECH ICONS INTERACTION
// =======================
const techIcons = document.querySelectorAll('.tech-icon-fixed');

techIcons.forEach(icon => {
    // Click effect
    icon.addEventListener('click', () => {
        const techName = icon.getAttribute('data-tech');
        showNotification(`${techName} - Skill loaded!`, 'success');
        
        // Pulse animation
        icon.style.animation = 'iconPulse 0.5s ease';
        setTimeout(() => {
            icon.style.animation = '';
        }, 500);
    });
    
    // Hover sound effect (optional - visual feedback)
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.15) rotate(5deg)';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Add icon pulse animation
if (!document.getElementById('icon-pulse-style')) {
    const style = document.createElement('style');
    style.id = 'icon-pulse-style';
    style.textContent = `
        @keyframes iconPulse {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
            50% { transform: scale(1.2); box-shadow: 0 0 0 20px rgba(16, 185, 129, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
    `;
    document.head.appendChild(style);
}

// =======================
// ANIMATE GITHUB STATS
// =======================
function animateGitHubStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        if (stat.dataset.animated) return;
        
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target.toLocaleString() + '+';
                stat.dataset.animated = 'true';
            }
        };
        
        updateCounter();
    });
}

// Observe GitHub section
const githubSection = document.getElementById('github');
if (githubSection) {
    const githubObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateGitHubStats();
                githubObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    githubObserver.observe(githubSection);
}

// =======================
// TOOLTIP FOR TOOLS
// =======================
const toolItems = document.querySelectorAll('.tool-item');

toolItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// =======================
// ROBOT HAND ANIMATION ON SCROLL
// =======================
const robotHand = document.querySelector('.robot-hand-svg');

if (robotHand) {
    const handObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                robotHand.style.opacity = '1';
                robotHand.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.3 });
    
    handObserver.observe(robotHand);
    
    // Initial state
    robotHand.style.opacity = '0';
    robotHand.style.transform = 'translateY(30px)';
    robotHand.style.transition = 'all 0.8s ease';
}
    console.log("✅ Portfolio initialized!");
});