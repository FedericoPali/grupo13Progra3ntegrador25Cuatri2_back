// middleware de aplicacion
// logger -> registra por consola cada peticion 
const loggerUrl = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}]  ${req.method}  ${req.url}`);
    // Si no llamamos a next, la conexion se queda trabada aca, next permite continuar procesando la operacion
    next(); 
}

// Tendremos tambien middlewares de ruta -> se aplican a ciertas url
// middleware de ruta validador de id

const validateId = (req, res, next) => {
    const { id } = req.params;
    
    // validamos que el id no sea un numero  (la consulta podria fallar o generar un error en la BBDD)
    if(!id || isNaN(Number(id))) {
        return res.status(400).json({
            message: "El id del producto debe ser un numero valido"
        })
    };

    // convertimos el parametro id a un numero entero (porque la url viene como string)
    req.id = parseInt(id, 10);

    console.log("Id validado: ", req.id);

    next();
}

// protege las vistas del dashboard en caso de que no se haya hecho acceso a traves del login
const requireLogin = (req,res,next) => {
    if(!req.session.user){ // verificamos si existe la sesion de usuario, caso contrario redirige al login
        return res.redirect("/login");
    }
    next(); // sin next, la peticion nunca llega a la respuesta (res)
}

export {
    loggerUrl,
    validateId,
    requireLogin
}