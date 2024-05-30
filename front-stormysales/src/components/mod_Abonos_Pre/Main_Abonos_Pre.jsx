import React from "react";
import "./MainAbonos.css";
import AbonoTop from "./AbonoTop";

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
        <div className="containerAbono-Top">
          <AbonoTop />
        </div>
        <div className="ContainerAbono_Center">
          <div className="tableCenter_Abono">
            <table className="tb__Abono">
              <thead>
                <tr className="th__Abono">
                  <th className="th__Abono th--Item">N° Item</th>
                  <th className="th__Abono th--Descripcion">Descripción</th>
                  <th className="th__Abono th--Cantidad">Cantidad</th>
                  <th className="th__Abono th--Precio">Precio Unitario</th>
                  <th className="th__Abono th--Importe">Importe</th>
                  <th className="th__Abono th--Acciones">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr className="tr__Abono">
                  <td className="td__Abono td--Item"></td>
                  <td className="td__Abono td--Descripcion"></td>
                  <td className="td__Abono td--Cantidad"></td>
                  <td className="td__Abono td--Precio">
                    <span className="precioColor">$</span>
                  </td>
                  <td className="td__Abono td--Importe">
                    <span className="precioColor">$</span>
                  </td>
                  <td className="td__Abono td--Acciones">
                    <div className="AccionesAbono-Container-Row"> {/*Cambio de clase */}
                      <div className="containerIconsAbono-Acciones">{/*Cambio de clase */}
                        <button className="BTN_iconClick-Abono">
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <div className="separadorVerticalAbono-Acciones"></div>{/*Cambio de clase */}
                        <button className="BTN_iconClick-Abono">
                          <i className="bi bi-trash3"></i>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="Abono-bootomTable_Show">
              <div className="nada"></div>
              <div className="Abono-bootomTable_Show_Right"></div>
            </div>
          </div>
          <div className="contenedorRegistrar">
            <button className="btn-Registrar">Registrar Abono</button>
          </div>
        </div>
      </div>
      <div className="AbonoLeft">
        <div className="AbonoForm">
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
          <div className="formBotones">
            <div>
              <button className="btn-Calcular">
                <span>+</span> Calcular
              </button>
            </div>
            <div className="formMpago">
              <select className="selectMpago" name="" id="">
                <option value="" hidden>
                  Escoger metodo de pago
                </option>
                <option value="">perro</option>
                <option value="">perro</option>
                <option value="">perro</option>
              </select>
            </div>
          </div>
        </div>
        <div className="AbonoDatos">
          <div className="datoSubtotal">
            <span className="tittle_Abono">SUB TOTAL</span>
            <span className="result_Abono">
              <span className="tittle_Abono">$</span> 37.000
            </span>
          </div>
          <div className="datoIva">
            <span className="tittle_Abono">IVA 12%</span>
            <span className="result_Abono">
              <span className="tittle_Abono">$</span> 4500
            </span>
          </div>
          <div className="datoTotal">
            <span className="tittle_AbonoTotal">Total</span>
            <span className="result_AbonoTotal">
              <span className="tittle_AbonoTotal">$</span> 42.000
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main_Abonos_Pre;
