import React, { useEffect, useState } from 'react';
import '../Tabla.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import EditSupervisor from './EditSupervisor';

export const TablaAdminItem = (props) => {
    const [textoActivar,setTextoActivar]= useState('');
    const [mostrarEditForm , setMostrarEditForm] = useState(false);
    const [estado,setEstado] = useState(parseInt(props.idEstado));

    console.log('mira voz el estados',estado);

    const ponerTexto = () =>{
        console.log('estado actualmente',estado);
        if(estado === 2){
            setTextoActivar('Desactivar');
        } else if (estado === 1) {
            setTextoActivar('Activar');
        }
    }

    useEffect(() => {
        ponerTexto();
    },[]);

    const handleMostrarEdit = () => {
        setMostrarEditForm(!mostrarEditForm);
    }

    function confirmDelete(val) {
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
                if (estado === 2 || estado === '2') {
                    setEstado(1);
                } else if (estado === 1 || estado === '1') {
                    setEstado(2);
                }

                try {
                    if(estado===2){
                        await axios.put(`http://localhost:3001/usuario/activarsupervisor/${val.id}`, {
                        "state": estado
                        }).then(()=>{
                            Swal.fire({
                                title: "Actualizado!",
                                text: `Se cambio el estadp del Gerente ${val.name}`,
                                icon: "success"
                            });
                            props.consulta();
                            ponerTexto();
                            console.log(estado);
                        })
                    }else if(estado===1){
                        await axios.put(`http://localhost:3001/usuario/desactivarsupervisor/${val.id}`, {
                        "state": estado
                        }).then((response)=>{
                            if(response.data.continue){
                                Swal.fire({
                                    title: "Actualizado!",
                                    text: `Se cambio el estado del Gerente ${val.name1}`,
                                    icon: "success"
                                });
                                props.consulta();
                                ponerTexto();
                                console.log(estado);
                            }else{
                                Swal.fire({
                                    title: "No Actualizado!",
                                    text: `No se cambio el estado del Gerente ${val.name1}`,
                                    icon: "error"
                                });
                                props.consulta();
                                // setEstado(1);
                                console.log(estado);
                            }
                            
                        })
                    }
                    //axios.delete(`http://localhost:3001/Delete/${val.id}`).then(()=>{
                    // await axios.put(`http://localhost:3001/usuario/cambioestadoadmin/${val.id}`, {
                    //     "state": estado
                    // })
                    
                                        
                } catch (error) {
                    console.error('no se pudo cambiar de estado en la función confirmDelete', error);
                }
            }
        })
    }
    //console.log(props);

    return (
        <>
            <tr>
                <td>
                    <h3>{props.name + " " + props.lastname}</h3>
                </td>
                {/* <td>
                    <h3>{props.tipoId}</h3>
                </td> */}
                <td>
                    <h3>{props.id}</h3>
                </td>
                {/* <td>
                    <h3>{props.cargo}</h3>
                </td> */}
                <td>
                    <h3>{props.estado}</h3>
                </td>
                <td>
                    <button type="button" id="edit" name="edit" className="boton b1" onClick={handleMostrarEdit}>Editar</button>
                    <button type="button" id="delete" name="delete" className="boton b2" onClick={() => { confirmDelete(props) }}>{textoActivar}</button>
                </td>
            </tr>
            {mostrarEditForm && <EditSupervisor closeModal={handleMostrarEdit} datos={props} consulta={props.consulta} />}

        </>
    )
}