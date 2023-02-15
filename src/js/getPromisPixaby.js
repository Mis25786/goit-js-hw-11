// //*=========== данні для запиту ==============
// const URL = 'https://pixabay.com/api';
// const KEY = '32938330-25a7d9530d370aeaa9b179f57';
// const OPTIONS =
//   'image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1';

// //*===========  ==============
// function featchData(query) {
//   return fetch(`${URL}/?key=${KEY}&q=${query}&${OPTIONS}`).then(res =>
//     res.json()
//   );
// }

// export default featchData;

//?==================================
const URL = 'https://pixabay.com/api';
const KEY = '32938330-25a7d9530d370aeaa9b179f57';
const OPTIONS =
  'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

export default class PixabayApiService {
  constructor() {
    this.page = 1;
    this.query = '';
  }

  getImage() {
    return fetch(
      `${URL}/?key=${KEY}&q=${this.query}&${OPTIONS}&page=${this.page}`
    )
      .then(res => res.json())
      .then(({ hits }) => {
        this.nextPage();
        return hits;
      });
  }

  nextPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
