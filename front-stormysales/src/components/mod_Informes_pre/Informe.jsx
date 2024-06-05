import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './informe.css';
import { Link } from 'react-router-dom';



function InformeEmpleados() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/informes/informeInventario');
        if (response.status !== 200) {
          throw new Error('Error fetching data from API');
        }
        const data = response.data.datos;
        setProductos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <main className='contenedor_informe'>
      {/* <TituloyDesc
        titulo='Informe Inventario'
        descripcion='Este es el módulo encargado de realizar los Informes de los productos y generar los informes de cada reporte.'
      /> */}
      <hr />
      <section className="">
        {/* Botones de reportes */}
        <div className='mod__Ventas'>
          <div className="venta">
              <div className="btones">
            <center>
                <div className="button-container">
                  <Link to='/GestionInformes/InformeVentas' className='prueba'><button className="b1" id="btn">Reporte de Ventas</button></Link>
                  <Link to='/GestionInformes/InformeDeudores'><button className="b1" id="btn">Reporte de Deudores</button></Link>
                </div></center>
              </div>
          </div>
        </div>
      </section>
      {/* Tabla de productos */}
      <table>
        <thead>
          <tr>
            <th>ID Producto</th>
            <th>Nombre Producto</th>
            <th>Nombre Tipo Producto</th>
            <th>Descripción</th>
            <th>Precio Proveedor</th>
            <th>Precio Venta</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
            <tr key={index}>
              <td>{producto.ID_Producto_PK}</td>
              <td>{producto.Nombre_Producto}</td>
              <td>{producto.Nombre_Tipo_Producto}</td>
              <td>{producto.Descripcion}</td>
              <td>{producto.Precio_Proveedor}</td>
              <td>{producto.Precio_Venta}</td>
              <td>{producto.Stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default InformeEmpleados;
