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
    const { id } = req.params;
    const { Nombre_zona, Id_empleado } = req.body;
    try {
      console.log('Datos recibidos en el backend para actualizar la zona:', {
        id,
        Nombre_zona,
        Id_empleado
      });
  
      const query = 'UPDATE Zona SET Nombre_zona = ?, Id_empleado = ? WHERE ID_zona = ?;';
      await db.query(query, [Nombre_zona, Id_empleado, id]);
      res.json({ message: 'Zona actualizada' });
      console.log('Zona actualizada');
    } catch (error) {
      console.error(`Error al actualizar la zona: ${error.message}`);
      res.status(500).json({ message: `Error al actualizar la zona: ${error.message}` });
    }
  };
  
  const UpdateDetalleZona = async (req, res) => {
    const { id } = req.params;
    const { idCliente, direccion } = req.body;
    try {
      console.log('Datos recibidos en el backend para actualizar el detalle de la zona:', {
        id,
        idCliente,
        direccion
      });
  
      // Verificar si el ID de detalle de zona es null o no existe
      if (id === 'null') {
        console.error('ID de detalle de zona no definido.');
        return res.status(400).json({ error: 'ID de detalle de zona no definido.' });
      }
  
      const [existingDetail] = await db.query('SELECT * FROM Detalle_zona WHERE ID_detallezona = ?', [id]);
      if (!existingDetail) {
        console.error('El detalle de zona con el ID proporcionado no existe.');
        return res.status(404).json({ error: 'El detalle de zona con el ID proporcionado no existe.' });
      }
      
      const query = 'UPDATE Detalle_zona SET Id_cliente = ?, Direccion_clienteFK = ? WHERE ID_detallezona = ?;';
      await db.query(query, [idCliente, direccion, id]);
      res.json({ message: 'Detalle zona actualizado correctamente' });
      console.log('Detalle zona actualizado');
    } catch (error) {
      console.error(`Error al actualizar el Detalle zona: ${error.message}`);
      res.status(500).json({ error: `Error al actualizar el Detalle zona: ${error.message}` });
    }
  };
  
  const DetalleZona = async (req, res) => {
    try {
      const { idZona } = req.params;
      const [result] = await db.query('SELECT * FROM Detalle_zona WHERE ID_zonaFK = ?', [idZona]);
      res.json(result || []);
    } catch (error) {
      console.log(`Error: ${error}`);
      res.status(500).json({ error: 'Error al obtener el detalle de la zona.' });
    }
  };
  

  const validarClienteEnZona = async (req, res) => {
    try {
      const { idZona, idCliente } = req.params;
      const [result] = await db.query('SELECT * FROM Detalle_zona WHERE ID_zonaFK = ? AND Id_cliente = ?', [idZona, idCliente]);
      res.json({ clienteAsociado: result.length > 0 });
    } catch (error) {
      console.log(`Error: ${error}`);
      res.status(500).json({ error: 'Error al validar el cliente en la zona.' });
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

const obtenerClientesConDetalleZona = async (req, res) => {
  try {
    const { idZona } = req.params;

    const clientes = await db.query('SELECT * FROM Clientes');
    const detalleZona = await db.query('SELECT * FROM Detalle_zona WHERE ID_zonaFK = ?', [idZona]);

    const clientesConDetalle = clientes.map(cliente => {
      const detalle = detalleZona.find(d => d.Id_cliente === cliente.Identificacion_Clientes);
      return {
        ...cliente,
        asociado: !!detalle
      };
    });

    res.json(clientesConDetalle);
  } catch (error) {
    console.error('Error al obtener los clientes y detalles de la zona:', error);
    res.status(500).json({ error: 'Error al obtener los clientes y detalles de la zona.' });
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
    const { idRuta } = req.params; 
    
    try {
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


const clienteElim = async (req, res) => {
  try {
    const { id } = req.params;
    const { idZona } = req.body;  

  
    await db.query('DELETE FROM Detalle_zona WHERE Id_cliente = ? AND ID_zonaFK = ?', [id, idZona]);

    res.json({ message: 'Cliente eliminado correctamente de la zona.' });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ error: 'Error al eliminar el cliente de la zona.' });
  }
};


module.exports = {
    obtenerZonas,
    obtenerZonaPorId,
    CreateZona,
    CreateDetalleZona,
    clienteElim,
    cambioEstadoZona,
    obtenerUsuariosRol2,
    obtenerClientes,
    UpdateZona,
    UpdateDetalleZona,
    obtenerInfoRuta,
    DetalleZona,
    validarClienteEnZona,
    obtenerClientesConDetalleZona
    
};