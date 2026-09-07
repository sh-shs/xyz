/**
 * WebWorldBD - Web Development & Digital Services
 * Main Application Script (Theme Switcher, Language Switcher, Form Logic)
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. SHARED CONSTANTS & UTILITIES
     ========================================================================== */
  const THEME_KEY = 'webworldbd_theme';
  const LANG_KEY = 'webworldbd_lang';

  /* ==========================================================================
     2. LANGUAGE SWITCHING SYSTEM (ENGLISH / BANGLA)
     ========================================================================== */
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

    // Update settings panel language switcher buttons
    const settingsLangBtns = document.querySelectorAll('.settings-lang-btn');
    settingsLangBtns.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  /* ==========================================================================
     3. THEME SWITCHING SYSTEM (DARK / LIGHT MODE)
     ========================================================================== */
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
      const labelSpan = btn.querySelector('.theme-btn-label');
      if (theme === 'light') {
        if (icon) icon.className = 'fa-solid fa-sun';
        if (labelSpan) labelSpan.setAttribute('data-i18n', 'theme_light');
        btn.setAttribute('aria-label', 'Switch to Dark Mode');
        btn.setAttribute('title', 'Switch to Dark Mode');
      } else {
        if (icon) icon.className = 'fa-solid fa-moon';
        if (labelSpan) labelSpan.setAttribute('data-i18n', 'theme_dark');
        btn.setAttribute('aria-label', 'Switch to Light Mode');
        btn.setAttribute('title', 'Switch to Light Mode');
      }
    });

    // Re-apply language translations to update labels
    const activeLang = getPreferredLang();
    applyLanguage(activeLang);
  }

  // Initialize theme & language
  const currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  const currentLang = getPreferredLang();
  applyLanguage(currentLang);

  // Global listener for theme toggle buttons
  document.addEventListener('click', (e) => {
    const toggleBtn = e.target.closest('.theme-toggle-btn');
    if (toggleBtn) {
      const activeTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    }
  });

  // Global listener for language toggle buttons
  document.addEventListener('click', (e) => {
    const langBtn = e.target.closest('.lang-toggle-btn');
    if (langBtn) {
      const activeLang = getPreferredLang();
      const newLang = activeLang === 'en' ? 'bn' : 'en';
      applyLanguage(newLang);
    }
  });

  /* ==========================================================================
     4. SETTINGS PANEL INTERACTIVE LOGIC
     ========================================================================== */
  const settingsToggleBtn = document.getElementById('settingsToggleBtn');
  const settingsCloseBtn = document.getElementById('settingsCloseBtn');
  const settingsPanel = document.getElementById('settingsPanel');
  const settingsBackdrop = document.getElementById('settingsBackdrop');

  function openSettingsPanel() {
    if (settingsPanel && settingsBackdrop) {
      settingsPanel.classList.add('active');
      settingsBackdrop.classList.add('active');
      if (settingsToggleBtn) {
        settingsToggleBtn.classList.add('active');
        settingsToggleBtn.setAttribute('aria-expanded', 'true');
      }
    }
  }

  function closeSettingsPanel() {
    if (settingsPanel && settingsBackdrop) {
      settingsPanel.classList.remove('active');
      settingsBackdrop.classList.remove('active');
      if (settingsToggleBtn) {
        settingsToggleBtn.classList.remove('active');
        settingsToggleBtn.setAttribute('aria-expanded', 'false');
      }
    }
  }

  function toggleSettingsPanel() {
    if (settingsPanel && settingsPanel.classList.contains('active')) {
      closeSettingsPanel();
    } else {
      openSettingsPanel();
    }
  }

  if (settingsToggleBtn) {
    settingsToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSettingsPanel();
    });
  }

  if (settingsCloseBtn) {
    settingsCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeSettingsPanel();
    });
  }

  if (settingsBackdrop) {
    settingsBackdrop.addEventListener('click', closeSettingsPanel);
  }

  // Close panel when clicking outside on desktop
  document.addEventListener('click', (e) => {
    if (settingsPanel && settingsPanel.classList.contains('active')) {
      const isClickInside = settingsPanel.contains(e.target) || (settingsToggleBtn && settingsToggleBtn.contains(e.target));
      if (!isClickInside) {
        closeSettingsPanel();
      }
    }
  });

  // Close panel on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && settingsPanel && settingsPanel.classList.contains('active')) {
      closeSettingsPanel();
    }
  });

  // Listener for language switch buttons inside settings panel
  document.addEventListener('click', (e) => {
    const langSwitchBtn = e.target.closest('.settings-lang-btn');
    if (langSwitchBtn) {
      const selectedLang = langSwitchBtn.getAttribute('data-lang');
      if (selectedLang) {
        applyLanguage(selectedLang);
      }
    }
  });

  /* ==========================================================================
     5. UTILITIES & FORM LOGIC
     ========================================================================== */
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

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

  const projectForm = document.getElementById('projectRequestForm');
  const successMessage = document.getElementById('formSuccessMessage');
  const resetFormBtn = document.getElementById('btnResetForm');

  if (projectForm) {
    const requiredInputs = projectForm.querySelectorAll('[required]');

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
        projectForm.style.display = 'none';
        if (successMessage) {
          successMessage.style.display = 'block';
          successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
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
