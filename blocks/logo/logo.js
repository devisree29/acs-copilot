export default function decorate(block) {
  // Get the heading element inside the block
  const headingElement = block.querySelector('h2');

  // Extract all logo images from <picture> elements
  const logos = [...block.querySelectorAll('picture')].map((picture) => ({
    src: picture.querySelector('img').src, // Get image source
    alt: picture.querySelector('img').alt || 'Logo', // Set alt text or default to 'Logo'
  }));

  // Reconstruct the block's inner HTML with structured layout
  block.innerHTML = `
    <div class="logo-content">
      ${headingElement.outerHTML} <!-- Retains the heading element -->
      <div class="logo-slideshow">
        ${logos.map((logo) => `
          <div class="logo-card">
            <img src="${logo.src}" alt="${logo.alt}">
          </div>
        `).join('')} <!-- Generates logo cards dynamically -->
      </div>
    </div>
  `;

  // Get the newly created slideshow container
  const slideshow = block.querySelector('.logo-slideshow');

  // Function to duplicate logos to create an infinite scrolling effect
  function createClones() {
    const cards = slideshow.querySelectorAll('.logo-card');
    cards.forEach((card) => {
      const clone = card.cloneNode(true); // Clone each logo card
      slideshow.appendChild(clone); // Append the clone to the slideshow
    });
  }

  createClones(); // Call function to create clones

  // Function to animate the logos in an infinite loop
  function slideLogos() {
    let start = Date.now(); // Capture the starting time
    const speed = 0.05; // Adjust scrolling speed

    function frame() {
      const timePassed = Date.now() - start;
      const scrollAmount = timePassed * speed; // Calculate scroll distance
      slideshow.style.transform = `translateX(-${scrollAmount}px)`;

      // Reset position when half the slideshow width is scrolled
      if (scrollAmount >= slideshow.scrollWidth / 2) {
        start = Date.now(); // Reset start time
        slideshow.style.transform = 'translateX(0)'; // Reset position
      }

      requestAnimationFrame(frame); // Request next animation frame
    }

    frame(); // Start animation
  }

  slideLogos(); // Call function to start the animation

  // Add a click event to the heading to toggle a class for styling
  headingElement.addEventListener('click', () => {
    headingElement.classList.toggle('clicked'); // Toggle 'clicked' class
  });
}
