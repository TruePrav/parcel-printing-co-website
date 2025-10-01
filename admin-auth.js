// Admin Authentication with Supabase

// Test if admin.js has loaded
setTimeout(() => {
    // Check if admin functions are available
}, 100);

// Load configuration
const SUPABASE_URL = window.SUPABASE_CONFIG?.url || 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = window.SUPABASE_CONFIG?.anonKey || 'YOUR_SUPABASE_ANON_KEY';

// Initialize Supabase client
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Authentication state
let isAuthenticated = false;
let currentUser = null;

// DOM elements
const loginSection = document.getElementById('loginSection');
const adminContent = document.getElementById('adminContent');
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');
const loginError = document.getElementById('loginError');

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add security warning
    console.warn('⚠️ ADMIN ACCESS: This page is for authorized personnel only');
    
    checkAuthStatus();
    setupEventListeners();
});

// Check if user is already authenticated
async function checkAuthStatus() {
    const token = localStorage.getItem('admin_token');
    if (token) {
        try {
            // Verify token with Supabase
            const { data: { user }, error } = await supabaseClient.auth.getUser(token);
            
            if (error || !user) {
                localStorage.removeItem('admin_token');
                showLoginForm();
                return;
            }
            
            // Check if user is admin
            const { data: adminUser, error: adminError } = await supabaseClient
                .from('admin_users')
                .select('*')
                .eq('email', user.email)
                .single();
                
            if (adminError || !adminUser) {
                localStorage.removeItem('admin_token');
                showLoginForm();
                return;
            }
            
            // User is authenticated and is admin
            currentUser = user;
            isAuthenticated = true;
            showAdminPanel();
            
        } catch (error) {
            localStorage.removeItem('admin_token');
            showLoginForm();
        }
    } else {
        showLoginForm();
    }
}

// Set up event listeners
function setupEventListeners() {
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            handleLogin(e);
        });
        
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                handleLogin(e);
            });
        }
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}

// Handle login
async function handleLogin(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    const email = document.getElementById('adminEmail').value.trim();
    const password = document.getElementById('adminPassword').value;
    
    if (!email || !password) {
        showError('Please enter both email and password');
        return;
    }
    
    showError(''); // Clear any previous errors
    
    try {
        // Authenticate with Supabase
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });
        
        if (error) {
            showError('Invalid email or password');
            return;
        }
        
        if (data.user) {
            // Check if user is admin
            const { data: adminUser, error: adminError } = await supabaseClient
                .from('admin_users')
                .select('*')
                .eq('email', data.user.email)
                .single();
            
            if (adminError || !adminUser) {
                // Sign out the user if they're not an admin
                await supabaseClient.auth.signOut();
                showError('Access denied. Admin privileges required.');
                return;
            }
            
            // User is authenticated and is admin
            currentUser = data.user;
            isAuthenticated = true;
            
            // Store authentication token
            localStorage.setItem('admin_token', data.session.access_token);
            
            showAdminPanel();
            showError(''); // Clear any errors
            
        } else {
            showError('Login failed. Please try again.');
        }
        
    } catch (error) {
        showError('An error occurred. Please try again.');
    }
}

// Handle logout
async function handleLogout() {
    try {
        await supabaseClient.auth.signOut();
    } catch (error) {
        // Ignore logout errors
    }
    
    localStorage.removeItem('admin_token');
    currentUser = null;
    isAuthenticated = false;
    showLoginForm();
}

// Show login form
function showLoginForm() {
    if (loginSection) loginSection.style.display = 'block';
    if (adminContent) adminContent.style.display = 'none';
    isAuthenticated = false;
}

// Show admin panel
function showAdminPanel() {
    if (loginSection) loginSection.style.display = 'none';
    if (adminContent) adminContent.style.display = 'block';
    
    // Try to initialize admin panel
    if (window.initAdminPanelAfterAuth) {
        window.initAdminPanelAfterAuth();
    } else {
        // Retry after a short delay
        setTimeout(() => {
            if (window.initAdminPanelAfterAuth) {
                window.initAdminPanelAfterAuth();
            } else {
                // Fallback: initialize basic admin panel
                initAdminPanelDirectly();
            }
        }, 100);
    }
}

