// Language variable initialization (needed by contact form)
let currentLang = localStorage.getItem("language") || "it" // Default to Italian

// EmailJS integration commented out - using FormSubmit instead
// emailjs.init("YOUR_PUBLIC_KEY")

// Loading Page Redirect
if (window.location.pathname.endsWith("loading.html")) {
  setTimeout(() => {
    window.location.href = "index.html"
  }, 3000)
}

// Mobile Navigation Toggle
const navToggle = document.getElementById("navToggle")
const navMenu = document.getElementById("navMenu")

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active")
    navMenu.classList.toggle("active")
  })
}

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll(".nav-menu a")
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (navMenu && navToggle) {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains("active")) {
      navToggle.classList.remove("active")
      navMenu.classList.remove("active")
    }
  }
})

// Project Counter Animation
const counterElement = document.getElementById("projectCounter")
if (counterElement) {
  const targetCount = 150
  let currentCount = 0
  let hasAnimated = false

  const animateCounter = () => {
    if (hasAnimated) return

    const increment = targetCount / 50
    const timer = setInterval(() => {
      currentCount += increment
      if (currentCount >= targetCount) {
        currentCount = targetCount
        clearInterval(timer)
        hasAnimated = true
      }
      counterElement.textContent = Math.floor(currentCount)
    }, 30)
  }

  // Intersection Observer for counter animation
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter()
        }
      })
    },
    { threshold: 0.5 },
  )

  counterObserver.observe(counterElement)
}

// FAQ Accordion
const faqItems = document.querySelectorAll(".faq-item")
faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question")
  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active")

    // Close all items
    faqItems.forEach((faq) => faq.classList.remove("active"))

    // Open clicked item if it wasn't active
    if (!isActive) {
      item.classList.add("active")
    }
  })
})

// Contact Form Submission
const contactForm = document.getElementById("contactForm")
if (contactForm && contactForm.dataset.ajax === "true") {
  const submitButton = contactForm.querySelector('button[type="submit"]')
  const originalButtonText = {
    it: submitButton.getAttribute("data-it") || "Invia Messaggio",
    en: submitButton.getAttribute("data-en") || "Send Message",
  }

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const message = document.getElementById("message").value

    // Remove any existing status messages
    const existingStatus = contactForm.querySelector(".form-status-message")
    if (existingStatus) {
      existingStatus.remove()
    }

    // Disable submit button and show loading state
    submitButton.disabled = true
    submitButton.classList.add("loading")

    const loadingText = {
      it: "Invio in corso...",
      en: "Sending...",
    }
    submitButton.textContent = loadingText[currentLang]

    try {
      // Simulate API call (replace with actual FormSubmit or API endpoint)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Uncomment below for actual FormSubmit integration:
      // const response = await fetch('https://formsubmit.co/YOUR_EMAIL', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email, message })
      // })
      // if (!response.ok) throw new Error('Submission failed')

      // Show success message
      showFormStatus("success")

      // Reset form after short delay
      setTimeout(() => {
        contactForm.reset()
      }, 1000)
    } catch (error) {
      // Show error message
      showFormStatus("error")
      console.error("Form submission error:", error)
    } finally {
      // Re-enable submit button
      submitButton.disabled = false
      submitButton.classList.remove("loading")
      submitButton.textContent = originalButtonText[currentLang]
    }
  })

  function showFormStatus(type) {
    const statusMessages = {
      success: {
        it: "Messaggio inviato con successo! Ti risponderemo presto.",
        en: "Message sent successfully! We'll get back to you soon.",
      },
      error: {
        it: "Si è verificato un errore. Riprova più tardi.",
        en: "An error occurred. Please try again later.",
      },
    }

    // Create status message element
    const statusDiv = document.createElement("div")
    statusDiv.className = `form-status-message ${type}`

    const iconSpan = document.createElement("span")
    iconSpan.className = "status-icon"
    iconSpan.textContent = type === "success" ? "✓" : "✕"

    const textSpan = document.createElement("span")
    textSpan.className = "status-text"
    textSpan.setAttribute("data-it", statusMessages[type].it)
    textSpan.setAttribute("data-en", statusMessages[type].en)
    textSpan.textContent = statusMessages[type][currentLang]

    statusDiv.appendChild(iconSpan)
    statusDiv.appendChild(textSpan)

    // Insert after form
    contactForm.appendChild(statusDiv)

    // Trigger animation
    setTimeout(() => {
      statusDiv.classList.add("show")
    }, 10)

    // Auto-remove after 5 seconds
    setTimeout(() => {
      statusDiv.classList.remove("show")
      setTimeout(() => {
        if (statusDiv.parentNode) {
          statusDiv.remove()
        }
      }, 300)
    }, 5000)
  }
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add scroll animation to elements
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

