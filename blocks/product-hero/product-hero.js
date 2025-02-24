export default function decorate(block) {
  block.classList.add('decorated');
  
  try {
    // Retrieve the container div inside the block
    const containerDiv = block.querySelector('div');
    if (!containerDiv) throw new Error('Container div not found');
    
    // Get the second child element, expected to be the video container
    const videoContainer = containerDiv.children[1];
    if (!videoContainer) throw new Error('Video container not found');
    
    // If no <picture> element exists, process video embedding
    if (!block.querySelector('picture')) {
      const videoLink = videoContainer.querySelector('a');
      if (!videoLink) throw new Error('Video link not found');
      
      const videoHref = videoLink.getAttribute('href');
      if (!videoHref) throw new Error('Video href not found');
      
      // Create a video element with source
      const videoElement = document.createElement('video');
      videoElement.setAttribute('autoplay', '');
      videoElement.setAttribute('muted', '');
      videoElement.setAttribute('loop', '');
      videoElement.setAttribute('id', 'myVideo');
      videoElement.classList.add('background-video');
      
      const sourceElement = document.createElement('source');
      sourceElement.setAttribute('src', videoHref);
      sourceElement.setAttribute('type', 'video/mp4');
      videoElement.appendChild(sourceElement);
      
      // Replace existing content with video
      videoContainer.innerHTML = '';
      videoContainer.appendChild(videoElement);
    }
  } catch (error) {
    console.error('Error in block decoration:', error);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.product-hero.vidbg');
    const content = container?.querySelector('.content');
    if (!container || !content) return;

    function centerContent() {
      const containerHeight = container.clientHeight;
      const contentHeight = content.clientHeight;
      content.style.position = 'relative';
      content.style.top = `${(containerHeight - contentHeight) / 2}px`;
    }

    centerContent();
    window.addEventListener('resize', centerContent);
  });
}