// Supabase Storage Helper Functions
// This file handles all image storage operations

const STORAGE_BUCKET = 'gallery-images';

// Initialize Supabase Storage client (will be set after supabase client is created)
let supabaseStorage = null;

// Function to initialize storage client
function initializeStorage() {
    if (typeof window.supabaseClient !== 'undefined' && window.supabaseClient) {
        supabaseStorage = window.supabaseClient.storage.from(STORAGE_BUCKET);
        return true;
    }
    return false;
}

// Try to initialize immediately
initializeStorage();

/**
 * Upload an image to Supabase Storage
 * @param {File} file - The image file to upload
 * @param {string} customName - Optional custom filename
 * @returns {Promise<Object>} Upload result with path and public URL
 */
async function uploadImage(file, customName = null) {
    try {
        // Ensure storage client is initialized
        if (!supabaseStorage && !initializeStorage()) {
            throw new Error('Supabase Storage client not available');
        }
        
        // Generate filename if not provided
        const fileExt = file.name.split('.').pop();
        const fileName = customName || `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
        
        // Upload file
        const { data, error } = await supabaseStorage.upload(fileName, file);
        
        if (error) {
            console.error('Upload error:', error);
            throw error;
        }
        
        // Get public URL
        const publicUrl = getImageUrl(data.path);
        
        return {
            path: data.path,
            url: publicUrl,
            filename: fileName
        };
    } catch (error) {
        console.error('Image upload failed:', error);
        throw error;
    }
}

/**
 * Get public URL for an image
 * @param {string} path - The file path in storage
 * @returns {string} Public URL
 */
function getImageUrl(path) {
    const { data } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(path);
    return data.publicUrl;
}

/**
 * Delete an image from Supabase Storage
 * @param {string} path - The file path in storage
 * @returns {Promise<Object>} Delete result
 */
async function deleteImage(path) {
    try {
        // Ensure storage client is initialized
        if (!supabaseStorage && !initializeStorage()) {
            throw new Error('Supabase Storage client not available');
        }
        
        const { data, error } = await supabaseStorage.remove([path]);
        
        if (error) {
            console.error('Delete error:', error);
            throw error;
        }
        
        return data;
    } catch (error) {
        console.error('Image delete failed:', error);
        throw error;
    }
}

/**
 * List all images in the storage bucket
 * @returns {Promise<Array>} Array of image objects
 */
async function listImages() {
    try {
        const { data, error } = await supabaseStorage.list();
        
        if (error) {
            console.error('List error:', error);
            throw error;
        }
        
        // Filter for image files only
        const imageFiles = data.filter(file => 
            file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)
        );
        
        // Add public URLs
        const imagesWithUrls = imageFiles.map(file => ({
            name: file.name,
            path: file.name,
            url: getImageUrl(file.name),
            size: file.metadata?.size || 0,
            updated: file.updated_at
        }));
        
        return imagesWithUrls;
    } catch (error) {
        console.error('List images failed:', error);
        throw error;
    }
}

/**
 * Update image metadata in database
 * @param {Object} imageData - Image metadata
 * @returns {Promise<Object>} Database result
 */
async function updateImageMetadata(imageData) {
    try {
        const { data, error } = await supabase
            .from('gallery_images')
            .upsert(imageData, { onConflict: 'filename' })
            .select();
        
        if (error) {
            console.error('Metadata update error:', error);
            throw error;
        }
        
        return data;
    } catch (error) {
        console.error('Update metadata failed:', error);
        throw error;
    }
}

/**
 * Get all images with metadata from database
 * @returns {Promise<Array>} Array of images with metadata
 */
async function getImagesWithMetadata() {
    try {
        const { data, error } = await supabase
            .from('gallery_images')
            .select('*')
            .order('upload_date', { ascending: false });
        
        if (error) {
            console.error('Get images error:', error);
            throw error;
        }
        
        // Add full URLs to each image
        const imagesWithUrls = data.map(image => ({
            ...image,
            url: getImageUrl(image.filename)
        }));
        
        return imagesWithUrls;
    } catch (error) {
        console.error('Get images with metadata failed:', error);
        throw error;
    }
}

/**
 * Migrate local gallery images to Supabase Storage
 * This function helps migrate existing local images
 */
async function migrateLocalImages() {
    const localImages = [
        { filename: '1.png', title: 'Premium Print Work 1', category: 'clothing' },
        { filename: '2.png', title: 'Hoodie Print Design', category: 'clothing' },
        { filename: '3.png', title: 'Denim Jacket Print', category: 'clothing' },
        { filename: '4.png', title: 'Sweatshirt Design', category: 'clothing' },
        { filename: '5.png', title: 'Tank Top Print', category: 'clothing' },
        { filename: '6.png', title: 'Long Sleeve Tee', category: 'clothing' },
        { filename: '7.png', title: 'Crop Top Design', category: 'clothing' },
        { filename: '8.png', title: 'Vintage Tee Design', category: 'clothing' },
        { filename: '9.png', title: 'Additional Design 9', category: 'clothing' },
        { filename: '10.png', title: 'Canvas Tote Bag', category: 'tote-bags' },
        { filename: '11.png', title: 'Cotton Tote Bag', category: 'tote-bags' },
        { filename: '12.png', title: 'Additional Design 12', category: 'clothing' },
        { filename: '13.png', title: 'Leather Tote Bag', category: 'tote-bags' },
        { filename: '14.png', title: 'Additional Design 14', category: 'clothing' },
        { filename: '15.png', title: 'Additional Design 15', category: 'clothing' },
        { filename: 'main-header.png', title: 'Main Header Image', category: 'marketing' },
        { filename: 'workshop.png', title: 'Workshop Image', category: 'about' }
    ];
    
    // Starting migration of local images to Supabase Storage
    
    for (const image of localImages) {
        try {
            // Add metadata to database
            await updateImageMetadata({
                filename: image.filename,
                title: image.title,
                category: image.category,
                is_bestseller: ['2', '3', '5', '7', '10', '11'].includes(image.filename.split('.')[0]),
                sales_count: Math.floor(Math.random() * 100) + 10
            });
            
            // Migrated image
        } catch (error) {
            console.error(`❌ Failed to migrate ${image.filename}:`, error);
        }
    }
    
    // Migration completed
}

// Export functions for use in other files
window.supabaseStorage = {
    uploadImage,
    deleteImage,
    listImages,
    getImageUrl,
    updateImageMetadata,
    getImagesWithMetadata,
    migrateLocalImages
};

// Supabase Storage helper loaded
