import connection from "../database/db.js";

const selectAllProducts = () => {
    const sql = `SELECT * FROM products`;
    return connection.query(sql)
}

const selectProductById = (id) => {
    let sql = `SELECT * FROM products WHERE id_producto = ?`;
    return connection.query(sql, [id])
}

const insertProduct = (nombre, precio, tipo, ruta_img) => {
    // los placeholders ?, sirven para evitar inyecciones 
    let sql = "INSERT INTO products (nombre, precio, tipo, ruta_img) VALUES (?, ?, ?, ?)";

    return connection.query(sql, [nombre, precio, tipo, ruta_img])
}

const updateProduct = (nombre, ruta_img, precio, tipo, id_producto) => {
    
    let sql = `
        UPDATE products
        SET nombre = ?, ruta_img = ?, precio = ?, tipo = ?
        WHERE id_producto = ?
    `;

    return connection.query(sql, [nombre, ruta_img, precio, tipo, id_producto])
}

const deleteProduct = (id) => {
    let sql = "UPDATE products set active = 0 WHERE id_producto = ?";

    return connection.query(sql, [id])
}

export default {
    selectAllProducts,
    selectProductById,
    insertProduct,
    updateProduct,
    deleteProduct
}