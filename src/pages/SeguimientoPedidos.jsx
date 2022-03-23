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
            let res = await fetch(url+'obtener-pedidos.php?id_usuario='+idsession)
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
                                <th className="th-cliente">Cliente</th>
                                <th className="th-categoria">Categoria</th>
                                <th className="th-localidad">Localidad</th>
                                <th className="th-cantidad">Cantidad</th>
                                <th className="th-valor">Valor</th>
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
                                            <td className="td-cliente">{fila.cliente}</td>
                                            <td className="td-categoria"><p>{fila.categoria}</p></td>
                                            <td className="td-localidad"><p>{fila.localidad}</p></td>
                                            <td className="td-cantidad">{fila.cantidad}</td>
                                            <td className="td-valor">{fila.valor}</td>
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