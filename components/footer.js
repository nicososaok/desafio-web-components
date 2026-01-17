function createFooter(footerSectionEl) {
  const footerEl = document.createElement('footer');
  footerEl.classList.add('footer');
  footerEl.innerHTML = `<a href="./index.html">
          <img class="header__home-logo" src="./img/coding.png" />
        </a>
        <nav class="footer__links-nav">
          <div class="footer__link-div">
            <img class="footer__link-icon" src="./img/home.svg" />
            <a class="footer__link poppins-regular" href="#home">Home</a>
          </div>
          <div class="footer__link-div">
            <img class="footer__link-icon" src="./img/user.svg" />
            <a class="footer__link poppins-regular" href="#servicios">
              Servicios</a
            >
          </div>
          <div class="footer__link-div">
            <img class="footer__link-icon" src="./img/phone.svg" />
            <a class="footer__link poppins-regular" href="#contacto"
              >Contacto</a
            >
          </div>
        </nav>
        <nav class="footer__social-nav">
          <a
            class="footer__social-link"
            href="https://www.linkedin.com/"
            target="_blank"><img src="./img/linkedin.png"
          /></a>
          <a class="footer__social-link" href="https://github.com/nicososaok/"
            target="_blank"><img src="./img/github.png"
          /></a>
          <a class="footer__social-link" href="https://x.com/nicososadev"
            target="_blank"><img src="./img/twitter.png"
          /></a>
        </nav>
        <a class="footer__apx-link poppins-regular" href="https://apx.school"
          target="_blank">©2025 - https://apx.school</a
        >
  `;
  footerSectionEl.appendChild(footerEl);
}
