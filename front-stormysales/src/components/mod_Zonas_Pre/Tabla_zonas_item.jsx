import React, { useEffect, useState } from 'react';
import Edit_zonas from './Edit_zonas';
import Swal from 'sweetalert2';
import axios from 'axios';
import './Tablas.css'; 

export const Tabla_zonas_item = ({ consulta, ...props }) => {
  const [estado, setEstado] = useState(props.Estado_zona === 'Activo' ? 1 : 2);
  const [mostrarEditForm, setMostrarEditForm] = useState(false);
  const [idDetalleZona, setIdDetalleZona] = useState('');
  const [mostrarModalRutasInfo, setMostrarModalRutasInfo] = useState(false); 
  const [rutas, setRutas] = useState([]); 

  useEffect(() => {
    setEstado(props.Estado_zona === 'Activo' ? 1 : 2);
  }, [props.Estado_zona]);

  const handleMostrarEdit = async () => {
    setMostrarEditForm(!mostrarEditForm);
    await consulta(); 
  };

  const confirmEstado = async (val, newEstado) => {
    try {
      console.log('ID de la zona:', val.Id_zona);

      const confirmacion = await Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Quieres cambiar el estado de ${val.Nombre_zona}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4542ab',
        cancelButtonColor: '#000000',
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar'
      });

      if (confirmacion.isConfirmed) {
        const response = await axios.put(`http://localhost:3001/zonas/cambioestadorutas/${val.Id_zona}`, {
          state: newEstado
        });
        console.log('Respuesta de la solicitud axios:', response);
        setEstado(newEstado);
        await consulta(); 

        setIdDetalleZona(val.idDetalleZona || '');

        Swal.fire({
          title: "Actualizado!",
          text: `Se cambió el estado de la ${val.Nombre_zona}`,
          icon: "success"
        });
      }
    } catch (error) {
      console.error('No se pudo cambiar de estado en la función confirmEstado', error);
      Swal.fire({
        title: "Error!",
        text: `No se pudo cambiar el estado de la ${val.Nombre_zona}`,
        icon: "error"
      });
    }
  };

  const obtenerInfoRuta = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/zonas/rutaInfo/${props.Id_zona}`);
      setRutas(response.data);
      setMostrarModalRutasInfo(true);
    } catch (error) {
      console.error('Error al obtener información de la ruta:', error);
    }
  };

  return (
    <>
      <tr>
        <td className="id-zona-column">
          <h3>{props.Id_zona}</h3>
        </td>
        <td>
          <h3>{props.Nombre_zona}</h3>
        </td>
        <td>
          <h3 className={estado === 1 ? 'estado activo' : 'estado inactivo'}>{estado === 1 ? 'Activo' : 'Inactivo'}</h3>
        </td>
        <td className="Empleado_asignado-column">
          <h3>{props.Empleado_asignado}</h3>
        </td>
        <td className="cantidad-rutas-column">
          <h3>{props.Cantidad_rutas}<button type='button' className='BotonRutas' onClick={obtenerInfoRuta}><i className="biRutas bi-info-circle"></i></button></h3>
          {mostrarModalRutasInfo && (
            <div className="modal-container-editInfo">
              <div className="modal-content-editInfo">
                <div className="modal-header-edit">
                  <h1 className='tituloRegis-info'>Detalle de la zona</h1>
                  <button className="close-button-edit" onClick={() => { setMostrarModalRutasInfo(false); setRutas([]); }}>X</button>
                </div>
                <hr />
                <div className="tabla-container-uniqueInfo">
                  <table className="tabla-unique">
                    <thead>
                      <tr>
                        <th>ID Cliente</th>
                        <th>Nombre Cliente</th>
                        <th>Dirección Cliente</th>
                        <th>Correo Cliente</th>
                        <th>Empleado Asignado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rutas.map((ruta, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'fila-seleccionada-unique' : ''}>
                          <td className='InfoM'>{ruta.Id_cliente}</td>
                          <td>{ruta.nombre}</td>
                          <td className='InfoM'>{ruta.direccion}</td>
                          <td>{ruta.email}</td>
                          <td>{ruta.NombreEmpleado} {ruta.ApellidoEmpleado}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </td>
        <td>
          <h3>{props.Email}</h3>
        </td>
        <td className="actions-column">
          <button type="button" id="edit" name="edit" className="botonAC" onClick={handleMostrarEdit}><i className="biAct bi-pencil-square"></i></button>
          <button type="button" id="delete" name="delete" className="botonAC" onClick={() => confirmEstado(props, estado)}>
            {estado === 1 ? <i className="biAct bi-toggle-on"></i> : <i className="biAct bi-toggle-off"></i>}
          </button>
        </td>
      </tr>
      {mostrarEditForm && <Edit_zonas closeModal={handleMostrarEdit} datos={{...props, idZona: props.Id_zona, idDetalleZona: idDetalleZona}} consulta={consulta} />}
    </>
  );
}
