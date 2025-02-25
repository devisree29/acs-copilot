export default function decorate(block) {
  // Gather all slide data from the initial block content
  const slidesData = Array.from(block.querySelectorAll(':scope > div')).map((slide) => ({
    picture: slide.querySelector('picture'),
    heading: slide.querySelector('h2'),
    subHeading: slide.querySelector('h3'),
    paragraphs: Array.from(slide.querySelectorAll('p')),
    icons: Array.from(slide.querySelectorAll('span.icon')),
  }));

  // Clear the existing block content
  block.innerHTML = '';

  // Create a container for the carousel
  const carouselContainer = document.createElement('div');
  carouselContainer.className = 'carousel-container';

  // Create a wrapper for the slides
  const slidesWrapper = document.createElement('div');
  slidesWrapper.className = 'slides-wrapper';

  // Create the carousel cards based on gathered data
  slidesData.forEach((slideData) => {
    const card = document.createElement('div');
    card.className = 'team-carousel-card';

    const imageContainer = document.createElement('div');
    imageContainer.className = 'team-carousel-card-image';
    if (slideData.picture) {
      imageContainer.appendChild(slideData.picture);
    }

    const contentContainer = document.createElement('div');
    contentContainer.className = 'team-carousel-card-content';

    if (slideData.heading) contentContainer.appendChild(slideData.heading);
    if (slideData.paragraphs[0]) contentContainer.appendChild(slideData.paragraphs[0]);
    if (slideData.subHeading) contentContainer.appendChild(slideData.subHeading);
    if (slideData.paragraphs[1]) contentContainer.appendChild(slideData.paragraphs[1]);
    if (slideData.paragraphs[2]) contentContainer.appendChild(slideData.paragraphs[2]);

    card.appendChild(imageContainer);
    card.appendChild(contentContainer);

    slidesWrapper.appendChild(card);
  });

  carouselContainer.appendChild(slidesWrapper);
  block.appendChild(carouselContainer);

  // Add carousel navigation
  const navContainer = document.createElement('div');
  navContainer.className = 'carousel-nav-container';

  const prevButton = document.createElement('button');
  prevButton.className = 'carousel-nav prev';
  prevButton.innerHTML = '&larr;';
  prevButton.addEventListener('click', () => {
    const currentScroll = slidesWrapper.scrollLeft;
    slidesWrapper.scrollTo({
      left: currentScroll - slidesWrapper.offsetWidth,
      behavior: 'smooth',
    });
    // eslint-disable-next-line no-use-before-define
    updateIndicators();
  });

  const nextButton = document.createElement('button');
  nextButton.className = 'carousel-nav next';
  nextButton.innerHTML = '&rarr;';
  nextButton.addEventListener('click', () => {
    const currentScroll = slidesWrapper.scrollLeft;
    slidesWrapper.scrollTo({
      left: currentScroll + slidesWrapper.offsetWidth,
      behavior: 'smooth',
    });
    // eslint-disable-next-line no-use-before-define
    updateIndicators();
  });

  // Create slide indicators
  const indicatorsContainer = document.createElement('div');
  indicatorsContainer.className = 'carousel-indicators';

  slidesData.forEach((slideData, index) => {
    const indicator = document.createElement('img');
    indicator.src = slideData.picture.lastElementChild.src;
    indicator.className = 'carousel-indicator';
    indicator.setAttribute('data-slide-to', index);
    indicator.addEventListener('click', () => {
      slidesWrapper.scrollTo({
        left: index * slidesWrapper.offsetWidth,
        behavior: 'smooth',
      });
      // eslint-disable-next-line no-use-before-define
      updateIndicators();
    });
    indicatorsContainer.appendChild(indicator);
  });

  function updateIndicators() {
    const activeIndex = Math.round(slidesWrapper.scrollLeft / slidesWrapper.offsetWidth)
      ? Math.round(slidesWrapper.scrollLeft / slidesWrapper.offsetWidth) : 0;
    const start = Math.max(0, Math.min(activeIndex - 2, slidesData.length - 4));
    const end = Math.min(slidesData.length, start + 4);

    indicatorsContainer.childNodes.forEach((indicator, index) => {
      indicator.style.display = (index >= start && index < end) ? 'inline-block' : 'none';
      indicator.classList.toggle('active', index === activeIndex);
    });
  }

  navContainer.appendChild(prevButton);
  navContainer.appendChild(indicatorsContainer);
  navContainer.appendChild(nextButton);
  carouselContainer.appendChild(navContainer);

  // Initialize indicators display immediately
  updateIndicators();

  // Auto slide functionality
  let autoSlideInterval = setInterval(() => {
    const currentScroll = slidesWrapper.scrollLeft;
    const maxScroll = slidesWrapper.scrollWidth - slidesWrapper.clientWidth;
    if (currentScroll < maxScroll) {
      slidesWrapper.scrollTo({
        left: currentScroll + slidesWrapper.offsetWidth,
        behavior: 'smooth',
      });
    } else {
      slidesWrapper.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    }
    updateIndicators();
  }, 5000);

  // Pause auto slide on hover
  carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
  });

  carouselContainer.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
      const currentScroll = slidesWrapper.scrollLeft;
      const maxScroll = slidesWrapper.scrollWidth - slidesWrapper.clientWidth;
      if (currentScroll < maxScroll) {
        slidesWrapper.scrollTo({
          left: currentScroll + slidesWrapper.offsetWidth,
          behavior: 'smooth',
        });
      } else {
        slidesWrapper.scrollTo({
          left: 0,
          behavior: 'smooth',
        });
      }
      updateIndicators();
    }, 5000);
  });

  // Update indicators on scroll
  slidesWrapper.addEventListener('scroll', () => {
    updateIndicators();
  });
}
