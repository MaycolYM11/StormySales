import React, { useState, useEffect } from 'react';
import './stylesFactura.css';
import LogoMini from '../../assets/Logo/Logo-2.png';

const FacturaTop = ({ usuarioSeleccionado }) => {
  const [lastFacturaId, setLastFacturaId] = useState('');
  const [empleado, setEmpleado] = useState({ id_empleado: '', nombre: '', apellido: '' });

  useEffect(() => {
    const fetchLastFacturaId = async () => {
      try {
        const response = await fetch('http://localhost:3001/factura/getlastfacturaid');
        const data = await response.json();
        const newLastFacturaId = parseInt(data.ultimoID) + 1; 
        setLastFacturaId(newLastFacturaId);
        console.log('----> Hijo FacturaTop, me esta llegando: ', data);
      } catch (error) {
        console.error('Error al obtener el último ID de factura:', error);
      }
    };

    fetchLastFacturaId();

    const userSession = JSON.parse(localStorage.getItem('usuario'));
    console.log('----> Usuario en localStorage: ', userSession); 
    if (userSession) {
      setEmpleado({
        id_empleado: userSession.user,
        nombre: userSession.name,
        apellido: userSession.lastname
      });
    }
  }, []);

  console.log('----> Hijo FacturaTop, me esta llegando: ', usuarioSeleccionado);
  console.log(`----> Este es el usuario en Login: ${empleado.id_empleado} ${empleado.nombre} ${empleado.apellido}`); // Debugging employee state

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const formattedTime = currentDate.toLocaleTimeString();

  return (
    <div className='factura_header--Container'>
      <div className="facturaTop_Top-Lef--Container">
        <div className="Factura_top-left">
          <div className="grupDiv_Factura-Right">
            <span className='tittleGrup_Factura'>ID Factura:</span>
            <span className='tittleGrup_Factura'>Fecha de la Factura:</span>
            <span className='tittleGrup_Factura'>Hora de la Factura:</span>
          </div>
          <div className="grupDiv_Factura-Left">
            <span className='resultGrup_Factura'>#{lastFacturaId}</span>
            <span className='resultGrup_Factura'>{formattedDate}</span>
            <span className='resultGrup_Factura'>{formattedTime}</span>
          </div>
        </div>
        <div className="Factura-Cliente_top-left">
          <div className="grupDiv_Factura-Right">
            <span className='tittleGrup_Factura'>ID Cliente:</span>
            <span className='tittleGrup_Factura'>Nombre del Cliente:</span>
            <span className='tittleGrup_Factura'>NIT:</span>
            <span className='tittleGrup_Factura'>Teléfono:</span>
          </div>
          <div className="grupDiv_Factura-Left">
            {usuarioSeleccionado ? (
              <>
                <span className='resultGrup_Factura'>{usuarioSeleccionado.ID}</span>
                <span className='resultGrup_Factura'>{usuarioSeleccionado.Nombre}</span>
                <span className='resultGrup_Factura'>-</span>
                <span className='resultGrup_Factura'>{usuarioSeleccionado.Telefono}</span>
              </>
            ) : (
              <>
                <span className='resultGrup_Factura'>-</span>
                <span className='resultGrup_Factura'>-</span>
                <span className='resultGrup_Factura'>-</span>
                <span className='resultGrup_Factura'>-</span>
              </>
            )}
          </div>
        </div>
        <div className="facturaMain-info">
        </div>
      </div>
      <div className="facturaTop_Top-Right--Container">
        <div className="tittlesFactura-TopRight">
          <div className="ID_Factura--Top-Right">
            <span className='tittleGrup_Factura--ID'>#{lastFacturaId}</span>
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
              <span className='resultGrup_Factura'>{empleado.id_empleado}</span>
              <span className='resultGrup_Factura'>{empleado.nombre} {empleado.apellido}</span>
            </div>
          </div>
          <div className="separador__Factura-TopRight"></div>
          <div className="ClienteFactura--TopRight">
            <div className="grupDiv_Factura-Right">
              <span className='tittleGrup_Factura'>Dirección del Cliente:</span>
              <span className='tittleGrup_Factura'>Correo electrónico:</span>
            </div>
            <div className="grupDiv_Factura-Left">
              {usuarioSeleccionado ? (
                <>
                  <span className='resultGrup_Factura'>{usuarioSeleccionado.Direccion}</span>
                  <span className='resultGrup_Factura'>{usuarioSeleccionado.Email}</span>
                </>
              ) : (
                <>
                  <span className='resultGrup_Factura'>-</span>
                  <span className='resultGrup_Factura'>-</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacturaTop;
