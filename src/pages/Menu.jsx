import React from 'react'
import { Link } from 'react-router-dom'
import Navigation from '../components/Navegacion/Navegacion'
import '../styles/menu.css'

const Menu = () =>
{
    return(
        <article>
            <Navigation texto="Menu"/>
            <main className="container-menu">
                <Link to="/pedidos">
                    <button type="button" className="btn-general-menu">
                        Pedidos
                    </button>
                </Link>
                <Link to="/reclamos">
                    <button type="button" className="btn-general-menu">
                        Reclamos
                    </button>
                </Link>
                <Link to="/seguimiento-de-pedidos">
                    <button type="button" className="btn-general-menu">
                        Seguimiento de pedidos
                    </button>
                </Link>
                <Link to="/seguimiento-de-reclamos">
                    <button type="button" className="btn-general-menu">
                        Seguimiento de reclamos
                    </button>
                </Link>
                <Link to="/clientes">
                    <button type="button" className="btn-general-menu">
                        ABM Clientes
                    </button>
                </Link>
                <Link to="/colores">
                    <button type="button" className="btn-general-menu">
                        ABM Colores
                    </button>
                </Link>
                <Link to="/localidades">
                    <button type="button" className="btn-general-menu">
                        ABM Localidades
                    </button>
                </Link>
            </main>
        </article>
    )
}

export default Menu