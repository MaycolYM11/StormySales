import React, { useState } from 'react';
import './tabla.css';
import * as XLSX from 'xlsx';
//Se actualiza 

const Tabla = () => {
  const datos = [
    {
      id: 1001339605,
      name: 'Miguel Angel Ayala Pinilla',
      lastSaleDate: '2024-04-31T13:25:00',
      totalSales: 5000000,
      acEVOSInvoices: 10,
      status: 'Mayor que la vez pasada',
    },
    {
      id: 1001339606,
      name: 'Jean Carlo Beltran',
      lastSaleDate: '2024-04-30T12:45:00',
      totalSales: 4500000,
      acEVOSInvoices: 8,
      status: 'Mayor que la vez pasada',
    },
    {
      id: 1001339607,
      name: 'Maria Fernanda Rodriguez Martinez',
      lastSaleDate: '2024-05-01T11:30:00',
      totalSales: 3000000,
      acEVOSInvoices: 5,
      status: 'Mayor que la vez pasada',
    },
    {
      id: 1001339608,
      name: 'Juan Diego Gonzales Chinchilla',
      lastSaleDate: '2024-05-02T11:30:00',
      totalSales: 3000000,
      acEVOSInvoices: 5,
      status: 'Peor que la vez pasada',
    },
    {
      id: 1001339609,
      name: 'Maycol Alonso Cardona Sanchez',
      lastSaleDate: '2024-05-05T11:30:00',
      totalSales: 3000000,
      acEVOSInvoices: 5,
      status: 'Más bajo que la vez pasada',
    },
    {
      id: 1001339610,
      name: 'Andres Santiago Moreno Pineda',
      lastSaleDate: '2024-05-17T11:30:00',
      totalSales: 3000000,
      acEVOSInvoices: 5,
      status: 'Más bajo que la vez pasada',
    },
  ];

  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [empleadoSeleccionadoData, setEmpleadoSeleccionadoData] = useState(null);

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

  const manejarBuscar = () => {
    // Lógica de búsqueda
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
    <div>
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
          placeholder="Buscar por nombre o ID "
          value={terminoBusqueda}
          onChange={manejarCambioBusqueda}
        />
        <button onClick={manejarBuscar}>Buscar</button>
        <div className="date-range-picker">
          <label>Desde:</label>
          <input type="date" value={fechaInicio} onChange={manejarCambioFechaInicio} />
        </div>
        <div className="date-range-picker2">
        <label>Hasta:</label>
          <input type="date" value={fechaFin} onChange={manejarCambioFechaFin} />
          </div>
        <div className='buttonD' onClick={manejarDescargarInformes}>Descargar informes</div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID de Empleado</th>
            <th>Nombre del Empleado</th>
            <th>Fecha de última venta</th>
            <th>Total de Ventas</th>
            <th>Facturas Activas</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {datosFiltrados.map((fila) => (
            <tr key={fila.id} onClick={() => manejarSeleccionEmpleado(fila.id)}>
              <td><span className="purple">{fila.id}</span></td>
              <td>{fila.name}</td>
              <td>{new Date(fila.lastSaleDate).toLocaleDateString()}</td>
              <td><span className="currency">$ </span>{fila.totalSales.toLocaleString()}</td>
              <td><span className="purple"> {fila.acEVOSInvoices } </span>
              <span className="white">Facturas</span></td>
              <td className={obtenerClaseEstado(fila.status)}>{fila.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {
empleadoSeleccionadoData && (
        <div className={`empleado-seleccionado ${empleadoSeleccionadoData ? 'mostrar' : ''}`}>
          <h3>Detalles del Empleado:</h3>
          <div className="detalles">
            <p><strong>ID:</strong> {empleadoSeleccionadoData.id}</p>
            <p><strong>Nombre:</strong> {empleadoSeleccionadoData.name}</p>

            {/* Agregar más detalles si es necesario */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tabla;
