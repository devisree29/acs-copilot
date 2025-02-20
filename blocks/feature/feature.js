import { loadCSS } from '../../scripts/aem.js';

export default async function decorate(block) {
  // Load the CSS file for tabs
  loadCSS('/blocks/feature/feature.css');

  const tabsContainer = document.createElement('div');
  tabsContainer.className = 'tabs-container';

  const contentContainer = document.createElement('div');
  contentContainer.className = 'content-container';

  const mediaContainer = document.createElement('div');
  mediaContainer.className = 'media-container';

  let hasMedia = false;
  let hasContent = false;

  [...block.children].forEach((tab, index) => {
    const tabHeader = document.createElement('div');
    tabHeader.className = 'tab-header';
    tabHeader.textContent = tab.children[0]?.textContent || `Tab ${index + 1}`;
    tabHeader.setAttribute('data-index', index);

    const tabContent = document.createElement('div');
    tabContent.className = 'tab-content';
    tabContent.setAttribute('data-index', index);
    tabContent.style.display = 'none';

    const tabMedia = document.createElement('div');
    tabMedia.className = 'tab-Media';
    // Corrected code to locate the picture element correctly within the tab itself
    const pic = tab.querySelector('picture');
    if (pic) {
      tabMedia.append(pic);
      hasMedia = true;
    }
    tabMedia.setAttribute('data-index', index);

    const videoHref = tab.querySelector('a')?.getAttribute('href') || '';

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
    sourceElement.setAttribute('type', "video/mp4");
    videoElement.appendChild(sourceElement);
    videoContainer.appendChild(videoElement);
    tabContent.appendChild(videoContainer);
    tabsContainer.appendChild(tabHeader);
    // Correcting the condition to avoid appending empty divs
    if ((block.classList.contains('media-right') || block.classList.contains('media-left')) && pic) {
      mediaContainer.appendChild(tabMedia);
    } else if (videoHref) {
      contentContainer.appendChild(tabContent);
      hasContent = true;
    }

    tabHeader.addEventListener('click', () => {
      document.querySelectorAll('.tab-content').forEach((content, contentIndex) => {
        if (contentIndex === index) {
          content.style.display = 'block';
          const video = content.querySelector('video');
          if (video) {
            video.play();
          }
        } else {
          content.style.display = 'none';
          const video = content.querySelector('video');
          if (video) {
            video.pause();
            video.currentTime = 0;
          }
        }
      });

      document.querySelectorAll('.tab-header').forEach(header => header.classList.remove('active'));
      tabHeader.classList.add('active');
    });
  });

  block.innerHTML = '';
  block.appendChild(tabsContainer);

  if (hasContent) {
    block.appendChild(contentContainer);
  }

  if (hasMedia) {
    block.appendChild(mediaContainer);
  }

  const firstTabHeader = tabsContainer.querySelector('.tab-header');
  const firstTabContent = contentContainer.querySelector('.tab-content');
  const firstTabMedia = mediaContainer.querySelector('.tab-Media');

  if (firstTabHeader && firstTabContent) {
    firstTabHeader.classList.add('active');
    firstTabContent.style.display = 'block';
  } else if (firstTabHeader && firstTabMedia) {
    firstTabHeader.classList.add('active');
    firstTabMedia.style.display = 'block';
  }
}
