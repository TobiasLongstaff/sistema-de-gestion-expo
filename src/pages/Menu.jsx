import React from 'react'
import { Link } from 'react-router-dom'
import Navigation from '../components/Navegacion/Navegacion'
import '../styles/menu.css'

const Menu = () =>
{
    return(
        <article>
            <Navigation texto="Menu"/>
            <div className="container-web-menu">
                <main className="container-menu">
                    <Link to="/pedidos">
                        <button type="button" className="btn-general-menu">
                            <h3>
                                Pedidos
                            </h3>
                        </button>
                    </Link>
                    <Link to="/reclamos">
                        <button type="button" className="btn-general-menu">
                            <h3>
                                Reclamos
                            </h3>
                        </button>
                    </Link>
                    <Link to="/seguimiento-de-pedidos">
                        <button type="button" className="btn-general-menu">
                            <h3>
                                Seguimiento de pedidos
                            </h3>
                        </button>
                    </Link>
                    <Link to="/seguimiento-de-reclamos">
                        <button type="button" className="btn-general-menu">
                            <h3>
                                Seguimiento de reclamos
                            </h3>
                        </button>
                    </Link>
                    <Link to="/clientes">
                        <button type="button" className="btn-general-menu">
                            <h3>
                                ABM Clientes
                            </h3>
                        </button>
                    </Link>
                    <Link to="/colores">
                        <button type="button" className="btn-general-menu">
                            <h3>
                                ABM Colores
                            </h3>
                        </button>
                    </Link>
                    <Link to="/localidades">
                        <button type="button" className="btn-general-menu">
                            <h3>
                                ABM Localidades
                            </h3>
                        </button>
                    </Link>
                    <Link to="/usuarios">
                        <button type="button" className="btn-general-menu">
                            <h3>
                                Usuarios
                            </h3>
                        </button>
                    </Link>
                </main>
            </div>
        </article>
    )
}

export default Menu