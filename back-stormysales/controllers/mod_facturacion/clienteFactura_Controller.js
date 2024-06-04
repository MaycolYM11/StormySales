/*
    * Controlador del Modúlo de Facturación
*/
const db = require('../../models/modelStormySales').promise();

// Consultar todos los usuarios con el estado Activo.
const GET_CLIENTES_ACTIVOS = async(req, res) => {
    try {
        const consultaQry = `
        SELECT 
            Identificacion_Clientes AS "ID_cliente",
            nombre AS "Nombre",
            Apellido AS "Apellido",
            email AS "Email",
            direccion AS "Direccion",
            telefono AS "Telefono",
            E.Nombre_estado  AS "Estado"
        FROM Clientes C
        INNER JOIN Estado E
            ON E.ID_estado = C.Estado_Clientes 
        WHERE Estado_Clientes = 2;
        `;
        const [result] = await db.query(consultaQry);
        res.json(result);
    } catch (error) {
        console.error("No se pudo consultar los clientes activos.", error);
        res.json({ error: "No se pudo consultar los clientes activos." });
    }
}

// Consultar cliente activo por ID, nombre o apellidos
const GET_CLIENTE_ACTIVO = async (req, res) => {
    const { id, nombre, apellido } = req.query;

    try {
        let consultaQry = `
        SELECT 
            Identificacion_Clientes AS "ID",
            nombre AS "Nombre",
            Apellido AS "Apellido",
            email AS "Email",
            direccion AS "Direccion",
            telefono AS "Telefono"
        FROM Clientes
        WHERE Estado_Clientes = 2    
        `;

        const params = [];
        if (id) {
            consultaQry += ' AND Identificacion_Clientes = ?';
            params.push(id);
        }
        if (nombre) {
            consultaQry += ' AND nombre LIKE ?';
            params.push(`%${nombre}%`);
        }
        if (apellido) {
            consultaQry += ' AND Apellido LIKE ?';
            params.push(`%${apellido}%`);
        }

        const [result] = await db.query(consultaQry, params);
        res.json(result);
    } catch (error) {
        console.error("No se pudo consultar el cliente activo.", error);
        res.json({ error: "No se pudo hacer la consulta del cliente activo." });
    }
}

module.exports = {
    GET_CLIENTES_ACTIVOS,
    GET_CLIENTE_ACTIVO
}
