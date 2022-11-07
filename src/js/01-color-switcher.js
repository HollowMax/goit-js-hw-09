const startChanging = document.querySelector('[data-start]');
const stopChanging = document.querySelector('[data-stop]');
let colorChanging = false;
let intervalId = null;

startChanging.addEventListener('click', e => {
  if (colorChanging) {
    return 0;
  }
  startChanging.disabled = true;
  stopChanging.disabled = false;
  const color = getRandomHexColor();
  document.body.style.backgroundColor = color;
  intervalId = setInterval(() => {
    const color = getRandomHexColor();
    document.body.style.backgroundColor = color;
  }, 1000);
  colorChanging = true;
});

stopChanging.addEventListener('click', e => {
  stopChanging.disabled = true;
  startChanging.disabled = false;
  colorChanging = false;
  clearInterval(intervalId);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
