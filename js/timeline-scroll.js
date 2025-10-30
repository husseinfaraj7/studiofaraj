// Scroll-triggered animations for timeline section
document.addEventListener("DOMContentLoaded", () => {
  const timelineItems = document.querySelectorAll(".timeline-item")

  // Initially hide all timeline items
  timelineItems.forEach((item) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(50px)"
    item.style.transition = "opacity 0.8s ease, transform 0.8s ease"
  })

  // Create Intersection Observer
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2, // Trigger when 20% of the element is visible
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Get the index of the timeline item
        const index = Array.from(timelineItems).indexOf(entry.target)

        // Add staggered delay based on index
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, index * 200) // 200ms delay between each item

        // Stop observing once animated
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe all timeline items
  timelineItems.forEach((item) => {
    observer.observe(item)
  })
})
