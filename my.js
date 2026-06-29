/* =========================================================
   PORTFOLIO APPLICATION
   Author: Shantanu Kumar
========================================================= */

"use strict";

/* =========================================================
   DOM ELEMENTS
========================================================= */

const body = document.body;

const loader = document.querySelector(".loader");
const progressBar = document.querySelector(".progress-bar");

const header = document.querySelector("header");
const navbar = document.querySelector(".navbar");

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

const sections = document.querySelectorAll("section");

const hero = document.querySelector(".hero");

const buttons = document.querySelectorAll(".btn");

const cards = document.querySelectorAll(
  ".skill-card, .project-card"
);


/* =========================================================
   APP STATE
========================================================= */

const state = {
  menuOpen: false,
  currentSection: "home",
  lastScrollY: 0,
  windowWidth: window.innerWidth
};


/* =========================================================
   HELPER FUNCTIONS
========================================================= */

const addClass = (element, className) => {
  if (element) {
    element.classList.add(className);
  }
};

const removeClass = (element, className) => {
  if (element) {
    element.classList.remove(className);
  }
};

const toggleClass = (element, className) => {
  if (element) {
    element.classList.toggle(className);
  }
};


/* =========================================================
   LOADER
========================================================= */

window.addEventListener("load", () => {

  if (!loader) return;

  setTimeout(() => {

    loader.style.opacity = "0";

    setTimeout(() => {
      loader.style.display = "none";
    }, 500);

  }, 700);

});


/* =========================================================
   MOBILE MENU
========================================================= */

function openMenu() {

  if (!navLinks) return;

  addClass(navLinks, "active");

  state.menuOpen = true;

  body.style.overflow = "hidden";
}

function closeMenu() {

  if (!navLinks) return;

  removeClass(navLinks, "active");

  state.menuOpen = false;

  body.style.overflow = "";
}

function toggleMenu() {

  if (state.menuOpen) {
    closeMenu();
  } else {
    openMenu();
  }

}

if (menuBtn) {
  menuBtn.addEventListener(
    "click",
    toggleMenu
  );
}


/* =========================================================
   CLOSE MENU ON LINK CLICK
========================================================= */

navItems.forEach((link) => {

  link.addEventListener("click", () => {

    if (window.innerWidth <= 900) {
      closeMenu();
    }

  });

});


/* =========================================================
   CLOSE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener("click", (e) => {

  if (
    !state.menuOpen ||
    !navLinks ||
    !menuBtn
  ) {
    return;
  }

  const clickedNav =
    navLinks.contains(e.target);

  const clickedButton =
    menuBtn.contains(e.target);

  if (!clickedNav && !clickedButton) {
    closeMenu();
  }

});


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

function handleNavbar() {

  if (!navbar) return;

  if (window.scrollY > 40) {
    addClass(navbar, "scrolled");
  } else {
    removeClass(navbar, "scrolled");
  }

}


/* =========================================================
   ACTIVE NAVIGATION LINKS
========================================================= */

function updateActiveLink() {

  let current = "";

  sections.forEach((section) => {

    const sectionTop =
      section.offsetTop - 180;

    const sectionHeight =
      section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY <
        sectionTop + sectionHeight
    ) {
      current = section.id;
    }

  });

  state.currentSection = current;

  navItems.forEach((link) => {

    removeClass(link, "active");

    if (
      link.getAttribute("href") ===
      `#${current}`
    ) {
      addClass(link, "active");
    }

  });

}


/* =========================================================
   PROGRESS BAR
========================================================= */

function updateProgressBar() {

  if (!progressBar) return;

  const scrollHeight =
    document.documentElement
      .scrollHeight -
    window.innerHeight;

  const progress =
    (window.scrollY /
      scrollHeight) *
    100;

  progressBar.style.width =
    `${progress}%`;

}


/* =========================================================
   HEADER AUTO HIDE
========================================================= */

