export default function decorate(block) {
  // Extract card data from the block
  const cardData = Array.from(block.querySelectorAll(':scope > div')).map((card) => {
    const imgElement = card.querySelector('img');

    return {
      cardImage:
        card.querySelector('picture source[type="image/jpeg"]')?.srcset || '',
      imgAlt: imgElement?.alt || '',
      cardHeading:
        card.querySelector('h3')?.textContent || card.querySelector('p')?.textContent || '',
      cardDescription: card.querySelector('p:nth-of-type(2)')?.textContent || ''
    };
  });

  // Get authored content from <h2>
  const cardTitle = block.querySelector('h2')?.textContent || '';

  // Get CTA content
  const ctaText = block.querySelector('.cta-button')?.textContent || '';
  const ctaUrl = block.querySelector('.cta-button')?.href || '';

  // Clear the block's inner HTML
  block.innerHTML = '';

  // Create and append title element
  if (cardTitle) {
    const titleElement = document.createElement('p');
    titleElement.className = 'cards-title';
    titleElement.textContent = cardTitle;
    block.appendChild(titleElement);
  }

  // Create carousel wrapper
  const carouselWrapper = document.createElement('div');
  carouselWrapper.className = 'cards-carousel';

  // Create previous button
  const prevButton = document.createElement('button');
  prevButton.className = 'carousel-prev';
  prevButton.setAttribute('aria-label', 'Previous cards');

  const prevImg = document.createElement('img');
  prevImg.src = '/icons/left-arrow.svg';
  prevImg.alt = 'Previous';

  prevButton.appendChild(prevImg);
  carouselWrapper.appendChild(prevButton);

  // Create cards wrapper
  const cardsWrapper = document.createElement('div');
  cardsWrapper.className = 'cards-cards';

  // Generate cards and append to cards wrapper
  cardData.forEach(({ cardImage, imgAlt, cardHeading, cardDescription }) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'cards-card';

    const cardLink = document.createElement('a');
    cardLink.href = ctaUrl;

    const cardImg = document.createElement('img');
    cardImg.src = cardImage;
    cardImg.alt = imgAlt;
    cardLink.appendChild(cardImg);

    const cardHeadingElement = document.createElement('h3');
    cardHeadingElement.textContent = cardHeading;

    const cardDescriptionElement = document.createElement('p');
    cardDescriptionElement.textContent = cardDescription;

    cardDiv.appendChild(cardLink);
    cardDiv.appendChild(cardHeadingElement);
    cardDiv.appendChild(cardDescriptionElement);

    cardsWrapper.appendChild(cardDiv);
  });

  carouselWrapper.appendChild(cardsWrapper);

  // Create next button
  const nextButton = document.createElement('button');
  nextButton.className = 'carousel-next';
  nextButton.setAttribute('aria-label', 'Next cards');

  const nextImg = document.createElement('img');
  nextImg.src = '/icons/right-arrow.svg';
  nextImg.alt = 'Next';

  nextButton.appendChild(nextImg);
  carouselWrapper.appendChild(nextButton);

  // Append carousel wrapper to block
  block.appendChild(carouselWrapper);

  // Create and append CTA button if exists
  if (ctaText) {
    const ctaButton = document.createElement('a');
    ctaButton.href = ctaUrl;
    ctaButton.className = 'cta-button';
    ctaButton.textContent = ctaText;
    block.appendChild(ctaButton);
  }

  let currentIndex = 0;
  const totalCards = cardData.length;

  /**
   * Updates the visibility of cards in the carousel
   */
  function updateCards() {
    const cards = block.querySelectorAll('.cards-card');
    cards.forEach((card) => {
      card.style.display = 'none';
    });

    for (let i = 0; i < 3; i += 1) {
      const index = (currentIndex + i) % totalCards;
      cards[index].style.display = 'block';
    }
  }

  /**
   * Moves the carousel to the previous set of 3 cards in a loop
   */
  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 3 + totalCards) % totalCards;
    updateCards();
  });

  /**
   * Moves the carousel to the next set of 3 cards in a loop
   */
  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 3) % totalCards;
    updateCards();
  });

  /**
   * Show all cards when CTA button is clicked (3 per row)
   */
  const ctaButton = block.querySelector('.cta-button');

  if (ctaButton) {
    ctaButton.addEventListener('click', (event) => {
      event.preventDefault();
      block.querySelectorAll('.cards-card').forEach((card) => {
        card.style.display = 'block';
      });
    });
  }

  // Initialize carousel display
  updateCards();
}
