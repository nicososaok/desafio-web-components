function createCard(cardsContainerEl, cardTitle, cardDescription, cardImgAlt, cardImgUrls, imgClass) {
  const cardEl = document.createElement('div');
  cardEl.classList.add('card', imgClass);

  const images = Array.isArray(cardImgUrls) ? cardImgUrls : [cardImgUrls];

  let imagesHTML = `
    <div class="card__img-container">
      ${images
      .map((url, index) => {
        const extraClass = images.length > 1 ? 'card__layer' : 'card__img';
        return `<img src="${url}" class="${extraClass} img-${index} ${imgClass}" alt="${cardImgAlt}">`;
      })
      .join('')}
    </div>`;

  cardEl.innerHTML = `
    ${imagesHTML}
    <div class="card__title-div"><h3 class="card__title">${cardTitle}</h3></div>
    <div class="card__description-div"><p class="card__description">${cardDescription}</p></div>`;

  cardsContainerEl.appendChild(cardEl);
}

document.addEventListener('DOMContentLoaded', () => {
  const cardsContainerEl = document.querySelector('.cards__container');

  // CARD 1: Una sola imagen
  createCard(
    cardsContainerEl,
    'Desarrollo de<br>páginas web',
    'Creacion de paginas webs, totalmente responsive y mobile first. Lorem ipsum dolor sit amet.',
    'Web Dev',
    './img/img-front.png',
    'card-web'
  );

  // CARD 2: Dos imágenes (Laptop y elemento)
  createCard(
    cardsContainerEl,
    'Animaciones<br>para webs',
    'Animaciones personalizadas con CSS, JS y Frameworks. Lorem ipsum dolor sit amet, consectetur.',
    'Animations',
    ['./img/laptop.png', './img/card.png'],
    'card-anim'
  );

  // CARD 3: Tres imágenes (Los tres celulares)
  createCard(
    cardsContainerEl,
    'Desarrollo de<br>apps móviles',
    'Desarrollo de aplicaciones móviles nativas y multiplataforma con las últimas tecnologías del mercado.',
    'App Dev',
    ['./img/mobile-izq.png', './img/mobile-frente.png', './img/mobile-der.png'],
    'card-app'
  );
});
