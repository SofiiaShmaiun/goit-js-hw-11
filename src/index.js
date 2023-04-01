import 'simplelightbox/dist/simple-lightbox.min.css';
const axios = require('axios').default;
import { renderMarkup } from './js/renderMarkup';
import {
  fetchImages,
  API_KEY,
  BASE_URL,
  loadMoreButton,
  queryText,
  page,
  per_page,
} from './js/fetchImages';
import Notiflix from 'notiflix';

const submitQueryButton = document.querySelector('.search-form');

submitQueryButton.addEventListener('submit', fetchImages);
loadMoreButton.addEventListener('click', handleLoadMore);
loadMoreButton.classList.add('is-hidden');

async function handleLoadMore() {
  page += 1;

  const response = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q='${queryText}'&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`
  );

  if (response.data.hits.length < per_page) {
    loadMoreButton.remove();
    Notiflix.Notify.info(
      `We're sorry, but you've reached the end of search results.`
    );
  }

  renderMarkup(response);

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
