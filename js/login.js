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


