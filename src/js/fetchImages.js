import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { pixabayAPI, queryInput } from './pixabayAPI';
import { renderMarkup } from './renderMarkup';

const loadMoreButton = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

async function fetchImages(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  try {
    if (queryInput.value.trim() === '') {
      loadMoreButton.classList.add('is-hidden');
      return;
    }

    const images = await pixabayAPI();

    if (images.data.hits.length === 0) {
      loadMoreButton.classList.add('is-hidden');
      queryInput.value = '';
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (images.data.totalHits > 0) {
      Notify.success(`Hooray! We found ${images.data.totalHits} images.`);
      queryInput.value = '';
      loadMoreButton.classList.remove('is-hidden');
      renderMarkup(images);
    }
  } catch (error) {
    console.log(error.stack);
  }
}

export { fetchImages, loadMoreButton };
