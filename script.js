// Mobile menu toggle using Web Animations API
const mobileBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
mobileBtn?.addEventListener('click', () => {
  const isHidden = mobileMenu?.classList.contains('hidden');
  if (isHidden) {
    mobileMenu?.classList.remove('hidden');
    mobileMenu?.animate([
      { height: '0px', opacity: 0 },
      { height: mobileMenu.scrollHeight + 'px', opacity: 1 }
    ], { duration: 200, easing: 'ease-out' });
  } else {
    const anim = mobileMenu?.animate([
      { height: mobileMenu.offsetHeight + 'px', opacity: 1 },
      { height: '0px', opacity: 0 }
    ], { duration: 150, easing: 'ease-in' });
    anim?.addEventListener('finish', () => mobileMenu?.classList.add('hidden'));
  }
});

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const iconSun = document.getElementById('iconSun');
const iconMoon = document.getElementById('iconMoon');
function syncThemeIcons() {
  const isDark = document.documentElement.classList.contains('dark');
  // Show icon that indicates the target theme (moon in light, sun in dark)
  if (isDark) { // currently dark -> show sun to indicate switching to light
    iconSun?.classList.remove('hidden');
    iconMoon?.classList.add('hidden');
  } else { // currently light -> show moon to indicate switching to dark
    iconSun?.classList.add('hidden');
    iconMoon?.classList.remove('hidden');
  }
}
themeToggle?.addEventListener('click', () => {
  const html = document.documentElement;
  html.classList.toggle('dark');
  try { localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light'); } catch (e) {}
  syncThemeIcons();
});
syncThemeIcons();

// Reveal-on-scroll using IntersectionObserver
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  },
  { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
);
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Header shadow and shrink + progress (no GSAP)
const header = document.querySelector('header');
const headerBar = document.getElementById('headerBar');
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const y = window.scrollY || document.documentElement.scrollTop;
  header?.classList.toggle('shadow', y > 8);
  if (headerBar) headerBar.style.height = y > 2 ? '56px' : '64px';
  if (scrollProgress) {
    const h = document.documentElement;
    const t = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
    scrollProgress.style.width = (t * 100).toFixed(2) + '%';
  }
}, { passive: true });

// Card hover lift via Web Animations API
document.querySelectorAll('.p-6').forEach((card) => {
  card.addEventListener('mouseenter', () => {
    card.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-4px)' }], { duration: 150, fill: 'forwards', easing: 'ease-out' });
  });
  card.addEventListener('mouseleave', () => {
    card.animate([{ transform: 'translateY(-4px)' }, { transform: 'translateY(0)' }], { duration: 150, fill: 'forwards', easing: 'ease-out' });
  });
});

// 3D tilt micro-interaction on hero image card (no GSAP)
const heroCard = document.querySelector('.hero-card');
if (heroCard) {
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const handleMove = (e) => {
    const b = heroCard.getBoundingClientRect();
    const cx = b.left + b.width / 2;
    const cy = b.top + b.height / 2;
    const dx = (e.clientX - cx) / (b.width / 2);
    const dy = (e.clientY - cy) / (b.height / 2);
    heroCard.style.transform = `rotateX(${clamp(-dy * 10, -8, 8)}deg) rotateY(${clamp(dx * 10, -8, 8)}deg) perspective(800px)`;
    heroCard.style.transformOrigin = 'center';
    heroCard.style.transition = 'transform 0.15s ease-out';
  };
  const reset = () => {
    heroCard.style.transition = 'transform 0.2s ease-out';
    heroCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
  };
  heroCard.addEventListener('mousemove', handleMove);
  heroCard.addEventListener('mouseleave', reset);
  heroCard.addEventListener('blur', reset);
}

// Nav indicator (no GSAP)
const navIndicator = document.getElementById('navIndicator');
const navLinks = Array.from(document.querySelectorAll('nav a')).filter((a) => a.getAttribute('href')?.startsWith('#'));
const moveIndicator = (el) => {
  if (!navIndicator || !el) return;
  const rect = el.getBoundingClientRect();
  const parentRect = el.parentElement.getBoundingClientRect();
  const left = rect.left - parentRect.left;
  navIndicator.style.left = left + 'px';
  navIndicator.style.width = rect.width + 'px';
  navIndicator.style.opacity = '0.9';
};
navLinks.forEach((link) => link.addEventListener('mouseenter', (e) => moveIndicator(e.currentTarget)));
document.querySelector('nav')?.addEventListener('mouseleave', () => {
  if (navIndicator) navIndicator.style.width = '0px';
});

// Set current year
document.getElementById('year')?.appendChild(document.createTextNode(String(new Date().getFullYear())));

// Typewriter effect for hero title
(function typeHero() {
  const el = document.getElementById('typedText');
  const caret = document.getElementById('typedCaret');
  if (!el || !caret) return;
  const full = "Hi, I'm Nishit Popat.";
  const baseDelay = 55; // ms per char
  const variance = 80;  // random variance for natural typing
  let i = 0;
  function step() {
    el.textContent = full.slice(0, i);
    i += 1;
    if (i <= full.length) {
      const jitter = Math.random() * variance;
      setTimeout(step, baseDelay + jitter);
    } else {
      // Hold, then optionally backspace and retype for loop; keeping single run for now
      caret.classList.add('caret-blink');
    }
  }
  caret.classList.remove('caret-blink');
  step();
})();


