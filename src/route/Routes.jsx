import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Registro from '../pages/Registro'
import Menu from '../pages/Menu'
import Pedidos from '../pages/Pedidos'
import Reclamos from '../pages/Reclamos'
import Clientes from '../pages/Clientes'
import Colores from '../pages/Colores'
import SeguimientoPedidos from '../pages/SeguimientoPedidos'
import Localidades from '../pages/Localidades'
import SeguimientoReclamos from '../pages/SeguimientoReclamos'

function Rutas()
{
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login/>}/>
                <Route exact path="/registrarse" element={<Registro/>}/>
                <Route exact path="/menu" element={<Menu/>}/>
                <Route exact path="/pedidos" element={<Pedidos/>}/>
                <Route exact path="/reclamos" element={<Reclamos/>}/>
                <Route exact path="/clientes" element={<Clientes/>}/>
                <Route exact path="/colores" element={<Colores/>}/>
                <Route exact path="/seguimiento-de-pedidos" element={<SeguimientoPedidos/>}/>
                <Route exact path="/seguimiento-de-reclamos" element={<SeguimientoReclamos/>}/>
                <Route exact path="/localidades" element={<Localidades/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Rutas