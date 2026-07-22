document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
    });
  }

  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 760 && nav) {
        nav.classList.remove('open');
        toggle?.setAttribute('aria-expanded', 'false');
      }
    });
  });

  const form = document.querySelector('.enquiry-form');
  if (form) {
    const status = document.querySelector('.status-message');
    form.addEventListener('submit', async event => {
      event.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const interest = (data.get('interest') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();

      if (!name || !email || !interest || !message) {
        if (status) {
          status.textContent = 'Please complete the required fields before sending your enquiry.';
        }
        return;
      }

      if (status) {
        status.textContent = 'Sending your enquiry...';
      }

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: {
            Accept: 'application/json'
          }
        });

        if (response.ok) {
          form.reset();
          if (status) {
            status.textContent = 'Thank you. Your enquiry has been sent successfully.';
          }
        } else {
          if (status) {
            status.textContent = 'There was a problem sending your enquiry. Please try again or email tuinabou@gmail.com directly.';
          }
        }
      } catch (error) {
        if (status) {
          status.textContent = 'Unable to send right now. Please try again later or email tuinabou@gmail.com directly.';
        }
      }
    });
  }
});
