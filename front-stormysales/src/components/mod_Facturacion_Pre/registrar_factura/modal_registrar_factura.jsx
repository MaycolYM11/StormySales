import React from 'react';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './ModalRegistroFactura.css';

const ModalRegistroFactura = ({ facturaData, onClose, cliente }) => {

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
                            handleDownloadPDF(); // Ejecutar la función para descargar el PDF después de registrar la factura
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
    
const handleDownloadPDF = () => {
        const doc = new jsPDF();

        // Título
        doc.setFontSize(18);
        doc.text('StormySales - Factura', 10, 10);

        // Detalles de la factura
        doc.setFontSize(12);
        doc.text('Detalle de la factura:', 10, 30);
        doc.setFontType('bold');
        doc.text(`Cliente: ${cliente.Nombre} ${cliente.Apellido}`, 20, 40);
        doc.text(`Empleado: ${facturaData.empleado.nombre} ${facturaData.empleado.apellido}`, 20, 50);
        doc.text(`Fecha: ${facturaData.fecha}`, 20, 60);
        doc.text(`Hora: ${facturaData.hora}`, 20, 70);

        // Resumen Totales
        doc.text('Resumen Totales:', 10, 90);
        doc.setFontType('normal');
        doc.text(`Subtotal: ${facturaData.subtotal}`, 20, 100);
        doc.text(`IVA: ${facturaData.iva}`, 20, 110);
        doc.text(`Total: ${facturaData.total}`, 20, 120);

        // Productos
        doc.text('Productos:', 10, 140);
        doc.autoTable({
            startY: 150,
            head: [['Nombre', 'Cantidad', 'Precio Unitario', 'Importe']],
            body: facturaData.productos.map(producto => [
                producto.nombreProducto, 
                producto.cantidad, 
                producto.precioUnitario, 
                producto.importe
            ]),
            theme: 'grid' // Usar tema grid para la tabla en escala de grises y negros
        });

        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString().replace(/\//g, '-');
        const formattedTime = currentDate.toLocaleTimeString().replace(/:/g, '-');

        doc.save(`Factura_${formattedDate}_${formattedTime}.pdf`);
    };

    return (
        <div className="modalpagarFactura-container">
            <div className="modalpagarFactura-content">
                <div className="seccion">
                    <h2>Detalle de la factura:</h2>
                    <div className="datos-cliente">
                        <p>Cliente: <span>{cliente ? `${cliente.Nombre} ${cliente.Apellido}` : 'Cliente no especificado'}</span></p>
                        <p>Empleado: <span>{facturaData.empleado.nombre} {facturaData.empleado.apellido}</span></p>
                        <p>Fecha: <span>{facturaData.fecha}</span></p>
                        <p>Hora: <span>{facturaData.hora}</span></p>
                    </div>
                </div>

                <div className="seccion">
                    <h2>Resumen Totales:</h2>
                    <div className="datos-calculos">
                        <p>Subtotal: <span>{facturaData.subtotal}</span></p>
                        <p>IVA: <span>{facturaData.iva}</span></p>
                        <p>Total: <span>{facturaData.total}</span></p>
                    </div>
                </div>

                <div className="seccion">
                    <h2>Productos:</h2>
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
                </div>
                <div className="accionesRegistrarFactura">
                    <button className="modalpagarFactura-close-BTN" onClick={onClose}>Cerrar</button>
                    <button className='modalpagarRegistrar_factura_BTN' onClick={handleRegistrarFactura}>Registrar Factura</button>
                    <button className='modalpagarRegistrar_factura_BTN PDFFactura' onClick={handleDownloadPDF}>Descargar PDF</button>
                </div>
            </div>
        </div>
    );
};

export default ModalRegistroFactura;
