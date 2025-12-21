/**
 * Overview page slideshow functionality
 * Opens modal slideshow when clicking any gallery image
 */

document.addEventListener('DOMContentLoaded', function() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const modalClose = document.querySelector('.modal-close');
  const modalPrev = document.querySelector('.modal-prev');
  const modalNext = document.querySelector('.modal-next');
  const thumbnailsContainer = document.getElementById('modalThumbnails');
  
  // Get all overview images
  const overviewImagesDiv = document.getElementById('overview-images');
  const allImages = Array.from(overviewImagesDiv.querySelectorAll('img[data-src]')).map(img => img.getAttribute('data-src'));
  
  let currentIndex = 0;
  
  // Add click event to each gallery item
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', function() {
      currentIndex = index;
      openModal();
    });
  });
  
  function openModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    showImage(currentIndex);
    populateThumbnails();
  }
  
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
  
  function showImage(index) {
    if (index < 0) index = allImages.length - 1;
    if (index >= allImages.length) index = 0;
    
    currentIndex = index;
    modalImage.src = allImages[index];
    
    // Update active thumbnail
    updateActiveThumbnail();
  }
  
  function populateThumbnails() {
    thumbnailsContainer.innerHTML = '';
    
    allImages.forEach((imageSrc, index) => {
      const thumb = document.createElement('div');
      thumb.className = 'modal-thumbnail';
      if (index === currentIndex) {
        thumb.classList.add('active');
      }
      
      const thumbImg = document.createElement('img');
      thumbImg.src = imageSrc;
      thumbImg.alt = `Thumbnail ${index + 1}`;
      
      thumb.appendChild(thumbImg);
      thumb.addEventListener('click', function() {
        showImage(index);
      });
      
      thumbnailsContainer.appendChild(thumb);
    });
  }
  
  function updateActiveThumbnail() {
    const thumbnails = thumbnailsContainer.querySelectorAll('.modal-thumbnail');
    thumbnails.forEach((thumb, index) => {
      if (index === currentIndex) {
        thumb.classList.add('active');
        // Scroll thumbnail into view
        thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        thumb.classList.remove('active');
      }
    });
  }
  
  // Event listeners
  modalClose.addEventListener('click', closeModal);
  
  modalPrev.addEventListener('click', function() {
    showImage(currentIndex - 1);
  });
  
  modalNext.addEventListener('click', function() {
    showImage(currentIndex + 1);
  });
  
  // Close modal when clicking outside the image
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (modal.style.display === 'block') {
      if (e.key === 'ArrowLeft') {
        showImage(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        showImage(currentIndex + 1);
      } else if (e.key === 'Escape') {
        closeModal();
      }
    }
  });
});

