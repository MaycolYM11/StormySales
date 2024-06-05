import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './tabla.css';
import * as XLSX from 'xlsx';

const Tabla = () => {
  const [datos, setDatos] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [empleadoSeleccionadoData, setEmpleadoSeleccionadoData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/ventas')
      .then(response => {
        setDatos(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const manejarCambioBusqueda = (evento) => {
    setTerminoBusqueda(evento.target.value);
  };

  const manejarCambioFechaInicio = (evento) => {
    setFechaInicio(evento.target.value);
  };

  const manejarCambioFechaFin = (evento) => {
    setFechaFin(evento.target.value);
  };

  const manejarSeleccionEmpleado = (id) => {
    const empleado = datos.find((e) => e.id === id);
    setEmpleadoSeleccionadoData(empleado);
  };

  const obtenerClaseEstado = (estado) => {
    if (estado.includes('Mayor')) {
      return 'status mayor';
    } else if (estado.includes('Peor')) {
      return 'status peor';
    } else if (estado.includes('Más bajo')) {
      return 'status masbajo';
    } else {
      return 'status';
    }
  };

  const manejarDescargarInformes = () => {
    if (empleadoSeleccionadoData) {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet([empleadoSeleccionadoData]);
      XLSX.utils.book_append_sheet(wb, ws, 'InformeEmpleado');
      XLSX.writeFile(wb, 'InformeEmpleado.xlsx');
    } else {
      alert('Por favor, selecciona un empleado antes de descargar el informe.');
    }
  };

  const datosFiltrados = datos.filter((fila) => {
    const coincideTerminoBusqueda =
      fila.name.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
      fila.id.toString().includes(terminoBusqueda);
    const coincideRangoFechas =
      (fechaInicio === '' || new Date(fila.lastSaleDate) >= new Date(fechaInicio)) &&
      (fechaFin === '' || new Date(fila.lastSaleDate) <= new Date(fechaFin));
    return coincideTerminoBusqueda && coincideRangoFechas;
  });

  return (
    <div className="tabla-container">
      <div className="table-header">
        <h2>Informes de Ventas por Vendedor</h2>
        <p>
          En esta ventana, el usuario podrá generar un informe de ventas por cada vendedor, podrá ver una data
          detallada de las ventas realizadas en el mes o en un lapso de tiempo determinado usando el Bitrador de fechas
          (Desde y Hasta) en el cual se puede determinar el rango de la
        </p>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por nombre o ID"
          value={terminoBusqueda}
          onChange={manejarCambioBusqueda}
        />
        {/* <button onClick={manejarBuscar}>Buscar</button> */}
        <div className="date-range-picker">
          <label>Desde:</label>
          <input type="date" value={fechaInicio} onChange={manejarCambioFechaInicio} />
        </div>
        <div className="date-range-picker2">
          <label>Hasta:</label>
          <input type="date" value={fechaFin} onChange={manejarCambioFechaFin} />
        </div>
        <button className="buttonD" onClick={manejarDescargarInformes}>Descargar Informe</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Fecha de Última Venta</th>
            <th>Total de Ventas</th>
            <th>Facturas EVOS</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {datosFiltrados.map((fila) => (
            <tr key={fila.id} onClick={() => manejarSeleccionEmpleado(fila.id)}>
              <td>{fila.id}</td>
              <td>{fila.name}</td>
              <td>{new Date(fila.lastSaleDate).toLocaleDateString()}</td>
              <td className="currency">{fila.totalSales.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
              <td>{fila.acEVOSInvoices}</td>
              <td>
                <span className={obtenerClaseEstado(fila.status)}>{fila.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {empleadoSeleccionadoData && (
        <div className="empleado-seleccionado mostrar">
          <div className="detalles">
            <p>
              <strong>ID:</strong> {empleadoSeleccionadoData.id}
            </p>
            <p>
              <strong>Nombre:</strong> {empleadoSeleccionadoData.name}
            </p>
            <p>
              <strong>Fecha de Última Venta:</strong> {new Date(empleadoSeleccionadoData.lastSaleDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Total de Ventas:</strong> {empleadoSeleccionadoData.totalSales.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
            </p>
            <p>
              <strong>Facturas EVOS:</strong> {empleadoSeleccionadoData.acEVOSInvoices}
            </p>
            <p>
              <strong>Estado:</strong> <span className={obtenerClaseEstado(empleadoSeleccionadoData.status)}>{empleadoSeleccionadoData.status}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tabla;