// Observe all cards and sections
const animatedElements = document.querySelectorAll(".feature-card, .service-card, .about-card, .tool-logo")
animatedElements.forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(20px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// Language Switcher
const langToggle = document.getElementById("langToggle")

// Function to update all translatable elements
function updateLanguage(lang) {
  currentLang = lang
  localStorage.setItem("language", lang)

  // Update HTML lang attribute
  document.documentElement.lang = lang

  // Update all elements with data-en and data-it attributes
  const translatableElements = document.querySelectorAll("[data-en][data-it]")
  translatableElements.forEach((element) => {
    const translation = element.getAttribute(`data-${lang}`)
    if (translation) {
      // Check if it's an input/textarea placeholder or regular text content
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        element.placeholder = translation
      } else {
        element.textContent = translation
      }
    }
  })

  // Update language button
  if (langToggle) {
    const flagImg = langToggle.querySelector(".lang-flag")
    const textSpan = langToggle.querySelector(".lang-text")
    if (lang === "it") {
      flagImg.src = "assets/flag-en.svg"
      flagImg.alt = "English"
      textSpan.textContent = "EN"
    } else {
      flagImg.src = "assets/flag-it.svg"
      flagImg.alt = "Italian"
      textSpan.textContent = "IT"
    }
  }
}

// Initialize language on page load
updateLanguage(currentLang)

// Language toggle button click handler
if (langToggle) {
  langToggle.addEventListener("click", () => {
    const newLang = currentLang === "it" ? "en" : "it"
    updateLanguage(newLang)
  })
}

// Cookie Consent Management
const cookieConsent = document.getElementById("cookieConsent")
const acceptCookiesBtn = document.getElementById("acceptCookies")

// Check if user has already accepted cookies
function checkCookieConsent() {
  const consent = localStorage.getItem("cookieConsent")
  if (!consent && cookieConsent) {
    // Show banner after a short delay for better UX
    setTimeout(() => {
      cookieConsent.classList.add("show")
    }, 1000)
  }
}

// Accept cookies
if (acceptCookiesBtn) {
  acceptCookiesBtn.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "accepted")
    cookieConsent.classList.remove("show")

    // Optional: You can add analytics or tracking code here after consent
    console.log("Cookies accepted")
  })
}

// Initialize cookie consent check on page load
checkCookieConsent()

