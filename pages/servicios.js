async function renderServicios() {
  const container = document.querySelector('.services-list');

  const SPACE_ID = 'v2qh0gjhku1y';
  const ACCESS_TOKEN = '1eiRNcUBAvteDy8lH8znvWesCyMeOgettlCqoUThlRQ';
  // Importante: el fetch debe incluir la parte de Assets
  const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=service`;

  const response = await fetch(url);
  const data = await response.json();

  // Función para encontrar la URL de la imagen usando el ID del Asset
  const getImageUrl = (assetId) => {
    const asset = data.includes.Asset.find((a) => a.sys.id === assetId);
    return asset ? 'https:' + asset.fields.file.url : '';
  };

  data.items.forEach((item) => {
    const card = document.createElement('div');
    card.classList.add('service-card');

    // Buscamos la imagen si es que el item tiene una
    const imgUrl = item.fields.imagen ? getImageUrl(item.fields.imagen.sys.id) : './img/default.png';

    card.innerHTML = `
      <div class="service-card__img-container">
        <img src="${imgUrl}" alt="${item.fields.title}" class="service-card__img">
      </div>
      <h3 class="poppins-bold">${item.fields.title}</h3>
      <p class="poppins-regular">${item.fields.description}</p>
    `;
    container.appendChild(card);
  });
}

function main() {
  // Asegúrate de tener estas funciones en tus componentes
  createHeader(document.querySelector('.header-container'));
  createFooter(document.querySelector('.footer-container'));
  renderServicios();
}

main();
