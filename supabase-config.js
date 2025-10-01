// Supabase Configuration (Built from environment variables)
const SUPABASE_CONFIG = {
    url: 'https://xxcugztoedvvvfuzkkld.supabase.co',
    anonKey: 'sb_publishable_VJSOyeL0X95TE1X84Cdwdw_JTV689aD',
    tables: {
        adminUsers: 'admin_users',
        adminSessions: 'admin_sessions'
    }
};

console.log('Supabase config loaded from environment variables');

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SUPABASE_CONFIG;
} else {
    window.SUPABASE_CONFIG = SUPABASE_CONFIG;
}