export function makeCounter(el, duration) {
  const target = parseInt(el.textContent, 10) || 0;
  if (!target) return;
  const start = performance.now();

  (function updateCounter(time) {
    const progress = Math.min((time - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(updateCounter);
  }(start));
}

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }

      if (block.classList.contains('metric')) {
        const counter = col.querySelector('h4');
        if (counter && !Number.isNaN(parseInt(counter.textContent, 10))) {
          window.addEventListener('load', () => makeCounter(counter, 3000));
        }
      }
    });
  });
}
