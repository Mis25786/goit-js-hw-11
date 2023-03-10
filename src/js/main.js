//*=========== імпорт бібліотек та функцій ==================
import Notiflix from 'notiflix';

import PixabayApiService from './getPromisPixaby.js';

import LoadMoreBtn from './components/LoadMoreBtn.js';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

//*=========== доступ до тегів ==============
const form = document.getElementById('search-form');
// const input = document.querySelector('input[name=searchQuery]');
// const buttonSubmit = document.querySelector('button[type=submit]');
const gallery = document.querySelector('.gallery');
// const btnLoadMore = document.querySelector('.load-more');

//*=========== створюємо екземпляр класу ==============
const pixabayApiService = new PixabayApiService();
const loadMoreBtn = new LoadMoreBtn({ selector: '.load-more', isHidden: true });

//*=========== слухачі ==============
form.addEventListener('submit', onSubmit);
loadMoreBtn.button.addEventListener('click', fetchArticles);

//*=========== сабміт ==============
function onSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const value = form.elements.searchQuery.value.trim();

  // pixabayApiService.getImage().then(res => res.json());
  // .then(console.log(data));
  // let totalHits = data.totalHits;
  // console.log(data);

  // onInfo(totalHits);
  pixabayApiService.resetPage();
  clearNewList();
  loadMoreBtn.show();

  pixabayApiService.query = value;

  fetchArticles().finally(() => form.reset());
}

//*=========== кнопка => добавити ще об'єктів на сторінку ==============
async function fetchArticles() {
  loadMoreBtn.disable();

  try {
    const data = await pixabayApiService.getImage();
    // деструктуризуємо з data
    const { hits, totalHits } = data;
    // або
    // const hits = data.hits;
    // const totalHits = data.totalHits;

    if (hits.length === 0) throw new Error(onNothingFound());

    const markup = hits.reduce(
      (markup, hits) => createMarkup(hits) + markup,
      ''
    );
    appendNewToList(markup);

    let page = pixabayApiService.page - 1;
    let limitPerPage = pixabayApiService.per_page;
    // if ((limitPerPage = !40)) limitPerPage = 40;
    if (pixabayApiService.page - 1 === 1) onInfo(totalHits);
    const totalPages = totalHits / limitPerPage;

    if (page > totalPages) throw new Error(onNoMore());

    loadMoreBtn.enable();
  } catch (err) {
    return err;
  }
}

//*=========== функції помилок ==============
function onNothingFound(err) {
  loadMoreBtn.hide();
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function onNoMore() {
  loadMoreBtn.hide();
  Notiflix.Notify.info(
    "We're sorry, but you've reached the end of search results."
  );
}
//*=========== повідомлення ==============
function onInfo(info) {
  Notiflix.Notify.success(`Hooray! We found ${info} images.`);
}

//*=========== очищаємо розмітку на сторінці ==============
function clearNewList(markup) {
  gallery.innerHTML = '';
}
//*=========== пушимо розмітку на сторінку + Бібліотека SimpleLightbox ==============
// цю функцію передає в onError(err) appendNewToList("текст повідомлення")
function appendNewToList(markup) {
  gallery.insertAdjacentHTML('beforeend', markup);

  new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    enableKeyboard: true,
  }).refresh();
}

//*=========== Шаблон розмітки картки одного зображення для галереї ==============
function createMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
  <div class="photo-card">
    <div class="images">
    <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy"  /></a>
    </div>
    <div class="info">

    <p class="info-item">
      <b><span class="span">Likes:</span></b>
      <b>${likes}</b>
    </p>
    <p class="info-item">
      <b><span class="span">Views:</span></b>
      <b>${views}</b>
    </p>
    <p class="info-item">
      <b><span class="span">Comments:</span></b>
      <b>${comments}</b>
    </p>
    <p class="info-item">
      <b><span class="span">Downloads:</span></b>
      <b>${downloads}</b>
    </p>
  </div>
