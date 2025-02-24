export default function decorate(block) {
  // Extract the main title for the accordion section
  const accordionTitle = block.querySelector('h1, h2, h3, h4, h5, h6');

  // Create a container for the accordion
  const accordionContainer = document.createElement('div');
  accordionContainer.classList.add('accordion-container');

  // Function to create accordion items
  const createAccordionItem = (title, content) => {
    const item = document.createElement('div');
    item.classList.add('accordion-item');

    const itemHeader = document.createElement('div');
    itemHeader.classList.add('accordion-header');
    itemHeader.innerHTML = `<span class="accordion-title">${title}</span><span class="accordion-icon">+</span>`;
    item.appendChild(itemHeader);

    const itemContentDiv = document.createElement('div');
    itemContentDiv.classList.add('accordion-content');
    itemContentDiv.innerHTML = content;
    item.appendChild(itemContentDiv);

    return item;
  };

  // Loop through each child element of the block
  [...block.children].forEach((child, index) => {
    if (index === 0 && accordionTitle) {
      // The first child is the header (e.g., FAQ section)
      const header = document.createElement('div');
      header.classList.add('accordion-header');
      header.innerHTML = `<span class="accordion-title">${accordionTitle.innerHTML}</span>`;
      accordionContainer.appendChild(header);
    } else {
      // The rest are accordion items
      const headers = child.querySelectorAll('div[data-valign="middle"]');
      if (headers.length === 2) {
        const itemTitle = headers[0].innerHTML;
        const itemContent = headers[1].innerHTML;
        const item = createAccordionItem(itemTitle, itemContent);
        accordionContainer.appendChild(item);
      }
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
    if (icon) {
      icon.textContent = isExpanded ? '+' : '-';
    }
    // Optionally, toggle aria-expanded attribute for accessibility
    header.setAttribute('aria-expanded', !isExpanded);
  });
}
