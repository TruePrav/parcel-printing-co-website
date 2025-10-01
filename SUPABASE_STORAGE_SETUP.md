# Supabase Storage Setup Guide

## 🚀 **Why Supabase Storage for Images?**

- **Persistent**: Images never disappear (unlike Vercel static files)
- **Global CDN**: Fast loading worldwide
- **Secure**: Row Level Security (RLS) protection
- **Admin Uploads**: Direct upload from admin panel
- **Backup**: Automatic backups and versioning
- **Scalable**: Handles unlimited images

## 📋 **Setup Steps**

### 1. Create Storage Bucket

In your Supabase Dashboard:

1. Go to **Storage** → **Buckets**
2. Click **New Bucket**
3. Name: `gallery-images`
4. **Public**: ✅ (for website access)
5. **File size limit**: 50MB
6. **Allowed MIME types**: `image/*`

### 2. Upload Existing Images

**Option A: Supabase Dashboard**
1. Go to **Storage** → **gallery-images**
2. Upload all images from your `gallery/` folder
3. Keep same filenames: `1.png`, `2.png`, etc.

**Option B: Bulk Upload Script** (Recommended)
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref YOUR_PROJECT_REF

# Upload images (run from parcel folder)
supabase storage upload gallery-images gallery/1.png
supabase storage upload gallery-images gallery/2.png
# ... repeat for all images
```

### 3. Set Up Row Level Security (RLS)

**Enable RLS on Storage:**
```sql
-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Allow public read access to gallery-images bucket
CREATE POLICY "Public read access for gallery-images" ON storage.objects
FOR SELECT USING (bucket_id = 'gallery-images');

-- Allow authenticated users to upload to gallery-images
CREATE POLICY "Authenticated upload access for gallery-images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'gallery-images' AND 
  auth.role() = 'authenticated'
);

-- Allow authenticated users to update their uploads
CREATE POLICY "Authenticated update access for gallery-images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'gallery-images' AND 
  auth.role() = 'authenticated'
);

-- Allow authenticated users to delete their uploads
CREATE POLICY "Authenticated delete access for gallery-images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'gallery-images' AND 
  auth.role() = 'authenticated'
);
```

### 4. Update Image URLs

**Current**: `gallery/1.png`
**New**: `https://YOUR_PROJECT_REF.supabase.co/storage/v1/object/public/gallery-images/1.png`

### 5. Environment Variables

Add to your `.env.local` (for local development):
```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 🔧 **Admin Panel Integration**

### Image Upload Component
```javascript
// Upload new image to Supabase Storage
async function uploadImage(file) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from('gallery-images')
    .upload(filePath, file);

  if (error) throw error;
  return data;
}
```

### Get Public URL
```javascript
// Get public URL for image
function getImageUrl(path) {
  const { data } = supabase.storage
    .from('gallery-images')
    .getPublicUrl(path);
  return data.publicUrl;
}
```

## 📊 **Database Schema Updates**

### Add Images Table
```sql
-- Create images table to track metadata
CREATE TABLE gallery_images (
  id SERIAL PRIMARY KEY,
  filename TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  is_bestseller BOOLEAN DEFAULT FALSE,
  sales_count INTEGER DEFAULT 0,
  upload_date TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public read access for gallery_images" ON gallery_images
FOR SELECT USING (true);

-- Allow authenticated users to manage images
CREATE POLICY "Authenticated manage gallery_images" ON gallery_images
FOR ALL USING (auth.role() = 'authenticated');
```

## 🎯 **Migration Steps**

1. **Upload Images**: Move all images to Supabase Storage
2. **Update URLs**: Change all `gallery/` references to Supabase URLs
3. **Test Admin**: Verify upload/delete functionality
4. **Remove Gallery Folder**: Delete local `gallery/` folder
5. **Deploy**: Push to Vercel

## 🔒 **Security Benefits**

- **RLS Protection**: Only authorized users can upload/delete
- **Public Read**: Website visitors can view images
- **Admin Control**: Only authenticated admins can manage
- **Audit Trail**: Track all image changes

## 💰 **Cost Considerations**

- **Storage**: $0.025/GB/month (very affordable)
- **Bandwidth**: $0.09/GB (CDN included)
- **Requests**: 1M requests/month free

For a typical print shop: ~$5-10/month total cost.

## 🚀 **Next Steps**

1. Set up Supabase Storage bucket
2. Upload existing images
3. Update image URLs in code
4. Add admin upload functionality
5. Test and deploy

This approach gives you a professional, scalable, and secure image management system that will work perfectly with Vercel hosting!
