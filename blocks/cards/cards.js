export default function decorate(block) {
  // Extract card data from the block
  const cardData = Array.from(block.querySelectorAll(':scope > div')).map((card) => ({
    cardImage: card.querySelector('picture source')?.srcset || card.querySelector('img')?.src || '',
    cardHeading: card.querySelector('h3')?.textContent || card.querySelector('p')?.textContent || '',
    cardDescription: card.querySelector('p:nth-of-type(2)')?.textContent || '',
    cardLink: card.querySelector('a')?.href || '#',
    cardText: card.querySelector('a')?.textContent || '',
  }));

  // Create the main container
  const container = document.createElement('div');
  container.className = 'cards-container';

  // Create the main carousel wrapper
  const carouselWrapper = document.createElement('div');
  carouselWrapper.className = 'cards-carousel';

  // Create the cards container
  const cardsContainer = document.createElement('div');
  cardsContainer.className = 'cards-cards';

  // Populate the cards
  cardData.forEach(({
    cardImage,
    cardHeading,
    cardDescription,
    cardLink,
    cardText,
  }) => {
    const card = document.createElement('div');
    card.className = 'cards-card';

    const image = document.createElement('img');
    image.src = cardImage;
    image.alt = cardText;
    image.className = 'card-image';
    image.style.cursor = 'pointer';
    image.addEventListener('click', () => {
      window.location.href = cardLink;
    });

    const heading = document.createElement('h3');
    heading.textContent = cardHeading;

    const description = document.createElement('p');
    description.textContent = cardDescription;

    card.appendChild(image);
    card.appendChild(heading);
    card.appendChild(description);
    cardsContainer.appendChild(card);
  });

  // Create previous and next buttons dynamically
  const prevButton = document.createElement('button');
  prevButton.className = 'carousel-prev';
  prevButton.setAttribute('aria-label', 'Previous');
  prevButton.setAttribute('data-direction', 'prev');

  const nextButton = document.createElement('button');
  nextButton.className = 'carousel-next';
  nextButton.setAttribute('aria-label', 'Next');
  nextButton.setAttribute('data-direction', 'next');

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
    cards.forEach((card) => {
      card.style.display = 'none';
    });

    for (let i = 0; i < 3; i += 1) {
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
