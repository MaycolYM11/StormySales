import React from 'react'
import FacturaTop from './FacturaTop'
import './MainFactura.css'

const Main_Facturacion_Pre = () => {
  return (
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
              <tr className="tr__Facturacion">
                <td className="td__Facturacion td--Item">1</td>
                <td className="td__Facturacion td--Descripcion">Nombre de producto 1</td>
                <td className="td__Facturacion td--Cantidad">5</td>
                <td className="td__Facturacion td--Precio"><span className='precioColor'>$</span>10.000</td>
                <td className="td__Facturacion td--Importe"><span className='precioColor'>$</span>50.000</td>
                <td className="td__Facturacion td--Acciones">
                  <div className="Acciones-Container-Row">
                    <div className="containerIcons-Acciones">
                      <button className='BTN_iconClick-Factura'>
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <div className="separadorVertical-Acciones"></div>
                      <button className='BTN_iconClick-Factura'>
                        <i className="bi bi-trash3"></i>
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="Cliente-MPago-Totales_Container">
          <div className="btnsRight--Factura">
            <div className="btn_factura_BG __agregarCliente">
              <button className='btn__agregar-Factura'>
                <span className='btnText-Facturacion'>Agregar Cliente</span>
                <i class="bi bi-person-plus-fill"></i>
              </button>
            </div>
            <div className="btn_factura_BG __EscogerMP">
              <button className='btn__escMP-Factura'>
                <span className='btnText-Facturacion'>Escoger metodo de pago</span>
                <i class="bi bi-chevron-down"></i>
              </button>
            </div>
          </div>
          <div className="calculosLeft--Factura">
            <table className='table_calculos-F'>
              <tbody>
                <tr className='tr_calculos-F'>
                  <td className='td_calculos-F-Tittle border_Row-Fact'>Sub Total</td>
                  <td className='td_calculos-F border_Row-Fact'><span className='dollar-resaltado-F'>$ </span>37.500</td>
                </tr>
                <tr className='tr_calculos-F'>
                  <td className='td_calculos-F-Tittle border_Row-Fact'>IVA 12%</td>
                  <td className='td_calculos-F border_Row-Fact'><span className='dollar-resaltado-F'>$ </span>4.500</td>
                </tr>
                <tr className='tr_calculos-F Total-Factura'>
                  <td className='td_calculos-F-Tittle'>Total</td>
                  <td className='td_calculos-F'><span className='dollar-resaltado-F'>$ </span>42.000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="RegistrarFactura-Bottom __registrar-Factura">
          <button className='btn__registrar-Factura'>
            <span className='btnText-Facturacion'>Registra Factura</span>
            <i class="bi bi-save2"></i>
          </button>
        </div>
      </div>
      <div className="containerFactura-Right">
        <div className="centerInputs_Right-Factura">
          <div className="Tittle_Right-Factura">
            <span className='tittleDatos_prod-F'>Datos del Producto</span>
            <div className="itemNumber_factura">
              <span className='text_item_prod-F'>6</span>
            </div>
          </div>
          <div className="inputsDiv_Right-F">
            <div className="grupInput_Right-F">
              <span className='tittle-Input_Right-F'>Escriba el Nombre del Producto</span>
              <div className="inputContent_Right-F">
                <div className="textAreaInput-Right_Right-F">
                  <input className='styleInput-F' type="text" name="" id="" placeholder='...' />
                </div>
                <div className="iconInput-Left_Right-F">
                  <i class="bi bi-input-cursor-text"></i>
                </div>
              </div>
            </div>
            <div className="grupInput_Right-F">
              <span className='tittle-Input_Right-F'>Escriba la cantidad de Producto</span>
              <div className="inputContent_Right-F">
                <div className="textAreaInput-Right_Right-F">
                  <input className='styleInput-F' type="number" name="" id="" placeholder='...' />
                </div>
                <div className="iconInput-Left_Right-F">
                  <i class="bi bi-123"></i>
                </div>
              </div>
            </div>
            <div className="grupInput_Right-F">
              <span className='tittle-Input_Right-F'>Escriba el precio Unitario del Producto</span>
              <div className="inputContent_Right-F">
                <div className="textAreaInput-Right_Right-F">
                  <input className='styleInput-F' type="number" name="" id="" placeholder='...' />
                </div>
                <div className="iconInput-Left_Right-F">
                  <i class="bi bi-currency-dollar"></i>
                </div>
              </div>
            </div>
          </div>
          <button className='BtnAgregarProducto-Factura'>
            <span>Agregar Producto</span>
            <i class="bi bi-plus-lg"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Main_Facturacion_Pre
