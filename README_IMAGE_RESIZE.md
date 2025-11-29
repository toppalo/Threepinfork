# Image Resizer Script

## Quick Start

After you've added your full-sized photos to the `images/` folders, simply run:

```bash
python3 resize_images.py
```

That's it! The script will:
- ✅ Automatically resize images to max 1200px width (maintains aspect ratio)
- ✅ Optimize file size for web (85% quality)
- ✅ Convert PNG to JPEG if needed
- ✅ Backup original images before processing
- ✅ Show you the file size savings

## What It Does

1. **Checks for Pillow**: Installs it automatically if needed
2. **Processes all folders**: Portraits, Dance, Engagement, Fashion, Graduation
3. **Resizes images**: Keeps max width at 1200px (perfect for web)
4. **Optimizes quality**: Balances file size and image quality
5. **Creates backups**: Originals saved in `original_backup/` folders

## Configuration

You can edit `resize_images.py` to change:
- `MAX_WIDTH = 1200` - Maximum image width
- `QUALITY = 85` - JPEG quality (85 is optimal, lower = smaller files)

## Example Output

```
============================================================
🖼️  Image Resizer & Optimizer for threepinfork
============================================================

📁 Processing 12 image(s) in portraits/...
  ✓ portrait-01.jpg: 3456.2KB → 245.3KB (92.9% reduction)
  ✓ portrait-02.jpg: 4123.1KB → 312.5KB (92.4% reduction)
  ...

📊 Total: 34567.8KB → 2345.6KB (93.2% reduction)
💾 Originals backed up in: original_backup/
```

## Requirements

- Python 3 (already installed on your Mac)
- Pillow library (installed automatically)

## Need Different Settings?

Open `resize_images.py` and adjust:
- Lower `MAX_WIDTH` (e.g., 800) for smaller files
- Lower `QUALITY` (e.g., 75) for even smaller files
- Higher values for better quality but larger files

