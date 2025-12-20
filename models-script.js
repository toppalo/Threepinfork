// Models page functionality - shows model gallery when clicking on a model portrait
document.addEventListener('DOMContentLoaded', () => {
  // Find all model items (they have data-model attribute)
  const modelItems = document.querySelectorAll('.gallery-item[data-model]');
  
  modelItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent default gallery item click handler
      
      const modelName = item.getAttribute('data-model');
      const imagesData = item.getAttribute('data-images');
      const portraitImg = item.querySelector('img');
      
      if (!portraitImg || !imagesData) return;
      
      // Parse the image paths (separated by |)
      const modelImages = imagesData.split('|').filter(path => path.length > 0);
      
      if (modelImages.length === 0) return;
      
      // Set global gallery images for modal navigation
      if (typeof window !== 'undefined') {
        window.modelGalleryImages = modelImages;
        window.currentImageIndex = 0;
      }
      
      // Open the modal with the first image (portrait)
      if (typeof openModal === 'function') {
        openModal(modelImages[0]);
      }
    });
  });
});