</div>`;
}

//*=========== завдання ==============
// Для HTTP-запитів використана бібліотека axios.
// Використовується синтаксис async/await.
// Для повідомлень використана бібліотека notiflix.

//! Створи фронтенд частину застосунку пошуку і перегляду зображень за ключовим словом.
//* Додай оформлення елементів інтерфейсу.

//? HTTP-запити
//todo Для бекенду використовуй публічний API сервісу Pixabay.
//* Зареєструйся, отримай свій унікальний ключ доступу і ознайомся з документацією.

//* Список параметрів рядка запиту, які тобі обов'язково необхідно вказати:

// key - твій унікальний ключ доступу до API.
// q - термін для пошуку. Те, що буде вводити користувач.
// image_type - тип зображення. На потрібні тільки фотографії, тому постав значення photo.
// orientation - орієнтація фотографії. Постав значення horizontal.
// safesearch - фільтр за віком. Постав значення true.
// У відповіді буде масив зображень, що задовольнили критерії параметрів запиту.
// Кожне зображення описується об'єктом, з якого тобі цікаві тільки наступні властивості:

// webformatURL - посилання на маленьке зображення для списку карток.
// largeImageURL - посилання на велике зображення.
// tags - рядок з описом зображення. Підійде для атрибуту alt.
// likes - кількість лайків.
// views - кількість переглядів.
// comments - кількість коментарів.
// downloads - кількість завантажень.
// Якщо бекенд повертає порожній масив, значить нічого підходящого не було знайдено.
// У такому разі показуй повідомлення з текстом "Sorry, there are no images matching your search query.
// Please try again.". Для повідомлень використовуй бібліотеку notiflix.

//? Галерея і картка зображення
// Елемент div.gallery спочатку міститься в HTML документі, і в нього необхідно рендерити розмітку карток зображень.
// Під час пошуку за новим ключовим словом необхідно повністю очищати вміст галереї, щоб не змішувати результати.

//? Пагінація
// Pixabay API підтримує пагінацію і надає параметри page і per_page.
//* Зроби так, щоб в кожній відповіді приходило 40 об'єктів (за замовчуванням 20).

//* Початкове значення параметра page повинно бути 1.
//* З кожним наступним запитом, його необхідно збільшити на 1.
// У разі пошуку за новим ключовим словом, значення page потрібно повернути до початкового, оскільки буде пагінація по новій колекції зображень.
// HTML документ вже містить розмітку кнопки, по кліку на яку, необхідно виконувати запит за наступною групою зображень і додавати розмітку до вже існуючих елементів галереї.

// <button type="button" class="load-more">Load more</button>

//* В початковому стані кнопка повинна бути прихована.
// Після першого запиту кнопка з'являється в інтерфейсі під галереєю.
//* При повторному сабміті форми кнопка спочатку ховається, а після запиту знову відображається.
// У відповіді бекенд повертає властивість totalHits - загальна кількість зображень, які відповідають критерію пошуку (для безкоштовного акаунту).
//* Якщо користувач дійшов до кінця колекції, ховай кнопку і виводь повідомлення з текстом "We're sorry, but you've reached the end of search results.".

//! =========== завдання + ==============
//? Повідомлення
// Після першого запиту з кожним новим пошуком отримувати повідомлення, в якому буде написано, скільки всього знайшли зображень (властивість totalHits).
// Текст повідомлення - "Hooray! We found totalHits images."

//? Бібліотека SimpleLightbox
// Додати відображення великої версії зображення з бібліотекою SimpleLightbox для повноцінної галереї.

// У розмітці необхідно буде обгорнути кожну картку зображення у посилання, як зазначено в документації.
// Бібліотека містить метод refresh(), який обов'язково потрібно викликати щоразу після додавання нової групи карток зображень.
// Для того щоб підключити CSS код бібліотеки в проект, необхідно додати ще один імпорт, крім того, що описаний в документації.

// // Описаний в документації
// import SimpleLightbox from "simplelightbox";
// // Додатковий імпорт стилів
// import "simplelightbox/dist/simple-lightbox.min.css";

//? Прокручування сторінки
// Зробити плавне прокручування сторінки після запиту і відтворення кожної наступної групи зображень.
// Ось тобі код-підказка, але розберися у ньому самостійно.

// const { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });

//? Нескінченний скрол
// Замість кнопки «Load more», можна зробити нескінченне завантаження зображень під час прокручування сторінки. Ми надаємо тобі повну свободу дій в реалізації, можеш використовувати будь-які бібліотеки.

//*================================================================
