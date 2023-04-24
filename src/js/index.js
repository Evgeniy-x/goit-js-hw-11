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

async function onSearch(e) {
  e.preventDefault();

  clearImagesContainer();
  onBtn(false);
  counter = 0;
  imagesAPIServise.query = e.currentTarget.elements.searchQuery.value;
  imagesAPIServise.resetPage();

  if (imagesAPIServise.query.trim() === '') {
    return Notify.info('Field must not be empty');
  }

  try {
    const { totalHits, hits } = await imagesAPIServise.fetchImages();

    if (totalHits === 0) {
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    appendImagesMarkup(hits);
    onBtn(true);
    checkNumberHits(hits, totalHits);
  } catch (error) {
    Notify.failure(error.message);
  }
}

async function onLoadMore() {
  try {
    const { totalHits, hits } = await imagesAPIServise.fetchImages();
    appendImagesMarkup(hits);
    checkNumberHits(hits, totalHits);
    // Notify.info(`Hooray! We found ${counter} images.`);
  } catch (error) {
    Notify.failure(error.message);
  }
}

function appendImagesMarkup(array) {
  array.map(elem =>
    refs.gallery.insertAdjacentHTML('beforeend', imagesMarkup(elem))
  );
  slider.refresh();
}

function clearImagesContainer() {
  refs.gallery.innerHTML = '';
}

function checkNumberHits(hits, totalHits) {
  counter += hits.length;
  if (counter >= totalHits) {
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
