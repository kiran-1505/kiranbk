// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// Scroll fade-in
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Scroll progress bar
const progressBar = document.querySelector('.scroll-progress');
if (progressBar) {
  const updateProgress = () => {
    const scrolled = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (scrolled / max) * 100 : 0;
    progressBar.style.width = pct + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

// 3D tilt on hover for .tilt cards
document.querySelectorAll('.tilt').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotY = ((x - midX) / midX) * 6;
    const rotX = -((y - midY) / midY) * 6;
    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

// Typewriter rotating phrases
const typeTarget = document.querySelector('[data-typewriter]');
if (typeTarget) {
  const phrases = JSON.parse(typeTarget.getAttribute('data-typewriter'));
  let pi = 0, ci = 0, deleting = false;
  typeTarget.innerHTML = '<span class="tw-text"></span><span class="typewriter-caret"></span>';
  const textNode = typeTarget.querySelector('.tw-text');

  function tick() {
    const word = phrases[pi];
    if (!deleting) {
      ci++;
      textNode.textContent = word.slice(0, ci);
      if (ci >= word.length) { deleting = true; setTimeout(tick, 1600); return; }
    } else {
      ci--;
      textNode.textContent = word.slice(0, ci);
      if (ci <= 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(tick, deleting ? 40 : 75);
  }
  tick();
}
