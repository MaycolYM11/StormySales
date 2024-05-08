const db = require('../../models/modelStormySales').promise();


const busquedaSupervisor = async(req,res) => {
    try {

        const query = `select Identificacion_Usuario,nombre,Apellido,Rol_Usuario,Estado_Usuario as id_estado,e.Nombre_estado,Contrasena 
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

module.exports = {
    busquedaSupervisor
}