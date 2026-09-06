/**
 * SHAFAET HOSSEN SARIP - Service Web App
 * Phase 1 Foundation JavaScript (Vanilla ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Year Update
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Modal Handler Elements
  const projectModal = document.getElementById('projectModal');
  const accountModal = document.getElementById('accountModal');
  const openProjectBtns = document.querySelectorAll('.open-project-modal');
  const openAccountBtns = document.querySelectorAll('.open-account-modal');
  const closeModalBtns = document.querySelectorAll('.close-modal');
  const allModals = document.querySelectorAll('.modal-overlay');

  // Open Modal Helper
  const openModal = (modal) => {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // Close Modal Helper
  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Event listeners for opening Start Project modal
  openProjectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(projectModal);
    });
  });

  // Event listeners for opening Account modal
  openAccountBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(accountModal);
    });
  });

  // Event listeners for closing modals
  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      allModals.forEach(m => closeModal(m));
    });
  });

  // Close on background overlay click
  allModals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      allModals.forEach(m => closeModal(m));
    }
  });

  // 3. Navigation Scroll Active Link Observer
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const bottomNavItems = document.querySelectorAll('.bottom-nav-item[data-target]');

  const updateActiveNav = () => {
    let currentSection = 'home';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSection = sectionId;
      }
    });

    // Desktop Nav Active State
    desktopNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });

    // Mobile Bottom Nav Active State
    bottomNavItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-target') === currentSection) {
        item.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();
});
