export default function decorate(block) {
  const headingElement = block.querySelector("h2");

  const logos = [...block.querySelectorAll("picture")].map((picture) => ({
    src: picture.querySelector("img").src,
    alt: picture.querySelector("img").alt || "Logo",
  }));

  block.innerHTML = `
      <div class="logo-content">
        ${headingElement.outerHTML}
        <div class="logo-slideshow">
          ${logos
            .map(
              (logo) => `
            <div class="logo-card">
              <img src="${logo.src}" alt="${logo.alt}">
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
    `;

  // JavaScript for the infinite loop slideshow
  const slideshow = block.querySelector(".logo-slideshow");

  function createClones() {
    const cards = slideshow.querySelectorAll(".logo-card");
    cards.forEach((card) => {
      const clone = card.cloneNode(true);
      slideshow.appendChild(clone);
    });
  }

  createClones();

  function slideLogos() {
    let start = Date.now();
    const speed = 0.05; // Adjust the speed as necessary

    function frame() {
      const timePassed = Date.now() - start;
      slideshow.style.transform = `translateX(-${timePassed * speed}px)`;

      if (timePassed * speed >= slideshow.scrollWidth / 2) {
        start = Date.now();
        slideshow.style.transform = "translateX(0)";
      }

      requestAnimationFrame(frame);
    }

    frame();
  }

  slideLogos();

  // JavaScript for clicking the heading
  headingElement.addEventListener("click", () => {
    headingElement.classList.toggle("clicked");
  });
}
