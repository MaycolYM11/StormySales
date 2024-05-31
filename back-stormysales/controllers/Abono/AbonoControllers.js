const db = require('../../models/modelStormySales').promise();

const busquedaFacturaCliente = async (req, res) => {
    const { id_factura, id_cliente } = req.params;
    try {
        const query = `
            SELECT 
                f.ID_factura,
                DATE(f.fecha_venta_hora) AS fecha_factura,
                TIME(f.fecha_venta_hora) AS hora_factura,
                c.Identificacion_Clientes AS idcliente,
                c.nombre AS nombre_cliente,
                c.Apellido AS Apellido_cliente,
                c.telefono,
                c.direccion,
                u.Identificacion_Usuario AS id_empleado,
                u.nombre AS nombre_empleado,
                u.Apellido AS Apellido_empleado,
                z.Nombre_zona AS zona,
                SUM(d.importe_total) AS importe_total
            FROM 
                Factura f
            JOIN 
                Clientes c ON f.ID_cliente_fk = c.Identificacion_Clientes
            JOIN 
                Usuarios u ON f.ID_vendedor_fk = u.Identificacion_Usuario
            JOIN 
                Zona z ON u.Identificacion_Usuario = z.Id_empleado
            JOIN 
                Estado e ON f.estado_fk = e.ID_estado
            JOIN 
                DetalleFactura d ON f.ID_factura = d.ID_factura_fk
            WHERE 
                (f.ID_factura = COALESCE(NULLIF(?, ''), f.ID_factura)
                OR c.Identificacion_Clientes = COALESCE(NULLIF(?, ''), c.Identificacion_Clientes))
                AND e.Nombre_estado = 'Deuda'
            GROUP BY 
                f.ID_factura, f.fecha_venta_hora, c.Identificacion_Clientes, c.nombre, c.telefono, c.direccion, 
                u.Identificacion_Usuario, u.nombre, z.Nombre_zona;
        `;

        const [result] = await db.query(query, [id_factura || '', id_cliente || '']);

        if (result.length === 0) {
            return res.status(404).json({ message: 'No data found' });
        }

        res.json(result);
    } catch (error) {
        console.log(`Fallo en la búsqueda, ${error}`);
        res.status(500).json({ message: `Fallo en la búsqueda, ${error}` });
    }
};

const AbonosDatos = async (req, res) => {
    const { ID_factura_fk } = req.params;
    try {
        const query = `
            SELECT 
                ID_abono,
                ID_factura_fk,
                DATE_FORMAT(fecha_abono, '%Y-%m-%d') AS fecha_abono,
                cantidad_abono
            FROM 
                Abonos
            WHERE 
                ID_factura_fk = ?;
        `;

        const [result] = await db.query(query, [ID_factura_fk]);

        if (result.length === 0) {
            return res.status(404).json({ message: 'No abonos found for the given factura ID' });
        }

        res.json(result);
    } catch (error) {
        console.log(`Error retrieving abonos: ${error}`);
        res.status(500).json({ message: `Error retrieving abonos: ${error}` });
    }
};

module.exports = {
    busquedaFacturaCliente,
    AbonosDatos
};
