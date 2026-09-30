const cocoaSlider = document.getElementById('cocoa-slider');
const cocoaVal = document.getElementById('cocoa-val');
const topBtns = document.querySelectorAll('.top-btn');
const craftBtn = document.getElementById('craft-btn');

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
    const topping = btn.dataset.top;

    if (selectedToppings.includes(topping)) {
      selectedToppings = selectedToppings.filter(t => t !== topping);
    } else {
      selectedToppings.push(topping);
    }
  });
});

function updatePreviewColor(cocoa) {
  if (cocoa < 45) {
    chocoPreview.style.backgroundColor = '#8c5338';
    resTitle.textContent = "Молочний Шоколад";
  } else if (cocoa < 75) {
    chocoPreview.style.backgroundColor = '#4a2515';
    resTitle.textContent = "Темний Шоколад";
  } else {
    chocoPreview.style.backgroundColor = '#261108';
    resTitle.textContent = "Гіркий Шоколад";
  }
  resDesc.textContent = `${cocoa}% вміст какао`;
}

craftBtn.addEventListener('click', () => {
  chocoPreview.style.transform = "scale(1.08)";
  setTimeout(() => chocoPreview.style.transform = "scale(1)", 200);

  resToppings.innerHTML = '';
  if (selectedToppings.length === 0) {
    resToppings.innerHTML = '<span>Без добавок (Чистий смак)</span>';
  } else {
    selectedToppings.forEach(top => {
      const item = document.createElement('div');
      item.textContent = top;
      resToppings.appendChild(item);
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
// --- 3. ШОКОЛАДНЕ ПЕРЕДБАЧЕННЯ ---
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
    // Скидання стан
    candyBtn.classList.remove('broken');
    fortunePaper.classList.remove('show');
    isBroken = false;
  } else {
    // Розлом цукерки
    candyBtn.classList.add('broken');
    
    // Рандомне передбачення
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    fortuneText.textContent = randomFortune;
    
    setTimeout(() => {
      fortunePaper.classList.add('show');
    }, 200);

    isBroken = true;
  }
});