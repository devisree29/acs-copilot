import { decorateButtons } from '../../scripts/aem.js';

// Main decorate function
export default function decorate(block) {
  // Helper function to extract content with fallback values
  const extractContent = (selector, attribute = false) => {
    const element = block.querySelector(selector);
    return element ? (attribute ? element.getAttribute('href') : element.textContent) : '';
  };

  // Extract title, description, and button link/text
  const title = extractContent('h2');
  const description = extractContent('p:nth-of-type(1)');
  const buttonText = extractContent('p:nth-of-type(2) a');
  const buttonLink = extractContent('p:nth-of-type(2) a', true);

  // Create banner content
  const bannerContent = document.createElement('div');
  bannerContent.className = 'banner-content';

  // Create and populate text container
  const textContainer = document.createElement('div');
  textContainer.className = 'text-container';

  // Title
  const header = document.createElement('h1');
  header.innerHTML = title;
  textContainer.appendChild(header);

  // Description
  const descriptionParagraph = document.createElement('p');
  descriptionParagraph.textContent = description;
  textContainer.appendChild(descriptionParagraph);

  // CTA Link
  if (buttonText && buttonLink) {
    const linkContainer = document.createElement('p');
    linkContainer.className = 'banner-link';
    
    const link = document.createElement('a');
    link.href = buttonLink;
    link.appendChild(document.createTextNode(` ${buttonText}`));
    
    linkContainer.appendChild(link);
    textContainer.appendChild(linkContainer);
  }

  // Append text container to banner content
  bannerContent.appendChild(textContainer);

  // Clear original content and append new banner content
  block.innerHTML = '';
  block.appendChild(bannerContent);

  // Enhance any buttons
  decorateButtons(block);
}
