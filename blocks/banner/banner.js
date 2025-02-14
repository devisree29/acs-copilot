import { decorateButtons } from '../../scripts/aem.js';

export default function decorate(block) {
  const linkElement = block.querySelector('a');
  const textElement = block.querySelector('div > div:nth-child(2) > div');

  const bannerContent = document.createElement('div');
  bannerContent.className = 'banner-content';

  const bannerLink = document.createElement('div');
  bannerLink.className = 'banner-link';
  bannerLink.appendChild(linkElement);

  const bannerText = document.createElement('div');
  bannerText.className = 'banner-text';
  bannerText.textContent = textElement.textContent;

  bannerContent.appendChild(bannerLink);
  bannerContent.appendChild(bannerText);

  block.innerHTML = '';
  block.appendChild(bannerContent);

  decorateButtons(block);
}
