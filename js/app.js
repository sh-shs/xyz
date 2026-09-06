/**
 * WebWorldBD - Web Development & Digital Services
 * Phase 2 Vanilla JavaScript Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Footer Year Update
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Pre-fill Service Select from URL Query Parameter on start-project.html
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

  // 3. Project Request Form Validation & Submission Handler
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
