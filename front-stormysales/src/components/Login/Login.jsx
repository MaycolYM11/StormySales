import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './login.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser]=useState(null);

  const verifcarUser =async(event)=>{
      event.preventDefault();

      try {
          console.log(username,' xdd ',password);
          const peticion = await axios.post('http://localhost:3001/ingreso/autenticar',{
              idEntra:username,
              contrasenaEntra:password
          })
          console.log('autenticacion done');
          console.log('esta es la respuesta del server → ',peticion.data);

          if(peticion.data.ingreso){
              localStorage.setItem("usuario",JSON.stringify(peticion.data));
              setUser(peticion.data); 
              Swal.fire({
                  title: `¡Bienvenido!`,
                  icon: 'success',
                  showCancelButton: false,
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'Aceptar',
              }).then((result) => {
                  if(result.isConfirmed){
                      // <Navigate to='/dashboard' />
                      window.location.reload()
                      // if (result.isConfirmed) {
                          //     navigate('/layout')
                          // }
                  }
                  })
          }else {
              Swal.fire({
                  title: 'Oops...',
                  text: 'El usuario o la contraseña son incorrectos.',
                  icon: 'error',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'Aceptar',
              });
          }

          
      } catch (error) {
          console.error('no autentico',error);
          Swal.fire({
              title: 'Oops...',
              text: 'No se pudo realizar la autenticacion, intente mas tarde',
              icon: 'error',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar',
          })
      }
  }
  return (
      <div className="login__container">
          <div className="right-container">
              <div className="right-content">
                  <div className="right-title">
                      <span>Iniciar Sesión</span>
                      <span className="highlight">.</span>
                  </div>
                  <div className="right-subtitle">
                      <span>Inicie sesión con sus </span>
                      <span className="highlight">credenciales.</span>
                  </div>
                  <form className="login-form" onSubmit={verifcarUser}>
                      <div className="centered-container">
                          <div className="form-container">
                              <div className="input-container">
                                  <div>
                                      <span className="highlight form-title">ID de Usuario</span>
                                      <input type="text" placeholder="Ingrese su ID" onChange={(e) => setUsername(e.target.value)} />
                                  </div>
                              </div>
                              <div className="input-container">
                                  <div>
                                      <span className="highlight form-title">Contraseña</span>
                                      <input type="password" placeholder="Ingrese su contraseña" onChange={(e) => setPassword(e.target.value)} />
                                  </div>
                              </div>
                          </div>

                          <button type="submit" className="login-button">INICIAR SESIÓN</button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  );
};

export default Login;
