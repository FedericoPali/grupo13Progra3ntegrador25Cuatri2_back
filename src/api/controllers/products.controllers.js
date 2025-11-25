
import connection from "../database/db.js" // import coneccion base de datos

export const getAllProducts = async (req, res) =>{
    try {
        const sql = `SELECT * FROM products`;
        const [rows] = await connection.query(sql);
        console.log(rows)        
 
        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron productos": "Productos encontrados"
        })

    } catch(error) {
        console.error(error);

        res.status(500).json({
            message: "Error interno al obtener los productos"
        })
    }
}

export const getProductById = async (req, res) => {
    try {
        let { id } = req.params // permite obtener el valor numerico dsp de products

        let sql = `SELECT * FROM products WHERE id_producto = ?`;
        const [rows] = await connection.query(sql, [id]); // el id reemplaza el "?"
        
        // optimizacion 2: comprobar que exista un producto con el id que se consulte
        if(rows.length === 0) {
            console.log("Error, no existe producto con ese id");
            
            return res.status(400).json({
                message: `No se encontro un producto con id ${id}`
            })
        }

        res.status(200).json({
            payload: rows
        })
    } catch (error) {
        console.error("Error obteniendo el producto por id", error.message);
        
        res.status(500).json({
            error: "Error interno al obtener un producto con id"
        })
    }
}

export const createProduct = async (req, res) => {
    try{
        const { nombre, precio, tipo, ruta_img} = req.body
        // imprimimos lo que enviamos desde el form que previamente se parseo con el middleware express.json()
        console.log(req.body);

        if(!nombre || !precio || !tipo || !ruta_img) {
            return res.status(400).json({
                message: "Datos invalidos, asegurese de enviar todos los campos que requiere el formulario."
            });
            // utilizamos el return para que el endpont termine y el usuario reciba esta respuesta
        }

        // los placeholders ?, sirven para evitar inyecciones 
        let sql = "INSERT INTO products (nombre, precio, tipo, ruta_img) VALUES (?, ?, ?, ?)";

        // se le envian los valores a las BBDD
        let [rows] = await connection.query(sql, [nombre, precio, tipo, ruta_img]);
        
        // devolvemos la respuesta 201 (created)
        res.status(201).json({
            message: "Producto creado con exito",
            productId: rows.insertId
        });

    } catch (error) {
        console.error("Error interno del servidor");

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        });
        
    }
}

export const modifyProduct = async (req, res) => {
    try {
        let { id_producto, nombre, precio, tipo, ruta_img, activo } = req.body;
        
        // Optimizacion 1: Validacion basica de datos
        if(!id_producto || !nombre || !precio || !tipo || !activo) {
            return res.status(400).json({
                message: "Faltan campos requeridos"
            });
        }

        let sql = `
            UPDATE products
            SET nombre = ?, ruta_img = ?, precio = ?, tipo = ?
            WHERE id_producto = ?
        `;

        let [result] = await connection.query(sql, [nombre, ruta_img, precio, tipo, id_producto]);
        console.log(result);

        // Optimizacion 2: Testeamos que se actualizara este producto
        if(result.affectedRows === 0) {
            return res.status(400).json({
                message: "No se actualizo el producto"
            });
        }

        res.status(200).json({
            message: "Producto actualizado correctamente"
        });
        

    } catch (error) {
        console.error("Error al actualizar el producto: ", error);

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        })
    }
}

export const removeProduct = async (req, res) => {
    try {
        let { id } = req.params;

        // Opcion 1: Borrado normal
        let sql = "DELETE FROM products WHERE id_producto = ?";

        // Opcion 2: Baja logica
        // let sql2 = "UPDATE products set active = 0 WHERE id_producto = ?";

        let [result] = await connection.query(sql, [id]);
        console.log(result);
        // affectedRows: 1 -> Nos indica que hubo una fila que fue afectada

        // optimizacion 1: hacemos la validacion del id a traves del middleware

        // optimizacion 2: comprobamos si realmente eliminamos un producto
        if(result.affectedRows === 0) { // significa que no afectamos ninguna fila
            return res.status(404).json({
                message: `No se encontro un producto con id ${id}`
            });
        };

        return res.status(200).json({
            message: `Producto con id ${id} eliminado correctamente`
        });


    } catch (error) {
        console.log(`Error al eliminar un producto con id ${id}: `, error);

        res.status(500).json({
            message: `Error al eliminar un producto con id ${id}`,
            error: error.message
        })
    }
}