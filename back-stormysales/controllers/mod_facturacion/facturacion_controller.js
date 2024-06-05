/*
    * Controlador del Modúlo de Facturación
*/
const db = require('../../models/modelStormySales').promise();

// Consultar último ID de factura
const GET_LAST_FACTURA_ID = async (req, res) => {
    try {
        const consultaQry = `
            SELECT ID_factura 
            FROM Factura
            ORDER BY ID_factura DESC
            LIMIT 1;
        `;
        const [result] = await db.query(consultaQry);
        if (result.length > 0) {
            res.json({ ultimoID: result[0].ID_factura });
        } else {
            res.json({ message: "No hay facturas registradas." });
        }
    } catch (error) {
        console.error("No se pudo consultar el ID de la última factura.", error);
        res.json({ error: "No se pudo consultar el ID de la última factura." });
    }
};

// Consultar Factura
const GET_ALL_FACTURAS = async(req, res) => {
    try {
        const consultaQry = `
            SELECT 
                ID_factura AS "ID_factura",
                ID_cliente_fk AS "ID_cliente",
                ID_vendedor_fk AS "ID_vendedor",
                fecha_venta_hora AS "fecha",
                subtotal,
                IVA,
                total,
                metodo_pago,
                referencia_metodo_pago,
                E.Nombre_estado AS "estado_factura"
            FROM Factura F
            INNER JOIN Estado E ON E.ID_estado = F.estado_fk;  
        `;

        const [result] = await db.query(consultaQry);
        res.json(result);
    } catch (error) {
        console.error("No se pudo consultar las facturas.", error);
        res.json({ error: "No se pudo hacer la consulta de las facturas." });
    }
};


// Consultar facturas y su detalle
const GET_ALL_FACTURAS_DETALLE = async(req, res) => {
    try {
        const consultaQry = `
            SELECT 
                F.ID_factura AS "ID_factura",
                F.ID_cliente_fk AS "ID_cliente",
                F.ID_vendedor_fk AS "ID_vendedor",
                F.fecha_venta_hora AS "fecha_factura",
                F.subtotal AS "subtotal_factura",
                F.metodo_pago AS "metodo_pago",
                F.referencia_metodo_pago AS "referencia_metodo_pago",
                DF.descripcion AS "desc_Producto",
                DF.cantidad AS "cantidad_Producto",
                DF.precio_unitario AS "precio_unitario_Producto",
                F.IVA AS "IVA",
                F.total AS "total_factura",
                E.Nombre_estado AS "estado_factura"
            FROM Factura F
            INNER JOIN DetalleFactura DF ON DF.ID_factura_fk = F.ID_factura
            INNER JOIN Estado E ON E.ID_estado = F.estado_fk;
        `;

        const [result] = await db.query(consultaQry);
        res.json(result);
    } catch (error) {
        console.error("No se pudo consultar las facturas.", error);
        res.json({ error: "No se pudo hacer la consulta de las facturas." });
    }
};


// Consultar factura por ID y su detalle
const GET_ID_FACTURAS_DETALLE = async(req, res) => {
    const { id } = req.params;
    try {
        const consultaQry = `
            SELECT 
                F.ID_factura AS "ID_factura",
                F.ID_cliente_fk AS "ID_cliente",
                F.ID_vendedor_fk AS "ID_vendedor",
                F.fecha_venta_hora AS "fecha_factura",
                F.subtotal AS "subtotal_factura",
                F.metodo_pago AS "metodo_pago",
                F.referencia_metodo_pago AS "referencia_metodo_pago",
                DF.descripcion AS "desc_Producto",
                DF.cantidad AS "cantidad_Producto",
                DF.precio_unitario AS "precio_unitario_Producto",
                F.IVA AS "IVA",
                F.total AS "total_factura",
                E.Nombre_estado AS "estado_factura"
            FROM Factura F
            INNER JOIN DetalleFactura DF ON DF.ID_factura_fk = F.ID_factura
            INNER JOIN Estado E ON E.ID_estado = F.estado_fk 
            WHERE F.ID_factura = ?;
        `;

        const [result] = await db.query(consultaQry, [id]);
        res.json(result);
    } catch (error) {
        console.error("No se pudo consultar la factura con id: [", id, '] \n', error);
        res.json({ error: `No se pudo consultar la factura con id: [${id}] \n `});
    }
};


