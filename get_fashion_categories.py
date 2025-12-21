#!/usr/bin/env python3
"""
Generate category data for fashion page
"""

from pathlib import Path
import json

def get_fashion_categories():
    """Get all fashion category folders and their images"""
    fashion_dir = Path('images/fashion')
    categories = {}
    
    for category_folder in sorted(fashion_dir.iterdir()):
        if not category_folder.is_dir() or category_folder.name == 'original_backup':
            continue
        
        # Find all images
        images = []
        main_photo = None
        
        for img in sorted(category_folder.glob('*.jpg')):
            img_path = str(img).replace('\\', '/')
            if 'main' in img.name.lower():
                main_photo = img_path
            else:
                images.append(img_path)
        
        if main_photo:
            # Main photo should be first in the list
            all_images = [main_photo] + images
        else:
            all_images = images
            main_photo = images[0] if images else None
        
        if main_photo and all_images:
            categories[category_folder.name] = {
                'main': main_photo,
                'images': all_images,
                'count': len(all_images)
            }
    
    return categories

if __name__ == '__main__':
    categories = get_fashion_categories()
    
    print("Fashion Categories:")
    print("=" * 60)
    for name, data in categories.items():
        print(f"{name}: {data['count']} photos")
        print(f"  Main: {data['main']}")
        print()

