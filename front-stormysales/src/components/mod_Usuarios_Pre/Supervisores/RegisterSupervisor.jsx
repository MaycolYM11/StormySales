import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';


export const RegisterAdmin = ({isOpen, closeModal,reConsulta}) => {
    

    const agregarRegistro = () =>{
        axios.post("http://localhost:3001/usuario/Create",{
            "id" : numid,
            "tipoid" : tipoid,
            "name1" : name1,
            "name2" : name2,
            "lastname1" : apell1,
            "lastname2" : apell2,
            "cel" : cel,
            "email" : email,
            "contrasena" :password,
        }).then(() => {
            reConsulta(); 
            closeModal(); 
        }).catch(error => {
            console.error('Error al agregar el registro:', error);
        });
    };
   
    const [numid,setNumid] = useState('');
    const [tipoid,setTipoid] = useState('');
    const [name1,setName1] = useState('');
    const [name2,setName2] = useState('');
    const [apell1,setApell1] = useState('');
    const [apell2,setApell2] = useState('');
    const [cel,setCel] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    if(!isOpen) return null ;
    

    function Verificar_nombre1(){
        const Innombre1 = document.getElementById('name1').value;
        
        let con=true;
        let validacionlt=/^[A-Za-z]+$/;
        
        if(Innombre1.trim() === ""){
            document.getElementById('wrongname1').innerHTML='Este espacio no puede quedar en blanco';
            con=false;
            /*Innombre.focus();*/
        }else if(!validacionlt.test(Innombre1)){
            document.getElementById('wrongname1').innerHTML='Digitar solo letras';
            con=false;
        }
        else{
            document.getElementById('wrongname1').innerHTML='';
        }
        
        return con;
    }
    
    function Verificar_nombre2(){
        const Innombre2 = document.getElementById('name2').value;
    
        let con=true;
        let validacionlt=/^[A-Za-z]+$/;
    
        if(Innombre2.trim() === ""){
            document.getElementById('wrongname2').innerHTML='Este espacio no puede quedar en blanco';
            con=false;
        }else if(!validacionlt.test(Innombre2)){
            document.getElementById('wrongname2').innerHTML='Digitar solo letras';
            con=false;
        }else{
            document.getElementById('wrongname2').innerHTML='';
        }
        
        return con;
    }
    
    function Verificar_apell1(){
        const Inapell1 = document.getElementById('apell1').value;
    
        let con=true;
        let validacionlt=/^[A-Za-z]+$/;
    
        if(Inapell1.trim() === ""){
            document.getElementById('wrongapell1').innerHTML='Este espacio no puede quedar en blanco';
            con=false;
        }else if(!validacionlt.test(Inapell1)){
            document.getElementById('wrongapell1').innerHTML='Digitar solo letras';
            con=false;
        }else{
            document.getElementById('wrongapell1').innerHTML='';
        }
        
        return con;
    }
    
    function Verificar_apell2(){
        const Inapell2 = document.getElementById('apell2').value;
    
        let con=true;
        let validacionlt=/^[A-Za-z]+$/;
    
        if(Inapell2.trim() === ""){
            document.getElementById('wrongapell2').innerHTML='Este espacio no puede quedar en blanco';
            con=false;
        }else if(!validacionlt.test(Inapell2)){
            document.getElementById('wrongapell2').innerHTML='Digitar solo letras';
            con=false;
        }else{
            document.getElementById('wrongapell2').innerHTML='';
        }
        
        return con;
    }
    
    function Verificar_tipoid(){
        const Intipoid = document.getElementById('tipoid').value;
    
        let con=true;
    
        if(Intipoid==="0"){
            document.getElementById('wrongtipoid').innerHTML='Seleccione un tipo de identificacion';
            con=false;
        }else{
            document.getElementById('wrongtipoid').innerHTML='';
        }
    
        return con;
    }
    
    function Verificar_id(){
        const Inid = document.getElementById("numid").value;
        const TipoId = document.getElementById('tipoid').value;

        let validacionNM =/^[A-Za-z]+$/;    
        let con=true;
    
        if(Inid.trim() === ""){
            document.getElementById('wrongid').textContent='Este espacio no puede quedar en blanco';
            con=false;
        }else{
            if(TipoId==='CC' || TipoId==='TI'){
                if(validacionNM.test(Inid)){
                    document.getElementById('wrongid').textContent='Digitar solo Numeros';
                    con=false;
                    console.log('tashhsjtaush');
                }else{
                    document.getElementById('wrongid').innerHTML='';
                }
            }else{
                document.getElementById('wrongid').innerHTML='';
            }
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
    
        if(!Verificar_nombre1()){
            con=false;
            console.log(con);
            /*Innombre.focus();*/
        }
        if(!Verificar_nombre2()){
            con=false;
            /*console.log(con);
            /*Inapellido.focus();*/
        }
        if(!Verificar_apell1()){
            con=false;
            /*console.log(con);
            /*Innacimiento.focus();*/
        }
        if(!Verificar_apell2()){
            con=false;
            /*console.log(con);
            /*Incorreo.focus();*/
        }
        if(!Verificar_tipoid()){
            con=false;
            /*console.log(con);
            /*Inusername.focus();*/
        }
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
    
        axios.get(`http://localhost:3001/usuario/usuario_empleado/${numid}`)
        .then(response => {
            console.log("Respuesta del servidor:", response.data);
            if (response.data.ID_Numero_Identificacion_PK === numid) {
                Swal.fire({
                    icon: 'warning',
                    title: 'El número de identificación ya existe en la base de datos',
                    toast: true
                });
                con = false;
            } else {
                agregarRegistro();
                reConsulta();
                closeModal();
                Swal.fire({
                    icon: 'success',
                    text: 'Registro completado. Bienvenido ' + name1,
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
    <div className='register-container' >
        <div className='fondo-register'>
            <div>
                <p onClick={closeModal} >X</p>
            </div>
            <div class="container__Main-register">
                <div class="titulo"><h1 className='main-title'>Registar Gerente</h1></div>
                <form className="datos-contenido">
                    <span>
                        <label for="name1">Primer Nombre</label>
                        <input className='input-form' type="text" name="name1" id="name1" placeholder="Primer Nombre" onBlur={Verificar_nombre1} onChange={(e) => setName1(e.target.value)} />
                        <p id="wrongname1"></p>
                    </span>
                    <span>
                        <label for="name2">Segundo Nombre</label>
                        <input className='input-form' type="text" name="name2" id="name2" placeholder="Segundo Nombre" onBlur={Verificar_nombre2} onChange={(e) => setName2(e.target.value)} />
                        <p id="wrongname2"></p>
                    </span>
                    
                    <span>
                        <label for="apell1">Primer Apellido</label>
                        <input className='input-form' type="text" name="apell1" id="apell1" placeholder="Primer Apellido" onBlur={Verificar_apell1} onChange={(e) => setApell1(e.target.value)} />
                        <p id="wrongapell1"></p>
                    </span>
                    <span>
                        <label for="apell2">Segundo Apellido</label>
                        <input className='input-form' type="text" name="apell2" id="apell2" placeholder="Segundo Apellido" onBlur={Verificar_apell2} onChange={(e) => setApell2(e.target.value)} />
                        <p id="wrongapell2"></p>
                    </span>
                    
                    <span>
                        <label for="tipoid">Tipo de Identificación</label>
                        <select className='input-form' name="tipoid" id="tipoid" onBlur={Verificar_tipoid} onChange={(e) => setTipoid(e.target.value)}>
                            <option value="0">Seleccionar</option>
                            <option value="1">Cedula de Ciudadania</option>
                            <option value="2">Cedula Extranjera</option>
                            {/*<option value="PP">Pasaporte</option>
                            <option value="TI">Tarjeta de identidad</option>*/}
                        </select>
                        <p id="wrongtipoid"></p>
                    </span>

                    <span>
                        <label for="numid">Número de Identificación</label>
                        <input className='input-form' type="text" name="numid" id="numid" placeholder="Identificación" onBlur={Verificar_id} onChange={(e) => setNumid(e.target.value)} />
                        <p id="wrongid"></p>
                    </span>
                    
                    <span>
                        <label for="cel">Numero de Telefono</label>
                        <input className='input-form' type="number" name="cel" id="cel" placeholder="Numero" onBlur={Verificar_tel} onChange={(e)=> setCel(e.target.value)}/>
                        <p id="wrongtel"></p>
                    </span>
                    <span>
                        <label for="email">Correo Electronico</label>
                        <input className='input-form' type="email" name="email" id="email" placeholder="Correo" onBlur={Verificar_email} onChange={(e) => setEmail(e.target.value)} />
                        <p id="wrongemail"></p>
                    </span>
                    
                    <span>
                        <label for="password">Contraseña</label>
                        <input className='input-form' type="password" name="password" id="password" placeholder="Contraseña" onKeyUp={Verificar_password} onBlur={Verificar_password} onChange={(e) => setPassword(e.target.value)}/>
                        <p id="wrongpass"></p>
                    </span>
                    <span>
                        <label for="passwordcheck">Confirmar Contraseña</label>
                        <input className='input-form' type="password" name="passwordcheck" id="passwordcheck" placeholder="Confirmar" onKeyUp={Verificar_passwordcheck} onBlur={Verificar_passwordcheck} />
                        <p id="wrongcheck"></p>
                    </span>
                    <span class="bloc">
                        <br/>
                        <input type="button" value="Registar" class="boton b4" name="submit" id="submit" onClick={Verificar_registro} />
                    </span>
                </form>
            </div>
        </div>
    </div>
  )
}