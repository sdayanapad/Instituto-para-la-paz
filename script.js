(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(pointer: coarse)").matches;

  /* =========================================================
     1. REVEAL ON SCROLL — staggered, per-section
     ========================================================= */
  const revealItems = document.querySelectorAll("[data-reveal]");

  if (reduceMotion) {
    revealItems.forEach(el => el.classList.add("is-visible"));
  } else {
    const groups = new Map(); // parent -> [items] to compute stagger index
    revealItems.forEach(el => {
      const parent = el.closest("section, footer") || document.body;
      if (!groups.has(parent)) groups.set(parent, []);
      groups.get(parent).push(el);
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const parent = el.closest("section, footer") || document.body;
          const siblings = groups.get(parent) || [el];
          const idx = siblings.indexOf(el);
          const delay = Math.min(idx * 70, 420); // small stagger, capped
          setTimeout(() => el.classList.add("is-visible"), delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });

    revealItems.forEach(el => io.observe(el));
  }

  /* =========================================================
     2. NAVBAR — contrast swap based on section background,
        condensed on scroll
     ========================================================= */
  const navbar = document.getElementById("navbar");
  const bgSections = document.querySelectorAll("[data-bg]");
  const pageRoot = document.documentElement;

  const bgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        const bg = entry.target.getAttribute("data-bg");
        navbar.classList.toggle("is-light", bg === "light");
        pageRoot.setAttribute("data-page-bg", bg);
      }
    });
  }, { threshold: [0.5] });

  bgSections.forEach(s => bgObserver.observe(s));

  let lastScroll = window.scrollY;
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("is-condensed", window.scrollY > 60);
    lastScroll = window.scrollY;
  }, { passive: true });

  /* =========================================================
     3. SCROLL PROGRESS RAIL
     ========================================================= */
  const progressFill = document.getElementById("progressFill");
  const updateProgress = () => {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - doc.clientHeight;
    const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progressFill.style.height = pct + "%";
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  /* =========================================================
     4. MOBILE MENU
     ========================================================= */
  const burger = document.getElementById("navBurger");
  const mobileMenu = document.getElementById("mobileMenu");
  burger.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  });
  mobileMenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  /* =========================================================
     5. SUBTLE PARALLAX — [data-parallax] elements
        translateY at a fraction of scroll delta within viewport
     ========================================================= */
  if (!reduceMotion && !isTouch) {
    const parallaxEls = Array.from(document.querySelectorAll("[data-parallax]")).map(el => ({
      el,
      factor: parseFloat(el.getAttribute("data-parallax")) || 0.1
    }));

    let ticking = false;
    const applyParallax = () => {
      const vh = window.innerHeight;
      parallaxEls.forEach(({ el, factor }) => {
        const rect = el.getBoundingClientRect();
        // progress: -1 (above) .. 1 (below) relative to viewport center
        const centerOffset = (rect.top + rect.height / 2 - vh / 2) / vh;
        const shift = centerOffset * factor * 100; // percentage-ish px
        el.style.transform = `translateY(${shift.toFixed(2)}px) scale(1.06)`;
      });
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) { requestAnimationFrame(applyParallax); ticking = true; }
    }, { passive: true });
    applyParallax();
  }

  /* =========================================================
     6. RENDER SEQUENCE (propuesta) — crossfade + subtle scale
        driven by scroll position of each slide
     ========================================================= */
  const renderSlides = document.querySelectorAll(".render-slide img");
  if (!reduceMotion && renderSlides.length) {
    let rTicking = false;
    const updateRenders = () => {
      const vh = window.innerHeight;
      renderSlides.forEach(img => {
        const rect = img.getBoundingClientRect();
        const progress = 1 - Math.min(Math.abs(rect.top) / vh, 1); // 0..1, 1 = centered
        const scale = 1.06 - progress * 0.06; // 1.06 -> 1.0
        const opacity = 0.55 + progress * 0.45;
        img.style.transform = `scale(${scale.toFixed(3)})`;
        img.style.opacity = opacity.toFixed(2);
      });
      rTicking = false;
    };
    window.addEventListener("scroll", () => {
      if (!rTicking) { requestAnimationFrame(updateRenders); rTicking = true; }
    }, { passive: true });
    updateRenders();
  }

  /* =========================================================
     7. CUSTOM CURSOR (desktop only)
     ========================================================= */
  if (!isTouch && !reduceMotion) {
    const dot = document.getElementById("cursorDot");
    window.addEventListener("mousemove", (e) => {
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
      dot.classList.add("is-visible");
    }, { passive: true });
    document.addEventListener("mouseleave", () => dot.classList.remove("is-visible"));

    document.querySelectorAll("a, button, [data-lightbox]").forEach(el => {
      el.addEventListener("mouseenter", () => dot.classList.add("is-link"));
      el.addEventListener("mouseleave", () => dot.classList.remove("is-link"));
    });
  }

  /* =========================================================
     8. LIGHTBOX for planos
     ========================================================= */
  const lightboxFigs = document.querySelectorAll("[data-lightbox]");
  if (lightboxFigs.length) {
    const overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.innerHTML = `<button class="lightbox-close" aria-label="Cerrar">CERRAR ✕</button><img alt="">`;
    document.body.appendChild(overlay);
    const overlayImg = overlay.querySelector("img");
    const closeBtn = overlay.querySelector(".lightbox-close");

    lightboxFigs.forEach(fig => {
      const img = fig.querySelector("img");
      fig.addEventListener("click", () => {
        overlayImg.src = img.src;
        overlayImg.alt = img.alt;
        overlay.classList.add("is-open");
        document.body.style.overflow = "hidden";
      });
    });
    const close = () => {
      overlay.classList.remove("is-open");
      document.body.style.overflow = "";
    };
    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  }

  /* =========================================================
     9. Smooth anchor navigation (native, respects reduced motion)
     ========================================================= */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href").slice(1);
      const target = id === "top" ? document.body : document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const top = id === "top" ? 0 : target.getBoundingClientRect().top + window.scrollY - 10;
      window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
    });
  });

})();
