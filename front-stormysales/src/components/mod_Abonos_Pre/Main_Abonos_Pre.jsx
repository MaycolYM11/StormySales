import React, { useState, useEffect } from "react";
import "./MainAbonos.css";
import AbonoTop from "./AbonoTop";
import axios from "axios";

const Main_Abonos_Pre = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [facturaData, setFacturaData] = useState(null);
  const [abonosData, setAbonosData] = useState([]);
  const [error, setError] = useState(null);
  const [usuario, setUsuario] = useState([]);
  const [fechaAbono, setFechaAbono] = useState("");
  const [cantidadAbono, setCantidadAbono] = useState("");
  const [descAbono, setDescAbono] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [subtotal, setSubtotal] = useState(null);
  const [iva, setIva] = useState(null);
  const [total, setTotal] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/Abono/BuscarFacturaCliente/${searchQuery}/${searchQuery}`
      );
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
          const response = await axios.get(
            `http://localhost:3001/Abono/AbonosDatos/${facturaData.ID_factura}`
          );
          setAbonosData(response.data);
        } catch (err) {
          setError("Error al obtener los abonos.");
        }
      }
    };

    fetchAbonos();
  }, [facturaData]);

  useEffect(() => {
    const traerDatos = async () => {
      const datos = await JSON.parse(localStorage.getItem("usuario"));
      if (datos) {
        let cargo = "";
        if (datos.rol === 1) {
          cargo = "Supervisor";
        } else if (datos.rol === 2) {
          cargo = "Vendedor";
        }
        setUsuario({
          user: datos.name + " " + datos.lastname,
          cargo: cargo,
          rol: datos.rol,
          id: datos.user,
        });
      }
    };
    traerDatos();
  }, []);

  const calcularTotalRestante = (index) => {
    let totalRestante = facturaData.importe_total;
    for (let i = 0; i <= index; i++) {
      totalRestante -= abonosData[i].cantidad_abono;
    }
    return totalRestante;
  };

  const handleRegistrarAbono = async () => {
    if (!facturaData || !usuario.id || !fechaAbono || !cantidadAbono || !descAbono || !metodoPago) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const nuevoAbono = {
      ID_factura_fk: facturaData.ID_factura,
      ID_Vendedor_fk: usuario.id,
      fecha_abono: new Date(fechaAbono).toISOString().split('T')[0],
      cantidad_abono: parseFloat(cantidadAbono),
      Desc_Abono: descAbono,
      Metodo_Pago: metodoPago,
    };

    try {
      const response = await axios.post('http://localhost:3001/Abono/CrearAbono', nuevoAbono);
      if (response.data.message === 'Abono creado correctamente') {
        setError(null);
        
        const response = await axios.get(
          `http://localhost:3001/Abono/AbonosDatos/${facturaData.ID_factura}`
        );
        setAbonosData(response.data);
      
        setFechaAbono("");
        setCantidadAbono("");
        setDescAbono("");
        setMetodoPago("");
        setSubtotal(null);
        setIva(null);
        setTotal(null);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Error al crear el abono.");
    }
  };

  const handleCalcular = () => {
    const cantidad = parseFloat(cantidadAbono);
    if (!isNaN(cantidad)) {
      const subtotalCalculado = cantidad * 0.88;
      const ivaCalculado = cantidad * 0.12;
      setSubtotal(subtotalCalculado.toFixed(2));
      setIva(ivaCalculado.toFixed(2));
      setTotal(cantidad.toFixed(2));
    } else {
      setSubtotal(null);
      setIva(null);
      setTotal(null);
      setError("Por favor, ingrese un valor válido para la cantidad de abono.");
    }
  };

  const handleEliminarAbono = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3001/Abono/EliminarAbono/${id}`);
      if (response.data.message === 'Abono eliminado correctamente') {
        
        const response = await axios.get(
          `http://localhost:3001/Abono/AbonosDatos/${facturaData.ID_factura}`
        );
        setAbonosData(response.data);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Error al eliminar el abono.");
    }
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
          <button className="ButtonBuscar" onClick={handleSearch}>
            Buscar
          </button>
        </div>
        <div className="containerAbono-Top">
          {facturaData && <AbonoTop facturaData={facturaData} />}
          {error && (
            <div className="errorTop">
              {error} <i className="bi bi-exclamation-circle"></i>
            </div>
          )}
        </div>
        <div className="ContainerAbono_Center">
          <div className="tableCenter_Abono">
            <table className="tb__Abono">
              <thead>
                <tr className="th__Abono">
                  <th className="th__Abono th--Item">N° Item</th>
                  <th className="th__Abono th--FechaAbono">Fecha de Abono</th>
                  <th className="th__Abono th--Empleado">Empleado a Cargo</th>
                  <th className="th__Abono th--CantidadAbono">
                    Cantidad de Abono
                  </th>
                  <th className="th__Abono th--Calculo">Calculo</th>
                  <th className="th__Abono th--Acciones">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {abonosData.length > 0 ? (
                  abonosData.map((abono, index) => (
                    <tr className="tr__Abono" key={index}>
                      <td className="td__Abono td--Item">{index + 1}</td>
                      <td className="td__Abono td--FechaAbono">
                        {abono.fecha_abono}
                      </td>
                      <td className="td__Abono td--Empleado">
                        {abono.nombre} {abono.Apellido}
                      </td>
                      <td className="td__Abono td--CantidadAbono">
                        <span className="precioColor">
                          ${abono.cantidad_abono}
                        </span>
                      </td>
                      <td className="td__Abono td--Calculo">
                        <span className="precioColor">
                          ${calcularTotalRestante(index)}
                        </span>
                      </td>
                      <td className="td__Abono td--Acciones">
                        <div className="AccionesAbono-Container-Row">
                          <div className="containerIconsAbono-Acciones">
                            <button 
                              className="BTN_iconClick-Abono" 
                              onClick={() => handleEliminarAbono(abono.ID_abono)}>
                              <i className="bi bi-trash3"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr> 
                  ))
                ) : (
                  <tr className="tr__Abono">
                    <td colSpan="6" className="td__Abono td--NoData">
                    
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="Abono-bootomTable_Show">
              <div className="nada"></div>
              <div className="Abono-bootomTable_Show_Right"></div>
            </div>
          </div>
        </div>
        <div className="contenedorRegistrar">
          <button className="btn-Registrar" onClick={handleRegistrarAbono}>
            Registrar Abono
          </button>
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
              <input type="text" className="cantidadAbono" value={cantidadAbono} onChange={(e) => setCantidadAbono(e.target.value)} />
            </div>
            <div className="iconoInput">
              <i className="bi bi-currency-dollar"></i>
            </div>
          </div>
          <div className="formInputAbono">
            <div className="formAbono">
              <label htmlFor="">Seleccione la proxima fecha de pago</label>
              <input type="date" className="fechaAbono" value={fechaAbono} onChange={(e) => setFechaAbono(e.target.value)} />
            </div>
            <div className="iconoInput">
              <i className="bi bi-calendar-event-fill"></i>
            </div>
          </div>
          <div className="formInputAbono">
            <div className="formAbono">
              <label htmlFor="">Nota (max. 225)</label>
              <input type="text" className="Desc_Abono" value={descAbono} onChange={(e) => setDescAbono(e.target.value)} />
            </div>
            <div className="iconoInput">
              <i className="bi bi-input-cursor-text"></i>
            </div>
          </div>
          <div className="formBotones">
            <div>
              <button className="btn-Calcular" onClick={handleCalcular}>
                <span>+</span> Calcular
              </button>
            </div>
            <div className="formMpago">
              <select className="selectMpago" value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)}>
                <option value="" hidden>
                  Escoger metodo de pago
                </option>
                <option value="Efectivo">Efectivo</option>
                <option value="Transferencia">Transferencia</option>
                <option value="Tarjeta">Tarjeta</option>
              </select>
            </div>
          </div>
        </div>
        <div className="AbonoDatos">
          <div className="datoSubtotal">
            <span className="tittle_Abono">SUB TOTAL</span>
            <span className="result_Abono">
              <span className="tittle_Abono">$</span> {subtotal !== null ? subtotal : "----"}
            </span>
          </div>
          <div className="datoIva">
            <span className="tittle_Abono">IVA 12%</span>
            <span className="result_Abono">
              <span className="tittle_Abono">$</span> {iva !== null ? iva : "----"}
            </span>
          </div>
          <div className="datoTotal">
            <span className="tittle_AbonoTotal">Total</span>
            <span className="result_AbonoTotal">
              <span className="tittle_AbonoTotal">$</span> {total !== null ? total : "----"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main_Abonos_Pre;
