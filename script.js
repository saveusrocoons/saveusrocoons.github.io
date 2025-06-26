// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Auto-advance carousel
setInterval(nextSlide, 5000);

// Carousel button event listeners
document.querySelector('.carousel-btn.next').addEventListener('click', nextSlide);
document.querySelector('.carousel-btn.prev').addEventListener('click', prevSlide);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Form submission handling
document.getElementById('walkForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const category = formData.get('category');
    const pledge = formData.get('pledge');
    
    // Show success message
    showNotification(`Thank you, ${name}! You've successfully registered for the walkathon. We'll send confirmation details to ${email}.`, 'success');
    
    // Reset form
    this.reset();
});

// Donate button functionality
document.querySelectorAll('.donate-btn').forEach(button => {
    button.addEventListener('click', function() {
        const raccoonName = this.getAttribute('data-raccoon');
        showNotification(`Thank you for wanting to donate to ${raccoonName}! Redirecting to donation page...`, 'info');
        
        // Simulate redirect to donation page
        setTimeout(() => {
            alert(`You would be redirected to a secure donation page for ${raccoonName}.`);
        }, 2000);
    });
});

// Tier donation buttons
document.querySelectorAll('.tier-btn').forEach(button => {
    button.addEventListener('click', function() {
        const amount = this.textContent.match(/\$[\d,]+/)[0];
        showNotification(`Thank you for choosing the ${amount} donation tier! Redirecting to secure payment...`, 'success');
        
        // Simulate redirect to payment page
        setTimeout(() => {
            alert(`You would be redirected to a secure payment page for ${amount}.`);
        }, 2000);
    });
});

// CTA button functionality
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function() {
        const action = this.textContent.toLowerCase();
        if (action.includes('walk')) {
            document.getElementById('walk').scrollIntoView({ behavior: 'smooth' });
        } else if (action.includes('donate')) {
            document.getElementById('donate').scrollIntoView({ behavior: 'smooth' });
        } else if (action.includes('learn')) {
            document.getElementById('mission').scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 1rem;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.icon-item, .racer-card, .tier-card, .testimonial');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Pledge sheet download simulation
document.querySelector('.pledge-link').addEventListener('click', function(e) {
    e.preventDefault();
    showNotification('Pledge sheet download started! Check your downloads folder.', 'success');
    
    // Simulate download
    setTimeout(() => {
        alert('Pledge sheet would be downloaded here.');
    }, 1000);
});

// Social media links
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const platform = this.querySelector('i').className.includes('facebook') ? 'Facebook' :
                        this.querySelector('i').className.includes('twitter') ? 'Twitter' :
                        this.querySelector('i').className.includes('instagram') ? 'Instagram' : 'TikTok';
        
        showNotification(`Redirecting to our ${platform} page...`, 'info');
        
        setTimeout(() => {
            alert(`You would be redirected to our ${platform} page.`);
        }, 1500);
    });
});

// Add some fun interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to donor wall
    const donors = document.querySelectorAll('.donor');
    donors.forEach(donor => {
        donor.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        donor.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to mission icons
    const missionIcons = document.querySelectorAll('.icon-item');
    missionIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px)';
            }, 200);
        });
    });
});

// Easter egg: Konami code for a special message
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konamiSequence.length && 
        konamiCode.every((code, index) => code === konamiSequence[index])) {
        showNotification('🎉 You found the secret! You\'re officially a Raccoon Whisperer! 🦝', 'success');
        konamiCode = [];
    }
}); 