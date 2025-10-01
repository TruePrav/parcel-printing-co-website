// Simple build script to inject environment variables
// Run with: node build-with-env.js

const fs = require('fs');
const path = require('path');

// Read environment variables
require('dotenv').config({ path: '../.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('❌ Missing environment variables in .env.local');
    console.error('Required: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY');
    process.exit(1);
}

// Create new supabase-config.js with env variables
const configContent = `// Supabase Configuration (Built from environment variables)
const SUPABASE_CONFIG = {
    url: '${SUPABASE_URL}',
    anonKey: '${SUPABASE_ANON_KEY}',
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
}`;

// Write the config file (in the same directory as this script)
fs.writeFileSync('./supabase-config.js', configContent);

console.log('✅ Built supabase-config.js from environment variables');
console.log('📁 You can now deploy your static files');
