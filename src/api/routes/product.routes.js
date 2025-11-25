// importamos el middleware Router
import { Router } from "express";
const router = Router();

import { validateId } from "../middlewares/middlewares.js";

import { createProduct, getAllProducts, getProductById, modifyProduct, removeProduct } from "../controllers/products.controllers.js";

/* CRUD (Create Read Update Delete)

    - CREATE -> POST
    - READ -> GET
    - UPDATE -> PUT
    - DELETE -> DELETE
*/


// get products => obtener todos los productos
router.get("/", getAllProducts);


// get product by ud => consultar producto por su id

router.get("/:id", validateId, getProductById);

// create -> post
// crea un producto
router.post("/", createProduct);

// update -> put
// actualiza un producto

router.put("/", modifyProduct);

// delete -> delete
// elimina un producto
router.delete("/:id", validateId , removeProduct);

// exportamos todas las rutas

export default router;