import { createOptimizedPicture, decorateIcons } from '../../scripts/aem.js';

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

    const socialContainer = document.createElement('div');
    socialContainer.className = 'team-carousel-card-social';
    slideData.icons.forEach((icon) => {
      const link = document.createElement('a');
      link.href = '#';
      link.setAttribute('aria-label', `Follow on ${icon.className.split(' ')[1].split('-')[1]}`);
      decorateIcons(icon);
      link.appendChild(icon.querySelector('img'));
      socialContainer.appendChild(link);
    });

    contentContainer.appendChild(socialContainer);
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
    });
    indicatorsContainer.appendChild(indicator);
  });

  navContainer.appendChild(prevButton);
  navContainer.appendChild(indicatorsContainer);
  navContainer.appendChild(nextButton);
  carouselContainer.appendChild(navContainer);

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
    }, 5000);
  });

  // Update indicators on scroll
  slidesWrapper.addEventListener('scroll', () => {
    const activeIndex = Math.round(slidesWrapper.scrollLeft / slidesWrapper.offsetWidth);
    indicatorsContainer.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
      indicator.classList.toggle('active', index === activeIndex);
    });
  });
}
