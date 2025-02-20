export default function decorate(block) {
  // Create the carousel container
  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('carousel-container');

  // Create the carousel slides wrapper
  const slidesWrapper = document.createElement('div');
  slidesWrapper.classList.add('carousel-slides-wrapper');

  // Process each slide in the block
  const slides = Array.from(block.children);
  slides.forEach((slideContent) => {
    const slide = document.createElement('div');
    slide.classList.add('carousel-slide');
    slide.innerHTML = slideContent.innerHTML;
    slidesWrapper.appendChild(slide);
  });

  // Append the slides wrapper to the carousel container
  carouselContainer.appendChild(slidesWrapper);

  // Clear the block content and append the carousel container
  block.innerHTML = '';
  block.appendChild(carouselContainer);

  // JavaScript for the infinite loop slideshow
  let currentIndex = 0;
  const totalSlides = slidesWrapper.children.length;

  function showSlide(index) {
    const offset = -index * 100;
    slidesWrapper.style.transform = `translateX(${offset}%)`;
  }

  function showNextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
  }

  setInterval(showNextSlide, 5000); // Change slide every 5 seconds

  showSlide(currentIndex);
}
