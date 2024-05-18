const db = require("../../models/modelStormySales").promise();

const obtenerZonas = async (req, res) => {
    try {
        const [result] = await db.query(`
                SELECT 
                Zona.ID_zona AS Id_zona,
                Zona.Nombre_zona AS Nombre_zona,
                Estado.Nombre_estado AS Estado_zona,
                CONCAT(Usuarios.nombre, ' ', Usuarios.Apellido) AS Empleado_asignado,
                COUNT(Detalle_zona.ID_detallezona) AS Cantidad_rutas,
                Usuarios.email_usuario AS Email
            FROM 
                Zona
            JOIN 
                Estado ON Zona.Estado_zona = Estado.ID_estado
            JOIN 
                Usuarios ON Zona.Id_empleado = Usuarios.Identificacion_Usuario
            LEFT JOIN 
                Detalle_zona ON Zona.ID_zona = Detalle_zona.ID_zonaFK
            GROUP BY 
                Zona.ID_zona, Zona.Nombre_zona, Estado.Nombre_estado, Usuarios.nombre, Usuarios.Apellido, Usuarios.email_usuario;
        `);
        res.json(result);
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: 'Error al obtener zonas.' });
    }
};



const obtenerZonaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query('SELECT * FROM Zona WHERE Id_zona = ?', [id]);
        res.json(result[0] || {});
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: 'Error al obtener la zona.' });
    }
};

// ------------------------------------------------------------

const crearZona = async (req, res) => {
    const { Nombre_zona, Id_empleado, clientes } = req.body; 
    try {
        const createZonaQuery = "INSERT INTO Zona (Nombre_zona, Estado_zona, Id_empleado) VALUES (?, 1, ?)";
        const [zonaResult] = await db.query(createZonaQuery, [Nombre_zona, Id_empleado]);
        const nuevaZonaId = zonaResult.insertId;
        const insertClientesQuery = `
            INSERT INTO Detalle_zona (ID_zonaFK, Id_cliente, Direccion_clienteFK)
            SELECT ?, c.Identificacion_Clientes, c.direccion
            FROM Clientes c
            WHERE c.Identificacion_Clientes IN (?)
        `;

        const clientesIds = clientes.map(cliente => cliente.Identificacion_Clientes);
        await db.query(insertClientesQuery, [nuevaZonaId, clientesIds]);

        res.json({ message: 'Zona creada correctamente', id: nuevaZonaId });
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Error al crear la zona.' });
    }
};



const actualizarZona = async (req, res) => {
    try {
        const { id } = req.params;
        const { Nombre_zona, Estado_zona, Empleado_asignado, Cantidad_rutas, Email } = req.body;

        const updateQuery = "UPDATE datos SET Nombre_zona = ?, Estado_zona = ?, Empleado_asignado = ?, Cantidad_rutas = ?, Email = ? WHERE Id_zona = ?";
        await db.query(updateQuery, [Nombre_zona, Estado_zona, Empleado_asignado, Cantidad_rutas, Email, id]);

        res.json({ message: 'Zona actualizada correctamente' });
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: 'Error al actualizar la zona.' });
    }
};


const cambioEstadoZona = async (req, res) => {
    const { id } = req.params;
    const { state } = req.body;

    try {
        await db.query('UPDATE Zona SET Estado_zona = ? WHERE ID_zona = ?', [state, id]);
        res.json({ message: "Estado cambiado" });
    } catch (error) {
        console.error('Estado no cambiado', error);
        res.status(500).json({ error: 'Estado no cambiado' });
    }
};




const eliminarZona = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM Registro_Proveedor WHERE ID_Registro_Proveedor_PK = ?', [id]);
        res.json({ message: 'Proveedor eliminado correctamente' });
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: 'Error al eliminar el proveedor.' });
    }
};

// const verificarTelefonoExistente = async (req, res) => {
//     try {
//         const { telefono } = req.body;
//         const query = 'SELECT Telefono_Contacto FROM Registro_Proveedor WHERE Telefono_Contacto = ? LIMIT 1';
//         const [rows] = await db.query(query, [telefono]);

//         if (rows.length > 0) {
//             return res.status(200).json({ exists: true, message: 'El número de teléfono ya existe.' });
//         }

//         return res.status(200).json({ exists: false, message: 'El número de teléfono está disponible.' });
//     } catch (error) {
//         console.error('Error al verificar el número de teléfono:', error);
//         return res.status(500).json({ error: 'Error interno del servidor.' });
//     }
// };

module.exports = {
    obtenerZonas,
    obtenerZonaPorId,
    crearZona,
    actualizarZona,
    eliminarZona,
    cambioEstadoZona,
    // verificarTelefonoExistente
};
