// ===== Theme Toggle =====
const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem("theme") || "dark";
html.setAttribute("data-theme", currentTheme);

// Update icon based on current theme
updateThemeIcon(currentTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector("i");
  if (theme === "dark") {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  } else {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  }
}

// ===== Mobile Menu Toggle =====
const mobileToggle = document.getElementById("mobileToggle");
const navMenu = document.getElementById("navMenu");

mobileToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  mobileToggle.classList.toggle("active");

  // Animate hamburger icon
  const spans = mobileToggle.querySelectorAll("span");
  if (navMenu.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translateY(10px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translateY(-10px)";
  } else {
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    mobileToggle.classList.remove("active");

    const spans = mobileToggle.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  });
});

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll("section[id]");

function highlightNavigation() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink?.classList.add("active");
    } else {
      navLink?.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", highlightNavigation);

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ===== Scroll Animations =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, observerOptions);

// Add animation classes to elements
function addScrollAnimations() {
  // About section elements
  const aboutContent = document.querySelector(".about-content");
  if (aboutContent) {
    aboutContent.classList.add("fade-in");
    observer.observe(aboutContent);
  }

  // Skill categories
  const skillCategories = document.querySelectorAll(".skill-category");
  skillCategories.forEach((category, index) => {
    if (index % 2 === 0) {
      category.classList.add("slide-in-left");
    } else {
      category.classList.add("slide-in-right");
    }
    observer.observe(category);
  });

  // Project cards
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    card.classList.add("fade-in");
    observer.observe(card);
  });

  // Contact content
  const contactContent = document.querySelector(".contact-content");
  if (contactContent) {
    contactContent.classList.add("fade-in");
    observer.observe(contactContent);
  }

  // Stats
  document.querySelectorAll(".contact-item").forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
    item.classList.add("fade-in");
    observer.observe(item);
  });
}

// Initialize scroll animations
addScrollAnimations();

// ===== Skill Bar Animation =====
const skillBars = document.querySelectorAll(".skill-progress");

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const width = entry.target.style.width;
      entry.target.style.width = "0";
      setTimeout(() => {
        entry.target.style.width = width;
      }, 100);
      skillObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

skillBars.forEach((bar) => {
  skillObserver.observe(bar);
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// ===== Project Filtering =====
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterBtns.forEach((b) => b.classList.remove("active"));
    // Add active class to clicked button
    btn.classList.add("active");

    const filterValue = btn.getAttribute("data-filter");

    projectCards.forEach((card) => {
      const category = card.getAttribute("data-category");

      if (filterValue === "all") {
        card.classList.remove("hide");
        setTimeout(() => {
          card.style.display = "block";
        }, 10);
      } else if (category === filterValue) {
        card.classList.remove("hide");
        setTimeout(() => {
          card.style.display = "block";
        }, 10);
      } else {
        card.classList.add("hide");
        setTimeout(() => {
          card.style.display = "none";
        }, 300);
      }
    });
  });
});

// ===== Contact Form Handling =====
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const formData = new FormData(contactForm);

  // Show success message (you can customize this)
  alert(
    "Terima kasih! Pesan Anda telah terkirim. Saya akan segera menghubungi Anda.",
  );

  // Reset form
  contactForm.reset();
});

// ===== Typing Effect for Name =====
const typingText = document.querySelector(".typing-text");
if (typingText) {
  const fullText = "Lazuardi Pandu";
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 150; // Speed for typing
  let deletingSpeed = 100; // Speed for deleting
  let pauseTime = 2000; // Pause after completing text

  function typeEffect() {
    if (!isDeleting && charIndex <= fullText.length) {
      // Typing
      typingText.textContent = fullText.substring(0, charIndex);
      charIndex++;

      if (charIndex > fullText.length) {
        // Pause before deleting
        setTimeout(() => {
          isDeleting = true;
          typeEffect();
        }, pauseTime);
        return;
      }
      setTimeout(typeEffect, typingSpeed);
    } else if (isDeleting && charIndex >= 0) {
      // Deleting
      typingText.textContent = fullText.substring(0, charIndex);
      charIndex--;

      if (charIndex < 0) {
        // Start typing again
        isDeleting = false;
        charIndex = 0;
        setTimeout(typeEffect, 500);
        return;
      }
      setTimeout(typeEffect, deletingSpeed);
    }
  }

  // Start typing effect after page load
  window.addEventListener("load", () => {
    setTimeout(typeEffect, 800);
  });
}