// Footer Collapsible Sections for Mobile
function initFooterCollapsible() {
  // Only activate on mobile/tablet screens
  if (window.innerWidth <= 768) {
    // Handle footer-column elements (new footer structure)
    const footerColumns = document.querySelectorAll(".footer-column")
    
    footerColumns.forEach((column) => {
      const heading = column.querySelector(".footer-heading")
      if (!heading) return

      // Remove existing click listeners to avoid duplicates
      const newHeading = heading.cloneNode(true)
      heading.parentNode.replaceChild(newHeading, heading)

      // Add click listener to toggle
      newHeading.addEventListener("click", () => {
        const isActive = column.classList.contains("active")

        // Close all columns
        footerColumns.forEach((c) => c.classList.remove("active"))

        // Open clicked column if it wasn't active
        if (!isActive) {
          column.classList.add("active")
        }
      })
    })

    // Open first column by default on mobile
    if (footerColumns.length > 0) {
      footerColumns[0].classList.add("active")
    }

    // Handle footer-section elements (old footer structure for compatibility)
    const footerSections = document.querySelectorAll(".footer-section")

    footerSections.forEach((section) => {
      const heading = section.querySelector("h3")
      if (!heading) return

      // Wrap content if not already wrapped
      let contentWrapper = section.querySelector(".footer-section-content")
      if (!contentWrapper) {
        contentWrapper = document.createElement("div")
        contentWrapper.className = "footer-section-content"

        // Move all children except h3 into wrapper
        const children = Array.from(section.children)
        children.forEach((child) => {
          if (child !== heading) {
            contentWrapper.appendChild(child)
          }
        })
        section.appendChild(contentWrapper)
      }

      // Remove existing click listeners to avoid duplicates
      const newHeading = heading.cloneNode(true)
      heading.parentNode.replaceChild(newHeading, heading)

      // Add click listener to toggle
      newHeading.addEventListener("click", () => {
        const isActive = section.classList.contains("active")

        // Close all sections
        footerSections.forEach((s) => s.classList.remove("active"))

        // Open clicked section if it wasn't active
        if (!isActive) {
          section.classList.add("active")
        }
      })
    })

    // Open first section by default on mobile
    if (footerSections.length > 0) {
      footerSections[0].classList.add("active")
    }
  } else {
    // Remove active class on desktop for both structures
    const footerColumns = document.querySelectorAll(".footer-column")
    footerColumns.forEach((column) => {
      column.classList.remove("active")
    })

    const footerSections = document.querySelectorAll(".footer-section")
    footerSections.forEach((section) => {
      section.classList.remove("active")
      const contentWrapper = section.querySelector(".footer-section-content")
      if (contentWrapper) {
        // Move children back out of wrapper
        const children = Array.from(contentWrapper.children)
        children.forEach((child) => {
          section.appendChild(child)
        })
        contentWrapper.remove()
      }
    })
  }
}

// Initialize footer collapsible
initFooterCollapsible()

// Reinitialize on window resize (debounced)
let resizeTimer
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    initFooterCollapsible()
  }, 250)
})

