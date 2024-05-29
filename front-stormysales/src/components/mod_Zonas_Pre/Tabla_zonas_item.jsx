import React, { useEffect, useState } from 'react';
import Edit_zonas from './Edit_zonas';
import Swal from 'sweetalert2';
import axios from 'axios';
import './Tablas.css'; // Importa los estilos

export const Tabla_zonas_item = ({ consulta, ...props }) => {
  const [estado, setEstado] = useState(props.Estado_zona === 'Activo' ? 1 : 2);
  const [mostrarEditForm, setMostrarEditForm] = useState(false);

  useEffect(() => {
    setEstado(props.Estado_zona === 'Activo' ? 1 : 2);
  }, [props.Estado_zona]);

  const handleMostrarEdit = async () => {
    setMostrarEditForm(!mostrarEditForm);
    await consulta(); // Llama a consulta después de mostrar el formulario de edición
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
        await consulta(); // Llama a consulta después de cambiar el estado
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
          <h3 className={estado === 1 ? 'activo' : 'inactivo'}>{estado === 1 ? 'Activo' : 'Inactivo'}</h3>
        </td>
        <td className="Empleado_asignado-column">
          <h3>{props.Empleado_asignado}</h3>
        </td>
        <td className="cantidad-rutas-column">
          <h3>{props.Cantidad_rutas}<button type='button' className='BotonRutas'><i className="biRutas bi-list"></i></button></h3>
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
      {mostrarEditForm && <Edit_zonas closeModal={handleMostrarEdit} datos={props} consulta={consulta} />}
    </>
  );
}
