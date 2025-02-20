import { loadCSS } from '../../scripts/aem.js';

export default async function decorate(block) {
  // Load the CSS file for tabs
  await loadCSS('/blocks/tabs/tabs.css');

  // Create the tabs wrapper
  const tabsWrapper = document.createElement('div');
  tabsWrapper.className = 'tabs-wrapper';

  // Create the tabs container
  const tabsContainer = document.createElement('div');
  tabsContainer.className = 'tabs-container';

  // Create the content container
  const contentContainer = document.createElement('div');
  contentContainer.className = 'content-container';

  // Iterate over each tab element and set up the structure
  [...block.children].forEach((tab, index) => {
    // Create the tab button
    const tabButton = document.createElement('button');
    tabButton.className = 'tab-button';
    tabButton.setAttribute('data-index', index);

    // Add image icon to the tab button
    const iconImage = document.createElement('img');
    iconImage.className = 'icon-image';
    iconImage.src = tab.querySelector('img').src;
    tabButton.appendChild(iconImage);

    // Add text to the tab button
    const text = document.createElement('span');
    text.textContent = tab.children[0].textContent;
    tabButton.appendChild(text);

    // Create the content section for the tab
    const tabContent = document.createElement('div');
    tabContent.className = 'tab-content';
    tabContent.setAttribute('data-index', index);
    tabContent.style.display = 'none';

    // Transform the href to video tags
    const videoLink = tab.querySelector('a');
    if (videoLink) {
      const video = document.createElement('video');
      video.src = videoLink.href;
      video.controls = true;
      video.loop = true; // Set the video to loop
      video.className = 'tab-video';
      tabContent.appendChild(video);

      // Add animation events to the video
      video.addEventListener('play', () => {
        video.classList.add('video-start-animation');
        const ctaLink = tabContent.querySelector('.cta-link');
        if (ctaLink) {
          setTimeout(() => {
            ctaLink.classList.add('cta-link-show');
          }, 500); // Slight delay for the CTA link
        }
      });

      video.addEventListener('pause', () => {
        video.classList.remove('video-start-animation');
      });

      video.addEventListener('ended', () => {
        video.classList.remove('video-start-animation');
      });
    }

    // Create the CTA link
    const ctaLink = document.createElement('a');
    ctaLink.className = 'cta-link';
    ctaLink.href = tab.querySelector('a').href;
    ctaLink.textContent = 'CTALink';
    tabContent.appendChild(ctaLink);

    // Append the tab button to the tabs container
    tabsContainer.appendChild(tabButton);

    // Append the content to the content container
    contentContainer.appendChild(tabContent);

    // Add click functionality for tab buttons
    tabButton.addEventListener('click', () => {
      document.querySelectorAll('.tab-button').forEach((button, btnIndex) => {
        if (btnIndex == index) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }
      });

      document.querySelectorAll('.tab-content').forEach((content, contentIndex) => {
        if (contentIndex == index) {
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
    });

    // Add hover functionality to reset previous active tab
    tabButton.addEventListener('mouseover', () => {
      document.querySelectorAll('.tab-button.active').forEach((activeButton) => {
        if (activeButton !== tabButton) {
          activeButton.classList.add('hovered');
        }
      });

      if (tabButton.classList.contains('active')) {
        tabButton.classList.add('active-hover');
      }
    });

    tabButton.addEventListener('mouseout', () => {
      document.querySelectorAll('.tab-button.hovered').forEach((hoveredButton) => {
        hoveredButton.classList.remove('hovered');
      });

      if (tabButton.classList.contains('active-hover')) {
        tabButton.classList.remove('active-hover');
      }
    });
  });

  // Clear the original block content
  block.innerHTML = '';

  // Append the new structure to the block
  tabsWrapper.appendChild(tabsContainer);
  block.appendChild(tabsWrapper);
  block.appendChild(contentContainer);
}
