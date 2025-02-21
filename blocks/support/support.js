import createField from './form-fields.js';

async function createForm(formHref) {
  const { pathname } = new URL(formHref);
  const resp = await fetch(pathname);
  const json = await resp.json();
  const form = document.createElement('form');
  const fields = await Promise.all(json.data.map((fd) => createField(fd, form)));
  fields.forEach((field) => {
    if (field) {
      form.append(field);
    }
  });

  return form;
}
function generatePayload(form) {
  const payload = {};

  [...form.elements].forEach((field) => {
    if (field.name && field.type !== 'submit' && !field.disabled) {
      if (field.type === 'radio') {
        if (field.checked) payload[field.name] = field.value;
      } else if (field.type === 'checkbox') {
        if (field.checked) {
          payload[field.name] = payload[field.name] ? `${payload[field.name]},${field.value}` : field.value;
        }
      } else {
        payload[field.name] = field.value;
      }
    }
  });

  return payload;
}
async function handleSubmit(form) {
  if (form.getAttribute('data-submitting') === 'true') return;

  const submit = form.querySelector('button[type="submit"]');
  try {
    form.setAttribute('data-submitting', 'true');
    submit.disabled = true;

    // Create payload
    const payload = generatePayload(form);
    const response = await fetch(form.dataset.action, {
      method: 'POST',
      body: JSON.stringify({ data: payload }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      if (form.dataset.confirmation) {
        window.location.href = form.dataset.confirmation;
      }
    } else {
      const error = await response.text();
      throw new Error(error);
    }
  } 
  catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
  finally {
    form.setAttribute('data-submitting', 'false');
    submit.disabled = false;
  }
}
export default async function decorate(block) {
  const links = [...block.querySelectorAll('a')].map((a) => a.href);
  const formLink = links.find((link) => link.startsWith(window.location.origin) && link.endsWith('.json'));
  const submitLink = links.find((link) => link !== formLink);
  let hash = window.location.hash.substring(1);
  const path = window.location.pathname;

  if (!formLink || !submitLink) return;

  // List of valid sections
  const validSections = ['contact-us', 'feedback', 'featurerequest', 'bugreport'];

  // If no hash is present on /draft/support, force it to #contact-us
  if (path === '/draft/support' && !hash) {
    hash = 'contact-us';
    window.location.hash = '#contact-us';
  }

  // Load the appropriate form if the hash is valid
  if (validSections.includes(hash) && formLink.includes(hash)) {
    const form = await createForm(formLink, submitLink);

    // Create and append heading and paragraph elements
    const heading = document.createElement('h1');
    heading.textContent = block.querySelector('h1')?.textContent || 'Support Form';

    const paragraph = document.createElement('p');
    paragraph.textContent = block.querySelector('p')?.textContent || 'Please fill out the form below.';

    form.prepend(paragraph);
    form.prepend(heading);

    block.replaceChildren(form);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (form.checkValidity()) {
        handleSubmit(form);
      } else {
        const firstInvalidEl = form.querySelector(':invalid:not(fieldset)');
        if (firstInvalidEl) {
          firstInvalidEl.focus();
          firstInvalidEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  } else {
    block.textContent = ''; // Clear content if an invalid section is detected
  }
}
