import React from "react";
import "./MainAbonos.css";

const Main_Abonos_Pre = () => {
  return (
    <div className="MainContainer_Abonos">
      <div className="AbonoRight">
        <div className="BuscarFactura">
          <input
            className="InputBuscar"
            type="text"
            placeholder="Buscar ID factura o ID Cliente"
          />
          <button className="ButtonBuscar">Buscar</button>
        </div>
      </div>
      <div className="AbonoLeft">
        <div className="formAbonotittle">
          <h2>Datos del Producto</h2>
        </div>
        <div className="formInputAbono">
          <div className="formAbono">
            <label htmlFor="">Escriba al valor para abonar</label>
            <input type="text" />
          </div>
        </div>
        <div className="formInputAbono">
          <div className="formAbono">
            <label htmlFor="">Seleccione la proxima fecha de pago</label>
            <input type="text" />
          </div>
        </div>
        <div className="formInputAbono">
          <div className="formAbono">
            <label htmlFor="">Nota (max. 225)</label>
            <input type="text" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main_Abonos_Pre;
