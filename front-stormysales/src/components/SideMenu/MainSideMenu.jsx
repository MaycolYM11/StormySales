import React, { useState } from 'react';
import './stylesSideMenu.css';
import ImgenLogo from '../../assets/Logo/Logo_SideMenu.png';
import { Link } from 'react-router-dom';

const MainSideMenu = () => {
    const [subMenusOpen, setSubMenusOpen] = useState({
        gestionUsuarios: false,
        facturacion: false,
        zonas: false,
        informes: false,
    });

    const linkStyles = {
        textDecoration: 'none',
        color: 'inherit',
    };
    const toggleSubMenu = (menu) => {
        setSubMenusOpen({
            ...subMenusOpen,
            [menu]: !subMenusOpen[menu],
        });
    };

    const handleSubMenuClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className='containerSideMenu'>
            <div className="subContainer_SideMenu">
                <div className="upLogoNames">
                    <div className="logoContent">
                        <img className="logoSideMenu" src={ImgenLogo} alt="Logo_Imagen" />
                    </div>
                </div>
                {/* Opción de Inicio */}
                <div className="container_Menu">
                    <Link to='/inicio' style={linkStyles}>
                        <div className='optionContainer'>
                            <div className="containerMenu--BTN">
                                <div className="iconMenu">
                                    <i className="bi bi-house-heart-fill"></i>
                                </div>
                                <div className='containerBNT'>
                                    <div>
                                        <span className='TextOption'>Inicio</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Opción de Gestión de Usuarios */}
                    <div className={`optionContainer ${subMenusOpen.gestionUsuarios ? 'clicBTN' : ''}`} onClick={() => toggleSubMenu('gestionUsuarios')}>
                        <div className="containerMenu--BTN">
                            <div className="iconMenu">
                                <i className="bi bi-person-fill"></i>
                            </div>
                            <div className='containerBNT'>
                                <div>
                                    <span className='TextOption'>Gestión de Usuarios</span>
                                </div>
                                <div className={`RightArrow ${subMenusOpen.gestionUsuarios ? '--Rotate' : ''}`}>
                                    <i className="bi bi-chevron-right"></i>
                                </div>
                            </div>
                        </div>
                        <div className={`subMenu--BTN ${subMenusOpen.gestionUsuarios ? 'activeSubMenu' : ''}`}>

                            <Link to='/gestion-usuarios' style={linkStyles}>
                                <div className="option_SubMenu" onClick={handleSubMenuClick}>
                                    <div className="point_SubMenu"></div>
                                    <span className='text_SubMenu'>Empleados</span>
                                </div></Link>

                            <Link to='/gestion-usuarios' style={linkStyles}>
                                <div className="option_SubMenu" onClick={handleSubMenuClick}>
                                    <div className="point_SubMenu"></div>
                                    <span className='text_SubMenu'>Clientes</span>
                                </div></Link>
                        </div>
                    </div>

                    {/* Opción de Facturación */}
                    <div className={`optionContainer ${subMenusOpen.facturacion ? 'clicBTN' : ''}`} onClick={() => toggleSubMenu('facturacion')}>
                        <div className="containerMenu--BTN">
                            <div className="iconMenu">
                                <i className="bi bi-receipt"></i>
                            </div>
                            <div className='containerBNT'>
                                <div>
                                    <span className='TextOption'>Facturación</span>
                                </div>
                                <div className={`RightArrow ${subMenusOpen.facturacion ? '--Rotate' : ''}`}>
                                    <i className="bi bi-chevron-right"></i>
                                </div>
                            </div>
                        </div>
                        <div className={`subMenu--BTN ${subMenusOpen.facturacion ? 'activeSubMenu' : ''}`}>
                            <Link to='/facturacion' style={linkStyles}>
                                <div className="option_SubMenu" onClick={handleSubMenuClick}>
                                    <div className="point_SubMenu"></div>
                                    <span className='text_SubMenu'>Facturación</span>
                                </div>
                            </Link>
                            <Link to='/Abonos' style={linkStyles}>
                                <div className="option_SubMenu" onClick={handleSubMenuClick}>
                                    <div className="point_SubMenu"></div>
                                    <span className='text_SubMenu'>Abonos</span>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Opción de Zonas */}
                    <div className={`optionContainer ${subMenusOpen.zonas ? 'clicBTN' : ''}`} onClick={() => toggleSubMenu('zonas')}>
                        <div className="containerMenu--BTN">
                            <div className="iconMenu">
                                <i className="bi bi-radar"></i>
                            </div>
                            <div className='containerBNT'>
                                <div>
                                    <span className='TextOption'>Zonas</span>
                                </div>
                                <div className={`RightArrow ${subMenusOpen.zonas ? '--Rotate' : ''}`}>
                                    <i className="bi bi-chevron-right"></i>
                                </div>
                            </div>
                        </div>
                        <div className={`subMenu--BTN ${subMenusOpen.zonas ? 'activeSubMenu' : ''}`}>
                            <Link to='/zonas' style={linkStyles}>
                                <div className="option_SubMenu" onClick={handleSubMenuClick}>
                                    <div className="point_SubMenu"></div>
                                    <span className='text_SubMenu'>Gestión de Zona</span>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Opción de Informes */}
                    <div className={`optionContainer ${subMenusOpen.informes ? 'clicBTN' : ''}`} onClick={() => toggleSubMenu('informes')}>
                        <div className="containerMenu--BTN">
                            <div className="iconMenu">
                                <i className="bi bi-clipboard-data-fill"></i>
                            </div>
                            <div className='containerBNT'>
                                <div>
                                    <span className='TextOption'>Informes</span>
                                </div>
                                <div className={`RightArrow ${subMenusOpen.informes ? '--Rotate' : ''}`}>
                                    <i className="bi bi-chevron-right"></i>
                                </div>
                            </div>
                        </div>
                        <div className={`subMenu--BTN ${subMenusOpen.informes ? 'activeSubMenu' : ''}`}>
                            <Link to='/informes' style={linkStyles}>
                                <div className="option_SubMenu" onClick={handleSubMenuClick}>
                                    <div className="point_SubMenu"></div>
                                    <span className='text_SubMenu'>Ventas por Vendedor</span>
                                </div>
                            </Link>
                            <Link to='/informes' style={linkStyles}>
                                <div className="option_SubMenu" onClick={handleSubMenuClick}>
                                    <div className="point_SubMenu"></div>
                                    <span className='text_SubMenu'>Clientes</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Separador /// esto es el Footer del Menu  */}
                <div className="containerBottom_Menu">
                    <div className="optionContainer_Bottom">
                        <div className="iconMenu_Bottom">
                            <i className="bi bi-box-arrow-left"></i>
                        </div>
                        <span className='TextOption'>Cerrar Sesión</span>
                    </div>
                    <div className="optionContainer_Bottom">
                        <div className="iconMenu_Bottom">
                            <i className="bi bi-gear-fill"></i>
                        </div>
                        <span className='TextOption'>Configuración</span>
                    </div>
                    <div className="infoContainer_Bottom">
                        <div className="imageIcon_User">
                            <i className="bi bi-person-circle"></i>
                        </div>
                        <div className="infoTexts_User">
                            <span className="Cargo_User">Supervisor</span>
                            <span className="Name_User">Miguel Ayala</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainSideMenu;
