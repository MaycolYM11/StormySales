import React from 'react';
import Swal from 'sweetalert2';
import './ModalRegistroFactura.css';

const ModalRegistroFactura = ({ facturaData, onClose, cliente }) => {
    console.log('----> Modal registrar, llega: ', facturaData);
    console.log('----> Modal registrar, ID Vendedor: ', facturaData.fecha);
    console.log('----> Modal registrar, Fecha y hora: ', facturaData.hora);

    const handleRegistrarFactura = async () => {
        Swal.fire({
            title: '¿Desea registrar esta factura?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Formatear la fecha manualmente
                    const fechaParts = facturaData.fecha.split('/');
                    const fechaFormateada = `${fechaParts[2]}-${fechaParts[1]}-${fechaParts[0]}`;

                    const response = await fetch('http://localhost:3001/factura/insertfactura', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            ID_cliente_fk: cliente.ID,
                            ID_vendedor_fk: facturaData.empleado.id_empleado,
                            fecha_venta_hora: fechaFormateada + ' ' + facturaData.hora,
                            metodo_pago: facturaData.metodoPago,
                            referencia_metodo_pago: facturaData.referencia,
                            detalles: facturaData.productos.map(producto => ({
                                descripcion: producto.nombreProducto,
                                cantidad: producto.cantidad,
                                precio_unitario: producto.precioUnitario
                            }))
                        })
                    });

                    if (response.ok) {
                        Swal.fire('¡Registrado!', 'La factura ha sido registrada con éxito.', 'success').then(() => {
                            onClose();
                            window.location.reload();
                        });
                    } else {
                        Swal.fire('Error', 'Hubo un problema al registrar la factura.', 'error');
                    }

                } catch (error) {
                    console.error('Error:', error);
                    Swal.fire('Error', 'Hubo un problema al registrar la factura.', 'error');
                }
            }
        });
    };



    return (
        <div className="modalpagarFactura-container">
            <div className="modalpagarFactura-content">
                <div>
                    <h2 className='tittleModal_Pagar'>Detalles de la Factura</h2>
                    <div className="datos-cliente">
                        <p>Cliente: <span className='resultColor_Pagar'>{cliente ? `${cliente.Nombre} ${cliente.Apellido}` : 'Cliente no especificado'}</span></p>
                        <p>Empleado: <span className='resultColor_Pagar'>{facturaData.empleado.nombre} {facturaData.empleado.apellido}</span></p>
                        <p>Fecha: <span className='resultColor_Pagar'>{facturaData.fecha}</span></p>
                        <p>Hora: <span className='resultColor_Pagar'>{facturaData.hora}</span></p>
                    </div>

                    <div className="datos-calculos">
                        <p>Subtotal: <span className='resultColor_Pagar'>{facturaData.subtotal}</span></p>
                        <p>IVA: <span className='resultColor_Pagar'>{facturaData.iva}</span></p>
                        <p>Total: <span className='resultColor_Pagar'>{facturaData.total}</span></p>
                    </div>
                    <div className="datos-metodo-pago">
                        <p>Método de Pago: <span className='resultColor_Pagar'>{facturaData.metodoPago}</span></p>
                        <p>Referencia: <span className='resultColor_Pagar'>{facturaData.referencia}</span></p>
                    </div>
                </div>
                <h3>Productos:</h3>
                <table className="modalpagarFactura-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Precio Unitario</th>
                            <th>Importe</th>
                        </tr>
                    </thead>
                    <tbody>
                        {facturaData.productos.map((producto, index) => (
                            <tr key={index}>
                                <td>{producto.nombreProducto}</td>
                                <td>{producto.cantidad}</td>
                                <td>{producto.precioUnitario}</td>
                                <td>{producto.importe}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="accionesRegistrarFactura">
                    <button className="modalpagarFactura-close-BTN" onClick={onClose}>Cerrar</button>
                    <button className='modalpagarRegistrar_factura_BTN' onClick={handleRegistrarFactura}>Registrar Factura</button>
                </div>
            </div>
        </div>
    );
};

export default ModalRegistroFactura;
