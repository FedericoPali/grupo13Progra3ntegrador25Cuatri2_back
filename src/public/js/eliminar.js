const getProduct = document.getElementById("getProduct");
const listaProducto = document.getElementById("listaProducto");

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
                let deleteBtn = document.getElementById("deleteBtn");
                deleteBtn.addEventListener("click", event => {
                    event.stopPropagation();
                    let confirmacion = confirm("¿Quiere dar de baja el producto?");
                    if (!confirmacion) {
                        alert("Se canceló la eliminación del producto.");
                    } else {
                        eliminarProducto(producto.id_producto);
                    }
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
        <input type="button" id="deleteBtn" value="Eliminar producto">
    </li>
    `;

    listaProducto.innerHTML = htmlProducto;
    
}

async function eliminarProducto(id) {
    try {
        let response = await fetch(`${url}/api/products/${idProd}`, {
            method: "DELETE"
        });
        let result = await response.json();
        if (response.ok) {
            alert(result.message);
            listaProducto.innerHTML = "";
        } else {
            console.error("Error: ", result.message);
            alert("No se puedo eliminar el producto.");
        }
    } catch (error) {
        console.error("Ocurrió un error con el metodo DELETE", error);
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