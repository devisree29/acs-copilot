import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const testimonials = [...block.children].map((row) => {
    const pictureElement = row.querySelector('picture');
    const imgElement = pictureElement.querySelector('img');
    const src = imgElement.getAttribute('src');
    const alt = imgElement.getAttribute('alt');
    const title = row.querySelector('h5').textContent;
    const description = row.querySelector('p').textContent;
    const link = row.querySelector('a') ? row.querySelector('a').outerHTML : '';

    return {
      src,
      alt,
      title,
      description,
      link,
    };
  });

  block.innerHTML = `
    <div class="testimonial-wrapper">
      <div class="testimonial-scroll top">
        ${testimonials
    .slice(0, 4)
    .map((test) => `
            <div class="testimonial-card">
              <div class="testimonial-header">
                ${createOptimizedPicture(test.src, test.alt).outerHTML}
                <div class="testimonial-info">
                  <h3>${test.title}</h3>
                  ${test.link}
                </div>
              </div>
              <div class="testimonial-content">
                <p>${test.description}</p>
              </div>
            </div>
          `)
    .join('')}
      </div>
      <div class="testimonial-scroll bottom">
        ${testimonials
    .slice(4)
    .map((test) => `
            <div class="testimonial-card">
              <div class="testimonial-header">
                ${createOptimizedPicture(test.src, test.alt).outerHTML}
                <div class="testimonial-info">
                  <h3>${test.title}</h3>
                  ${test.link}
                </div>
              </div>
              <div class="testimonial-content">
                <p>${test.description}</p>
              </div>
            </div>
          `)
    .join('')}
      </div>
    </div>
  `;

  // Automatic continuous slideshow functionality
  const topScrollContainer = block.querySelector('.testimonial-scroll.top');
  const bottomScrollContainer = block.querySelector('.testimonial-scroll.bottom');
  let topScrollAmount = 0;
  let bottomScrollAmount = 0;
  const speed = 0.5; // Adjust the speed as needed

  function continuousScrollTop() {
    topScrollAmount += speed;
    if (topScrollAmount >= topScrollContainer.scrollWidth / 2) {
      topScrollAmount = 0;
    }
    topScrollContainer.style.transform = `translateX(-${topScrollAmount}px)`;
    requestAnimationFrame(continuousScrollTop);
  }

  function continuousScrollBottom() {
    bottomScrollAmount += speed; // Positive for left to right
    if (bottomScrollAmount >= bottomScrollContainer.scrollWidth / 2) {
      bottomScrollAmount = 0;
    }
    bottomScrollContainer.style.transform = `translateX(${bottomScrollAmount}px)`;
    requestAnimationFrame(continuousScrollBottom);
  }

  // Duplicate the cards for seamless looping
  topScrollContainer.innerHTML += topScrollContainer.innerHTML;
  bottomScrollContainer.innerHTML += bottomScrollContainer.innerHTML;

  // Start the continuous scroll
  continuousScrollTop();
  continuousScrollBottom();
}
