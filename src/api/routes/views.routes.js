import { Router } from "express";
import connection from "../database/db.js";
import { viewListado, viewConsultas, viewCrear, viewModificar, viewEliminar } from "../controllers/view.controllers.js";

const router = Router();

router.get ("/", viewListado);

router.get ("/consultas", viewConsultas);

router.get ("/crear", viewCrear);

router.get ("/modificar", viewModificar);

router.get ("/eliminar", viewEliminar);

export default router;
