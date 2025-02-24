import { decorateButtons } from '../../scripts/aem.js';

// Main decorate function
export default function decorate(block) {
  // Extract the alignment information from the block's data attribute
  const position = block.querySelector('div[data-align]').getAttribute('data-align');

  // Create a wrapper div for the summary with a dynamic class based on the position
  const summaryContent = document.createElement('div');
  summaryContent.className = `summary summary-${position}`;

  // Create a header section for the summary content
  const header = document.createElement('div');
  header.className = 'summary-header';

  // Extract the summary title (h2) and append it to the header if it exists
  const summaryTitle = block.querySelector('h2');
  if (summaryTitle) {
    header.appendChild(summaryTitle);
  }

  // Extract the summary description paragraph and append it to the header if it exists
  const summaryDescription = block.querySelector('p.summary-description');
  if (summaryDescription) {
    summaryDescription.classList.add('summary-description');
    header.appendChild(summaryDescription);
  }

  // Append the header section to the summary content
  summaryContent.appendChild(header);

  // Create the content section for the summary
  const content = document.createElement('div');
  content.className = 'summary-content';

  /* Extract the div with the data-align attribute,then append all<p>elements except 
  for the summary description */
  const align = block.querySelector('div[data-align]');
  if (align) {
    // For each paragraph<p>that is not the summary description,create a new<p>element and append it
    align.querySelectorAll('p:not(.summary-description)').forEach((p) => {
      const text = document.createElement('p');
      text.innerHTML = p.innerHTML; // Use innerHTML to preserve the content
      content.appendChild(text); // Append the new paragraph to the content section
    });
  }

  // Append the content section to the summary content wrapper
  summaryContent.appendChild(content);

  // Clear the original block's content and replace it with the new summary content
  block.innerHTML = '';
  block.appendChild(summaryContent);

  // Call the decorateButtons function to potentially enhance any buttons in the block
  decorateButtons(block);
}
