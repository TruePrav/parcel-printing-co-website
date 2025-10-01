// Admin Panel JavaScript for Parcel Print Co.
// Admin.js script starting to load

// Create a simple test function first
window.testAdminFunction = function() {
    // Test admin function called successfully
    return 'Admin.js is working!';
};

// Create the function immediately when script loads (not waiting for DOM)
window.initAdminPanelAfterAuth = function() {
    // initAdminPanelAfterAuth called
    try {
        // Initialize admin panel functionality directly
        // Debug log removed
        
        // Set up tabs
        setupBasicTabs();
        
        // Load admin content
        loadImageManagement();
        loadCarouselSettings();
        loadContentManagement();
        setupImageUpload();
        initFeaturedItemsManagement();
        
        // Debug log removed
    } catch (error) {
        console.error('Error initializing admin panel:', error);
    }
};

// Debug log removed

// Define functions globally so they're available to initAdminPanelAfterAuth
function setupBasicTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            btn.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Debug log removed
        });
    });
}

function loadImageManagement() {
    const imageGrid = document.getElementById('imageGrid');
    if (!imageGrid) return;
    
    // Get both saved images and default images
    const savedImages = JSON.parse(localStorage.getItem('galleryImages')) || [];
    const defaultImages = getDefaultImages();
    
    // Combine both arrays
    const allImages = [...savedImages, ...defaultImages];
    
    console.log('Saved images:', savedImages.length);
    console.log('Default images:', defaultImages.length);
    console.log('Total images to display:', allImages.length);
    
    renderImageGrid(allImages);
}

function loadCarouselSettings() {
    loadCurrentCarouselImages();
    loadAvailableCarouselImages();
}

function loadContentManagement() {
    // Basic content management setup
    // Debug log removed
}

function setupImageUpload() {
    // Basic image upload setup
    // Debug log removed
}

function initFeaturedItemsManagement() {
    loadFeaturedItemsManagement();
    setupFeaturedItemsEvents();
}

