#!/usr/bin/env python3
"""
Generate index.html (overview page) with all overview images in order
No hover effects, just clean gallery that opens slideshow
"""

from pathlib import Path
import re

def natural_sort_key(filename):
    """Sort filenames naturally (handling numbers properly)"""
    def try_int(s):
        try:
            return int(s)
        except ValueError:
            return s.lower()
    return [try_int(c) for c in re.split('([0-9]+)', filename)]

def generate_overview_page():
    """Generate the index.html file with overview images"""
    overview_dir = Path('images/overview')
    
    if not overview_dir.exists():
        print("⚠️  No overview folder found")
        return
    
    # Get all jpg images and sort them naturally by filename
    images = sorted([img for img in overview_dir.glob('*.jpg')], key=lambda x: natural_sort_key(x.name))
    
    # Generate gallery items HTML
    gallery_items = []
    for img in images:
        img_path = str(img).replace('\\', '/')
        gallery_items.append(f'''      <div class="gallery-item">
        <img src="{img_path}" alt="Photography">
      </div>''')
    
    # Generate hidden image data for slideshow
    hidden_images = '\n'.join([f'    <img data-src="{str(img).replace(chr(92), "/")}">' for img in images])
    
    html_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ThreePinFork</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Minimal Navigation -->
  <nav class="minimal-nav">
    <div class="nav-wrapper">
      <a href="index.html" class="logo">ThreePinFork</a>
      <ul class="nav-menu">
        <li><a href="index.html" class="active">OVERVIEW</a></li>
        <li><a href="portraits.html">PORTRAITS</a></li>
        <li><a href="dance.html">DANCE</a></li>
        <li><a href="engagement.html">ENGAGEMENT</a></li>
        <li><a href="fashion.html">FASHION</a></li>
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

  <!-- Main Gallery -->
  <main class="gallery-main">
    <div class="gallery-container" id="gallery">
{chr(10).join(gallery_items)}
    </div>
  </main>

  <!-- Hidden image data for slideshow -->
  <div id="overview-images" style="display: none;">
{hidden_images}
  </div>

  <!-- Modal for full-size images -->
  <div class="modal" id="imageModal">
    <span class="modal-close">&times;</span>
    <img class="modal-content" id="modalImage" src="" alt="">
    <div class="modal-nav">
      <button class="modal-prev">‹</button>
      <button class="modal-next">›</button>
    </div>
    <!-- Thumbnail strip -->
    <div class="modal-thumbnails" id="modalThumbnails"></div>
  </div>

  <script src="script.js"></script>
  <script src="overview-slideshow.js"></script>
</body>
</html>'''
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"✅ Generated index.html with {len(images)} overview images")

if __name__ == '__main__':
    generate_overview_page()


