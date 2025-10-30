document.addEventListener("DOMContentLoaded", () => {
  const toolsContainer = document.querySelector(".tools-scroll-container")

  if (!toolsContainer) return

  const animatedElements = toolsContainer.querySelectorAll("*")

  // Feature detection: check if device supports hover
  const supportsHover = window.matchMedia('(hover: hover)').matches

  // Helper function to set animation play state with error handling and verification
  const setAnimationPlayState = (element, targetState) => {
    try {
      element.style.animationPlayState = targetState
      
      // Verify the state change took effect
      const computedStyle = window.getComputedStyle(element)
      const actualState = computedStyle.animationPlayState
      
      if (actualState !== targetState) {
        console.warn(`Animation play state verification failed: expected '${targetState}', but got '${actualState}'`)
      }
    } catch (error) {
      console.error(`Failed to set animation-play-state to '${targetState}':`, error)
    }
  }

  // Only attach hover listeners on devices that support true hover
  if (supportsHover) {
    toolsContainer.addEventListener("mouseenter", () => {
      animatedElements.forEach((element) => {
        setAnimationPlayState(element, "paused")
      })
    })

    toolsContainer.addEventListener("mouseleave", () => {
      animatedElements.forEach((element) => {
        setAnimationPlayState(element, "running")
      })
    })
  }
})
