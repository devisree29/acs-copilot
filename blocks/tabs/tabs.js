import { decorateIcons } from '../../scripts/aem.js';

export default async function decorate(block) {
  const tabsData = [...block.children].map((tab) => ({
    title: tab.children[0].textContent.trim(),
    link: tab.children[1].querySelector('a').href,
  }));

  const tabsListHtml = tabsData.map((tab, index) => `
    <li class="tab-item">
      <a href="${tab.link}" class="tab-link ${index === 0 ? 'active' : ''}">
        <i class="icon icon-product${index + 1}" aria-hidden="true"></i>
        <span class="tab-text">${tab.title}</span>
      </a>
    </li>
  `).join('');

  block.innerHTML = `<ul class="tabs-list">${tabsListHtml}</ul>`;

  decorateIcons(block);
}
