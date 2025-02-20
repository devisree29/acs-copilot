import { createOptimizedPicture } from '../../scripts/aem.js';

function toggleVisibility(showElement, hideElement, duration) {
  showElement.style.display = 'block';
  hideElement.style.display = 'none';
  setTimeout(() => {
    showElement.style.display = 'none';
    hideElement.style.display = 'block';
    toggleVisibility(hideElement, showElement, duration); // Loop visibility
  }, duration);
}

export default function decorate(block) {
  const pictureDiv = block.querySelector('picture');
  const img = pictureDiv.querySelector('img');
  const { src, alt } = img;

  const newPicture = createOptimizedPicture(src, alt);

  // Clear the block content and append the new picture element
  block.innerHTML = '';
  block.append(newPicture);

  // Add a class for styling
  block.classList.add('optimized-did-you-know');

  // Initialize visibility toggle
  const carouselBlock = document.querySelector('.carousel');
  toggleVisibility(block, carouselBlock, 5000); // 5 seconds
}