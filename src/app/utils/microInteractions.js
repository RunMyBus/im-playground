/* ============================================
   MICRO-INTERACTIONS JAVASCRIPT
   ============================================ */

// Enhanced form validation with micro-interactions
export const addFormMicroInteractions = () => {
  // Add shake animation to invalid inputs
  const addShakeAnimation = (element) => {
    element.classList.add('input-error');
    setTimeout(() => {
      element.classList.remove('input-error');
    }, 500);
  };

  // Add floating label functionality
  const addFloatingLabels = () => {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
    
    inputs.forEach(input => {
      const wrapper = input.closest('.challenge-form-box, .water-form-box, .input-contact');
      if (wrapper && !wrapper.classList.contains('floating-label')) {
        wrapper.classList.add('floating-label');
        
        // Add focus/blur events
        input.addEventListener('focus', () => {
          wrapper.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
          if (!input.value) {
            wrapper.classList.remove('focused');
          }
        });
        
        // Check if input has value on load
        if (input.value) {
          wrapper.classList.add('focused');
        }
      }
    });
  };

  // Add ripple effect to buttons
  const addRippleEffect = () => {
    const buttons = document.querySelectorAll('.btn-circle, .login_box_btn, .menu-btn-box, .new-btn');
    
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  };

  // Add loading states to buttons
  const addLoadingStates = () => {
    const buttons = document.querySelectorAll('button[type="submit"], .btn-circle');
    
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        if (this.type === 'submit' || this.classList.contains('btn-circle')) {
          this.classList.add('loading');
          
          // Add loading spinner
          const spinner = document.createElement('span');
          spinner.classList.add('loading-spinner');
          spinner.innerHTML = '⏳';
          this.appendChild(spinner);
          
          // Remove loading state after 2 seconds (adjust as needed)
          setTimeout(() => {
            this.classList.remove('loading');
            spinner.remove();
          }, 2000);
        }
      });
    });
  };

  // Add smooth scrolling to anchor links
  const addSmoothScrolling = () => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        // Skip if smooth scrolling is disabled for this link
        if (this.getAttribute('data-smooth-scroll') === 'false') {
          return;
        }
        
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        // Validate that targetId is a valid CSS selector
        if (!targetId || !targetId.startsWith('#')) {
          console.warn('Invalid target ID for smooth scrolling:', targetId);
          return;
        }
        
        try {
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          } else {
            console.warn('Target element not found:', targetId);
          }
        } catch (error) {
          console.error('Error in smooth scrolling:', error);
        }
      });
    });
  };

  // Add intersection observer for scroll animations
  const addScrollAnimations = () => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.volunteer-sec2-box, .what-we-do-box, .home-sec2-box');
    animatedElements.forEach(el => observer.observe(el));
  };

  // Add keyboard navigation enhancements
  const addKeyboardNavigation = () => {
    document.addEventListener('keydown', function(e) {
      // Add focus indicators for keyboard navigation
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', function() {
      document.body.classList.remove('keyboard-navigation');
    });
  };

  // Add hover sound effects (optional)
  const addHoverSounds = () => {
    const interactiveElements = document.querySelectorAll('.hover-lift, .btn-circle, .menu-btn-box');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', function() {
        // Add subtle hover effect
        this.style.transform = 'translateY(-2px) scale(1.02)';
      });
      
      element.addEventListener('mouseleave', function() {
        this.style.transform = '';
      });
    });
  };

  // Add form validation feedback
  const addFormValidationFeedback = () => {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      const inputs = form.querySelectorAll('input, textarea, select');
      
      inputs.forEach(input => {
        input.addEventListener('invalid', function() {
          addShakeAnimation(this);
        });
        
        input.addEventListener('input', function() {
          if (this.checkValidity()) {
            this.classList.add('valid');
          } else {
            this.classList.remove('valid');
          }
        });
      });
    });
  };

  // Add card flip animations
  const addCardFlipAnimations = () => {
    const cards = document.querySelectorAll('.volunteer-sec2-box, .what-we-do-box');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'perspective(1000px) rotateY(5deg) translateY(-5px)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = '';
      });
    });
  };

  // Add progress indicators
  const addProgressIndicators = () => {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
      const width = bar.getAttribute('data-width') || '100%';
      bar.style.setProperty('--progress-width', width);
    });
  };

  // Initialize all micro-interactions
  const initMicroInteractions = () => {
    addFloatingLabels();
    addRippleEffect();
    addLoadingStates();
    addSmoothScrolling();
    addScrollAnimations();
    addKeyboardNavigation();
    addHoverSounds();
    addFormValidationFeedback();
    addCardFlipAnimations();
    addProgressIndicators();
  };

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMicroInteractions);
  } else {
    initMicroInteractions();
  }

  // Re-run when new content is added (for SPA behavior)
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        // Re-initialize micro-interactions for new elements
        setTimeout(() => {
          addFloatingLabels();
          addRippleEffect();
          addLoadingStates();
        }, 100);
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
};

// Export for use in components
export default addFormMicroInteractions;
