import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { pixabayAPI } from './js/pixabayAPI';
import { renderMarkup } from './js/renderMarkup';
import { fetchImages, loadMoreButton } from './js/fetchImages';

const submitQueryButton = document.querySelector('.search-form');

submitQueryButton.addEventListener('submit', fetchImages);
loadMoreButton.addEventListener('click', handleLoadMore);
loadMoreButton.classList.add('is-hidden');

let page = 1;
const per_page = 40;

async function handleLoadMore() {
  page += 1;
  try {
    const loadMore = await pixabayAPI();
    renderMarkup(loadMore);

    if (loadMore.data.hits.length < per_page) {
      loadMoreButton.classList.add('is-hidden');
      Notify.info(`We're sorry, but you've reached the end of search results.`);
    }
  } catch (error) {
    console.log(error.stack);
  }

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
