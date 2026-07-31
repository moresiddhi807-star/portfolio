/* ==========================================================================
   TABLE OF CONTENTS
   1. Data (Projects, Roles for typing effect)
   2. Loader
   3. Theme Toggle
   4. Scroll Progress Bar
   5. Custom Cursor
   6. Navbar (scroll state, active link, mobile menu)
   7. Smooth Scroll
   8. Hero: Network Canvas Background
   9. Hero: Typing Animation
   10. Scroll Reveal (Intersection Observer)
   11. Number Counters + Skill Bars + Circular Skill Indicators
   12. Projects: Render, Filter, Search, Modal
   13. Testimonials Carousel
   14. Contact Form Validation
   15. Button Ripple Effect
   16. Back To Top + Footer Year
   17. Init
   ========================================================================== */

(function () {
  'use strict';

  /* ==========================================================================
     1. DATA
     ========================================================================== */
  const ROLES = [
    'Building Intelligent Web Experiences',
    'Designing Human-Centered AI Products',
    'Shipping Full Stack Applications',
    'Turning Data Into Interfaces',
  ];

  const PROJECTS = [
    {
      id: 'scholarpath',
      name: 'ScholarPath AI',
      category: 'ai',
      short: 'An AI academic advisor that maps course history to personalized scholarship and career paths.',
      desc: 'ScholarPath AI ingests a student\u2019s transcript and interests, then uses an LLM-driven recommendation engine to surface scholarships, research opportunities and course sequences tailored to their goals. Built with a FastAPI backend and a real-time recommendation UI.',
      tech: ['Python', 'FastAPI', 'React', 'Groq API'],
      image: 'images/project-scholarpath.svg',
      github: 'https://github.com/',
      live: 'https://scholarpath-ai-liart.vercel.app/',
    },
    {
      id: 'neuromeet',
      name: 'NeuroMeet AI',
      category: 'ai',
      short: 'Real-time meeting summarizer with speaker diarization and action-item extraction.',
      desc: 'NeuroMeet AI transcribes live meetings using Whisper, separates speakers, and extracts structured action items and decisions in real time. Designed for teams that want searchable, actionable meeting notes without manual effort.',
      tech: ['Whisper', 'Groq API', 'Node.js', 'WebSockets'],
      image: 'images/project-neuromeet.svg',
    },
    {
      id: 'posesense',
      name: 'PoseSense AI',
      category: 'ml',
      short: 'Computer-vision fitness coach that scores exercise form from webcam video.',
      desc: 'PoseSense AI uses pose-estimation models to track joint angles during exercise, scoring form quality frame by frame and giving corrective feedback in real time \u2014 entirely in the browser, with no video leaving the device.',
      tech: ['Python', 'ML', 'TensorFlow.js', 'Canvas API'],
      image: 'images/project-posesense.svg',
    },
    {
      id: 'hairbloom',
      name: 'HairBloom',
      category: 'web',
      short: 'A full-stack e-commerce experience for a haircare startup, from cart to checkout.',
      desc: 'HairBloom is a complete storefront build: product catalog, cart, authentication and a lightweight admin panel for inventory. Focused on fast load times and a smooth, animated checkout flow.',
      tech: ['JavaScript', 'MySQL', 'FastAPI', 'CSS3'],
      image: 'images/project-hairbloom.svg',
    },
    {
      id: 'floraarchive',
      name: 'Flora Archive',
      category: 'web',
      short: 'A searchable digital archive of botanical species for a student research collective.',
      desc: 'Flora Archive digitizes a university herbarium collection into a searchable, filterable database with high-resolution image zoom and citation export \u2014 built to replace a spreadsheet-based workflow.',
      tech: ['JavaScript', 'SQLite', 'Python', 'HTML5'],
      image: 'images/project-floraarchive.svg',
    },
    {
      id: 'portfolio-os',
      name: 'Portfolio OS',
      category: 'portfolio',
      short: 'This very site \u2014 a hand-built, animation-first personal portfolio system.',
      desc: 'A from-scratch portfolio built with vanilla HTML, CSS and JavaScript: no frameworks, no build step. Focused on premium motion design, accessibility and a design system that could scale to a full product.',
      tech: ['HTML5', 'CSS3', 'JavaScript'],
      image: 'images/project-portfolio.svg',
      github: 'https://github.com/',
      live: 'https://example.com/',
    },
  ];

  /* ==========================================================================
     2. LOADER
     ========================================================================== */
  function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('is-hidden'), 500);
    });
    // Fallback in case 'load' already fired or takes too long
    setTimeout(() => loader.classList.add('is-hidden'), 3000);
  }

  /* ==========================================================================
     3. THEME TOGGLE
     ========================================================================== */
  function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    const root = document.documentElement;
    const stored = localStorage.getItem('portfolio-theme');

    if (stored) {
      root.setAttribute('data-theme', stored);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      root.setAttribute('data-theme', 'light');
    }

    updateToggleState();

    toggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      localStorage.setItem('portfolio-theme', next);
      updateToggleState();
    });

    function updateToggleState() {
      const isLight = root.getAttribute('data-theme') === 'light';
      toggle.setAttribute('aria-pressed', String(isLight));
    }
  }

  /* ==========================================================================
     4. SCROLL PROGRESS BAR
     ========================================================================== */
  function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = percent + '%';
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ==========================================================================
     5. CUSTOM CURSOR
     ========================================================================== */
  function initCustomCursor() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const dot = document.getElementById('cursorDot');
    const glow = document.getElementById('cursorGlow');
    if (!dot || !glow) return;

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let gx = mx, gy = my;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
    });

    function animateGlow() {
      gx += (mx - gx) * 0.12;
      gy += (my - gy) * 0.12;
      glow.style.left = gx + 'px';
      glow.style.top = gy + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();

    const interactiveEls = document.querySelectorAll('a, button, .project-card, input, textarea');
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', () => dot.classList.add('is-active'));
      el.addEventListener('mouseleave', () => dot.classList.remove('is-active'));
    });
  }

  /* ==========================================================================
     6. NAVBAR
     ========================================================================== */
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    const burger = document.getElementById('navBurger');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('[data-nav]');
    const sections = Array.from(links).map((link) => document.querySelector(link.getAttribute('href')));

    function onScroll() {
      navbar.classList.toggle('is-scrolled', window.scrollY > 20);

      let currentIndex = 0;
      const scrollPos = window.scrollY + window.innerHeight * 0.3;
      sections.forEach((section, i) => {
        if (section && section.offsetTop <= scrollPos) currentIndex = i;
      });
      links.forEach((link, i) => link.classList.toggle('active', i === currentIndex));
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    burger.addEventListener('click', () => {
      const isOpen = navbar.classList.toggle('is-mobile-open');
      burger.classList.toggle('is-open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
    });

    links.forEach((link) => {
      link.addEventListener('click', () => {
        navbar.classList.remove('is-mobile-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ==========================================================================
     7. SMOOTH SCROLL (anchor links)
     ========================================================================== */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId.length <= 1) return;
        const target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        const navHeight = document.getElementById('navbar').offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight + 1;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  /* ==========================================================================
     8. HERO: NETWORK CANVAS BACKGROUND
     ========================================================================== */
  function initNetworkCanvas() {
    const canvas = document.getElementById('networkCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const hero = canvas.closest('.hero');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width, height, nodes = [];
    const mouse = { x: null, y: null, radius: 140 };

    function resize() {
      width = canvas.width = hero.offsetWidth;
      height = canvas.height = hero.offsetHeight;
      const count = Math.min(70, Math.floor((width * height) / 18000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.6 + 1,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        if (mouse.x !== null) {
          const dx = n.x - mouse.x, dy = n.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            n.x += (dx / dist) * force * 1.2;
            n.y += (dy / dist) * force * 1.2;
          }
        }
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.14 * (1 - dist / 130)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(108, 99, 255, 0.55)';
        ctx.fill();
      });

      if (!reduceMotion) requestAnimationFrame(draw);
    }

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    hero.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

    window.addEventListener('resize', resize);
    resize();
    draw();
  }

  /* ==========================================================================
     9. HERO: TYPING ANIMATION
     ========================================================================== */
  function initTypingEffect() {
    const el = document.getElementById('typingText');
    if (!el) return;
    let roleIndex = 0, charIndex = 0, deleting = false;

    function tick() {
      const current = ROLES[roleIndex];
      if (!deleting) {
        charIndex++;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1600);
          return;
        }
      } else {
        charIndex--;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % ROLES.length;
        }
      }
      setTimeout(tick, deleting ? 30 : 55);
    }
    tick();
  }

  /* ==========================================================================
     10. SCROLL REVEAL
     ========================================================================== */
  function initScrollReveal() {
    const targets = document.querySelectorAll('.reveal-up, .reveal-left');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    targets.forEach((t) => observer.observe(t));
  }

  /* ==========================================================================
     11. COUNTERS + SKILL BARS + CIRCLES
     ========================================================================== */
  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-counter'));
    const decimals = parseInt(el.getAttribute('data-decimal') || '0', 10);
    const duration = 1400;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = decimals > 0 ? value.toFixed(decimals) : Math.round(value);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = decimals > 0 ? target.toFixed(decimals) : target;
    }
    requestAnimationFrame(step);
  }

  function initCountersAndBars() {
    const counters = document.querySelectorAll('[data-counter]');
    const bars = document.querySelectorAll('.skill-bar-fill');
    const circles = document.querySelectorAll('.circle-fill');
    const CIRCUMFERENCE = 2 * Math.PI * 52;

    circles.forEach((c) => { c.style.strokeDasharray = CIRCUMFERENCE.toString(); });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;

        if (el.hasAttribute('data-counter')) animateCounter(el);

        if (el.classList.contains('skill-bar-fill')) {
          const val = el.getAttribute('data-fill');
          requestAnimationFrame(() => { el.style.width = val + '%'; });
        }

        if (el.classList.contains('circle-fill')) {
          const val = parseFloat(el.getAttribute('data-circle'));
          const offset = CIRCUMFERENCE - (val / 100) * CIRCUMFERENCE;
          requestAnimationFrame(() => { el.style.strokeDashoffset = offset.toString(); });
        }

        observer.unobserve(el);
      });
    }, { threshold: 0.4 });

    counters.forEach((c) => observer.observe(c));
    bars.forEach((b) => observer.observe(b));
    circles.forEach((c) => observer.observe(c));
  }

  /* ==========================================================================
     12. PROJECTS: RENDER, FILTER, SEARCH, MODAL
     ========================================================================== */
  function initProjects() {
    const grid = document.getElementById('projectsGrid');
    const emptyMsg = document.getElementById('projectsEmpty');
    const filterWrap = document.getElementById('projectFilters');
    const searchInput = document.getElementById('projectSearch');
    if (!grid) return;

    function cardHTML(project) {
      return `
        <article class="project-card reveal-up" data-category="${project.category}" data-id="${project.id}" tabindex="0" role="button" aria-label="View details for ${project.name}">
          <div class="project-card-image">
            <img src="${project.image}" alt="${project.name} preview" loading="lazy" />
          </div>
          <div class="project-card-body">
            <h3 class="project-card-title">${project.name}</h3>
            <p class="project-card-desc">${project.short}</p>
            <div class="project-card-tags">${project.tech.map((t) => `<span>${t}</span>`).join('')}</div>
            <div class="project-card-actions">
              <a href="${project.github}" target="_blank" rel="noopener" class="btn btn-outline btn-sm" onclick="event.stopPropagation()">Code</a>
              <a href="${project.live}" target="_blank" rel="noopener" class="btn btn-primary btn-sm" onclick="event.stopPropagation()">Live Demo</a>
            </div>
          </div>
        </article>`;
    }

    function render(list) {
      grid.innerHTML = list.map(cardHTML).join('');
      emptyMsg.hidden = list.length !== 0;

      grid.querySelectorAll('.project-card').forEach((card) => {
        card.classList.add('is-visible'); // already-filtered cards should just show
        card.addEventListener('click', () => openModal(card.dataset.id));
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card.dataset.id); }
        });
      });
    }

    function applyFilters() {
      const activeFilter = filterWrap.querySelector('.filter-chip.is-active').dataset.filter;
      const query = searchInput.value.trim().toLowerCase();

      const filtered = PROJECTS.filter((p) => {
        const matchesFilter = activeFilter === 'all' || p.category === activeFilter;
        const matchesQuery = !query ||
          p.name.toLowerCase().includes(query) ||
          p.short.toLowerCase().includes(query) ||
          p.tech.some((t) => t.toLowerCase().includes(query));
        return matchesFilter && matchesQuery;
      });

      render(filtered);
    }

    filterWrap.addEventListener('click', (e) => {
      const chip = e.target.closest('.filter-chip');
      if (!chip) return;
      filterWrap.querySelectorAll('.filter-chip').forEach((c) => {
        c.classList.remove('is-active');
        c.setAttribute('aria-selected', 'false');
      });
      chip.classList.add('is-active');
      chip.setAttribute('aria-selected', 'true');
      applyFilters();
    });

    searchInput.addEventListener('input', applyFilters);

    // Modal
    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalTags = document.getElementById('modalTags');
    const modalGithub = document.getElementById('modalGithub');
    const modalLive = document.getElementById('modalLive');

    function openModal(id) {
      const project = PROJECTS.find((p) => p.id === id);
      if (!project) return;
      modalImage.src = project.image;
      modalImage.alt = project.name + ' preview';
      modalTitle.textContent = project.name;
      modalDesc.textContent = project.desc;
      modalTags.innerHTML = project.tech.map((t) => `<span>${t}</span>`).join('');
      modalGithub.href = project.github;
      modalLive.href = project.live;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

    render(PROJECTS);
  }

  /* ==========================================================================
     13. TESTIMONIALS CAROUSEL
     ========================================================================== */
  function initTestimonials() {
    const track = document.getElementById('testimonialTrack');
    if (!track) return;
    const cards = Array.from(track.querySelectorAll('.testimonial-card'));
    const dotsWrap = document.getElementById('testimonialDots');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    let index = 0;
    let autoplayTimer;

    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'testimonial-dot';
      dot.setAttribute('aria-label', `Show testimonial ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function goTo(i) {
      index = (i + cards.length) % cards.length;
      cards.forEach((c, ci) => c.classList.toggle('is-active', ci === index));
      dots.forEach((d, di) => d.classList.toggle('is-active', di === index));
      resetAutoplay();
    }

    function resetAutoplay() {
      clearInterval(autoplayTimer);
      autoplayTimer = setInterval(() => goTo(index + 1), 6000);
    }

    prevBtn.addEventListener('click', () => goTo(index - 1));
    nextBtn.addEventListener('click', () => goTo(index + 1));

    goTo(0);
  }

  /* ==========================================================================
     14. CONTACT FORM VALIDATION
     ========================================================================== */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const successBox = document.getElementById('formSuccess');

    const validators = {
      name: (v) => v.trim().length >= 2 || 'Please enter your full name.',
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Please enter a valid email address.',
      subject: (v) => v.trim().length >= 3 || 'Subject should be at least 3 characters.',
      message: (v) => v.trim().length >= 10 || 'Message should be at least 10 characters.',
    };

    function validateField(name) {
      const input = form.elements[name];
      const errorEl = document.getElementById(name + 'Error');
      const result = validators[name](input.value);
      const field = input.closest('.form-field');

      if (result === true) {
        field.classList.remove('has-error');
        errorEl.textContent = '';
        return true;
      } else {
        field.classList.add('has-error');
        errorEl.textContent = result;
        return false;
      }
    }

    Object.keys(validators).forEach((name) => {
      form.elements[name].addEventListener('blur', () => validateField(name));
      form.elements[name].addEventListener('input', () => {
        if (form.elements[name].closest('.form-field').classList.contains('has-error')) {
          validateField(name);
        }
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const results = Object.keys(validators).map(validateField);
      const allValid = results.every(Boolean);
      if (!allValid) return;

      const submitBtn = document.getElementById('submitBtn');
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';

      // Simulate sending (no backend wired up in this static build).
      setTimeout(() => {
        successBox.classList.add('is-visible');
        form.reset();
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        setTimeout(() => successBox.classList.remove('is-visible'), 5000);
      }, 700);
    });
  }

  /* ==========================================================================
     15. BUTTON RIPPLE EFFECT
     ========================================================================== */
  function initRipple() {
    document.querySelectorAll('.ripple').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const rect = btn.getBoundingClientRect();
        btn.style.setProperty('--rx', (e.clientX - rect.left) + 'px');
        btn.style.setProperty('--ry', (e.clientY - rect.top) + 'px');
        btn.classList.remove('is-rippling');
        // Force reflow so the animation can restart
        void btn.offsetWidth;
        btn.classList.add('is-rippling');
      });
    });
  }

  /* ==========================================================================
     16. BACK TO TOP + FOOTER YEAR
     ========================================================================== */
  function initMisc() {
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
      backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     17. INIT
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initThemeToggle();
    initScrollProgress();
    initCustomCursor();
    initNavbar();
    initSmoothScroll();
    initNetworkCanvas();
    initTypingEffect();
    initProjects();
    initScrollReveal();
    initCountersAndBars();
    initTestimonials();
    initContactForm();
    initRipple();
    initMisc();
  });
})();
