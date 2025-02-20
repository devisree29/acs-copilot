import { decorateButtons } from '../../scripts/aem.js';
 
export default function decorate(block) {
  const position = block.querySelector('div[data-align]').getAttribute('data-align');
 
  const summaryContent = document.createElement('div');
  summaryContent.className = `summary summary-${position}`;
 
  const header = document.createElement('div');
  header.className = 'summary-header';
 
  const heading = block.querySelector('h2, h3, h4, h5, h6');
  if (heading) {
    header.appendChild(heading);
  }
  summaryContent.appendChild(header);
 
  const content = document.createElement('div');
  content.className = 'summary-content';
  const align = block.querySelector('div[data-align]');
  if (align) {
    align.querySelectorAll('p').forEach((p) => {
      const text = document.createElement('p');
      text.innerHTML = p.innerHTML;
      content.appendChild(text);
    });
  }
 
  summaryContent.appendChild(content);
  block.innerHTML = '';
  block.appendChild(summaryContent);
 
  decorateButtons(block);
}