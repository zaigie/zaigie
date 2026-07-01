const root = document.documentElement;
const body = document.body;
const themeToggle = document.querySelector("[data-theme-toggle]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const sections = Array.from(document.querySelectorAll("main section[id]"));
const backTop = document.querySelector("[data-back-top]");

const savedTheme = localStorage.getItem("zaigie-theme");
if (savedTheme) {
  root.dataset.theme = savedTheme;
}

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  localStorage.setItem("zaigie-theme", nextTheme);
});

menuToggle?.addEventListener("click", () => {
  body.classList.toggle("menu-open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("menu-open");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
    threshold: [0.1, 0.2, 0.4, 0.6],
  }
);

sections.forEach((section) => observer.observe(section));

window.addEventListener(
  "scroll",
  () => {
    backTop?.classList.toggle("is-visible", window.scrollY > 720);
  },
  { passive: true }
);

backTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