function loadFeaturedItemsManagement() {
    const featuredGrid = document.getElementById('featuredItemsGrid');
    if (!featuredGrid) return;
    
    // Load gallery data (this would come from the same source as gallery.js)
    const galleryData = [
        // Original numbered images (PNG files)
        { id: 1, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/1.png', title: 'Hoodie Print Design', description: 'Custom hoodie with unique graphics', category: 'clothing', isBestseller: true, sales: 65 },
        { id: 2, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/2.png', title: 'Denim Jacket Print', description: 'Custom denim jacket with bold graphics', category: 'clothing', isBestseller: true, sales: 58 },
        { id: 3, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/3.png', title: 'Sweatshirt Design', description: 'Comfortable sweatshirt with custom artwork', category: 'clothing', isBestseller: false, sales: 32 },
        { id: 4, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/4.png', title: 'Tank Top Print', description: 'Summer tank top with vibrant design', category: 'clothing', isBestseller: true, sales: 62 },
        { id: 5, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/5.png', title: 'Long Sleeve Tee', description: 'Long sleeve t-shirt with detailed graphics', category: 'clothing', isBestseller: false, sales: 38 },
        { id: 6, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/6.png', title: 'Crop Top Design', description: 'Trendy crop top with unique print', category: 'clothing', isBestseller: true, sales: 51 },
        { id: 7, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/7.png', title: 'Vintage Tee Design', description: 'Retro-inspired t-shirt with vintage graphics', category: 'clothing', isBestseller: false, sales: 29 },
        { id: 8, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/8.png', title: 'Graphic Tee Design', description: 'Bold graphic design with modern appeal', category: 'clothing', isBestseller: true, sales: 47 },
        { id: 10, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/10.png', title: 'Canvas Tote Bag', description: 'Durable canvas tote with custom artwork', category: 'tote-bags', isBestseller: true, sales: 73 },
        { id: 11, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/11.png', title: 'Cotton Tote Bag', description: 'Soft cotton tote with vibrant print design', category: 'tote-bags', isBestseller: true, sales: 49 },
        { id: 13, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/13.png', title: 'Leather Tote Bag', description: 'Premium leather tote with vintage-inspired design', category: 'tote-bags', isBestseller: false, sales: 41 },
        { id: 15, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/15.png', title: 'Eco Tote Bag', description: 'Eco-friendly tote with sustainable materials', category: 'tote-bags', isBestseller: true, sales: 55 },
        
        // Custom print work images (JPEG files)
        { id: 4376, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4376.jpeg', title: 'Custom Print Work 1', description: 'High-quality custom print design with vibrant colors', category: 'clothing', isBestseller: true, sales: 67 },
        { id: 4377, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4377.jpeg', title: 'Custom Print Work 2', description: 'Bold graphic design on premium fabric', category: 'clothing', isBestseller: false, sales: 28 },
        { id: 4378, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4378.jpeg', title: 'Custom Print Work 3', description: 'Artistic design with modern appeal', category: 'clothing', isBestseller: true, sales: 52 },
        { id: 4379, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4379.jpeg', title: 'Custom Print Work 4', description: 'Unique pattern with eye-catching details', category: 'clothing', isBestseller: false, sales: 31 },
        { id: 4380, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4380.jpeg', title: 'Custom Print Work 5', description: 'Professional design with clean aesthetics', category: 'clothing', isBestseller: true, sales: 45 },
        { id: 4381, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4381.jpeg', title: 'Custom Print Work 6', description: 'Creative artwork with striking visuals', category: 'clothing', isBestseller: false, sales: 26 },
        { id: 4382, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4382.jpeg', title: 'Custom Print Work 7', description: 'Dynamic design with bold typography', category: 'clothing', isBestseller: true, sales: 44 },
        { id: 4383, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4383.jpeg', title: 'Custom Print Work 8', description: 'Minimalist design with sophisticated appeal', category: 'clothing', isBestseller: false, sales: 29 },
        { id: 4384, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4384.jpeg', title: 'Custom Print Work 9', description: 'Vibrant colors with contemporary style', category: 'clothing', isBestseller: true, sales: 41 },
        { id: 4385, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4385.jpeg', title: 'Custom Print Work 10', description: 'Artistic expression with modern flair', category: 'clothing', isBestseller: false, sales: 33 },
        { id: 4386, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4386.jpeg', title: 'Custom Print Work 11', description: 'Bold statement piece with unique character', category: 'clothing', isBestseller: true, sales: 38 },
        { id: 4387, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4387.jpeg', title: 'Custom Print Work 12', description: 'Professional quality with creative design', category: 'clothing', isBestseller: false, sales: 27 },
        { id: 4388, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4388.jpeg', title: 'Custom Print Work 13', description: 'Trendy design with street-style appeal', category: 'clothing', isBestseller: true, sales: 43 },
        { id: 4389, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4389.jpeg', title: 'Custom Print Work 14', description: 'Premium quality with artistic vision', category: 'clothing', isBestseller: false, sales: 32 }
    ];
    
    featuredGrid.innerHTML = '';
    
    galleryData.forEach(item => {
        const featuredItem = createFeaturedAdminItem(item);
        featuredGrid.appendChild(featuredItem);
    });
}

function createFeaturedAdminItem(item) {
    const div = document.createElement('div');
    div.className = `featured-admin-item ${item.isBestseller ? 'featured' : ''}`;
    div.setAttribute('data-id', item.id);
    
    div.innerHTML = `
        <img src="${item.src}" alt="${item.title}">
        <h4>${item.title}</h4>
        <p>${item.description}</p>
        <div class="featured-admin-controls">
            <div class="featured-toggle">
                <input type="checkbox" id="featured-${item.id}" ${item.isBestseller ? 'checked' : ''}>
                <label for="featured-${item.id}">Best Seller</label>
            </div>
            <div class="featured-sales">${item.sales} sales</div>
        </div>
    `;
    
    return div;
}

function setupFeaturedItemsEvents() {
    const updateBtn = document.getElementById('updateFeaturedItems');
    if (updateBtn) {
        updateBtn.addEventListener('click', updateFeaturedItems);
    }
    
    // Add event listeners to checkboxes
    document.addEventListener('change', function(e) {
        if (e.target.type === 'checkbox' && e.target.id.startsWith('featured-')) {
            const itemId = e.target.id.replace('featured-', '');
            const itemElement = document.querySelector(`[data-id="${itemId}"]`);
            
            if (e.target.checked) {
                itemElement.classList.add('featured');
            } else {
                itemElement.classList.remove('featured');
            }
        }
    });
}

function updateFeaturedItems() {
    // Get current featured items (checked checkboxes)
    const checkedBoxes = document.querySelectorAll('#featuredItemsGrid input[type="checkbox"]:checked');
    const featuredItems = Array.from(checkedBoxes).map(checkbox => {
        const itemId = checkbox.id.replace('featured-', '');
        const itemElement = document.querySelector(`[data-id="${itemId}"]`);
        const img = itemElement.querySelector('img');
        const title = itemElement.querySelector('h4').textContent;
        
        return {
            id: parseInt(itemId),
            src: img.src,
            title: title
        };
    });
    
    // Save to localStorage
    localStorage.setItem('featuredItems', JSON.stringify(featuredItems));
    
    showNotification('Featured items updated successfully!', 'success');
}

// Global functions for onclick handlers
window.removeCarouselImage = function(imageId) {
    const currentCarouselImages = JSON.parse(localStorage.getItem('carouselImages')) || [];
    const updatedImages = currentCarouselImages.filter(img => img.id !== imageId);
    
    localStorage.setItem('carouselImages', JSON.stringify(updatedImages));
    
    // Reload both sections
    loadCurrentCarouselImages();
    loadAvailableCarouselImages();
    
    showNotification('Image removed from carousel', 'success');
};

window.replaceCarouselImage = function(imageId) {
    // For now, just show a message - could implement file picker later
    showNotification('Replace functionality coming soon', 'info');
};

// Image management functions
window.editImage = function(imageId) {
    // Get the current images from localStorage
    const savedImages = JSON.parse(localStorage.getItem('galleryImages')) || [];
    const defaultImages = getDefaultImages();
    const allImages = [...savedImages, ...defaultImages];
    
    // Find the image to edit
    const imageToEdit = allImages.find(img => img.id == imageId);
    if (!imageToEdit) {
        showNotification('Image not found', 'error');
        return;
    }
    
    // Create edit modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Edit Image</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="edit-image-preview">
                    <img src="${imageToEdit.src}" alt="${imageToEdit.title}" style="max-width: 200px; max-height: 200px; object-fit: cover;">
                </div>
                <form id="editImageForm">
                    <div class="form-group">
                        <label for="editTitle">Title:</label>
                        <input type="text" id="editTitle" value="${imageToEdit.title || ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="editDescription">Description:</label>
                        <textarea id="editDescription" rows="3">${imageToEdit.description || ''}</textarea>
                    </div>
                    <div class="form-group">
                        <label for="editCategory">Category:</label>
                        <select id="editCategory" required>
                            <option value="clothing" ${imageToEdit.category === 'clothing' ? 'selected' : ''}>Clothing</option>
                            <option value="tote-bags" ${imageToEdit.category === 'tote-bags' ? 'selected' : ''}>Tote Bags</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="editBestseller" ${imageToEdit.isBestseller ? 'checked' : ''}>
                            Mark as Best Seller
                        </label>
                    </div>
                    <div class="form-group">
                        <label for="editSales">Sales Count:</label>
                        <input type="number" id="editSales" value="${imageToEdit.sales || 0}" min="0">
                    </div>
                    <div class="modal-actions">
                        <button type="button" class="btn btn-secondary" id="cancelEdit">Cancel</button>
                        <button type="submit" class="btn btn-primary">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle modal close
    const closeModal = () => {
        document.body.removeChild(modal);
    };
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('#cancelEdit').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Handle form submission
    document.getElementById('editImageForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const updatedImage = {
            ...imageToEdit,
            title: document.getElementById('editTitle').value.trim(),
            description: document.getElementById('editDescription').value.trim(),
            category: document.getElementById('editCategory').value,
            isBestseller: document.getElementById('editBestseller').checked,
            sales: parseInt(document.getElementById('editSales').value) || 0
        };
        
        // Update in localStorage
        const savedImages = JSON.parse(localStorage.getItem('galleryImages')) || [];
        const defaultImages = getDefaultImages();
        
        // Check if it's a default image or saved image
        const isDefaultImage = defaultImages.some(img => img.id == imageId);
        
        if (isDefaultImage) {
            // If it's a default image, add it to saved images with updates
            const existingIndex = savedImages.findIndex(img => img.id == imageId);
            if (existingIndex >= 0) {
                savedImages[existingIndex] = updatedImage;
            } else {
                savedImages.push(updatedImage);
            }
        } else {
            // If it's already a saved image, update it
            const existingIndex = savedImages.findIndex(img => img.id == imageId);
            if (existingIndex >= 0) {
                savedImages[existingIndex] = updatedImage;
            }
        }
        
        localStorage.setItem('galleryImages', JSON.stringify(savedImages));
        
        // Reload the image management
        loadImageManagement();
        
        closeModal();
        showNotification('Image updated successfully', 'success');
    });
};

window.deleteImage = async function(imageId) {
    if (!confirm('Are you sure you want to delete this image? This will remove it from Supabase Storage permanently.')) {
        return;
    }
    
    try {
        // Get the image details to find the filename
        const savedImages = JSON.parse(localStorage.getItem('galleryImages')) || [];
        const defaultImages = getDefaultImages();
        const allImages = [...savedImages, ...defaultImages];
        
        const imageToDelete = allImages.find(img => img.id == imageId);
        
        if (!imageToDelete) {
            showNotification('Image not found', 'error');
            return;
        }
        
        // Extract filename from Supabase URL
        const filename = imageToDelete.src.split('/').pop();
        
        // Delete from Supabase Storage
        try {
            if (window.supabaseStorage && window.supabaseStorage.deleteImage) {
                await window.supabaseStorage.deleteImage(filename);
                showNotification('Image deleted from Supabase Storage', 'success');
            } else {
                showNotification('Warning: Could not delete from Supabase Storage (client not available)', 'warning');
            }
        } catch (storageError) {
            showNotification('Warning: Failed to delete from Supabase Storage: ' + storageError.message, 'warning');
            // Continue with local deletion even if storage fails
        }
        
        // Remove from localStorage (for uploaded images)
        const updatedImages = savedImages.filter(img => img.id != imageId);
        localStorage.setItem('galleryImages', JSON.stringify(updatedImages));
        
        // Also remove from default images if it's a default image
        // We can't modify the default images array, but we can mark it as deleted in localStorage
        const deletedImages = JSON.parse(localStorage.getItem('deletedImages')) || [];
        if (!deletedImages.includes(imageId)) {
            deletedImages.push(imageId);
            localStorage.setItem('deletedImages', JSON.stringify(deletedImages));
        }
        
        // Reload image grid immediately
        loadImageManagement();
        
        // Refresh gallery and featured items on other pages
        if (typeof window.refreshGallery === 'function') {
            window.refreshGallery();
        }
        if (typeof window.refreshFeaturedItems === 'function') {
            window.refreshFeaturedItems();
        }
        
        showNotification('Image removed from gallery', 'success');
    } catch (error) {
        console.error('Error deleting image:', error);
        showNotification('Error deleting image: ' + error.message, 'error');
    }
};

function showNotification(message, type = 'info') {
    // Simple notification system
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : type === 'warning' ? '#ff9800' : '#2196F3'};
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        z-index: 1000;
        font-size: 14px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

function getDefaultImages() {
    // Get list of deleted image IDs
    const deletedImages = JSON.parse(localStorage.getItem('deletedImages')) || [];
    console.log('Deleted images:', deletedImages); // Debug log
    
    // Default images based on the files in the gallery folder
    const allDefaultImages = [
        // Original numbered images (PNG files)
        { id: 1, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/1.png', title: 'Hoodie Print Design', category: 'clothing' },
        { id: 2, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/2.png', title: 'Denim Jacket Print', category: 'clothing' },
        { id: 3, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/3.png', title: 'Sweatshirt Design', category: 'clothing' },
        { id: 4, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/4.png', title: 'Tank Top Print', category: 'clothing' },
        { id: 5, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/5.png', title: 'Long Sleeve Tee', category: 'clothing' },
        { id: 6, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/6.png', title: 'Crop Top Design', category: 'clothing' },
        { id: 7, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/7.png', title: 'Vintage Tee Design', category: 'clothing' },
        { id: 8, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/8.png', title: 'Graphic Tee Design', category: 'clothing' },
        { id: 10, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/10.png', title: 'Canvas Tote Bag', category: 'tote-bags' },
        { id: 11, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/11.png', title: 'Cotton Tote Bag', category: 'tote-bags' },
        { id: 13, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/13.png', title: 'Leather Tote Bag', category: 'tote-bags' },
        { id: 15, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/15.png', title: 'Eco Tote Bag', category: 'tote-bags' },
        
        // Custom print work images (JPEG files)
        { id: 4376, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4376.jpeg', title: 'Custom Print Work 1', category: 'clothing' },
        { id: 4377, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4377.jpeg', title: 'Custom Print Work 2', category: 'clothing' },
        { id: 4378, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4378.jpeg', title: 'Custom Print Work 3', category: 'clothing' },
        { id: 4379, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4379.jpeg', title: 'Custom Print Work 4', category: 'clothing' },
        { id: 4380, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4380.jpeg', title: 'Custom Print Work 5', category: 'clothing' },
        { id: 4381, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4381.jpeg', title: 'Custom Print Work 6', category: 'clothing' },
        { id: 4382, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4382.jpeg', title: 'Custom Print Work 7', category: 'clothing' },
        { id: 4383, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4383.jpeg', title: 'Custom Print Work 8', category: 'clothing' },
        { id: 4384, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4384.jpeg', title: 'Custom Print Work 9', category: 'clothing' },
        { id: 4385, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4385.jpeg', title: 'Custom Print Work 10', category: 'clothing' },
        { id: 4386, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4386.jpeg', title: 'Custom Print Work 11', category: 'clothing' },
        { id: 4387, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4387.jpeg', title: 'Custom Print Work 12', category: 'clothing' },
        { id: 4388, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4388.jpeg', title: 'Custom Print Work 13', category: 'clothing' },
        { id: 4389, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/IMG_4389.jpeg', title: 'Custom Print Work 14', category: 'clothing' }
    ];
    
    // Filter out deleted images
    const filteredImages = allDefaultImages.filter(img => !deletedImages.includes(img.id));
    console.log('Total default images:', allDefaultImages.length);
    console.log('Filtered images count:', filteredImages.length);
    console.log('Deleted images count:', deletedImages.length);
    return filteredImages;
}

function renderImageGrid(images) {
    const imageGrid = document.getElementById('imageGrid');
    if (!imageGrid) return;
    
    imageGrid.innerHTML = '';
    
    images.forEach(image => {
        const imageItem = createImageItem(image);
        imageGrid.appendChild(imageItem);
    });
}

function createImageItem(image) {
    const div = document.createElement('div');
    div.className = 'image-item';
    div.setAttribute('data-id', image.id);
    
    div.innerHTML = `
        <img src="${image.src}" alt="${image.title}" loading="lazy">
        <div class="image-info">
            <h4>${image.title}</h4>
            <p>${image.category}</p>
            <div class="image-actions">
                <button class="btn btn-sm btn-primary" onclick="editImage(${image.id})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteImage(${image.id})">Delete</button>
            </div>
        </div>
    `;
    
    return div;
}

function loadCurrentCarouselImages() {
    const carouselManager = document.getElementById('carouselImagesManager');
    if (!carouselManager) return;
    
    const savedCarouselImages = JSON.parse(localStorage.getItem('carouselImages')) || [
        { id: 2, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/2.png', title: 'Hoodie Print Design' },
        { id: 3, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/3.png', title: 'Denim Jacket Print' },
        { id: 4, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/4.png', title: 'Sweatshirt Design' },
        { id: 5, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/5.png', title: 'Tank Top Print' },
        { id: 6, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/6.png', title: 'Long Sleeve Tee' }
    ];
    
    carouselManager.innerHTML = '';
    
    savedCarouselImages.forEach((image, index) => {
        const imageItem = createCarouselManagerItem(image, index);
        carouselManager.appendChild(imageItem);
    });
}

function loadAvailableCarouselImages() {
    const availableImages = document.getElementById('availableCarouselImages');
    if (!availableImages) return;
    
    const allImages = getDefaultImages();
    const currentCarouselImages = JSON.parse(localStorage.getItem('carouselImages')) || [];
    const currentIds = currentCarouselImages.map(img => img.id);
    
    // Filter out images already in carousel
    const availableItems = allImages.filter(img => !currentIds.includes(img.id));
    
    availableImages.innerHTML = '';
    
    availableItems.forEach(image => {
        const imageItem = createAvailableImageItem(image);
        availableImages.appendChild(imageItem);
    });
}

function createCarouselManagerItem(image, index) {
    const div = document.createElement('div');
    div.className = 'carousel-image-item';
    div.setAttribute('data-id', image.id);
    div.setAttribute('draggable', 'true');
    
    div.innerHTML = `
        <img src="${image.src}" alt="${image.title}">
        <div class="image-controls">
            <button class="btn-remove" onclick="removeCarouselImage(${image.id})" title="Remove from carousel">×</button>
            <button class="btn-replace" onclick="replaceCarouselImage(${image.id})" title="Replace image">↻</button>
        </div>
        <div class="image-info">
            <span class="drag-handle">⋮⋮</span>
            <span class="image-title">${image.title}</span>
        </div>
    `;
    
    return div;
}

function createAvailableImageItem(image) {
    const div = document.createElement('div');
    div.className = 'available-image-item';
    div.setAttribute('data-id', image.id);
    
    div.innerHTML = `
        <img src="${image.src}" alt="${image.title}">
        <div class="add-indicator">+</div>
        <div class="image-info">
            <span class="image-title">${image.title}</span>
        </div>
    `;
    
    // Add click handler to add to carousel
    div.addEventListener('click', () => {
        addToCarousel(image);
    });
    
    return div;
}

function addToCarousel(image) {
    const currentCarouselImages = JSON.parse(localStorage.getItem('carouselImages')) || [];
    
    // Check if already in carousel
    if (currentCarouselImages.some(img => img.id === image.id)) {
        showNotification('Image already in carousel', 'warning');
        return;
    }
    
    // Add to carousel
    currentCarouselImages.push(image);
    localStorage.setItem('carouselImages', JSON.stringify(currentCarouselImages));
    
    // Reload both sections
    loadCurrentCarouselImages();
    loadAvailableCarouselImages();
    
    showNotification('Image added to carousel', 'success');
}

document.addEventListener('DOMContentLoaded', function() {
    // Debug log removed
    
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
    
    // Initialize basic functionality that doesn't require auth
    initBasicAdminFunctions();
    
    function initBasicAdminFunctions() {
        // Update image count display
        updateImageCount();
    }
    
    function updateImageCount() {
        const imageCountElement = document.getElementById('imageCount');
        if (imageCountElement) {
            // Try to get count from localStorage or show default
            const savedImages = JSON.parse(localStorage.getItem('galleryImages')) || [];
            const count = savedImages.length || 0;
            imageCountElement.textContent = `${count} images`;
        }
        
        // Add refresh button functionality
        const refreshBtn = document.getElementById('refreshImages');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                // Debug log removed
                updateImageCount();
                // Reload image grid if admin panel is initialized
                if (window.initAdminPanelAfterAuth && document.getElementById('imageGrid')) {
                    loadImageManagement();
                }
            });
        }
    }
    
    // Image Management (function is now defined globally above)
    
    // getDefaultImages function is now defined globally above
    
    // renderImageGrid and createImageItem functions are now defined globally above
    
    // Image upload functionality
    function setupImageUpload() {
        const uploadZone = document.getElementById('uploadZone');
        const imageUpload = document.getElementById('imageUpload');
        
        if (!uploadZone || !imageUpload) return;
        
        uploadZone.addEventListener('click', () => imageUpload.click());
        
        uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadZone.style.borderColor = 'var(--accent-green)';
            uploadZone.style.backgroundColor = 'rgba(45, 80, 22, 0.05)';
        });
        
        uploadZone.addEventListener('dragleave', () => {
            uploadZone.style.borderColor = 'var(--light-gray)';
            uploadZone.style.backgroundColor = 'white';
        });
        
        uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadZone.style.borderColor = 'var(--light-gray)';
            uploadZone.style.backgroundColor = 'white';
            
            const files = e.dataTransfer.files;
            handleImageUpload(files);
        });
        
        imageUpload.addEventListener('change', (e) => {
            const files = e.target.files;
            handleImageUpload(files);
        });
    }
    
    function handleImageUpload(files) {
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const newImage = {
                        id: Date.now(),
                        src: e.target.result,
                        title: file.name.replace(/\.[^/.]+$/, ""),
                        category: 'art'
                    };
                    
                    const existingImages = JSON.parse(localStorage.getItem('galleryImages')) || getDefaultImages();
                    existingImages.push(newImage);
                    localStorage.setItem('galleryImages', JSON.stringify(existingImages));
                    
                    renderImageGrid(existingImages);
                    showNotification('Image uploaded successfully!', 'success');
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Carousel Settings
    function loadCarouselSettings() {
        // Load saved settings from localStorage
        const duration = localStorage.getItem('carouselDuration') || '5';
        const autoplay = localStorage.getItem('carouselAutoplay') !== 'false';
        const indicators = localStorage.getItem('carouselIndicators') !== 'false';
        const controls = localStorage.getItem('carouselControls') !== 'false';
        
        document.getElementById('carouselDuration').value = duration;
        document.getElementById('carouselAutoplay').checked = autoplay;
        document.getElementById('carouselIndicators').checked = indicators;
        document.getElementById('carouselControls').checked = controls;
        
        // Load carousel images
        loadCarouselImages();
        
        // Add event listeners for settings changes
        document.getElementById('carouselDuration').addEventListener('change', (e) => {
            localStorage.setItem('carouselDuration', e.target.value);
        });
        
        document.getElementById('carouselAutoplay').addEventListener('change', (e) => {
            localStorage.setItem('carouselAutoplay', e.target.checked);
        });
        
        document.getElementById('carouselIndicators').addEventListener('change', (e) => {
            localStorage.setItem('carouselIndicators', e.target.checked);
        });
        
        document.getElementById('carouselControls').addEventListener('change', (e) => {
            localStorage.setItem('carouselControls', e.target.checked);
        });
    }
    
    function loadCarouselImages() {
        loadCurrentCarouselImages();
        loadAvailableCarouselImages();
    }
    
    // loadCurrentCarouselImages and loadAvailableCarouselImages functions are now defined globally above
    
    // createCarouselManagerItem, createAvailableImageItem, addToCarousel, removeCarouselImage, and replaceCarouselImage functions are now defined globally above
    
    // Content Management
    function loadContentManagement() {
        // Load saved content from localStorage
        const heroTitle = localStorage.getItem('heroTitle') || 'Crafted Printing for Unique Brands';
        const heroSubtitle = localStorage.getItem('heroSubtitle') || 'We create premium print materials that tell your story through exceptional craftsmanship and attention to detail.';
        const aboutTitle = localStorage.getItem('aboutTitle') || 'Why Parcel Print Co.';
        const aboutDescription = localStorage.getItem('aboutDescription') || 'We believe that exceptional print materials are more than just communication tools—they\'re tactile expressions of your brand\'s values and vision.';
        const contactEmail = localStorage.getItem('contactEmail') || 'hello@parcelprintco.com';
        const contactPhone = localStorage.getItem('contactPhone') || '(555) 123-4567';
        const contactAddress = localStorage.getItem('contactAddress') || '123 Craft Street\nArtisan District, NY 10001';
        
        document.getElementById('heroTitle').value = heroTitle;
        document.getElementById('heroSubtitle').value = heroSubtitle;
        document.getElementById('aboutTitle').value = aboutTitle;
        document.getElementById('aboutDescription').value = aboutDescription;
        document.getElementById('contactEmail').value = contactEmail;
        document.getElementById('contactPhone').value = contactPhone;
        document.getElementById('contactAddress').value = contactAddress;
        
        // Add save button event listener
        document.getElementById('saveContent').addEventListener('click', saveContent);
    }
    
    function saveContent() {
        const content = {
            heroTitle: document.getElementById('heroTitle').value,
            heroSubtitle: document.getElementById('heroSubtitle').value,
            aboutTitle: document.getElementById('aboutTitle').value,
            aboutDescription: document.getElementById('aboutDescription').value,
            contactEmail: document.getElementById('contactEmail').value,
            contactPhone: document.getElementById('contactPhone').value,
            contactAddress: document.getElementById('contactAddress').value
        };
        
        // Save to localStorage
        Object.keys(content).forEach(key => {
            localStorage.setItem(key, content[key]);
        });
        
        showNotification('Content saved successfully!', 'success');
    }
    
    // Global functions for image management
    window.updateImageTitle = function(imageId, newTitle) {
        const existingImages = JSON.parse(localStorage.getItem('galleryImages')) || getDefaultImages();
        const imageIndex = existingImages.findIndex(img => img.id === imageId);
        
        if (imageIndex !== -1) {
            existingImages[imageIndex].title = newTitle;
            localStorage.setItem('galleryImages', JSON.stringify(existingImages));
            showNotification('Image title updated!', 'success');
        }
    };
    
    window.removeImage = function(imageId) {
        if (confirm('Are you sure you want to remove this image?')) {
            const existingImages = JSON.parse(localStorage.getItem('galleryImages')) || getDefaultImages();
            const filteredImages = existingImages.filter(img => img.id !== imageId);
            localStorage.setItem('galleryImages', JSON.stringify(filteredImages));
            renderImageGrid(filteredImages);
            showNotification('Image removed!', 'success');
        }
    };
    
    window.removeCarouselImage = function(imageId) {
        if (confirm('Are you sure you want to remove this image from the carousel?')) {
            const existingImages = JSON.parse(localStorage.getItem('carouselImages')) || [];
            const filteredImages = existingImages.filter(img => img.id !== imageId);
            localStorage.setItem('carouselImages', JSON.stringify(filteredImages));
            loadCarouselImages();
            showNotification('Image removed from carousel!', 'success');
        }
    };
    
    // Utility functions
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
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
        
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
    
    // Debug log removed
    
    // Featured Items Management (moved inside DOMContentLoaded)
    function initFeaturedItemsManagement() {
        loadFeaturedItemsManagement();
        setupFeaturedItemsEvents();
    }

function loadFeaturedItemsManagement() {
    const featuredGrid = document.getElementById('featuredItemsGrid');
    if (!featuredGrid) return;
    
    // Load gallery data (this would come from the same source as gallery.js)
        const galleryData = [
            { id: 2, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/2.png', title: 'Hoodie Print Design', description: 'Custom hoodie with unique graphics', category: 'clothing', isBestseller: true, sales: 45 },
            { id: 3, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/3.png', title: 'Denim Jacket Print', description: 'Custom denim jacket with bold graphics', category: 'clothing', isBestseller: true, sales: 38 },
            { id: 4, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/4.png', title: 'Sweatshirt Design', description: 'Comfortable sweatshirt with custom artwork', category: 'clothing', isBestseller: false, sales: 22 },
            { id: 5, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/5.png', title: 'Tank Top Print', description: 'Summer tank top with vibrant design', category: 'clothing', isBestseller: true, sales: 52 },
            { id: 6, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/6.png', title: 'Long Sleeve Tee', description: 'Long sleeve t-shirt with detailed graphics', category: 'clothing', isBestseller: false, sales: 28 },
            { id: 7, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/7.png', title: 'Crop Top Design', description: 'Trendy crop top with unique print', category: 'clothing', isBestseller: true, sales: 41 },
            { id: 8, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/8.png', title: 'Vintage Tee Design', description: 'Retro-inspired t-shirt with vintage graphics', category: 'clothing', isBestseller: false, sales: 19 },
            { id: 10, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/10.png', title: 'Canvas Tote Bag', description: 'Durable canvas tote with custom artwork', category: 'tote-bags', isBestseller: true, sales: 67 },
            { id: 11, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/11.png', title: 'Cotton Tote Bag', description: 'Soft cotton tote with vibrant print design', category: 'tote-bags', isBestseller: true, sales: 43 },
            { id: 13, src: 'https://xxcugztoedvvvfuzkkld.supabase.co/storage/v1/object/public/gallery-images/13.png', title: 'Leather Tote Bag', description: 'Premium leather tote with vintage-inspired design', category: 'tote-bags', isBestseller: false, sales: 31 }
        ];
    
    featuredGrid.innerHTML = '';
    
    galleryData.forEach(item => {
        const featuredItem = createFeaturedAdminItem(item);
        featuredGrid.appendChild(featuredItem);
    });
}

function createFeaturedAdminItem(item) {
    const div = document.createElement('div');
    div.className = `featured-admin-item ${item.isBestseller ? 'featured' : ''}`;
    div.setAttribute('data-id', item.id);
    
    div.innerHTML = `
        <img src="${item.src}" alt="${item.title}">
        <h4>${item.title}</h4>
        <p>${item.description}</p>
        <div class="featured-admin-controls">
            <div class="featured-toggle">
                <input type="checkbox" id="featured-${item.id}" ${item.isBestseller ? 'checked' : ''}>
                <label for="featured-${item.id}">Best Seller</label>
            </div>
            <div class="featured-sales">${item.sales} sales</div>
        </div>
    `;
    
    return div;
}

function setupFeaturedItemsEvents() {
    const updateBtn = document.getElementById('updateFeaturedItems');
    if (updateBtn) {
        updateBtn.addEventListener('click', updateFeaturedItems);
    }
    
    // Add event listeners to checkboxes
    document.addEventListener('change', function(e) {
        if (e.target.type === 'checkbox' && e.target.id.startsWith('featured-')) {
            const itemId = e.target.id.replace('featured-', '');
            const itemElement = document.querySelector(`[data-id="${itemId}"]`);
            
            if (e.target.checked) {
                itemElement.classList.add('featured');
            } else {
                itemElement.classList.remove('featured');
            }
        }
    });
}

function updateFeaturedItems() {
    const featuredItems = [];
    const checkboxes = document.querySelectorAll('#featuredItemsGrid input[type="checkbox"]:checked');
    
    checkboxes.forEach(checkbox => {
        const itemId = checkbox.id.replace('featured-', '');
        const itemElement = document.querySelector(`[data-id="${itemId}"]`);
        const title = itemElement.querySelector('h4').textContent;
        const description = itemElement.querySelector('p').textContent;
        const salesText = itemElement.querySelector('.featured-sales').textContent;
        const sales = parseInt(salesText.match(/\d+/)[0]);
        
        featuredItems.push({
            id: parseInt(itemId),
            title: title,
            description: description,
            sales: sales
        });
    });
    
    // Sort by sales (descending)
    featuredItems.sort((a, b) => b.sales - a.sales);
    
    // Save to localStorage
    localStorage.setItem('featuredItems', JSON.stringify(featuredItems));
    
        // Show success message
        showNotification('Featured items updated successfully!', 'success');
        
        // Debug log removed
    }
    
}); // End of DOMContentLoaded
