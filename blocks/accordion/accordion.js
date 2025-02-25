export default function decorate(block) {
  // Create a container for the accordion
  const accordionContainer = document.createElement('div');
  accordionContainer.classList.add('accordion-container');
  // Loop through each child element of the block
  Array.from(block.children).forEach((child, index) => {
    if (index === 0) {
      // The first child is the main heading (FAQ Section)
      const mainHeader = document.createElement('div');
      mainHeader.classList.add('accordion-main-header'); // New class for FAQ Section heading
      const titleElement = child.querySelector('h1, h2, h3, h4, h5, h6');
      if (titleElement) {
        mainHeader.innerHTML = `<span class="accordion-title">${titleElement.innerHTML}</span>`;
      }
      accordionContainer.appendChild(mainHeader);
    } else {
      // The rest are accordion items
      const item = document.createElement('div');
      item.classList.add('accordion-item');
      const headers = child.querySelectorAll('div[data-valign="middle"]');
      if (headers.length >= 2) {
        const itemHeader = document.createElement('div');
        itemHeader.classList.add('accordion-header'); // Clickable header for items
        itemHeader.innerHTML = `
          <span class="accordion-title">${headers[0].innerHTML}</span>
          <span class="accordion-icon">+</span>
        `;
        const itemContent = document.createElement('div');
        itemContent.classList.add('accordion-content');
        itemContent.innerHTML = headers[1].innerHTML;
        item.appendChild(itemHeader);
        item.appendChild(itemContent);
      }
      accordionContainer.appendChild(item);
    }
  });
  // Replace original block content with the new accordion structure
  block.innerHTML = '';
  block.appendChild(accordionContainer);
  // Add event listeners only to the accordion items (not the main heading)
  accordionContainer.addEventListener('click', (event) => {
    const header = event.target.closest('.accordion-header');
    if (!header) return; // Ignore clicks outside accordion items

    const content = header.nextElementSibling;
    const icon = header.querySelector('.accordion-icon');
    const isExpanded = content.style.display === 'block';

    content.style.display = isExpanded ? 'none' : 'block';
    icon.textContent = isExpanded ? '+' : '-';
});
}
