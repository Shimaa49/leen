const toggleBtn = document.querySelector('.navToggle');
const mobileNav = document.getElementById('mobileNav');
const overlay = document.getElementById('mobileNavOverlay');
const closeBtn = document.querySelector('.mobileNav__close');

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav__link");
  const sections = document.querySelectorAll("section[id]");

  /* =========================
     1️⃣ CLICK → فعّل اللينك
  ========================== */
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.forEach(l => l.classList.remove("nav__link--active"));
      link.classList.add("nav__link--active");
    });
  });

  /* =========================
     2️⃣ SCROLL → Scroll Spy
  ========================== */
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove("nav__link--active"));

          const activeLink = document.querySelector(
            `.nav__link[href="#${entry.target.id}"]`
          );

          if (activeLink) {
            activeLink.classList.add("nav__link--active");
          }
        }
      });
    },
    {
      threshold: 0.6
    }
  );

  sections.forEach(section => observer.observe(section));
});

function openNav(){
  document.body.classList.add('nav-open');
  toggleBtn?.setAttribute('aria-expanded','true');
  mobileNav?.setAttribute('aria-hidden','false');
}

function closeNav(){
  document.body.classList.remove('nav-open');
  toggleBtn?.setAttribute('aria-expanded','false');
  mobileNav?.setAttribute('aria-hidden','true');
}

toggleBtn?.addEventListener('click', openNav);
closeBtn?.addEventListener('click', closeNav);
overlay?.addEventListener('click', closeNav);

// يقفل لما تدوسي على لينك
document.querySelectorAll('.mobileNav__link').forEach(a=>{
  a.addEventListener('click', closeNav);
});
////////////////couter//////
// عدّاد يزيد لما السكشن يظهر (مرة واحدة)
(function () {
  const section = document.querySelector("#stats");
  if (!section) return;

  const counters = section.querySelectorAll(".counter[data-target]");
  let started = false;

  function animateCounter(el, target) {
    const duration = 900; // ms
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value;

      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target; // تثبيت
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver((entries) => {
    if (started) return;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        started = true;
        counters.forEach((el) => {
          const target = parseInt(el.dataset.target, 10) || 0;
          animateCounter(el, target);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.35 });

  observer.observe(section);
})();
///////////////////////////animation////////////////////////////////
 // servicesScrollAnimation.js
(() => {

  /* ===============================
     Elements
  =============================== */

  // Header elements (title, subtitle, chips)
  const headEls = [
    '.servicesSec__title',
    '.servicesSec__subtitle',
    '.servicesSec__chips'
  ].flatMap(selector =>
    Array.from(document.querySelectorAll(selector))
  );

  // Service cards
  const cards = Array.from(document.querySelectorAll('.srvCard'));

  // Section check
  const section = document.querySelector('.servicesSec');
  if (!section) return;


  /* ===============================
     Prepare elements (no HTML change)
  =============================== */

  headEls.forEach(el => {
    el.classList.add('sr', 'sr-pop');
  });

  cards.forEach((card, index) => {
    card.classList.add('sr-stagger');
    // stagger effect
    card.style.transitionDelay = `${index * 90}ms`;
  });


  /* ===============================
     Observer for header
  =============================== */

  const headObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('sr-show');
        } else {
          // remove to allow repeat animation
          entry.target.classList.remove('sr-show');
        }
      });
    },
    {
      threshold: 0.25,
      rootMargin: '0px 0px -10% 0px'
    }
  );

  headEls.forEach(el => headObserver.observe(el));


  /* ===============================
     Observer for cards
  =============================== */

  const cardsObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('sr-show');
        } else {
          // remove to allow repeat animation
          entry.target.classList.remove('sr-show');
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px'
    }
  );

  cards.forEach(card => cardsObserver.observe(card));

})();
/////////////////////vector//////////////////////////////////////
// js/how.js
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".js-reveal");
  if (!items.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("is-visible");
      });
    },
    { threshold: 0.2 }
  );

  items.forEach((el) => io.observe(el));
});
///////////////////animation2////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const howSection = document.querySelector(".how");

  if (!howSection) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          howSection.classList.add("is-visible");
        } else {
          howSection.classList.remove("is-visible");
        }
      });
    },
    {
      threshold: 0.3 // يبدأ الأنيميشن لما 30% من السكشن يبان
    }
  );

  observer.observe(howSection);
});