 import React, { useEffect, useState } from 'react';
import '../blata.css';
import axios from 'axios';
import { RegisterCliente } from './RegisterCliente';
import { TablaClientesItem } from './TablaClientesItem';

function TablaClientes() {

  const [datos, setDatos] = useState([]);
  const [registerform, setRegisterform] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [searchFields, setSearchFields] = useState({
    nombre: true,
    Apellido: true,
    Rol_Usuario: false,
    Nombre_estado: false,
    id: true
  });

  useEffect(() => {
    consulta();
  }, []);

  const consulta = () => {
    axios.get("http://localhost:3001/usuario/mostrarclientes")
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

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
  
    const filteredResults = datos.filter((usuario) => {
      let match = false;
  
      if (searchFields.nombre) {
        match = match || usuario.nombre.toLowerCase().includes(term.toLowerCase());
      }
      if (searchFields.Apellido) {
        match = match || usuario.Apellido.toLowerCase().includes(term.toLowerCase());
      }
      if (searchFields.id) {
        match = match || usuario.id.toString().includes(term); // Convertimos `id` a string
      }
  
      return match;
    });
  
    setFilteredData(filteredResults);
  };
  

  return (
    <>
      <div className='main-container'>
        <div>
          <h1 className='titel'>Clientes</h1>
        </div>
        <hr />
          <div className="option-container">
            <form className="form">
              <div className='content-upper'>
                <div className='buscar'>
                <input type="search" id="search" name="search" placeholder="buscar" className='barra-buscar' value={searchTerm} onChange={handleSearch} />
                  <button className='boton-busq'onClick={handleSearch}>Buscar</button>
                </div>
                <div className='teush'>
                  <button type="button" className="addbutton" id="lanzar-modal" name="agregar" onClick={() => setRegisterform(true)}><i class="bi bi-person-plus-fill"></i> Agregar </button>
                </div>
                <RegisterCliente isOpen={registerform} closeModal={handleRegisterFormClose} reConsulta={actualizarTabla} />
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
                  <td>e-mail</td>
                  <td>Direccion</td>
                  <td>Telefono</td>
                  <td>Estado</td>
                  <td className='columna_acciones' id='columna_acciones'>Acciones</td>
                </tr>
              </thead>
              <tbody>
              {
                (!searchTerm ? datos : filteredData).map((cliente, index) => {
                  return (
                    <TablaClientesItem
                      key={cliente.id}
                      id={cliente.id}
                      name={cliente.nombre}
                      lastname={cliente.Apellido}
                      email={cliente.email}
                      direccion={cliente.direccion}
                      tel={cliente.telefono}
                      estado={cliente.Nombre_estado}
                      idEstado={cliente.idEstado}
                      consulta={actualizarTabla}
                    />
                  );
                })}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </>
  )
}

export default TablaClientes;