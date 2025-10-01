// Gallery JavaScript for Parcel Print Co.

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
    
    // Gallery data - this would typically come from a database or API
    const galleryData = [
        // Original numbered images (PNG files)
        { id: 1, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/1.png', title: 'Hoodie Print Design', description: 'Custom hoodie with unique graphics', category: 'clothing', date: '2024-01-20', isBestseller: true, sales: 65 },
        { id: 2, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/2.png', title: 'Denim Jacket Print', description: 'Custom denim jacket with bold graphics', category: 'clothing', date: '2024-01-25', isBestseller: true, sales: 58 },
        { id: 3, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/3.png', title: 'Sweatshirt Design', description: 'Comfortable sweatshirt with custom artwork', category: 'clothing', date: '2024-02-01', isBestseller: false, sales: 32 },
        { id: 4, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/4.png', title: 'Tank Top Print', description: 'Summer tank top with vibrant design', category: 'clothing', date: '2024-02-05', isBestseller: true, sales: 62 },
        { id: 5, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/5.png', title: 'Long Sleeve Tee', description: 'Long sleeve t-shirt with detailed graphics', category: 'clothing', date: '2024-02-10', isBestseller: false, sales: 38 },
        { id: 6, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/6.png', title: 'Crop Top Design', description: 'Trendy crop top with unique print', category: 'clothing', date: '2024-02-15', isBestseller: true, sales: 51 },
        { id: 7, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/7.png', title: 'Vintage Tee Design', description: 'Retro-inspired t-shirt with vintage graphics', category: 'clothing', date: '2024-02-20', isBestseller: false, sales: 29 },
        { id: 8, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/8.png', title: 'Graphic Tee Design', description: 'Bold graphic design with modern appeal', category: 'clothing', date: '2024-02-25', isBestseller: true, sales: 47 },
        { id: 10, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/10.png', title: 'Canvas Tote Bag', description: 'Durable canvas tote with custom artwork', category: 'tote-bags', date: '2024-03-01', isBestseller: true, sales: 73 },
        { id: 11, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/11.png', title: 'Cotton Tote Bag', description: 'Soft cotton tote with vibrant print design', category: 'tote-bags', date: '2024-03-05', isBestseller: true, sales: 49 },
        { id: 13, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/13.png', title: 'Leather Tote Bag', description: 'Premium leather tote with vintage-inspired design', category: 'tote-bags', date: '2024-03-15', isBestseller: false, sales: 41 },
        { id: 15, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/15.png', title: 'Eco Tote Bag', description: 'Eco-friendly tote with sustainable materials', category: 'tote-bags', date: '2024-03-20', isBestseller: true, sales: 55 },
        
        // Custom print work images (JPEG files)
        { id: 4376, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4376.jpeg', title: 'Custom Print Work 1', description: 'High-quality custom print design with vibrant colors', category: 'clothing', date: '2024-04-01', isBestseller: true, sales: 67 },
        { id: 4377, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4377.jpeg', title: 'Custom Print Work 2', description: 'Bold graphic design on premium fabric', category: 'clothing', date: '2024-04-02', isBestseller: false, sales: 28 },
        { id: 4378, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4378.jpeg', title: 'Custom Print Work 3', description: 'Artistic design with modern appeal', category: 'clothing', date: '2024-04-03', isBestseller: true, sales: 52 },
        { id: 4379, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4379.jpeg', title: 'Custom Print Work 4', description: 'Unique pattern with eye-catching details', category: 'clothing', date: '2024-04-04', isBestseller: false, sales: 31 },
        { id: 4380, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4380.jpeg', title: 'Custom Print Work 5', description: 'Professional design with clean aesthetics', category: 'clothing', date: '2024-04-05', isBestseller: true, sales: 45 },
        { id: 4381, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4381.jpeg', title: 'Custom Print Work 6', description: 'Creative artwork with striking visuals', category: 'clothing', date: '2024-04-06', isBestseller: false, sales: 26 },
        { id: 4382, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4382.jpeg', title: 'Custom Print Work 7', description: 'Dynamic design with bold typography', category: 'clothing', date: '2024-04-07', isBestseller: true, sales: 44 },
        { id: 4383, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4383.jpeg', title: 'Custom Print Work 8', description: 'Minimalist design with sophisticated appeal', category: 'clothing', date: '2024-04-08', isBestseller: false, sales: 29 },
        { id: 4384, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4384.jpeg', title: 'Custom Print Work 9', description: 'Vibrant colors with contemporary style', category: 'clothing', date: '2024-04-09', isBestseller: true, sales: 41 },
        { id: 4385, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4385.jpeg', title: 'Custom Print Work 10', description: 'Artistic expression with modern flair', category: 'clothing', date: '2024-04-10', isBestseller: false, sales: 33 },
        { id: 4386, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4386.jpeg', title: 'Custom Print Work 11', description: 'Bold statement piece with unique character', category: 'clothing', date: '2024-04-11', isBestseller: true, sales: 38 },
        { id: 4387, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4387.jpeg', title: 'Custom Print Work 12', description: 'Professional quality with creative design', category: 'clothing', date: '2024-04-12', isBestseller: false, sales: 27 },
        { id: 4388, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4388.jpeg', title: 'Custom Print Work 13', description: 'Trendy design with street-style appeal', category: 'clothing', date: '2024-04-13', isBestseller: true, sales: 43 },
        { id: 4389, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4389.jpeg', title: 'Custom Print Work 14', description: 'Premium quality with artistic vision', category: 'clothing', date: '2024-04-14', isBestseller: false, sales: 32 }
    ];
    
    let currentFilter = 'all';
    let currentImageIndex = 0;
    let filteredImages = [];
    
    // Initialize gallery
    initGallery();
    
    function initGallery() {
        // Filter out deleted images before initializing
        filterOutDeletedImages();
        renderGallery();
        setupFilters();
        setupModal();
    }
    
    function filterOutDeletedImages() {
        // Get list of deleted image IDs
        const deletedImages = JSON.parse(localStorage.getItem('deletedImages')) || [];
        
        // Filter out deleted images from gallery data
        filteredImages = galleryData.filter(img => !deletedImages.includes(img.id));
    }
    
    function renderGallery() {
        const galleryGrid = document.getElementById('galleryGrid');
        if (!galleryGrid) return;
        
        galleryGrid.innerHTML = '';
        
        filteredImages.forEach((image, index) => {
            const galleryItem = createGalleryItem(image, index);
            galleryGrid.appendChild(galleryItem);
        });
    }
    
    function createGalleryItem(image, index) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.setAttribute('data-category', image.category);
        item.setAttribute('data-index', index);
        
        item.innerHTML = `
            <img src="${image.src}" alt="${image.title}" loading="lazy">
            <div class="gallery-item-info">
                <h3>${image.title}</h3>
                <p>${image.description}</p>
            </div>
            <div class="gallery-item-category">${getCategoryName(image.category)}</div>
        `;
        
        item.addEventListener('click', () => openModal(index));
        
        return item;
    }
    
    function getCategoryName(category) {
        const categories = {
            'clothing': 'Clothing',
            'tote-bags': 'Tote Bags'
        };
        return categories[category] || 'Other';
    }
    
    function setupFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Filter images
                const filter = btn.getAttribute('data-filter');
                currentFilter = filter;
                
                // First filter out deleted images, then apply category filter
                const deletedImages = JSON.parse(localStorage.getItem('deletedImages')) || [];
                const availableImages = galleryData.filter(img => !deletedImages.includes(img.id));
                
                if (filter === 'all') {
                    filteredImages = [...availableImages];
                } else {
                    filteredImages = availableImages.filter(img => img.category === filter);
                }
                
                renderGallery();
            });
        });
    }
    
    function setupModal() {
        const modal = document.getElementById('galleryModal');
        const modalClose = document.getElementById('modalClose');
        const modalPrev = document.getElementById('modalPrev');
        const modalNext = document.getElementById('modalNext');
        
        if (!modal) return;
        
        // Close modal
        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        // Navigation
        modalPrev.addEventListener('click', () => navigateModal(-1));
        modalNext.addEventListener('click', () => navigateModal(1));
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (modal.classList.contains('active')) {
                if (e.key === 'Escape') closeModal();
                if (e.key === 'ArrowLeft') navigateModal(-1);
                if (e.key === 'ArrowRight') navigateModal(1);
            }
        });
    }
    
    function openModal(index) {
        const modal = document.getElementById('galleryModal');
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const modalCategory = document.getElementById('modalCategory');
        const modalDate = document.getElementById('modalDate');
        
        if (!modal) return;
        
        currentImageIndex = index;
        const image = filteredImages[index];
        
        modalImage.src = image.src;
        modalImage.alt = image.title;
        modalTitle.textContent = image.title;
        modalDescription.textContent = image.description;
        modalCategory.textContent = getCategoryName(image.category);
        modalDate.textContent = new Date(image.date).toLocaleDateString();
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        const modal = document.getElementById('galleryModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    function navigateModal(direction) {
        const newIndex = currentImageIndex + direction;
        
        if (newIndex < 0) {
            currentImageIndex = filteredImages.length - 1;
        } else if (newIndex >= filteredImages.length) {
            currentImageIndex = 0;
        } else {
            currentImageIndex = newIndex;
        }
        
        const image = filteredImages[currentImageIndex];
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const modalCategory = document.getElementById('modalCategory');
        const modalDate = document.getElementById('modalDate');
        
        modalImage.src = image.src;
        modalImage.alt = image.title;
        modalTitle.textContent = image.title;
        modalDescription.textContent = image.description;
        modalCategory.textContent = getCategoryName(image.category);
        modalDate.textContent = new Date(image.date).toLocaleDateString();
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
        
        // Add notification styles if not present
        if (!document.querySelector('#notification-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'notification-styles';
            styleSheet.textContent = `
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
            `;
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
    
    // Function to get featured items (top 9 bestsellers)
    function getFeaturedItems() {
        // Get list of deleted image IDs
        const deletedImages = JSON.parse(localStorage.getItem('deletedImages')) || [];
        
        return galleryData
            .filter(item => !deletedImages.includes(item.id)) // Filter out deleted images
            .filter(item => item.isBestseller)
            .sort((a, b) => b.sales - a.sales)
            .slice(0, 9);
    }
    
    // Function to get filtered gallery data (excluding deleted images)
    function getFilteredGalleryData() {
        const deletedImages = JSON.parse(localStorage.getItem('deletedImages')) || [];
        return galleryData.filter(item => !deletedImages.includes(item.id));
    }
    
    // Function to refresh gallery (can be called from admin panel)
    window.refreshGallery = function() {
        filterOutDeletedImages();
        renderGallery();
    };
    
    // Export functions for use in other files
    window.galleryData = getFilteredGalleryData(); // Use filtered data
    window.getFeaturedItems = getFeaturedItems;
    window.getCategoryName = getCategoryName;
    
    // Gallery loaded successfully
});
