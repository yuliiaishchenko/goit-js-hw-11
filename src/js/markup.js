export function createMarkup(markup){
    return markup.map(({
        webformatURL, 
largeImageURL, 
tags, 
likes,
views,
comments,
downloads, 
    }) => {
        return `
        <div class="photo-card" style="background-image= url('${largeImageURL})">
        <a class="photo-link" href ="${largeImageURL}">
  <img class="photo" src="${webformatURL}" alt="${tags}" width="300" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div> `;

    }).join('');}