// Inputs
const profileName = document.getElementById("profileName");
const profileLastname = document.getElementById("profileLastname");
const profileUsername = document.getElementById("profileUsername");
const profileEmail = document.getElementById("profileEmail");
const profileTel = document.getElementById("profileTel");
const profileCountry = document.getElementById("profileCountry");

// Botones
const btnRemoveSession = document.getElementById("btnRemoveSession");
const btnSaveProfile = document.getElementById("btnSaveProfile");

// SessionStorage
const loginName = sessionStorage.getItem("profileName");
const loginLastname = sessionStorage.getItem("profileLastname");
const loginUsername = sessionStorage.getItem("login");
const loginEmail = sessionStorage.getItem("profileEmail");
const loginTel = sessionStorage.getItem("profileTel");
const loginCountry = sessionStorage.getItem("profileCountry");

document.addEventListener("DOMContentLoaded", () => {
  profileName.value = loginName;
  profileLastname.value = loginLastname;
  profileUsername.value = loginUsername;
  profileEmail.value = loginEmail;
  profileTel.value = loginTel;
  profileCountry.value = loginCountry;
});

// Eventos
btnRemoveSession.addEventListener("click", ()=>{
  sessionStorage.removeItem("login");
  sessionStorage.removeItem("profileName");
  sessionStorage.removeItem("profileLastname");
  sessionStorage.removeItem("profileEmail");
  sessionStorage.removeItem("profileTel");
  sessionStorage.removeItem("profileCountry");
  
  window.location.href = "index.html";
});

btnSaveProfile.addEventListener("click", ()=>{
  const newProfileName = profileName.value;
  const newProfileLastname = profileLastname.value;
  const newprofileEmail = profileEmail.value;
  const newProfileTel = profileTel.value;
  const newProfileCountry = profileCountry.value;

  sessionStorage.setItem("profileName", newProfileName);  
  sessionStorage.setItem("profileLastname", newProfileLastname);  
  sessionStorage.setItem("profileEmail", newprofileEmail);  
  sessionStorage.setItem("profileTel", newProfileTel);  
  sessionStorage.setItem("profileCountry", newProfileCountry);

  location.reload();
});


