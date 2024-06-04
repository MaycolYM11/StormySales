const db = require('../../models/modelStormySales').promise();
const bcrypt = require('bcrypt');

const autenticarIngreso = async (req,res)=>{
    const {idEntra,contrasenaEntra}=req.body;

    try {
        const query = `SELECT Identificacion_Usuario as id,Contrasena,Rol_Usuario as rol,nombre,Apellido,Estado_Usuario as estado
        FROM Usuarios WHERE Identificacion_Usuario = ?;`

        const [result] = await db.query(query,[idEntra]);

        const usuario = result[0].id;
        console.log(result);

        if (usuario === idEntra && result[0].estado===2) {
            const passReal = result[0].Contrasena;
            const rol = result[0].rol;
            const name = result[0].nombre;
            const lastname = result[0].Apellido;

            try {
                let ingreso = await bcrypt.compare(contrasenaEntra, passReal);
                console.log('el ingreso es → ',ingreso);

                if(ingreso){
                    res.json({
                        message: "Ingreso exitoso C:",
                        ingreso:true,
                        user:usuario,
                        rol:rol,
                        name:name,
                        lastname:lastname,
                      });
                }else{
                    res.json({message: "Credenciales incorrectas :/",ingreso:false});
                }

            } catch (error) {
                console.log(`NT`,error);
                res.json({message: "no se pudo iniciar :/",ingreso:false});
            }
        }else{
            res.status(500).json({ error: 'Usuario no encontrado en DATABASE' ,message:'No encontrtado o inactivo',ingreso:false});
        }
    } catch (error) {
        console.log('no se pudo realizar la adquisision de id ',error);
        res.status(500).json({ error: 'Usuario no encontrado en DATABASE',ingreso:false});
    }
}

module.exports={
    autenticarIngreso
}