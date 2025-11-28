/* =================
    Importanciones
==================*/
import express from "express"; // import framework Express
const app = express();


import enviroments from "./src/api/config/enviroments.js"; // import variables de entorno

const PORT = enviroments.port;
const session_key = enviroments.session_key;

import cors from "cors";

// importamos los middleware
import { loggerUrl } from "./src/api/middlewares/middlewares.js";

// importamos las rutas de producto
import { productRoutes, salesRoutes, viewRoutes, userRoutes } from "./src/api/routes/index.js";

import { __dirname, join } from "./src/api/utils/index.js";

import session from "express-session";

import bcrypt from "bcrypt";

/* =================
    Middlewares
==================*/

app.use(cors()); // middlewares cors basico que permite todas las solicitudes

app.use(express.json());

// middleware para parsear las solicitudes POST que enviamos desde el <form> HTML
app.use(express.urlencoded({extended: true}))

app.use(loggerUrl); // utilizamos el middleware importado

// middleware para servir archivos estaticos (css, img, js)

app.use(express.static(join(__dirname, "/src/public"))) // middleware para servir archivos


// CONFIG

// config ejs como motor de plantilla 

app.set("view engine", "ejs");

app.set("views", join(__dirname, "src/views")) // nuestras vistas de dashboard se sirven desde la carpeta views

app.use(session({
    secret: session_key, // Esto firma las cookies para evitar manipulacion
    resave: false,// evita guardar la sesion si no hubo cambios
    saveUninitialized: true // para que no guarde sesiones vacias
}))

/* =================
    Rutas
==================*/

app.use("/api/products", productRoutes);

app.use("/api/sales", salesRoutes);

app.use("/api/users", userRoutes)

app.use("/", viewRoutes);

app.listen(PORT, () =>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
});