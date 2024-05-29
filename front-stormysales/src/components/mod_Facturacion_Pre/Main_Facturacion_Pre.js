import React, { useState } from 'react'
import FacturaTop from './FacturaTop'
import Swal from 'sweetalert2'
import './MainFactura.css'
import './TableFactura.css'
import './Right_PartFactura.css'

import ModalFactura from './modal_usu_Factura/Modal_Escoger_Usu'

const Main_Facturacion_Pre = () => {
  const [productos, setProductos] = useState([]);
  const [nombreProducto, setNombreProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precioUnitario, setPrecioUnitario] = useState('');
  const [indiceSeleccionado, setIndiceSeleccionado] = useState(null);

  const agregarProducto = () => {
    if (!nombreProducto || !cantidad || !precioUnitario) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos.',
      });
      return;
    }

    if (indiceSeleccionado !== null) {
      const nuevosProductos = [...productos];
      nuevosProductos[indiceSeleccionado] = {
        nombreProducto,
        cantidad: parseInt(cantidad, 10),
        precioUnitario: parseFloat(precioUnitario),
        importe: parseInt(cantidad, 10) * parseFloat(precioUnitario)
      };
      setProductos(nuevosProductos);
      setIndiceSeleccionado(null);
    } else {
      const nuevoProducto = {
        nombreProducto,
        cantidad: parseInt(cantidad, 10),
        precioUnitario: parseFloat(precioUnitario),
        importe: parseInt(cantidad, 10) * parseFloat(precioUnitario)
      };
      setProductos([...productos, nuevoProducto]);
    }

    setNombreProducto('');
    setCantidad('');
    setPrecioUnitario('');
  };

  const editarProducto = (index) => {
    const producto = productos[index];
    setNombreProducto(producto.nombreProducto);
    setCantidad(producto.cantidad.toString());
    setPrecioUnitario(producto.precioUnitario.toString());
    setIndiceSeleccionado(index);
  };

  const eliminarProducto = (index) => {
    Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevosProductos = [...productos];
        nuevosProductos.splice(index, 1);
        setProductos(nuevosProductos);
        setIndiceSeleccionado(null);
      }
    });
  };

  const calcularSubtotal = () => {
    return productos.reduce((acc, producto) => acc + producto.importe, 0);
  };

  const subtotal = productos.length > 0 ? calcularSubtotal() : 0;
  const iva = subtotal * 0.12;
  const total = subtotal + iva;

  return (
    <>
    <ModalFactura />
      <div className="FacturacionMain">
        <div className='containerFactura-Top'>
          <FacturaTop />
        </div>
        <div className="ContainerFactura_Center">
          <div className="tableCenter_Factura">
            <table className="tb__Facturacion">
              <thead>
                <tr className="th__Facturacion">
                  <th className="th__Facturacion th--Item">N° Item</th>
                  <th className="th__Facturacion th--Descripcion">Descripción</th>
                  <th className="th__Facturacion th--Cantidad">Cantidad</th>
                  <th className="th__Facturacion th--Precio">Precio Unitario</th>
                  <th className="th__Facturacion th--Importe">Importe</th>
                  <th className="th__Facturacion th--Acciones">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto, index) => (
                  <tr className="tr__Facturacion" key={index}>
                    <td className="td__Facturacion td--Item">{index + 1}</td>
                    <td className="td__Facturacion td--Descripcion">{producto.nombreProducto}</td>
                    <td className="td__Facturacion td--Cantidad">{producto.cantidad}</td>
                    <td className="td__Facturacion td--Precio"><span className='precioColor'>$</span>{producto.precioUnitario.toFixed(2)}</td>
                    <td className="td__Facturacion td--Importe"><span className='precioColor'>$</span>{producto.importe.toFixed(2)}</td>
                    <td className="td__Facturacion td--Acciones">
                      <div className="Acciones-Container-Row">
                        <div className="containerIcons-Acciones">
                          <button className='BTN_iconClick-Factura' onClick={() => editarProducto(index)}>
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <div className="separadorVertical-Acciones"></div>
                          <button className='BTN_iconClick-Factura' onClick={() => eliminarProducto(index)}>
                            <i className="bi bi-trash3"></i>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="bootomTable_Show">
              <div className="nada"></div>
              <div className="bootomTable_Show_Right"></div>
            </div>
          </div>
          <div className="Cliente-MPago-Totales_Container">
            <div className="btnsRight--Factura">
              <div className="btn_factura_BG __agregarCliente">
                <button className='btn__agregar-Factura'>
                  <span className='btnText-Facturacion'>Agregar Cliente</span>
                  <i className="bi bi-person-plus-fill"></i>
                </button>
              </div>
              <div className="btn_factura_BG __EscogerMP">
                <button className='btn__escMP-Factura'>
                  <span className='btnText-Facturacion'>Escoger metodo de pago</span>
                  <i className="bi bi-chevron-down"></i>
                </button>
              </div>
            </div>
            <div className="calculosLeft--Factura">
              <table className='table_calculos-F'>
                <tbody>
                  <tr className='tr_calculos-F'>
                    <td className='td_calculos-F-Tittle border_Row-Fact'>Sub Total</td>
                    <td className='td_calculos-F border_Row-Fact'><span className='dollar-resaltado-F'>$ </span>{subtotal.toFixed(2)}</td>
                  </tr>
                  <tr className='tr_calculos-F'>
                    <td className='td_calculos-F-Tittle border_Row-Fact'>IVA 12%</td>
                    <td className='td_calculos-F border_Row-Fact'><span className='dollar-resaltado-F'>$ </span>{iva.toFixed(2)}</td>
                  </tr>
                  <tr className='tr_calculos-F Total-Factura'>
                    <td className='td_calculos-F-Tittle'>Total</td>
                    <td className='td_calculos-F'><span className='dollar-resaltado-F'>$ </span>{total.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="RegistrarFactura-Bottom __registrar-Factura">
            <button className='btn__registrar-Factura'>
              <span className='btnText-Facturacion'>Registra Factura</span>
              <i className="bi bi-save2"></i>
            </button>
          </div>
        </div>
        <div className="containerFactura-Right">
          <div className="centerInputs_Right-Factura">
            <div className="Tittle_Right-Factura">
              <span className='tittleDatos_prod-F'>Datos del Producto</span>
              <div className="itemNumber_factura">
                <span className='text_item_prod-F'>{productos.length > 0 ? productos.length + 1 : 0}</span>
              </div>
            </div>
            <div className="inputsDiv_Right-F">
              <div className="grupInput_Right-F">
                <span className='tittle-Input_Right-F'>Escriba el Nombre del Producto</span>
                <div className="inputContent_Right-F">
                  <div className="textAreaInput-Right_Right-F">
                    <input className='styleInput-F' type="text" value={nombreProducto} onChange={(e) => setNombreProducto(e.target.value)} placeholder='...' />
                  </div>
                  <div className="iconInput-Left_Right-F">
                    <i className="bi bi-input-cursor-text"></i>
                  </div>
                </div>
              </div>
              <div className="grupInput_Right-F">
                <span className='tittle-Input_Right-F'>Escriba la cantidad de Producto</span>
                <div className="inputContent_Right-F">
                  <div className="textAreaInput-Right_Right-F">
                    <input className='styleInput-F' type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} placeholder='...' />
                  </div>
                  <div className="iconInput-Left_Right-F">
                    <i className="bi bi-123"></i>
                  </div>
                </div>
              </div>
              <div className="grupInput_Right-F">
                <span className='tittle-Input_Right-F'>Escriba el precio Unitario del Producto</span>
                <div className="inputContent_Right-F">
                  <div className="textAreaInput-Right_Right-F">
                    <input className='styleInput-F' type="number" value={precioUnitario} onChange={(e) => setPrecioUnitario(e.target.value)} placeholder='...' />
                  </div>
                  <div className="iconInput-Left_Right-F">
                    <i className="bi bi-currency-dollar"></i>
                  </div>
                </div>
              </div>
            </div>
            <button className='BtnAgregarProducto-Factura' onClick={agregarProducto}>
              <span>Agregar Producto</span>
              <i className="bi bi-plus-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Main_Facturacion_Pre
