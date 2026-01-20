function createHeader(headerContainerEl) {
  const headerEl = document.createElement('header');
  headerEl.classList.add('header');

  headerEl.innerHTML = `
        <a href="./index.html">
          <img class="header__home-logo" src="./img/coding.png" alt="Logo" />
        </a>

        <img class="header__menu-logo" src="./img/menu.svg" alt="Abrir menú" />

        <nav class="header__menu-nav">
          <a class="header__menu-nav__link poppins-regular" href="./portfolio.html">Portfolio</a>
          <a class="header__menu-nav__link poppins-regular" href="./index.html#servicios">Servicios</a>
          <a class="header__menu-nav__link poppins-regular" href="./index.html#contacto">Contacto</a>
        </nav>

        <div class="header__menu-window">
          <div class="header__menu-window__close-div">
            <img class="header__menu__close-btn" src="./img/close.svg" alt="Cerrar menú" />
          </div>
          <nav class="header__menu__links-div">
            <a class="header__menu__link poppins-medium" href="./portfolio.html">Portfolio</a>
            <a class="header__menu__link poppins-medium" href="./index.html#servicios">Servicios</a>
            <a class="header__menu__link poppins-medium" href="./index.html#contacto">Contacto</a>
          </nav>
        </div>
    `;

  headerContainerEl.appendChild(headerEl);

  // --- LÓGICA DEL MENÚ ---
  const openButton = headerEl.querySelector('.header__menu-logo');
  const closeButton = headerEl.querySelector('.header__menu__close-btn');
  const menuWindow = headerEl.querySelector('.header__menu-window');
  const menuLinks = headerEl.querySelectorAll('.header__menu__link');

  // Abrir menú
  openButton.addEventListener('click', () => {
    menuWindow.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });

  // Cerrar menú (Botón X)
  closeButton.addEventListener('click', () => {
    menuWindow.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      setTimeout(() => {
        menuWindow.style.display = 'none';
        document.body.style.overflow = 'auto';
      }, 100);
    });
  });
}