function autoHideHeader() {

  if (!header) return;

  const currentScroll =
    window.scrollY;

  if (
    currentScroll >
      state.lastScrollY &&
    currentScroll > 120
  ) {
    header.style.transform =
      "translateY(-120%)";
  } else {
    header.style.transform =
      "translateY(0)";
  }

  state.lastScrollY =
    currentScroll;
}


/* =========================================================
   MAIN SCROLL HANDLER
========================================================= */

function handleScroll() {

  handleNavbar();

  updateProgressBar();

  updateActiveLink();

  autoHideHeader();
}

window.addEventListener(
  "scroll",
  handleScroll
);


/* =========================================================
   WINDOW RESIZE
========================================================= */

function handleResize() {

  state.windowWidth =
    window.innerWidth;

  if (
    state.windowWidth > 900 &&
    state.menuOpen
  ) {
    closeMenu();
  }

}

window.addEventListener(
  "resize",
  handleResize
);


/* =========================================================
   SMOOTH SECTION SCROLLING
========================================================= */

navItems.forEach((link) => {

  link.addEventListener(
    "click",
    (e) => {

      e.preventDefault();

      const target =
        document.querySelector(
          link.getAttribute("href")
        );

      if (!target) return;

      const offset =
        target.offsetTop - 120;

      window.scrollTo({
        top: offset,
        behavior: "smooth"
      });

    }
  );

});


/* =========================================================
   BUTTON SCROLL LOGIC
========================================================= */

buttons.forEach((button) => {

  const href =
    button.getAttribute("href");

  if (
    !href ||
    !href.startsWith("#")
  ) {
    return;
  }

  button.addEventListener(
    "click",
    (e) => {

      e.preventDefault();

      const target =
        document.querySelector(
          href
        );

      if (!target) return;

      window.scrollTo({
        top:
          target.offsetTop - 120,
        behavior: "smooth"
      });

    }
  );

});


/* =========================================================
   INITIALIZE APP
========================================================= */

function initializeApp() {

  handleNavbar();

  updateProgressBar();

  updateActiveLink();

  state.windowWidth =
    window.innerWidth;
}

initializeApp();

/* =========================================================
   ANIMATION SETTINGS
========================================================= */

const prefersReducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


/* =========================================================
   REVEAL ELEMENTS
========================================================= */

const revealElements =
  document.querySelectorAll(
    ".section-heading, .about-card, .skill-card, .project-card, .contact-card"
  );


/* =========================================================
   INTERSECTION OBSERVER
========================================================= */

function revealOnScroll(entries, observer) {

  entries.forEach((entry) => {

    if (!entry.isIntersecting) {
      return;
    }

    entry.target.classList.add(
      "active"
    );

    observer.unobserve(
      entry.target
    );
  });

}

const revealObserver =
  new IntersectionObserver(
    revealOnScroll,
    {
      threshold: 0.15,
      rootMargin:
        "0px 0px -80px 0px"
    }
  );

revealElements.forEach(
  (element) => {

    element.classList.add(
      "reveal"
    );

    revealObserver.observe(
      element
    );
  }
);


/* =========================================================
   HERO ENTRANCE ANIMATION
========================================================= */

const heroElements = [
  document.querySelector(".hero-tag"),
  document.querySelector(".hero h1"),
  document.querySelector(".hero h2"),
  document.querySelector(
    ".hero-description"
  ),
  document.querySelector(
    ".hero-buttons"
  ),
  document.querySelector(
    ".social-icons"
  ),
  document.querySelector(
    ".profile-card"
  )
];

function animateHero() {

  if (
    prefersReducedMotion
  ) {
    return;
  }

  heroElements.forEach(
    (element, index) => {

      if (!element) return;

      element.style.opacity =
        "0";

      element.style.transform =
        "translateY(40px)";

      setTimeout(() => {

        element.style.transition =
          "all .8s ease";

        element.style.opacity =
          "1";

        element.style.transform =
          "translateY(0)";

      }, index * 150 + 400);

    }
  );

}

