import { createOptimizedPicture, decorateButtons, decorateIcons } from '../../scripts/aem.js';

export default function decorate(block) {
  const rows = Array.from(block.children);
  rows.forEach((row) => {
    const columns = Array.from(row.children);
    columns.forEach((column) => {
      const valign = column.dataset.valign || 'middle';

      // Wrap text nodes in <p> tags
      const textNodes = Array.from(column.childNodes).filter((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0);
      textNodes.forEach((textNode) => {
        const p = document.createElement('p');
        p.textContent = textNode.textContent.trim();
        column.replaceChild(p, textNode);
      });

      // Handle images
      const picture = column.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPicture = createOptimizedPicture(img.src, img.alt, img.loading === 'eager');
          column.replaceChild(optimizedPicture, picture);
        }
      }

      // Decorate buttons and icons
      decorateButtons(column);
      decorateIcons(column);

      column.classList.add(`valign-${valign}`);
    });
  });

  // Add classes for layout variations
  block.classList.add('feature');
  if (block.classList.contains('feature-left')) {
    block.classList.add('layout-left');
  } else if (block.classList.contains('feature-right')) {
    block.classList.add('layout-right');
  }

  // Add animation classes
  block.classList.add('animated-feature');
}
