// MainLayout.js
import './StylesLayout.css';
import SideMenu from '../SideMenu/MainSideMenu'
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Inicio from '../../components/Home/MainHome';
import GestionUsuarios from '../../components/mod_Usuarios_Pre/Main_Usuarios_Pre';
import Facturacion from '../../components/mod_Facturacion_Pre/Main_Facturacion_Pre';
import Abonos from '../../components/mod_Abonos_Pre/Main_Abonos_Pre';
import Zonas from '../../components/mod_Zonas_Pre/Main_Zonas_Pre';
import Informes from '../../components/mod_Informes_pre/Main_Informes_Pre';

const MainLayout = () => {
  return (
    <div className='fullContainerSistem'>
      <SideMenu />
      <div className="Main_ContentPages">
        {/* <Routes>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/gestion-usuarios" element={<GestionUsuarios />} />
          <Route path="/facturacion" element={<Facturacion />} />
          <Route path="/zonas" element={<Zonas />} />
          <Route path="/informes" element={<Informes />} />
          <Route path="/Abonos" element={<Abonos />} />
        </Routes> */}
      </div>
    </div>
  );
};

export default MainLayout;