window.addEventListener(
  "load",
  animateHero
);


/* =========================================================
   TYPEWRITER EFFECT
========================================================= */

const heroTitle =
  document.querySelector(
    ".hero h2 span"
  );

const titleText =
  " | Java & Spring Boot | DSA Learner | Backend Development";

function typeWriter() {

  if (!heroTitle) return;

  if (
    prefersReducedMotion
  ) {
    heroTitle.textContent =
      titleText;

    return;
  }

  heroTitle.textContent = "";

  let index = 0;

  function typing() {

    if (
      index >=
      titleText.length
    ) {
      return;
    }

    heroTitle.textContent +=
      titleText.charAt(index);

    index++;

    setTimeout(
      typing,
      45
    );
  }

  setTimeout(
    typing,
    1200
  );
}

window.addEventListener(
  "load",
  typeWriter
);


/* =========================================================
   PARALLAX HERO EFFECT
========================================================= */

function heroParallax(e) {

  if (
    prefersReducedMotion
  ) {
    return;
  }

  const profileCard =
    document.querySelector(
      ".profile-card"
    );

  const blurOne =
    document.querySelector(
      ".blur-one"
    );

  const blurTwo =
    document.querySelector(
      ".blur-two"
    );

  if (
    !profileCard ||
    !blurOne ||
    !blurTwo
  ) {
    return;
  }

  const x =
    e.clientX /
    window.innerWidth;

  const y =
    e.clientY /
    window.innerHeight;

  profileCard.style.transform =
    `
      translate(
        ${x * 20 - 10}px,
        ${y * 20 - 10}px
      )
    `;

  blurOne.style.transform =
    `
      translate(
        ${x * 60}px,
        ${y * 60}px
      )
    `;

  blurTwo.style.transform =
    `
      translate(
        ${-x * 50}px,
        ${-y * 50}px
      )
    `;
}

document.addEventListener(
  "mousemove",
  heroParallax
);


/* =========================================================
   FLOATING BLOBS
========================================================= */

let blobAngle = 0;

function animateBlobs() {

  if (
    prefersReducedMotion
  ) {
    return;
  }

  const blurOne =
    document.querySelector(
      ".blur-one"
    );

  const blurTwo =
    document.querySelector(
      ".blur-two"
    );

  if (
    !blurOne ||
    !blurTwo
  ) {
    return;
  }

  blobAngle += 0.003;

  const x =
    Math.sin(
      blobAngle
    ) * 25;

  const y =
    Math.cos(
      blobAngle
    ) * 25;

  blurOne.style.marginLeft =
    `${x}px`;

  blurOne.style.marginTop =
    `${y}px`;

  blurTwo.style.marginLeft =
    `${-x}px`;

  blurTwo.style.marginTop =
    `${-y}px`;

  requestAnimationFrame(
    animateBlobs
  );
}

animateBlobs();


/* =========================================================
   STATS COUNTER
========================================================= */

const statNumbers =
  document.querySelectorAll(
    ".stat-card h4"
  );

function animateCounter(
  element,
  endValue
) {

  let start = 0;

  const duration = 1200;

  const increment =
    endValue /
    (duration / 16);

  function update() {

    start += increment;

    if (
      start >= endValue
    ) {
      element.textContent =
        endValue;

      return;
    }

    element.textContent =
      Math.floor(start);

    requestAnimationFrame(
      update
    );
  }

  update();
}


/* =========================================================
   COUNTER OBSERVER
========================================================= */

const counterObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach(
        (entry) => {

          if (
            !entry.isIntersecting
          ) {
            return;
          }

          const number =
            parseInt(
              entry.target.dataset
                .count
            );

          if (
            !isNaN(number)
          ) {
            animateCounter(
              entry.target,
              number
            );
          }

          counterObserver.unobserve(
            entry.target
          );
        }
      );
    },
    {
      threshold: 0.6
    }
  );

