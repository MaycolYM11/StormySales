import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Tablas.css'; 

const RegisterProveedor = ({ isOpen, closeModal, reConsulta }) => {
  const [clientes, setClientes] = useState([]);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [nombreRuta, setNombreRuta] = useState('');
  const [buscarCliente, setBuscarCliente] = useState('');
  const [empleados, setEmpleados] = useState([]);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState('');
  const [zonaId, setZonaId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      obtenerClientes();
      obtenerEmpleados();
    }
  }, [isOpen]);

  useEffect(() => {
    if (buscarCliente === '') {
      setClientesFiltrados(clientes);
    } else {
      const filteredClients = clientes.filter(cliente =>
        cliente.nombre.toLowerCase().includes(buscarCliente.toLowerCase()) ||
        cliente.Identificacion_Clientes.toString().includes(buscarCliente)
      );
      setClientesFiltrados(filteredClients);
    }
  }, [buscarCliente, clientes]);

  const obtenerClientes = () => {
    axios.get('http://localhost:3001/zonas/obclientes')
      .then(response => {
        setClientes(response.data);
        setClientesFiltrados(response.data);
      })
      .catch(error => {
        mostrarError('Error al obtener clientes', 'Ha ocurrido un error inesperado.');
      });
  };

  const obtenerEmpleados = () => {
    axios.get('http://localhost:3001/zonas/usuariosrol2')
      .then(response => {
        setEmpleados(response.data);
      })
      .catch(error => {
        mostrarError('Error al obtener empleados', 'Ha ocurrido un error al obtener la lista de empleados.');
      });
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

  const seleccionarCliente = (clienteId) => {
    setClientes(
      clientes.map(cliente => 
        cliente.Identificacion_Clientes === clienteId ? { ...cliente, seleccionado: !cliente.seleccionado } : cliente
      )
    );
  };

  const validarCampos = () => {
    if (nombreRuta.trim() === '' || empleadoSeleccionado === '' || !clientes.some(cliente => cliente.seleccionado)) {
      mostrarError('Campos incompletos', 'Por favor, complete todos los campos y seleccione al menos un cliente.');
      return false;
    }
    return true;
  };

  const guardarRutas = async () => {
    if (!validarCampos()) {
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3001/zonas/createzona', {
        Nombre_zona: nombreRuta,
        Id_empleado: empleadoSeleccionado
      });
      const zonaId = response.data.insertId;
  
      if (!zonaId) {
        mostrarError('Error al obtener ID de zona', 'El ID de la zona creada no es válido.');
        return;
      }
  
      await Promise.all(clientes.filter(cliente => cliente.seleccionado).map(async (cliente) => {
        await axios.post('http://localhost:3001/zonas/createzonadetail', {
          idZona: zonaId,
          idCliente: cliente.Identificacion_Clientes,
          direccion: cliente.direccion
        });
      }));
      setNombreRuta('');
      setEmpleadoSeleccionado('');
      setBuscarCliente('');
      setClientes(clientes.map(cliente => ({ ...cliente, seleccionado: false })));
      Swal.fire({
        icon: 'success',
        title: 'Rutas guardadas',
        text: 'Se han guardado las rutas correctamente.'
      }).then(() => {
        closeModal();
        reConsulta();
      });
    } catch (error) {
      mostrarError('Error al guardar rutas', 'Ha ocurrido un error al intentar guardar las rutas.');
    }
  };
  return (
    <div className={`registrar-contenedor-unique ${isOpen ? 'visible' : 'hidden'}`}>
      <div className="fondo-register-unique">
        <div className="cerrar-btn-unique">
          <p onClick={closeModal}>X</p>
        </div>
        <div className="container__Main-register-unique">
          <h1 className="tituloRegis-unique">Nueva Ruta</h1>
          <div className='BotonesSuperiorRegis-unique'>
            <div className='BuscarRegis-unique'>
              <input 
                type="text" 
                value={nombreRuta} 
                onChange={(e) => setNombreRuta(e.target.value)} 
                placeholder="Nombre de la Ruta......" 
                className="text_cuadroRe-unique"
              />
              <button type="button" className="Boton_cuadroRe-unique"><i class="biModal bi-pencil"></i></button>
            </div>
            <div className='BuscarRegis-unique'>
              <input 
                type="text" 
                value={buscarCliente} 
                onChange={(e) => setBuscarCliente(e.target.value)} 
                placeholder="Buscar un Cliente......"    
                className="text_cuadroRe-unique"/>
              <button type="button" className="Boton_cuadroRe-unique"><i class="biModal bi-search"></i></button>
            </div>
            <div className='BuscarRegis-unique'>
              <select 
                value={empleadoSeleccionado} 
                onChange={(e) => setEmpleadoSeleccionado(e.target.value)} 
                className="text_cuadroRe-unique"
              >
                <option value="">Selecciona un Empleado</option>
                {empleados.map(empleado => (
                  <option key={empleado.Identificacion_Usuario} value={empleado.Identificacion_Usuario}>
                    {empleado.nombre} {empleado.Apellido}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <h2 className="subtitulo-unique">Clientes y Direcciones</h2>
          <div className='tabla-container-unique'>
            {clientesFiltrados.length === 0 ? (
              <p>No se encontraron resultados.</p>
            ) : (
              <table className='tabla-unique'>
                <thead>
                  <tr>
                    <th>ID de Cliente</th>
                    <th>Nombre del Cliente</th>
                    <th>Apellido</th>
                    <th>Dirección</th>
                    <th>Email</th>
                    <th>Estado</th>
                    <th>Agregar</th>
                  </tr>
                </thead>
                <tbody>
                  {clientesFiltrados.map(cliente => (
                    <tr key={cliente.Identificacion_Clientes} className={cliente.seleccionado ? "fila-seleccionada-unique" : ""}>
                      <td className='Idclientcss'>{cliente.Identificacion_Clientes}</td>
                      <td>{cliente.nombre}</td>
                      <td>{cliente.Apellido}</td>
                      <td>{cliente.direccion}</td>
                      <td>{cliente.email}</td>
                      <td>
                        <span className={cliente.Estado_Clientes === 2 ? "estado-unique activo-unique" : "estado-unique inactivo-unique"}>
                          {cliente.Estado_Clientes === 2 ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td>
                        <button 
                          className={`botonAgregar-unique ${cliente.seleccionado ? "agregado-unique" : ""}`} 
                          onClick={() => seleccionarCliente(cliente.Identificacion_Clientes)}
                        >
                          {cliente.seleccionado ? <i className="biSelect bi-x"></i> : <i className="biSelect bi-check2"></i>}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <button className='guardar-btn-unique' onClick={guardarRutas}><i className="biGuar bi-floppy"></i>Guardar Ruta</button>
        </div>
      </div>
    </div>
  );
};

export default RegisterProveedor;

