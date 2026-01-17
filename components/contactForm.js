function createContactForm(formContainerEl) {
  const contactFormEl = document.createElement('form');
  contactFormEl.classList.add('form__escribime');

  contactFormEl.innerHTML = `
    <div class="form__row">
      <div class="form__group">
        <label class="form__label poppins-bold">Nombre</label>
        <input id="form__nombre" type="text" class="form__input poppins-medium" placeholder="Tu nombre" required />
      </div>
      <div class="form__group">
        <label class="form__label poppins-bold">Email</label>
        <input id="form__email" type="email" class="form__input poppins-medium" placeholder="Tu@mail.com" required />
      </div>
    </div>
    <div class="form__group">
      <label class="form__label poppins-bold">Mensaje</label>
      <textarea id="form__mensaje" class="form__textarea poppins-medium" required></textarea>
    </div> <div class="form__button-container">
      <button id="form__enviar" class="form__button" >
        <span>Enviar</span>
        <img src="./img/send.png" class="form__button-icon" alt="enviar"/>
      </button>
    </div>
  `;

  formContainerEl.appendChild(contactFormEl);

  const enviarEl = document.getElementById('form__enviar');
  const nombreEl = document.getElementById('form__nombre');
  const emailEl = document.getElementById('form__email');
  const mensajeEl = document.getElementById('form__mensaje');

  const updateButtonState = () => {
    enviarEl.disabled = !contactFormEl.checkValidity();
  };

  nombreEl.addEventListener('input', updateButtonState);
  emailEl.addEventListener('input', updateButtonState);
  mensajeEl.addEventListener('input', updateButtonState);

  enviarEl.addEventListener('click', (event) => {
    event.preventDefault();
    const from = nombreEl.value;
    const emailUser = emailEl.value;
    const message = mensajeEl.value;

    fetch('https://apx.school/api/utils/email-to-student', {
      method: 'POST',
      body: JSON.stringify({
        to: 'nicososa62@gmail.com',
        message: `Mensaje de ${from} (${emailUser}): ${message}`
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(() => {
        alert('El correo se envió correctamente');
        contactFormEl.reset();
        updateButtonState();
      })
      .catch((error) => {
        console.error('Error:', error);
        let result = confirm('Ocurrió un error inesperado, ¿desea volver a intentarlo?');
        if (!result) {
          contactFormEl.reset();
          updateButtonState();
        }
      });
  });

}
