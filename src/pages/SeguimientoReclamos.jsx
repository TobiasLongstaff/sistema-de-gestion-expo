import React, { useState, useEffect } from 'react'
import Navigation from '../components/Navegacion/Navegacion'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import url from '../services/Settings'
import { UilImages } from '@iconscout/react-unicons'
import Popup from 'reactjs-popup'
import '../styles/popup.css'
import Loading from '../components/Loading/Loading'

const cookies = new Cookies

const SeguimientoReclamos = () =>
{
    let navigate = useNavigate()
    const [ loading, setLoading ] = useState(true)
    const [ data, setData ] = useState([])
    const [ dataImg, setDataImg ] = useState([])
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
            let res = await fetch(url+'obtener-reclamos.php?id_usuario='+idsession)
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

    const obtenerImagenes = async (id_reclamo) => 
    {
        try
        {
            let res = await fetch(url+'obtener-imagenes-reclamo.php?id_reclamo='+id_reclamo)
            let datosImg = await res.json()
            if(typeof datosImg !== 'undefined')
            {
                setDataImg(datosImg)
                setLoading(false)
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    if(idsession)
        return(
            <article>
                <Navigation texto="Seguimiento de Reclamos" volver="/menu"/>
                <main className="container-seguimiento-pedidos">
                    <div className="tbl-header">
                        <table>
                            <thead>
                                <tr className="tr-head">
                                    <th className="th-id">#</th>
                                    <th className="th-cliente-reclamos">Cliente</th>
                                    <th className="th-fecha">Fecha reclamo</th>
                                    <th className="th-fecha">Fecha recepción</th>
                                    <th className="th-observacion">Observacion</th>
                                    <th className="th-categoria">Categoria</th>
                                    <th className="th-motivo">Motivo</th>
                                    <th className="th-btn">Controles</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div className="tbl-content-completo">
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
                                                <td className="td-cliente-reclamos">{fila.cliente}</td>
                                                <td className="td-fecha"><p>{fila.fecha_recepcion}</p></td>
                                                <td className="td-fecha"><p>{fila.fecha_reclamo}</p></td>
                                                <td className="td-observacion">{fila.observacion}</td>
                                                <td className="td-categoria">{fila.categoria}</td>
                                                <td className="td-motivo">{fila.motivo}</td>
                                                <td className="td-btn">
                                                <Popup
                                                    trigger={<button type="button" className="btn-table-principal"><UilImages size="20"/></button>} 
                                                    position="top center"
                                                    modal
                                                    nested
                                                    onOpen={()=>obtenerImagenes(fila.id)}
                                                >
                                                    {close => (
                                                    <div className="modal">
                                                        <button className="close" onClick={close}>
                                                        &times;
                                                        </button>
                                                        <div className="header"><h2>Imagenes del reclamo</h2></div>
                                                        <div className="content">
                                                        { loading ? (
                                                            <tr className="tr-load">
                                                                <td><div className="loader">Loading...</div></td>
                                                            </tr>
                                                            ): (
                                                                dataImg.map((filaImg) =>
                                                                (
                                                                    <img key={filaImg.id} src={filaImg.url} alt={filaImg.nombre} className="img-reclamo"></img>
                                                                ))
                                                            )
                                                        }
                                                        </div>
                                                    </div>
                                                    )}
                                                </Popup>
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
    return(
        <Loading/>
    )
}

export default SeguimientoReclamos