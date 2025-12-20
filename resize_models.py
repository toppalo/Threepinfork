#!/usr/bin/env python3
"""
Resize images in the models folder
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
            # Get original size
            orig_size = os.path.getsize(image_path) / 1024  # KB
            
            # Skip if already small enough
            if img.width <= MAX_WIDTH:
                return orig_size, orig_size, False
            
            # Calculate new dimensions
            ratio = MAX_WIDTH / img.width
            new_height = int(img.height * ratio)
            
            # Resize
            img_resized = img.resize((MAX_WIDTH, new_height), Image.Resampling.LANCZOS)
            
            # Convert RGBA to RGB if necessary
            if img_resized.mode == 'RGBA':
                img_resized = img_resized.convert('RGB')
            
            # Save
            img_resized.save(image_path, 'JPEG', quality=QUALITY, optimize=True)
            
            new_size = os.path.getsize(image_path) / 1024  # KB
            return orig_size, new_size, True
            
    except Exception as e:
        print(f"  ✗ Error processing {image_path.name}: {e}")
        return 0, 0, False

def process_models_folder():
    """Process all images in models folder"""
    models_dir = Path('images/models')
    
    if not models_dir.exists():
        print("⚠️  No models folder found")
        return
    
    total_processed = 0
    
    # Find all image files recursively
    for img_path in models_dir.rglob('*'):
        if img_path.suffix.lower() in ['.jpg', '.jpeg', '.png']:
            if 'original_backup' in str(img_path):
                continue
                
            orig_size, new_size, resized = resize_image(img_path)
            
            if resized:
                reduction = ((orig_size - new_size) / orig_size * 100) if orig_size > 0 else 0
                print(f"  ✓ {img_path.relative_to('images/models')}: {orig_size:.1f}KB → {new_size:.1f}KB ({reduction:.1f}% reduction)")
                total_processed += 1
            else:
                print(f"  • {img_path.relative_to('images/models')}: Already optimized")
    
    print(f"\n✅ Processed {total_processed} images in models folder")

if __name__ == '__main__':
    print("🖼️  Resizing models folder images...")
    print()
    process_models_folder()

