/**
 * CHERRY BLOSSOM - LUXURY MAKEUP & BEAUTY
 * Elegant Form Validation & Interactive Feedback
 */

const ValidationService = {
  // Regex patterns
  patterns: {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[6-9]\d{9}$/, // Indian 10-digit mobile
    pincode: /^\d{6}$/,     // Indian 6-digit postal code
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/ // Min 8 chars, 1 letter, 1 number
  },

  // Set field error state
  setError: (inputElement, errorMessage) => {
    const parent = inputElement.closest('.form-group') || inputElement.parentElement;
    parent.classList.add('has-error');
    parent.classList.remove('has-success');
    
    let errorEl = parent.querySelector('.field-error-msg');
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.className = 'field-error-msg';
      parent.appendChild(errorEl);
    }
    errorEl.textContent = errorMessage;
    inputElement.focus();
  },

  // Clear field error state
  clearError: (inputElement) => {
    const parent = inputElement.closest('.form-group') || inputElement.parentElement;
    parent.classList.remove('has-error');
    parent.classList.add('has-success');
    const errorEl = parent.querySelector('.field-error-msg');
    if (errorEl) {
      errorEl.textContent = '';
    }
  },

  // Validate Contact Form
  validateContactForm: (form) => {
    let isValid = true;
    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const message = form.querySelector('[name="message"]');

    if (name && name.value.trim().length < 2) {
      ValidationService.setError(name, 'Please enter your full name (minimum 2 characters)');
      isValid = false;
    } else if (name) {
      ValidationService.clearError(name);
    }

    if (email && !ValidationService.patterns.email.test(email.value.trim())) {
      ValidationService.setError(email, 'Please provide a valid email address');
      isValid = false;
    } else if (email) {
      ValidationService.clearError(email);
    }

    if (message && message.value.trim().length < 10) {
      ValidationService.setError(message, 'Your message should be at least 10 characters long');
      isValid = false;
    } else if (message) {
      ValidationService.clearError(message);
    }

    return isValid;
  },

  // Validate Login Form
  validateLoginForm: (form) => {
    let isValid = true;
    const email = form.querySelector('[name="email"]');
    const password = form.querySelector('[name="password"]');

    if (email && !ValidationService.patterns.email.test(email.value.trim())) {
      ValidationService.setError(email, 'Please enter a valid luxury account email');
      isValid = false;
    } else if (email) {
      ValidationService.clearError(email);
    }

    if (password && password.value.length < 6) {
      ValidationService.setError(password, 'Password must be at least 6 characters');
      isValid = false;
    } else if (password) {
      ValidationService.clearError(password);
    }

    return isValid;
  },

  // Validate Register Form
  validateRegisterForm: (form) => {
    let isValid = true;
    const name = form.querySelector('[name="fullname"]');
    const email = form.querySelector('[name="email"]');
    const phone = form.querySelector('[name="phone"]');
    const password = form.querySelector('[name="password"]');
    const confirmPassword = form.querySelector('[name="confirm_password"]');
    const terms = form.querySelector('[name="terms"]');

    if (name && name.value.trim().length < 2) {
      ValidationService.setError(name, 'Please enter your full legal name');
      isValid = false;
    } else if (name) {
      ValidationService.clearError(name);
    }

    if (email && !ValidationService.patterns.email.test(email.value.trim())) {
      ValidationService.setError(email, 'Valid email required for VIP club membership');
      isValid = false;
    } else if (email) {
      ValidationService.clearError(email);
    }

    if (phone && phone.value.trim() && !ValidationService.patterns.phone.test(phone.value.trim())) {
      ValidationService.setError(phone, 'Enter a valid 10-digit mobile number');
      isValid = false;
    } else if (phone) {
      ValidationService.clearError(phone);
    }

    if (password && password.value.length < 8) {
      ValidationService.setError(password, 'Password must be at least 8 characters with letters & numbers');
      isValid = false;
    } else if (password) {
      ValidationService.clearError(password);
    }

    if (confirmPassword && confirmPassword.value !== (password ? password.value : '')) {
      ValidationService.setError(confirmPassword, 'Passwords do not match');
      isValid = false;
    } else if (confirmPassword) {
      ValidationService.clearError(confirmPassword);
    }

    if (terms && !terms.checked) {
      if (window.showToast) {
        window.showToast('Please accept the Cherry Blossom Terms & Privacy policy', 'error');
      }
      isValid = false;
    }

    return isValid;
  },

  // Validate Checkout Form
  validateCheckoutForm: (form) => {
    let isValid = true;
    const requiredFields = [
      { name: 'firstName', label: 'First name' },
      { name: 'lastName', label: 'Last name' },
      { name: 'email', label: 'Email', isEmail: true },
      { name: 'phone', label: 'Phone', isPhone: true },
      { name: 'address', label: 'Street address' },
      { name: 'city', label: 'City' },
      { name: 'state', label: 'State' },
      { name: 'pincode', label: 'Pincode', isPincode: true }
    ];

    for (const field of requiredFields) {
      const input = form.querySelector(`[name="${field.name}"]`);
      if (!input) continue;

      const val = input.value.trim();
      if (!val) {
        ValidationService.setError(input, `${field.label} is required`);
        isValid = false;
      } else if (field.isEmail && !ValidationService.patterns.email.test(val)) {
        ValidationService.setError(input, 'Please enter a valid email address');
        isValid = false;
      } else if (field.isPhone && !ValidationService.patterns.phone.test(val)) {
        ValidationService.setError(input, 'Please enter a valid 10-digit mobile number');
        isValid = false;
      } else if (field.isPincode && !ValidationService.patterns.pincode.test(val)) {
        ValidationService.setError(input, 'Please enter a valid 6-digit postal code');
        isValid = false;
      } else {
        ValidationService.clearError(input);
      }
    }

    // Payment validation
    const paymentSelected = form.querySelector('input[name="paymentMethod"]:checked');
    if (!paymentSelected) {
      if (window.showToast) {
        window.showToast('Please select a payment method', 'error');
      }
      isValid = false;
    }

    return isValid;
  },

  // Setup password toggle visibility
  setupPasswordToggles: () => {
    document.querySelectorAll('.btn-toggle-password').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = btn.parentElement.querySelector('input');
        if (!input) return;
        const icon = btn.querySelector('i');
        if (input.type === 'password') {
          input.type = 'text';
          if (icon) {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
          }
        } else {
          input.type = 'password';
          if (icon) {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
          }
        }
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  ValidationService.setupPasswordToggles();
});

if (typeof window !== 'undefined') {
  window.ValidationService = ValidationService;
}
