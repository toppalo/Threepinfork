# Models Page Setup Guide

## Folder Structure

Create an `images/models/` folder and organize each model in their own subfolder:

```
images/
  models/
    Anna/
      portrait.jpg          (main photo - will be shown on models page)
      photo1.jpg
      photo2.jpg
      photo3.jpg
      ...
    Sarah/
      main-photo.jpg        (main photo)
      img1.jpg
      img2.jpg
      ...
```

## How It Works

1. **Models Page** (`models.html`): Shows a gallery of model portraits (one photo per model)
   - The **first image** in each model's folder is used as the portrait/main photo
   - This portrait appears on the models page grid

2. **Clicking a Model**: When you click on a model's portrait, it opens a modal showing all photos from that model's folder
   - You can navigate through all photos using arrow keys or navigation buttons
   - ESC to close

3. **Updating the Page**: After adding photos to model folders, run:
   ```bash
   python3 update_html_images.py
   ```
   This will automatically update the models page with new portraits and prepare all images for the modal galleries.

## Adding a New Model

1. Create a new folder in `images/models/` with the model's name (e.g., `images/models/John/`)
2. Add photos to that folder
3. Make sure the first photo (alphabetically) is the one you want as the portrait
4. Run `python3 update_html_images.py` to update the page

## Notes

- Model folder names will appear as-is (so name them appropriately)
- The first image (by filename sort) in each folder becomes the portrait
- All images in a model's folder will be available in the modal gallery when you click their portrait
- Images are automatically resized if you use `resize_images.py` on the models folder

