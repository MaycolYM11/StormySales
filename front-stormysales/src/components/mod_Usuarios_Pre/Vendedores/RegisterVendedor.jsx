import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';


export const RegisterVendedor = ({isOpen, closeModal,reConsulta}) => {
    

    const agregarRegistro = async() =>{
        try {
            await axios.post("http://localhost:3001/usuario/postvendedor",{
                "id" : numid,
                "nombre": name,
                "apellido":apell,
                "email":email,
                "contrasena" :password,
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
    
    // const [cel,setCel] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

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
    
    // function Verificar_tel(){
    //     const Intel = document.getElementById('cel').value;
    
    //     let con=true;
    //     let validacionlt=/^[A-Za-z]+$/;
    
    //     if(Intel === ""){
    //         document.getElementById('wrongtel').innerHTML='Este espacio no puede quedar en blanco';
    //         con=false;
    //     }else if(validacionlt.test(Intel)){
    //         document.getElementById('wrongtel').innerHTML='Digitar solo numeros';
    //         con=false;
    //     }else{
    //         document.getElementById('wrongtel').innerHTML='';
    //     }
    
    //     return con;
    // }
    
    // function Verificar_email(){
    //     const Inemail = document.getElementById('email').value;
    
    //     let con=true;
    
    //     if(Inemail===""){
    //         document.getElementById('wrongemail').innerHTML='Este espacio no puede quedar en blanco';
    //         con=false;
    //     }else{
    //         document.getElementById('wrongemail').innerHTML='';
    //     }
    
    //     return con;
    // }

    function Verificar_email() {
        const Inemail = document.getElementById('email').value;
    
        let con = true;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (Inemail.trim() === "") {
            document.getElementById('wrongemail').innerHTML = 'Este espacio no puede quedar en blanco';
            con = false;
        } else if (!emailPattern.test(Inemail)) {
            document.getElementById('wrongemail').innerHTML = 'Formato de correo electrónico no válido';
            con = false;
        } else {
            document.getElementById('wrongemail').innerHTML = '';
        }
    
        return con;
    }

    function Verificar_password(){
        const Inpassword = document.getElementById('password').value;
    
        let con=true;
    
        if(Inpassword.length < 8){
            /*document.write('La contraseña debe ser mayor a 8 caracteres para preservar la seguridad');*/
            document.getElementById('wrongpass').innerHTML='La contraseña debe ser mayor a 8 caracteres para preservar la seguridad';
            con=false;
        }else{
            document.getElementById('wrongpass').innerHTML='';
        }
        return con;
    }
    
    function Verificar_passwordcheck(){
        const Inpassword = document.getElementById('password').value;
        const Inpasswordchek = document.getElementById('passwordcheck').value;
    
        let con=true;
    
        if(Inpassword !== Inpasswordchek){
            /*document.write('Las contraseñas no son identicas');*/
            document.getElementById('wrongcheck').innerHTML='Las contraseñas no son identicas';
            con=false;
        }else{
            document.getElementById('wrongcheck').innerHTML='';
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
        // if(!Verificar_tel()){
        //     /*document.write('Las contraseñas no son identicas');*/
        //     con=false;
        //     /*console.log(con);*/
        // }
        if(!Verificar_email()){
            /*document.write('Las contraseñas no son identicas');*/
            con=false;
            /*console.log(con);*/
        }
        if(!Verificar_password()){
            /*document.write('Las contraseñas no son identicas');*/
            con=false;
            /*console.log(con);*/
        }
        if(!Verificar_passwordcheck()){
            /*document.write('Las contraseñas no son identicas');*/
            con=false;
            /*console.log(con);*/
        }
    
        axios.get(`http://localhost:3001/usuario/verifyidsupervisor/${numid}`)
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
                    <label for="password">Contraseña</label>
                    <input className='input-form' type="password" name="password" id="password" placeholder="Contraseña" onKeyUp={Verificar_password} onBlur={Verificar_password} onChange={(e) => setPassword(e.target.value)} />
                    <p id="wrongpass" className="error-message"></p>
                </div>
                
                <div className="form-group">
                    <label for="passwordcheck">Confirmar Contraseña</label>
                    <input className='input-form' type="password" name="passwordcheck" id="passwordcheck" placeholder="Confirmar" onKeyUp={Verificar_passwordcheck} onBlur={Verificar_passwordcheck} />
                    <p id="wrongcheck" className="error-message"></p>
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