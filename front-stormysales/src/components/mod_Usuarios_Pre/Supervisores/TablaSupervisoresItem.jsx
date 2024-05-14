import React, { useEffect, useState } from 'react';
import '../Tabla.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import EditSupervisor from './EditSupervisor';

export const TablaAdminItem = (props) => {
    const [textoActivar, setTextoActivar] = useState('');
    const [mostrarEditForm, setMostrarEditForm] = useState(false);
    const [estado, setEstado] = useState(parseInt(props.idEstado));

    useEffect(() => {
        ponerTexto();
    }, [estado]);

    const ponerTexto = () => {
        if (estado === 2) {
            setTextoActivar('Desactivar');
        } else if (estado === 1) {
            setTextoActivar('Activar');
        }
    }

    const handleMostrarEdit = () => {
        setMostrarEditForm(!mostrarEditForm);
    }

    const confirmDelete = (val) => {
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
                const newEstado = estado === 2 ? 1 : 2;
                try {
                    const apiUrl = `http://localhost:3001/usuario/${newEstado === 2 ? 'activarsupervisor' : 'desactivarsupervisor'}/${val.id}`;
                    const result = await axios.put(apiUrl, { "state": newEstado });
                    
                    if (result.data.continue || newEstado === 2) {
                        Swal.fire({
                            title: "Actualizado!",
                            text: `Se cambio el estado del Gerente ${val.name}`,
                            icon: "success"
                        });
                    }else if (result.data.continue || newEstado === 1) {
                            Swal.fire({
                                title: "Actualizado!",
                                text: `Se cambio el estado del Gerente ${val.name}`,
                                icon: "success"
                            });
                    }else {
                        Swal.fire({
                            title: "No Actualizado!",
                            text: `No se cambio el estado del Gerente ${val.name1}`,
                            icon: "error"
                        });
                    }
                    
                    setEstado(newEstado);
                    props.consulta();
                } catch (error) {
                    console.error('No se pudo cambiar de estado en la función confirmDelete', error);
                }
            }
        });
    }

    return (
        <>
            <tr>
                <td>
                    <h3>{props.name + " " + props.lastname}</h3>
                </td>
                <td>
                    <h3>{props.id}</h3>
                </td>
                <td>
                    <h3>{props.estado}</h3>
                </td>
                <td>
                    <button type="button" id="edit" name="edit" className="boton b1" onClick={handleMostrarEdit}>Editar</button>
                    <button type="button" id="delete" name="delete" className="boton b2" onClick={() => confirmDelete(props)}>{textoActivar}</button>
                </td>
            </tr>
            {mostrarEditForm && <EditSupervisor closeModal={handleMostrarEdit} datos={props} consulta={props.consulta} />}
        </>
    );
}
