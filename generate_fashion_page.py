#!/usr/bin/env python3
"""
Generate fashion.html with category cards and slideshow data
"""

from pathlib import Path

def get_fashion_categories():
    """Get all fashion category folders and their images"""
    fashion_dir = Path('images/fashion')
    categories = {}
    
    for category_folder in sorted(fashion_dir.iterdir()):
        if not category_folder.is_dir() or category_folder.name == 'original_backup':
            continue
        
        images = []
        main_photo = None
        
        for img in sorted(category_folder.glob('*.jpg')):
            img_path = str(img).replace('\\', '/')
            if 'main' in img.name.lower():
                main_photo = img_path
            else:
                images.append(img_path)
        
        if main_photo:
            all_images = [main_photo] + images
        else:
            all_images = images
            main_photo = images[0] if images else None
        
        if main_photo and all_images:
            categories[category_folder.name] = {
                'main': main_photo,
                'images': all_images
            }
    
    return categories

def generate_fashion_html():
    """Generate the fashion.html file"""
    categories = get_fashion_categories()
    
    # Generate category cards HTML
    cards_html = []
    for cat_name, cat_data in categories.items():
        cards_html.append(f'''      <!-- {cat_name} Category -->
      <div class="category-card" data-category="{cat_name.lower()}">
        <img src="{cat_data['main']}" alt="{cat_name}">
        <div class="category-overlay">
          <span class="category-name">{cat_name}</span>
        </div>
      </div>''')
    
    # Generate hidden image data
    hidden_data_html = []
    for cat_name, cat_data in categories.items():
        images_html = '\n'.join([f'      <img data-src="{img}">' for img in cat_data['images']])
        hidden_data_html.append(f'''    <div data-category="{cat_name.lower()}">
{images_html}
    </div>''')
    
    html_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fashion - ThreePinFork</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Minimal Navigation -->
  <nav class="minimal-nav">
    <div class="nav-wrapper">
      <a href="index.html" class="logo">ThreePinFork</a>
      <ul class="nav-menu">
        <li><a href="index.html">OVERVIEW</a></li>
        <li><a href="portraits.html">PORTRAITS</a></li>
        <li><a href="dance.html">DANCE</a></li>
        <li><a href="engagement.html">ENGAGEMENT</a></li>
        <li><a href="fashion.html" class="active">FASHION</a></li>
        <li><a href="models.html">MODELS</a></li>
        <li><a href="about.html">ABOUT</a></li>
        <li><a href="contact.html">CONTACT</a></li>
      </ul>
      <div class="menu-toggle">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </nav>

  <!-- Category Header -->
  <div class="category-header">
    <h1>FASHION</h1>
  </div>

  <!-- Fashion Categories Grid -->
  <main class="gallery-main">
    <div class="fashion-categories-grid">
{chr(10).join(cards_html)}
    </div>
  </main>

  <!-- Hidden image data for each category -->
  <div id="category-images" style="display: none;">
{chr(10).join(hidden_data_html)}
  </div>

  <!-- Modal for full-size images -->
  <div class="modal" id="imageModal">
    <span class="modal-close">&times;</span>
    <img class="modal-content" id="modalImage" src="" alt="">
    <div class="modal-nav">
      <button class="modal-prev">‹</button>
      <button class="modal-next">›</button>
    </div>
  </div>

  <script src="script.js"></script>
  <script src="fashion-slideshow.js"></script>
</body>
</html>'''
    
    with open('fashion.html', 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"✅ Generated fashion.html with {len(categories)} categories")
    for name in categories.keys():
        print(f"  - {name}")

if __name__ == '__main__':
    generate_fashion_html()

