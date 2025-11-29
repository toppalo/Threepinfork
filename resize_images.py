#!/usr/bin/env python3
"""
Image Resizer and Optimizer for threepinfork
Automatically resizes and optimizes images for web use.
"""

import os
import sys
from pathlib import Path

# Check if Pillow is installed, if not, guide user to install it
try:
    from PIL import Image
except ImportError:
    print("Pillow is not installed. Installing it now...")
    os.system(f"{sys.executable} -m pip install Pillow --quiet")
    try:
        from PIL import Image
        print("✓ Pillow installed successfully!")
    except ImportError:
        print("❌ Failed to install Pillow. Please run: pip3 install Pillow")
        sys.exit(1)

# Configuration
MAX_WIDTH = 1200  # Maximum width for images (pixels)
QUALITY = 85  # JPEG quality (85 is a good balance)
SUPPORTED_FORMATS = ('.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG')

def resize_image(input_path, output_path, max_width=MAX_WIDTH, quality=QUALITY):
    """Resize and optimize an image."""
    try:
        with Image.open(input_path) as img:
            # Convert RGBA to RGB if necessary (removes transparency)
            if img.mode in ('RGBA', 'LA', 'P'):
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                background.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
                img = background
            elif img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Calculate new size maintaining aspect ratio
            width, height = img.size
            if width > max_width:
                ratio = max_width / width
                new_width = max_width
                new_height = int(height * ratio)
                img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            
            # Save optimized image
            output_path = str(output_path).replace('.png', '.jpg').replace('.PNG', '.jpg')
            img.save(output_path, 'JPEG', quality=quality, optimize=True)
            
            # Get file sizes
            original_size = os.path.getsize(input_path) / 1024  # KB
            new_size = os.path.getsize(output_path) / 1024  # KB
            reduction = ((original_size - new_size) / original_size) * 100
            
            return True, original_size, new_size, reduction
    except Exception as e:
        return False, 0, 0, 0, str(e)

def process_folder(folder_path, max_width=MAX_WIDTH):
    """Process all images in a folder."""
    folder = Path(folder_path)
    if not folder.exists():
        print(f"⚠️  Folder doesn't exist: {folder_path}")
        return
    
    images = [f for f in folder.iterdir() if f.suffix in SUPPORTED_FORMATS and f.is_file()]
    
    if not images:
        print(f"📁 No images found in: {folder_path}")
        return
    
    print(f"\n📁 Processing {len(images)} image(s) in {folder.name}/...")
    
    total_original = 0
    total_new = 0
    processed = 0
    
    for img_path in images:
        # Create backup folder
        backup_folder = folder / 'original_backup'
        backup_folder.mkdir(exist_ok=True)
        
        # Backup original
        backup_path = backup_folder / img_path.name
        if not backup_path.exists():
            import shutil
            shutil.copy2(img_path, backup_path)
        
        # Resize
        result = resize_image(img_path, img_path, max_width)
        
        if result[0]:
            processed += 1
            total_original += result[1]
            total_new += result[2]
            print(f"  ✓ {img_path.name}: {result[1]:.1f}KB → {result[2]:.1f}KB ({result[3]:.1f}% reduction)")
        else:
            print(f"  ✗ Failed to process {img_path.name}: {result[4] if len(result) > 4 else 'Unknown error'}")
    
    if processed > 0:
        total_reduction = ((total_original - total_new) / total_original) * 100
        print(f"\n  📊 Total: {total_original:.1f}KB → {total_new:.1f}KB ({total_reduction:.1f}% reduction)")
        print(f"  💾 Originals backed up in: {backup_folder}/")

def main():
    """Main function to process all image folders."""
    print("=" * 60)
    print("🖼️  Image Resizer & Optimizer for threepinfork")
    print("=" * 60)
    
    base_dir = Path(__file__).parent
    image_folders = [
        base_dir / 'images' / 'portraits',
        base_dir / 'images' / 'dance',
        base_dir / 'images' / 'engagement',
        base_dir / 'images' / 'fashion',
        base_dir / 'images' / 'about',
    ]
    
    # Check if images folder exists
    if not (base_dir / 'images').exists():
        print("\n⚠️  'images' folder doesn't exist yet.")
        print("   Please add your photos to the images/ folders first.")
        return
    
    print(f"\n📂 Working directory: {base_dir}")
    print(f"🎯 Target width: {MAX_WIDTH}px")
    print(f"💎 Quality: {QUALITY}%\n")
    
    for folder in image_folders:
        process_folder(folder)
    
    print("\n" + "=" * 60)
    print("✅ Done! All images have been resized and optimized.")
    print("=" * 60)
    print("\n💡 Tip: Original images are backed up in 'original_backup' folders")
    print("   You can delete them later if you're happy with the resized versions.\n")

if __name__ == '__main__':
    main()

