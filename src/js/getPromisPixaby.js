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

//?======================================================================================
// const URL = 'https://pixabay.com/api';
// const KEY = '32938330-25a7d9530d370aeaa9b179f57';
// const OPTIONS =
//   'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

// export default class PixabayApiService {
//   constructor() {
//     this.page = 1;
//     this.query = '';
//   }

//   getImage() {
//     return fetch(
//       `${URL}/?key=${KEY}&q=${this.query}&${OPTIONS}&page=${this.page}`
//     )
//       .then(res => res.json())
//       .then(({ hits }) => {
//         this.nextPage();
//         return hits;
//       });
//   }

//   nextPage() {
//     this.page += 1;
//   }

//   resetPage() {
//     this.page = 1;
//   }
// }
// //?=================================== axios ===================================================
// import axios from 'axios';

// const URL = 'https://pixabay.com/api';
// const KEY = '32938330-25a7d9530d370aeaa9b179f57';
// const OPTIONS =
//   'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

// export default class PixabayApiService {
//   constructor() {
//     this.page = 1;
//     this.query = '';
//   }

//   async getImage() {
//     try {
//       const res = await axios.get(
//         `${URL}/?key=${KEY}&q=${this.query}&${OPTIONS}&page=${this.page}`
//       );
//       const hits = await res.data.hits;

//       this.nextPage();
//       return hits;
//     } catch (error) {
//       console.log(error.message);
//     }
//   }

//   nextPage() {
//     this.page += 1;
//   }

//   resetPage() {
//     this.page = 1;
//   }
// }

//?======================================= axios async ===============================================
// import axios from 'axios';

// const URL = 'https://pixabay.com/api/';
// const KEY = '32938330-25a7d9530d370aeaa9b179f57';

// export default class PixabayApiService {
//   constructor() {
//     this.page = 1;
//     this.query = '';
//     this.totalHits = 0;
//   }

//   async getImage() {
//     const OPTIONS = new URLSearchParams({
//       key: KEY,
//       q: this.query,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//       page: this.page,
//       per_page: 40,
//     });
//
// const option = {
//   params:{
//   key: KEY,
//   q: this.query,
//   image_type: 'photo',
//   orientation: 'horizontal',
//   safesearch: true,
//   page: this.page,
//   per_page: 40,}
// };

//     try {
//       const res = await axios.get(`${URL}?${OPTIONS.toString()}`);
//       // const hits = await res.data.hits;
//       // console.log(hits);

//       this.nextPage();
//       return hits;
//     } catch (error) {
//       console.error(error.toJSON());
//     }
//   }

//   get hits() {
//     return this.totalHits;
//   }

//   set hits(newTotalHits) {
//     this.totalHits = newTotalHits;
//   }

//   nextPage() {
//     this.page += 1;
//   }

//   resetPage() {
//     this.page = 1;
//   }
// }
//?======================================================================================
import axios from 'axios';

const URL = 'https://pixabay.com/api';
const KEY = '32938330-25a7d9530d370aeaa9b179f57';
const OPTIONS = 'image_type=photo&orientation=horizontal&safesearch=true';

export default class PixabayApiService {
  constructor() {
    this.query = '';
    this.page = 1;
    this.per_page = 40;
  }

  async getImage() {
    try {
      const res = await axios.get(
        `${URL}/?key=${KEY}&q=${this.query}&${OPTIONS}&per_page=${this.per_page}&page=${this.page}`
      );

      // console.log(res);
      // console.log(res.data);
      // console.log(res.data.hits);
      // console.log(res.data.totalHits);

      this.nextPage();
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  }

  nextPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
