/* Scroll-reveal for archive list items */
(function () {
  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  if (revealElements.length === 0) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    revealElements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
  );

  revealElements.forEach((el, index) => {
    el.style.transitionDelay = `${Math.min(index * 0.07, 0.42)}s`;
    revealObserver.observe(el);
  });
})();
