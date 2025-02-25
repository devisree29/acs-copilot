export default function decorate(block) {
  block.classList.add('decorated');

  // Process the video embedding if no <picture> element exists
  handleVideoEmbedding(block);
  
  // Center the content within the product hero section
  document.addEventListener('DOMContentLoaded', centerContentOnLoad);
}

/**
 * Handles embedding a video inside the given block if a <picture> element is not present.
 * @param {HTMLElement} block - The block element to process.
 */
function handleVideoEmbedding(block) {
  const container = block.querySelector('div');
  if (!container) return;

  const videoWrapper = [...container.children][1]; // Get the second child
  if (!videoWrapper || block.querySelector('picture')) return;

  const videoAnchor = videoWrapper.querySelector('a');
  if (!videoAnchor) return;

  const videoUrl = videoAnchor.getAttribute('href');
  if (!videoUrl) return;

  // Create a video element and set attributes
  const videoElement = createVideoElement(videoUrl);

  // Replace existing content with the video element
  videoWrapper.innerHTML = '';
  videoWrapper.appendChild(videoElement);
}

/**
 * Creates a video element with given source URL.
 * @param {string} videoSrc - The URL of the video.
 * @returns {HTMLVideoElement} The configured video element.
 */
function createVideoElement(videoSrc) {
  const videoElement = document.createElement('video');
  videoElement.setAttribute('autoplay', '');
  videoElement.setAttribute('muted', '');
  videoElement.setAttribute('loop', '');
  videoElement.setAttribute('id', 'myVideo');
  videoElement.classList.add('background-video');

  const sourceElement = document.createElement('source');
  sourceElement.setAttribute('src', videoSrc);
  sourceElement.setAttribute('type', 'video/mp4');

  videoElement.appendChild(sourceElement);
  return videoElement;
}

/**
 * Centers content inside the product hero section on page load and resize.
 */
function centerContentOnLoad() {
  const heroContainer = document.querySelector('.product-hero.vidbg');
  const contentBlock = heroContainer?.querySelector('.content');
  if (!heroContainer || !contentBlock) return;

  function centerContent() {
    const containerHeight = heroContainer.clientHeight;
    const contentHeight = contentBlock.clientHeight;
    contentBlock.style.position = 'relative';
    contentBlock.style.top = `${(containerHeight - contentHeight) / 2}px`;
  }

  centerContent();
  window.addEventListener('resize', centerContent);
}