export default async function decorate(block) {
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
    iconImage.className = 'tab-media';
    iconImage.src = tab.querySelector('img').src;
    tabButton.appendChild(iconImage);

    // Add text to the tab button
    const text = document.createElement('span');
    text.className = 'tab-title';
    text.textContent = tab.children[0].textContent;
    tabButton.appendChild(text);

    // Create the content section for the tab
    const tabContent = document.createElement('div');
    tabContent.className = 'tab-content';
    tabContent.setAttribute('data-index', index);
    tabContent.style.display = 'none';

    // Transform the href to video tags if the tab contains a link
    const videoLink = tab.querySelector('a');
    if (videoLink) {
      const video = document.createElement('video');
      video.src = videoLink.href;
      video.controls = true;
      video.loop = true; // Set the video to loop
      video.className = 'tab-video';
      video.muted = true; // Set the video to muted for autoplay
      tabContent.appendChild(video);

      // Add animation events to the video
      video.addEventListener('play', () => {
        video.classList.add('video-start-animation');
        const ctaLink = tabContent.querySelector('.cta-url');
        if (ctaLink) {
          ctaLink.classList.add('cta-link-show');
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
    ctaLink.className = 'cta-url';
    ctaLink.href = tab.querySelector('a').href;
    ctaLink.textContent = 'CTALink';
    tabContent.appendChild(ctaLink);

    // Append the tab button to the tabs container
    tabsContainer.appendChild(tabButton);

    // Append the content to the content container
    contentContainer.appendChild(tabContent);

    // Add click functionality for tab buttons
    tabButton.addEventListener('click', () => {
      // Update the active state of the tabs and their content
      document.querySelectorAll('.tab-button').forEach((button, btnIndex) => {
        button.classList.toggle('active', btnIndex === index);
      });

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
    });

    // Add hover functionality to reset previous active tab
    tabButton.addEventListener('mouseover', () => {
      if (!tabButton.classList.contains('active')) {
        tabButton.classList.add('hovered');
      }
    });

    tabButton.addEventListener('mouseout', () => {
      tabButton.classList.remove('hovered');
    });
  });

  // Clear the original block content
  block.innerHTML = '';

  // Append the new structure to the block
  tabsWrapper.appendChild(tabsContainer);
  block.appendChild(tabsWrapper);
  block.appendChild(contentContainer);

  // Trigger click on the first tab button to make the first tab active by default
  const firstTabButton = tabsContainer.querySelector('.tab-button');
  if (firstTabButton) {
    firstTabButton.click();
  }
}
