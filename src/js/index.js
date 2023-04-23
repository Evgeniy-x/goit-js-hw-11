import refs from './refs.js';
import ImagesApiServise from './images-servise.js';
import imagesMarkup from './imgMarkup.js';

import { Notify } from 'notiflix';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let slider = new SimpleLightbox('.slider');
const imagesAPIServise = new ImagesApiServise();
let counter = 0;

refs.form.addEventListener('submit', onSearch);
refs.button.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  clearImagesContainer();
  onBtn(false);
  counter = 0;
  imagesAPIServise.query = e.currentTarget.elements.searchQuery.value;
  imagesAPIServise.resetPage();

  imagesAPIServise
    .fetchImages()
    .then(response => {
      if (response.hits.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      appendImagesMarkup(response.hits);
      onBtn(true);
      checkNumberHits(response);
    })
    .catch(() =>
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      )
    );
}

function onLoadMore() {
  imagesAPIServise.fetchImages().then(response => {
    appendImagesMarkup(response.hits);
    checkNumberHits(response);
    Notify.info(`Hooray! We found ${counter} images.`);
  });
}

function appendImagesMarkup(array) {
  array.forEach(elem =>
    refs.gallery.insertAdjacentHTML('beforeend', imagesMarkup(elem))
  );
  slider.refresh();
}

function clearImagesContainer() {
  refs.gallery.innerHTML = '';
}

function checkNumberHits(data) {
  counter += data.hits.length;
  if (counter >= data.totalHits) {
    Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
    onBtn(false);
    return;
  }
}

function onBtn(boolean) {
  if (boolean) {
    refs.button.classList.remove('is-hidden');
  } else {
    refs.button.classList.add('is-hidden');
  }
}
