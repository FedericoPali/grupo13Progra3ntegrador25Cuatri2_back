import { Router } from "express";
import { viewListado, viewConsultas, viewCrear, viewModificar, viewEliminar, viewLogin } from "../controllers/view.controllers.js";
import { requireLogin } from "../middlewares/middlewares.js";

const router = Router();

router.get ("/", requireLogin, viewListado);

router.get ("/consultas", requireLogin, viewConsultas);

router.get ("/crear", requireLogin, viewCrear);

router.get ("/modificar", requireLogin, viewModificar);

router.get ("/eliminar", requireLogin, viewEliminar);

router.get("/login",  viewLogin);

export default router;
