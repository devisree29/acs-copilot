export default function decorate(block) {
  const logos = [...block.querySelectorAll('picture')].map((picture) => ({
    src: picture.querySelector('img').src,
    alt: picture.querySelector('img').alt || 'Logo',
  }));

  block.innerHTML = `
    <div class="logo-header">
      <h2>Logo Section for Project Logo Implementation</h2>
    </div>
    <div class="logo-container">
      ${logos.map((logo) => `<img src="${logo.src}" alt="${logo.alt}">`).join('')}
    </div>
  `;
}
