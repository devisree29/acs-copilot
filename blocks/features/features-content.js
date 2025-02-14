export default function loadContent(block) {
  block.innerHTML = `
    <div class="feature feature-left">
      <div>
        <h2>Top Feature Title</h2>
        <p>This is a summary of the top feature. It provides an overview of the main benefits and key points that make this feature stand out.</p>
        <a class="button" href="#">Learn More</a>
      </div>
      <div>
        <picture>
          <source srcset="path/to/top-feature-image.webp" type="image/webp">
          <img src="path/to/top-feature-image.jpg" alt="Top Feature Image">
        </picture>
      </div>
    </div>
  `;
}
