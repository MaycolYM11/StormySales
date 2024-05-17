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
          <table className="table__Facturacion">
            <thead className="thead__Facturacion">
              <tr className="tr__Facturacion--Tittles">
                <th className="th__Facturacion--Item">N° Item</th>
                <th className="th__Facturacion--Descripcion">Descripción</th>
                <th className="th__Facturacion--Cantidad">Cantidad</th>
                <th className="th__Facturacion--Precio">Precio Unitario</th>
                <th className="th__Facturacion--Importe">Importe</th>
                <th className="th__Facturacion--Acciones">Acciones</th>
              </tr>
            </thead>
            <tbody className="tbody__Facturacion">
              <tr className="tr__Facturacion">
                <td className="td__Facturacion--Item">1</td>
                <td className="td__Facturacion--Descripcion">Nombre de producto 1</td>
                <td className="td__Facturacion--Cantidad">5</td>
                <td className="td__Facturacion--Precio">$ 10.000</td>
                <td className="td__Facturacion--Importe">$50.000</td>
                <td className="td__Facturacion--Acciones">
                  <div className="Acciones-Container-Row">
                    <div className="containerIconas-Acciones">
                      <button className='iconClick-Factura'>
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <div className="separadorVertical-Acciones"></div>
                      <button className='iconClick-Factura'>
                        <i className="bi bi-trash3"></i>
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* <div className="containerFactura-Right">
      </div> */}
    </div>
  )
}

export default Main_Facturacion_Pre
