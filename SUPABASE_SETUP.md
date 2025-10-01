# Supabase Admin Authentication Setup Guide

This guide will help you set up Supabase authentication for your Parcel Print Co. admin panel.

## 🚀 **Step 1: Create Supabase Project**

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Choose your organization and give it a name (e.g., "parcel-print-co")
3. Set a strong database password
4. Choose a region close to your users

## 🗄️ **Step 2: Enable Authentication**

1. In your Supabase dashboard, go to **Authentication > Settings**
2. Configure the following settings:

### Email Settings:
- ✅ **Enable email confirmations**: ON
- ✅ **Enable email change confirmations**: ON
- ✅ **Enable password resets**: ON

### Auth Providers:
- ✅ **Email**: Enabled (this is the default)
- 🔧 **Site URL**: Set to your website URL (e.g., `https://yourdomain.com`)
- 🔧 **Redirect URLs**: Add your admin URL (e.g., `https://yourdomain.com/admin.html`)

## 🗄️ **Step 3: Create Admin Users Table**

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy and paste the following SQL commands:

-- Create admin users table (much simpler now!)
CREATE TABLE admin_users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policy for admin users
CREATE POLICY "Admin users can view own profile" ON admin_users
    FOR ALL USING (auth.uid() = id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_admin_users_updated_at 
    BEFORE UPDATE ON admin_users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

3. Click **Run** to execute the commands

## 👤 **Step 4: Create Admin Users**

### Method 1: Using Supabase Dashboard (Recommended)

1. Go to **Authentication > Users** in your Supabase dashboard
2. Click **"Invite a user"** or **"Add user"**
3. Enter the admin email address
4. Click **"Send invitation"**
5. The user will receive an email to set their password
6. Once they've set their password, add them to the admin table:

```sql
-- Add the user to admin_users table (run this after they've created their account)
INSERT INTO admin_users (id, email, role, is_active) 
SELECT 
    au.id, 
    au.email, 
    'super_admin', 
    true
FROM auth.users au 
WHERE au.email = 'admin@yourdomain.com'
AND NOT EXISTS (
    SELECT 1 FROM admin_users WHERE email = 'admin@yourdomain.com'
);
```

### Method 2: Direct User Creation

1. Go to **Authentication > Users**
2. Click **"Add user"**
3. Enter email and a temporary password
4. The user can change their password later
5. Add them to admin table using the SQL above

## 🔧 **Step 5: Configure Your Website**

1. In your Supabase dashboard, go to **Settings > API**
2. Copy your **Project URL** and **anon/public key**
3. Edit `supabase-config.js` and replace the placeholder values:

```javascript
const SUPABASE_CONFIG = {
    url: 'https://your-project.supabase.co', // Your actual URL
    anonKey: 'your-actual-anon-key-here',   // Your actual key
    tables: {
        adminUsers: 'admin_users'
    }
};
```

## 🧪 **Step 6: Test the Authentication**

1. Open your website and navigate to `/admin.html`
2. You should see a login form
3. Enter your admin email and password
4. You should be redirected to the admin panel

## 🔒 **Security Features**

- **Supabase Auth**: Built-in secure authentication with industry standards
- **Email Verification**: Users must verify their email before accessing
- **Password Reset**: Secure password reset via email links
- **Session Management**: Automatic session timeout after 30 minutes of inactivity
- **Row Level Security**: Database policies protect admin data
- **JWT Tokens**: Secure token-based authentication
- **Access Control**: Only verified admin users can access the panel

## 🛠️ **Troubleshooting**

### Login Not Working?
- Check your email and password are correct
- Verify the admin user exists in the database
- Check browser console for error messages
- Ensure Supabase URL and keys are correct

### Database Errors?
- Make sure you ran all the SQL commands
- Check that tables were created successfully
- Verify RLS policies are enabled

### Session Issues?
- Clear browser localStorage and try again
- Check if session tokens are being stored
- Verify Supabase authentication is working

## 📱 **Admin Panel Features**

Once logged in, you'll have access to:
- **Image Management**: Upload and manage gallery images
- **Carousel Settings**: Configure homepage carousel
- **Content Management**: Edit website content
- **Session Management**: Automatic logout on inactivity

## 🔄 **Adding More Admin Users**

To add more admin users, repeat Step 3 with different email addresses. You can also create users with different roles:

- `admin`: Standard admin access
- `super_admin`: Full administrative privileges

## 📞 **Support**

If you need help with the setup, check:
- Supabase documentation: [docs.supabase.com](https://docs.supabase.com)
- Console errors in your browser
- Database logs in Supabase dashboard

---

**🎉 Congratulations!** Your admin panel is now secured with Supabase authentication!
