// Fashion Page Category Slideshow Functionality
document.addEventListener('DOMContentLoaded', () => {
  const categoryCards = document.querySelectorAll('.category-card');
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const thumbnailsContainer = document.getElementById('modalThumbnails');
  const closeBtn = modal ? modal.querySelector('.modal-close') : null;
  const prevBtn = modal ? modal.querySelector('.modal-prev') : null;
  const nextBtn = modal ? modal.querySelector('.modal-next') : null;

  let currentCategoryImages = [];
  let currentImageIndex = 0;

  // Function to get all images for a category
  function getCategoryImages(category) {
    const categoryData = document.querySelector(`#category-images [data-category="${category}"]`);
    if (!categoryData) return [];
    
    const images = categoryData.querySelectorAll('img[data-src]');
    return Array.from(images).map(img => img.getAttribute('data-src'));
  }

  // Create thumbnail strip
  function createThumbnails() {
    if (!thumbnailsContainer) return;
    
    thumbnailsContainer.innerHTML = '';
    
    currentCategoryImages.forEach((imgSrc, index) => {
      const thumb = document.createElement('div');
      thumb.className = 'modal-thumbnail';
      if (index === currentImageIndex) {
        thumb.classList.add('active');
      }
      
      const thumbImg = document.createElement('img');
      thumbImg.src = imgSrc;
      thumbImg.alt = `Thumbnail ${index + 1}`;
      
      thumb.appendChild(thumbImg);
      thumb.addEventListener('click', () => {
        showImage(index);
      });
      
      thumbnailsContainer.appendChild(thumb);
    });
  }

  // Update active thumbnail
  function updateActiveThumbnail() {
    if (!thumbnailsContainer) return;
    
    const thumbnails = thumbnailsContainer.querySelectorAll('.modal-thumbnail');
    thumbnails.forEach((thumb, index) => {
      if (index === currentImageIndex) {
        thumb.classList.add('active');
        // Scroll thumbnail into view
        thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        thumb.classList.remove('active');
      }
    });
  }

  // Open slideshow for a category
  function openCategorySlideshow(category) {
    currentCategoryImages = getCategoryImages(category);
    
    if (currentCategoryImages.length === 0) {
      console.warn('No images found for category:', category);
      return;
    }

    currentImageIndex = 0;
    createThumbnails();
    showImage(currentImageIndex);
    
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  // Show image at specific index
  function showImage(index) {
    if (!modalImg || currentCategoryImages.length === 0) return;
    
    if (index < 0) {
      currentImageIndex = currentCategoryImages.length - 1;
    } else if (index >= currentCategoryImages.length) {
      currentImageIndex = 0;
    } else {
      currentImageIndex = index;
    }
    
    modalImg.src = currentCategoryImages[currentImageIndex];
    updateActiveThumbnail();
  }

  // Navigate to next image
  function showNextImage() {
    showImage(currentImageIndex + 1);
  }

  // Navigate to previous image
  function showPreviousImage() {
    showImage(currentImageIndex - 1);
  }

  // Close modal
  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
    if (thumbnailsContainer) {
      thumbnailsContainer.innerHTML = '';
    }
    currentCategoryImages = [];
    currentImageIndex = 0;
  }

  // Add click handlers to category cards
  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const category = card.getAttribute('data-category');
      openCategorySlideshow(category);
    });
  });

  // Modal controls
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showPreviousImage();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showNextImage();
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal || !modal.classList.contains('active')) return;
    
    if (currentCategoryImages.length === 0) return;

    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowLeft') {
      showPreviousImage();
    } else if (e.key === 'ArrowRight') {
      showNextImage();
    }
  });
});

