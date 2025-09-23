// ===== Navbar Scroll + Scroll Spy =====
const navWrap = document.querySelector('.nav-wrap');
const progressBar = document.getElementById('progressBar');
const sections = [...document.querySelectorAll('section')];
const navLinks = [...document.querySelectorAll('.nav-links a')];

function onScroll() {
  // Resize navbar on scroll
  if (window.scrollY > 50) {
    navWrap.classList.add('small');
    navWrap.classList.remove('large');
  } else {
    navWrap.classList.add('large');
    navWrap.classList.remove('small');
  }

  // Progress bar
  const doc = document.documentElement;
  const scrollTop = doc.scrollTop;
  const scrollHeight = doc.scrollHeight - doc.clientHeight;
  progressBar.style.width = (scrollTop / scrollHeight) * 100 + '%';

  // Scroll spy (highlight active link)
  let active = sections.length - 1; // default last section
  const navH = navWrap.getBoundingClientRect().height;

  for (let i = 0; i < sections.length; i++) {
    const sec = sections[i];
    const secTop = sec.offsetTop - navH;
    const secBottom = secTop + sec.offsetHeight;

    if (window.scrollY >= secTop && window.scrollY < secBottom) {
      active = i;
      break;
    }
  }

  // Special case: bottom of page → last section
  if (window.innerHeight + window.scrollY >= doc.scrollHeight - 1) {
    active = sections.length - 1;
  }

  navLinks.forEach(l => l.classList.remove('active'));
  if (navLinks[active]) navLinks[active].classList.add('active');
}
window.addEventListener('scroll', onScroll);
window.addEventListener('load', onScroll);

// ===== Smooth Scroll with Offset =====
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);
    const navH = navWrap.getBoundingClientRect().height;

    if (targetSection) {
      const top = targetSection.offsetTop - navH;
      window.scrollTo({
        top: top,
        behavior: 'smooth'
      });
    }
  });
});

// ===== Mobile Navbar Toggle =====
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinksContainer.classList.toggle('show');
});
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinksContainer.classList.remove('show');
  });
});

// ===== Projects Carousel =====
const projSlides = document.getElementById('projectSlides');
if (projSlides) {
  let projIndex = 0;
  const projTotal = projSlides.children.length;

  function updateProjects() {
    projSlides.style.transform = `translateX(-${projIndex * 100}%)`;
  }

  const nextBtn = document.getElementById('projectNext');
  const prevBtn = document.getElementById('projectPrev');

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
      projIndex = (projIndex + 1) % projTotal;
      updateProjects();
    });
    prevBtn.addEventListener('click', () => {
      projIndex = (projIndex - 1 + projTotal) % projTotal;
      updateProjects();
    });
  }
}

// ===== Modals (Projects) =====
const projectCards = document.querySelectorAll('.project-card');
const modals = document.querySelectorAll('.modal');
const closeBtns = document.querySelectorAll('.close-modal');

// Open project modal
projectCards.forEach(card => {
  card.addEventListener('click', () => {
    const id = card.dataset.modal;
    const modal = document.getElementById(id);
    if (modal) {
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      // move focus to close button for accessibility
      const closeBtn = modal.querySelector('.close-modal');
      if (closeBtn) closeBtn.focus();
    }
  });
});

// Close modal on ❌
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

// Close modal on Esc
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

// Initial setup
onScroll();
