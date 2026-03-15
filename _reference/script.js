document.addEventListener("DOMContentLoaded", () => {
  const page = document.querySelector(".page");
  const form = document.querySelector(".auth-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  // Trigger entrance animations
  requestAnimationFrame(() => {
    page.classList.add("page--loaded");
  });

  // Autofocus email field
  if (emailInput) {
    emailInput.focus();
  }

  // Track which fields the user has interacted with
  const dirtyFields = new Set();

  // ------------------------------------
  // Inline blur validation
  // ------------------------------------
  function markDirty(input) {
    dirtyFields.add(input.id);
  }

  if (emailInput) {
    emailInput.addEventListener("input", () => {
      markDirty(emailInput);
      // Update success checkmark live
      const check = emailInput
        .closest(".input-wrapper")
        .querySelector(".input-wrapper__check");
      if (check) {
        const valid = isValidEmail(emailInput.value);
        check.classList.toggle("is-visible", valid);
      }
      // Clear error state while typing
      if (emailInput.classList.contains("form-input--error")) {
        clearFieldError(emailInput);
      }
    });

    emailInput.addEventListener("blur", () => {
      if (dirtyFields.has(emailInput.id)) {
        validateField(emailInput, validateEmail);
      }
    });
  }

  if (passwordInput) {
    passwordInput.addEventListener("input", () => {
      markDirty(passwordInput);
      if (passwordInput.classList.contains("form-input--error")) {
        clearFieldError(passwordInput);
      }
    });

    passwordInput.addEventListener("blur", () => {
      if (dirtyFields.has(passwordInput.id)) {
        validateField(passwordInput, validatePassword);
      }
    });
  }

  // ------------------------------------
  // Form submission
  // ------------------------------------
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      clearAllErrors();

      const emailValid = validateField(emailInput, validateEmail);
      const passwordValid = validateField(passwordInput, validatePassword);

      if (!emailValid || !passwordValid) {
        // Focus first error field
        const firstError = form.querySelector(".form-input--error");
        if (firstError) {
          firstError.focus();
        }
        return;
      }

      // Show loading state
      const btn = form.querySelector(".btn--primary");
      btn.classList.add("btn--loading");
      btn.disabled = true;

      // Simulate API call — replace with real auth
      setTimeout(() => {
        btn.classList.remove("btn--loading");
        btn.disabled = false;
      }, 2000);
    });
  }

  // ------------------------------------
  // Password visibility toggle
  // ------------------------------------
  const toggle = document.querySelector(".toggle-password");

  if (toggle && passwordInput) {
    toggle.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      toggle.setAttribute(
        "aria-label",
        isPassword ? "Hide password" : "Show password"
      );
      toggle.querySelector(".eye-open").style.display = isPassword
        ? "none"
        : "block";
      toggle.querySelector(".eye-closed").style.display = isPassword
        ? "block"
        : "none";
    });
  }

  // ------------------------------------
  // Feature card stagger animation
  // ------------------------------------
  const cards = document.querySelectorAll(".feature-card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach((card, i) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(16px)";
    card.style.transition = [
      `opacity 0.5s cubic-bezier(0.4,0,0.2,1) ${i * 0.12}s`,
      `transform 0.5s cubic-bezier(0.4,0,0.2,1) ${i * 0.12}s`,
    ].join(", ");
    observer.observe(card);
  });

  // ------------------------------------
  // Testimonials auto-slider
  // ------------------------------------
  const testimonials = document.querySelectorAll(".testimonial");
  const dots = document.querySelectorAll(".testimonials__dot");

  if (testimonials.length > 1) {
    let current = 0;
    let timer = null;

    function showSlide(index) {
      testimonials.forEach((t) => t.classList.remove("active"));
      dots.forEach((d) => {
        d.classList.remove("active");
        d.setAttribute("aria-selected", "false");
      });
      testimonials[index].classList.add("active");
      dots[index].classList.add("active");
      dots[index].setAttribute("aria-selected", "true");
      current = index;
    }

    function nextSlide() {
      showSlide((current + 1) % testimonials.length);
    }

    function startAutoplay() {
      timer = setInterval(nextSlide, 5000);
    }

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        clearInterval(timer);
        showSlide(i);
        startAutoplay();
      });
    });

    startAutoplay();
  }
});

// ------------------------------------
// Validation helpers
// ------------------------------------
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateEmail(input) {
  if (!input.value.trim()) {
    return "Please enter your email address";
  }
  if (!isValidEmail(input.value)) {
    return "Please enter a valid email address";
  }
  return null;
}

function validatePassword(input) {
  if (!input.value) {
    return "Please enter your password";
  }
  if (input.value.length < 6) {
    return "Password must be at least 6 characters";
  }
  return null;
}

function validateField(input, validatorFn) {
  if (!input) return true;

  const errorMessage = validatorFn(input);
  const errorEl = input.closest(".form-group").querySelector(".form-error");

  if (errorMessage) {
    input.classList.add("form-input--error");
    input.classList.remove("form-input--valid");
    if (errorEl) {
      errorEl.textContent = errorMessage;
      errorEl.hidden = false;
    }
    // Hide checkmark on error
    const check = input
      .closest(".input-wrapper")
      ?.querySelector(".input-wrapper__check");
    if (check) {
      check.classList.remove("is-visible");
    }
    return false;
  }

  input.classList.remove("form-input--error");
  if (errorEl) {
    errorEl.textContent = "";
    errorEl.hidden = true;
  }
  return true;
}

function clearFieldError(input) {
  input.classList.remove("form-input--error");
  const errorEl = input.closest(".form-group").querySelector(".form-error");
  if (errorEl) {
    errorEl.textContent = "";
    errorEl.hidden = true;
  }
}

function clearAllErrors() {
  document.querySelectorAll(".form-error").forEach((el) => {
    el.textContent = "";
    el.hidden = true;
  });
  document.querySelectorAll(".form-input").forEach((input) => {
    input.classList.remove("form-input--error");
  });
}
