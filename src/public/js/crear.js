let formProducts = document.getElementById("createProduct-form");
let formUsers = document.getElementById("createUser-form");
let url = "http://localhost:3000";

formUsers.addEventListener("submit", async (event) => {
    event.preventDefault();

    let formData = new FormData(event.target);

    let data = Object.fromEntries(formData.entries());

    try{
        let response = await fetch(`${url}/api/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        
        
        if(response.ok) {
            console.log(response);

            let result = await response.json();
            console.log(result.message);
            alert(result.message)
        }

    } catch(error) { // El catch solo captura errores de red
        console.error("Error al enviar los datos: ", error);
        alert("Error al procesar la solicitud");
    }
    
})

formProducts.addEventListener("submit", async (event) => {
    event.preventDefault();

    let formData = new FormData(event.target);

    let data = Object.fromEntries(formData.entries());

    try{
        let response = await fetch(`${url}/api/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        if(response.ok){
            console.log(response);
            let result = await response.json();
            console.log(result.message);
            alert(result.message);
        } else {
            mostrarError(response.json());
        }
    } catch (error){
        console.error(error);
        mostrarError("Ocurrió un error inesperado")
    }
})

function mostrarError(message){
    listaProducto.innerHTML = `
    <div class="mensaje-error">
        <span class="material-symbols-outlined">error</span>
        <p>${message}</p>
    </div>
    `;
}