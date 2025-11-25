
import {Router } from "express";

import { createSale } from "../controllers/sales.controllers.js";
import connection from "../database/db.js";

const router = Router();


router.get("/", async (req, res) => {
    const sql = "SELECT * FROM ventas"
    let [rows] = await connection.query(sql)

    res.status(200).json({
        payload: rows,
        message: rows.length === 0 ? "No se encontraron ventas": "Ventas encontradas"
    })
})

router.post("/", createSale)

export default router;