document.addEventListener('DOMContentLoaded', () => {
  // ===============================
  // Mobile Navigation Toggle
  // ===============================
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });

    document.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // ===============================
  // Smooth Scroll
  // ===============================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const navHeight = document.querySelector('.nav').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===============================
  // Intersection Observer for Fade-In Animations
  // ===============================
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.animationDelay || 0;
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Elements to animate
  const animateElements = document.querySelectorAll(
    '.hero__content, .hero__scroll, .hero__brand, .about__header, .about__story, .about__values, .about__statement, ' +
    '.collections__header, .product-card, .exclusivity__header, .exclusivity__grid, .exclusivity__ticker, ' +
    '.contact__header, .contact__info, .contact__cta, .footer__brand, .footer__social'
  );

  animateElements.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });

  // ===============================
  // Nav Background on Scroll
  // ===============================
  let lastScroll = 0;
  const nav = document.querySelector('.nav');
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
    
    if (currentScroll > lastScroll && currentScroll > 200) {
      nav.classList.add('nav--hidden');
    } else {
      nav.classList.remove('nav--hidden');
    }
    
    lastScroll = currentScroll;
  });

  // ===============================
  // Hero Scroll Indicator Click
  // ===============================
  const heroScroll = document.querySelector('.hero__scroll');
  if (heroScroll) {
    heroScroll.addEventListener('click', () => {
      const aboutSection = document.querySelector('#about');
      if (aboutSection) {
        const navHeight = document.querySelector('.nav').offsetHeight;
        const targetPosition = aboutSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  }

  // ===============================
  // Product Card Hover Interactions
  // ===============================
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('product-card--hovered');
    });
    
    card.addEventListener('mouseleave', () => {
      card.classList.remove('product-card--hovered');
    });
  });

  // ===============================
  // Button Hover Sound Effect (Visual)
  // ===============================
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.classList.add('btn--hovered');
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.classList.remove('btn--hovered');
    });
  });

  // ===============================
  // Parallax Effect on Hero
  // ===============================
  const heroBg = document.querySelector('.hero__bg');
  
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.3;
      
      heroBg.style.transform = `translateY(${rate}px)`;
    });
  }

  // ===============================
  // Exclusivity Ticker Hover Pause
  // ===============================
  const ticker = document.querySelector('.exclusivity__ticker');
  
  if (ticker) {
    ticker.addEventListener('mouseenter', () => {
      ticker.classList.add('paused');
    });
    
    ticker.addEventListener('mouseleave', () => {
      ticker.classList.remove('paused');
    });
  }

  // ===============================
  // Link Hover Underline Animation
  // ===============================
  const links = document.querySelectorAll('.nav__link, .footer__social-link, .footer__links a');
  
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.classList.add('link--hovered');
    });
    
    link.addEventListener('mouseleave', () => {
      link.classList.remove('link--hovered');
    });
  });

  // ===============================
  // Cursor Trail Effect (Optional Enhancement)
  // ===============================
  let cursorX = 0;
  let cursorY = 0;
  let cursorVisible = false;
  
  document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    
    if (!cursorVisible) {
      cursorVisible = true;
    }
  });

  // ===============================
  // Reveal Elements on Scroll (Staggered)
  // ===============================
  const staggerGroups = document.querySelectorAll('.about__values, .collections__grid, .exclusivity__grid');
  
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const items = entry.target.querySelectorAll(':scope > *');
        items.forEach((item, index) => {
          item.style.transitionDelay = `${index * 100}ms`;
          item.classList.add('animate-in');
        });
        staggerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  staggerGroups.forEach(group => {
    staggerObserver.observe(group);
  });
});
