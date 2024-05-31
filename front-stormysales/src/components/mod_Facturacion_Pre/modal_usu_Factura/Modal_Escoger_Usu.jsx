import React, { useState, useEffect } from 'react';
import './ModalFactura_Usu.css';
import Swal from 'sweetalert2';

const ModalEscogerUsu = ({ isOpen, onClose, onSelectUser }) => {
    const [/*selectedUser*/, setSelectedUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [clientes, setClientes] = useState([]);
    const [idInput, setIdInput] = useState('');
    const [nombreInput, setNombreInput] = useState('');
    const [apellidoInput, setApellidoInput] = useState('');

    // Función para cargar los clientes activos
    const loadClientes = async (query = '') => {
        try {
            const response = await fetch(`http://localhost:3001/factura/getclienteactivo?${query}`);
            const data = await response.json();

            if (Array.isArray(data)) {
                setClientes(data);
            } else {
                console.error('La respuesta del servidor no es una matriz:', data);
                setClientes([]);
            }

            if (data.length === 0) {
                Swal.fire('No se encontraron resultados', 'No se encontraron clientes activos que coincidan con la búsqueda.', 'info');
            }
        } catch (error) {
            console.error('Error al cargar clientes:', error);
        }
    };

    useEffect(() => {
        loadClientes();
    }, []);

    // Función para manejar la búsqueda
    const handleSearch = () => {
        const query = new URLSearchParams();
        if (idInput.trim() !== '') {
            query.append('id', idInput.trim());
        }
        if (nombreInput.trim() !== '') {
            query.append('nombre', nombreInput.trim());
        }
        if (apellidoInput.trim() !== '') {
            query.append('apellido', apellidoInput.trim());
        }
        loadClientes(query.toString());
    };

    const handleSelectUser = (user) => {
        setSelectedUser(user);
        Swal.fire({
            title: '¿Desea seleccionar este usuario?',
            text: `Usuario seleccionado: ${user.Nombre} ${user.Apellido}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, seleccionar',
            cancelButtonText: 'No, regresar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('¡Seleccionado con éxito!', '', 'success');
                onSelectUser(user);
                onClose();
            }
        });
    };

    // Función para redirigir al usuario a la ruta /tabla-clientes
    const handleAgregarCliente = () => {
        // Mostrar un mensaje de confirmación antes de redirigir
        Swal.fire({
            title: '¿Está seguro de salir de la factura?',
            text: 'Perderá todo el progreso hasta el momento.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Redirigir al usuario a la ruta /tabla-clientes
                window.location.href = '/tabla-clientes';
            }
        });
    };

    // Calcular la cantidad de registros por página
    const itemsPerPage = 5;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = clientes.slice(indexOfFirstItem, indexOfLastItem);

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
                    <div className="actionsContainer">
                        <div className="search-container">
                            <input className='searchInput_Modal' type="text" placeholder='ID' value={idInput} onChange={(e) => setIdInput(e.target.value)} />
                            <div className="cerrarInput_Modal"></div>
                            <input className='searchInput_Modal' type="text" placeholder='Nombre' value={nombreInput} onChange={(e) => setNombreInput(e.target.value)} />
                            <div className="cerrarInput_Modal"></div>
                            <input className='searchInput_Modal' type="text" placeholder='Apellido' value={apellidoInput} onChange={(e) => setApellidoInput(e.target.value)} />
                            <button className='buscarBTN_ModalF' onClick={handleSearch}>
                                <i className="bi bi-search"></i>
                                Buscar
                            </button>
                        </div>
                        <button className='AgregarClient_BTN' onClick={handleAgregarCliente}>
                            <i className="bi bi-plus-lg"></i>
                            Agregar Cliente
                        </button>
                    </div>
                    <div className="table-container_ModalF">
                        <table className="client-table">
                            <thead>
                                <tr className='th__PadreModal'>
                                    <th className='thModal th__IDcliente'>ID de Cliente</th>
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
                                        <td className='th__IDcliente'>{client.ID}</td>
                                        <td>{client.Nombre}</td>
                                        <td>{client.Apellido}</td>
                                        <td>{client.Telefono}</td>
                                        <td>{client.Email}</td>
                                        <td><span className='estado activo'>Activo</span></td>
                                        <td className='td__AccionesModal'><button className="select-button_UserM" onClick={() => handleSelectUser(client)}>Seleccionar</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="ColeccionPages_Modal">
                        <div className="ColeccionPages_ContentM">
                            <span className="listColeccion">Resultados: {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, clientes.length)}/{clientes.length}</span>
                            <div className="NavegacionColeccion_M">
                                <button className="NaveColecc__BTN" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}><i className="bi bi-caret-left-fill"></i></button>
                                <div className="sepp_Vertical_Modal"></div>
                                <div className="NaveColecc_Div__BTN">
                                    <span>{currentPage}</span>
                                </div>
                                <div className="sepp_Vertical_Modal"></div>
                                <button className="NaveColecc__BTN" onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= clientes.length}><i className="bi bi-caret-right-fill"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalEscogerUsu;

