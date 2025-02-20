export default function decorate(block) {
    block.classList.add('decorated');
    try {
      const containerDiv = block.querySelector('div');
      if (!containerDiv) throw new Error('Container div not found');
      const [, videoContainer] = Array.from(containerDiv.children);
      if (!videoContainer) throw new Error('Video container not found');
      if (!block.querySelector('picture')) {
        const videoLink = videoContainer.querySelector('a');
        if (!videoLink) throw new Error('Video link not found');
        const videoHref = videoLink.getAttribute('href');
        if (!videoHref) throw new Error('Video href not found');
        const videoElement = document.createElement('video');
        const sourceElement = document.createElement('source');
        sourceElement.setAttribute('src', videoHref);
        sourceElement.setAttribute('type', 'video/mp4');
        videoElement.setAttribute('autoplay', '');
        videoElement.setAttribute('muted', '');
        videoElement.setAttribute('loop', '');
        videoElement.setAttribute('id', 'myVideo');
        videoElement.classList.add('background-video');
        videoElement.appendChild(sourceElement);
        videoContainer.innerHTML = '';
        videoContainer.appendChild(videoElement);
      }
    } catch (error) {
      console.error('Error in block decoration:', error);
    }
    document.addEventListener('DOMContentLoaded', () => {
      const content = document.querySelector('.product-hero.vidbg .content');
      const container = document.querySelector('.product-hero.vidbg');
      function centerContent() {
        const containerHeight = container.clientHeight;
        const contentHeight = content.clientHeight;
        content.style.top = `${(containerHeight - contentHeight) / 2}px`;
        content.style.position = 'relative';
      }
      centerContent();
      window.addEventListener('resize', centerContent);
    });
  }
  