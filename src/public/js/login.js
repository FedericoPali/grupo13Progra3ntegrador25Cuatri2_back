let email = document.getElementById("emailUser");
let password = document.getElementById("passwordUser");

let acceso_rapido = document.getElementById("acceso-rapido")

acceso_rapido.addEventListener("click", () => {

    email.value = "test@test.com"
    password.value = "test"
})