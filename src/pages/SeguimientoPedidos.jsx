import React, { useState, useEffect } from 'react'
import Navigation from '../components/Navegacion/Navegacion'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import url from '../services/Settings'

const cookies = new Cookies

const SeguimientoPedidos = () =>
{
    let navigate = useNavigate()
    const [ loading, setLoading ] = useState(true)
    const [data, setData] = useState([])
    const idsession = cookies.get('IdSession')

    useEffect(() =>
    {
        if(idsession == null)
        {
            navigate('/')
        }
        else
        {
            fetchResource()
        }
    }, [])

    const fetchResource = async () => 
    {
        try
        {
            let res = await fetch(url+'obtener-pedidos.php')
            let datos = await res.json()
            if(typeof datos !== 'undefined')
            {
                setData(datos)
                setLoading(false)
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    return(
        <article>
            <Navigation texto="Seguimiento de Pedidos" volver="/menu"/>
            <main className="container-seguimiento-pedidos">
                <div className="tbl-header">
                    <table>
                        <thead>
                            <tr className="tr-head">
                                <th className="th-id">#</th>
                                <th>Cliente</th>
                                <th>Categoria</th>
                                <th>Localidad</th>
                                <th>Cantidad</th>
                                <th>Valor</th>
                                <th className="th-controles">Controles</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="tbl-content">
                    <table>
                        <tbody>
                            { loading ? (
                                <tr className="tr-load">
                                    <td><div className="loader">Loading...</div></td>
                                </tr>
                                ): (
                                    data.map((fila) =>
                                    (
                                        <tr key={fila.id} className="tr-web">
                                            <td className="td-id">{fila.id}</td>
                                            <td>{fila.cliente}</td>
                                            <td><p>{fila.categoria}</p></td>
                                            <td><p>{fila.localidad}</p></td>
                                            <td>{fila.cantidad}</td>
                                            <td>{fila.valor}</td>
                                            <td className="td-controles">
                                            </td>
                                        </tr>
                                    ))
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </main>
        </article>
    )
}

export default SeguimientoPedidos