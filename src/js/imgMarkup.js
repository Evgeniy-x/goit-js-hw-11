export default imagesMarkup;

function imagesMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
      <a href="${largeImageURL}" class="slider"> 
        <div class="photo-card">
          <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
          <div class="info">
            <p class="info-item">
            <b>Likes</b>
              <b>${likes}</b>
            </p>
            <p class="info-item">
              <b>Views</b>
              <b>${views}</b>
            </p>
            <p class="info-item">
              <b>Comments</b>
              <b>${comments}</b>
            </p>
            <p class="info-item">
              <b>Download</b>
              <b>${downloads}</b>
            </p>
          </div>
        </div>
      </a>`;
}
