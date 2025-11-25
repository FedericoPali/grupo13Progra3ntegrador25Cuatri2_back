import connection from "../database/db.js"

const insertVenta = (nombre_usuario, precio_total) => {
    const sqlVenta = "INSERT INTO ventas (nombre_usuario, fecha, precio_total) VALUES (?,NOW(),?)"
    return connection.query(sqlVenta, [nombre_usuario, precio_total]);
}

const insertVentaProducto = (dataProductos) => {
    const sqlVentaProducto = "INSERT INTO ventas_productos (id_ventas, id_productos, cantidad) VALUES ?" // se pone solo un ? pq queremos insertar muchas filas a la vez
    return connection.query(sqlVentaProducto, [dataProductos]);
}

export default {
    insertVenta,
    insertVentaProducto
}