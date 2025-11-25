const getProduct = document.getElementById("getProduct");
const listaProducto = document.getElementById("listaProducto");
const updateForm = document.getElementById("updateForm");

const url = "http://localhost:3000";

getProduct.addEventListener("submit", async(event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    let data = Object.fromEntries(formData.entries());

    let idProd = data.idProd;

    try {
        let response = await fetch(`${url}/api/products/${idProd}`);
        let datos = response.json();
        if(response.ok) {
            let producto = datos.payload[0];
            if (producto) {
                mostrarProducto(producto);
                let updateBtn = document.getElementById("updateBtn");
                updateBtn.addEventListener("click", event => {
                    event.stopPropagation();
                    crearFormulario(producto);
                })
            } else {
                mostrarError("No se encontró un producto con ese ID ", idProd);
            }
        }
    } catch (error) {
        mostrarError(datos.message);
    }
})

async function mostrarProducto(producto) {
    let htmlProducto = `
    <li class="">
        <img class="producto-img" src="${producto.ruta_img}" alt="${producto.nombre}"
        <p>Id: ${producto.id_producto} / Nombre: ${producto.nombre} / Precio: ${producto.precio} </p>
    </li>
    <li class="botonera">
        <input type="button" id="updateBtn" value="Actualizar producto">
    </li>
    `;

    listaProducto.innerHTML = htmlProducto;
    
}

function crearFormulario(producto) {
    let activoHTML = producto.activo ? `<input type="hidden" name="activo" id="activoProd" value="${producto.activo}">` : `<label for="activoProd">Estado</label>
    <select name="activo" id="activoProd">
            <option value="0" selected>Inactivo</option>
            <option value="1">Activar</option>
        </select>`
    let updateFormHTML = `<form id="updateProduct-form">
        <input type="hidden" name="id_product" id="idProd" value="${producto.id_producto}">
        <label for="nombreProd">Nombre</label>
        <input type="text" name="nombre" id="nombreProd" value="${producto.nombre}">

        <label for="imagenProd">Imagen</label>
        <input type="text" name="ruta_img" id="imagenProd" value="${producto.ruta_img}">

        <label for="precioProd">Precio</label>
        <input type="number" name="precio" id="precioProd" value="${producto.precio}">

        <label for="categoriaProd">Categoria</label>
        <select name="tipo" id="categoriaProd">
            <option value="grafica">Placa de video</option>
            <option value="procesador">Procesador</option>
        </select>

        ${activoHTML}

        <input type="submit" value="Actualizar Producto">
    </form>`

    updateForm.innerHTML = updateFormHTML;
    document.getElementById("categoriaProd").value = producto.tipo;

    let updateProduct_form = document.getElementById("updateProduct-form");
    updateProduct_form.addEventListener("submit", event => {
        actualizarProducto(event);
    })

}

async function actualizarProducto(event) {
    event.preventDefault();
    event.stopPropagation();

    console.log("Preparando datos del formulario para el PUT");

    let formData = new FormData(event.target); // Le pasamos el formulario dinamico de antes al objeto FormData para obtener los datos del nuevo formulario de actualizacion

    let data = Object.fromEntries(formData.entries());
    console.log(data); // Ya tenemos como objetos JS los datos de nuestro formulario anterior con las nuevas modificaciones

    try {
        let response = await fetch(`${url}/api/products`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        let result = await response.json();
        console.log(result);

        if(response.ok) {
            console.log(result.message);
            alert(result.message);
        } else {
            // TO DO
            console.log(result.message);
            alert(result.message);
        }

    } catch (error) {
        console.error("Error en la solicitud PUT:", error);
        alert("Ocurrió un error al conectar con el servidor para actualizar.");
    }

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