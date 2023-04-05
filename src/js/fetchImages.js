import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { pixabayAPI, queryInput } from './pixabayAPI';
import { renderMarkup } from './renderMarkup';

const lightbox = new SimpleLightbox('.gallery a', {
  captionType: 'attr',
  captionsData: 'alt',
  captionDelay: 250,
});

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
    } else if (images.data.totalHits > 0 && images.data.totalHits <= 40) {
      Notify.success(`Hooray! We found ${images.data.totalHits} images.`);
      queryInput.value = '';
      loadMoreButton.classList.add('is-hidden');
      renderMarkup(images);
      lightbox.refresh();
    } else if (images.data.totalHits > 0) {
      Notify.success(`Hooray! We found ${images.data.totalHits} images.`);
      queryInput.value = '';
      loadMoreButton.classList.remove('is-hidden');
      renderMarkup(images);
      lightbox.refresh();
    }
  } catch (error) {
    console.log(error.stack);
  }
}

export { fetchImages, loadMoreButton, lightbox };
