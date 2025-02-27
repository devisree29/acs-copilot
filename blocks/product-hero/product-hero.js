// Function to create and configure a video element
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

// Function to handle video embedding inside the given block
function handleVideoEmbedding(block) {
  const container = block.querySelector('div'); // Select the first div inside the block
  if (!container) return;
  // Get the second child, expected to be the video container
  const videoWrapper = [...container.children][1];
  // Exit if a picture element exists
  if (!videoWrapper || block.querySelector('picture')) return;
  // Get the anchor tag inside video wrapper
  const videoAnchor = videoWrapper.querySelector('a');
  if (!videoAnchor) return;
  const videoUrl = videoAnchor.getAttribute('href'); // Extract the video URL
  if (!videoUrl) return;
  // Create a video element with the extracted URL
  const videoElement = createVideoElement(videoUrl);
  // Replace existing content in the video wrapper with the new video element
  videoWrapper.innerHTML = '';
  videoWrapper.appendChild(videoElement);
}

// Function to center the content within the product hero section
function centerContentOnLoad() {
  const heroContainer = document.querySelector('.product-hero.vidbg'); // Select the product hero container
  const contentBlock = heroContainer?.querySelector('.content'); // Select the content block inside it
  if (!heroContainer || !contentBlock) return;
  function centerContent() {
    const containerHeight = heroContainer.clientHeight;
    const contentHeight = contentBlock.clientHeight;
    contentBlock.style.position = 'relative';
    contentBlock.style.top = `${(containerHeight - contentHeight) / 2}px`; // Adjust content position to center it
  }
  centerContent(); // Center the content initially
  window.addEventListener('resize', centerContent); // Recalculate positioning on window resize
}

// Main function to decorate the block by adding styling and embedding video
export default function decorate(block) {
  block.classList.add('decorated'); // Add a class for styling purposes
  handleVideoEmbedding(block); // Embed video if applicable
  document.addEventListener('DOMContentLoaded', centerContentOnLoad); // Ensure content is centered on page load
}
