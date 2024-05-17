import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const EditProveedor = ({ closeModal, datos, consulta }) => {
  console.log('ID del Proveedor:', datos.id);

  const [nombreEmpresa, setNombreEmpresa] = useState(datos.name);
  const [diaVisita, setDiaVisita] = useState(datos.frecuency);
  const [telefonoContacto, setTelefonoContacto] = useState(datos.cel);

  const editarProveedor = async (idProveedor) => {
    try {
      const response = await axios.put(`http://localhost:3001/usuario/proveedor/${idProveedor}`, {
        Nombre_Empresa: nombreEmpresa,
        Dia_Visita: diaVisita,
        Telefono_Contacto: telefonoContacto,
      });
      console.log(response.data);
      consulta();
    } catch (error) {
      console.error('No se pudo realizar la petición PUT:', error);
    }
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

  const verificarDiaVisita = () => {
    const inputDiaVisita = diaVisita.trim();
    if (!inputDiaVisita) {
      mostrarErrorCampo('wrongDiaVisita', 'Este espacio no puede quedar en blanco');
      return false;
    }
    ocultarErrorCampo('wrongDiaVisita');
    return true;
  };

  const verificarTelefonoContacto = () => {
    const inputTelefonoContacto = telefonoContacto.trim();
    if (!inputTelefonoContacto) {
      mostrarErrorCampo('wrongTelefonoContacto', 'Este espacio no puede quedar en blanco');
      return false;
    }
    ocultarErrorCampo('wrongTelefonoContacto');
    return true;
  };

  const verificarTelefonoExistente = () => {
    const telefono = telefonoContacto.trim();
    axios.post('http://localhost:3001/usuario/verificar-telefono', { telefono })
      .then(response => {
        if (response.status === 200) {
          if (response.data.exists) {
            mostrarAlerta('warning', 'Número de teléfono duplicado', 'El número de teléfono ya existe en la base de datos.');
          } else {
            verificarRegistro();
          }
        } else {
          mostrarError('Error al verificar el número de teléfono', 'Ha ocurrido un error inesperado.');
        }
      })
      .catch(error => {
        mostrarError('Error al verificar el número de teléfono', 'Ha ocurrido un error al intentar verificar el número de teléfono.');
      });
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

  const verificarRegistro = () => {
    if (verificarNombreEmpresa() && verificarDiaVisita() && verificarTelefonoContacto()) {
      Swal.fire({
        icon: 'success',
        text: `Datos actualizados para: ${nombreEmpresa}`,
      }).then(function () {
        editarProveedor(datos.id);
        consulta(); 
        closeModal();
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Rellene los campos del formulario para continuar',
        toast: true,
      });
    }
  };

  const handleGuardarCambios = () => {
    if (telefonoContacto.trim() === datos.cel.trim()) {
      verificarRegistro();
    } else {
      verificarTelefonoExistente();
    }
  };

  return (
    <div className="register-container">
      <div className="fondo-register">
        <div>
          <p onClick={closeModal}>X</p>
        </div>
        <div className="container__Main-register">
          <h1 className="main-title">Editar Proveedor</h1>
          <form action="" className="datos-contenido">
            <span>
              <label htmlFor="idProveedor">Id Proveedor</label>
              <input
                className="input-form"
                type="text"
                name="idProveedor"
                id="idProveedor"
                value={datos.id}
                readOnly  
              />
            </span>
            <span>
              <label htmlFor="nombreEmpresa">Nombre de la Empresa</label>
              <input
                className="input-form"
                type="text"
                name="nombreEmpresa"
                id="nombreEmpresa"
                value={nombreEmpresa}
                onChange={(e) => setNombreEmpresa(e.target.value)}
                onBlur={verificarNombreEmpresa}
              />
              <p id="wrongNombreEmpresa"></p>
            </span>
            <span>
              <label htmlFor="diaVisita">Día de Visita</label>
              <input
                className="input-form"
                type="text"
                name="diaVisita"
                id="diaVisita"
                value={diaVisita}
                onChange={(e) => setDiaVisita(e.target.value)}
                onBlur={verificarDiaVisita}
              />
              <p id="wrongDiaVisita"></p>
            </span>
            <span>
              <label htmlFor="telefonoContacto">Teléfono de Contacto</label>
              <input
                className="input-form"
                type="number"
                name="telefonoContacto"
                id="telefonoContacto"
                value={telefonoContacto}
                onChange={(e) => setTelefonoContacto(e.target.value)}
              />
              <p id="wrongTelefonoContacto"></p>
            </span>
            <span>
              <br />
              <button type="button" name="submit" id="submit" className="boton b4" onClick={handleGuardarCambios}>
                Guardar Cambios
              </button>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProveedor;
