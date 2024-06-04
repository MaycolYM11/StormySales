import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';


export const RegisterCliente = ({isOpen, closeModal,reConsulta}) => {
    

    const agregarRegistro = async() =>{
        try {
            await axios.post("http://localhost:3001/usuario/crearcliente",{
                "id" : numid,
                "nombre": name,
                "Apellido":apell,
                "email":email,
                "direccion":direccion,
                "telefono":cel

            }).then(() => {
                reConsulta(); 
                closeModal(); 
            }).catch(error => {
                console.error('Error al agregar el registro:', error);
            });
        } catch (error) {
            console.error('Error al agregar el registro:', error);
        }
        
    };
   
    const [numid,setNumid] = useState('');
    // const [tipoid,setTipoid] = useState('');
    const [name,setName] = useState('');
    
    const [apell,setApell] = useState('');
    const [direccion,setDireccion]=useState('');
    const [cel,setCel] = useState('');
    const [email,setEmail] = useState('');

    if(!isOpen) return null ;
    

    function Verificar_nombre(){
        const Innombre = document.getElementById('name').value;
        
        let con=true;
        let validacionlt=/^[A-Za-z]+$/;
        
        if(Innombre.trim() === ""){
            document.getElementById('wrongname').innerHTML='Este espacio no puede quedar en blanco';
            con=false;
            /*Innombre.focus();*/
        }else if(!validacionlt.test(Innombre)){
            document.getElementById('wrongname').innerHTML='Digitar solo letras';
            con=false;
        }
        else{
            document.getElementById('wrongname').innerHTML='';
        }
        
        return con;
    }
    
    
    
    function Verificar_apell(){
        const Inapell = document.getElementById('apell').value;
    
        let con=true;
        let validacionlt=/^[A-Za-z]+$/;
    
        if(Inapell.trim() === ""){
            document.getElementById('wrongapell').innerHTML='Este espacio no puede quedar en blanco';
            con=false;
        }else if(!validacionlt.test(Inapell)){
            document.getElementById('wrongapell').innerHTML='Digitar solo letras';
            con=false;
        }else{
            document.getElementById('wrongapell').innerHTML='';
        }
        
        return con;
    }
    
    
    // function Verificar_tipoid(){
    //     const Intipoid = document.getElementById('tipoid').value;
    
    //     let con=true;
    
    //     if(Intipoid==="0"){
    //         document.getElementById('wrongtipoid').innerHTML='Seleccione un tipo de identificacion';
    //         con=false;
    //     }else{
    //         document.getElementById('wrongtipoid').innerHTML='';
    //     }
    
    //     return con;
    // }
    
    function Verificar_id(){
        const Inid = document.getElementById("numid").value;
        // const TipoId = document.getElementById('tipoid').value;

        let validacionNM =/^[A-Za-z]+$/;    
        let con=true;
    
        if(Inid.trim() === ""){
            document.getElementById('wrongid').textContent='Este espacio no puede quedar en blanco';
            con=false;
        }else{
            
                if(validacionNM.test(Inid)){
                    document.getElementById('wrongid').textContent='Digitar solo Numeros';
                    con=false;
                    console.log('tashhsjtaush');
                }else{
                    document.getElementById('wrongid').innerHTML='';
                }
            
                document.getElementById('wrongid').innerHTML='';
            
        }
    
        return con;
    }
    
    function Verificar_tel(){
        const Intel = document.getElementById('cel').value;
    
        let con=true;
        let validacionlt=/^[A-Za-z]+$/;
    
        if(Intel === ""){
            document.getElementById('wrongtel').innerHTML='Este espacio no puede quedar en blanco';
            con=false;
        }else if(validacionlt.test(Intel)){
            document.getElementById('wrongtel').innerHTML='Digitar solo numeros';
            con=false;
        }else{
            document.getElementById('wrongtel').innerHTML='';
        }
    
        return con;
    }
    
    function Verificar_email(){
        const Inemail = document.getElementById('email').value;
    
        let con=true;
    
        if(Inemail===""){
            document.getElementById('wrongemail').innerHTML='Este espacio no puede quedar en blanco';
            con=false;
        }else{
            document.getElementById('wrongemail').innerHTML='';
        }
    
        return con;
    }

    function Verificar_direccion(){
        const Indireccion = document.getElementById('direccion').value;
    
        let con=true;
    
        if(Indireccion===""){
            document.getElementById('wrongdireccion').innerHTML='Este espacio no puede quedar en blanco';
            con=false;
        }else{
            document.getElementById('wrongdireccion').innerHTML='';
        }
    
        return con;
    }

    
    function Verificar_registro(){
    
        let con=true;
        console.log(con);
    
        if(!Verificar_nombre()){
            con=false;
            console.log(con);
            /*Innombre.focus();*/
        }
        
        if(!Verificar_apell()){
            con=false;
            /*console.log(con);
            /*Innacimiento.focus();*/
        }
       
        // if(!Verificar_tipoid()){
        //     con=false;
        //     /*console.log(con);
        //     /*Inusername.focus();*/
        // }
        //validacion de cantidad de caracteres
        if(!Verificar_id()){
            /*document.write('La contraseña debe ser mayor a 8 caracteres para preservar la seguridad');*/
            con=false;
            /*console.log(con);*/
        }
        if(!Verificar_tel()){
            /*document.write('Las contraseñas no son identicas');*/
            con=false;
            /*console.log(con);*/
        }
        if(!Verificar_email()){
            /*document.write('Las contraseñas no son identicas');*/
            con=false;
            /*console.log(con);*/
        }
        if(!Verificar_direccion()){
            /*document.write('Las contraseñas no son identicas');*/
            con=false;
            /*console.log(con);*/
        }
    
        axios.get(`http://localhost:3001/usuario/verifyidcliente/${numid}`)
        .then(response => {
            console.log("Respuesta del servidor:", response.data);
            if (response.data.Identificacion_Usuario === numid) {
                Swal.fire({
                    icon: 'warning',
                    title: 'El número de identificación ya existe en la base de datos',
                    toast: true
                });
                con = false;
            } else if(con){
                agregarRegistro();
                reConsulta();
                closeModal();
                Swal.fire({
                    icon: 'success',
                    text: 'Registro completado. Bienvenido ' + name,
                });
            }
        })
        .catch(error => {
            console.error("Error al verificar el número de identificación:", error);
            con = false;
        });

    return con;
}
        

  return (
    <div className='register-container'>
    <div className='fondo-register'>
        <div>
            <p className="close-button" onClick={closeModal}>X</p>
        </div>
        <div className="container__Main-register">
            <div className="titulo"><h1 className='main-title'>Registrar Gerente</h1></div>
            <form className="datos-contenido">
                <div className="form-group">
                    <label for="name">Primer Nombre</label>
                    <input className='input-form' type="text" name="name" id="name" placeholder="Nombre" onBlur={Verificar_nombre} onChange={(e) => setName(e.target.value)} />
                    <p id="wrongname" className="error-message"></p>
                </div>
                
                <div className="form-group">
                    <label for="apell">Apellidos</label>
                    <input className='input-form' type="text" name="apell" id="apell" placeholder="Apellidos" onBlur={Verificar_apell} onChange={(e) => setApell(e.target.value)} />
                    <p id="wrongapell" className="error-message"></p>
                </div>

                <div className="form-group">
                    <label for="numid">Número de Identificación</label>
                    <input className='input-form' type="text" name="numid" id="numid" placeholder="Identificación" onBlur={Verificar_id} onChange={(e) => setNumid(e.target.value)} />
                    <p id="wrongid" className="error-message"></p>
                </div>
                <div className="form-group">
                    <label for="numid">e-mail</label>
                    <input className='input-form' type="text" name="email" id="email" placeholder="correo" onBlur={Verificar_email} onChange={(e) => setEmail(e.target.value)} />
                    <p id="wrongemail" className="error-message"></p>
                </div>
                <div className="form-group">
                    <label for="direccion">Direccion</label>
                    <input className='input-form' type="text" name="direccion" id="direccion" placeholder="direccion" onBlur={Verificar_direccion} onChange={(e) => setDireccion(e.target.value)} />
                    <p id="wrongdireccion" className="error-message"></p>
                </div>
                <div className="form-group">
                    <label for="cel">telefono</label>
                    <input className='input-form' type="number" name="cel" id="cel" placeholder="telefono" onBlur={Verificar_tel} onChange={(e) => setCel(e.target.value)} />
                    <p id="wrongtel" className="error-message"></p>
                </div>
                <div className="form-group">
                    <input type="button" value="Registrar" className="boton b4" name="submit" id="submit" onClick={Verificar_registro} />
                </div>
            </form>
        </div>
    </div>
</div>

  )
}