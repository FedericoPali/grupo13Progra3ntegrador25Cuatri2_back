import { Router } from "express"
import connection from "../database/db.js";

const router = Router();

router.get("/", async (req,res) => {
    try{
        const sql = "SELECT * FROM products"
        const [rows] = await connection.query(sql);

        res.render("index", {
            title: "Inicio",
            about: "Listado de productos",
            productos: rows
        });
    } catch(error){
        console.error(error);
        
        res.status(500).json({
            error: "Error interno del servidor"
        })
    }
})

router.get("/consultar", async(req, res) => {
    res.render("consultar", {
        title: "Consultar",
        about: "Consultar Producto"
    })
});

router.get("/modificar", async(req, res) => {
    res.render("modificar", {
        title: "Modificar",
        about: "Modificar Producto"
    })
});

router.get("/crear", async(req, res) => {
    res.render("crear", {
        title: "Crear",
        about: "Crear Producto"
    })
});

router.get("/eliminar", async(req, res) => {
    res.render("eliminar", {
        title: "Eliminar",
        about: "Eliminar Producto"
    })
})

export default router;
