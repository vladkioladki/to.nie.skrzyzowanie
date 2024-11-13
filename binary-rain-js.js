const canvas = document.querySelector('.binary-rain');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const characters = '01';
const fontSize = 10;
const columns = canvas.width / fontSize;

const drops = Array(Math.floor(columns)).fill(1);

function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#fff';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = characters.charAt(Math.floor(Math.random() * characters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975)
      drops[i] = 0;

    drops[i]++;
  }
}

setInterval(draw, 33);

document.addEventListener('mousemove', (e) => {
  const eye = document.querySelector('.floating-eye');
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const rect = eye.getBoundingClientRect();
  const eyeX = rect.left + rect.width / 2;
  const eyeY = rect.top + rect.height / 2;

  const angle = Math.atan2(mouseY - eyeY, mouseX - eyeX);
  eye.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;
});

function createSymbol() {
  const symbols = ['☭', '⚡', '△', '⬢', '⬡', '◯'];
  const symbol = document.createElement('div');
  symbol.innerText = symbols[Math.floor(Math.random() * symbols.length)];
  symbol.style.position = 'fixed';
  symbol.style.left = Math.random() * window.innerWidth + 'px';
  symbol.style.top = -50 + 'px';
  symbol.style.color = '#fff';
  symbol.style.fontSize = (Math.random() * 30 + 20) + 'px';
  symbol.style.zIndex = '1';
  symbol.style.opacity = '0.5';
  symbol.style.transition = 'all 5s linear';

  document.body.appendChild(symbol);

  setTimeout(() => {
    symbol.style.top = window.innerHeight + 50 + 'px';
    symbol.style.opacity = '0';
  }, 100);

  setTimeout(() => {
    document.body.removeChild(symbol);
  }, 5000);
}

setInterval(createSymbol, 500);
