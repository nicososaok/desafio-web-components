function main() {
  const headerEl = document.querySelector('.header-container');
  const footerEl = document.querySelector('.footer-container');
  const formEl = document.querySelector('.form-container-inyectado');

  createHeader(headerEl);
  createFooter(footerEl);
  createContactForm(formEl);
}

main();
