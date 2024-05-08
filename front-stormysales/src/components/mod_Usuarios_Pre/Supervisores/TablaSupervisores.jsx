import React, { useEffect, useState } from 'react';
import { TablaAdminItem } from './TablaSupervisoresItem';
import '../Tabla.css';
import { RegisterAdmin } from './RegisterSupervisor';
import axios from 'axios';

function TablaSupervisores() {

  const [datos, setDatos] = useState([]);
  const [registerform, setRegisterform] = useState(false);

  useEffect(() => {
    consulta();
  }, []);

  const consulta = () => {
    axios.get("http://localhost:3001/usuario/getsupervisor")
      .then((response) => {
        setDatos(response.data);
      })
      .catch(error => {
        console.error("Error al consultar los datos:", error);
      });
  }

  const actualizarTabla = () => {
    consulta();
  };

  const handleRegisterFormClose = () => {
    setRegisterform(false);
    actualizarTabla(); 
  }

  return (
    <>
      <div>
        <h1>SUPERVISORES</h1>
      </div>
      <div className='main-container'>
        <hr />
        <div className='table-container'>
          <div className="option-container">
            <form className="form">
              <div className='buscar'>
                <input type="search" id="search" name="search" placeholder="buscar" className='barra-buscar' />
                <button className='boton b7'>Buscar</button>
              </div>
              <div className='teush'>
                <button type="button" className="boton b4" id="lanzar-modal" name="agregar" onClick={() => setRegisterform(true)}>Agregar</button>
              </div>
              <RegisterAdmin isOpen={registerform} closeModal={handleRegisterFormClose} reConsulta={actualizarTabla} />
            </form>
          </div>

          <section className="table__body">
            <table className='tabla'>
              <thead>
                <tr>
                  <td>Nombre</td>
                  <td>Id</td>
                  <td>Estado</td>
                  <td>Acciones</td>
                </tr>
              </thead>
              <tbody>
                {
                  !datos ? 'Loading.....' :
                    datos.map((usuario, index) => {
                      return (
                        <TablaAdminItem
                          key={usuario.id}
                          id={usuario.id}
                          // tipoId={usuario.tipoId}
                          name={usuario.nombre}
                          lastname={usuario.Apellido}
                          contrasena={usuario.Contrasena}
                          cargo={usuario.Rol_Usuario}
                          estado={usuario.Nombre_estado}
                          idEstado={usuario.id_estado}
                          consulta={actualizarTabla}
                        />
                      )
                    })
                }
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </>
  )
}

export default TablaSupervisores;