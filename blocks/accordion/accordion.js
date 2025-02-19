import { toClassName } from '../../scripts/aem.js';
 
export default function decorate(block) {
  // Create a container for the accordion
  const accordionContainer = document.createElement('div');
  accordionContainer.classList.add('accordion-container');
 
  // Loop through each child element of the block
  [...block.children].forEach((child, index) => {
    if (index === 0) {
      // The first child is the header
      const header = document.createElement('div');
      header.classList.add('accordion-header');
      const title = child.querySelector('h3');
      if (title) {
        header.innerHTML = `<span class="accordion-title">${title.innerHTML}</span><span class="accordion-icon">+</span>`;
      }
      accordionContainer.appendChild(header);
    } else {
      // The rest are accordion items
      const item = document.createElement('div');
      item.classList.add('accordion-item');
 
      const headers = child.querySelectorAll('div[data-valign="middle"]');
      if (headers.length === 2) {
        const itemHeader = document.createElement('div');
        itemHeader.classList.add('accordion-header');
        itemHeader.innerHTML = `<span class="accordion-title">${headers[0].innerHTML}</span><span class="accordion-icon">+</span>`;
        item.appendChild(itemHeader);
 
        const itemContent = document.createElement('div');
        itemContent.classList.add('accordion-content');
        itemContent.innerHTML = headers[1].innerHTML;
        item.appendChild(itemContent);
      }
 
      accordionContainer.appendChild(item);
    }
  });
 
  // Replace original block content with the new accordion structure
  block.innerHTML = '';
  block.appendChild(accordionContainer);
 
  // Add event listeners for accordion functionality
  accordionContainer.addEventListener('click', (event) => {
    const header = event.target.closest('.accordion-header');
    if (!header) return;
 
    const item = header.parentElement;
    const content = item.querySelector('.accordion-content');
    const icon = item.querySelector('.accordion-icon');
 
    const isExpanded = content.style.display === 'block';
    content.style.display = isExpanded ? 'none' : 'block';
    icon.textContent = isExpanded ? '+' : '-';
  });
}
 
 