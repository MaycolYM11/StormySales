import React, { useEffect, useState } from 'react';
import { TablaAdminItem } from './TablaSupervisoresItem';
import '../blata.css';
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
      <div className='main-container'>
        <div>
          <h1 className='titel'>SUPERVISORES</h1>
        </div>
        <hr />
          <div className="option-container">
            <form className="form">
              <div className='content-upper'>
                <div className='buscar'>
                  <input type="search" id="search" name="search" placeholder="buscar" className='barra-buscar' />
                  <button className='boton-busq'>Buscar</button>
                </div>
                <div className='teush'>
                  <button type="button" className="addbutton" id="lanzar-modal" name="agregar" onClick={() => setRegisterform(true)}><i class="bi bi-person-plus-fill"></i> Agregar </button>
                </div>
                <RegisterAdmin isOpen={registerform} closeModal={handleRegisterFormClose} reConsulta={actualizarTabla} />
              </div>
            </form>
          </div>
        <div className='table-container'>

          <section className="table__body">
            <table className='tabla'>
              <thead>
                <tr className='cabeza'>
                  <td>Id</td>
                  <td>Nombre</td>
                  <td>Estado</td>
                  <td className='columna_acciones' id='columna_acciones'>Acciones</td>
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