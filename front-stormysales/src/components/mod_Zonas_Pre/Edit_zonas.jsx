import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Edit_zonas = ({ closeModal, datos, consulta }) => {
  const [nombreRuta, setNombreRuta] = useState(datos.Nombre_zona);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(datos.Id_empleado);
  const [clientesSeleccionados, setClientesSeleccionados] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [idZona, setIdZona] = useState(datos.Id_zona);
  const [idDetalleZonas, setIdDetalleZonas] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(5);

  useEffect(() => {
    console.log('Datos recibidos para editar:', datos);
    setNombreRuta(datos.Nombre_zona || '');
    setEmpleadoSeleccionado(datos.Id_empleado || '');
    setIdZona(datos.Id_zona || '');
    obtenerClientes();
    obtenerEmpleados();
    obtenerDetalleZonas(datos.Id_zona);
  }, [datos]);

  const obtenerClientes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/zonas/obclientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de clientes:', error);
    }
  };

  const obtenerEmpleados = async () => {
    try {
      const response = await axios.get('http://localhost:3001/zonas/usuariosrol2');
      setEmpleados(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de empleados:', error);
    }
  };

  const obtenerDetalleZonas = async (idZona) => {
    if (!idZona) {
      console.error('ID de zona no definido.');
      return;
    }

    try {
      console.log(`Obteniendo detalles de la zona para idZona: ${idZona}`);
      const response = await axios.get(`http://localhost:3001/zonas/detalleZona/${idZona}`);
      console.log('Respuesta de detalle de zonas:', response.data);
      const detalleZonas = {};
      const clientesEnZona = [];
      response.data.forEach(detalle => {
        detalleZonas[detalle.Id_cliente] = detalle.ID_detallezona;
        clientesEnZona.push(detalle.Id_cliente);
      });
      setIdDetalleZonas(detalleZonas);
      setClientesSeleccionados(clientesEnZona);
    } catch (error) {
      console.error('Error al obtener los detalles de la zona:', error);
    }
  };

  const handleEmpleadoChange = (e) => {
    setEmpleadoSeleccionado(e.target.value);
  };

  const handleSeleccionCliente = async (clienteId) => {
    try {
      const response = await axios.get(`http://localhost:3001/zonas/validarClienteEnZona/${idZona}/${clienteId}`);
      const { clienteAsociado } = response.data;

      if (clienteAsociado) {
        Swal.fire({
          icon: 'error',
          text: 'Este cliente ya está asociado con esta zona.',
          showCancelButton: true,
          confirmButtonText: 'Eliminar cliente',
          cancelButtonText: 'Cancelar',
        }).then(async (result) => {
          if (result.isConfirmed) {
            await eliminarCliente(clienteId, idZona);
          }
        });
      } else {
        const clienteYaSeleccionado = clientesSeleccionados.includes(clienteId);
        const nuevosClientesSeleccionados = clienteYaSeleccionado ? clientesSeleccionados.filter(id => id !== clienteId) : [...clientesSeleccionados, clienteId];
        setClientesSeleccionados(nuevosClientesSeleccionados);
      }
    } catch (error) {
      console.error('Error al validar el cliente en la zona:', error);
      Swal.fire({
        icon: 'error',
        text: 'Error al validar el cliente en la zona.',
      });
    }
  };

  const eliminarCliente = async (clienteId, idZona) => {
    try {
      await axios.delete(`http://localhost:3001/zonas/elininarcliente/${clienteId}`, { data: { idZona } });
 
      await obtenerDetalleZonas(idZona);
  
      Swal.fire({
        icon: 'success',
        text: 'El cliente ha sido eliminado de la zona correctamente.',
      }).then((result) => {
        if (result.isConfirmed) {
          consulta();
        }
      });
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
      Swal.fire({
        icon: 'error',
        text: 'Error al eliminar el cliente.',
      });
    }
  };
  

  const validarCampos = () => {
    if (!nombreRuta || !empleadoSeleccionado) {
      Swal.fire({
        icon: 'error',
        text: 'Por favor, complete todos los campos obligatorios.',
      });
      return false;
    }
    return true;
  };

  const editarZona = async () => {
    if (!validarCampos()) {
      return;
    }

    if (!idZona) {
      console.error('ID de zona no definido.');
      Swal.fire({
        icon: 'error',
        text: 'ID de zona no definido. No se puede actualizar la zona sin un ID válido.',
      });
      return;
    }

    try {
      const zonaData = {
        idZona: datos.Id_zona,
        Nombre_zona: nombreRuta,
        Id_empleado: empleadoSeleccionado
      };

      console.log('Datos a enviar para actualizar la zona:', zonaData);

      await axios.put(`http://localhost:3001/zonas/updatezona/${datos.Id_zona}`, {
        Nombre_zona: nombreRuta,
        Id_empleado: empleadoSeleccionado
      });

      for (let clienteId of clientesSeleccionados) {
        const idDetalleZona = idDetalleZonas[clienteId];
        console.log(`Id detalle zona --------------------->${idDetalleZona}`);
        if (!idDetalleZona) {
          const cliente = clientes.find(c => c.Identificacion_Clientes === clienteId);
          await axios.post(`http://localhost:3001/zonas/createzonadetail`, {
            idZona: idZona,
            idCliente: clienteId,
            direccion: cliente.direccion
          });
        } else {
          await axios.put(`http://localhost:3001/zonas/updateDetalleZona/${idDetalleZona}`, {
            idCliente: clienteId,
            direccion: clientes.find(c => c.Identificacion_Clientes === clienteId).direccion
          });
        }
      }

      consulta();
      closeModal();
      Swal.fire({
        icon: 'success',
        text: `Datos actualizados para la zona`,
      });
    } catch (error) {
      console.error('No se pudo realizar la petición:', error);
      Swal.fire({
        icon: 'error',
        text: 'Error al actualizar los datos de la zona',
      });
    }
  };

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = clientes.slice(indexOfFirstClient, indexOfLastClient);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
               <button type="button" className="Boton_cuadroRe-unique"><i className="biModal bi-pencil"></i></button>
            </div>
            <div className='BuscarRegis-unique'>
              <select
                value={empleadoSeleccionado}
                onChange={handleEmpleadoChange}
                className="text_cuadroRe-unique"
              >
                <option value="">Selecciona un Empleado</option>
                {empleados.map((empleado) => (
                  <option key={empleado.Identificacion_Usuario} value={empleado.Identificacion_Usuario}>
                    {empleado.nombre} {empleado.Apellido}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <h2 className="subtitulo-unique">Clientes y Direcciones</h2>
          {currentClients && (
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
                  {currentClients.map(cliente => (
                    <tr key={cliente.Identificacion_Clientes} className={clientesSeleccionados.includes(cliente.Identificacion_Clientes) ? "fila-seleccionada-unique" : ""}>
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
                          className={`botonAgregar-unique ${clientesSeleccionados.includes(cliente.Identificacion_Clientes) ? "agregado-unique" : ""}`}
                          onClick={() => handleSeleccionCliente(cliente.Identificacion_Clientes)}
                        >
                          {clientesSeleccionados.includes(cliente.Identificacion_Clientes) ? <i className="biSelect bi-x"></i> : <i className="biSelect bi-check2"></i>}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {clientes.length > clientsPerPage && (
            <div className="pagination">
              <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
              <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastClient >= clientes.length}>Siguiente</button>
            </div>
          )}
          <button className='guardar-btn-unique' onClick={editarZona}><i className="biGuar bi-floppy"></i>Guardar Ruta editada</button>
        </div>
      </div>
    </div>
  );
};

export default Edit_zonas;

