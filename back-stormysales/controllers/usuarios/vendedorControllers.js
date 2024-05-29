const db = require('../../models/modelStormySales').promise();


const mostrarVendedor = async(req,res) => {
    try {

        const query = `select Identificacion_Usuario as id,nombre,Apellido,email_usuario,Rol_Usuario,Estado_Usuario as id_estado,e.Nombre_estado,Contrasena 
        from usuarios u
        inner join Estado e
        on u.Estado_Usuario = e.ID_estado
        where Rol_Usuario = 2;`;

        const [result] = await db.query(query);
        res.json(result);

    } catch (error) {
        console.error("No se pudo hacer la consulta", error);
        res.json({ error: ".No se pudo hacer la consulta" });
    }
}

const verificarVendedorId = async(req,res)=>{
    const { id } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM usuarios WHERE Identificacion_Usuario = ?', [id]);
        res.json(result[0] || {});
    } catch (error) {
        console.log(`Error al verificar el usuario.: ${error}`);
        res.status(500).json({ error: 'Error al verificar el usuario.' });
    }
}

const crearVendedor = async(req,res) => {
    const {id,nombre,apellido,email,contrasena} = req.body;

    try {
        
        const query = `insert into usuarios values(?,?,?,?,2,2,?);`;

        await db.query(query,[id,nombre,apellido,email,contrasena]);

        res.json({message:'Datos registrados exitosamente'});

    } catch (error) {
        console.error('datos no ingresados :c',error);
    }
}

const editarVendedor = async(req,res)=>{
    const {id} = req.params;
    const {nombre,apellido,email,contrasena}=req.body;
    
    try {
        const query = `update usuarios set nombre= ?,Apellido= ?,email_usuario=?,Contrasena= ? where Identificacion_Usuario= ?;`;
        await db.query(query,[nombre,apellido,email,contrasena,id]);
        res.json({message: 'Actualizacion done'});
    } catch (error) {
        res.json({message:`error en actualizacion ${error}`})
        console.log(`error en actualizacion ${error}`);
    }
}

const camibioEstadoVendedor = async (req,res) =>{
    const {id}=req.params;
    const {state}=req.body;

    try {
        const query = `UPDATE usuarios SET Estado_Usuario = ? WHERE Identificacion_Usuario = ? ;`;
        await db.query(query,[state,id]);
        res.json({message: "Estado cambiado",continue:true})
        console.log(`Estado cambiado`);
      } catch (error) {
        console.error('Estado no cambiado',error);
        res.json({message:`Estado no cambiado, ${error}`,continue:false});
      }
}


module.exports = {
    mostrarVendedor,
    crearVendedor,
    verificarVendedorId,
    editarVendedor,
    camibioEstadoVendedor
}