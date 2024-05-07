import React, { useEffect, useState } from 'react';
import Edit_zonas from './Edit_zonas';
import Swal from 'sweetalert2';
import axios from 'axios';

export const Tabla_zonas_item = ({ consulta, ...props }) => {

    const [estado, setEstado] = useState(props.Estado_zona === 'Activo' ? 1 : 0);
    const [textoActivar, setTextoActivar] = useState(props.Estado_zona === 'Activo' ? 'Desactivar' : 'Activar');
    const [mostrarEditForm, setMostrarEditForm] = useState(false); 

    useEffect(() => {
        ponerTexto();
    }, [estado]);

    const ponerTexto = () => {
        if (estado === 1) {
            setTextoActivar('Desactivar');
        } else if (estado === 0) {
            setTextoActivar('Activar');
        }
    }

    const handleMostrarEdit = () => {
        setMostrarEditForm(!mostrarEditForm);
    }

    function confirmDelete(val) {
        let newEstado;
        if (estado === 1) {
            newEstado = 0;
        } else if (estado === 0) {
            newEstado = 1;
        }

        Swal.fire({
            icon: 'warning',
            title: '<h2 style="color:yellow">¿Desea Cambiar de estado este registro?</h2>',
            background: '#252327',
            confirmButtonColor: '#f2bb15',
            confirmButtonText: textoActivar, 
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            toast: true
        }).then(async response => {
            if (response.isConfirmed) {
                try {
                    await axios.put(`http://localhost:3001/zonas/rutas/${val.Id_zona}`, {
                        "state": newEstado
                    }).then(() => {
                        setEstado(newEstado); // Mover la actualización del estado aquí
                        ponerTexto(); // Actualizar el texto del botón
                        Swal.fire({
                            title: "Actualizado!",
                            text: `Se cambio el estado del Gerente ${val.Nombre_zona}`,
                            icon: "success"
                        });
                        consulta(); 
                    })
                } catch (error) {
                    console.error('no se pudo cambiar de estado en la funcion confirmdelete', error);
                }
            }
        })
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
                    <h3 className={estado === 1 ? 'activo' : 'inactivo'}>{props.Estado_zona}</h3>
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
                    <button type="button" id="edit" name="edit" className="boton b1" onClick={handleMostrarEdit}>Editar</button>
                    <button type="button" id="delete" name="delete" className="boton b2" onClick={() => { confirmDelete(props) }}>{textoActivar}</button>
                </td>

            </tr>
            {mostrarEditForm && <Edit_zonas closeModal={handleMostrarEdit} datos={props} consulta={consulta} />}
        </>
    )
}
