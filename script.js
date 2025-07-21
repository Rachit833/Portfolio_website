
const navbar = document.getElementById("navbar")
const navMenu = document.getElementById("nav-menu")
const mobileMenu = document.getElementById("mobile-menu")
const navLinks = document.querySelectorAll(".nav-link")
const contactForm = document.getElementById("contact-form")


mobileMenu.addEventListener("click", () => {
  mobileMenu.classList.toggle("active")
  navMenu.classList.toggle("active")
})


navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(0, 0, 0, 0.9)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.15)"
  } else {
    navbar.style.background = "rgba(0, 0, 0, 0.9)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  }
})


function updateActiveNavLink() {
  const sections = document.querySelectorAll("section")
  const scrollPos = window.scrollY + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      
      navLinks.forEach((link) => {
        link.classList.remove("active")
      })

      
      const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)
      if (activeLink) {
        activeLink.classList.add("active")
      }
    }
  })
}


window.addEventListener("scroll", updateActiveNavLink)


navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 70 // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Contact Form Validation and Submission
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  
  const formData = new FormData(contactForm)
  const name = formData.get("name").trim()
  const email = formData.get("email").trim()
  const subject = formData.get("subject").trim()
  const message = formData.get("message").trim()

  
  clearErrorMessages()

  
  let isValid = true

  if (!name) {
    showError("name-error", "Name is required")
    isValid = false
  } else if (name.length < 2) {
    showError("name-error", "Name must be at least 2 characters")
    isValid = false
  }

  if (!email) {
    showError("email-error", "Email is required")
    isValid = false
  } else if (!isValidEmail(email)) {
    showError("email-error", "Please enter a valid email address")
    isValid = false
  }

  if (!subject) {
    showError("subject-error", "Subject is required")
    isValid = false
  } else if (subject.length < 5) {
    showError("subject-error", "Subject must be at least 5 characters")
    isValid = false
  }

  if (!message) {
    showError("message-error", "Message is required")
    isValid = false
  } else if (message.length < 10) {
    showError("message-error", "Message must be at least 10 characters")
    isValid = false
  }

  if (isValid) {
    // Simulate form submission
    submitForm(name, email, subject, message)
  }
})

// Helper function to validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Helper function to show error messages
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId)
  if (errorElement) {
    errorElement.textContent = message
    errorElement.style.display = "block"
  }
}

// Helper function to clear error messages
function clearErrorMessages() {
  const errorElements = document.querySelectorAll(".error-message")
  errorElements.forEach((element) => {
    element.textContent = ""
    element.style.display = "none"
  })
}

// Simulate form submission
function submitForm(name, email, subject, message) {
  const submitButton = contactForm.querySelector('button[type="submit"]')
  const originalText = submitButton.textContent

  // Show loading state
  submitButton.textContent = "Sending..."
  submitButton.disabled = true

  // Simulate API call delay
  setTimeout(() => {
    // Reset button
    submitButton.textContent = originalText
    submitButton.disabled = false

    // Show success message
    showSuccessMessage()

    // Reset form
    contactForm.reset()

    // Log form data (in real app, this would be sent to server)
    console.log("Form submitted:", { name, email, subject, message })
  }, 2000)
}

// Show success message
function showSuccessMessage() {
  // Create success message element
  const successMessage = document.createElement("div")
  successMessage.className = "success-message"
  successMessage.innerHTML = `
        <div style="
            background: #10b981;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            text-align: center;
            animation: fadeInUp 0.5s ease;
        ">
            <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
            Thank you! Your message has been sent successfully.
        </div>
    `

  // Insert before the form
  contactForm.parentNode.insertBefore(successMessage, contactForm)

  // Remove success message after 5 seconds
  setTimeout(() => {
    successMessage.remove()
  }, 5000)
}

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for scroll animations
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".service-card, .project-card, .experience-item")

  animatedElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(element)
  })
})

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing animation when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const originalText = heroTitle.textContent
    typeWriter(heroTitle, originalText, 80)
  }
})

// Smooth reveal animation for sections
function revealOnScroll() {
  const reveals = document.querySelectorAll(".section-header, .about-text, .contact-info")

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("revealed")
    }
  })
}

window.addEventListener("scroll", revealOnScroll)

// Add CSS for reveal animation
const style = document.createElement("style")
style.textContent = `
    .section-header, .about-text, .contact-info {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .section-header.revealed, .about-text.revealed, .contact-info.revealed {
        opacity: 1;
        transform: translateY(0);
    }
`
document.head.appendChild(style)

// Initialize reveal animation
document.addEventListener("DOMContentLoaded", revealOnScroll)

// Project card hover effects
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)"
  })
})

// Skills animation on scroll
function animateSkills() {
  const skillTags = document.querySelectorAll(".skill-tag")

  skillTags.forEach((tag, index) => {
    setTimeout(() => {
      tag.style.opacity = "1"
      tag.style.transform = "translateY(0)"
    }, index * 100)
  })
}

// Initialize skills animation
const skillsSection = document.querySelector(".skills-section")
if (skillsSection) {
  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkills()
          skillsObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  skillsObserver.observe(skillsSection)
}

// Add initial styles for skills animation
document.querySelectorAll(".skill-tag").forEach((tag) => {
  tag.style.opacity = "0"
  tag.style.transform = "translateY(20px)"
  tag.style.transition = "opacity 0.5s ease, transform 0.5s ease"
})

// Parallax effect for hero background
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroBackground = document.querySelector(".hero-background")

  if (heroBackground) {
    const speed = scrolled * 0.5
    heroBackground.style.transform = `translateY(${speed}px)`
  }
})

// Console welcome message
console.log(`
 Welcome Rachit Portfolio!
 Contact: rachitshakya2003@gmail.com
 LinkedIn: https://linkedin.com/in/rachit-shakya-6634b7302
 GitHub: https://github.com/Rachit833


`)
