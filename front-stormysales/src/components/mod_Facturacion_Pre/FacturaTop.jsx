import React from 'react'
import './stylesFactura.css'
import LogoMini from '../../assets/Logo/Logo-2.png'

const FacturaTop = () => {
  return (
    <div className='factura_header--Container'>
      <div className="facturaTop_Top-Lef--Container">
        <div className="Factura_top-left">
          <div className="grupDiv_Factura-Right">
            <span className='tittleGrup_Factura'>ID Factura:</span>
            <span className='tittleGrup_Factura'>Fecha de la Factura:</span>
            <span className='tittleGrup_Factura'>Hora de la Factura:</span>
            <span className='tittleGrup_Factura'>ID Factura:</span>
          </div>
          <div className="grupDiv_Factura-Left">
            <span className='resultGrup_Factura'>#0001</span>
            <span className='resultGrup_Factura'>#0001</span>
            <span className='resultGrup_Factura'>#0001</span>
            <span className='resultGrup_Factura'>#0001</span>
          </div>
        </div>
        <div className="Factura-Cliente_top-left">
          <div className="grupDiv_Factura-Right">
            <span className='tittleGrup_Factura'>ID Factura:</span>
            <span className='tittleGrup_Factura'>Fecha de la Factura:</span>
            <span className='tittleGrup_Factura'>Hora de la Factura:</span>
            <span className='tittleGrup_Factura'>ID Factura:</span>
          </div>
          <div className="grupDiv_Factura-Left">
            <span className='resultGrup_Factura'>#0001</span>
            <span className='resultGrup_Factura'>#0001</span>
            <span className='resultGrup_Factura'>#0001</span>
            <span className='resultGrup_Factura'>#0001</span>
          </div>
        </div>
        <div className="facturaMain-info">
        </div>
      </div>
      <div className="facturaTop_Top-Right--Container">
        <div className="tittlesFactura-TopRight">
          <div className="ID_Factura--Top-Right">
            <span className='tittleGrup_Factura--ID'>#0001</span>
          </div>
          <div className="FacturaTittle--TopRight">
            <img className='logoMini--Tittle-factura' src={LogoMini} alt="LogoMini" />
            <span className='Factura--Tittle'>Factura</span>
          </div>
        </div>
        <div className="Factura_Empleado--top-right">
          <div className="EmpleadoFactura--TopRight">
            <div className="grupDiv_Factura-Right">
              <span className='tittleGrup_Factura'>ID Empleado:</span>
              <span className='tittleGrup_Factura'>Nombre del Empleado:</span>
            </div>
            <div className="grupDiv_Factura-Left">
              <span className='resultGrup_Factura'>#0001</span>
              <span className='resultGrup_Factura'>#0001</span>
            </div>
          </div>
          <div className="separador__Factura-TopRight"></div>
          <div className="ClienteFactura--TopRight">
            <div className="grupDiv_Factura-Right">
              <span className='tittleGrup_Factura'>Dirección del Cliente:</span>
              <span className='tittleGrup_Factura'>Zona Correspondiente:</span>
            </div>
            <div className="grupDiv_Factura-Left">
              <span className='resultGrup_Factura'>#0001</span>
              <span className='resultGrup_Factura'>#0001</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FacturaTop
