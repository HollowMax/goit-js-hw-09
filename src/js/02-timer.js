import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import 'flatpickr/dist/flatpickr.min.css';
const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds');
const timer = document.querySelector('.timer');
const field = document.querySelectorAll('.field');

timer.style.display = 'flex';
timer.style.gap = '15px';

field.forEach(e => {
  e.style.display = 'flex';
  e.style.flexDirection = 'column';
  e.style.fontSize = '20px';
  e.style.fontWeight = 'bold';
});

startBtn.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (!(selectedDates[0] > options.defaultDate)) {
      startBtn.disabled = true;
      Notify.failure('Please choose a date in the future');
      return '';
    }

    startBtn.disabled = false;

    startBtn.addEventListener('click', e => {
      startBtn.disabled = true;
      dateInput.disabled = true;
      timerDays.textContent = addLeadingZero(convertMs(selectedDates[0] - Date.now()).days);
      timerHours.textContent = addLeadingZero(convertMs(selectedDates[0] - Date.now()).hours);
      timerMinutes.textContent = addLeadingZero(convertMs(selectedDates[0] - Date.now()).minutes);
      timerSeconds.textContent = addLeadingZero(convertMs(selectedDates[0] - Date.now()).seconds);
      const timerInterval = setInterval(() => {
        timerDays.textContent = addLeadingZero(convertMs(selectedDates[0] - Date.now()).days);
        timerHours.textContent = addLeadingZero(convertMs(selectedDates[0] - Date.now()).hours);
        timerMinutes.textContent = addLeadingZero(convertMs(selectedDates[0] - Date.now()).minutes);
        timerSeconds.textContent = addLeadingZero(convertMs(selectedDates[0] - Date.now()).seconds);

        if (selectedDates[0] - Date.now() < 1000) {
          clearInterval(timerInterval);
        }
      }, 1000);
    });
  },
};

flatpickr(dateInput, options);

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
