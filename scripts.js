const form = document.getElementById('paletteForm');
const paletteDiv = document.getElementById('palette');
const toast = document.getElementById('toast');

form.addEventListener('submit', e => {
  e.preventDefault();
  const size = parseInt(form.size.value);
  const format = form.format.value;
  generatePalette(size, format);
});

function generatePalette(size, format) {
  paletteDiv.innerHTML = '';
  const colors = [];

  for (let i = 0; i < size; i++) {
    let color;
    do {
      color = format === 'hex' ? getRandomHex() : getRandomRGBA();
    } while (colors.includes(color));
    colors.push(color);
    createColorBox(color);
  }

  localStorage.setItem('palette', JSON.stringify(colors));
}

function createColorBox(color) {
  const box = document.createElement('div');
  box.className = 'color-box';
  box.style.backgroundColor = color;
  box.innerText = color;
  box.tabIndex = 0;
  box.setAttribute('role', 'button');
  box.setAttribute('aria-label', `Color ${color}, clic para copiar`);

  box.addEventListener('click', () => copyToClipboard(color));
  box.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      copyToClipboard(color);
    }
  });

  paletteDiv.appendChild(box);
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Código ${text} copiado al portapapeles!`);
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

function getRandomHex() {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
  return `#${hex}`;
}

function getRandomRGBA() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const a = (Math.random() * 0.5 + 0.5).toFixed(2); // alpha entre 0.5 y 1
  return `rgba(${r},${g},${b},${a})`;
}
