import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const inputEL = document.querySelector('input');
const textareaEL = document.querySelector('textarea');

const STORAGE_KEY_OBJ = 'feedback-form-state';

let elements = {};
// console.log(elements);

formEl.addEventListener(
  'input',
  throttle(event => {
    elements[event.target.name] = event.target.value;
    localStorage.setItem(STORAGE_KEY_OBJ, JSON.stringify(elements));
  }, 500)
);

formEl.addEventListener('submit', event => {
  if (inputEL.value !== '' && textareaEL.value !== '') {
    event.preventDefault();
    console.log('elements', elements);
    localStorage.removeItem(STORAGE_KEY_OBJ);
    event.target.reset();

    return;
  }
  alert('НАЯВНІ ПОРОЖНІ ПОЛЯ');
});

console.log('storage', JSON.parse(localStorage.getItem(STORAGE_KEY_OBJ)));

function textForm() {
  const storage = localStorage.getItem(STORAGE_KEY_OBJ);
  if (storage) {
    const { email, message } = JSON.parse(storage);
    inputEL.value = email || '';
    textareaEL.value = message || '';
  }
}

textForm();
