// Modern JavaScript for ACEiT landing page

// Force scroll to top immediately when the page starts loading
window.onbeforeunload = function() {
  window.scrollTo(0, 0);
};

// Prevent any scroll restoration
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', function() {
  // Force scroll to top
  window.scrollTo(0, 0);
  
  // Elements selection
  const typewriterText = document.getElementById('typewriter-text');
  const logoContainer = document.getElementById('logo-container');
  const logo = document.getElementById('aceit-logo');
  const companiesSection = document.getElementById('companies-section');
  const aboutSection = document.getElementById('about-section');
  const header = document.querySelector('.site-header');
  const heroSection = document.getElementById('hero-section');
  const currentYear = document.getElementById('current-year');
  
  // Set current year in footer
  currentYear.textContent = new Date().getFullYear();
  // Function to reset sections to initial state
  function resetSections() {
    // Force scroll to top immediately
    window.scrollTo(0, 0);
    
    // Remove any hash from the URL without triggering a scroll
    if (window.location.hash) {
      history.pushState('', document.title, window.location.pathname + window.location.search);
    }
    
    // Hide sections immediately
    companiesSection.classList.add('hidden');
    companiesSection.classList.remove('show');
    aboutSection.classList.add('hidden');
    aboutSection.classList.remove('show');
    heroSection.classList.add('hidden');
    heroSection.classList.remove('fade-in');
    
    // Reset typewriter
    typewriterText.innerHTML = '';
    typewriterText.classList.remove('typing-complete');
  }

  // Text to be typed
  const text = "Hi, welcome to AceTeam Networks, we are now operating as part of ACEiT GROUP";
  let charIndex = 0;
  
  // Function for typewriter effect with callback when complete
  function typeWriter(callback) {
    if (charIndex < text.length) {
      typewriterText.innerHTML += text.charAt(charIndex);
      charIndex++;
      
      // Vary the typing speed slightly for a more natural effect
      const typingSpeed = Math.random() * 20 + 40; // Between 40-60ms
      setTimeout(() => typeWriter(callback), typingSpeed);
    } else {
      // Add a class to stop the cursor blinking after typing is complete
      typewriterText.classList.add('typing-complete');
      // Execute callback after typing is complete with a slight pause
      setTimeout(callback, 1000);
    }
  }

  // Handle page load and refresh
  function initializePage() {
    resetSections();
    charIndex = 0;
    
    // Start the typewriter effect with sequence of animations
    typeWriter(() => {
      // Show the hero section immediately after typing
      heroSection.classList.remove('hidden');
      heroSection.classList.add('fade-in');
      
      // Reveal companies section after a delay
      setTimeout(() => {
        companiesSection.classList.remove('hidden');
        companiesSection.classList.add('show');
        
        // Then reveal about section with a slight delay
        setTimeout(() => {
          aboutSection.classList.remove('hidden');
          aboutSection.classList.add('show');
        }, 400);
      }, 800);
    });
  }
    // Initialize page on load
  initializePage();

  // Handle browser back/forward buttons
  window.addEventListener('popstate', function(e) {
    e.preventDefault();
    initializePage();
  });
  
  // Also reinitialize on actual page load
  window.addEventListener('load', function() {
    initializePage();
  });
  
  // Handle any attempts to scroll before animation is complete
  let isAnimating = true;
  setTimeout(() => { isAnimating = false; }, 4000); // Approximately how long the intro takes
  
  window.addEventListener('scroll', function(e) {
    if (isAnimating) {
      window.scrollTo(0, 0);
    }
  });

  // Add smooth scroll functionality for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Add hover effects for company cards on touch devices
  const companyCards = document.querySelectorAll('.company-card');
  
  // Check if it's a touch device
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (isTouchDevice) {
    companyCards.forEach(card => {
      card.addEventListener('touchstart', function() {
        // First remove active class from all cards
        companyCards.forEach(c => c.classList.remove('touch-active'));
        // Add active class to the current card
        this.classList.add('touch-active');
      });
    });
    
    // Close card on tap outside
    document.addEventListener('touchstart', (e) => {
      if (!e.target.closest('.company-card')) {
        companyCards.forEach(c => c.classList.remove('touch-active'));
      }
    });
  }
  
  // Add subtle background animation effect
  const background = document.getElementById('background');
  let backgroundPos = { x: 0, y: 0 };
  
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    backgroundPos = {
      x: mouseX * 5,
      y: mouseY * 5
    };
    
    background.style.backgroundPosition = `
      ${50 + backgroundPos.x}% ${50 + backgroundPos.y}%,
      ${30 - backgroundPos.x}% ${70 - backgroundPos.y}%,
      center center
    `;
  });
  
  // Header scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
});