import React from 'react'
import './ModalFactura_Usu.css'

const ModalEscogerUsu = ({ isOpen, onClose }) => {
    //if (!isOpen) return null;

    const mockData = [
        { id: '1001339605', nombres: 'Miguel Angel', apellidos: 'Ayala Pinilla', telefono: '3142548221', email: 'email@gmail.com', estado: 'Activo' },
        // Repite los datos para simular las filas
        { id: '1001339605', nombres: 'Miguel Angel', apellidos: 'Ayala Pinilla', telefono: '3142548221', email: 'email@gmail.com', estado: 'Activo' },
        { id: '1001339605', nombres: 'Miguel Angel', apellidos: 'Ayala Pinilla', telefono: '3142548221', email: 'email@gmail.com', estado: 'Activo' },
        { id: '1001339605', nombres: 'Miguel Angel', apellidos: 'Ayala Pinilla', telefono: '3142548221', email: 'email@gmail.com', estado: 'Activo' },
        { id: '1001339605', nombres: 'Miguel Angel', apellidos: 'Ayala Pinilla', telefono: '3142548221', email: 'email@gmail.com', estado: 'Activo' },
    ];

    return (
        <div className="modal-overlay__Factura">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className='tittle_Modal_Factura'>Agregar Cliente</h2>
                    <button onClick={onClose} className="close-button_ModalF">
                        <i className="bi bi-x-circle"></i>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="search-container">
                        <input className='searchInput_Modal' type="text" placeholder="Buscar ID Factura o ID Cliente" />
                        <button className='buscarBTN_ModalF'>Buscar</button>
                    </div>
                    <div className="table-container_ModalF">
                        <table className="client-table">
                            <thead>
                                <tr>
                                    <th>ID de Cliente</th>
                                    <th>Nombres del Cliente</th>
                                    <th>Apellidos del Cliente</th>
                                    <th>Telefono</th>
                                    <th>E-mail</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockData.map((client, index) => (
                                    <tr key={index}>
                                        <td>{client.id}</td>
                                        <td>{client.nombres}</td>
                                        <td>{client.apellidos}</td>
                                        <td>{client.telefono}</td>
                                        <td>{client.email}</td>
                                        <td><span className={`estado ${client.estado.toLowerCase()}`}>{client.estado}</span></td>
                                        <td><button className="select-button_UserM">Seleccionar</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="footerStyle_ModalF">
                            <div className="nada"></div>
                            <div className="rightAcctions_Footer_MF"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalEscogerUsu
