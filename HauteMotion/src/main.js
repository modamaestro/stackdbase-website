document.addEventListener('DOMContentLoaded', () => {
  // Fade-in hero content on load
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(20px)';
    heroContent.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
    requestAnimationFrame(() => {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    });
  }

  // Active nav link highlight on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((s) => observer.observe(s));
});
