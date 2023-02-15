//*=========== імпорт бібліотек ==================
import Notiflix from 'notiflix';
import axios from 'axios';
import featchData from './getPromisPixaby.js';
//*=========== доступ до тегів ==============
const form = document.getElementById('search-form');
// console.log(form);
const input = document.querySelector('input[name=searchQuery]');
// console.log(input);
const buttonSubmit = document.querySelector('button[type=submit]');
// console.log(buttonSubmit);
const gallery = document.querySelector('.gallery');
// console.log(gallery);
const buttonLoadMore = document.querySelector('.load-more');
// console.log(buttonLoadMore);
//*=========== слухачі ==============
form.addEventListener('submit', onSubmit);
//*===========  ==============
function onSubmit(e) {
  e.prevetDefault();

  console.log('kuk');
}

// featchData('gpt').then(console.log);
//*===========  ==============

//*===========  ==============

//*===========  ==============

//*===========  ==============
// async function getUser() {
//   try {
//     const response = await axios.get('/user?ID=12345');
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }

// axios
//   .get(`${URL}/?key=${KEY}&q=yellow+flower&${OPTIONS}`)
//   .then(({ data }) => console.log(data.hits));

// fetch(`${URL}/?key=${KEY}&q=yellow+flower&${OPTIONS}`)
//   .then(res => res.json())
//   .then(console.log);
//*=========== Шаблон розмітки картки одного зображення для галереї ==============

// <div class="photo-card">
//   <img src="" alt="" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b>
//     </p>
//     <p class="info-item">
//       <b>Views</b>
//     </p>
//     <p class="info-item">
//       <b>Comments</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>
//     </p>
//   </div>
// </div>
//*===========  ==============