// Unified Hero Animation System
const heroAnimationSystem = {
  hero: null,
  heroContent: null,
  heroImage: null,
  rafId: null,
  isActive: false,
  mouseX: 0,
  mouseY: 0,
  scrollOffset: 0,
  mouseParallaxEnabled: false,
  scrollParallaxEnabled: false,

  init() {
    this.hero = document.querySelector(".hero")
    this.heroContent = document.querySelector(".hero-content")
    this.heroImage = document.querySelector(".hero-image")

    if (!this.hero || !this.heroContent || !this.heroImage) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    this.isActive = true
    this.mouseParallaxEnabled = false
    this.scrollParallaxEnabled = true

    // Initialize particle system
    this.initParticles()

    // Set up event listeners
    this.hero.addEventListener("mousemove", this.handleMouseMove.bind(this))
    this.hero.addEventListener("mouseenter", this.handleMouseEnter.bind(this))
    this.hero.addEventListener("mouseleave", this.handleMouseLeave.bind(this))
    window.addEventListener("scroll", this.handleScroll.bind(this), { passive: true })

    // Start unified animation loop
    this.startAnimationLoop()
  },

  initParticles() {
    // Generate 20-30 particles
    const particleCount = Math.floor(Math.random() * 11) + 20
    const particlesContainer = document.createElement("div")
    particlesContainer.className = "particles-container"
    this.hero.prepend(particlesContainer)

    for (let i = 0; i < particleCount; i++) {
      this.createParticle(particlesContainer)
    }
  },

  createParticle(container) {
    const particle = document.createElement("div")
    particle.className = "particle"

    // Random starting position
    const startX = Math.random() * 100
    const startY = Math.random() * 100
    particle.style.left = `${startX}%`
    particle.style.top = `${startY}%`

    // Random size (4-12px)
    const size = Math.floor(Math.random() * 9) + 4
    particle.style.width = `${size}px`
    particle.style.height = `${size}px`

    // Random color (turquoise or white with varying opacity)
    const colors = [
      "rgba(40, 225, 232, 0.4)",
      "rgba(40, 225, 232, 0.3)",
      "rgba(40, 225, 232, 0.2)",
      "rgba(255, 255, 255, 0.3)",
      "rgba(255, 255, 255, 0.2)",
    ]
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]

    // Random animation duration (15-30s)
    const duration = Math.random() * 15 + 15
    particle.style.animationDuration = `${duration}s`

    // Random animation delay (0-5s)
    const delay = Math.random() * 5
    particle.style.animationDelay = `${delay}s`

    // Random movement distance
    const moveX = (Math.random() - 0.5) * 100
    const moveY = (Math.random() - 0.5) * 100
    particle.style.setProperty("--moveX", `${moveX}px`)
    particle.style.setProperty("--moveY", `${moveY}px`)

    container.appendChild(particle)
  },

  handleMouseMove(e) {
    if (!this.isActive) return

    const rect = this.hero.getBoundingClientRect()
    const heroWidth = rect.width
    const heroHeight = rect.height

    // Get mouse position relative to hero section
    this.mouseX = e.clientX - rect.left
    this.mouseY = e.clientY - rect.top

    // Normalize to -1 to 1
    this.mouseX = (this.mouseX - heroWidth / 2) / (heroWidth / 2)
    this.mouseY = (this.mouseY - heroHeight / 2) / (heroHeight / 2)
  },

  handleMouseEnter() {
    this.mouseParallaxEnabled = true
  },

  handleMouseLeave() {
    this.mouseParallaxEnabled = false
    this.mouseX = 0
    this.mouseY = 0
  },

  handleScroll() {
    if (!this.isActive) return

    const scrolled = window.pageYOffset
    const heroTop = this.hero.offsetTop
    const heroHeight = this.hero.offsetHeight

    // Only apply parallax when hero section is visible
    if (scrolled < heroTop + heroHeight) {
      this.scrollOffset = (scrolled - heroTop) * 0.5
    } else {
      this.scrollOffset = 0
    }
  },

  startAnimationLoop() {
    const animate = () => {
      if (!this.isActive) return

      let contentTransform = ""
      let imageTransform = ""

      // Apply mouse parallax
      if (this.mouseParallaxEnabled) {
        const contentOffsetX = this.mouseX * 8
        const contentOffsetY = this.mouseY * 8
        const imageOffsetX = this.mouseX * 12
        const imageOffsetY = this.mouseY * 12

        contentTransform = `translate(${-contentOffsetX}px, ${-contentOffsetY}px)`
        imageTransform = `translate(${imageOffsetX}px, ${imageOffsetY}px)`
      }

      // Apply scroll parallax
      if (this.scrollParallaxEnabled && this.scrollOffset !== 0) {
        const scrollContentY = this.scrollOffset * 0.3
        const scrollImageY = this.scrollOffset * -0.2

        if (contentTransform) {
          contentTransform += ` translateY(${scrollContentY}px)`
        } else {
          contentTransform = `translateY(${scrollContentY}px)`
        }

        if (imageTransform) {
          imageTransform += ` translateY(${scrollImageY}px)`
        } else {
          imageTransform = `translateY(${scrollImageY}px)`
        }
      }

      // Apply transforms
      if (contentTransform) {
        this.heroContent.style.transform = contentTransform
      } else {
        this.heroContent.style.transform = ""
      }

      if (imageTransform) {
        this.heroImage.style.transform = imageTransform
      } else {
        this.heroImage.style.transform = ""
      }

      this.rafId = requestAnimationFrame(animate)
    }

    animate()
  },

  destroy() {
    this.isActive = false
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
    }
  },
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  heroAnimationSystem.init()
})