// Registrar factura
const INSERT_FACTURA_CON_DETALLES = async (req, res) => {
    const { ID_cliente_fk, ID_vendedor_fk, fecha_venta_hora, metodo_pago, referencia_metodo_pago, detalles } = req.body;

    if (!detalles || detalles.length === 0) {
        return res.status(400).json({ error: 'La factura debe tener al menos un detalle.' });
    }

    // Validar y ajustar referencia_metodo_pago
    const referencia = (referencia_metodo_pago === "ninguno") ? "N/A" : referencia_metodo_pago;

    try {
        const subtotal = detalles.reduce((sum, item) => sum + item.precio_unitario * item.cantidad, 0);
        const IVA = subtotal * 0.12;
        const total = subtotal + IVA;

        const insertFacturaQuery = `
            INSERT INTO Factura (ID_cliente_fk, ID_vendedor_fk, fecha_venta_hora, subtotal, IVA, total, estado_fk, metodo_pago, referencia_metodo_pago)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const [facturaResult] = await db.query(insertFacturaQuery, [ID_cliente_fk, ID_vendedor_fk, fecha_venta_hora, subtotal, IVA, total, 3, metodo_pago, referencia]);

        const facturaId = facturaResult.insertId;

        const insertDetalleQuery = `
            INSERT INTO DetalleFactura (ID_factura_fk, descripcion, cantidad, precio_unitario, importe_total)
            VALUES ?
        `;

        const detalleValues = detalles.map(det => [
            facturaId,
            det.descripcion,
            det.cantidad,
            det.precio_unitario,
            det.cantidad * det.precio_unitario
        ]);

        const [result] = await db.query(insertDetalleQuery, [detalleValues]);

        res.status(201).json({ message: 'Factura y detalles insertados correctamente.' });
    } catch (error) {
        console.error('Error al insertar factura y detalles:', error);
        res.status(500).json({ error: 'Error al insertar la factura y sus detalles.' });
    } 
};




// Actualizar factura
const ACTUALIZAR_FACTURA = async (req, res) => {
    const { id } = req.params;
    const { ID_cliente_fk, ID_vendedor_fk, fecha_venta_hora, subtotal, IVA, total, estado_fk, metodo_pago, referencia_metodo_pago } = req.body;

    // Validar y ajustar referencia_metodo_pago
    const referencia = (referencia_metodo_pago === "ninguno") ? "N/A" : referencia_metodo_pago;

    const updateQuery = `
        UPDATE Factura
        SET ID_cliente_fk = ?, ID_vendedor_fk = ?, fecha_venta_hora = ?, subtotal = ?, IVA = ?, total = ?, estado_fk = ?, metodo_pago = ?, referencia_metodo_pago = ?
        WHERE ID_factura = ?
    `;

    try {
        await db.query(updateQuery, [ID_cliente_fk, ID_vendedor_fk, fecha_venta_hora, subtotal, IVA, total, estado_fk, metodo_pago, referencia, id]);
        res.json({ message: 'Factura actualizada correctamente.' });
    } catch (error) {
        console.error('Error al actualizar la factura:', error);
        res.status(500).json({ error: 'Error al actualizar la factura.' });
    }
};



// Eliminar factura
const ELIMINAR_FACTURA = async (req, res) => {
    const { id } = req.params;

    const deleteQuery = `
        DELETE FROM Factura
        WHERE ID_factura = ?
    `;

    try {
        await db.query(deleteQuery, [id]);
        res.json({ message: 'Factura eliminada correctamente.' });
    } catch (error) {
        console.error('Error al eliminar la factura:', error);
        res.status(500).json({ error: 'Error al eliminar la factura.' });
    }
};

// Eliminar pero cambio de estado a 0
const CAMBIAR_ESTADO_FACTURA = async (req, res) => {
    const { id } = req.params;

    const updateQuery = `
        UPDATE Factura
        SET estado_fk = 1
        WHERE ID_factura = ?
    `;

    try {
        await db.query(updateQuery, [id]);
        res.json({ message: 'Estado de la factura cambiado a inactivo.' });
    } catch (error) {
        console.error('Error al cambiar el estado de la factura:', error);
        res.status(500).json({ error: 'Error al cambiar el estado de la factura.' });
    }
};


module.exports = {
    GET_LAST_FACTURA_ID,
    GET_ALL_FACTURAS,
    GET_ALL_FACTURAS_DETALLE,
    GET_ID_FACTURAS_DETALLE,
    INSERT_FACTURA_CON_DETALLES,
    ACTUALIZAR_FACTURA,
    ELIMINAR_FACTURA,
    CAMBIAR_ESTADO_FACTURA
}