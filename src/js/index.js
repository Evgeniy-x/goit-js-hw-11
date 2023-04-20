import refs from './refs.js';
import ImagesApiServise from './images-servise.js';
import imgMarkup from './imgMarkup.js';

// import SimpleLightbox from 'simplelightbox';
// let gallery = new SimpleLightbox('.gallery');

const imagesAPIServise = new ImagesApiServise();

refs.form.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  imagesAPIServise.query = e.currentTarget.elements.searchQuery.value;

  //   refs.gallery.textContent = '';

  imagesAPIServise
    .fetchImages()
    .then(res => {
      console.log(res);

      res.hits.map(elem =>
        refs.gallery.insertAdjacentHTML('beforeend', imgMarkup(elem))
      );
    })
    .catch(() =>
      console.log(
        'Sorry, there are no images matching your search query. Please try again.'
      )
    );
}

function onLoadMore() {}
