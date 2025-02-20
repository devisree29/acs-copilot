import { loadCSS, createOptimizedPicture } from '../../scripts/aem.js';

export default async function decorate(block) {
  // Load the CSS file for the image1 block
  await loadCSS('/blocks/image1/image1.css');

  // Re-arrange the HTML content to follow best practices and requirements
  const images = block.querySelectorAll('picture');
  const rows = block.querySelectorAll('div');

  // Clear the original block content
  block.innerHTML = '';

  // Create new structure for the block
  const newStructure = document.createElement('div');
  newStructure.classList.add('image1-structure');

  images.forEach((image, index) => {
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('image-wrapper');

    if (index === 0) {
      imageWrapper.classList.add('right');
    } else if (index === 1) {
      imageWrapper.classList.add('left');
    } else if (index === 2) {
      imageWrapper.classList.add('center');
    }

    imageWrapper.appendChild(image);
    newStructure.appendChild(imageWrapper);
  });

  block.appendChild(newStructure);
}
