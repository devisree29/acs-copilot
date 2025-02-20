import { decorateButtons } from '../../scripts/aem.js';
 
export default function decorate(block) {
  const noteContent = document.createElement('div');
  noteContent.className = 'note-content';
 
  const iconContainer = document.createElement('div');
  iconContainer.className = 'icon-container';
  const picture = block.querySelector('picture');
  if (picture) {
    picture.className = 'note-icon';
    iconContainer.appendChild(picture);
  }
  noteContent.appendChild(iconContainer);
 
  const textContainer = document.createElement('div');
  textContainer.className = 'text-container';
 
  const paragraph = document.createElement('p');
  paragraph.innerHTML = block.innerHTML.trim();
  textContainer.appendChild(paragraph);
 
  noteContent.appendChild(textContainer);
 
  const closeButton = document.createElement('button');
  closeButton.className = 'close-button';
  closeButton.innerHTML = '&times;';
  closeButton.addEventListener('click', () => {
    noteContent.style.display = 'none';
  });
  noteContent.appendChild(closeButton);
 
  block.innerHTML = '';
  block.appendChild(noteContent);
 
  decorateButtons(block);
}
 
document.addEventListener('DOMContentLoaded', function() {
 
  // Function to dynamically adjust text-container padding based on image size
  function adjustPadding() {
    const noteContent = document.querySelector('.note-content');
    const iconContainer = document.querySelector('.icon-container');
    const textContainer = document.querySelector('.text-container');
 
    if (iconContainer && textContainer) {
      const imageWidth = iconContainer.offsetWidth;
      textContainer.style.paddingLeft = `${imageWidth + 20}px`;
    }
  }
 
  // Adjust padding on window resize
  window.addEventListener('resize', adjustPadding);
 
  // Initial adjustment
  adjustPadding();
 
  // Function to handle link click events (if any specific action is required)
  function handleLinkClick(event) {
    event.preventDefault();
    const target = event.target;
    if (target.tagName === 'A') {
      alert(`You clicked on a link to ${target.href}`);
      // Add any additional actions here
    }
  }
 
  // Adding click event listener to links within text-container
  const textContainer = document.querySelector('.text-container');
  if (textContainer) {
    textContainer.addEventListener('click', handleLinkClick);
  }
});

