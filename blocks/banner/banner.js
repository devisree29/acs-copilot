import { decorateButtons } from '../../scripts/aem.js';

export default function decorate(block) {
  const bannerData = {
    title: 'Banner <span class="white-text">Section</span> <span class="multi-color-text">Try it now</span>',
    description: "Use Project Helix's serverless architecture to meet any traffic need. Use Project Helix's PageSpeed Insights Github action to evaluate every Pull-Request for Lighthouse Score.",
    buttonText: 'Try now link with Installer',
    buttonLink: 'https://www.amazon.in/'
  };

  const bannerContent = document.createElement('div');
  bannerContent.className = 'banner-content';

  const textContainer = document.createElement('div');
  textContainer.className = 'text-container';

  const header = document.createElement('h1');
  header.innerHTML = bannerData.title;
  textContainer.appendChild(header);

  const description = document.createElement('p');
  description.textContent = bannerData.description;
  textContainer.appendChild(description);

  const linkContainer = document.createElement('p');
  linkContainer.className = 'banner-link';
  const linkWrapper = document.createElement('div');
  linkWrapper.className = 'link-wrapper';
  const link = document.createElement('a');
  link.href = bannerData.buttonLink;

  // Create the icon element directly
  const iconElement = document.createElement('span');
  iconElement.className = 'cta-icon';
  iconElement.innerHTML = '✨';
  link.appendChild(iconElement);

  const buttonText = document.createTextNode(` ${bannerData.buttonText}`);
  link.appendChild(buttonText);

  linkWrapper.appendChild(link);
  linkContainer.appendChild(linkWrapper);

  textContainer.appendChild(linkContainer);

  bannerContent.appendChild(textContainer);
  block.innerHTML = '';
  block.appendChild(bannerContent);

  decorateButtons(block);
}
