#!/usr/bin/env python3
"""
Automatically update HTML files with actual image paths
"""

import os
from pathlib import Path
import re

def get_images_in_folder(folder_path):
    """Get all image files in a folder, sorted by name."""
    images = []
    for ext in ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG']:
        images.extend(list(Path(folder_path).glob(f'*{ext}')))
    # Filter out backup folder
    images = [img for img in images if 'original_backup' not in str(img)]
    return sorted(images)

def update_category_page(category_name, html_file):
    """Update a category page with actual images."""
    folder_path = Path('images') / category_name
    images = get_images_in_folder(folder_path)
    
    if not images:
        print(f"⚠️  No images found in {folder_path}")
        return False
    
    print(f"📁 Found {len(images)} images in {category_name}/")
    
    # Read HTML file
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the gallery container
    gallery_match = re.search(r'(<div class="gallery-container">)(.*?)(</div>\s*</main>)', content, re.DOTALL)
    
    if not gallery_match:
        print(f"⚠️  Could not find gallery container in {html_file}")
        return False
    
    # Build new gallery items HTML
    gallery_items = []
    for img_path in images:
        rel_path = str(img_path).replace('\\', '/')
        gallery_items.append(f'      <div class="gallery-item">\n        <img src="{rel_path}" alt="{category_name.capitalize()} Photography">\n      </div>')
    
    new_gallery_content = '\n'.join(gallery_items)
    
    # Replace the gallery content
    new_content = content[:gallery_match.start(2)] + '\n' + new_gallery_content + '\n    ' + content[gallery_match.end(2):]
    
    # Write updated content
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"  ✅ Updated {html_file} with {len(images)} images")
    return True

def update_about_page():
    """Update the about page with the about image."""
    about_images = get_images_in_folder(Path('images/about'))
    
    if not about_images:
        print("⚠️  No image found in about/")
        return False
    
    about_img = about_images[0]  # Use first image
    rel_path = str(about_img).replace('\\', '/')
    
    with open('about.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update the image src
    content = re.sub(
        r'src="https://via\.placeholder\.com/[^"]*"',
        f'src="{rel_path}"',
        content
    )
    
    with open('about.html', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"  ✅ Updated about.html with image: {rel_path}")
    return True

def update_overview_page():
    """Update the overview page with overview images or a mix from categories."""
    # First check if there's an overview folder
    overview_folder = Path('images/overview')
    all_images = []
    
    if overview_folder.exists():
        overview_images = get_images_in_folder(overview_folder)
        if overview_images:
            all_images = overview_images
            print(f"📁 Found {len(all_images)} images in overview/ folder")
    
    if not all_images:
        # Fallback to mix from categories
        categories = ['portraits', 'dance', 'engagement', 'fashion']
        for category in categories:
            images = get_images_in_folder(Path('images') / category)
            # Take up to 8 images from each category for overview
            all_images.extend(images[:8])
        print(f"📁 Using {len(all_images)} images from categories for overview")
    
    if not all_images:
        print("⚠️  No images found for overview page")
        return False
    
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the gallery container
    gallery_match = re.search(r'(<div class="gallery-container"[^>]*>)(.*?)(</div>\s*</main>)', content, re.DOTALL)
    
    if not gallery_match:
        print("⚠️  Could not find gallery container in index.html")
        return False
    
    # Build new gallery items HTML
    gallery_items = []
    for img_path in all_images:
        rel_path = str(img_path).replace('\\', '/')
        # Determine category from path or use 'overview'
        if 'overview' in str(img_path):
            category = 'overview'
        else:
            category = img_path.parent.name
        gallery_items.append(f'      <div class="gallery-item" data-category="{category}">\n        <img src="{rel_path}" alt="Photography">\n      </div>')
    
    new_gallery_content = '\n'.join(gallery_items)
    
    # Replace the gallery content
    new_content = content[:gallery_match.start(2)] + '\n' + new_gallery_content + '\n    ' + content[gallery_match.end(2):]
    
    # Write updated content
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"  ✅ Updated index.html with {len(all_images)} images")
    return True

def main():
    print("=" * 60)
    print("🖼️  HTML Image Updater for threepinfork")
    print("=" * 60)
    print()
    
    # Update category pages
    categories = {
        'portraits': 'portraits.html',
        'dance': 'dance.html',
        'engagement': 'engagement.html',
        'fashion': 'fashion.html',
    }
    
    for category, html_file in categories.items():
        update_category_page(category, html_file)
        print()
    
    # Update about page
    update_about_page()
    print()
    
    # Update overview page
    update_overview_page()
    print()
    
    print("=" * 60)
    print("✅ Done! All HTML files have been updated with your images.")
    print("=" * 60)

if __name__ == '__main__':
    main()

