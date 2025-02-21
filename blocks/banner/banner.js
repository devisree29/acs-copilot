import { decorateButtons } from '../../scripts/aem.js';

// Main decorate function that is called to modify the block
export default function decorate(block) {
  // Define the banner data that will populate the content
  const bannerData = {
    title: 'Banner <span class="white-text">Section</span> <span class="multi-color-text">Try it now</span>',
    description: "Use Project Helix's serverless architecture to meet any traffic need. Use Project Helix's PageSpeed Insights Github action to evaluate every Pull-Request for Lighthouse Score.",
    buttonText: 'Try now link with Installer',
    buttonLink: 'https://www.amazon.in/', // Link for the call-to-action button
  };

  // Create a container element for the entire banner content
  const bannerContent = document.createElement('div');
  bannerContent.className = 'banner-content';

  // Create a text container for the title, description, and button
  const textContainer = document.createElement('div');
  textContainer.className = 'text-container';

  // Create the title element and insert the banner title HTML
  const header = document.createElement('h1');
  header.innerHTML = bannerData.title; // Using innerHTML to include span elements for styling
  textContainer.appendChild(header);

  // Create the description paragraph and insert the text content
  const description = document.createElement('p');
  description.textContent = bannerData.description; // Using textContent to avoid injecting HTML
  textContainer.appendChild(description);

  // Create a container for the call-to-action (CTA) link
  const linkContainer = document.createElement('p');
  linkContainer.className = 'banner-link';

  // Create a wrapper div for the link element
  const linkWrapper = document.createElement('div');
  linkWrapper.className = 'link-wrapper';

  // Create the anchor link element
  const link = document.createElement('a');
  link.href = bannerData.buttonLink; // Set the link href to the button's URL

  // Create an icon element (using a span here) to display next to the button text
  const iconElement = document.createElement('span');
  iconElement.className = 'cta-icon'; // Add a class for styling the icon
  iconElement.innerHTML = '✨'; // Insert a sparkle emoji as the icon

  // Append the icon to the link element
  link.appendChild(iconElement);

  // Create a text node for the button text and append it to the link
  const buttonText = document.createTextNode(` ${bannerData.buttonText}`);
  link.appendChild(buttonText);

  // Append the link to the link wrapper
  linkWrapper.appendChild(link);

  // Append the link wrapper to the link container
  linkContainer.appendChild(linkWrapper);

  // Append the link container to the text container
  textContainer.appendChild(linkContainer);

  // Append the text container to the banner content
  bannerContent.appendChild(textContainer);

  // Clear the original block content and append the new banner content
  block.innerHTML = ''; // Clear existing content
  block.appendChild(bannerContent); // Append the newly created banner content

  // Call the decorateButtons function to potentially enhance any buttons
  decorateButtons(block); // This function might be responsible for adding extra button behavior
}
