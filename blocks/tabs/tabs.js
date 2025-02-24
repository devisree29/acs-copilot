export default async function decorate(block) {
  console.time('decorate-function');

  // Create the tabs wrapper
  console.time('create-tabs-wrapper');
  const tabsWrapper = document.createElement('div');
  tabsWrapper.className = 'tabs-wrapper';
  console.timeEnd('create-tabs-wrapper');

  // Create the tabs container
  console.time('create-tabs-container');
  const tabsContainer = document.createElement('div');
  tabsContainer.className = 'tabs-container';
  console.timeEnd('create-tabs-container');

  // Create the content container
  console.time('create-content-container');
  const contentContainer = document.createElement('div');
  contentContainer.className = 'content-container';
  console.timeEnd('create-content-container');

  // Store all the tab buttons and contents in arrays for efficient access
  const tabButtons = [];
  const tabContents = [];

  // Iterate over each tab element and set up the structure
  console.time('iterate-tabs');
  [...block.children].forEach((tab, index) => {
    console.time(`tab-${index}`);

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

    // Transform the href to video tags
    const videoLink = tab.querySelector('a');
    if (videoLink) {
      console.time(`video-${index}`);
      const video = document.createElement('video');
      video.src = videoLink.href;
      video.controls = true;
      video.loop = true; // Set the video to loop
      video.className = 'tab-video';
      video.muted = true; // Set the video to muted for autoplay
      tabContent.appendChild(video);
      console.timeEnd(`video-${index}`);

      // Add animation events to the video
      video.addEventListener('play', () => {
        video.classList.add('video-start-animation');
        const ctaLink = tabContent.querySelector('.cta-url');
        if (ctaLink) {
          setTimeout(() => {
            ctaLink.classList.add('cta-link-show');
          });  
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

    // Store tab button and content for later use
    tabButtons.push(tabButton);
    tabContents.push(tabContent);

    console.timeEnd(`tab-${index}`);
  });
  console.timeEnd('iterate-tabs');

  // Clear the original block content
  console.time('clear-original-content');
  block.innerHTML = '';
  console.timeEnd('clear-original-content');

  // Append the new structure to the block
  console.time('append-new-structure');
  tabsContainer.append(...tabButtons);
  contentContainer.append(...tabContents);
  tabsWrapper.appendChild(tabsContainer);
  block.appendChild(tabsWrapper);
  block.appendChild(contentContainer);
  console.timeEnd('append-new-structure');

  // Add click functionality for tab buttons
  console.time('add-click-functionality');
  tabButtons.forEach((tabButton, index) => {
    tabButton.addEventListener('click', () => {
      tabButtons.forEach((button, btnIndex) => {
        button.classList.toggle('active', btnIndex === index);
        tabContents[btnIndex].style.display = btnIndex === index ? 'block' : 'none';
        const video = tabContents[btnIndex].querySelector('video');
        if (video) {
          if (btnIndex === index) {
            video.play();
          } else {
            video.pause();
            video.currentTime = 0;
          }
        }
      });
    });

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
  console.timeEnd('add-click-functionality');

  // Trigger click on the first tab button to make the first tab active by default
  console.time('activate-first-tab');
  const firstTabButton = tabsContainer.querySelector('.tab-button');
  if (firstTabButton) {
    firstTabButton.click();
    // Ensure the video in the first tab starts playing
    const firstTabContent = contentContainer.querySelector('.tab-content');
    const firstVideo = firstTabContent.querySelector('video');
    if (firstVideo) {
      firstVideo.play();
    }
  }
  console.timeEnd('activate-first-tab');

  console.timeEnd('decorate-function');
}
