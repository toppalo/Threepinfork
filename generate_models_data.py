#!/usr/bin/env python3
"""
Generate model data JavaScript file for the models page
"""

import os
import re
from pathlib import Path
from collections import defaultdict

def extract_model_name(filename):
    """Extract model name from filename"""
    name = filename.replace('.jpg', '').replace('.JPG', '').replace('.jpeg', '').replace('.png', '')
    
    patterns = [
        r'^([^\(]+)\s*\(',  # "Anna (1 of 5)"
        r'^([^\d]+?)\s+\d+',  # "Anna 1 of 5"
        r'^(.+?)(?:\s+copy|\s+best|\s+\(1 of|$)',  # "Anna copy" or "Anna best"
    ]
    
    for pattern in patterns:
        match = re.match(pattern, name)
        if match:
            model_name = match.group(1).strip()
            model_name = re.sub(r'\s+$', '', model_name)
            return model_name
    
    return name.strip()

def get_all_images():
    """Get all images from all category folders"""
    categories = ['portraits', 'fashion', 'dance', 'engagement']
    all_images = []
    
    for category in categories:
        folder = Path(f'images/{category}')
        if folder.exists():
            for ext in ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG']:
                images = list(folder.glob(f'*{ext}'))
                # Filter out backup folder
                images = [img for img in images if 'original_backup' not in str(img)]
                all_images.extend(images)
    
    return all_images

def get_model_portrait(model_images):
    """Get the best image to use as model portrait (prefer first of series)"""
    # Sort to find the first in series
    for img in model_images:
        filename = img['filename']
        # Look for pattern like "(1 of" or " (1)" or just try first sorted
        if '(1 of' in filename or ' (1)' in filename or filename.startswith('('):
            return img['path']
    # Return first image (sorted by filename)
    return model_images[0]['path'] if model_images else None

def generate_model_data():
    """Generate JavaScript model data"""
    images = get_all_images()
    models = defaultdict(list)
    
    for img_path in images:
        filename = img_path.name
        model_name = extract_model_name(filename)
        
        if model_name and len(model_name) > 1:
            rel_path = str(img_path).replace('\\', '/')
            models[model_name].append({
                'path': rel_path,
                'filename': filename,
                'category': img_path.parent.name
            })
    
    # Sort models by name, then sort their images
    sorted_models = sorted(models.items(), key=lambda x: x[0].lower())
    
    # Generate JavaScript
    js_lines = ["const modelData = {"]
    
    for model_name, model_images in sorted_models:
        # Sort images by filename
        model_images.sort(key=lambda x: x['filename'])
        portrait = get_model_portrait(model_images)
        
        js_lines.append(f"  '{model_name}': {{")
        js_lines.append(f"    portrait: '{portrait}',")
        js_lines.append(f"    images: [")
        for img in model_images:
            js_lines.append(f"      '{img['path']}',")
        js_lines.append(f"    ]")
        js_lines.append(f"  }},")
    
    js_lines.append("};")
    
    return '\n'.join(js_lines)

if __name__ == '__main__':
    js_code = generate_model_data()
    with open('models-data.js', 'w', encoding='utf-8') as f:
        f.write(js_code)
    print("✅ Generated models-data.js")
    model_count = len([line for line in js_code.split('\n') if "': {" in line])
    print(f"📊 Found {model_count} models")