statNumbers.forEach(
  (number) => {

    const text =
      parseInt(
        number.textContent
      );

    if (
      !isNaN(text)
    ) {
      number.dataset.count =
        text;

      number.textContent =
        "0";

      counterObserver.observe(
        number
      );
    }
  }
);


/* =========================================================
   SECTION PARALLAX
========================================================= */

function sectionParallax() {

  if (
    prefersReducedMotion
  ) {
    return;
  }

  const scroll =
    window.scrollY;

  sections.forEach(
    (section) => {

      const speed =
        0.03;

      section.style.backgroundPositionY =
        `${scroll * speed}px`;
    }
  );
}

window.addEventListener(
  "scroll",
  sectionParallax
);


/* =========================================================
   STAGGER SKILL CARDS
========================================================= */

const skillCards =
  document.querySelectorAll(
    ".skill-card"
  );

skillCards.forEach(
  (card, index) => {

    card.style.transitionDelay =
      `${index * 70}ms`;
  }
);


/* =========================================================
   STAGGER PROJECT CARDS
========================================================= */

const projectCards =
  document.querySelectorAll(
    ".project-card"
  );

projectCards.forEach(
  (card, index) => {

    card.style.transitionDelay =
      `${index * 120}ms`;
  }
);


/* =========================================================
   PERFORMANCE OPTIMIZED RAF SCROLL
========================================================= */

let ticking = false;

function optimizedScroll() {

  if (!ticking) {

    requestAnimationFrame(
      () => {

        handleNavbar();
        updateProgressBar();
        updateActiveLink();

        ticking = false;
      }
    );

    ticking = true;
  }
}

window.addEventListener(
  "scroll",
  optimizedScroll
);

/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursor =
  document.querySelector(".cursor");

let mouseX = 0;
let mouseY = 0;

let cursorX = 0;
let cursorY = 0;

document.addEventListener(
  "mousemove",
  (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }
);

function animateCursor() {

  if (
    window.innerWidth <= 768 ||
    !cursor
  ) {
    return;
  }

  cursorX +=
    (mouseX - cursorX) * 0.18;

  cursorY +=
    (mouseY - cursorY) * 0.18;

  cursor.style.left =
    `${cursorX}px`;

  cursor.style.top =
    `${cursorY}px`;

  requestAnimationFrame(
    animateCursor
  );
}

animateCursor();


/* =========================================================
   CURSOR SCALE ON INTERACTIVE ELEMENTS
========================================================= */

const interactiveElements =
  document.querySelectorAll(
    "a, button, .btn, .skill-card, .project-card"
  );

interactiveElements.forEach(
  (element) => {

    element.addEventListener(
      "mouseenter",
      () => {

        if (!cursor) return;

        cursor.style.width =
          "45px";

        cursor.style.height =
          "45px";

        cursor.style.background =
          "rgba(79,140,255,.20)";
      }
    );

    element.addEventListener(
      "mouseleave",
      () => {

        if (!cursor) return;

        cursor.style.width =
          "20px";

        cursor.style.height =
          "20px";

        cursor.style.background =
          "rgba(79,140,255,.40)";
      }
    );

  }
);


/* =========================================================
   SPOTLIGHT EFFECT
========================================================= */

const spotlightCards =
  document.querySelectorAll(
    ".skill-card, .project-card, .about-card"
  );

spotlightCards.forEach(
  (card) => {

    card.classList.add(
      "spotlight"
    );

    card.addEventListener(
      "mousemove",
      (e) => {

        const rect =
          card.getBoundingClientRect();

        const x =
          e.clientX - rect.left;

        const y =
          e.clientY - rect.top;

        card.style.setProperty(
          "--x",
          `${x}px`
        );

        card.style.setProperty(
          "--y",
          `${y}px`
        );
      }
    );

  }
);


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

