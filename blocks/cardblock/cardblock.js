export default function decorate(block) {
  // Extract card data from the block
  const cardData = Array.from(block.querySelectorAll(':scope > div')).map((card) => ({
    imgSrc: card.querySelector('picture source[type="image/jpeg"]').srcset,
    imgAlt: card.querySelector('img').alt,
    title: card.querySelector('h3')
      ? card.querySelector('h3').textContent
      : card.querySelector('p').textContent,
    description: card.querySelector('p + p').textContent,
  }));

  // Get authored content from <h2>
  const authoredContent = block.querySelector('h2')?.textContent || '';

  // Get CTA content
  const ctaText = block.querySelector('.cta-button')?.textContent || '';
  const ctaUrl = block.querySelector('.cta-button')?.href || '';

  // Generate HTML structure for the carousel
  block.innerHTML = `
    <p class="authored-content">${authoredContent}</p>
    <div class="cardblock-carousel">
      <button class="carousel-prev" aria-label="Previous card">◀</button>
      <div class="cardblock-cards">
        ${cardData
    .map(
      ({
        imgSrc,
        imgAlt,
        title,
        description,
      }) => `
          <div class="cardblock-card">
            <a href="${ctaUrl}">
              <img src="${imgSrc}" alt="${imgAlt}" />
            </a>
            <h3>${title}</h3>
            <p>${description}</p>
          </div>
        `,
    )
    .join('')}
      </div>
      <button class="carousel-next" aria-label="Next card">▶</button>
    </div>
    ${ctaText ? `<a href="${ctaUrl}" class="cta-button">${ctaText}</a>` : ''}
  `;

  let currentIndex = 0;

  /**
   * Updates the visibility of cards in the carousel
   */
  function updateCards() {
    const cards = block.querySelectorAll('.cardblock-card');
    const totalCards = cards.length;

    cards.forEach((card, index) => {
      if (totalCards <= 3) {
        card.style.display = 'block';
      } else if (currentIndex >= totalCards - 3) {
        card.style.display = index >= totalCards - 3 ? 'block' : 'none';
      } else if (currentIndex === 0) {
        card.style.display = index < 3 ? 'block' : 'none';
      } else {
        card.style.display = index >= currentIndex && index < currentIndex + 3 ? 'block' : 'none';
      }
    });
  }

  /**
   * Moves the carousel to the previous set of cards
   */
  block.querySelector('.carousel-prev').addEventListener('click', () => {
    currentIndex = currentIndex === 0 ? cardData.length - 3 : currentIndex - 1;
    if (currentIndex < 0) currentIndex = 0;
    updateCards();
  });

  /**
   * Moves the carousel to the next set of cards
   */
  block.querySelector('.carousel-next').addEventListener('click', () => {
    currentIndex = currentIndex + 1 >= cardData.length ? 0 : currentIndex + 1;
    updateCards();
  });

  // Initialize carousel display
  updateCards();
}
