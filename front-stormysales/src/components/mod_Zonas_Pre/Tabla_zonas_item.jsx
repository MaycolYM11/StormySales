import React, { useEffect, useState } from 'react';
import Edit_zonas from './Edit_zonas';
import Swal from 'sweetalert2';
import axios from 'axios';

export const Tabla_zonas_item = ({ consulta, ...props }) => {

    const [estado, setEstado] = useState(props.Estado_zona === 'Activo' ? 1 : 0);
    const [mostrarEditForm, setMostrarEditForm] = useState(false);

    useEffect(() => {
        // Actualiza el estado del botón según el estado recibido
        setEstado(props.Estado_zona === 'Activo' ? 1 : 0);
    }, [props.Estado_zona]);

    const handleMostrarEdit = () => {
        setMostrarEditForm(!mostrarEditForm);
    }

    const confirmEstado = async (val) => {
        const newEstado = estado === 1 ? 0 : 1; // Cambia el estado actual

        Swal.fire({
            icon: 'warning',
            title: '<h2 style="color:yellow">¿Desea Cambiar de estado este registro?</h2>',
            background: '#252327',
            confirmButtonColor: '#f2bb15',
            confirmButtonText: newEstado === 1 ? 'Desactivar' : 'Activar', 
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            toast: true
        }).then(async (response) => {
            if (response.isConfirmed) {
                try {
                    await axios.put(`http://localhost:3001/zonas/rutas/cambioestadorutas/${val.Id_zona}`, {
                        state: newEstado
                    });

                    setEstado(newEstado); // Actualiza el estado local
                    consulta(); // Actualiza la tabla
                    Swal.fire({
                        title: "Actualizado!",
                        text: `Se cambió el estado de la Zona ${val.Nombre_zona}`,
                        icon: "success"
                    });
                } catch (error) {
                    console.error('No se pudo cambiar de estado en la función confirmEstado', error);
                    Swal.fire({
                        title: "Error!",
                        text: `No se pudo cambiar el estado de la Zona ${val.Nombre_zona}`,
                        icon: "error"
                    });
                }
            }
        });
    }

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
                    <h3>{props.Cantidad_rutas}</h3>
                </td>
                <td>
                    <h3>{props.Email}</h3>
                </td>
                <td className="actions-column">
                    <button type="button" id="edit" name="edit" className="botonAC" onClick={handleMostrarEdit}><i className="biAct bi-pencil-square"></i></button>
                    <button type="button" id="delete" name="delete" className="botonAC" onClick={() => confirmEstado(props)}>
                        <i className="biAct bi-toggles"></i>
                    </button>
                </td>

            </tr>
            {mostrarEditForm && <Edit_zonas closeModal={handleMostrarEdit} datos={props} consulta={consulta} />}
        </>
    )
}
