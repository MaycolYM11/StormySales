import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const RegisterProveedor = ({ isOpen, closeModal, reConsulta }) => {
  const [clientes, setClientes] = useState([]);
  const [rutas, setRutas] = useState([]);
  const [mostrarTablaClientes, setMostrarTablaClientes] = useState(false);
  const [mostrarTablaRutas, setMostrarTablaRutas] = useState(false);

  if (!isOpen) return null;

  const buscarClientes = () => {
    // Lógica para buscar clientes
    // axios.get(`http://localhost:3001/clientes`)
    //   .then(response => {
    //     setClientes(response.data);
    //   })
    //   .catch(error => {
    //     mostrarError('Error al buscar clientes', 'Ha ocurrido un error inesperado.');
    //   });

    // Ejemplo de datos para mostrar en la tabla de clientes
    setClientes([
      { id: 1, nombre: 'Cliente 1', direccion: 'Dirección 1', estado: 'Activo' },
      { id: 2, nombre: 'Cliente 2', direccion: 'Dirección 2', estado: 'Inactivo' },
    ]);
    setMostrarTablaClientes(true);
    setMostrarTablaRutas(false);
  };

  const buscarRutas = () => {
    // Lógica para buscar rutas
    // axios.get(`http://localhost:3001/rutas`)
    //   .then(response => {
    //     setRutas(response.data);
    //   })
    //   .catch(error => {
    //     mostrarError('Error al buscar rutas', 'Ha ocurrido un error inesperado.');
    //   });

    // Ejemplo de datos para mostrar en la tabla de rutas
    setRutas([
      { id: 1, ruta: 'Ruta 1' },
      { id: 2, ruta: 'Ruta 2' },
    ]);
    setMostrarTablaRutas(true);
    setMostrarTablaClientes(false);
  };

  const seleccionarCliente = (cliente) => {
    // Lógica para seleccionar un cliente de la tabla
    // Otras acciones según tu lógica...
  };

  const verificarRegistro = () => {
    // Lógica para verificar y enviar el registro
  };
  
  const mostrarError = (title, text) => {
    console.error(title + ': ' + text);
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
      toast: true
    });
  };

  return (
    <div className="registrar-contenedor">
      <div className="fondo-register">
        <div>
          <p onClick={closeModal}>X</p>
        </div>
        <div className="container__Main-register">
          <h1 className="tituloRegis">Nueva ruta</h1>
          <div className='BotonesSuperiorRegis'>
            <div className='BuscarRegis'>
              <h3>Escriba el nombre de la ruta</h3>
              <input type="text" id="inputBuscarCliente" name="buscar" className='text_cuadroRe' placeholder="Buscar..." />
              <button type="button" id="btnBuscarCliente" className='Boton_cuadroRe' onClick={buscarClientes}>Buscar Clientes</button>
            </div>
            <div className='BuscarRegis2'>
              <h3>Seleccione un empleado</h3>
              <input type="text" id="inputBuscarEmpleado" name="buscar" className='text_cuadroRe' placeholder="Buscar..." />
              <button type="button" id="btnBuscarEmpleado" className='Boton_cuadroRe' onClick={buscarRutas}>Buscar Rutas</button>
            </div>
          </div>
          {mostrarTablaClientes && (
            <div className='tabla-container'>
              <table className='tabla'>
                <thead>
                  <tr>
                    <th>ID Cliente</th>
                    <th>Nombre Cliente</th>
                    <th>Dirección</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map(cliente => (
                    <tr key={cliente.id}>
                      <td>{cliente.id}</td>
                      <td>{cliente.nombre}</td>
                      <td>{cliente.direccion}</td>
                      <td>{cliente.estado}</td>
                      <td>
                        <button onClick={() => seleccionarCliente(cliente)}>Seleccionar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {mostrarTablaRutas && (
            <div className='tabla-container'>
              <table className='tabla'>
                <thead>
                  <tr>
                    <th>ID Ruta</th>
                    <th>Ruta</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {rutas.map(ruta => (
                    <tr key={ruta.id}>
                      <td>{ruta.id}</td>
                      <td>{ruta.ruta}</td>
                      <td>
                        {/* Aquí puedes agregar botones de acción para las rutas */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterProveedor;
