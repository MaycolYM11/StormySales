import React from 'react'
import './stylesHome.css'
import LogoHome from '../../assets/Logo/Logo-2.png'

const MainHome = () => {
    return (
        <div class="background-pattern">
            <div className="home_Container">
                    <div className="logoHome-Content">
                        <img className='logoHome_Img' src={LogoHome} alt="logoHome" />
                        <span className='logoHome_Text'>Grupo SIGFVI</span>
                    </div>
                    <div className="TittleHome">
                        <span className='TittleHome_Text'>Sistema de facturación</span>
                        <span className='SubTittleHome_Text'>StormySales</span>
                    </div>
                    <div className="resumenesHome_Container">
                        <div className="resumenContent">
                            <div className="iconResumen vendedoresIcon">
                                <i class="bi bi-emoji-sunglasses-fill"></i>
                            </div>
                            <span className='titleResumenHome'>Vendedores</span>
                            <span className="contadorHome">30</span>
                        </div>
                        <div className="resumenContent">
                            <div className="iconResumen ClientesIcon">
                                <i class="bi bi-person-fill"></i>
                            </div>
                            <span className='titleResumenHome'>Clientes</span>
                            <span className="contadorHome">230</span>
                        </div>

                        <div className="resumenContent">
                            <div className="iconResumen RutasIcon">
                                <i class="bi bi-signpost-2-fill"></i>
                            </div>
                            <span className='titleResumenHome'>Rutas</span>
                            <span className="contadorHome">15</span>
                        </div>
                        <div className="resumenContent">
                            <div className="iconResumen VentasIcon">
                                <i class="bi bi-currency-dollar"></i>
                            </div>
                            <span className='titleResumenHome'>Ventas Mes</span>
                            <span className="contadorHome">$ 300'000.000</span>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default MainHome
