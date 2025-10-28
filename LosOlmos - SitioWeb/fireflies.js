// Firefly animation script

const canvas = document.getElementById('firefly-canvas');
const ctx = canvas.getContext('2d');

let width, height;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Generate fireflies
const fireflyCount = 50;
const fireflies = Array.from({ length: fireflyCount }, () => ({
  x: Math.random() * width,
  y: Math.random() * height,
  vx: (Math.random() - 0.5) * 0.6,
  vy: (Math.random() - 0.5) * 0.6,
  radius: 1 + Math.random() * 2,
  opacity: Math.random(),
  flickerRate: 0.01 + Math.random() * 0.02
}));

function updateFireflies() {
  for (const f of fireflies) {
    // Brownian motion
    f.vx += (Math.random() - 0.5) * 0.2;
    f.vy += (Math.random() - 0.5) * 0.2;


    f.x += f.vx;
    f.y += f.vy;

    const maxSpeed = 1;

    f.vx = Math.max(-maxSpeed, Math.min(maxSpeed, f.vx));
    f.vy = Math.max(-maxSpeed, Math.min(maxSpeed, f.vy));

    // Bounce off edges
    if (f.x < width*-3 || f.x > width*3) f.vx *= -1;
    if (f.y < height*-3 || f.y > height*3) f.vy *= -1;

    // Flickering effect
    f.opacity += (Math.random() - 0.5) * f.flickerRate;
    f.opacity = Math.max(0, Math.min(1, f.opacity));
  }
}

function drawFireflies() {
  ctx.clearRect(0, 0, width, height);

  for (const f of fireflies) {
    const gradient = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius * 20);
    gradient.addColorStop(0, `rgba(255, 255, 150, ${f.opacity})`);
    gradient.addColorStop(1, `rgba(255, 255, 150, 0)`);

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.radius * 20, 0, Math.PI * 2);
    ctx.fill();
  }
}

function animate() {
  updateFireflies();
  drawFireflies();
  requestAnimationFrame(animate);
}

animate();

