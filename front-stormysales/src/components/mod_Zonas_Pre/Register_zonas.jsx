import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const RegisterProveedor = ({ isOpen, closeModal, reConsulta }) => {
  const [idZona, setIdZona] = useState('');
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [estadoZona, setEstadoZona] = useState(true); // Valor predeterminado para el estado
  const [empleadoAsignado, setEmpleadoAsignado] = useState('');
  const [cantidadRutas, setCantidadRutas] = useState('');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const agregarRegistro = () => {
    axios.post('http://localhost:3001/zonas/rutas', {
      Id_zona: idZona,
      Nombre_zona: nombreEmpresa,
      Estado_zona: estadoZona,
      Empleado_asignado: empleadoAsignado,
      Cantidad_rutas: cantidadRutas,
      Email: email,
    })
    .then(response => {
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          text: `Proveedor registrado correctamente: ${nombreEmpresa}`,
        }).then(() => {
          reConsulta();
          closeModal();
        });
      } else {
        mostrarError('Error al registrar proveedor', response.data.error || 'Ha ocurrido un error inesperado.');
      }
    })
    .catch(error => {
      mostrarError('Error al registrar proveedor', 'Ha ocurrido un error inesperado.');
    });
  };

  const verificarIdZona = () => {
    const inputIdZona = idZona.trim();
    if (!inputIdZona) {
      mostrarErrorCampo('wrongIdZona', 'Este espacio no puede quedar en blanco');
      return false;
    }
    ocultarErrorCampo('wrongIdZona');
    return true;
  };

  const verificarNombreEmpresa = () => {
    const inputNombreEmpresa = nombreEmpresa.trim();
    if (!inputNombreEmpresa) {
      mostrarErrorCampo('wrongNombreEmpresa', 'Este espacio no puede quedar en blanco');
      return false;
    }
    ocultarErrorCampo('wrongNombreEmpresa');
    return true;
  };

  const verificarRegistro = () => {
    if (verificarIdZona() && verificarNombreEmpresa()) {
      agregarRegistro();
    } else {
      mostrarAlerta('warning', 'Rellene los campos del formulario para continuar');
    }
  };
  
  const mostrarAlerta = (icon, title, text = '', toast = true) => {
    Swal.fire({
      icon,
      title,
      text,
      toast,
    });
  };

  const mostrarError = (title, text) => {
    console.error(title + ': ' + text);
    mostrarAlerta('error', title, text);
  };

  const mostrarErrorCampo = (campo, mensaje) => {
    document.getElementById(campo).textContent = mensaje;
  };

  const ocultarErrorCampo = (campo) => {
    document.getElementById(campo).textContent = '';
  };

  return (
    <div className="register-container">
      <div className="fondo-register">
        <div>
          <p onClick={closeModal}>X</p>
        </div>
        <div className="container__Main-register">
          <h1 className="main-title">Registrar Proveedor</h1>
          <form action="" className="datos-contenido">
            <span>
              <label htmlFor="idZona">ID Zona</label>
              <input
                className="input-form"
                type="text"
                name="idZona"
                id="idZona"
                placeholder="ID Zona"
                onBlur={verificarIdZona}
                onChange={(e) => setIdZona(e.target.value)}
              />
              <p id="wrongIdZona"></p>
            </span>
            <span>
              <label htmlFor="nombreEmpresa">Nombre de la Empresa</label>
              <input
                className="input-form"
                type="text"
                name="nombreEmpresa"
                id="nombreEmpresa"
                placeholder="Nombre de la Empresa"
                onBlur={verificarNombreEmpresa}
                onChange={(e) => setNombreEmpresa(e.target.value)}
              />
              <p id="wrongNombreEmpresa"></p>
            </span>
            <span>
              <label htmlFor="estadoZona">Estado de la Zona</label>
              <select
                className="input-form"
                name="estadoZona"
                id="estadoZona"
                onChange={(e) => setEstadoZona(e.target.value)}
              >
                <option value={true}>Activo</option>
                <option value={false}>Inactivo</option>
              </select>
            </span>
            <span>
              <label htmlFor="empleadoAsignado">Empleado Asignado</label>
              <input
                className="input-form"
                type="text"
                name="empleadoAsignado"
                id="empleadoAsignado"
                placeholder="Empleado Asignado"
                onChange={(e) => setEmpleadoAsignado(e.target.value)}
              />
            </span>
            <span>
              <label htmlFor="cantidadRutas">Cantidad de Rutas</label>
              <input
                className="input-form"
                type="text"
                name="cantidadRutas"
                id="cantidadRutas"
                placeholder="Cantidad de Rutas"
                onChange={(e) => setCantidadRutas(e.target.value)}
              />
            </span>
            <span>
              <label htmlFor="email">Email</label>
              <input
                className="input-form"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </span>
            <span>
              <br />
              <button
                type="button"
                name="submit"
                id="submit"
                className="boton b4"
                onClick={verificarRegistro}
              >
                Registrar
              </button>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterProveedor;
