export default function decorate(block) {
    // Add decoration class
    block.classList.add('decorated');
    
    try {
      // Get containers using destructuring
      const containerDiv = block.querySelector('div');
      if (!containerDiv) {
        throw new Error('Container div not found');
      }
  
      const [, videoContainer] = Array.from(containerDiv.children);
      if (!videoContainer) {
        throw new Error('Video container not found');
      }
  
      // Only proceed if there's no picture element already present
      if (!block.querySelector('picture')) {
        // Get video URL from anchor tag
        const videoLink = videoContainer.querySelector('a');
        if (!videoLink) {
          throw new Error('Video link not found');
        }
        
        const videoHref = videoLink.getAttribute('href');
        if (!videoHref) {
          throw new Error('Video href not found');
        }
  
        // Create video element with source
        const videoElement = document.createElement('video');
        const sourceElement = document.createElement('source');
        
        // Set source attributes
        sourceElement.setAttribute('src', videoHref);
        sourceElement.setAttribute('type', 'video/mp4');
        
        // Set video attributes
        videoElement.setAttribute('autoplay', '');
        videoElement.setAttribute('muted', '');
        videoElement.setAttribute('loop', '');
        videoElement.setAttribute('id', 'myVideo');
        videoElement.classList.add('background-video'); // Added class for styling
        
        // Append source to video
        videoElement.appendChild(sourceElement);
        
        // Clear and update video container
        videoContainer.innerHTML = '';
        videoContainer.appendChild(videoElement);
      }
    } catch (error) {
      console.error('Error in block decoration:', error);
    }
    
    // Center the content overlay on the video background
    document.addEventListener("DOMContentLoaded", function() {
      const content = document.querySelector(".product-hero.vidbg .content");
      const container = document.querySelector(".product-hero.vidbg");
      
      function centerContent() {
        const containerHeight = container.clientHeight;
        const contentHeight = content.clientHeight;
        content.style.top = ((containerHeight - contentHeight) / 2) + "px";
        content.style.position = "relative";
      }
      
      centerContent();
      window.addEventListener("resize", centerContent);
    });
  }
  