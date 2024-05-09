const db = require('../../models/modelStormySales').promise();


const busquedaSupervisor = async(req,res) => {
    try {

        const query = `select Identificacion_Usuario as id,nombre,Apellido,Rol_Usuario,Estado_Usuario as id_estado,e.Nombre_estado,Contrasena 
        from usuarios u
        inner join Estado e
        on u.Estado_Usuario = e.ID_estado
        where Rol_Usuario = 1;`;

        const [result] = await db.query(query);
        res.json(result);

    } catch (error) {
        console.error("No se pudo hacer la consulta", error);
        res.json({ error: ".No se pudo hacer la consulta" });
    }
}

const verificarSupervisorID = async(req,res)=>{
    const { id } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM usuarios WHERE Identificacion_Usuario = ?', [id]);
        res.json(result[0] || {});
    } catch (error) {
        console.log(`Error al verificar el usuario.: ${error}`);
        res.status(500).json({ error: 'Error al verificar el usuario.' });
    }
}

const crearSupervisor = async(req,res) => {
    const {id,nombre,apellido,contrasena} = req.body;

    try {
        
        const query = `insert into usuarios values(?,?,?,1,2,?);`;

        await db.query(query,[id,nombre,apellido,contrasena]);

        res.json({message:'Datos registrados exitosamente'});

    } catch (error) {
        console.error('datos no ingresados :c',error);
    }
}

module.exports = {
    busquedaSupervisor,
    crearSupervisor,
    verificarSupervisorID
}