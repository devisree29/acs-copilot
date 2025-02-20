document.addEventListener('DOMContentLoaded', () => {
  // Function to convert a tag inside .button-container to video
  const convertButtonContainerToVideo = () => {
    const buttonContainer = document.querySelector('.button-container');

    if (buttonContainer) {
      // Find the first child element within the button-container
      const childElement = buttonContainer.firstElementChild;

      if (childElement) {
        // Create a new video element
        const videoTag = document.createElement('video');
        videoTag.setAttribute('controls', '');
        videoTag.setAttribute('autoplay', '');
        videoTag.setAttribute('muted', ''); // Optional: To prevent audio from auto-playing

        // Create the source element for the video
        const sourceTag = document.createElement('source');
        sourceTag.setAttribute('src', childElement.getAttribute('href') || 'path_to_your_video.mp4'); // Replace with the actual video path if href is not available
        sourceTag.setAttribute('type', 'video/mp4');

        // Append the source to the video tag
        videoTag.appendChild(sourceTag);

        // Append a fallback message for browsers that do not support the video tag
        videoTag.appendChild(document.createTextNode('Your browser does not support the video tag.'));

        // Replace the existing child element with the new video tag
        buttonContainer.replaceChild(videoTag, childElement);
      }
    }
  };

  // Function to ensure the first video in .content-container plays
  const ensureFirstVideoPlays = () => {
    const contentContainer = document.querySelector('.content-container');

    if (contentContainer) {
      const firstVideo = contentContainer.querySelector('video');

      if (firstVideo) {
        firstVideo.play().catch(error => {
          console.error('Error trying to play the video:', error);
        });
      }
    }
  };

  // Execute the functions
  convertButtonContainerToVideo();
  ensureFirstVideoPlays();
});
