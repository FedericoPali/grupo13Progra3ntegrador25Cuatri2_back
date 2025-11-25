import ProductModels from "../models/products.models.js";

export const viewListado = async(req,res) =>{
    try{
        const productos = await ProductModels.selectAllProducts();

        //res.render() es un método de Express que se usa para renderizar (mostrar) una plantilla de vista y enviar el HTML resultante al navegador.
        res.render("index", {
            title: "Listado de productos",
            products: productos[0]
        });
    } catch(error) {

    }
} 

export const viewConsultas = async(req,res) =>{
    res.render("consultar",{
        title:"Consultar productos segun id"
    });
};

//RUTA DE VISTA CREAR PRODUCTO
export const viewCrear = (req,res) =>{
    res.render("crear",{
        title:"Crear productos"
    });
};

//RUTA DE VISTA MODIFICAR PRODUCTO
export const viewModificar = (req,res) =>{
    res.render("modificar",{
        title:"Modificar productos"
    });
};

//RUTA DE VISTA ELIMINAR PRODUCTO
export const viewEliminar = (req,res) =>{
    res.render("eliminar",{
        title:"Eliminar productos"
    });
};