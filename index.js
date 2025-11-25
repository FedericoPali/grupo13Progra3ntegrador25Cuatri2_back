/* =================
    Importanciones
==================*/
import express from "express"; // import framework Express
const app = express();


import enviroments from "./src/api/config/enviroments.js"; // import variables de entorno

const PORT = enviroments.port;

import cors from "cors";

// importamos los middleware
import { loggerUrl } from "./src/api/middlewares/middlewares.js";

// importamos las rutas de producto
import { productRoutes, salesRoutes } from "./src/api/routes/index.js";

/* =================
    Middlewares
==================*/

app.use(cors()); // middlewares cors basico que permite todas las solicitudes

app.use(express.json());

app.use(loggerUrl); // utilizamos el middleware importado


/* =================
    Rutas
==================*/

app.use("/api/products", productRoutes);

app.use("/api/sales", salesRoutes);

app.listen(PORT, () =>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
});