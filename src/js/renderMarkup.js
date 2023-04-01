import SimpleLightbox from 'simplelightbox';
const gallery = document.querySelector('.gallery');

function renderMarkup(response) {
  const markup = response.data.hits
    .map(
      im =>
        `
        <div class="photo-card">
          <a href="${im.largeImageURL}">
            <img src="${im.webformatURL}" alt="${im.tags}" loading="lazy" width=400/>
          </a>
            <div class="info">
                <p class="info-item">
                    <b>Likes: ${im.likes}</b>
                </p>
                <p class="info-item">
                    <b>Views: ${im.views}</b>
                </p>
                <p class="info-item">
                    <b>Comments: ${im.comments}</b>
                </p>
                <p class="info-item">
                    <b>Downloads: ${im.downloads}</b>
                </p>
            </div>
        </div>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  new SimpleLightbox('.gallery a', {
    captionType: 'attr',
    captionsData: 'alt',
    captionDelay: 250,
  });
}

export { renderMarkup};
