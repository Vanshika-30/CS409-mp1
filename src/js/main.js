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

  let active = sections.length - 1; // default to last section
  const navH = navWrap.getBoundingClientRect().height;

  for (let i = 0; i < sections.length; i++) {
    const sec = sections[i];
    const secTop = sec.offsetTop - navH - 5;   // offset for sticky nav
    const secBottom = secTop + sec.offsetHeight;

    if (window.scrollY >= secTop && window.scrollY < secBottom) {
      active = i;
      break;
    }
  }

  // Edge case: bottom of page → highlight last link
  if (window.innerHeight + window.scrollY >= doc.scrollHeight - 1) {
    active = sections.length - 1;
  }

  navLinks.forEach(l => l.classList.remove('active'));
  if (navLinks[active]) navLinks[active].classList.add('active');
}
window.addEventListener('scroll', onScroll);
window.addEventListener('resize', onScroll);
window.addEventListener('load', onScroll);

// ===== Smooth Scroll with Offset =====
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);
    const navH = navWrap.getBoundingClientRect().height;

    if (targetSection) {
      const top = targetSection.offsetTop - navH + 1;
      window.scrollTo({
        top: top,
        behavior: 'smooth'
      });
    }
  });
});

// ===== Modals =====
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
