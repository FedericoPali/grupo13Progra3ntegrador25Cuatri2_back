import ProductModels from "../models/products.models.js";

export const viewListado = async(req,res) =>{
    try{
        const [rows] = await ProductModels.selectAllProducts();

        // res.render() es un método que se usa para mostrar una plantilla de vista y enviar el HTML al navegador.
        res.render("index", {
            title: "Inicio",
            about: "Listado de productos",
            productos: rows
        });
    } catch(error) {
        console.error('Error al mostrar productos', error)
    }
} 

// Consultar producto
export const viewConsultas = async(req,res) =>{
    res.render("consultas",{
        title:"Consultar",
        about: "Consultar productos según id",
    });
};

// Crear producto
export const viewCrear = (req,res) =>{
    res.render("crear",{
        title:"Crear",
        about: "Crear nuevo producto"
    });
};

// Modificar producto
export const viewModificar = (req,res) =>{
    res.render("modificar",{
        title:"Modificar",
        about: "Modificar un producto"
    });
};

// Eliminar producto
export const viewEliminar = (req,res) =>{
    res.render("eliminar",{
        title:"Eliminar",
        about: "Dar de baja un producto"
    });
};

// Login
export const viewLogin =  async (req, res) => {
    res.render("login", {
        title: "Login",
    })
}