const getProduct = document.getElementById("getProduct");
const listaProducto = document.getElementById("listaProducto");
const updateForm = document.getElementById("updateForm");

const url = "http://localhost:3000";

getProduct.addEventListener("submit", async(event) => {
    try {
        event.preventDefault();
        let formData = new FormData(event.target);
        let data = Object.fromEntries(formData.entries());

        let idProd = data.idProd;

        let response = await fetch(`${url}/api/products/${idProd}`);
        let datos =  await response.json();
        if(response.ok) {
            let producto = datos.payload[0];
            if (producto) {
                mostrarProducto(producto);
                updateForm.innerHTML = "";
                let updateBtn = document.getElementById("updateBtn");
                updateBtn.addEventListener("click", event => {
                    event.stopPropagation();
                    crearFormulario(producto);
                })
            } else {
                mostrarError("No se encontró un producto con ID", idProd);
            }
        } else {
            mostrarError(datos.message);
        }
    } catch (error) {
        mostrarError("Ocurrió un error inesperado");
        console.error(error);
    }
    
})

async function mostrarProducto(producto) {
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
    </div>
    <input type="button" id="updateBtn" value="Actualizar producto">
    `;

    listaProducto.innerHTML = htmlProducto;
    if (producto.activo === 1) {
        document.getElementById('prod_oculto').style.display = 'none';
    }
    
}

function crearFormulario(producto) {
    let activoHTML = producto.activo ? `<input type="hidden" name="activo" id="activoProd" value="${producto.activo}">` : `<label for="activoProd">Estado</label>
    <select name="activo" id="activoProd">
            <option value="0" selected>Inactivo</option>
            <option value="1">Activar</option>
        </select>`
    let updateFormHTML = `<form id="updateProduct-form">
        <input type="hidden" name="id_producto" id="idProd" value="${producto.id_producto}">
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
    <div class="mensaje-error">
        <span class="material-symbols-outlined">error</span>
        <p>${message}</p>
    </div>
    `;
}