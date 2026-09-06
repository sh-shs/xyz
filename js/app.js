/**
 * WebWorldBD - Web Development & Digital Services
 * Main Application Script (Theme Switcher, Language Switcher, Form Logic)
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. THEME SWITCHING SYSTEM (DARK / LIGHT MODE)
     ========================================================================== */
  const THEME_KEY = 'webworldbd_theme';

  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    return 'light'; // Default initial theme
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    // Update all theme toggle buttons
    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
    themeToggleBtns.forEach(btn => {
      const icon = btn.querySelector('i');
      if (theme === 'light') {
        if (icon) icon.className = 'fa-solid fa-sun';
        btn.setAttribute('aria-label', 'Switch to Dark Mode');
        btn.setAttribute('title', 'Switch to Dark Mode');
      } else {
        if (icon) icon.className = 'fa-solid fa-moon';
        btn.setAttribute('aria-label', 'Switch to Light Mode');
        btn.setAttribute('title', 'Switch to Light Mode');
      }
    });
  }

  // Initialize theme
  const currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  // Global listener for theme toggle buttons
  document.addEventListener('click', (e) => {
    const toggleBtn = e.target.closest('.theme-toggle-btn');
    if (toggleBtn) {
      const activeTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    }
  });


  /* ==========================================================================
     2. LANGUAGE SWITCHING SYSTEM (ENGLISH / BANGLA)
     ========================================================================== */
  const LANG_KEY = 'webworldbd_lang';

  function getPreferredLang() {
    const savedLang = localStorage.getItem(LANG_KEY);
    if (savedLang && (savedLang === 'en' || savedLang === 'bn')) {
      return savedLang;
    }
    return 'en'; // Default
  }

  function applyLanguage(lang) {
    if (typeof translations === 'undefined' || !translations[lang]) {
      return;
    }

    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang;

    const dictionary = translations[lang];

    // Update all elements with data-i18n
    const i18nElements = document.querySelectorAll('[data-i18n]');
    i18nElements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dictionary[key] !== undefined) {
        el.textContent = dictionary[key];
      }
    });

    // Update elements with data-i18n-html (for safe rich text with bold tags or spans)
    const i18nHtmlElements = document.querySelectorAll('[data-i18n-html]');
    i18nHtmlElements.forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (dictionary[key] !== undefined) {
        el.innerHTML = dictionary[key];
      }
    });

    // Update elements with data-i18n-placeholder
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dictionary[key] !== undefined) {
        el.setAttribute('placeholder', dictionary[key]);
      }
    });

    // Update language toggle buttons active state
    const langBtns = document.querySelectorAll('.lang-toggle-btn');
    langBtns.forEach(btn => {
      const enSpan = btn.querySelector('.lang-en');
      const bnSpan = btn.querySelector('.lang-bn');

      if (enSpan && bnSpan) {
        if (lang === 'bn') {
          bnSpan.classList.add('active');
          enSpan.classList.remove('active');
        } else {
          enSpan.classList.add('active');
          bnSpan.classList.remove('active');
        }
      }
    });
  }

  // Initialize language
  const currentLang = getPreferredLang();
  applyLanguage(currentLang);

  // Global listener for language toggle buttons
  document.addEventListener('click', (e) => {
    const langBtn = e.target.closest('.lang-toggle-btn');
    if (langBtn) {
      const activeLang = localStorage.getItem(LANG_KEY) || 'en';
      const newLang = activeLang === 'en' ? 'bn' : 'en';
      applyLanguage(newLang);
    }
  });


  /* ==========================================================================
     3. UTILITIES & FORM LOGIC
     ========================================================================== */

  // 3.1 Dynamic Footer Year Update
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 3.2 Pre-fill Service Select from URL Query Parameter on start-project.html
  const urlParams = new URLSearchParams(window.location.search);
  const selectedServiceParam = urlParams.get('service');
  const serviceSelect = document.getElementById('websiteType');

  if (serviceSelect && selectedServiceParam) {
    const decodedService = decodeURIComponent(selectedServiceParam);
    for (let i = 0; i < serviceSelect.options.length; i++) {
      if (serviceSelect.options[i].value.toLowerCase() === decodedService.toLowerCase()) {
        serviceSelect.selectedIndex = i;
        break;
      }
    }
  }

  // 3.3 Project Request Form Validation & Submission Handler
  const projectForm = document.getElementById('projectRequestForm');
  const successMessage = document.getElementById('formSuccessMessage');
  const resetFormBtn = document.getElementById('btnResetForm');

  if (projectForm) {
    const requiredInputs = projectForm.querySelectorAll('[required]');

    // Clear validation state on input
    requiredInputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.value.trim() !== '') {
          input.classList.remove('invalid');
        }
      });
    });

    projectForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      requiredInputs.forEach(input => {
        if (!input.value || input.value.trim() === '') {
          input.classList.add('invalid');
          isValid = false;
        } else {
          input.classList.remove('invalid');
        }
      });

      if (isValid) {
        // Hide form and show success state
        projectForm.style.display = 'none';
        if (successMessage) {
          successMessage.style.display = 'block';
          successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        // Focus first invalid input
        const firstInvalid = projectForm.querySelector('.invalid');
        if (firstInvalid) {
          firstInvalid.focus();
        }
      }
    });

    if (resetFormBtn && successMessage) {
      resetFormBtn.addEventListener('click', () => {
        projectForm.reset();
        projectForm.style.display = 'block';
        successMessage.style.display = 'none';
        projectForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }
});
