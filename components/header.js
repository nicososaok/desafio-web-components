function createHeader(headerContainerEl) {
  const headerEl = document.createElement('header');
  headerEl.classList.add('header');
  headerEl.innerHTML = `
        <a href="./index.html">
          <img class="header__home-logo" src="./img/coding.png" />
        </a>

        <img class="header__menu-logo" src="./img/menu.svg" />

        <nav class="header__menu-nav">
          <a class="header__menu-nav__link poppins-regular" href="#portfolio">Portfolio</a>
          <a class="header__menu-nav__link poppins-regular" href="#servicios">Servicios</a>
          <a class="header__menu-nav__link poppins-regular" href="#contacto">Contacto</a>
        </nav>

        <div class="header__menu-window">
          <div class="header__menu-window__close-div">
            <img class="header__menu__close-btn" src="./img/close.svg" />
          </div>
          <nav class="header__menu__links-div">
            <a class="header__menu__link poppins-medium" href="#portfolio">Portfolio</a>
            <a class="header__menu__link poppins-medium" href="#servicios">Servicios</a>
            <a class="header__menu__link poppins-medium" href="#contacto">Contacto</a>
          </nav>
        </div>
  `;

  // Agregamos el header al DOM
  headerContainerEl.appendChild(headerEl);

  // --- LÓGICA DEL MENÚ (Todo esto va DENTRO de la función) ---

  // 1. Seleccionamos los elementos que acabamos de crear
  const openButton = headerEl.querySelector('.header__menu-logo');
  const closeButton = headerEl.querySelector('.header__menu__close-btn');
  const menuWindow = headerEl.querySelector('.header__menu-window');
  const menuLinks = headerEl.querySelectorAll('.header__menu__link');

  // 2. Evento para ABRIR el menú (Click en hamburguesa)
  openButton.addEventListener('click', () => {
    menuWindow.style.display = 'flex'; // Mostramos la ventana negra
  });

  // 3. Evento para CERRAR el menú (Click en la X)
  closeButton.addEventListener('click', () => {
    menuWindow.style.display = 'none'; // Ocultamos
  });

  // 4. Evento para CERRAR al tocar un link (UX: ir a la sección y cerrar menú)
  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menuWindow.style.display = 'none';
    });
  });
}
