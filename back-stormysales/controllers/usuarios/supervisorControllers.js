const db = require('../../models/modelStormySales').promise();
const bcrypt  =  require('bcrypt');


const busquedaSupervisor = async(req,res) => {
    try {

        const query = `select Identificacion_Usuario as id,nombre,Apellido,email_usuario,Rol_Usuario,Estado_Usuario as id_estado,e.Nombre_estado,Contrasena 
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

const buquedaSingularId = async(req, res) => {
    const {id,nombre} = req.params;
    try {
        const query = `SELECT 
        Identificacion_Usuario AS id,
        nombre,
        Apellido,
        Rol_Usuario,
        Estado_Usuario AS id_estado,
        e.Nombre_estado,
        Contrasena 
    FROM 
        usuarios u
    INNER JOIN 
        Estado e ON u.Estado_Usuario = e.ID_estado
    WHERE 
        Rol_Usuario = 1
        AND (
            Identificacion_Usuario = COALESCE(NULLIF(?, ''), Identificacion_Usuario)
            OR nombre = COALESCE(NULLIF(?, ''), nombre)
        );`

        const [result] = await db.query(query,[id || '',nombre || '']);
        res.json(result);
    } catch (error) {
        console.log(`fail en la busqueda, ${error}`)
        res.json({message:`fail en la busqueda, ${error}`});
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
    const {id,nombre,apellido,email,contrasena} = req.body;

    const salt = await bcrypt.genSalt(8)
    const hashContra = await bcrypt.hash(contrasena,salt);


    try {
        
        const query = `insert into usuarios values(?,?,?,?,1,2,?);`;

        await db.query(query,[id,nombre,apellido,email,hashContra]);

        res.json({message:'Datos registrados exitosamente'});

    } catch (error) {
        console.error('datos no ingresados :c',error);
        res.json({message:`datos no ingresados :c ${error}`})
    }
}

const editarSupervisor = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, email, contrasena } = req.body;

    try {
        const salt = await bcrypt.genSalt(8)
        const hashedPassword = await bcrypt.hash(contrasena,salt);

        const query = `
            UPDATE usuarios
            SET nombre = ?, apellido = ?, email_usuario = ?, Contrasena = ?
            WHERE Identificacion_Usuario = ?;
        `;

        await db.query(query, [nombre, apellido, email, hashedPassword, id]);
        
        res.json({ success: true, message: "Supervisor actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar el supervisor:", error);
        res.status(500).json({ error: "No se pudo actualizar el supervisor" });
    }
};

const activarEstadoSupervisor = async (req,res) =>{
    const {id}=req.params;
    const {state}=req.body;

    try {
        const query = `UPDATE usuarios SET Estado_Usuario = ? WHERE Identificacion_Usuario = ? ;`;
        await db.query(query,[state,id]);
        res.json({message: "Estado cambiado",continue:true})
        console.log(`Estado cambiado`);
      } catch (error) {
        console.error('Edsado no cambiado',error);
        res.json({message:`Estado no cambiado, ${error}`,continue:false});
      }
}

const desactivarEstadoSupervisor = async (req,res) =>{
    const {id}=req.params;
    const {state}=req.body;
    let cont = 0;

    try {
        const query=`select Estado_Usuario as estado from usuarios where Rol_Usuario = 1;`;
        const [result] = await db.query (query);

        console.log(result);

        for(let i = 0; i < result.length;i++ ){
            if(result[i].estado === 2){
              cont = cont + 1;
            }
          }
        if(cont>=2){
            try {
                const desquery = `UPDATE usuarios SET Estado_Usuario = ? WHERE Identificacion_Usuario = ?;`;
                db.query(desquery,[state,id])
                res.json({message:'Desactivacion completa',continue:true})
            } catch (error) {
                console.log('Estado no cambiado',error);
                res.json({message:`Estado no cambiado, ${error}`,continue:false})
            }
        }else{
            res.json({message: `NO SE PUEDE desactivar porque no hay mas supervisores activos`,continue:false});
            console.log(`NO SE PUEDE desactivar porque no hay mas supervisores activos`);
        }
    } catch (error) {
        console.error(`No se puede desactivar ${error}`);
        res.json({message: `No se puede desactivar ${error}`,continue:false});
    }
}

module.exports = {
    busquedaSupervisor,
    crearSupervisor,
    verificarSupervisorID,
    editarSupervisor,
    activarEstadoSupervisor,
    desactivarEstadoSupervisor,
    buquedaSingularId
}