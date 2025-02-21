import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Create a slideshow container
  const slideshowContainer = document.createElement('div');
  slideshowContainer.className = 'slideshow-container';

  // Extract card data from the block
  const cardData = Array.from(block.children[0].children).map((card) => ({
    picture: card.querySelector('picture'),
    title: card.querySelector('h2')?.textContent || '',
    description: card.querySelector('p:last-of-type')?.textContent || '',
  }));

  // Create and append slides (Grouped in threes)
  const totalSlides = Math.ceil(cardData.length / 3); // Number of groups
  let slideGroups = [];

  for (let i = 0; i < totalSlides; i++) {
    const slideDiv = document.createElement('div');
    slideDiv.className = 'mySlides fade';

    const startIndex = i * 3;
    const slideItems = cardData.slice(startIndex, startIndex + 3).map((card) => `
      <div class="cardblock-content">
        ${card.picture.outerHTML}
        <h2>${card.title}</h2>
        <p>${card.description}</p>
      </div>
    `).join('');

    slideDiv.innerHTML = slideItems;
    slideshowContainer.appendChild(slideDiv);
    slideGroups.push(slideDiv);
  }

  // Add navigation buttons
  const prev = document.createElement('a');
  prev.className = 'prev';
  prev.innerHTML = '&#10094;';
  prev.onclick = () => showSlides(slideIndex -= 1);
  slideshowContainer.appendChild(prev);

  const next = document.createElement('a');
  next.className = 'next';
  next.innerHTML = '&#10095;';
  next.onclick = () => showSlides(slideIndex += 1);
  slideshowContainer.appendChild(next);

  // Append the slideshow container to the block
  block.innerHTML = `<h1 class="cardblock-title">Card Block Section for All Products ACS Co Pilot</h1>`;
  block.appendChild(slideshowContainer);

  // Add dots for navigation
  const dots = document.createElement('div');
  dots.className = 'dots';
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    dot.className = 'dot';
    dot.onclick = () => currentSlide(i + 1);
    dots.appendChild(dot);
  }
  block.appendChild(dots);

  // Initialize the slide index
  let slideIndex = 1;
  showSlides(slideIndex);

  // Function to show slides
  function showSlides(n) {
    if (n > totalSlides) slideIndex = 1;
    if (n < 1) slideIndex = totalSlides;
    
    slideGroups.forEach((slide, i) => {
      slide.style.display = (i === slideIndex - 1) ? 'flex' : 'none';
    });

    const allDots = block.querySelectorAll('.dot');
    allDots.forEach((dot, i) => {
      dot.className = dot.className.replace(' active', '');
      if (i === slideIndex - 1) {
        dot.className += ' active';
      }
    });
  }

  // Function to set the current slide
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  // Auto-slideshow every 5 seconds
  setInterval(() => {
    showSlides(slideIndex += 1);
  }, 5000);
}
