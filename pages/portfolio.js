async function renderPortfolio() {
  const container = document.querySelector('.portfolio-list');
  if (!container) return; // Seguridad por si el contenedor no existe

  // 1. Tus credenciales reales
  const SPACE_ID = 'v2qh0gjhku1y';
  const ACCESS_TOKEN = '1eiRNcUBAvteDy8lH8znvWesCyMeOgettlCqoUThlRQ';
  const CONTENT_TYPE = 'portfolio'; // Asegúrate que en Contentful el ID sea exactamente 'portfolio'

  // Agregamos &include=10 para traer las imágenes
  const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=${CONTENT_TYPE}&include=10`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const assets = data.includes?.Asset || [];
    container.innerHTML = ''; // Limpiar antes de cargar

    data.items.forEach((item) => {
      const fields = item.fields;

      // 2. Lógica para resolver la URL de la imagen
      const assetId = fields.imagen?.sys.id; // Asumiendo que el campo se llama 'imagen'
      const asset = assets.find((a) => a.sys.id === assetId);
      const imgUrl = asset ? 'https:' + asset.fields.file.url : 'https://via.placeholder.com/300';

      // 3. Crear la card
      const card = document.createElement('div');
      card.classList.add('service-card');

      card.innerHTML = `
        <div class="card__img-container">
        <img src="${imgUrl}" alt="${fields.titulo || 'Proyecto'}">
        </div>
        <h3 class="poppins-bold">${fields.titulo || 'Sin título'}</h3>
        <p class="poppins-regular">${fields.descripcion || ''}</p>
        <a href="${fields.link || '#'}" target="_blank" class="cyan-link">Ver proyecto</a>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error cargando portfolio:', error);
  }
}

function main() {
  // Asegúrate de que las clases coincidan con tu index.html (__ vs -)
  const headerEl = document.querySelector('.header__container') || document.querySelector('.header-container');
  const footerEl = document.querySelector('.footer__container') || document.querySelector('.footer-container');

  if (typeof createHeader === 'function' && headerEl) createHeader(headerEl);
  if (typeof createFooter === 'function' && footerEl) createFooter(footerEl);

  renderPortfolio();
}

main();
