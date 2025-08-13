// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initHeader();
  initHamburgerMenu();
  initScrollAnimations();
  initNewsletterForm();
  initSmoothScrolling();
  initLoadingScreen();
  initParallaxEffects();
  initInteractiveElements();
});

// Header functionality
function initHeader() {
  const header = document.getElementById("header");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add scrolled class for styling
    if (scrollTop > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Hide/show header on scroll (optional)
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
  });
}

// Hamburger menu functionality
function initHamburgerMenu() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  console.log(
    "Hamburger menu init - hamburger:",
    hamburger,
    "navMenu:",
    navMenu
  );

  if (hamburger && navMenu) {
    // Remove any existing event listeners
    const newHamburger = hamburger.cloneNode(true);
    hamburger.parentNode.replaceChild(newHamburger, hamburger);
    
    // Get the new hamburger reference
    const freshHamburger = document.getElementById("hamburger");
    const freshNavMenu = document.getElementById("nav-menu");

    // Add multiple event listeners for better compatibility
    freshHamburger.addEventListener("click", handleHamburgerClick, true);
    freshHamburger.addEventListener("touchstart", handleHamburgerClick, true);
    freshHamburger.addEventListener("mousedown", handleHamburgerClick, true);
    
    // Also add to the container div
    freshHamburger.addEventListener("click", handleHamburgerClick, false);
    freshHamburger.addEventListener("touchstart", handleHamburgerClick, false);
    freshHamburger.addEventListener("mousedown", handleHamburgerClick, false);

    function handleHamburgerClick(e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      
      console.log("=== Hamburger Click Event ===");
      console.log("Event type:", e.type);
      console.log("Target:", e.target);
      console.log("Current target:", e.currentTarget);
      console.log("Event phase:", e.eventPhase);

      freshHamburger.classList.toggle("active");
      freshNavMenu.classList.toggle("active");

      console.log("Hamburger active:", freshHamburger.classList.contains('active'));
      console.log("Nav menu active:", freshNavMenu.classList.contains('active'));

      // Prevent body scroll when menu is open
      if (freshNavMenu.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      
      // Force a repaint
      freshHamburger.offsetHeight;
    }

    // Close menu when clicking on a link
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        freshHamburger.classList.remove("active");
        freshNavMenu.classList.remove("active");
        document.body.style.overflow = "";
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!freshHamburger.contains(e.target) && !freshNavMenu.contains(e.target)) {
        freshHamburger.classList.remove("active");
        freshNavMenu.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
    
    console.log("Hamburger menu initialized with fresh elements");
  } else {
    console.error("Hamburger menu elements not found!");
  }
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");

        // Add staggered animation for grid items
        if (
          entry.target.classList.contains("features-grid") ||
          entry.target.classList.contains("programs-grid")
        ) {
          const items = entry.target.children;
          Array.from(items).forEach((item, index) => {
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "translateY(0)";
            }, index * 100);
          });
        }
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".feature-card, .program-card, .section-header, .about-content, .newsletter-content"
  );
  animateElements.forEach((el) => {
    el.classList.add("scroll-animate");
    observer.observe(el);
  });

  // Observe grid containers
  const grids = document.querySelectorAll(".features-grid, .programs-grid");
  grids.forEach((grid) => {
    observer.observe(grid);

    // Initialize grid items
    const items = grid.children;
    Array.from(items).forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(30px)";
      item.style.transition = "all 0.6s ease-out";
    });
  });
}

