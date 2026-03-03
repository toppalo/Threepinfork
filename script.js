// PostHog analytics – set your project API key below (from https://us.posthog.com/settings/project)
(function () {
  var phKey = 'phc_SIxAGuIrI2iDmUZ4euAk9YIQno0FruEeuufpEe9n1OX';
  if (!phKey) return;
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
  posthog.init(phKey, { api_host: 'https://us.i.posthog.com', defaults: '2026-01-30' });
})();

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
  // Check if we're in a model gallery context (from models page)
  if (typeof window !== 'undefined' && window.modelGalleryImages && window.modelGalleryImages.length > 0) {
    galleryImages = window.modelGalleryImages;
    return;
  }
  
  galleryImages = [];
  const items = document.querySelectorAll('.gallery-item img');
  items.forEach(img => {
    galleryImages.push(img.src);
  });
}

function openModal(imgSrc) {
  const modal = createModal();
  collectGalleryImages();
  
  // Use global index if available (from models page), otherwise find index
  if (typeof window !== 'undefined' && window.currentImageIndex !== undefined) {
    currentImageIndex = window.currentImageIndex;
  } else {
    currentImageIndex = galleryImages.indexOf(imgSrc);
    if (currentImageIndex === -1) currentImageIndex = 0;
  }
  
  if (typeof window !== 'undefined') {
    window.currentImageIndex = currentImageIndex;
  }
  
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
  
  // Use global index if available (from models page)
  if (typeof window !== 'undefined' && window.currentImageIndex !== undefined) {
    currentImageIndex = window.currentImageIndex;
  }
  
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  
  if (typeof window !== 'undefined') {
    window.currentImageIndex = currentImageIndex;
  }
  
  const modalImg = modal.querySelector('#modalImage');
  modalImg.src = galleryImages[currentImageIndex];
}

function showPreviousImage() {
  if (galleryImages.length === 0) return;
  
  // Use global index if available (from models page)
  if (typeof window !== 'undefined' && window.currentImageIndex !== undefined) {
    currentImageIndex = window.currentImageIndex;
  }
  
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  
  if (typeof window !== 'undefined') {
    window.currentImageIndex = currentImageIndex;
  }
  
  const modalImg = modal.querySelector('#modalImage');
  modalImg.src = galleryImages[currentImageIndex];
}

// Add click event to gallery items (but skip model items which have their own handler)
document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.gallery-item:not([data-model])');
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

// Form Validation and Google Sheets Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name') || contactForm.querySelector('[name="name"]')?.value;
    const email = formData.get('email') || contactForm.querySelector('[name="email"]')?.value;
    const phone = formData.get('phone') || contactForm.querySelector('[name="phone"]')?.value || '';
    const message = formData.get('message') || contactForm.querySelector('[name="message"]')?.value;

    // Validation
    if (!name || !email || !message) {
      alert('Please fill in all required fields (Name, Email, and Message).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Disable submit button
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Get the Google Apps Script Web App URL from the script tag
    const scriptTag = document.querySelector('script[data-google-script-url]');
    const scriptURL = scriptTag ? scriptTag.getAttribute('data-google-script-url') : null;

    if (!scriptURL) {
      alert('Form configuration error. Please contact the website administrator.');
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
      return;
    }

    // Create a hidden form to submit to Google Apps Script
    const hiddenForm = document.createElement('form');
    hiddenForm.method = 'POST';
    hiddenForm.action = scriptURL;
    hiddenForm.target = 'hidden_iframe';
    hiddenForm.style.display = 'none';

    // Add form fields
    const nameInput = document.createElement('input');
    nameInput.type = 'hidden';
    nameInput.name = 'name';
    nameInput.value = name;
    hiddenForm.appendChild(nameInput);

    const emailInput = document.createElement('input');
    emailInput.type = 'hidden';
    emailInput.name = 'email';
    emailInput.value = email;
    hiddenForm.appendChild(emailInput);

    const phoneInput = document.createElement('input');
    phoneInput.type = 'hidden';
    phoneInput.name = 'phone';
    phoneInput.value = phone;
    hiddenForm.appendChild(phoneInput);

    const messageInput = document.createElement('input');
    messageInput.type = 'hidden';
    messageInput.name = 'message';
    messageInput.value = message;
    hiddenForm.appendChild(messageInput);

    const timestampInput = document.createElement('input');
    timestampInput.type = 'hidden';
    timestampInput.name = 'timestamp';
    timestampInput.value = new Date().toISOString();
    hiddenForm.appendChild(timestampInput);

    // Create hidden iframe for submission
    let iframe = document.getElementById('hidden_iframe');
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = 'hidden_iframe';
      iframe.name = 'hidden_iframe';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
    }

    // Add form to body and submit
    document.body.appendChild(hiddenForm);
    
    // Handle form submission success (with delay to ensure submission completes)
    setTimeout(function() {
      // Remove the form after submission
      if (document.body.contains(hiddenForm)) {
        document.body.removeChild(hiddenForm);
      }
      
      // Show success message
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
      
      // Re-enable button
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }, 1000);

    hiddenForm.submit();
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
