// Animated background with floating particles
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let w, h;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function Particle() {
  this.x = Math.random() * w;
  this.y = Math.random() * h;
  this.radius = Math.random() * 2.5 + 1.5;
  this.color = `hsla(${Math.random()*360}, 80%, 60%, 0.5)`;
  this.speed = Math.random() * 1.5 + 0.5;
  this.angle = Math.random() * Math.PI * 2;
}
Particle.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
  ctx.fillStyle = this.color;
  ctx.shadowColor = this.color;
  ctx.shadowBlur = 10;
  ctx.fill();
  ctx.shadowBlur = 0;
};
Particle.prototype.update = function() {
  this.x += Math.cos(this.angle) * this.speed;
  this.y += Math.sin(this.angle) * this.speed;
  if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
  }
};

function animateParticles() {
  ctx.clearRect(0, 0, w, h);
  for (let p of particles) {
    p.update();
    p.draw();
  }
  requestAnimationFrame(animateParticles);
}
particles = Array.from({length: 90}, () => new Particle());
animateParticles();

// Smooth scroll for navigation links
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Contact form feedback
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Thank you for reaching out! I will get back to you soon.');
  this.reset();
});

// Section reveal on scroll
function revealOnScroll() {
  document.querySelectorAll('.reveal').forEach(section => {
    const top = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (top < windowHeight - 100) {
      section.classList.add('visible');
    }
  });
  document.querySelectorAll('.timeline-item, .project-card, .cert-item').forEach(item => {
    const top = item.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (top < windowHeight - 100) {
      item.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