// Newsletter form functionality
function initNewsletterForm() {
  const newsletterForm = document.getElementById("newsletter-form");
  const emailInput = document.getElementById("newsletter-email");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = emailInput.value.trim();

      if (!isValidEmail(email)) {
        showNotification("Please enter a valid email address.", "error");
        return;
      }

      // Simulate newsletter subscription
      showNotification("Subscribing to newsletter...", "info");

      // Simulate API call
      setTimeout(() => {
        showNotification(
          "Successfully subscribed to our newsletter!",
          "success"
        );
        emailInput.value = "";

        // Store email in localStorage (for demo purposes)
        const subscribers = JSON.parse(
          localStorage.getItem("newsletterSubscribers") || "[]"
        );
        subscribers.push(email);
        localStorage.setItem(
          "newsletterSubscribers",
          JSON.stringify(subscribers)
        );
      }, 1500);
    });
  }
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "success"
            ? "#22C55E"
            : type === "error"
            ? "#EF4444"
            : "#3B82F6"
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease-out;
        max-width: 400px;
    `;

  // Add to page
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => notification.remove(), 300);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Smooth scrolling
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.getElementById("header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Loading screen
function initLoadingScreen() {
  // Check if loading screen already exists
  const existingLoading = document.querySelector(".loading");
  if (existingLoading) {
    existingLoading.remove();
  }

  // Create loading screen
  const loadingScreen = document.createElement("div");
  loadingScreen.className = "loading";
  loadingScreen.innerHTML = `
        <div class="loading-content">
            <svg class="loading-logo" width="60" height="60" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="8" fill="url(#loadingGradient)"/>
                <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">A</text>
                <defs>
                    <linearGradient id="loadingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#22c55e;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#fbbf24;stop-opacity:1" />
                    </linearGradient>
                </defs>
            </svg>
            <div class="loading-spinner"></div>
            <p style="margin-top: 1rem; color: #22C55E; font-weight: 600;">Loading Auxano Schools...</p>
        </div>
    `;

  document.body.appendChild(loadingScreen);

  // Hide loading screen after page loads or after a maximum time
  const hideLoading = () => {
    setTimeout(() => {
      loadingScreen.classList.add("hidden");
      setTimeout(() => {
        if (loadingScreen.parentNode) {
          loadingScreen.remove();
        }
      }, 500);
    }, 1000);
  };

  // Try both load event and a fallback timer
  if (document.readyState === "complete") {
    hideLoading();
  } else {
    window.addEventListener("load", hideLoading);
    // Fallback: hide loading screen after 3 seconds maximum
    setTimeout(hideLoading, 3000);
  }
}

// Parallax effects
function initParallaxEffects() {
  const shapes = document.querySelectorAll(".shape");

  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;

    shapes.forEach((shape, index) => {
      const speed = 0.5 + index * 0.1;
      const yPos = -(scrolled * speed);
      shape.style.transform = `translateY(${yPos}px) rotate(${
        scrolled * 0.1
      }deg)`;
    });
  });
}

// Interactive elements
function initInteractiveElements() {
  // Add hover effects to buttons
  const buttons = document.querySelectorAll(".btn-primary, .btn-secondary");

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px) scale(1.02)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Add click effects to cards
  const cards = document.querySelectorAll(".feature-card, .program-card");

  cards.forEach((card) => {
    card.addEventListener("click", function () {
      this.style.transform = "translateY(-8px) scale(1.02)";
      setTimeout(() => {
        this.style.transform = "translateY(-8px) scale(1)";
      }, 150);
    });
  });

  // Add typing effect to hero title
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = "";

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };

    // Start typing effect after a delay
    setTimeout(typeWriter, 500);
  }
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Performance optimization
const optimizedScrollHandler = debounce(function () {
  // Handle scroll-based animations here
}, 16); // ~60fps

window.addEventListener("scroll", optimizedScrollHandler);

// Add CSS for notifications
const notificationStyles = document.createElement("style");
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    .loading-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }
    
    .loading-logo {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
`;

document.head.appendChild(notificationStyles);

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
  // This would integrate with Google Analytics or other tracking services
  console.log("Event tracked:", eventName, eventData);

  // Example usage:
  // trackEvent('button_click', { button: 'apply_now', page: 'home' });
  // trackEvent('newsletter_signup', { email: email });
}

// Add tracking to important interactions
document.addEventListener("DOMContentLoaded", function () {
  // Track Apply Now button clicks
  const applyButtons = document.querySelectorAll(".btn-primary");
  applyButtons.forEach((button) => {
    if (button.textContent.includes("Apply")) {
      button.addEventListener("click", () => {
        trackEvent("apply_button_click", {
          button_text: button.textContent,
          page: window.location.pathname,
        });
      });
    }
  });

  // Track program card interactions
  const programCards = document.querySelectorAll(".program-card");
  programCards.forEach((card) => {
    card.addEventListener("click", () => {
      const programName = card.querySelector("h3").textContent;
      trackEvent("program_card_click", { program: programName });
    });
  });
});

// FAQ functionality
function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", function () {
      const isActive = item.classList.contains("active");

      // Close all other FAQ items
      faqItems.forEach((otherItem) => {
        otherItem.classList.remove("active");
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}

// Contact form functionality
function initContactForm() {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // Validate required fields
      const requiredFields = [
        "firstName",
        "lastName",
        "email",
        "subject",
        "message",
      ];
      const missingFields = requiredFields.filter(
        (field) => !data[field] || data[field].trim() === ""
      );

      if (missingFields.length > 0) {
        showNotification("Please fill in all required fields.", "error");
        return;
      }

      // Validate email
      if (!isValidEmail(data.email)) {
        showNotification("Please enter a valid email address.", "error");
        return;
      }

      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      // Simulate form submission
      showNotification("Sending your message...", "info");

      setTimeout(() => {
        showNotification(
          "Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.",
          "success"
        );

        // Reset form
        contactForm.reset();

        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // Track form submission
        trackEvent("contact_form_submitted", {
          subject: data.subject,
          has_newsletter: data.newsletter ? "yes" : "no",
        });

        // Store contact in localStorage (for demo purposes)
        const contacts = JSON.parse(
          localStorage.getItem("contactSubmissions") || "[]"
        );
        contacts.push({
          ...data,
          timestamp: new Date().toISOString(),
        });
        localStorage.setItem("contactSubmissions", JSON.stringify(contacts));
      }, 2000);
    });
  }
}

// Map functionality
function initMap() {
  const mapContainer = document.querySelector(".map-container");

  if (mapContainer) {
    mapContainer.addEventListener("click", function () {
      // Open Google Maps with school location
      const address = encodeURIComponent(
        "123 Education Street, Yaba, Lagos, Nigeria"
      );
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
      window.open(mapsUrl, "_blank");

      trackEvent("map_clicked", { action: "open_google_maps" });
    });
  }
}

// Enhanced initialization
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initHeader();
  initHamburgerMenu();
  initScrollAnimations();
  initNewsletterForm();
  initSmoothScrolling();
  initLoadingScreen();
  initParallaxEffects();
  initInteractiveElements();
  initFAQ();
  initContactForm();
  initMap();
});

// Export functions for potential external use
window.AuxanoSchools = {
  trackEvent,
  showNotification,
  isValidEmail,
  initFAQ,
  initContactForm,
  initMap,
};
