const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
const toggleBtn = document.getElementById('toggleMatrix');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = 'アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array.from({ length: columns }).fill(1);

let isRunning = false;
let interval = null;

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#0f0';
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

function startMatrix() {
  if (!interval) {
    interval = setInterval(drawMatrix, 33);
    toggleBtn.textContent = "Stop Matrix";
    isRunning = true;
  }
}

function stopMatrix() {
  clearInterval(interval);
  interval = null;
  toggleBtn.textContent = "Start Matrix";
  isRunning = false;
}

toggleBtn.addEventListener('click', () => {
  isRunning ? stopMatrix() : startMatrix();
});

// Default state: Matrix off
stopMatrix();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
