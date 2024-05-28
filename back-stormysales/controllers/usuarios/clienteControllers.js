const db = require('../../models/modelStormySales').promise();

const busquedaCliente = async(req,res)=>{
    try {
        const query = `select c.Identificacion_Clientes, c.nombre, c.Apellido,e.Nombre_estado , c.Estado_Clientes as idEstado, c.email, c.direccion, c.telefono 
        from  Clientes c
        inner join Estado e
        on e.ID_estado = c.Estado_Clientes;`

        const [result]= await db.query(query);
        res.json(result);
    } catch (error) {
        
    }
}