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
        console.error("No se pudo hacer la consulta", error);
        res.json({ error: ".No se pudo hacer la consulta" });
    }
}

const verificarClienteID = async(req,res)=>{
    const { id } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM Clientes WHERE Identificacion_Clientes = ?', [id]);
        res.json(result[0] || {});
    } catch (error) {
        console.log(`Error al verificar el usuario.: ${error}`);
        res.status(500).json({ error: 'Error al verificar el usuario.' });
    }
}
const crearCliente = async (req,res)=>{
    const {id, nombre, Apellido, email, direccion, telefono} = req.body;
    try {
        const query = 'INSERT into Clientes VALUES(?,?,?,2,?,?,?)';
        await db.query(query,[id,nombre,Apellido,email,direccion,telefono]);
        res.json({message: `datos registrados correctamente`})
    } catch (error) {
        
    }
}

const editarCliente = async (req,res)=>{
    const { id } = req.params;
    const { nombre, Apellido, email, direccion, telefono } = req.body;
    try {
        const query = `UPDATE Clientes SET nombre=?, Apellido=?,email=?,direccion=?,telefono=? WHERE Identificacion_Clientes=?`;
        await db.query(query,[nombre,Apellido,email,direccion,telefono,id]);
        res.json({message: 'Actualizacion done'});
        console.log('Actualizacion done');
    } catch (error) {
        res.json({message:`error en actualizacion ${error}`})
        console.log(`error en actualizacion ${error}`);
    }
}

const camibioEstadoCliente = async (req,res) =>{
    const {id}=req.params;
    const {state}=req.body;

    try {
        const query = `UPDATE Clientes SET Estado_Clientes = ? WHERE Identificacion_Clientes = ? ;`;
        await db.query(query,[state,id]);
        res.json({message: "Estado cambiado",continue:true})
        console.log(`Estado cambiado`);
      } catch (error) {
        console.error('Estado no cambiado',error);
        res.json({message:`Estado no cambiado, ${error}`,continue:false});
      }
}
module.exports = {
    busquedaCliente,
    verificarClienteID,
    crearCliente,
    editarCliente,
    camibioEstadoCliente
}
