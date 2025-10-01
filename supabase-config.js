// Supabase Configuration (Built from environment variables)
const SUPABASE_CONFIG = {
    url: 'YOUR_SUPABASE_URL_HERE',
    anonKey: 'YOUR_SUPABASE_ANON_KEY_HERE',
    tables: {
        adminUsers: 'admin_users',
        adminSessions: 'admin_sessions'
    }
};

// ⚠️ WARNING: This file contains placeholder values!
// For production, use the build-with-env.js script to inject real values from .env.local

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SUPABASE_CONFIG;
} else {
    window.SUPABASE_CONFIG = SUPABASE_CONFIG;
}