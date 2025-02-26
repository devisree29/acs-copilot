export default function decorate(block) {
  // Extract card data from the block
  const cardData = Array.from(block.querySelectorAll(':scope > div')).map((card) => ({
    cardImage: card.querySelector('picture source[type="image/jpeg"]')?.srcset || '',
    cardHeading: card.querySelector('h3')?.textContent || card.querySelector('p')?.textContent || '',
    cardDescription: card.querySelector('p + p')?.textContent || '',
  }));

  // Get authored content from <h2>
  const cardTitle = block.querySelector('h2')?.textContent || 'Card Block Section for All Products ACS Co Pilot';

  // Get CTA content
  const ctaText = block.querySelector('.cta-button')?.textContent || '';
  const ctaUrl = block.querySelector('.cta-button')?.href || '';

  // Create the main container
  const container = document.createElement('div');
  container.className = 'cards-container';

  // Add the authored content as a heading inside the container
  if (cardTitle) {
    const authoredContentElement = document.createElement('h2');
    authoredContentElement.className = 'authored-content';
    authoredContentElement.textContent = cardTitle;
    container.appendChild(authoredContentElement);
  }

  // Create the main carousel wrapper
  const carouselWrapper = document.createElement('div');
  carouselWrapper.className = 'cards-carousel';

  // Create the cards container
  const cardsContainer = document.createElement('div');
  cardsContainer.className = 'cards-cards';

  // Populate the cards
  cardData.forEach(({ cardImage, cardHeading, cardDescription }) => {
    const card = document.createElement('div');
    card.className = 'cards-card';

    card.innerHTML = `
      <a href="#">
        <img src="${cardImage}" alt="${cardHeading}" />
      </a>
      <h3>${cardHeading}</h3>
      <p>${cardDescription}</p>
    `;

    cardsContainer.appendChild(card);
  });

  // Create previous button dynamically
  const prevButton = document.createElement('button');
  prevButton.className = 'carousel-prev';
  prevButton.setAttribute('aria-label', 'Previous');

  const prevImg = document.createElement('img');
  prevImg.src = '/icons/left-arrow.svg'; // Make sure the path is correct
  prevImg.alt = 'Previous';
  prevButton.appendChild(prevImg);

  // Create next button dynamically
  const nextButton = document.createElement('button');
  nextButton.className = 'carousel-next';
  nextButton.setAttribute('aria-label', 'Next');

  const nextImg = document.createElement('img');
  nextImg.src = '/icons/right-arrow.svg'; // Make sure the path is correct
  nextImg.alt = 'Next';
  nextButton.appendChild(nextImg);

  // Append elements to the carousel wrapper
  carouselWrapper.appendChild(prevButton);
  carouselWrapper.appendChild(cardsContainer);
  carouselWrapper.appendChild(nextButton);

  // Append carousel wrapper to the main container
  container.appendChild(carouselWrapper);

  // Set the final HTML structure inside the block
  block.innerHTML = '';
  block.appendChild(container);

  // Select all cards
  const cards = block.querySelectorAll('.cards-card');
  let currentIndex = 0;
  const totalCards = cards.length;

  /**
   * Updates the visibility of cards in the carousel
   */
  function updateCards() {
    cards.forEach((card) => (card.style.display = 'none'));

    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % totalCards;
      cards[index].style.display = 'block';
    }
  }

  /**
   * Moves the carousel to the previous set of cards
   */
  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    updateCards();
  });

  /**
   * Moves the carousel to the next set of cards
   */
  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalCards;
    updateCards();
  });

  // Initialize carousel display
  updateCards();
}
