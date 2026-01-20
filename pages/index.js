// --- CONFIGURACIÓN ---
const SPACE_ID = 'v2qh0gjhku1y';
const ACCESS_TOKEN = '1eiRNcUBAvteDy8lH8znvWesCyMeOgettlCqoUThlRQ';
const ENVIRONMENT = 'master';
const BASE_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries?access_token=${ACCESS_TOKEN}&include=10`;

// --- HELPER: Obtener URL de imagen ---
function getAssetUrl(assets, assetId) {
  if (!assets || !assetId) return '';
  const asset = assets.find((item) => item.sys.id === assetId);
  if (asset && asset.fields.file) {
    let url = asset.fields.file.url;
    return url.startsWith('//') ? `https:${url}` : url;
  }
  return '';
}

// --- 1. LOGICA DE TEXTOS (HOME Y PRESENTACIÓN) ---
async function loadContentfulData() {
  try {
    const resPres = await fetch(`${BASE_URL}&content_type=presentacinContent`);
    const dataPres = await resPres.json();

    if (dataPres && dataPres.items && dataPres.items.length > 0) {
      const fields = dataPres.items[0].fields;
      const presTitle = document.querySelector('.presentacion__title');
      const presDesc = document.querySelector('.presentacion__description');

      if (presTitle) presTitle.textContent = fields.presentacionTitle;
      if (presDesc) presDesc.textContent = fields.presentacionDescription;
    }
  } catch (error) {
    console.error('Error cargando textos:', error);
  }
}

// --- 2. LOGICA DE CARDS (SERVICIOS Y TRABAJOS) ---
async function loadServices() {
  const isPortfolioPage = window.location.pathname.includes('portfolio.html');
  const contentType = isPortfolioPage ? 'trabajos' : 'serviciosContent';

  const url = `${BASE_URL}&content_type=${contentType}&order=sys.createdAt`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const assets = data.includes?.Asset || [];
    const container = document.querySelector('.cards__container');
    if (!container) return;

    container.innerHTML = '';

    data.items.forEach((item) => {
      const fields = item.fields;
      const card = document.createElement('div');

      if (isPortfolioPage) {
        // --- VISTA PORTFOLIO (TRABAJOS) SIN BOTÓN ---
        const title = fields.trabajosTitle;
        const desc = fields.trabajosDescription;
        const imgField = fields.trabajosImage;
        const imgUrl = imgField ? getAssetUrl(assets, imgField.sys.id) : '';

        card.className = 'trabajos-card';
        card.innerHTML = `
          ${imgUrl ? `<img src="${imgUrl}" class="trabajos-card__img" alt="Trabajo">` : ''}
          <h3 class="trabajos-card__title poppins-bold">${title || 'Proyecto'}</h3>
          <p class="trabajos-card__desc poppins-regular">${desc || ''}</p>
        `;
      } else {
        // --- VISTA HOME (SERVICIOS) ---
        const title = fields.servicioTitle;
        const desc = fields.servicioDescription;
        const imgField = fields.servicioImage;

        let imagesHtml = '';
        if (imgField) {
          if (Array.isArray(imgField)) {
            imgField.forEach((imgRef, index) => {
              const url = getAssetUrl(assets, imgRef.sys.id);
              if (url) imagesHtml += `<img src="${url}" class="service-card__img img-${index}">`;
            });
          } else {
            const url = getAssetUrl(assets, imgField.sys.id);
            if (url) imagesHtml = `<img src="${url}" class="service-card__img img-0">`;
          }
        }

        card.className = 'service-card';
        card.innerHTML = `
          <div class="service-card__imgs-container">
            ${imagesHtml}
          </div>
          <h3 class="service-card__title poppins-bold">${title || 'Servicio'}</h3>
          <p class="service-card__desc poppins-regular">${desc || ''}</p>
        `;
      }
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error cargando cards:', error);
  }
}

// --- 3. FUNCIÓN PRINCIPAL ---
async function main() {
  const headerContainer = document.querySelector('.header__container');
  const footerContainer = document.querySelector('.footer__container');
  const formContainer = document.querySelector('.form__container');

  if (typeof createHeader === 'function' && headerContainer) createHeader(headerContainer);
  if (typeof createFooter === 'function' && footerContainer) createFooter(footerContainer);
  if (typeof createContactForm === 'function' && formContainer) createContactForm(formContainer);

  await loadContentfulData();
  await loadServices();
}

window.addEventListener('DOMContentLoaded', main);