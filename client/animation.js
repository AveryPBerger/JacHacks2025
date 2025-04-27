document.addEventListener('DOMContentLoaded', function() {
    // Select all elements with the fade-in class
    const animatedElements = document.querySelectorAll('.fade-in');
    
    // Create the Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // When element is in view
        if (entry.isIntersecting) {
          // Start the animation
          entry.target.style.animationPlayState = 'running';
          // Stop observing after it's animated
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 }); // Trigger when 10% of element is visible
    
    // Start observing all animated elements
    animatedElements.forEach(element => {
      element.style.animationPlayState = 'paused'; // Pause animation initially
      observer.observe(element);
    });
  });