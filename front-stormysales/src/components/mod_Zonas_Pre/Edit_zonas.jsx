import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Edit_zonas = ({ closeModal, datos, consulta }) => {
  const [nombreRuta, setNombreRuta] = useState('');
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState('');
  const [clientesSeleccionados, setClientesSeleccionados] = useState([]);
  const [clientes, setClientes] = useState([]); // Estado para almacenar la lista de clientes

  useEffect(() => {
    // Aquí puedes inicializar los campos con los datos recibidos
    setNombreRuta(datos.Nombre_zona);
    setEmpleadoSeleccionado(datos.Id_empleado);
    // Si tienes los clientes seleccionados disponibles en datos, también puedes inicializarlos
    // setClientesSeleccionados(datos.clientes);

    obtenerClientes(); // Llama a la función para obtener la lista de clientes
  }, [datos]);

  // Función para obtener la lista de clientes
  const obtenerClientes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/zonas/obclientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de clientes:', error);
    }
  };

  const handleEmpleadoChange = (e) => {
    setEmpleadoSeleccionado(e.target.value);
  };

  const handleSeleccionCliente = (cliente) => {
    // Verificar si el cliente ya está seleccionado
    const clienteIndex = clientesSeleccionados.findIndex(item => item.Identificacion_Clientes === cliente.Identificacion_Clientes);
    if (clienteIndex === -1) {
      // Agregar el cliente a la lista de seleccionados
      setClientesSeleccionados([...clientesSeleccionados, cliente]);
    } else {
      // Eliminar el cliente de la lista de seleccionados
      const nuevosClientesSeleccionados = [...clientesSeleccionados];
      nuevosClientesSeleccionados.splice(clienteIndex, 1);
      setClientesSeleccionados(nuevosClientesSeleccionados);
    }
  };

  const editarZona = async () => {
    try {
      // Aquí va la lógica para editar la zona
      const response = await axios.put(`http://localhost:3001/zonas/updatezona/${datos.Id_zona}`, {
        Nombre_zona: nombreRuta,
        Id_empleado: empleadoSeleccionado, // Ajusta según tus necesidades
        clientes: clientesSeleccionados // Ajusta según tus necesidades
      });
      consulta();
      closeModal();
      Swal.fire({
        icon: 'success',
        text: `Datos actualizados para la zona`,
      });
    } catch (error) {
      console.error('No se pudo realizar la petición PUT:', error);
      Swal.fire({
        icon: 'error',
        text: 'Error al actualizar los datos de la zona',
      });
    }
  };

  return (
    <div className="registrar-contenedor-unique">
      <div className="fondo-register-unique">
        <div className="cerrar-btn-unique">
          <p onClick={closeModal}>X</p>
        </div>
        <div className="container__Main-register-unique">
          <h1 className="tituloRegis-unique">Editar Ruta</h1>
          <div className='BotonesSuperiorRegis-unique'>
            <div className='BuscarRegis-unique'>
              <input
                type="text"
                value={nombreRuta}
                onChange={(e) => setNombreRuta(e.target.value)}
                placeholder="Nombre de la Ruta......"
                className="text_cuadroRe-unique"
              />
            </div>
            <div className='BuscarRegis-unique'>
              <select
                value={empleadoSeleccionado}
                onChange={handleEmpleadoChange}
                className="text_cuadroRe-unique"
              >
                <option value="">Selecciona un Empleado</option>
                {/* Aquí puedes mapear tus empleados */}
              </select>
            </div>
          </div>
          <h2 className="subtitulo-unique">Clientes y Direcciones</h2>
          {/* Muestra la lista de clientes si está definida */}
          {clientes && (
            <div className='tabla-container-unique'>
              <table className='tabla-unique'>
                <thead>
                  <tr>
                    <th>ID de Cliente</th>
                    <th>Nombre del Cliente</th>
                    <th>Dirección</th>
                    <th>Email</th>
                    <th>Estado</th>
                    <th>Seleccionar</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map(cliente => (
                    <tr key={cliente.Identificacion_Clientes}>
                      <td>{cliente.Identificacion_Clientes}</td>
                      <td>{cliente.nombre}</td>
                      <td>{cliente.direccion}</td>
                      <td>{cliente.email}</td>
                      <td>
                        <span className={cliente.Estado_Clientes === 2 ? "estado-unique activo-unique" : "estado-unique inactivo-unique"}>
                          {cliente.Estado_Clientes === 2 ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td>
                        <button
                          className={`botonAgregar-unique ${clientesSeleccionados.findIndex(item => item.Identificacion_Clientes === cliente.Identificacion_Clientes) !== -1 ? 'seleccionado' : ''}`}
                          onClick={() => handleSeleccionCliente(cliente)}
                        >
                          <i className="biSelect bi-check2"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <button className='guardar-btn-unique' onClick={editarZona}><i className="biGuar bi-floppy"></i>Guardar Ruta editada</button>
        </div>
      </div>
    </div>
  );
};

export default Edit_zonas;
