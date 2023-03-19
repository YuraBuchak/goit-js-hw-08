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
    localStorage.setItem(
      STORAGE_KEY_OBJ,
      JSON.stringify({
        ...elements,
        email: inputEL.value,
        message: textareaEL.value,
      })
    );
  }, 500)
);

formEl.addEventListener('submit', event => {
  event.preventDefault();

  if (inputEL.value !== '' && textareaEL.value !== '') {
    console.log('elements', elements);

    localStorage.removeItem(STORAGE_KEY_OBJ);
    event.target.reset();

    return;
  }
  alert('НАЯВНІ ПОРОЖНІ ПОЛЯ');
});

function textForm() {
  const storage = localStorage.getItem(STORAGE_KEY_OBJ);

  if (storage) {
    const { email, message } = JSON.parse(storage);
    inputEL.value = email || '';
    textareaEL.value = message || '';
  }
  // console.log('ключ', storage);
}

textForm();
