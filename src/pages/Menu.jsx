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
            </main>
        </article>
    )
}

export default Menu