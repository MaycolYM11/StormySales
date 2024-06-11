import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ListdoStyle.css";

const ListadoAbono = ({ isOpen, closeModal, onFacturaClick }) => {
  const [listadoData, setListadoData] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  const fetchFactura = async (searchQuery) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/Abono/ListadoFactura`, {
          params: {
            query: searchQuery
          }
        }
      );
      setListadoData(response.data);
    } catch (err) {
      setError("Error al obtener los abonos.");
    }
  };

  useEffect(() => {
    fetchFactura('');
  }, []);

  const handleSearch = () => {
    fetchFactura(query);
  };

  if (!isOpen) return null;

  return (
    <div className="ListadoModal">
      <div className="fondoListado">
        <div className="ListadoContenedor">
          <div className="encabezadolistado">
            <h2 className="TituloModal">Listado de Facturas</h2>
            <span className="CerrarVentana" onClick={closeModal}>
              &times;
            </span>
          </div>
          <div className="BuscarListado">
            <input
              className="InputBuscar"
              type="text"
              placeholder="Buscar ID factura o ID Cliente"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="ButtonBuscar" onClick={handleSearch}>Buscar</button>
          </div>
          <div className="tableCenter_Abono table_Listado">
            <table className="tb__Abono">
              <thead>
                <tr className="th__Abono">
                  <th className="th__Abono th__nFactura">N° Factura</th>
                  <th className="th__Abono th__nCliente">N° Cliente</th>
                  <th className="th__Abono th__nombreCliente">Nombre Cliente</th>
                  <th className="th__Abono th__fechaFactura">Fecha Factura</th>
                  <th className="th__Abono th__tFactura">Total Factura</th>
                  <th className="th__Abono th__tAbonos">Total Abonos</th>
                  <th className="th__Abono th--Acciones">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {listadoData.map((factura) => (
                  <tr className="tr__Abono" key={factura.ID_factura}>
                    <td className="td__Abono td__nFactura">{factura.ID_factura}</td>
                    <td className="td__Abono td__nCliente">{factura.id_cliente}</td>
                    <td className="td__Abono td__nombreCliente">{factura.nombre_cliente} {factura.apellido_cliente}</td>
                    <td className="td__Abono td__fechaFactura">{new Date(factura.fecha_hora_factura).toLocaleString()}</td>
                    <td className="td__Abono td__tFactura">
                      <span className="precioColor">$</span> {factura.total_factura}
                    </td>
                    <td className="td__Abono td__tAbonos">
                      <span className="precioColor">$</span> {factura.total_abonos}
                    </td>
                    <td className="td__Abono td--Acciones">
                      <div className="AccionesAbono-Container-Row">
                        <div className="containerIconsAbono-Acciones">
                          <button 
                            className="BTN_iconClick-Abono" 
                            onClick={() => onFacturaClick(factura.ID_factura)}>
                            <i className="bi bi-check2-square"></i>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {error && <p className="error">{error}</p>}
            <div className="Abono-bootomTable_Show">
              <div className="nada"></div>
              <div className="Abono-bootomTable_Show_Right"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListadoAbono;
