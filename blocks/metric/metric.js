export function makeCounter(el, target, textBefore = '', textAfter = '', duration = 2000) {
  const start = performance.now();
  (function updateCounter(time) {
    const progress = Math.min((time - start) / duration, 1);
    el.textContent = `${textBefore}${Math.floor(progress * target)}${textAfter}`;
    if (progress < 1) requestAnimationFrame(updateCounter);
  }(start));
}

export default function decorate(block) {
  block.addEventListener(('mouseenter'), () => {
    [...block.children].forEach((row) => [...row.children].forEach((col) => {
      const counter = col.firstElementChild;
      const number = counter?.textContent.match(/\d+/);
      if (number) {
        const target = parseInt(number[0], 10);
        const textBefore = counter.textContent.split(number[0])[0];
        const textAfter = counter.textContent.split(number[0])[1];
        makeCounter(counter, target, textBefore, textAfter);
      }
    }));
  });
}
