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
        console.log('Error: ${error}');
        res.status(500).json({ error: 'Error al obtener zonas.' });
    }
};



const obtenerZonaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query('SELECT * FROM Zona WHERE Id_zona = ?', [id]);
        res.json(result[0] || {});
    } catch (error) {
        console.log('Error: ${error}');
        res.status(500).json({ error: 'Error al obtener la zona.' });
    }
};

const CreateZona = async (req, res) => {
    const { Nombre_zona, Id_empleado } = req.body;
    console.log(req.body);
    try {
        const query = 'INSERT INTO Zona (Nombre_zona, Estado_zona, Id_empleado) VALUES (?, 2, ?);'
        const result = await db.query(query, [Nombre_zona, Id_empleado]);
        
        const insertId = result[0].insertId; // Obtener el ID de la zona recién creada
        
        if (insertId) {
            res.json({ message: 'Zona creada', insertId: insertId });
            console.log('Zona creada con ID:', insertId);
        } else {
            throw new Error('No se pudo obtener el ID de la zona creada.');
        }
    } catch (error) {
        res.status(500).json({ message: `Error al crear la zona: ${error.message}` });
        console.log(`Error al crear la zona: ${error.message}`);
    }
}

  
const CreateDetalleZona = async (req, res) => {
    const { idZona, idCliente, direccion } = req.body;
    console.log(req.body); 
    try {
      const query = 'INSERT INTO Detalle_zona (ID_zonaFK, Id_cliente, Direccion_clienteFK) VALUES (?,?,?);'
      await db.query(query, [idZona, idCliente, direccion]);
      res.json({ message: 'Detalle zona creada' });
      console.log('Detalle zona creada');
    } catch (error) {
      console.error(`Error al crear el Detalle zona: ${error.message}`); 
      res.json({ message: `Error al crear el Detalle zona: ${error.message}` });
    }
  };
  


  const UpdateZona = async (req, res) => {
    const { idZona } = req.params;
    const { Nombre_zona, Id_empleado } = req.body;
    try {
      console.log('Datos recibidos en el backend para actualizar la zona:', {
        idZona,
        Nombre_zona,
        Id_empleado
      });
  
      const query = 'UPDATE Zona SET Nombre_zona = ?, Id_empleado = ? WHERE ID_zona = ?;';
      await db.query(query, [Nombre_zona, Id_empleado, idZona]);
      res.json({ message: 'Zona actualizada' });
      console.log('Zona actualizada');
    } catch (error) {
      console.error(`Error al actualizar la zona: ${error.message}`);
      res.status(500).json({ message: `Error al actualizar la zona: ${error.message}` });
    }
  };
  
  const UpdateDetalleZona = async (req, res) => {
    const { idDetalleZona } = req.params;
    const { idCliente, direccion } = req.body;
    try {
      console.log('Datos recibidos en el backend para actualizar el detalle de la zona:', {
        idDetalleZona,
        idCliente,
        direccion
      });
  
      const query = 'UPDATE Detalle_zona SET Id_cliente = ?, Direccion_clienteFK = ? WHERE ID_detallezona = ?;';
      await db.query(query, [idCliente, direccion, idDetalleZona]);
      res.json({ message: 'Detalle zona actualizado' });
      console.log('Detalle zona actualizado');
    } catch (error) {
      console.error(`Error al actualizar el Detalle zona: ${error.message}`);
      res.status(500).json({ message: `Error al actualizar el Detalle zona: ${error.message}` });
    }
  };
  
  
  

const obtenerUsuariosRol2 = async (req, res) => {
    try {
        const query = 'SELECT * FROM Usuarios WHERE Rol_Usuario = 2 AND Estado_Usuario = 2';
        const [usuarios] = await db.query(query);
        res.json(usuarios); 
    } catch (error) {
        console.error('Error al obtener usuarios con rol 2:', error);
        res.status(500).json({ error: 'Error al obtener usuarios con rol 2' });
    }
};


const obtenerClientes = async (req, res) => {
    try {
        const query = 'SELECT * FROM Clientes WHERE Estado_Clientes = 2';
        const [clientes] = await db.query(query);
        res.json(clientes); 
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        res.status(500).json({ error: 'Error al obtener clientes' });
    }
};


const cambioEstadoZona = async (req, res) => {
    const { id } = req.params;
    const { state } = req.body;

    try {
        console.log('ID de la zona:', id);
        console.log('Nuevo estado:', state);

        await db.query('UPDATE Zona SET Estado_zona = ? WHERE ID_zona = ?', [state, id]);
        res.json({ message: "Estado cambiado" });
    } catch (error) {
        console.error('Error al cambiar el estado:', error);
        res.status(500).json({ error: 'Error al cambiar el estado' });
    }
};


const obtenerInfoRuta = async (req, res) => {
    const { idRuta } = req.params; // Suponiendo que la ruta se identifica por un ID
    
    try {
        // Consulta para obtener la información de la ruta, incluyendo el empleado asignado
        const queryRuta = `SELECT z.ID_zona, dz.Id_cliente, c.nombre, c.direccion, c.email,
                                  u.nombre AS NombreEmpleado, u.Apellido AS ApellidoEmpleado
                           FROM Zona z
                           INNER JOIN Usuarios u ON z.Id_empleado = u.Identificacion_Usuario
                           INNER JOIN Detalle_zona dz ON z.ID_zona = dz.ID_zonaFK
                           INNER JOIN Clientes c ON dz.Id_cliente = c.Identificacion_Clientes
                           WHERE z.ID_zona = ?`;
        const [infoRuta] = await db.query(queryRuta, [idRuta]);

        res.json(infoRuta);
    } catch (error) {
        console.error('Error al obtener información de la ruta:', error);
        res.status(500).json({ error: 'Error al obtener información de la ruta' });
    }
};


// const eliminarZona = async (req, res) => {
//     try {
//         const { id } = req.params;
//         await db.query('DELETE FROM Registro_Proveedor WHERE ID_Registro_Proveedor_PK = ?', [id]);
//         res.json({ message: 'Proveedor eliminado correctamente' });
//     } catch (error) {
//         console.log('Error: ${error}');
//         res.status(500).json({ error: 'Error al eliminar el proveedor.' });
//     }
// };

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
    CreateZona,
    CreateDetalleZona,
    // eliminarZona,
    cambioEstadoZona,
    obtenerUsuariosRol2,
    // verificarTelefonoExistente
    obtenerClientes,
    UpdateZona,
    UpdateDetalleZona,
    obtenerInfoRuta
    
};