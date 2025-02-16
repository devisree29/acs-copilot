import { decorateButtons } from '../../scripts/aem.js';

export default function decorate(block) {
  const bannerContent = document.createElement('div');
  bannerContent.className = 'banner-content';

  const textContainer = document.createElement('div');
  textContainer.className = 'text-container';

  const header = document.createElement('h1');
  header.innerHTML = 'Banner <span class="white-text">Section</span> <span class="multi-color-text">Try it now</span>';
  textContainer.appendChild(header);

  const description = document.createElement('p');
  description.textContent = "Use Project Helix's serverless architecture to meet any traffic need. Use Project Helix's PageSpeed Insights Github action to evaluate every Pull-Request for Lighthouse Score.";
  textContainer.appendChild(description);

  const linkContainer = document.createElement('p');
  linkContainer.className = 'banner-link';
  const linkWrapper = document.createElement('div');
  linkWrapper.className = 'link-wrapper';
  const link = document.createElement('a');
  link.href = 'https://www.amazon.in/';
  link.innerHTML = '<span class="cta-icon">✨</span> Try now with Installing';
  linkWrapper.appendChild(link);
  linkContainer.appendChild(linkWrapper);

  textContainer.appendChild(linkContainer);

  bannerContent.appendChild(textContainer);
  block.innerHTML = '';
  block.appendChild(bannerContent);

  decorateButtons(block);
}
