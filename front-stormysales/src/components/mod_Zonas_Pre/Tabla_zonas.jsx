import React, { useEffect, useState } from 'react';
import './Tablas.css';
import { Tabla_zonas_item } from './Tabla_zonas_item';
import Register_zonas from './Register_zonas';
import axios from 'axios';

function Tabla_zonas() {
  const [zonas, setZonas] = useState([]);
  const [registerform, setRegisterform] = useState(false);

  const consultarZonas = () => {
    axios.get("http://localhost:3001/zonas/rutas")
      .then((response)=>{
        setZonas(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener datos:', error);
      });
  };

  useEffect(()=>{
    consultarZonas();
  },[]);

  const actualizarTabla = () => {
    consultarZonas();
  };

  const abrirFormularioRegistro = () => {
    setRegisterform(true);
  };

  return (
    <>
      <div>
      </div>
      <div className='Buscar'>
        <input type="text" id="buscar" name="buscar" className='text_cuadro' placeholder="Buscar..."/>
        <button type="button" id="botonBuscar" className='botonBuscar'>Buscar</button>
      </div>
      <div className='teush'>
        <button type="button" className="botonAgre" id="lanzar-modal" name="agregar" onClick={abrirFormularioRegistro}><i class="biNuevaRuta bi-flag"></i> Nueva ruta</button>
      </div>
      <div className='main-container'>
        <hr/>
        <div className='table-container'>
          <div className="option-container">
            <form className="form">
              <div className='buscar'>
                <input type="search" id="search" name="search" placeholder="buscar" className='barra-buscar' />
                <button className='boton b7'>Buscar</button>
              </div>
            </form>
            <Register_zonas isOpen={registerform} closeModal={()=> setRegisterform(false)} reConsulta={actualizarTabla}/>
          </div>

          <section className="table__body">
            <table className='tabla'>
              <thead>
                <tr>
                  <th><h2>ID Zona</h2></th>
                  <th><h2>Nombre Zona</h2></th>
                  <th><h2>Estado</h2></th>
                  <th><h2>Empleado Asignado</h2></th>
                  <th><h2>Cantidad de Rutas</h2></th>
                  <th><h2>E-mail</h2></th>
                  <th><h2>Acciones</h2></th>
                </tr>
              </thead>
              <tbody>
                {zonas.map(zona => (
                  <Tabla_zonas_item 
                    key={zona.Id_zona}
                    Id_zona={zona.Id_zona}
                    Nombre_zona={zona.Nombre_zona}
                    Empleado_asignado={zona.Empleado_asignado}
                    Email={zona.Email}
                    Cantidad_rutas={zona.Cantidad_rutas}
                    Estado_zona={zona.Estado_zona}
                    consulta={actualizarTabla}
                  />
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </>
  )
}

export default Tabla_zonas;
