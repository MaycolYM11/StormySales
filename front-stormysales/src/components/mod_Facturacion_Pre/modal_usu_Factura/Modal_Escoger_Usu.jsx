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
                                {mockData.map((client, index) => (
                                    <tr key={index}>
                                        <td>{client.id}</td>
                                        <td>{client.nombres}</td>
                                        <td>{client.apellidos}</td>
                                        <td>{client.telefono}</td>
                                        <td>{client.email}</td>
                                        <td><span className={`estado ${client.estado.toLowerCase()}`}>{client.estado}</span></td>
                                        <td className='td__AccionesModal'><button className="select-button_UserM">Seleccionar</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="footerStyle_ModalF">
                            <div className="nada"></div>
                            <div className="rightAcctions_Footer_MF"></div>
                        </div>
                    </div>
                    <div className="ColeccionPages_Modal">
                        <div className="ColeccionPages_ContentM">
                            <span className="listColeccion">Resultados: 7/10</span>
                            <div className="NavegacionColeccion_M">
                                <button className="NaveColecc__BTN"><i className="bi bi-caret-left-fill"></i></button>
                                <div className="sepp_Vertical_Modal"></div>
                                <div className="NaveColecc_Div__BTN">
                                    <span>1</span>
                                </div>
                                <div className="sepp_Vertical_Modal"></div>
                                <button className="NaveColecc__BTN"><i className="bi bi-caret-right-fill"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalEscogerUsu
