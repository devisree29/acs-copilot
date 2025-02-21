export default function decorate(block) {
  const cardData = Array.from(block.querySelectorAll(':scope > div')).map((card) => ({
    imgSrc: card.querySelector('picture source[type="image/jpeg"]').srcset,
    imgAlt: card.querySelector('img').alt,
    title: card.querySelector('p strong').textContent,
    description: card.querySelector('p + p').textContent,
  }));

  block.innerHTML = `
    <h2>Card Block Section for All Products ACS Co Pilot</h2>
    <div class="cardblock-carousel">
      <button class="carousel-prev" aria-label="Previous card">◀</button>
      <div class="cardblock-cards">
      ${cardData.map((card) => `
        <div class="cardblock-card">
          <img src="${card.imgSrc}" alt="${card.imgAlt}" />
          <h3>${card.title}</h3>
          <p>${card.description}</p>
        </div>
      `).join('')}
      </div>
      <button class="carousel-next" aria-label="Next card">▶</button>
    </div>
  `;

  const cardsContainer = block.querySelector('.cardblock-cards');
  let currentIndex = 0;

  function updateCards() {
    const cards = block.querySelectorAll('.cardblock-card');
    cards.forEach((card, index) => {
      card.style.display = index >= currentIndex && index < currentIndex + 3 ? 'block' : 'none';
    });
  }

  block.querySelector('.carousel-prev').addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? cardData.length - 1 : currentIndex - 1;
    updateCards();
  });

  block.querySelector('.carousel-next').addEventListener('click', () => {
    currentIndex = (currentIndex + 3 >= cardData.length) ? 0 : currentIndex + 1;
    updateCards();
  });

  updateCards();
}
