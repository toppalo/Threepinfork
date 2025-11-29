# Photo Upload Guide for threepinfork

## Recommended Photo Organization

### Folder Structure
Create the following folder structure in your project:

```
ThreePinfork/
├── images/
│   ├── portraits/
│   ├── dance/
│   ├── engagement/
│   └── fashion/
├── index.html
├── portraits.html
├── dance.html
├── engagement.html
├── fashion.html
└── ...
```

### How Many Photos Should You Add?

**Recommended per category:**
- **Minimum**: 6-9 photos per category (looks professional)
- **Optimal**: 12-20 photos per category (balanced, not overwhelming)
- **Maximum**: No strict limit, but 30-50 per category is reasonable
- **Overview page**: 20-30 photos showcasing all categories

**Why these numbers?**
- Too few (<6): Looks incomplete
- Too many (>50): Slower loading, harder to curate
- Sweet spot (12-20): Professional, focused, fast loading

### Image Specifications

**File Format:**
- Use **JPEG (.jpg)** for photos (best compression)
- Use **WebP** if you want better compression (optional)

**Image Dimensions:**
- **Width**: 800-1200px (optimal for web)
- **Height**: Varies naturally (portrait/landscape)
- The masonry layout handles varying heights beautifully

**File Size:**
- **Recommended**: 200-500 KB per image (fast loading)
- **Maximum**: 1 MB per image
- Compress images before uploading using tools like:
  - [TinyPNG](https://tinypng.com/) or [Squoosh](https://squoosh.app/)
  - Photoshop "Save for Web"
  - ImageOptim (Mac)

**Naming Convention:**
- Use descriptive names: `portrait-01.jpg`, `dance-02.jpg`, etc.
- Or use meaningful names: `portrait-woman-studio.jpg`
- Avoid spaces, use hyphens or underscores

## Upload Process

### Method 1: Direct File Upload (GitHub)

1. **Create the images folder:**
   ```bash
   mkdir -p images/portraits images/dance images/engagement images/fashion
   ```

2. **Add your photos to the appropriate folders:**
   - Drag and drop photos into each category folder

3. **Update HTML files:**
   - Open each category's HTML file (e.g., `portraits.html`)
   - Find the placeholder images like:
     ```html
     <img src="https://via.placeholder.com/800x1200/667eea/ffffff?text=Portrait+1" alt="Portrait Photography">
     ```
   - Replace with:
     ```html
     <img src="images/portraits/portrait-01.jpg" alt="Portrait Photography">
     ```

4. **For the Overview page:**
   - Mix photos from all categories
   - Update `index.html` with a selection from each category

### Method 2: Using Git Command Line

1. **Navigate to your project:**
   ```bash
   cd /Users/toppalo/ThreePinfork
   ```

2. **Create image folders:**
   ```bash
   mkdir -p images/{portraits,dance,engagement,fashion}
   ```

3. **Copy your photos:**
   - Copy photos from your computer into the appropriate folders
   - Example: `cp ~/Desktop/portrait-photos/*.jpg images/portraits/`

4. **Add and commit:**
   ```bash
   git add images/
   git commit -m "Add photography images"
   git push
   ```

### Method 3: Batch Update Script (I can create this for you)

If you have many photos, I can create a simple script to automatically update all the HTML files based on your image files.

## Quick Start Example

Let's say you have 10 portrait photos:

1. **Place them in the folder:**
   ```
   images/portraits/
   ├── portrait-01.jpg
   ├── portrait-02.jpg
   ├── portrait-03.jpg
   └── ... (portrait-10.jpg)
   ```

2. **Update `portraits.html`:**
   Replace the gallery items:
   ```html
   <div class="gallery-item">
     <img src="images/portraits/portrait-01.jpg" alt="Portrait Photography">
   </div>
   <div class="gallery-item">
     <img src="images/portraits/portrait-02.jpg" alt="Portrait Photography">
   </div>
   <!-- ... and so on -->
   ```

## Tips for Best Results

1. **Curate Your Work**: Only add your best photos - quality over quantity
2. **Mix Orientations**: The masonry layout looks great with portrait, landscape, and square images
3. **Consistent Quality**: Ensure all photos are properly edited and color-corrected
4. **Alt Text**: Update alt text for better SEO and accessibility
5. **Loading Speed**: Compress images before uploading to keep the site fast

## Need Help?

If you'd like me to:
- Create a script to automatically add your images
- Help organize a specific number of photos
- Optimize images for web
- Set up a different folder structure

Just let me know!

