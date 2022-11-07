import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('form');

form.addEventListener('submit', e => {
  e.preventDefault();
  const { delay, step, amount } = e.target;
  for (let i = 0; i < amount.value; i++) {
    let del = +delay.value + step.value * i;
    createPromise(i + 1, del)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promiseItem = new Promise((resolve, rejected) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      rejected({ position, delay });
    }, delay);
  });
  return promiseItem;
}
