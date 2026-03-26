document.addEventListener('DOMContentLoaded', () => {
  // ===============================
  // Mobile Navigation Toggle
  // ===============================
  const navToggle = document.getElementById('nav-toggle');
  const headerNav = document.querySelector('.header__nav');

  if (navToggle && headerNav) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      headerNav.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  }

  // ===============================
  // Cart Drawer
  // ===============================
  const cartToggle = document.getElementById('cart-toggle');
  const cartCount = document.getElementById('cart-count');

  let cart = [];

  function updateCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
  }

  // ===============================
  // Add to Bag
  // ===============================
  document.querySelectorAll('.product-card__btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = btn.dataset.name;
      const price = parseInt(btn.dataset.price);

      const existingItem = cart.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({ name, price, quantity: 1 });
      }

      updateCart();

      btn.textContent = 'Added!';
      btn.classList.add('product-card__btn--added');
      setTimeout(() => {
        const originalText = `Add to Bag — $${price}`;
        btn.textContent = originalText;
        btn.classList.remove('product-card__btn--added');
      }, 1000);
    });
  });

  // ===============================
  // Product Filters
  // ===============================
  const filterBtns = document.querySelectorAll('.products__filter');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      productCards.forEach((card, i) => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
          card.style.animation = 'none';
          card.offsetHeight; // trigger reflow
          card.style.animation = `slideUp 0.4s ease ${i * 50}ms forwards`;
          card.style.opacity = '0';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

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
        const header = document.querySelector('.header');
        const navHeight = header ? header.offsetHeight : 0;
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
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.animationDelay || 0;
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll(
    '.hero__content, .products__header, .product-card, .newsletter__content, .footer__brand, .footer__social'
  );

  animateElements.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });

  // ===============================
  // Hero Counter Animation
  // ===============================
  const counterElements = document.querySelectorAll('.hero__stat-num');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    counterElements.forEach(el => {
      const target = parseInt(el.dataset.count);
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current).toLocaleString();
      }, 16);
    });
  }

  // Trigger counter animation when hero is in view
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(animateCounters, 500);
          heroObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    heroObserver.observe(heroSection);
  }

  // ===============================
  // Header Scroll Effect
  // ===============================
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (header) {
      if (currentScroll > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
      } else {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = 'none';
      }
    }
    
    lastScroll = currentScroll;
  });

  // ===============================
  // Product Card Tilt on Hover
  // ===============================
  const cards = document.querySelectorAll('.product-card');
  
  cards.forEach(card => {
    const image = card.querySelector('.product-card__image');
    if (!image) return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      card.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });

  // ===============================
  // Newsletter Form
  // ===============================
  const newsletterForm = document.querySelector('.newsletter__form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('.newsletter__input');
      const btn = newsletterForm.querySelector('.newsletter__btn');
      
      if (input && input.value) {
        btn.textContent = 'You\'re In!';
        btn.style.background = '#0f0';
        btn.style.borderColor = '#0f0';
        btn.style.color = '#000';
        input.value = '';
        setTimeout(() => {
          btn.textContent = 'Subscribe';
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.style.color = '';
        }, 2500);
      }
    });
  }

  // ===============================
  // Parallax on Hero Splatters
  // ===============================
  const splatters = document.querySelectorAll('.hero__splatter');

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroHeight = heroSection ? heroSection.offsetHeight : 0;
    
    if (scrolled < heroHeight) {
      splatters.forEach((splatter, i) => {
        const speed = 0.1 + (i * 0.05);
        splatter.style.transform = `translateY(${scrolled * speed}px)`;
      });
    }
  });

  // ===============================
  // Glitch Effect on Logo Hover
  // ===============================
  const logo = document.querySelector('.header__logo');
  if (logo) {
    logo.addEventListener('mouseenter', () => {
      logo.style.animation = 'glitchText 0.3s linear infinite';
    });
    logo.addEventListener('mouseleave', () => {
      logo.style.animation = '';
    });
  }

  // ===============================
  // Mobile Menu Styles Injection
  // ===============================
  const style = document.createElement('style');
  style.textContent = `
    .header__nav.active {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(10px);
      padding: 1.5rem;
      gap: 1rem;
      border-bottom: 2px solid #1a1a1a;
    }
    .header__menu-btn.active span:first-child {
      transform: rotate(45deg) translate(2px, 3px);
    }
    .header__menu-btn.active span:last-child {
      transform: rotate(-45deg) translate(2px, -3px);
    }
    .body.menu-open {
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);
});
