async function renderPortfolio() {
  const container = document.querySelector('.cards__container');

  if (!container) {
    console.error("No se encontró el contenedor .cards__container");
    return;
  }

  const SPACE_ID = 'v2qh0gjhku1y';
  const ACCESS_TOKEN = '1eiRNcUBAvteDy8lH8znvWesCyMeOgettlCqoUThlRQ';
  const CONTENT_TYPE = 'trabajos';

  const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=${CONTENT_TYPE}&include=10`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const assets = data.includes?.Asset || [];
    container.innerHTML = '';

    data.items.forEach((item) => {
      const f = item.fields;
      let imgUrl = '';
      if (f.trabajosImage && f.trabajosImage.sys) {
        const asset = assets.find((a) => a.sys.id === f.trabajosImage.sys.id);
        if (asset) imgUrl = 'https:' + asset.fields.file.url;
      }

      const card = document.createElement('div');
      card.className = 'trabajos-card';
      card.innerHTML = `
        <img class="trabajos-card__img" src="${imgUrl}" alt="${f.trabajosTitle}" />
        <h3 class="trabajos-card__title poppins-bold">${f.trabajosTitle}</h3>
        <p class="trabajos-card__desc poppins-regular">${f.trabajosDescription}</p>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error cargando trabajos:', error);
  }
}

function main() {
  const headerEl = document.querySelector('.header__container');
  const footerEl = document.querySelector('.footer__container');

  if (typeof createHeader === 'function' && headerEl) createHeader(headerEl);
  if (typeof createFooter === 'function' && footerEl) createFooter(footerEl);

  renderPortfolio();
}

main();