#!/usr/bin/env python3
"""
Resize images in the engagement folder
"""

import os
from pathlib import Path
from PIL import Image

MAX_WIDTH = 1200
QUALITY = 85

def resize_image(image_path):
    """Resize a single image"""
    try:
        with Image.open(image_path) as img:
            orig_size = os.path.getsize(image_path) / 1024
            
            if img.width <= MAX_WIDTH:
                return orig_size, orig_size, False
            
            ratio = MAX_WIDTH / img.width
            new_height = int(img.height * ratio)
            img_resized = img.resize((MAX_WIDTH, new_height), Image.Resampling.LANCZOS)
            
            if img_resized.mode == 'RGBA':
                img_resized = img_resized.convert('RGB')
            
            img_resized.save(image_path, 'JPEG', quality=QUALITY, optimize=True)
            new_size = os.path.getsize(image_path) / 1024
            return orig_size, new_size, True
            
    except Exception as e:
        print(f"  ✗ Error processing {image_path.name}: {e}")
        return 0, 0, False

def process_engagement_folder():
    """Process all images in engagement subfolders"""
    engagement_dir = Path('images/engagement')
    
    if not engagement_dir.exists():
        print("⚠️  No engagement folder found")
        return
    
    total_processed = 0
    
    for img_path in engagement_dir.rglob('*'):
        if img_path.suffix.lower() in ['.jpg', '.jpeg', '.png']:
            if 'original_backup' in str(img_path):
                continue
                
            orig_size, new_size, resized = resize_image(img_path)
            
            if resized:
                reduction = ((orig_size - new_size) / orig_size * 100) if orig_size > 0 else 0
                print(f"  ✓ {img_path.relative_to('images/engagement')}: {orig_size:.1f}KB → {new_size:.1f}KB ({reduction:.1f}% reduction)")
                total_processed += 1
            else:
                print(f"  • {img_path.relative_to('images/engagement')}: Already optimized ({orig_size:.1f}KB)")
    
    print(f"\n✅ Processed {total_processed} images in engagement folder")

if __name__ == '__main__':
    print("🖼️  Resizing engagement folder images...")
    print()
    process_engagement_folder()


