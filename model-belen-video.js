// Belen model page: Singing category opens video modal
document.addEventListener('DOMContentLoaded', () => {
  const videoModal = document.getElementById('videoModal');
  const singingCard = document.querySelector('.category-card[data-category="singing"]');
  const singingVideo = document.getElementById('singingVideo');
  const videoClose = document.querySelector('.video-modal-close');

  if (!videoModal || !singingCard || !singingVideo) return;

  function openVideoModal() {
    videoModal.classList.add('active');
    videoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    singingVideo.currentTime = 0;
    singingVideo.play().catch(() => {});
  }

  function closeVideoModal() {
    videoModal.classList.remove('active');
    videoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    singingVideo.pause();
  }

  singingCard.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    openVideoModal();
  });

  if (videoClose) {
    videoClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeVideoModal();
    });
  }

  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideoModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!videoModal.classList.contains('active')) return;
    closeVideoModal();
  });
});
