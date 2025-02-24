import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Extract testimonials data from the block
  const testimonialsData = [...block.children].map((row) => {
    const pictureElement = row.querySelector('picture');
    const imgElement = pictureElement.querySelector('img');

    return {
      src: imgElement.getAttribute('src'),
      alt: imgElement.getAttribute('alt'),
      testimonialTitle: row.querySelector('h5').textContent,
      testimonialText: row.querySelector('p').textContent,
      link: row.querySelector('a') ? row.querySelector('a').outerHTML : '',
    };
  });

  // Generate HTML structure for testimonials (fixed arrow-body-style)
  const createTestimonialHTML = (items) =>
    items
      .map(
        (test) => `
        <div class="testimonial-card">
          <div class="testimonial-header">
            ${createOptimizedPicture(test.src, test.alt).outerHTML}
            <div class="testimonial-info">
              <h3>${test.testimonialTitle}</h3>
              ${test.link}
            </div>
          </div>
          <div class="testimonial-content">
            <p>${test.testimonialText}</p>
          </div>
        </div>
      `,
      )
      .join('');

  // Update block content
  block.innerHTML = `
    <div class="testimonial-wrapper">
      <div class="testimonial-scroll top">
        <div class="testimonial-content-wrapper">
          ${createTestimonialHTML(testimonialsData.slice(0, 4))}
          ${createTestimonialHTML(testimonialsData.slice(0, 4))} <!-- Duplicate for smooth loop -->
        </div>
      </div>
      <div class="testimonial-scroll bottom">
        <div class="testimonial-content-wrapper">
          ${createTestimonialHTML(testimonialsData.slice(4))}
          ${createTestimonialHTML(testimonialsData.slice(4))} <!-- Duplicate for smooth loop -->
        </div>
      </div>
    </div>
  `;
}
