// Navbar scroll
const navWrap = document.querySelector('.nav-wrap');
const progressBar = document.getElementById('progressBar');
const sections = [...document.querySelectorAll('section')];
const navLinks = [...document.querySelectorAll('.nav-links a')];

function onScroll() {
  if (window.scrollY > 50) {
    navWrap.classList.add('small');
    navWrap.classList.remove('large');
  } else {
    navWrap.classList.add('large');
    navWrap.classList.remove('small');
  }

  const doc = document.documentElement;
  const scrollTop = doc.scrollTop;
  const scrollHeight = doc.scrollHeight - doc.clientHeight;
  progressBar.style.width = (scrollTop / scrollHeight) * 100 + '%';

  let active = 0;
  const navH = navWrap.getBoundingClientRect().height;
  const probeY = window.scrollY + navH + 1;
  sections.forEach((sec, i) => {
    if (probeY >= sec.offsetTop && probeY < sec.offsetTop + sec.offsetHeight) active = i;
  });
  if (window.innerHeight + window.scrollY >= doc.scrollHeight - 1) active = sections.length - 1;

  navLinks.forEach(l => l.classList.remove('active'));
  if (navLinks[active]) navLinks[active].classList.add('active');
}
window.addEventListener('scroll', onScroll);
window.addEventListener('resize', onScroll);
window.addEventListener('load', onScroll);

// Modals
document.querySelectorAll('.experience-card').forEach(card => {
  card.addEventListener('click', () => {
    document.getElementById(card.dataset.modal).setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

// Projects carousel
let projIndex = 0;
const projSlides = document.getElementById('projectSlides');
const projTotal = projSlides.children.length;

function updateProjects() {
  projSlides.style.transform = `translateX(-${projIndex * 100}%)`;
}
document.getElementById('projectNext').addEventListener('click', () => {
  projIndex = (projIndex + 1) % projTotal;
  updateProjects();
});
document.getElementById('projectPrev').addEventListener('click', () => {
  projIndex = (projIndex - 1 + projTotal) % projTotal;
  updateProjects();
});

// ===== Modal Handling =====
const expCards = document.querySelectorAll('.experience-card');
const modals = document.querySelectorAll('.modal');
const closeBtns = document.querySelectorAll('.close-modal');

// Open modal on card click
expCards.forEach(card => {
  card.addEventListener('click', () => {
    const id = card.dataset.modal;
    const modal = document.getElementById(id);
    if (modal) {
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  });
});

// Close modal on ❌ click
closeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.modal');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });
});

// Close modal on backdrop click
modals.forEach(modal => {
  const backdrop = modal.querySelector('.modal-backdrop');
  if (backdrop) {
    backdrop.addEventListener('click', () => {
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  }
});

// Close modal on Esc key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    modals.forEach(modal => {
      if (modal.getAttribute('aria-hidden') === 'false') {
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  }
});

// Initial call to set navbar state
onScroll();

// Fade-in sections on scroll
const faders = document.querySelectorAll('section, .card, .slide');

const fadeOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const fadeOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, fadeOptions);

faders.forEach(el => fadeOnScroll.observe(el));
