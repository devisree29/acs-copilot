import { decorateButtons } from '../../scripts/aem.js';

// Main decorate function 
export default function decorate(block) {
  // Extract the title, description, and button data from the block's child elements
  const titleElement = block.querySelector('p:nth-of-type(1)');
  const descriptionElement = block.querySelector('p:nth-of-type(2)');
  const buttonElement = block.querySelector('p:nth-of-type(3) a');
  const title = titleElement ? titleElement.innerHTML : '';
  const description = descriptionElement ? descriptionElement.textContent : '';
  const buttonText = buttonElement ? buttonElement.textContent : '';
  const buttonLink = buttonElement ? buttonElement.getAttribute('href') : '';
  // Create a container element for the entire banner content
  const bannerContent = document.createElement('div');
  bannerContent.className = 'banner-content';
  // Create a text container for the title, description, and button
  const textContainer = document.createElement('div');
  textContainer.className = 'text-container';
  // Create the title element and insert the extracted title HTML
  const header = document.createElement('h1');
  header.innerHTML = title;
  textContainer.appendChild(header);
  // Create the description paragraph and insert the extracted text content
  const descriptionParagraph = document.createElement('p');
  descriptionParagraph.textContent = description;
  textContainer.appendChild(descriptionParagraph);
  // Create a container for the call-to-action (CTA) link
  const linkContainer = document.createElement('p');
  linkContainer.className = 'banner-link';
  // Create the anchor link element
  const link = document.createElement('a');
  link.href = buttonLink;
  // Create a text node for the button text and append it to the link
  const buttonTextNode = document.createTextNode(` ${buttonText}`);
  link.appendChild(buttonTextNode);
  // Append the link to the link container
  linkContainer.appendChild(link);
  // Append the link container to the text container
  textContainer.appendChild(linkContainer);
  // Append the text container to the banner content
  bannerContent.appendChild(textContainer);
  // Clear the original block content and append the new banner content
  block.innerHTML = '';
  block.appendChild(bannerContent);
  // Call the decorateButtons function to potentially enhance any buttons
  decorateButtons(block);
}
