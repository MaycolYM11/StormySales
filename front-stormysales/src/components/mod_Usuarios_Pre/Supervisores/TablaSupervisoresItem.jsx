import React, { useEffect, useState } from 'react';
import '../blata.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import EditSupervisor from './EditSupervisor';

export const TablaSupervisoresItem = (props) => {
    const [textoActivar, setTextoActivar] = useState('');
    const [mostrarEditForm, setMostrarEditForm] = useState(false);
    const [estado, setEstado] = useState(parseInt(props.idEstado));

    useEffect(() => {
        ponerTexto();
    }, [estado]);

    const ponerTexto = () => {
        if (estado === 2) {
            setTextoActivar('off');
        } else if (estado === 1) {
            setTextoActivar('on');
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
                let newEstado = estado === 2 ? 1 : 2;
                try {
                    const apiUrl = `http://localhost:3001/usuario/${newEstado === 2 ? 'activarsupervisor' : 'desactivarsupervisor'}/${val.id}`;
                    await axios.put(apiUrl, { "state": newEstado })
                    .then(result => {
                        if (result.data.continue) {
                            Swal.fire({
                                title: "Actualizado!",
                                text: `Se cambio el estado del Gerente ${val.name}`,
                                icon: "success"
                            });
                        } else {
                            Swal.fire({
                                title: "No Actualizado!",
                                text: `No se cambio el estado del Gerente ${val.name}`,
                                icon: "error"
                            });
                            newEstado = 2;
                        }
                    })
                    
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
                <td className="columna__id">
                    <h3 id='id'>{props.id}</h3>
                </td>
                <td className="columna__names">
                    <h3 id='names'>{props.name + " " + props.lastname}</h3>
                </td>
                <td className="columna__state">
                    <h3 className={props.idEstado === 2 ? 'active' : 'inactive' } >{props.estado}</h3>
                </td>
                <td className="columna_acciones" id='columna_acciones'>
                    <div className='sing'>
                        <div type="button" id="edit" name="edit" onClick={handleMostrarEdit}><i className=" tugle sbi bi-pencil-square"></i></div>
                        <div type="button" id="delete" name="delete" onClick={() => confirmDelete(props)}><i className={`tugle bi bi-toggle-${textoActivar}`}></i></div>
                    </div>
                </td>
            </tr>
            {mostrarEditForm && <EditSupervisor closeModal={handleMostrarEdit} datos={props} consulta={props.consulta} />}
        </>
    );
}
