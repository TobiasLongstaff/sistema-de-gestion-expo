import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Registro from '../pages/Registro'
import Menu from '../pages/Menu'
import Pedidos from '../pages/Pedidos'
import Reclamos from '../pages/Reclamos'
import Clientes from '../pages/Clientes'

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
            </Routes>
        </BrowserRouter>
    )
}

export default Rutas