// Fallback admin panel initialization
function initAdminPanelDirectly() {
    // Check if admin panel structure exists
    const existingTabs = document.querySelector('.admin-tabs');
    
    if (existingTabs) {
        setupAdminTabs();
        loadAdminImages();
    } else {
        // Create basic admin panel structure if it doesn't exist
        const adminContent = document.getElementById('adminContent');
        if (adminContent) {
            adminContent.innerHTML = `
                <div class="admin-header">
                    <h2>Admin Panel</h2>
                    <button id="logoutBtn" class="btn btn-secondary">Logout</button>
                </div>
                <div class="admin-tabs">
                    <button class="tab-btn active" data-tab="images">Image Management</button>
                    <button class="tab-btn" data-tab="carousel">Carousel Settings</button>
                    <button class="tab-btn" data-tab="content">Content Management</button>
                    <button class="tab-btn" data-tab="featured">Featured Items</button>
                </div>
                <div class="admin-content">
                    <div id="imagesTab" class="tab-content active">
                        <h3>Image Management</h3>
                        <div id="imageGrid" class="image-grid">
                            <!-- Images will be loaded here -->
                        </div>
                    </div>
                    <div id="carouselTab" class="tab-content">
                        <h3>Carousel Settings</h3>
                        <p>Carousel management coming soon...</p>
                    </div>
                    <div id="contentTab" class="tab-content">
                        <h3>Content Management</h3>
                        <p>Content management coming soon...</p>
                    </div>
                    <div id="featuredTab" class="tab-content">
                        <h3>Featured Items Management</h3>
                        <p>Featured items management coming soon...</p>
                    </div>
                </div>
            `;
            
            // Set up the newly created structure
            setupAdminTabs();
            loadAdminImages();
            
            // Re-attach logout button
            const newLogoutBtn = document.getElementById('logoutBtn');
            if (newLogoutBtn) {
                newLogoutBtn.addEventListener('click', handleLogout);
            }
        }
    }
}

// Set up admin tabs
function setupAdminTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            btn.classList.add('active');
            const targetContent = document.getElementById(targetTab + 'Tab');
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Load admin images
async function loadAdminImages() {
    const imageGrid = document.getElementById('imageGrid');
    if (!imageGrid) {
        return;
    }
    
    // Load images from Supabase Storage
    try {
        const { data: files, error } = await supabaseClient.storage
            .from('gallery-images')
            .list('', {
                limit: 100,
                offset: 0,
            });
            
        if (error) {
            console.error('Error loading images:', error);
            return;
        }
        
        imageGrid.innerHTML = '';
        
        files.forEach(file => {
            const imageUrl = supabaseClient.storage
                .from('gallery-images')
                .getPublicUrl(file.name);
                
            const imageItem = document.createElement('div');
            imageItem.className = 'image-item';
            imageItem.innerHTML = `
                <img src="${imageUrl.data.publicUrl}" alt="${file.name}">
                <div class="image-info">
                    <h4>${file.name}</h4>
                    <p>${file.metadata?.mimetype || 'Image'}</p>
                </div>
                <div class="image-actions">
                    <button class="btn btn-primary" onclick="editImage('${file.name}')">Edit</button>
                    <button class="btn btn-danger" onclick="deleteImage('${file.name}')">Delete</button>
                </div>
            `;
            
            imageGrid.appendChild(imageItem);
        });
        
    } catch (error) {
        console.error('Error loading admin images:', error);
    }
    
    // Initialize existing admin functionality here
    // Admin panel loaded for user
}

// Show error message
function showError(message) {
    if (loginError) {
        loginError.textContent = message;
        loginError.style.display = message ? 'block' : 'none';
    }
}

// Admin authentication system loaded
