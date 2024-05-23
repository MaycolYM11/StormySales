import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const EditProveedor = ({ closeModal, datos, consulta }) => {
  const [nombreZona, setNombreZona] = useState(datos.Nombre_zona); // Cambiado a nombreZona para coincidir con el controlador
  const [idEmpleadoAsignado, setIdEmpleadoAsignado] = useState(datos.Id_empleado_asignado); // Cambiado a idEmpleadoAsignado para coincidir con el controlador
  const [cantidadRutas, setCantidadRutas] = useState(datos.Cantidad_rutas);
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    obtenerEmpleados();
  }, []);

  const obtenerEmpleados = async () => {
    try {
      const response = await axios.get('http://localhost:3001/zonas/usuariosrol2');
      setEmpleados(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de empleados:', error);
    }
  };

  const editarZona = async (idZona) => {
    try {
      const response = await axios.put(`http://localhost:3001/zonas/${idZona}`, {
        Nombre_zona: nombreZona, // Cambiado a Nombre_zona para coincidir con el controlador
        Id_empleado_asignado: idEmpleadoAsignado, // Cambiado a Id_empleado_asignado para coincidir con el controlador
        Cantidad_rutas: cantidadRutas,
      });
      console.log(response.data);
      consulta();
    } catch (error) {
      console.error('No se pudo realizar la petición PUT:', error);
    }
  };

  const handleGuardarCambios = () => {
    if (verificarDatos()) {
      Swal.fire({
        icon: 'success',
        text: `Datos actualizados para: ${nombreZona}`,
      }).then(function () {
        editarZona(datos.ID_zona);
        closeModal();
      });
    }
  };

  const verificarDatos = () => {
    if (!nombreZona.trim() || !idEmpleadoAsignado || !cantidadRutas) {
      mostrarAlerta('warning', 'Rellene todos los campos del formulario para continuar.');
      return false;
    }
    return true;
  };

  const mostrarAlerta = (icon, text) => {
    Swal.fire({
      icon: icon,
      text: text,
    });
  };

  return (
    <div className="register-container">
      <div className="fondo-register">
        <div>
          <p onClick={closeModal}>X</p>
        </div>
        <div className="container__Main-register">
          <h1 className="main-title">Editar Zona</h1>
          <form action="" className="datos-contenido">
            <span>
              <label htmlFor="nombreZona">Nombre de la Zona</label>
              <input
                className="input-form"
                type="text"
                name="nombreZona"
                id="nombreZona"
                value={nombreZona}
                onChange={(e) => setNombreZona(e.target.value)}
              />
            </span>
            <span>
              <label htmlFor="idEmpleadoAsignado">Empleado Asignado</label>
              <select
                className="input-form"
                name="idEmpleadoAsignado"
                id="idEmpleadoAsignado"
                value={idEmpleadoAsignado}
                onChange={(e) => setIdEmpleadoAsignado(e.target.value)}
              >
                <option value="">Seleccione un empleado</option>
                {empleados.map((empleado) => (
                  <option key={empleado.Identificacion_Usuario} value={empleado.Identificacion_Usuario}>
                    {empleado.nombre} {empleado.Apellido}
                  </option>
                ))}
              </select>
            </span>
            <span>
              <label htmlFor="cantidadRutas">Cantidad de Rutas</label>
              <input
                className="input-form"
                type="number"
                name="cantidadRutas"
                id="cantidadRutas"
                value={cantidadRutas}
                onChange={(e) => setCantidadRutas(e.target.value)}
              />
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
