export default async function decorate(block) {
  // Create containers for text, content, and media
  const textContainer = document.createElement('div');
  textContainer.className = 'text-container';

  const contentContainer = document.createElement('div');
  contentContainer.className = 'content-container';

  const mediaContainer = document.createElement('div');
  mediaContainer.className = 'media-container';

  // Flags to check if content and media are present
  let hasMedia = false;
  let hasContent = false;

  // Loop through each feature block child
  [...block.children].forEach((feature, index) => {
    // Create and set up the feature header
    const featureHeader = document.createElement('div');
    featureHeader.className = 'feature-header';
    featureHeader.textContent = feature.children[0]?.textContent || `Feature ${index + 1}`;
    featureHeader.setAttribute('data-index', index);

    // Create and set up the feature description
    const featureDescription = document.createElement('div');
    featureDescription.className = 'feature-description';
    featureDescription.setAttribute('data-index', index);
    featureDescription.style.display = 'none';

    // Create and set up the feature media
    const featureMedia = document.createElement('div');
    featureMedia.className = 'feature-media';
    const pic = feature.querySelector('picture');
    if (pic) {
      featureMedia.append(pic);
      hasMedia = true;
    }
    featureMedia.setAttribute('data-index', index);

    // Create and set up the video container
    const videoHref = feature.querySelector('a')?.getAttribute('href') || '';
    const videoContainer = document.createElement('div');
    videoContainer.classList.add('video-container');

    const videoElement = document.createElement('video');
    videoElement.setAttribute('playsinline', '');
    videoElement.setAttribute('controls', '');
    videoElement.style.width = '100%';
    videoElement.style.borderRadius = '10px';
    videoElement.style.cursor = 'pointer';

    const sourceElement = document.createElement('source');
    sourceElement.setAttribute('src', videoHref);
    sourceElement.setAttribute('type', 'video/mp4');

    videoElement.appendChild(sourceElement);
    videoContainer.appendChild(videoElement);
    featureDescription.appendChild(videoContainer);

    // Append the feature header to the text container
    textContainer.appendChild(featureHeader);

    // Append media or content based on conditions
    if ((block.classList.contains('media-right') || block.classList.contains('media-left')) && pic) {
      mediaContainer.appendChild(featureMedia);
    } else if (videoHref) {
      contentContainer.appendChild(featureDescription);
      hasContent = true;
    }

    // Add click event listener to the feature header
    featureHeader.addEventListener('click', () => {
      document.querySelectorAll('.feature-description').forEach((description, contentIndex) => {
        if (contentIndex === index) {
          description.style.display = 'block';
          const video = description.querySelector('video');
          if (video) {
            video.play();
          }
        } else {
          description.style.display = 'none';
          const video = description.querySelector('video');
          if (video) {
            video.pause();
            video.currentTime = 0;
          }
        }
      });

      document.querySelectorAll('.feature-header').forEach((header) => {
        header.classList.remove('active');
      });
      featureHeader.classList.add('active');
    });
  });

  // Clear the original block content and append new containers
  block.innerHTML = '';
  block.appendChild(textContainer);
  if (hasContent) {
    block.appendChild(contentContainer);
  }
  if (hasMedia) {
    block.appendChild(mediaContainer);
  }

  // Set the first feature as active
  const firstFeatureHeader = textContainer.querySelector('.feature-header');
  const firstFeatureDescription = contentContainer.querySelector('.feature-description');
  const firstFeatureMedia = mediaContainer.querySelector('.feature-media');
  if (firstFeatureHeader && firstFeatureDescription) {
    firstFeatureHeader.classList.add('active');
    firstFeatureDescription.style.display = 'block';
  } else if (firstFeatureHeader && firstFeatureMedia) {
    firstFeatureHeader.classList.add('active');
    firstFeatureMedia.style.display = 'block';
  }
}
