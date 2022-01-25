import React from 'react'
import Navigation from '../components/Navegacion/Navegacion'
import '../styles/pedidos.css'
import { UilSearch } from '@iconscout/react-unicons'

const Pedidos = () =>
{
    return(
        <article>
            <Navigation texto="Pedidos" volver="/menu"/>
            <main className="container-pedidos">
                <form className="form-pedidos">
                    <label>Usuario: prueba</label>
                    <div className="form-group">
                        <input type="search" className="textbox-genegal textbox-buscar" placeholder="Cliente"/>
                        <UilSearch size="20" className="input-icon"/>
                    </div>
                    <div className="form-group">
                        <input type="text"className="textbox-genegal textbox-buscar" placeholder="Categoria de seguimiento"/>
                        <UilSearch size="20" className="input-icon"/>
                    </div>
                    <div className="container-textbox-pedidos">
                        <textarea cols="30" rows="5" placeholder="Descripcion del producto" className="textbox-genegal textarea-general"></textarea>
                        <input type="text" className="textbox-genegal" placeholder="Cantidad"/>
                        <input type="text" className="textbox-genegal" placeholder="Valor"/>
                    </div>
                    <div className="container-btn-enviar">
                        <input type="submit" className="btn-primario btn-general" value="Enviar Pedido"/>
                    </div>
                </form>
            </main>
        </article>
    )
}

export default Pedidos