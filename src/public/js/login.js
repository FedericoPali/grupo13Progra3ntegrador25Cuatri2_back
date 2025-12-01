let email = document.getElementById("emailUser");
let password = document.getElementById("passwordUser");

let acceso_rapido = document.getElementById("acceso-rapido");

document.body.classList.add('login-page');

acceso_rapido.addEventListener("click", () => {
    email.value = "test@test.com"
    password.value = "test"
})