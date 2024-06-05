import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './login.css';
import ImagenLoginLeft from '../../assets/UI/Login/Login-part-1.png';
import ImagenLoginBG from '../../assets/UI/Login/Login-BG-part.png';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    const verifcarUser = async (event) => {
        event.preventDefault();
        try {
            console.log(username, ' xdd ', password);
            const peticion = await axios.post('http://localhost:3001/ingreso/autenticar', {
                idEntra: username,
                contrasenaEntra: password
            });
            console.log('autenticacion done');
            console.log('esta es la respuesta del server → ', peticion.data);

            if (peticion.data.ingreso) {
                localStorage.setItem("usuario", JSON.stringify(peticion.data));
                setUser(peticion.data);
                Swal.fire({
                    title: `¡Bienvenido!`,
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Aceptar',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            } else {
                Swal.fire({
                    title: 'Oops...',
                    text: 'El usuario o la contraseña son incorrectos.',
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Aceptar',
                });
            }
        } catch (error) {
            console.error('no autentico', error);
            Swal.fire({
                title: 'Oops...',
                text: 'No se pudo realizar la autenticacion, intente mas tarde',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar',
            });
        }
    };

    return (
        <div className="login__container">
            <img className="background-image" src={ImagenLoginBG} alt="Background" />
            <div className="content_Login">
                <div className="left__Container">
                    <img src={ImagenLoginLeft} alt="Left" />
                </div>
                <div className="right-container">
                    <div className="right-content">
                        <div className="right-title">
                            <span className='tittleRight_Login'>Iniciar Sesión</span>
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
                                        <input type="text" placeholder="Ingrese su ID" onChange={(e) => setUsername(e.target.value)} />
                                        <i className="bi bi-vr"></i>
                                    </div>
                                    <div className="input-container">
                                        <input type="password" placeholder="Ingrese su contraseña" onChange={(e) => setPassword(e.target.value)} />
                                        <i className="bi bi-lock"></i>
                                    </div>
                                </div>
                                <div className="buttonLogin_BTNS">
                                    <div className="nada"></div>
                                    <button type="submit" className="login-button">
                                        <i className="bi bi-arrow-right"></i>
                                    </button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
