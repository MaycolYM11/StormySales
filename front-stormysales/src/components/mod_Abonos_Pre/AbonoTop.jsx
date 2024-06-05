import React from "react";
import "./stylesAbono.css";
import LogoMini from "../../assets/Logo/Logo-2.png";

const AbonoTop = ({ facturaData }) => {
  return (
    <div className="abono_header--Container">
      <div className="abonoTop_Top-Lef--Container">
        <div className="Abono_top-left">
          <div className="grupDiv_Abono-Right">
            <span className="tittleGrup_Abono">ID Factura:</span>
            <span className="tittleGrup_Abono">Fecha de la factura:</span>
            <span className="tittleGrup_Abono">Hora de la factura:</span>
          </div>
          <div className="grupDiv_Abono-Left">
            <span className="resultGrup_Abono">{facturaData.ID_factura}</span>
            <span className="resultGrup_Abono">{facturaData.fecha_factura}</span>
            <span className="resultGrup_Abono">{facturaData.hora_factura}</span>
          </div>
        </div>
        <div className="Abono-Cliente_top-left">
          <div className="grupDiv_Abono-Right">
            <span className="tittleGrup_Abono">ID Cliente:</span>
            <span className="tittleGrup_Abono">Nombre del Cliente:</span>
            <span className="tittleGrup_Abono">Teléfono:</span>
            <span className="tittleGrup_Abono">Total Factura:</span>
          </div>
          <div className="grupDiv_Abono-Left">
            <span className="resultGrup_Abono">{facturaData.idcliente}</span>
            <span className="resultGrup_Abono">{facturaData.nombre_cliente} {facturaData.Apellido_cliente}</span>
            <span className="resultGrup_Abono">{facturaData.telefono}</span>
            <span className="resultGrup_Abono">${facturaData.importe_total}</span>
          </div>
        </div>
        <div className="abonoMain-info"></div>
      </div>
      <div className="abonoTop_Top-Right--Container">
        <div className="tittlesAbono-TopRight">
          <div className="ID_Abono--Top-Right">
            <span className="tittleGrup_Abono--ID">#00{facturaData.ID_factura}</span>
          </div>
          <div className="AbonoTittle--TopRight">
            <img
              className="logoMini--Tittle-abono"
              src={LogoMini}
              alt="LogoMini"
            />
            <span className="Abono--Tittle">Factura</span>
          </div>
        </div>
        <div className="Abono_Empleado--top-right">
          <div className="EmpleadoAbono--TopRight">
            <div className="grupDiv_Abono-Right">
              <span className="tittleGrup_Abono">ID Empleado:</span>
              <span className="tittleGrup_Abono">Nombre del Empleado:</span>
            </div>
            <div className="grupDiv_Abono-Left">
              <span className="resultGrup_Abono">{facturaData.id_empleado}</span>
              <span className="resultGrup_Abono">{facturaData.nombre_empleado} {facturaData.Apellido_empleado}</span>
            </div>
          </div>
          <div className="separador__Abono-TopRight"></div>
          <div className="ClienteAbono--TopRight">
            <div className="grupDiv_Abono-Right">
              <span className="tittleGrup_Abono">Dirección del Cliente:</span>
              <span className="tittleGrup_Abono">Estado de la factura:</span>
              {/* <span className="tittleGrup_Abono">Zona Correspondiente:</span> */}
            </div>
            <div className="grupDiv_Abono-Left">
              <span className="resultGrup_Abono">{facturaData.direccion}</span>
              <span className="resultGrup_Abono">{facturaData.estado_Factura}</span>
              {/* <span className="resultGrup_Abono">{facturaData.zona}</span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbonoTop;
