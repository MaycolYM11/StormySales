import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const EditSupervisor = ({ closeModal, datos, consulta }) => {
    const [name, setName] = useState(datos.name);
    const [password,setPassword] = useState(datos.contrasena);
    const [lastname, setLastname] = useState(datos.lastname);
    
    // const [cel, setCel] = useState(datos.tel);
    const [email, setEmail] = useState(datos.email);

    const editarRegistro = async (x) => {
        try {
            const response = await axios.put(`http://localhost:3001/usuario/putsupervisor/${x}`, {
                nombre: name,
                apellido: lastname,
                // cel: cel,
                email: email,
                contrasena: password
            });
            console.log(response.data);
            consulta(); 
            closeModal(); 
        } catch (err) {
            console.error('no se pudo hacer la petición put: ', err);
        }
    }


    //if(!isOpen) return null ;
    const consultaFuncion = () => {
        consulta();
    };

    function Verificar_nombre(){
        const Innombre1 = document.getElementById('name').value;

        let con=true;
        let validacionlt=/^[A-Za-z]+$/;

        if(Innombre1.trim() === ""){
            document.getElementById('wrongname').innerHTML='Este espacio no puede quedar en blanco';
            con=false;
            /*Innombre.focus();*/
        }else if(!validacionlt.test(Innombre1)){
            document.getElementById('wrongname').innerHTML='Digitar solo letras';
            con=false;
        }
        else{
            document.getElementById('wrongname').innerHTML='';
        }

        return con;
    }

    

    function Verificar_apell(){
        const Inapell1 = document.getElementById('apell').value;

        let con=true;
        let validacionlt=/^[A-Za-z]+$/;

        if(Inapell1.trim() === ""){
            document.getElementById('wrongapell').innerHTML='Este espacio no puede quedar en blanco';
            con=false;
        }else if(!validacionlt.test(Inapell1)){
            document.getElementById('wrongapell').innerHTML='Digitar solo letras';
            con=false;
        }else{
            document.getElementById('wrongapell').innerHTML='';
        }

        return con;
    }

    function Verificar_id(){
        const Inid = document.getElementById("numid").value;

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

    function Verificar_email() {
        const Inemail = document.getElementById('correo').value;

        let con = true;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (Inemail.trim()=== "") {
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
        
        //validacion de cantidad de caracteres
        if(!Verificar_id()){
            /*document.write('La contraseña debe ser mayor a 8 caracteres para preservar la seguridad');*/
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

        console.log(con);
        if(con){
            Swal.fire({
                icon:'success',
                text:'Datos Actualizados para: '+document.getElementById('name').value,
            }).then(function(){
                editarRegistro(datos.id);
                consultaFuncion();
                closeModal();
            })
            return true;

        }else{
            Swal.fire({
                icon:'warning',
                title:'Verifique y rellene los campos del formulario para continuar',
                toast:true
            })
            return false;
        }


    }

  return (
    <div className='register-container' >
        <div className='fondo-register'>
            <div>
                <p onClick={closeModal} >X</p>
            </div>
            <div className="container__Main-register">
            <h1 className='main-title'>Editar Usuario</h1>
            <form action="" className="datos-contenido">
                <span>
                    <label for="name">Nombre</label>
                    <input className='input-form' type="text" name="name" id="name" value={name} onChange={(e) => {setName(e.target.value)}} onBlur={Verificar_nombre} />
                    <p id="wrongname"></p>
                </span>
                <span>
                    <label for="apell">Apellido</label>
                    <input className='input-form' type="text" name="apell" id="apell" value={lastname} onChange={(e) => {setLastname(e.target.value)}}onBlur={Verificar_apell} />
                    <p id="wrongapell"></p>
                </span>
                
                
                <span>
                    <label for="numid">Número de Identificación</label>
                    <input readOnly className='input-form' type="text" name="numid" id="numid" value={datos.id} onBlur={Verificar_id} />
                    <p id="wrongid"></p>
                </span>

                <span>
                    <label for="email">correo</label>
                    <input className='input-form' type="email" name="email" id="correo" placeholder="correo" value={email} onBlur={Verificar_email} onChange={(e) => setEmail(e.target.value)}/>
                    <p id="wrongemail"></p>
                </span>

                <span>
                    <label for="password">Contraseña</label>
                    <input className='input-form' type="password" name="password" id="password" placeholder="Contraseña" value={password} onKeyUp={Verificar_password} onBlur={Verificar_password} onChange={(e) => setPassword(e.target.value)}/>
                    <p id="wrongpass"></p>
                </span>
                <span>
                    <label for="passwordcheck">Confirmar Contraseña</label>
                    <input className='input-form' type="password" name="passwordcheck" id="passwordcheck" placeholder="Confirmar" onKeyUp={Verificar_passwordcheck} onBlur={Verificar_passwordcheck} />
                    <p id="wrongcheck"></p>
                </span>
                <span>
                    <br/>
                    <button type="button" name="submit" id="submit" class="boton b4" onClick={Verificar_registro}>Guardar Cambios</button>
                </span>
            </form>
        </div>
        </div>
    </div>
  )
}

export default EditSupervisor