buttons.forEach((button) => {

  button.addEventListener(
    "mousemove",
    (e) => {

      const rect =
        button.getBoundingClientRect();

      const x =
        e.clientX -
        rect.left -
        rect.width / 2;

      const y =
        e.clientY -
        rect.top -
        rect.height / 2;

      button.style.transform =
        `
          translate(
            ${x * 0.20}px,
            ${y * 0.20}px
          )
        `;
    }
  );

  button.addEventListener(
    "mouseleave",
    () => {

      button.style.transform =
        "translate(0,0)";
    }
  );

});


/* =========================================================
   RIPPLE EFFECT
========================================================= */

buttons.forEach((button) => {

  button.addEventListener(
    "click",
    (e) => {

      const ripple =
        document.createElement(
          "span"
        );

      const rect =
        button.getBoundingClientRect();

      const size =
        Math.max(
          rect.width,
          rect.height
        );

      ripple.style.width =
        `${size}px`;

      ripple.style.height =
        `${size}px`;

      ripple.style.position =
        "absolute";

      ripple.style.borderRadius =
        "50%";

      ripple.style.left =
        `${e.clientX - rect.left - size / 2}px`;

      ripple.style.top =
        `${e.clientY - rect.top - size / 2}px`;

      ripple.style.background =
        "rgba(255,255,255,.20)";

      ripple.style.transform =
        "scale(0)";

      ripple.style.transition =
        "transform .6s ease, opacity .6s ease";

      ripple.style.pointerEvents =
        "none";

      button.appendChild(
        ripple
      );

      requestAnimationFrame(
        () => {
          ripple.style.transform =
            "scale(3)";
          ripple.style.opacity =
            "0";
        }
      );

      setTimeout(
        () => {
          ripple.remove();
        },
        650
      );
    }
  );

});


/* =========================================================
   3D TILT EFFECT
========================================================= */

const tiltCards =
  document.querySelectorAll(
    ".profile-card, .project-card"
  );

tiltCards.forEach((card) => {

  card.addEventListener(
    "mousemove",
    (e) => {

      if (
        window.innerWidth < 992
      ) {
        return;
      }

      const rect =
        card.getBoundingClientRect();

      const x =
        e.clientX - rect.left;

      const y =
        e.clientY - rect.top;

      const rotateX =
        (y / rect.height - 0.5)
        * -14;

      const rotateY =
        (x / rect.width - 0.5)
        * 14;

      card.style.transform =
        `
          perspective(1200px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateY(-6px)
        `;
    }
  );

  card.addEventListener(
    "mouseleave",
    () => {

      card.style.transform =
        `
          perspective(1200px)
          rotateX(0deg)
          rotateY(0deg)
          translateY(0)
        `;
    }
  );

});


/* =========================================================
   SOCIAL ICON GLOW
========================================================= */

const socialIcons =
  document.querySelectorAll(
    ".social-icons a"
  );

socialIcons.forEach((icon) => {

  icon.addEventListener(
    "mousemove",
    (e) => {

      const rect =
        icon.getBoundingClientRect();

      const x =
        e.clientX - rect.left;

      const y =
        e.clientY - rect.top;

      icon.style.background =
        `
        radial-gradient(
          circle at ${x}px ${y}px,
          rgba(79,140,255,.28),
          rgba(255,255,255,.03)
        )
      `;
    }
  );

  icon.addEventListener(
    "mouseleave",
    () => {

      icon.style.background =
        "rgba(255,255,255,.03)";
    }
  );

});


/* =========================================================
   NAVBAR TRANSPARENCY
========================================================= */

window.addEventListener(
  "scroll",
  () => {

    if (!navbar) return;

    const opacity =
      Math.min(
        window.scrollY / 400,
        1
      );

    navbar.style.background =
      `
      rgba(
        10,
        15,
        25,
        ${0.65 + opacity * 0.20}
      )
    `;
  }
);


