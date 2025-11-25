let listaProducto = document.getElementById("lista-producto");
let form = document.getElementById("getProduct");
let url = "http://localhost:3000"

form.addEventListener("submit", async (event) => {
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
})

function mostrarProducto(producto) {
    let htmlProducto = `
    <li class="">
        <img class="producto-img" src="${producto.ruta_img}" alt="${producto.nombre}">
        <p>Id: ${producto.id_producto} / Nombre: ${producto.nombre} / Precio: ${producto.precio} </p>
    </li>
    `;

    listaProducto.innerHTML = htmlProducto;
    
}

function mostrarError(message){
    listaProducto.innerHTML = `
    <li class="mensaje-error">
        <p>
            Error: ${message}
        </p>
    </li>
    `;
}