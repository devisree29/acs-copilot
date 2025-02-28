export default function decorate(block) {
  // Get the heading element inside the block
  const logoTitle = block.querySelector(':scope > div > div').firstElementChild;

  // Extract all logo images from <picture> elements
  const logoImages = [...block.querySelectorAll('picture')].map((picture) => ({
    src: picture.querySelector('img').src, // Get image source
    alt: picture.querySelector('img').alt || 'Logo', // Set alt text or default to 'Logo'
  }));

  const logoSlides = document.createElement('div');
  logoSlides.className = 'logo-slideshow';

  // Create logo cards efficiently using `map` and `append`
  logoSlides.append(...logoImages.map(({ src, alt }) => {
    const logoCard = document.createElement('div');
    logoCard.className = 'logo-card';

    const logoImage = Object.assign(document.createElement('img'), { src, alt });
    logoCard.append(logoImage);

    return logoCard;
  }));

  const logoContent = document.createElement('div');
  logoContent.className = 'logo-content';
  logoContent.append(logoTitle, logoSlides);

  block.replaceChildren(logoContent);

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
  logoTitle.addEventListener('click', () => {
    logoTitle.classList.toggle('clicked'); // Toggle 'clicked' class
  });
}
