import { createOptimizedPicture } from '../../scripts/aem.js';

export default async function decorate(block) {
  // Extract and transform data from block
  const testimonials = [...block.children].map((child) => {
    const pictureElement = child.querySelector('picture');
    const imgElement = pictureElement.querySelector('img');
    const src = imgElement.getAttribute('src');
    const alt = imgElement.getAttribute('alt');
    const title = child.querySelector('p strong').textContent;
    const description = child.querySelector('p strong').nextSibling.textContent.trim();

    return {
      src,
      alt,
      title,
      description,
    };
  });

  // Create the new inner HTML
  block.innerHTML = `
    <h2>What Our Clients Say</h2>
    ${testimonials
      .map(
        (test) => `
      <div class="testimonial-card">
        ${createOptimizedPicture(test.src, test.alt).outerHTML}
        <div class="testimonial-content">
          <h3>${test.title}</h3>
          <p>${test.description}</p>
        </div>
      </div>
    `
      )
      .join('')}
  `;
}
