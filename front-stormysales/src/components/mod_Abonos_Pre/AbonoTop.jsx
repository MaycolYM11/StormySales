import React from 'react'
import './stylesAbono.css'
import LogoMini from '../../assets/Logo/Logo-2.png'

const AbonoTop = () => {
  return (
    <div className='abono_header--Container'>
      <div className="abonoTop_Top-Lef--Container">
        <div className="Abono_top-left">
          <div className="grupDiv_Abono-Right">
            <span className='tittleGrup_Abono'>ID Abono:</span>
            <span className='tittleGrup_Abono'>Fecha del Abono:</span>
            <span className='tittleGrup_Abono'>Hora del Abono:</span>
            <span className='tittleGrup_Abono'>ID Abono:</span>
          </div>
          <div className="grupDiv_Abono-Left">
            <span className='resultGrup_Abono'>#0001</span>
            <span className='resultGrup_Abono'>#0001</span>
            <span className='resultGrup_Abono'>#0001</span>
            <span className='resultGrup_Abono'>#0001</span>
          </div>
        </div>
        <div className="Abono-Cliente_top-left">
          <div className="grupDiv_Abono-Right">
            <span className='tittleGrup_Abono'>ID Abono:</span>
            <span className='tittleGrup_Abono'>Fecha del Abono:</span>
            <span className='tittleGrup_Abono'>Hora del Abono:</span>
            <span className='tittleGrup_Abono'>ID Abono:</span>
          </div>
          <div className="grupDiv_Abono-Left">
            <span className='resultGrup_Abono'>#0001</span>
            <span className='resultGrup_Abono'>#0001</span>
            <span className='resultGrup_Abono'>#0001</span>
            <span className='resultGrup_Abono'>#0001</span>
          </div>
        </div>
        <div className="abonoMain-info">
        </div>
      </div>
      <div className="abonoTop_Top-Right--Container">
        <div className="tittlesAbono-TopRight">
          <div className="ID_Abono--Top-Right">
            <span className='tittleGrup_Abono--ID'>#0001</span>
          </div>
          <div className="AbonoTittle--TopRight">
            <img className='logoMini--Tittle-abono' src={LogoMini} alt="LogoMini" />
            <span className='Abono--Tittle'>Abono</span>
          </div>
        </div>
        <div className="Abono_Empleado--top-right">
          <div className="EmpleadoAbono--TopRight">
            <div className="grupDiv_Abono-Right">
              <span className='tittleGrup_Abono'>ID Empleado:</span>
              <span className='tittleGrup_Abono'>Nombre del Empleado:</span>
            </div>
            <div className="grupDiv_Abono-Left">
              <span className='resultGrup_Abono'>#0001</span>
              <span className='resultGrup_Abono'>#0001</span>
            </div>
          </div>
          <div className="separador__Abono-TopRight"></div>
          <div className="ClienteAbono--TopRight">
            <div className="grupDiv_Abono-Right">
              <span className='tittleGrup_Abono'>Dirección del Cliente:</span>
              <span className='tittleGrup_Abono'>Zona Correspondiente:</span>
            </div>
            <div className="grupDiv_Abono-Left">
              <span className='resultGrup_Abono'>#0001</span>
              <span className='resultGrup_Abono'>#0001</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AbonoTop
