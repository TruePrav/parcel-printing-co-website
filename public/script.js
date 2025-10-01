    // Parcel Print Co. - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Carousel functionality
    initCarousel();
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }));
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(250, 248, 245, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(44, 44, 44, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(250, 248, 245, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .process-step, .testimonial, .about-text, .about-image');
    animateElements.forEach(el => observer.observe(el));
    
    // Portfolio image modal/lightbox
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('.portfolio-overlay h4').textContent;
            const description = this.querySelector('.portfolio-overlay p').textContent;
            
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'portfolio-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="modal-close">&times;</span>
                    <img src="${img.src}" alt="${img.alt}">
                    <div class="modal-info">
                        <h3>${title}</h3>
                        <p>${description}</p>
                    </div>
                </div>
            `;
            
            // Add modal styles
            const modalStyles = `
                <style>
                .portfolio-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(44, 44, 44, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                .portfolio-modal.active {
                    opacity: 1;
                }
                .modal-content {
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                    background: white;
                    border-radius: 8px;
                    overflow: hidden;
                    transform: scale(0.8);
                    transition: transform 0.3s ease;
                }
                .portfolio-modal.active .modal-content {
                    transform: scale(1);
                }
                .modal-content img {
                    width: 100%;
                    height: auto;
                    max-height: 60vh;
                    object-fit: cover;
                }
                .modal-info {
                    padding: 2rem;
                }
                .modal-info h3 {
                    margin-bottom: 0.5rem;
                    color: var(--charcoal);
                }
                .modal-info p {
                    color: var(--dark-gray);
                }
                .modal-close {
                    position: absolute;
                    top: 15px;
                    right: 20px;
                    font-size: 2rem;
                    color: white;
                    cursor: pointer;
                    z-index: 1;
                    background: rgba(44, 44, 44, 0.7);
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.2s ease;
                }
                .modal-close:hover {
                    background: rgba(44, 44, 44, 0.9);
                }
                </style>
            `;
            
            // Add styles to head if not already present
            if (!document.querySelector('#modal-styles')) {
                const styleSheet = document.createElement('style');
                styleSheet.id = 'modal-styles';
                styleSheet.textContent = modalStyles.replace(/<style>|<\/style>/g, '');
                document.head.appendChild(styleSheet);
            }
            
            document.body.appendChild(modal);
            
            // Show modal
            setTimeout(() => modal.classList.add('active'), 10);
            
            // Close modal functionality
            const closeModal = () => {
                modal.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            };
            
            modal.querySelector('.modal-close').addEventListener('click', closeModal);
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal();
                }
            });
            
            // Close on escape key
            const escapeHandler = (e) => {
                if (e.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', escapeHandler);
                }
            };
            document.addEventListener('keydown', escapeHandler);
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            this.classList.add('loading');
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                showNotification('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                this.classList.remove('loading');
            }, 2000);
        });
    }
    
    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            const submitBtn = this.querySelector('button');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            // Simulate subscription (replace with actual API call)
            setTimeout(() => {
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // File upload handling
    const fileInput = document.getElementById('file');
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            const files = this.files;
            const label = this.closest('.file-label');
            const labelText = label.querySelector('span');
            
            if (files.length > 0) {
                const fileNames = Array.from(files).map(file => file.name).join(', ');
                labelText.textContent = `${files.length} file(s) selected: ${fileNames}`;
                label.style.borderColor = 'var(--accent-green)';
                label.style.backgroundColor = 'rgba(45, 80, 22, 0.05)';
            } else {
                labelText.textContent = 'Upload Files (Optional)';
                label.style.borderColor = 'var(--light-gray)';
                label.style.backgroundColor = 'var(--primary-cream)';
            }
        });
    }
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            hero.style.transform = `translateY(${parallax}px)`;
        });
    }
    
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
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
    
    // Utility functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add notification styles
        const notificationStyles = `
            <style>
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 3000;
                max-width: 400px;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            }
            .notification.show {
                transform: translateX(0);
            }
            .notification-content {
                background: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 10px 30px rgba(44, 44, 44, 0.2);
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-left: 4px solid;
            }
            .notification-success .notification-content {
                border-left-color: var(--accent-green);
            }
            .notification-error .notification-content {
                border-left-color: #e74c3c;
            }
            .notification-info .notification-content {
                border-left-color: var(--accent-blue);
            }
            .notification-message {
                color: var(--charcoal);
                font-weight: 500;
            }
            .notification-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--medium-gray);
                cursor: pointer;
                margin-left: 1rem;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .notification-close:hover {
                color: var(--charcoal);
            }
            </style>
        `;
        
        // Add styles if not present
        if (!document.querySelector('#notification-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'notification-styles';
            styleSheet.textContent = notificationStyles.replace(/<style>|<\/style>/g, '');
            document.head.appendChild(styleSheet);
        }
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
        
        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }
    
    // Lazy loading for images
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Add loaded class styles
    const loadedImageStyles = `
        <style>
        img[loading="lazy"] {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        img[loading="lazy"].loaded {
            opacity: 1;
        }
        .nav-link.active {
            color: var(--accent-green);
        }
        .nav-link.active::after {
            width: 100%;
        }
        </style>
    `;
    
    if (!document.querySelector('#loaded-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'loaded-styles';
        styleSheet.textContent = loadedImageStyles.replace(/<style>|<\/style>/g, '');
        document.head.appendChild(styleSheet);
    }
    
    // Performance optimization: Throttle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(function() {
            // Scroll-based animations and effects here
        }, 16); // ~60fps
    });
    
    // Carousel functionality
    function initCarousel() {
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.indicator');
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');
        
        if (!slides.length) return;
        
        // Carousel buttons initialized
        
        let currentSlide = 0;
        let autoplayInterval;
        
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
            currentSlide = index;
        }
        
        function nextSlide() {
            const next = (currentSlide + 1) % slides.length;
            showSlide(next);
        }
        
        function prevSlide() {
            const prev = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prev);
        }
        
        function startAutoplay() {
            const duration = parseInt(localStorage.getItem('carouselDuration')) || 5000;
            autoplayInterval = setInterval(nextSlide, duration);
        }
        
        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
            }
        }
        
        // Event listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                nextSlide();
            });
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                prevSlide();
            });
        }
        
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => showSlide(index));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
        
        // Pause on hover
        const carousel = document.querySelector('.hero-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', stopAutoplay);
            carousel.addEventListener('mouseleave', startAutoplay);
            
            // Touch/swipe support
            let startX = 0;
            let endX = 0;
            
            carousel.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });
            
            carousel.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                const diff = startX - endX;
                
                if (Math.abs(diff) > 50) { // Minimum swipe distance
                    if (diff > 0) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                }
            });
        }
        
        // Start autoplay if enabled
        const autoplayEnabled = localStorage.getItem('carouselAutoplay') !== 'false';
        if (autoplayEnabled) {
            startAutoplay();
        }
    }
    
    // Load featured items on homepage
    loadFeaturedItems();
    
    // Parcel Print Co. website loaded successfully
});

// Load featured items function
function loadFeaturedItems() {
    const featuredGrid = document.getElementById('featuredGrid');
    if (!featuredGrid) {
        return;
    }
    
    // Wait for gallery data to be available
    const checkForGalleryData = () => {
        if (window.getFeaturedItems) {
            const featuredItems = window.getFeaturedItems();
            renderFeaturedItems(featuredItems);
        } else {
            // Retry after a short delay if gallery.js hasn't loaded yet
            setTimeout(checkForGalleryData, 100);
        }
    };
    
    checkForGalleryData();
}

function renderFeaturedItems(items) {
    const featuredGrid = document.getElementById('featuredGrid');
    if (!featuredGrid) {
        return;
    }
    
    // Rendering featured items
    featuredGrid.innerHTML = '';
    
    items.forEach((item, index) => {
        const featuredItem = createFeaturedItem(item);
        featuredGrid.appendChild(featuredItem);
    });
}

function createFeaturedItem(item) {
    const div = document.createElement('div');
    div.className = 'featured-item';
    div.setAttribute('data-id', item.id);
    
    const categoryClass = item.category === 'tote-bags' ? 'featured-category' : 'featured-category';
    const bestsellerClass = item.isBestseller ? 'featured-bestseller' : '';
    
    // Creating featured item
    
    div.innerHTML = `
        <img src="${item.src}" alt="${item.title}">
        <div class="featured-item-content">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <div class="featured-item-meta">
                <span class="${categoryClass}">${window.getCategoryName ? window.getCategoryName(item.category) : item.category}</span>
                ${item.isBestseller ? '<span class="featured-bestseller">Best Seller</span>' : ''}
            </div>
        </div>
    `;
    
    // Add click handler to open gallery
    div.addEventListener('click', () => {
        window.location.href = 'gallery.html';
    });
    
    return div;
}

// Function to refresh featured items (can be called from admin panel)
window.refreshFeaturedItems = function() {
    loadFeaturedItems();
};

// Copy email function
function copyEmail() {
    const emailAddress = document.getElementById('emailAddress').textContent;
    
    // Try to copy to clipboard
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(emailAddress).then(() => {
            showCopySuccess();
        }).catch(() => {
            fallbackCopyTextToClipboard(emailAddress);
        });
    } else {
        fallbackCopyTextToClipboard(emailAddress);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess();
    } catch (err) {
        console.error('Fallback: Could not copy text: ', err);
        showCopyError();
    }
    
    document.body.removeChild(textArea);
}

function showCopySuccess() {
    const copyBtn = document.querySelector('.copy-btn');
    const originalText = copyBtn.textContent;
    copyBtn.textContent = 'Copied!';
    copyBtn.classList.add('copied');
    
    setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.classList.remove('copied');
    }, 2000);
}

function showCopyError() {
    const copyBtn = document.querySelector('.copy-btn');
    const originalText = copyBtn.textContent;
    copyBtn.textContent = 'Select & Copy';
    copyBtn.style.background = '#e74c3c';
    
    setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.background = '';
    }, 2000);
}
