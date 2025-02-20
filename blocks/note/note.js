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
  block.innerHTML = '';
  block.appendChild(noteContent);
  decorateButtons(block);
}
