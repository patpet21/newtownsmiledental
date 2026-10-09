const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');

const updateHeader = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 40);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('is-open', !open);
  document.body.classList.toggle('menu-open', !open);
});

document.querySelectorAll('.primary-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav?.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const form = document.querySelector('.concierge-form');
const steps = [...document.querySelectorAll('.form-step')];
const progressBar = document.querySelector('.progress-line i');
const progressCount = document.querySelector('.progress-count b');
let currentStep = 1;

function showStep(step) {
  currentStep = Math.max(1, Math.min(step, steps.length));
  steps.forEach(section => {
    section.classList.toggle('is-active', Number(section.dataset.step) === currentStep);
  });
  if (progressBar) progressBar.style.width = (currentStep / steps.length * 100) + '%';
  if (progressCount) progressCount.textContent = String(currentStep).padStart(2, '0');
  form?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function validateStep(step) {
  const section = document.querySelector('.form-step[data-step="' + step + '"]');
  if (!section) return true;
  const requiredFields = [...section.querySelectorAll('[required]')];
  for (const field of requiredFields) {
    if (field.type === 'radio') {
      const checked = section.querySelector('input[name="' + field.name + '"]:checked');
      if (!checked) {
        const firstChoice = section.querySelector('.choice-card');
        firstChoice?.animate(
          [{ transform:'translateX(0)' },{ transform:'translateX(-5px)' },{ transform:'translateX(5px)' },{ transform:'translateX(0)' }],
          { duration:260 }
        );
        return false;
      }
    } else if (!field.checkValidity()) {
      field.reportValidity();
      return false;
    }
  }
  return true;
}

document.querySelectorAll('.next-step').forEach(button => {
  button.addEventListener('click', () => {
    if (validateStep(currentStep)) showStep(currentStep + 1);
  });
});

document.querySelectorAll('.prev-step').forEach(button => {
  button.addEventListener('click', () => showStep(currentStep - 1));
});

form?.addEventListener('submit', event => {
  if (!form.checkValidity()) {
    event.preventDefault();
    form.reportValidity();
    return;
  }
  const submit = form.querySelector('.submit-request');
  if (submit) {
    submit.disabled = true;
    submit.innerHTML = 'Sending…';
  }
});

const conciergeLaunch = document.querySelector('.concierge-launch');
const conciergePanel = document.querySelector('.concierge-panel');
const conciergeClose = document.querySelector('.concierge-close');
const conciergeResponse = document.querySelector('#concierge-response');

function setConcierge(open) {
  conciergePanel?.classList.toggle('is-open', open);
  conciergePanel?.setAttribute('aria-hidden', String(!open));
  conciergeLaunch?.setAttribute('aria-expanded', String(open));
}

conciergeLaunch?.addEventListener('click', () => {
  setConcierge(!conciergePanel?.classList.contains('is-open'));
});

conciergeClose?.addEventListener('click', () => setConcierge(false));

const conciergeCopy = {
  book: 'Absolutely. <a href="#appointment" data-close-concierge>Open the visit request →</a> and tell us what kind of appointment you need.',
  insurance: 'The office can help verify your plan. Enter only the <strong>insurance carrier name</strong> in the visit request, or call <a href="tel:+17183930100">718-393-0100</a>.',
  hours: '<strong>Monday–Friday:</strong> 9:30 AM–6:30 PM<br><strong>Saturday:</strong> 9:30 AM–3:30 PM<br><strong>Sunday:</strong> Closed',
  location: 'We’re at <strong>86-01 Justice Ave, Elmhurst, NY 11373</strong>. <a href="https://www.google.com/maps/dir/?api=1&destination=8601+Justice+Ave+Elmhurst+NY+11373" target="_blank" rel="noopener">Open directions ↗</a>',
  human: `
    <div class="concierge-contact-card">
      <div class="concierge-qr-block">
        <img src="/assets/phone-call-qr.svg" alt="QR code to call Newtown Smile Dental">
        <span>SCAN TO CALL</span>
      </div>
      <div class="concierge-contact-copy">
        <small>SPEAK WITH THE OFFICE</small>
        <strong>718.393.0100</strong>
        <p>Scan the QR code with your phone to start the call, or tap the button below.</p>
        <div class="concierge-contact-actions">
          <a class="concierge-call-btn" href="tel:+17183930100">Call now <span>↗</span></a>
          <a class="concierge-mail-link" href="mailto:newtownsmiledental@gmail.com">newtownsmiledental@gmail.com</a>
        </div>
      </div>
    </div>
  `
};

document.querySelectorAll('[data-concierge]').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.concierge;
    if (conciergeResponse) conciergeResponse.innerHTML = conciergeCopy[key] || '';
  });
});

document.addEventListener('click', event => {
  if (event.target.closest('[data-close-concierge]')) setConcierge(false);
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();