// ===== Parallax Effect for Home Section =====
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const homeImage = document.querySelector(".home-image");

  if (homeImage && scrolled < window.innerHeight) {
    homeImage.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// ===== Add Hover Effect Sound (Optional - Uncomment to enable) =====
/*
const hoverElements = document.querySelectorAll('.btn, .social-link, .project-card, .nav-link');

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        // You can add a subtle sound effect here if desired
        // const audio = new Audio('hover-sound.mp3');
        // audio.volume = 0.1;
        // audio.play();
    });
});
*/

// ===== Loading Animation =====
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

// ===== Cursor Trail Effect (Optional Enhancement) =====
function createCursorTrail() {
  const cursor = document.createElement("div");
  cursor.className = "cursor-trail";
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
}

// Uncomment to enable cursor trail
// createCursorTrail();

// ===== Add Active State to Buttons on Click =====
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "";
    }, 150);
  });
});

// ===== Console Welcome Message =====
console.log(
  "%c👋 Selamat datang di Portfolio Saya!",
  "color: #3b82f6; font-size: 20px; font-weight: bold;",
);
console.log(
  "%cJika Anda tertarik untuk bekerja sama, silakan hubungi saya!",
  "color: #64748b; font-size: 14px;",
);

// ===== Performance Optimization: Debounce Scroll Events =====
function debounce(func, wait = 10) {
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

// Apply debounce to scroll events
window.addEventListener("scroll", debounce(highlightNavigation, 10));

// ===== Scroll to Top Button =====
const scrollToTopBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ===== Enhanced Scroll Animations for All Sections =====
const animateOnScroll = () => {
  const sections = document.querySelectorAll(".section");

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight * 0.75) {
      section.classList.add("animate-in");
    }
  });
};

// Add initial animation class
document.querySelectorAll(".section").forEach((section) => {
  section.classList.add("scroll-animation");
});

window.addEventListener("scroll", debounce(animateOnScroll, 10));
animateOnScroll(); // Run on page load

// ===== Certificate Modal Functionality =====
const certificateModal = document.getElementById("certificateModal");
const certModalClose = document.getElementById("certModalClose");
const certModalOverlay = document.getElementById("certModalOverlay");
const btnDetails = document.querySelectorAll(".btn-details");

// Data sertifikat dengan gambar placeholder
const certificatesData = {
  cert1: {
    title: "Full Stack Web Developer",
    issuer: "Dicoding Indonesia",
    date: "Januari 2023",
    description:
      "Sertifikasi expert level dalam pengembangan web full stack menggunakan MERN Stack (MongoDB, Express.js, React, Node.js) dengan nilai kelulusan 95%.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop", // Ganti dengan URL sertifikat asli
  },
  cert2: {
    title: "DiGI UP Indonesia 2025",
    issuer: "Telkom Indonesia",
    date: "Maret 2025",
    description:
      "Juara kompetisi digital innovation tingkat nasional dengan project aplikasi mobile untuk smart city.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
  },
  cert3: {
    title: "JavaScript Algorithms",
    issuer: "FreeCodeCamp",
    date: "Agustus 2024",
    description:
      "Menyelesaikan 300+ jam pembelajaran dalam algoritma dan struktur data menggunakan JavaScript.",
    image: "pdf/sertiv_digiup.pdf", // Ganti dengan URL sertifikat asli
  },
  cert4: {
    title: "Microsoft Office Specialist",
    issuer: "Microsoft",
    date: "November 2024",
    description:
      "Sertifikasi resmi Microsoft untuk Excel Advanced dan Word Expert Level.",
    image:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=600&fit=crop",
  },
  cert5: {
    title: "Robotika Competition 2023",
    issuer: "SMK Telkom Purwokerto",
    date: "September 2023",
    description:
      "Juara 2 kompetisi robotika tingkat provinsi Jawa Tengah dengan project robot line follower.",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
  },
  cert6: {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Februari 2024",
    description:
      "Sertifikasi dasar AWS Cloud Computing mencakup EC2, S3, Lambda, dan layanan cloud lainnya.",
    image:
      "https://drive.google.com/file/d/1C_ZevCmTdBkI8_fEy6aTH1Lavv6WTnt1/view?usp=sharing",
  },
};

// Open certificate modal
btnDetails.forEach((btn) => {
  btn.addEventListener("click", function () {
    const certId = this.getAttribute("data-certificate");
    const certData = certificatesData[certId];

    if (certData) {
      document.getElementById("modalCertTitle").textContent = certData.title;
      document.getElementById("modalCertIssuer").textContent = certData.issuer;
      document.getElementById("modalCertDate").textContent = certData.date;
      document.getElementById("modalCertDesc").textContent =
        certData.description;
      document.getElementById("modalCertImage").src = certData.image;

      certificateModal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  });
});

// Close certificate modal
const closeCertModal = () => {
  certificateModal.classList.remove("active");
  document.body.style.overflow = "auto";
};

if (certModalClose) {
  certModalClose.addEventListener("click", closeCertModal);
}

if (certModalOverlay) {
  certModalOverlay.addEventListener("click", closeCertModal);
}

// Close modal with ESC key
document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    certificateModal &&
    certificateModal.classList.contains("active")
  ) {
    closeCertModal();
  }
});
