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
    // Home
    // Dentro de loadContentfulData
    const resPres = await fetch(`${BASE_URL}&content_type=presentacionContent`);
    const dataPres = await resPres.json();

    // Verificamos que existan items y que el array no esté vacío
    if (dataPres && dataPres.items && dataPres.items.length > 0) {
      const fields = dataPres.items[0].fields;
      const assets = dataPres.includes ? dataPres.includes.Asset : [];

      const presTitle = document.querySelector('.presentacion__title');
      const presDesc = document.querySelector('.presentacion__description');

      if (presTitle) presTitle.textContent = fields.presentacionTitle;
      if (presDesc) presDesc.textContent = fields.presentacionDescription;
    }
  } catch (error) {
    console.error('Error cargando textos:', error);
  }
}

// --- 2. LOGICA DE SERVICIOS (MANEJA MÚLTIPLES IMÁGENES) ---
async function loadServices() {
  const url = `${BASE_URL}&content_type=serviciosContent&order=sys.createdAt`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const assets = data.includes?.Asset || [];
    const container = document.querySelector('.cards__container');
    if (!container) return;

    container.innerHTML = '';

    data.items.forEach((item) => {
      const fields = item.fields;
      const imgField = fields.servicioImage;

      // --- LÓGICA PARA MOSTRAR TODAS LAS IMÁGENES ---
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

      const card = document.createElement('div');
      card.className = 'service-card';
      card.innerHTML = `
        <div class="service-card__imgs-container">
          ${imagesHtml}
        </div>
        <h3 class="service-card__title poppins-bold">${fields.servicioTitle}</h3>
        <p class="service-card__desc poppins-regular">${fields.servicioDescription}</p>
      `;
      container.appendChild(card);
    });
    console.log('Servicios cargados con múltiples imágenes');
  } catch (error) {
    console.error('Error cargando servicios:', error);
  }
}

// --- 3. FUNCIÓN PRINCIPAL ---
async function main() {
  console.log('Iniciando carga de la web...');

  const headerContainer = document.querySelector('.header__container');
  const footerContainer = document.querySelector('.footer__container');
  const formContainer = document.querySelector('.form__container');

  // Inyectar Componentes
  if (typeof createHeader === 'function' && headerContainer) createHeader(headerContainer);
  if (typeof createFooter === 'function' && footerContainer) createFooter(footerContainer);
  if (typeof createContactForm === 'function' && formContainer) createContactForm(formContainer);

  // Cargar Contentful
  await loadContentfulData();
  await loadServices();

  console.log('Web lista.');
}

window.addEventListener('DOMContentLoaded', main);