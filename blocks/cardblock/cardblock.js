import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const cardData = Array.from(block.children[0].children).map((card) => ({
    picture: card.querySelector('picture'),
    title: card.querySelector('h2').textContent,
    description: card.querySelector('p:last-of-type').textContent,
  }));

  block.innerHTML = `
    <h1 class="cardblock-title">Card Block Section for All Products ACS Co Pilot</h1>
    <div class="cardblock-cards">
      ${cardData.map((card, index) => `
        <div class="cardblock-card">
          ${card.picture.outerHTML}
          <h2>${card.title}</h2>
          <p>${card.description}</p>
        </div>
      `).join('')}
    </div>
  `;
}
