import React, { useState } from 'react';
import './ModalFactura_Usu.css';
import Swal from 'sweetalert2';

const ModalEscogerUsu = ({ isOpen, onClose, onSelectUser }) => {
    const [/*selectedUser*/, setSelectedUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Cambiar el mockData para tener 12 registros diferentes
    const mockData = [
        { id: '1001339605', nombres: 'Miguel Angel', apellidos: 'Ayala Pinilla', telefono: '3142548221', email: 'email1@gmail.com', estado: 'Activo' },
        { id: '1001339606', nombres: 'Juan', apellidos: 'Pérez', telefono: '3142548222', email: 'email2@gmail.com', estado: 'Activo' },
        { id: '1001339607', nombres: 'María', apellidos: 'González', telefono: '3142548223', email: 'email3@gmail.com', estado: 'Inactivo' },
        { id: '1001339608', nombres: 'Luisa', apellidos: 'Martínez', telefono: '3142548224', email: 'email4@gmail.com', estado: 'Activo' },
        { id: '1001339608', nombres: 'Luisa', apellidos: 'Martínez', telefono: '3142548224', email: 'email4@gmail.com', estado: 'Activo' },
        { id: '1001339605', nombres: 'Miguel Angel', apellidos: 'Ayala Pinilla', telefono: '3142548221', email: 'email1@gmail.com', estado: 'Activo' },
        { id: '1001339608', nombres: 'Luisa', apellidos: 'Martínez', telefono: '3142548224', email: 'email4@gmail.com', estado: 'Activo' },
        { id: '1001339608', nombres: 'Luisa', apellidos: 'Martínez', telefono: '3142548224', email: 'email4@gmail.com', estado: 'Activo' },
        { id: '1001339608', nombres: 'Luisa', apellidos: 'Martínez', telefono: '3142548224', email: 'email4@gmail.com', estado: 'Activo' },
        { id: '1001339608', nombres: 'Luisa', apellidos: 'Martínez', telefono: '3142548224', email: 'email4@gmail.com', estado: 'Activo' },
        { id: '1001339605', nombres: 'Miguel Angel', apellidos: 'Ayala Pinilla', telefono: '3142548221', email: 'email1@gmail.com', estado: 'Activo' },
        { id: '1001339608', nombres: 'Luisa', apellidos: 'Martínez', telefono: '3142548224', email: 'email4@gmail.com', estado: 'Activo' },
        { id: '1001339608', nombres: 'Luisa', apellidos: 'Martínez', telefono: '3142548224', email: 'email4@gmail.com', estado: 'Activo' },
        { id: '1001339605', nombres: 'Miguel Angel', apellidos: 'Ayala Pinilla', telefono: '3142548221', email: 'email1@gmail.com', estado: 'Activo' },
        { id: '1001339608', nombres: 'Luisa', apellidos: 'Martínez', telefono: '3142548224', email: 'email4@gmail.com', estado: 'Activo' },
        { id: '1001339608', nombres: 'Luisa', apellidos: 'Martínez', telefono: '3142548224', email: 'email4@gmail.com', estado: 'Activo' },
        { id: '1001339605', nombres: 'Miguel Angel', apellidos: 'Ayala Pinilla', telefono: '3142548221', email: 'email1@gmail.com', estado: 'Activo' },
    ];

    const handleSelectUser = (user) => {
        setSelectedUser(user);
        Swal.fire({
            title: '¿Desea seleccionar este usuario?',
            text: `Usuario seleccionado: ${user.nombres} ${user.apellidos}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, seleccionar',
            cancelButtonText: 'No, regresar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('¡Seleccionado con éxito!', '', 'success');
                onSelectUser(user);
                console.log('--> hijo: Usuario seleccionado:', user);
                onClose();
            }
        });
    };

    // Calcular la cantidad de registros por página
    const itemsPerPage = 5;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = mockData.slice(indexOfFirstItem, indexOfLastItem);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className={`modal-overlay__Factura ${isOpen ? 'show' : ''}`}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className='tittle_Modal_Factura'>Agregar Cliente</h2>
                    <button className="close-button_ModalF" onClick={onClose}>
                        <i className="bi bi-x-circle"></i>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="table-container_ModalF">
                        <table className="client-table">
                            <thead>
                                <tr className='th__PadreModal'>
                                    <th className='thModal'>ID de Cliente</th>
                                    <th className='thModal'>Nombres del Cliente</th>
                                    <th className='thModal'>Apellidos del Cliente</th>
                                    <th className='thModal'>Telefono</th>
                                    <th className='thModal'>E-mail</th>
                                    <th className='thModal'>Estado</th>
                                    <th className='th__AccionesModal'>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((client, index) => (
                                    <tr key={index}>
                                        <td>{client.id}</td>
                                        <td>{client.nombres}</td>
                                        <td>{client.apellidos}</td>
                                        <td>{client.telefono}</td>
                                        <td>{client.email}</td>
                                        <td><span className={`estado ${client.estado.toLowerCase()}`}>{client.estado}</span></td>
                                        <td className='td__AccionesModal'><button className="select-button_UserM" onClick={() => handleSelectUser(client)}>Seleccionar</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="ColeccionPages_Modal">
                        <div className="ColeccionPages_ContentM">
                            <span className="listColeccion">Resultados: {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, mockData.length)}/{mockData.length}</span>
                            <div className="NavegacionColeccion_M">
                                <button className="NaveColecc__BTN" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}><i className="bi bi-caret-left-fill"></i></button>
                                <div className="sepp_Vertical_Modal"></div>
                                <div className="NaveColecc_Div__BTN">
                                    <span>{currentPage}</span>
                                </div>
                                <div className="sepp_Vertical_Modal"></div>
                                <button className="NaveColecc__BTN" onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= mockData.length}><i className="bi bi-caret-right-fill"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalEscogerUsu;
