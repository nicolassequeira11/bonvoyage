document.addEventListener("DOMContentLoaded", ()=>{

  /* --- MODAL LOGIN --- */

  const modalLoginContainer = document.getElementById("modalLoginContainer");

  modalLoginContainer.innerHTML   = `
  <div class="modal fade" id="modalLogin" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="mt-4 mb-3">
            <img src="logo.png" class="login__logo m-auto d-flex" alt="">
          </div>
          <div>
            <p class="text-center">Acceda a su cuenta</p>
          </div>
          <div class="mt-4">
            <form>
              <div class="form-outline mx-auto d-flex mb-3">
                <input type="text" id="userLogin" class="form-control form-control-lg mx-5" placeholder="Nombre de usuario">
              </div>
              <div class="form-outline mx-auto d-flex mb-3">
                <input type="password" id="passwordLogin" class="form-control form-control-lg mx-5" placeholder="Contraseña">
              </div>
              <div class="form-outline mx-auto d-flex mb-4">
                <button type="button" id="btnLogin" 
                  class="form-control form-control-lg login__button mx-5 text-white">Iniciar sesión</button>
              </div>
              <div class="d-flex mx-auto">
                <a href="" class="text-muted d-flex mx-auto text-decoration-none">¿Olvidaste tu contraseña?</a>
              </div>
              <div class="d-flex mx-auto mt-4">
                <p class="text-muted d-flex mx-auto text-decoration-none">¿No tienes una cuenta?
                  <a href="#" class="ms-1" data-bs-target="#modalRegistro" data-bs-toggle="modal">Regístrate</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="modalRegistro" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="mt-4 mb-3">
            <img src="logo.png" class="login__logo m-auto d-flex" alt="">
          </div>
          <div>
            <p class="text-center">Acceda a su cuenta</p>
          </div>
          <div class="mt-4">
            <form>
              <div class="form-outline mx-auto d-flex mb-3">
                <input type="text" id="userRegistro" class="form-control form-control-lg mx-5" placeholder="Nombre de usuario">
              </div>
              <div class="form-outline mx-auto d-flex mb-3">
                <input type="text" id="emailRegistro" class="form-control form-control-lg mx-5" placeholder="Correo electrónico">
              </div>
              <div class="form-outline mx-auto d-flex mb-3">
                <input type="password" id="password1Registro" class="form-control form-control-lg mx-5" placeholder="Contraseña">
              </div>
              <div class="form-outline mx-auto d-flex mb-3">
                <input type="password" id="password2Registro" class="form-control form-control-lg mx-5" placeholder="Repetir contraseña">
              </div>
              <div class="form-outline mx-auto d-flex mb-4">
                <button type="button" class="form-control form-control-lg login__button mx-5 text-white">Registrarse</button>
              </div>
              <div class="d-flex mx-auto mt-4">
                <p class="text-muted d-flex mx-auto text-decoration-none">¿Ya tienes una cuenta?
                  <a href="#" class="ms-1" data-bs-target="#modalLogin" data-bs-toggle="modal">Iniciar sesión</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;

  // Obtener una referencia al botón de inicio de sesión
  const loginButton = document.getElementById("login");

  // Obtener una referencia al modal de inicio de sesión
  const modalLogin = new bootstrap.Modal(document.getElementById("modalLogin"));

  // Agregar un evento de clic al botón de inicio de sesión para mostrar el modal
  loginButton.addEventListener("click", function () {
    modalLogin.show();
  });


  /* --- LOGIN --- */

  const login = document.getElementById("login");
  const loginMobile = document.getElementById("loginMobile");

  const btnLogin = document.getElementById("btnLogin");
  const userLogin = document.getElementById("userLogin");

  const sessionName = sessionStorage.getItem("login");

  if (sessionName) {

      // Si el nombre de usuario está almacenado en sessionStorage, muestra la sesión

      // Versión desktop
      login.innerHTML = `<i class="bi bi-person-fill"></i> ${sessionName}`;
      login.setAttribute("href", "profile.html");
      login.removeAttribute("data-bs-toggle");

      // Versión mobile
      loginMobile.innerHTML = `<i class="bi bi-person-fill"></i> ${sessionName}`;
      loginMobile.setAttribute("href", "profile.html");
      loginMobile.removeAttribute("data-bs-toggle");

    } else {

      // Versión desktop
      login.innerHTML = `<i class="bi bi-person-fill"></i> Iniciar sesión`;
      login.setAttribute("href", "#modalLogin");
      
      // Versión mobile
      loginMobile.innerHTML = `<i class="bi bi-person-fill"></i> Iniciar sesión`;
      loginMobile.setAttribute("href", "#modalLogin");

    }

  btnLogin.addEventListener("click", ()=>{
      const userName = userLogin.value;
      sessionStorage.setItem("login", userName);
      login.innerHTML = `<i class="bi bi-person-fill me-1"></i> ${sessionName}`;
      loginMobile.innerHTML = `<i class="bi bi-person-fill me-1"></i> ${sessionName}`;
      location.reload();
  });

  // Evento al enlace para redirigir cuando se hace clic

  // Versión desktop
  login.addEventListener("click", function () {
      const href = login.getAttribute("href"); // Obtiene el valor del atributo href
      window.location.href = href; // Redirige a la URL especificada en el atributo href
  });

  // Versión mobile
  loginMobile.addEventListener("click", function () {
      const href = loginMobile.getAttribute("href"); // Obtiene el valor del atributo href
      window.location.href = href; // Redirige a la URL especificada en el atributo href
  });

});
