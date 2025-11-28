// Mobile Navigation Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// Close mobile menu when clicking on a link
if (navMenu) {
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
}

// Image Modal
let currentImageIndex = 0;
let galleryImages = [];
let modal = null;

function createModal() {
  if (modal) return modal;
  
  modal = document.getElementById('imageModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'imageModal';
    modal.innerHTML = `
      <span class="modal-close">&times;</span>
      <img class="modal-content" id="modalImage" src="" alt="">
      <div class="modal-nav">
        <button class="modal-prev">‹</button>
        <button class="modal-next">›</button>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const modalClose = modal.querySelector('.modal-close');
  const modalPrev = modal.querySelector('.modal-prev');
  const modalNext = modal.querySelector('.modal-next');
  const modalImg = modal.querySelector('#modalImage');

  modalClose.addEventListener('click', closeModal);
  modalPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    showPreviousImage();
  });
  modalNext.addEventListener('click', (e) => {
    e.stopPropagation();
    showNextImage();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowLeft') {
      showPreviousImage();
    } else if (e.key === 'ArrowRight') {
      showNextImage();
    }
  });

  return modal;
}

function collectGalleryImages() {
  galleryImages = [];
  const items = document.querySelectorAll('.gallery-item img');
  items.forEach(img => {
    galleryImages.push(img.src);
  });
}

function openModal(imgSrc) {
  const modal = createModal();
  collectGalleryImages();
  
  currentImageIndex = galleryImages.indexOf(imgSrc);
  if (currentImageIndex === -1) currentImageIndex = 0;
  
  const modalImg = modal.querySelector('#modalImage');
  modalImg.src = galleryImages[currentImageIndex];
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function showNextImage() {
  if (galleryImages.length === 0) return;
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  const modalImg = modal.querySelector('#modalImage');
  modalImg.src = galleryImages[currentImageIndex];
}

function showPreviousImage() {
  if (galleryImages.length === 0) return;
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  const modalImg = modal.querySelector('#modalImage');
  modalImg.src = galleryImages[currentImageIndex];
}

// Add click event to gallery items
document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    const img = item.querySelector('img');
    if (img) {
      item.addEventListener('click', () => {
        openModal(img.src);
      });
    }
  });

  // Lazy loading images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px'
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
});

// Form Validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name') || contactForm.querySelector('[name="name"]')?.value;
    const email = formData.get('email') || contactForm.querySelector('[name="email"]')?.value;
    const message = formData.get('message') || contactForm.querySelector('[name="message"]')?.value;

    if (!name || !email || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
  });
}

// Navbar scroll effect (subtle)
let lastScroll = 0;
const navbar = document.querySelector('.minimal-nav');

if (navbar) {
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      navbar.style.borderBottomColor = 'var(--border-color)';
    } else {
      navbar.style.borderBottomColor = 'var(--border-color)';
    }
    
    lastScroll = currentScroll;
  });
}
