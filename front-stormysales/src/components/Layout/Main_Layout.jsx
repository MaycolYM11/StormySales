import './StylesLayout.css';
import SideMenu from '../SideMenu/MainSideMenu';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Inicio from '../../components/Home/MainHome';
import Facturacion from '../../components/mod_Facturacion_Pre/Main_Facturacion_Pre';
import Abonos from '../../components/mod_Abonos_Pre/Main_Abonos_Pre';
import Zonas from '../../components/mod_Zonas_Pre/Main_Zonas_Pre';
import Informes from '../../components/mod_Informes_pre/Main_Informes_Pre';
import TablaSupervisores from '../mod_Usuarios_Pre/Supervisores/TablaSupervisores';
import TablaVendedores from '../mod_Usuarios_Pre/Vendedores/TablaVendedores';
import TablaClientes from '../mod_Usuarios_Pre/Clientes/TablaClientes';
import Login from '../Login/Login';
import { ProtectedRoute } from '../protection/RutaProtegida';

const MainLayout = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    setUser(usuario);
  }, []);

  if (user === null) {
    // You can show a loading spinner here or return null
    return <div>Loading...</div>;
  }

  return (
    <div className='fullContainerSistem'>
      <div className='SideMenuLayout'>
        <SideMenu />
      </div>
      <div className="Main_ContentPages">
        <Routes>
          <Route path='/' element={user ? <Inicio /> : <Login />} />
          <Route path='/login' element={<Login />} />
          
          <Route element={<ProtectedRoute isAllowed={!!user} />}>
            <Route path="/inicio" element={<Inicio className="fullHeight" />} />
          </Route>
          <Route element={<ProtectedRoute isAllowed={!!user && user.rol === 1} redirectTo='/inicio'/>}>
            <Route path="/tabla-supervisores" element={<TablaSupervisores/>} />
            <Route path="/tabla-vendedores" element={<TablaVendedores/>} />
          </Route>
          <Route element={<ProtectedRoute isAllowed={!!user && (user.rol === 1 || user.rol === 2)} redirectTo='/inicio'/>}>
            <Route path="/tabla-clientes" element={<TablaClientes/>} />
            <Route path="/facturacion" element={<Facturacion />} />
            <Route path="/zonas" element={<Zonas />} />
            <Route path="/informes" element={<Informes />} />
            <Route path="/Abonos" element={<Abonos />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default MainLayout;
