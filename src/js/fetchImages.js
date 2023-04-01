const axios = require('axios').default;
import Notiflix from 'notiflix';
import { renderMarkup } from './renderMarkup';

const API_KEY = '34892957-edf6b51172121986d596d6631';
const BASE_URL = 'https://pixabay.com/api/';

const queryInput = document.querySelector('input');
const loadMoreButton = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

let queryText;
let page = 1;
let per_page = 40;

queryInput.addEventListener('input', event => {
  queryText = event.target.value.trim();
});

async function fetchImages(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  loadMoreButton.classList.add('is-hidden');

  try {
    if (queryInput.value === '') {
      return;
    }

    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q='${queryText}'&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`
    );

    if (response.data.totalHits > 0) {
      Notiflix.Notify.success(
        `Hooray! We found ${response.data.totalHits} images.`
      );
    }

    if (response.data.hits.length === 0) {
      loadMoreButton.remove();
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    renderMarkup(response);
    queryInput.value = '';
    loadMoreButton.classList.remove('is-hidden');
  } catch (error) {
    console.log(error.stack);
  }
}

export {
  fetchImages,
  BASE_URL,
  API_KEY,
  loadMoreButton,
  queryText,
  page,
  per_page,
};
