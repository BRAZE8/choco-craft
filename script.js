const cocoaSlider = document.getElementById('cocoa-slider');
const cocoaVal = document.getElementById('cocoa-val');
const topBtns = document.querySelectorAll('.top-btn');
const craftBtn = document.getElementById('craft-btn');

const visualBar = document.getElementById('visual-bar');
const toppingsOverlay = document.getElementById('toppings-overlay');
const chocoPreview = document.getElementById('choco-preview');

const resTitle = document.getElementById('res-title');
const resDesc = document.getElementById('res-desc');
const resToppings = document.getElementById('res-toppings');

let selectedToppings = [];

cocoaSlider.addEventListener('input', (e) => {
  const val = e.target.value;
  cocoaVal.textContent = `${val}%`;
  updatePreviewColor(val);
});

topBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    const emoji = btn.dataset.top;
    const name = btn.dataset.name;

    const existingIndex = selectedToppings.findIndex(t => t.name === name);

    if (existingIndex > -1) {
      selectedToppings.splice(existingIndex, 1);
    } else {
      selectedToppings.push({ emoji, name });
    }
  });
});

function updatePreviewColor(cocoa) {
  if (cocoa < 45) {
    visualBar.style.backgroundColor = '#8c5338';
    resTitle.textContent = "Молочний Шоколад";
  } else if (cocoa < 75) {
    visualBar.style.backgroundColor = '#542d1b';
    resTitle.textContent = "Темний Шоколад";
  } else {
    visualBar.style.backgroundColor = '#261108';
    resTitle.textContent = "Гіркий Шоколад";
  }
  resDesc.textContent = `${cocoa}% вміст какао`;
}

craftBtn.addEventListener('click', () => {
  chocoPreview.style.transform = "scale(1.05)";
  setTimeout(() => chocoPreview.style.transform = "scale(1)", 250);

  toppingsOverlay.innerHTML = '';
  resToppings.innerHTML = '';

  if (selectedToppings.length === 0) {
    resToppings.innerHTML = '<span>Без добавок (Чистий смак)</span>';
  } else {
    selectedToppings.forEach(top => {
      const item = document.createElement('div');
      item.textContent = `${top.emoji} ${top.name}`;
      resToppings.appendChild(item);

      for (let i = 0; i < 3; i++) {
        const icon = document.createElement('span');
        icon.className = 'topping-icon';
        icon.textContent = top.emoji;
        toppingsOverlay.appendChild(icon);
      }
    });
  }
});

const heatBtn = document.getElementById('heat-btn');
const tempDisplay = document.getElementById('temp-val');
const meltLiquid = document.getElementById('melt-liquid');
const chocoPiece = document.getElementById('choco-piece');

let temp = 20;
let heatInterval = null;

heatBtn.addEventListener('mousedown', startHeating);
heatBtn.addEventListener('touchstart', startHeating);

window.addEventListener('mouseup', stopHeating);
window.addEventListener('touchend', stopHeating);

function startHeating() {
  if (heatInterval) return;

  heatInterval = setInterval(() => {
    if (temp < 100) {
      temp += 1;
      tempDisplay.textContent = temp;
      updateMeltStatus();
    }
  }, 50);
}

function stopHeating() {
  clearInterval(heatInterval);
  heatInterval = null;

  const coolInterval = setInterval(() => {
    if (temp > 20 && !heatInterval) {
      temp -= 1;
      tempDisplay.textContent = temp;
      updateMeltStatus();
    } else {
      clearInterval(coolInterval);
    }
  }, 100);
}

function updateMeltStatus() {
  let meltPercent = Math.max(0, Math.min(100, ((temp - 20) / 50) * 100));
  
  meltLiquid.style.height = `${meltPercent}%`;
  
  let scale = 1 - (meltPercent / 100);
  let opacity = 1 - (meltPercent / 100);
  chocoPiece.style.transform = `scale(${scale})`;
  chocoPiece.style.opacity = opacity;
}

const candyBtn = document.getElementById('candy-btn');
const fortunePaper = document.getElementById('fortune-paper');
const fortuneText = document.getElementById('fortune-text');

const fortunes = [
  "🍫 На тебе чекає солодкий успіх у всіх починаннях!",
  "🚀 Твій код зкомпілюється з першої спроби!",
  "☕ Чашка гарячого какао вирішить 99% твоіх проблем сьогодні.",
  "✨ Секрет щастя простий: ще шматочок темного шоколаду.",
  "💡 Несподівана ідея принесе тобі великий прорив!",
  "🎯 Твій рівень потужності сьогодні досягне 100%!",
  "🧘‍♂️ Зберігай спокій і їж шоколад."
];

let isBroken = false;

candyBtn.addEventListener('click', () => {
  if (isBroken) {
    candyBtn.classList.remove('broken');
    fortunePaper.classList.remove('show');
    isBroken = false;
  } else {
    candyBtn.classList.add('broken');
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    fortuneText.textContent = randomFortune;
    
    setTimeout(() => {
      fortunePaper.classList.add('show');
    }, 200);

    isBroken = true;
  }
});