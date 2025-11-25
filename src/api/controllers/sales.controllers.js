import connection from "../database/db.js";
import salesModels from "../models/sales.models.js";

export const createSale = async (req, res) => {
    const {nombre_usuario, precio_total, productos} = req.body;

    if(!nombre_usuario || !precio_total || !productos || productos.length === 0){
        return res.status(400).json({
            message: "Faltan parametros"
        })
    }

    try{
        const [resultVenta] = await salesModels.insertVenta(nombre_usuario, precio_total);

        const idVenta = resultVenta.insertId; // conseguimos el id de la venta para luego en la tabla ventas_productos meter cada producto con el id de la venta
        
        console.log("Venta creada con ID: ", idVenta);

        // preparamos los productos para insertarlos en la base de datos ventas_productos

        const dataProductos = productos.map(prod => [idVenta, prod.id_producto, prod.cantidad]);

        const [resultVentaProducto] = await salesModels.insertVentaProducto(dataProductos);

        if(resultVentaProducto.affectedRows === 0 || resultVentaProducto.affectedRows !== productos.length){
            // en caso de que no se hayan podido insertar todos los productos vendidos hacemos un return avisandole al cliente
            return res.status(500).json({
                message: "Advertencia: La venta se generó, pero no se pudieron guardar todos los productos.",
                id_venta: idVenta,
                productos_esperados: productos.length,
                productos_guardados: resultVentaProducto.affectedRows
            });
            
        }

        res.status(201).json({
            message: "Venta registrada con exito",
            id_venta: idVenta
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error interno del servidor"
        })
    }
}