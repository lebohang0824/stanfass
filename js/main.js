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
  // Cart Drawer
  // ===============================
  const cartToggle = document.getElementById('cart-toggle');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartClose = document.getElementById('cart-close');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartContent = document.getElementById('cart-content');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');

  let cart = [];

  function updateCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartCount.textContent = totalItems;
    cartTotal.textContent = `$${totalPrice}`;

    if (cart.length === 0) {
      cartContent.innerHTML = '<div class="cart-empty"><p>Your bag is empty</p></div>';
    } else {
      cartContent.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
          <div class="cart-item__info">
            <h4 class="cart-item__name">${item.name}</h4>
            <span class="cart-item__price">$${item.price}</span>
          </div>
          <div class="cart-item__actions">
            <button class="cart-item__remove" data-index="${index}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
      `).join('');

      document.querySelectorAll('.cart-item__remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const index = parseInt(e.currentTarget.dataset.index);
          cart.splice(index, 1);
          updateCart();
        });
      });
    }
  }

  if (cartToggle && cartDrawer) {
    cartToggle.addEventListener('click', () => {
      cartDrawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    const closeCart = () => {
      cartDrawer.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (cartClose) cartClose.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
  }

  // ===============================
  // Add to Bag
  // ===============================
  document.querySelectorAll('.product-card__btn--primary').forEach(btn => {
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
      setTimeout(() => {
        btn.textContent = 'Add to Bag';
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

      productCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
          setTimeout(() => card.classList.add('animate-in'), 10);
        } else {
          card.style.display = 'none';
          card.classList.remove('animate-in');
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
    '.hero__content, .products__header, .product-card, .feature, .newsletter__content, .footer__brand, .footer__social'
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
  // Product Card Hover Interactions
  // ===============================
  const productCardsAll = document.querySelectorAll('.product-card');
  
  productCardsAll.forEach(card => {
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
  // Link Hover Underline Animation
  // ===============================
  const links = document.querySelectorAll('.nav__link, .footer__social-link, .footer__links a, .footer__links-col a');
  
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.classList.add('link--hovered');
    });
    
    link.addEventListener('mouseleave', () => {
      link.classList.remove('link--hovered');
    });
  });

  // ===============================
  // Newsletter Form
  // ===============================
  const newsletterForm = document.querySelector('.newsletter__form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      const btn = newsletterForm.querySelector('button');
      
      if (input.value) {
        btn.textContent = 'Subscribed!';
        input.value = '';
        setTimeout(() => {
          btn.textContent = 'Subscribe';
        }, 2000);
      }
    });
  }
});