/* =========================================================
   HERO PARALLAX DEPTH
========================================================= */

document.addEventListener(
  "mousemove",
  (e) => {

    if (
      window.innerWidth < 992
    ) {
      return;
    }

    const profileCard =
      document.querySelector(
        ".profile-card"
      );

    if (!profileCard) return;

    const x =
      (e.clientX /
        window.innerWidth -
        0.5) *
      16;

    const y =
      (e.clientY /
        window.innerHeight -
        0.5) *
      16;

    profileCard.style.boxShadow =
      `
      ${-x}px
      ${y}px
      60px
      rgba(0,0,0,.45)
    `;
  }
);


/* =========================================================
   SKILL CARD FLOATING
========================================================= */

skillCards.forEach(
  (card, index) => {

    card.style.animation =
      `
        floatSkill
        ${5 + index * 0.3}s
        ease-in-out
        infinite
      `;
  }
);


/* =========================================================
   DYNAMIC YEAR IN FOOTER
========================================================= */

const footerText =
  document.querySelector(
    "footer p"
  );

if (footerText) {

  footerText.innerHTML =
    `
      © ${new Date().getFullYear()}
      Shantanu Kumar.
      Designed and developed with
      HTML, CSS and JavaScript.
    `;
}

/* =========================================================
   PART 4 - PRODUCTION POLISH
========================================================= */


/* =========================================================
   UTILITY FUNCTIONS
========================================================= */

function debounce(fn, delay = 200) {

  let timer;

  return function (...args) {

    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);

  };
}

function throttle(fn, limit = 100) {

  let waiting = false;

  return function (...args) {

    if (waiting) return;

    fn.apply(this, args);

    waiting = true;

    setTimeout(() => {
      waiting = false;
    }, limit);

  };
}


/* =========================================================
   SAVE SCROLL POSITION
========================================================= */

window.addEventListener(
  "beforeunload",
  () => {
    sessionStorage.setItem(
      "scroll-position",
      window.scrollY
    );
  }
);


/* =========================================================
   RESTORE SCROLL POSITION
========================================================= */

window.addEventListener(
  "load",
  () => {

    const savedPosition =
      sessionStorage.getItem(
        "scroll-position"
      );

    if (!savedPosition) return;

    window.scrollTo({
      top: Number(savedPosition)
    });

  }
);


/* =========================================================
   KEYBOARD ACCESSIBILITY
========================================================= */

document.addEventListener(
  "keydown",
  (e) => {

    if (
      e.key === "Escape" &&
      state.menuOpen
    ) {
      closeMenu();
    }

  }
);


/* =========================================================
   NAVIGATION FOCUS STATES
========================================================= */

navItems.forEach((item) => {

  item.addEventListener(
    "focus",
    () => {

      item.style.color =
        "#ffffff";

    }
  );

  item.addEventListener(
    "blur",
    () => {

      item.style.color =
        "";

    }
  );

});


/* =========================================================
   DISABLE HEAVY EFFECTS ON MOBILE
========================================================= */

function optimizeForMobile() {

  if (window.innerWidth > 768) {
    return;
  }

  document
    .querySelectorAll(
      ".blur-one, .blur-two"
    )
    .forEach((blob) => {
      blob.style.filter =
        "blur(80px)";
    });

}

optimizeForMobile();

window.addEventListener(
  "resize",
  debounce(
    optimizeForMobile,
    200
  )
);


/* =========================================================
   PAUSE ANIMATIONS ON HIDDEN TAB
========================================================= */

document.addEventListener(
  "visibilitychange",
  () => {

    if (document.hidden) {

      document.body.style.animationPlayState =
        "paused";

    } else {

      document.body.style.animationPlayState =
        "running";

    }

  }
);


/* =========================================================
   REDUCED MOTION SUPPORT
========================================================= */

