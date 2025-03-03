import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // Load footer fragment
  const footerPath = getMetadata('footer')
    ? new URL(getMetadata('footer'), window.location).pathname
    : '/footer';
  const fragment = await loadFragment(footerPath);

  if (!fragment) return;

  // Replace block content with footer fragment
  block.textContent = '';
  const footer = document.createElement('div');
  footer.append(...fragment.children); // Appends all child elements efficiently
  block.append(footer);

  // Add "Back to Top" button
  const lastPara = footer.querySelector('p');
  if (lastPara) {
    lastPara.insertAdjacentHTML('beforeend', `
      <span class="icon icon-up-arrow-dark-theme">
        <a href="#" class="back-to-top-link"> </a>
      </span>
    `);
  }

  // Forcing the window reload for footer links for the support block as
  // # is not reloading the window
  const footerLinks = block.querySelector(':scope .default-content-wrapper > ul');

  footerLinks?.querySelectorAll(':scope > li > a[href*="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      window.open(link.href, '_blank'); // Open in a new tab
    });
  });
}
