let listaProducto = document.getElementById("lista-producto");
let form = document.getElementById("getProduct");
let url = "http://localhost:3000"

form.addEventListener("submit", async (event) => {
    try {
        event.preventDefault()

        let formData = new FormData(event.target)

        let data = Object.fromEntries(formData.entries());

        let idProd = data.idProd

        let response = await fetch(`${url}/api/products/${idProd}`);

        let datos = await response.json();

        if(response.ok){
            let producto = datos.payload[0];

            mostrarProducto(producto);
        } else {
            console.log(datos);
            console.log(datos.message);
            
            mostrarError(datos.message);
            
        }
    } catch (error) {
        mostrarError("Ocurrió un error inesperado");
        console.error(error);
    }
})    



function mostrarProducto(producto) {
    let htmlProducto = `
    <div class="card-producto mostrar-producto">
        <img src="${producto.ruta_img}" alt="${producto.nombre}">
        <div>
            <h3>${producto.nombre}</h3>
            <div style="display: flex; justify-content: space-between; padding: 0 5px 0 5px;">
                <p>Tipo: <span style="text-transform: capitalize;">${producto.tipo}</span></p>
                <p>Precio: $${producto.precio}</p>
            </div>
            <p>ID: ${producto.id_producto}</p>
            <p class="producto_oculto" id="prod_oculto">INACTIVO</p>
        </div>
    </div>`;

    listaProducto.innerHTML = htmlProducto;
    if (producto.activo === 1) {
        document.getElementById('prod_oculto').style.display = 'none';
    }
    
}

function mostrarError(message){
    listaProducto.innerHTML = `
    <div class="mensaje-error">
        <span class="material-symbols-outlined">error</span>
        <p>${message}</p>
    </div>
    `;
}