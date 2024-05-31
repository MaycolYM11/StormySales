// MainLayout.js
import './StylesLayout.css';
import SideMenu from '../SideMenu/MainSideMenu'
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Inicio from '../../components/Home/MainHome';
//import GestionUsuarios from '../../components/mod_Usuarios_Pre/Main_Usuarios_Pre';
import Facturacion from '../../components/mod_Facturacion_Pre/Main_Facturacion_Pre';
import Abonos from '../../components/mod_Abonos_Pre/Main_Abonos_Pre';
import Zonas from '../../components/mod_Zonas_Pre/Main_Zonas_Pre';
import Informes from '../../components/mod_Informes_pre/Main_Informes_Pre';
import TablaSupervisores from '../mod_Usuarios_Pre/Supervisores/TablaSupervisores';
import TablaVendedores from '../mod_Usuarios_Pre/Vendedores/TablaVendedores';
import TablaClientes from '../mod_Usuarios_Pre/Clientes/TablaClientes';

const MainLayout = () => {
  return (
    <div className='fullContainerSistem'>
      <div className='SideMenuLayout'>
        <SideMenu />
      </div>
      <div className="Main_ContentPages">
        <Routes>
          <Route path="/" element={<Inicio className="fullHeight" />} />
          <Route path="/inicio" element={<Inicio className="fullHeight" />} />
          <Route path="/tabla-supervisores" element={<TablaSupervisores/>} />
          <Route path="/tabla-vendedores" element={<TablaVendedores/>} />
          <Route path="/tabla-clientes" element={<TablaClientes/>} />
          <Route path="/facturacion" element={<Facturacion />} />
          <Route path="/zonas" element={<Zonas />} />
          <Route path="/informes" element={<Informes />} />
          <Route path="/Abonos" element={<Abonos />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainLayout;