if (prefersReducedMotion) {

  document
    .querySelectorAll("*")
    .forEach((element) => {

      element.style.animation =
        "none";

      element.style.transition =
        "none";

    });

}


/* =========================================================
   IMAGE LAZY LOADING
========================================================= */

const images =
  document.querySelectorAll("img");

const imageObserver =
  new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (
          !entry.isIntersecting
        ) {
          return;
        }

        const image =
          entry.target;

        const src =
          image.dataset.src;

        if (src) {
          image.src = src;
        }

        observer.unobserve(
          image
        );

      });

    },
    {
      threshold: 0.1
    }
  );

images.forEach((image) => {
  imageObserver.observe(image);
});


/* =========================================================
   PRELOAD SOCIAL LINKS
========================================================= */

[
  "https://github.com/shanatnu189",
  "https://www.linkedin.com/in/shantanu-kumar-592280367/"
].forEach((url) => {

  const link =
    document.createElement(
      "link"
    );

  link.rel = "prefetch";
  link.href = url;

  document.head.appendChild(
    link
  );

});


/* =========================================================
   SMOOTH SCROLL TO TOP
========================================================= */

function scrollToTop() {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =========================================================
   DOUBLE CLICK LOGO TO TOP
========================================================= */

const logo =
  document.querySelector(
    ".logo"
  );

if (logo) {

  logo.addEventListener(
    "dblclick",
    (e) => {

      e.preventDefault();

      scrollToTop();

    }
  );

}


/* =========================================================
   CARD ENTRANCE DELAY
========================================================= */

document
  .querySelectorAll(
    ".skill-card, .project-card"
  )
  .forEach(
    (card, index) => {

      card.style.transitionDelay =
        `${index * 80}ms`;

    }
  );


/* =========================================================
   PREVENT RAPID BUTTON SPAM
========================================================= */

buttons.forEach((button) => {

  button.addEventListener(
    "click",
    () => {

      button.style.pointerEvents =
        "none";

      setTimeout(() => {

        button.style.pointerEvents =
          "auto";

      }, 500);

    }
  );

});


/* =========================================================
   SCROLL PERFORMANCE
========================================================= */

window.addEventListener(
  "scroll",
  throttle(
    () => {

      handleNavbar();
      updateProgressBar();
      updateActiveLink();

    },
    16
  )
);


/* =========================================================
   DEVICE CAPABILITY DETECTION
========================================================= */

const lowEndDevice =
  navigator.hardwareConcurrency &&
  navigator.hardwareConcurrency <= 4;

if (lowEndDevice) {

  document.body.classList.add(
    "low-performance"
  );

  document
    .querySelectorAll(
      ".blur-one, .blur-two"
    )
    .forEach((blob) => {

      blob.style.opacity =
        ".45";

    });

}


/* =========================================================
   GLOBAL ERROR HANDLER
========================================================= */

window.addEventListener(
  "error",
  (event) => {

    console.error(
      "Portfolio Error:",
      event.message
    );

  }
);


/* =========================================================
   SAFE INITIALIZATION
========================================================= */

function initializePortfolio() {

  try {

    handleNavbar();
    updateProgressBar();
    updateActiveLink();

    console.log(
      "Portfolio initialized successfully."
    );

  } catch (error) {

    console.error(
      "Initialization Error:",
      error
    );

  }

}

initializePortfolio();


/* =========================================================
   EASTER EGG
========================================================= */

let secret = "";

document.addEventListener(
  "keydown",
  (e) => {

    secret += e.key.toLowerCase();

    if (secret.length > 12) {
      secret =
        secret.slice(-12);
    }

    if (
      secret.includes(
        "shantanu"
      )
    ) {

      document.body.style.transition =
        "all .6s ease";

      document.body.style.filter =
        "brightness(1.08)";

      setTimeout(() => {
        document.body.style.filter =
          "brightness(1)";
      }, 1000);

      secret = "";
    }

  }
);