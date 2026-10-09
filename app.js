const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('is-open', !open);
});

document.querySelectorAll('.primary-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav?.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const slides = [...document.querySelectorAll('.hero-slide')];
const dots = [...document.querySelectorAll('.hero-dot')];
let slideIndex = 0;
let heroTimer;

function showSlide(index) {
  slideIndex = index;
  slides.forEach((slide, i) => slide.classList.toggle('is-active', i === slideIndex));
  dots.forEach((dot, i) => dot.classList.toggle('is-active', i === slideIndex));
}

function startHero() {
  if (slides.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  clearInterval(heroTimer);
  heroTimer = setInterval(() => showSlide((slideIndex + 1) % slides.length), 6200);
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
    startHero();
  });
});

startHero();

const assistantLaunch = document.querySelector('.assistant-launch');
const assistantPanel = document.querySelector('.assistant-panel');
const assistantClose = document.querySelector('.assistant-close');
const assistantResponse = document.querySelector('#assistant-response');

function setAssistant(open) {
  assistantPanel?.classList.toggle('is-open', open);
  assistantPanel?.setAttribute('aria-hidden', String(!open));
  assistantLaunch?.setAttribute('aria-expanded', String(open));
}

assistantLaunch?.addEventListener('click', () => {
  const open = assistantPanel?.classList.contains('is-open');
  setAssistant(!open);
});
assistantClose?.addEventListener('click', () => setAssistant(false));

const assistantCopy = {
  book: 'You can send a short appointment request here. <a href="#appointment" data-close-assistant>Open the appointment form →</a>',
  insurance: 'The office works with several dental benefit plans. Use the appointment form with the <strong>carrier name only</strong>, or call <a href="tel:+17183930100">718-393-0100</a> for plan verification. Please do not send member IDs here.',
  hours: '<strong>Mon–Fri:</strong> 9:30 AM–6:30 PM<br><strong>Saturday:</strong> 9:30 AM–3:30 PM<br><strong>Sunday:</strong> Closed',
  location: 'Newtown Smile Dental is at <strong>86-01 Justice Ave, Elmhurst, NY 11373</strong>. <a href="https://www.google.com/maps/dir/?api=1&destination=8601+Justice+Ave+Elmhurst+NY+11373" target="_blank" rel="noopener">Open directions →</a>',
  human: 'Call the office at <a href="tel:+17183930100">718-393-0100</a> or email <a href="mailto:newtownsmiledental@gmail.com">newtownsmiledental@gmail.com</a>. For urgent scheduling, calling is best.'
};

document.querySelectorAll('[data-assistant]').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.assistant;
    if (assistantResponse) assistantResponse.innerHTML = assistantCopy[key] || '';
  });
});

document.addEventListener('click', event => {
  const closeLink = event.target.closest('[data-close-assistant]');
  if (closeLink) setAssistant(false);
});

document.querySelector('#year').textContent = new Date().getFullYear();

const appointmentForm = document.querySelector('.appointment-form');
appointmentForm?.addEventListener('submit', () => {
  const submit = appointmentForm.querySelector('.form-submit');
  if (submit) {
    submit.disabled = true;
    submit.textContent = 'Sending…';
  }
});