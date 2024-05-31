import React, { useState, useEffect } from "react";
import "./MainAbonos.css";
import AbonoTop from "./AbonoTop";
import axios from 'axios';

const Main_Abonos_Pre = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [facturaData, setFacturaData] = useState(null);
  const [abonosData, setAbonosData] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/Abono/BuscarFacturaCliente/${searchQuery}/${searchQuery}`);
      setFacturaData(response.data[0]); 
      setError(null);
    } catch (err) {
      setError("No se encontraron datos o hubo un error en la búsqueda.");
      setFacturaData(null);
      setAbonosData([]);
    }
  };

  useEffect(() => {
    const fetchAbonos = async () => {
      if (facturaData) {
        try {
          const response = await axios.get(`http://localhost:3001/Abono/AbonosDatos/${facturaData.ID_factura}`);
          setAbonosData(response.data);
        } catch (err) {
          setError("Error al obtener los abonos.");
        }
      }
    };

    fetchAbonos();
  }, [facturaData]);

  const calcularTotalRestante = (index) => {
    let totalRestante = facturaData.importe_total;
    for (let i = 0; i <= index; i++) {
      totalRestante -= abonosData[i].cantidad_abono;
    }
    return totalRestante;
  };

  return (
    <div className="MainContainer_Abonos">
      <div className="AbonoRight">
        <div className="BuscarFactura">
          <input
            className="InputBuscar"
            type="text"
            placeholder="Buscar ID factura o ID Cliente"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="ButtonBuscar" onClick={handleSearch}>Buscar</button>
        </div>
        <div className="containerAbono-Top">
          {facturaData && <AbonoTop facturaData={facturaData} />}
          {error && <div className="error">{error}</div>}
        </div>
        <div className="ContainerAbono_Center">
          <div className="tableCenter_Abono">
            <table className="tb__Abono">
              <thead>
                <tr className="th__Abono">
                  <th className="th__Abono th--Item">N° Item</th>
                  <th className="th__Abono th--FechaAbono">Fecha de Abono</th>
                  <th className="th__Abono th--Empleado">Empleado a Cargo</th>
                  <th className="th__Abono th--CantidadAbono">Cantidad de Abono</th>
                  <th className="th__Abono th--Calculo">Calculo</th>
                  <th className="th__Abono th--Acciones">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {abonosData.length > 0 ? (
                  abonosData.map((abono, index) => (
                    <tr className="tr__Abono" key={index}>
                      <td className="td__Abono td--Item">{index + 1}</td>
                      <td className="td__Abono td--FechaAbono">{abono.fecha_abono}</td>
                      <td className="td__Abono td--Empleado">Empleado</td>
                      <td className="td__Abono td--CantidadAbono">
                        <span className="precioColor">${abono.cantidad_abono}</span>
                      </td>
                      <td className="td__Abono td--Calculo">
                        <span className="precioColor">${calcularTotalRestante(index)}</span>
                      </td>
                      <td className="td__Abono td--Acciones">
                        <div className="AccionesAbono-Container-Row">
                          <div className="containerIconsAbono-Acciones">
                            <button className="BTN_iconClick-Abono">
                              <i className="bi bi-pencil-square"></i>
                            </button>
                            <div className="separadorVerticalAbono-Acciones"></div>
                            <button className="BTN_iconClick-Abono">
                              <i className="bi bi-trash3"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="tr__Abono">
                    <td colSpan="6" className="td__Abono td--NoData">No hay abonos disponibles</td>
                  </tr>
                )}
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
              <span className="tittle_Abono">$</span> ----
            </span>
          </div>
          <div className="datoIva">
            <span className="tittle_Abono">IVA 12%</span>
            <span className="result_Abono">
              <span className="tittle_Abono">$</span> ----
            </span>
          </div>
          <div className="datoTotal">
            <span className="tittle_AbonoTotal">Total</span>
            <span className="result_AbonoTotal">
              <span className="tittle_AbonoTotal">$</span> ----
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main_Abonos_Pre;
