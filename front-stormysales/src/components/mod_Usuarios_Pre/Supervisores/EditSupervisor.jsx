import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const EditAdmin = ({ closeModal, datos, consulta }) => {
    const [name1, setName1] = useState(datos.name1);
    const [name2, setName2] = useState(datos.name2);
    const [lastname1, setLastname1] = useState(datos.lastname1);
    const [lastname2, setLastname2] = useState(datos.lastname2);
    const [cel, setCel] = useState(datos.tel);
    const [email, setEmail] = useState(datos.email);

    const editarRegistro = async (x) => {
        try {
            const response = await axios.put(`http://localhost:3001/usuario/Update/${x}`, {
                name1: name1,
                name2: name2,
                lastname1: lastname1,
                lastname2: lastname2,
                cel: cel,
                email: email,
                contrasena: datos.contrasena
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
            if(TipoId==='1' || TipoId==='4'){
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


        console.log(con);
        if(con){
            Swal.fire({
                icon:'success',
                text:'Datos Actualizados para: '+document.getElementById('name1').value,
            }).then(function(){
                editarRegistro(datos.id);
                consultaFuncion();
                closeModal();
            })
            return true;

        }else{
            Swal.fire({
                icon:'warning',
                title:'Rellene los campos del formulario para continuar',
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
                    <label for="name1">Primer Nombre</label>
                    <input className='input-form' type="text" name="name1" id="name1" value={name1} onChange={(e) => {setName1(e.target.value)}} onBlur={Verificar_nombre1} />
                    <p id="wrongname1"></p>
                </span>
                <span>
                    <label for="name2">Segundo Nombre</label>
                    <input className='input-form' type="text" name="name2" id="name2" value={name2} onChange={(e) => {setName2(e.target.value)}} onBlur={Verificar_nombre2} />
                    <p id="wrongname2"></p>
                </span>
                <span>
                    <label for="apell1">Primer Apellido</label>
                    <input className='input-form' type="text" name="apell1" id="apell1" value={lastname1} onChange={(e) => {setLastname1(e.target.value)}}onBlur={Verificar_apell1} />
                    <p id="wrongapell1"></p>
                </span>
                <span>
                    <label for="apell2">Segundo Apellido</label>
                    <input className='input-form' type="text" name="apell2" id="apell2" value={lastname2} onChange={(e) => {setLastname2(e.target.value)}}onBlur={Verificar_apell2} />
                    <p id="wrongapell2"></p>
                </span>
                <span>
                    <label for="tipoid">Tipo de Identificación</label>
                    <input readOnly className='input-form' type="text" name="tipoid" id="tipoid" value={datos.tipoId} onBlur={Verificar_tipoid} />
                    {/* <select className='input-form' name="tipoid" id="tipoid" onBlur={Verificar_tipoid} value={tipoid}>
                        <option value="0">Seleccionar</option>
                        <option value="1">Cedula de Ciudadania</option>
                        <option value="2">Cedula Extranjera</option>
                        <option value="3">Pasaporte</option>
                        <option value="4">Tarjeta de identidad</option>
                    </select> */}
                    <p id="wrongtipoid"></p>
                </span>
                <span>
                    <label for="numid">Número de Identificación</label>
                    <input readOnly className='input-form' type="text" name="numid" id="numid" value={datos.id} onBlur={Verificar_id} />
                    <p id="wrongid"></p>
                </span>
                <span>
                    <label for="cel">Numero de Telefono</label>
                    <input className='input-form' type="number" name="cel" id="cel" value={cel} onChange={(e) => {setCel(e.target.value)}} onBlur={Verificar_tel} />
                    <p id="wrongtel"></p>
                </span>
                <span>
                    <label for="cel">Correo electronico</label>
                    <input className='input-form' type="email" name="email" id="email" value={email} onChange={(e) => {setEmail(e.target.value)}} onBlur={Verificar_email} />
                    <p id="wrongemail"></p>
                </span>

                {/*<label for="estado">Estado</label>
                <table class="casillaedit">
                    <tr>
                        <td>Activo</td>
                    </tr>
                </table>
                <select name="estado" id="estado">
                    <option value="0">Seleccionar</option>
                    <option value="1">Activo</option>
                    <option value="2">Inactivo</option>
                </select>
                <br>*/}
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

export default EditAdmin