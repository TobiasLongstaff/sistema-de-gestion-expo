import React, { useEffect, useState } from 'react'
import Navigation from '../components/Navegacion/Navegacion'
import '../styles/pedidos.css'
import { UilSearch, UilEye } from '@iconscout/react-unicons'
import url from '../services/Settings'
import Cookies from 'universal-cookie'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'

const cookies = new Cookies

const Pedidos = () =>
{
    const [ data, setData ] = useState([])
    const [ dataCategoria, setdataCategoria ] = useState([])
    const [ dataLocalidades, setdataLocalidades ] = useState([])
    const [ form, setForm ] = useState(
    { 
        cliente: '', 
        id_usuario: cookies.get('IdSession'), 
        id_cliente: '', 
        id_categoria: '',
        id_localidad: '',
        localidad: '',
        categorias: '', 
        descripcion: '', 
        cantidad: '', 
        valor: ''
    })
    const [ activoCliente, setActivo ] = useState('container-clientes')
    const [ activoCategoria, setActivoCategoria] = useState('container-categorias')
    const [ infoCategoria, setdataCategoriaComp] = useState([0])
    const [ activoLocalidad, setActivoLocalidad] = useState('container-localidades')
    const [ activoInfoCategoria, setActivoInfoCategoria] = useState('container-info-categorias')
    const [ dataCalibre, setDataCalibre ] = useState([])
    const [ dataRaza, setDataRaza ] = useState([])
    const [ dataTipoAnimal, setDataTipoAnimal] = useState([])
    const [ dataDenticion, setDataDenticion] = useState([])
    const [ dataGrasa, setDataGrasa] = useState([])
    const [ dataCobertura, setDataCobertura] = useState([])
    const [ dataOsificacion, setDataOsificacion] = useState([])
    const [ dataEvaluacionCorte, setDataEvaluacionCorte] = useState([])
    const [ dataColorGrasa, setDataColorGrasa] = useState([])
    const [ dataColorCarne, setDataColorCarne] = useState([])
    const [ dataMarmoreado, setDataMarmoreado] = useState([])

    useEffect(() =>
    {
        if(activoCliente === 'container-clientes active')
        {
            obtenerClientes()
        }
        else if(activoCategoria === 'container-categorias active')
        {
            obtenerCategorias()
        }
        else if(activoLocalidad === 'container-localidades active')
        {
            obtenerLocalidades()
        }
    },[form])

    const obtenerClientes = async () =>
    {
        try
        {
            let res = await fetch(url+'obtener-clientes.php?nombre=' + form.cliente + '&id_usuario=' + form.id_usuario)
            let datos = await res.json()
            
            if(typeof datos !== 'undefined')
            {
                setData(datos)
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    const obtenerCategorias = async () =>
    {
        try
        {
            let res = await fetch(url+'obtener-categorias.php?nombre=' + form.categorias)
            let dataCategoria = await res.json()
            
            if(typeof dataCategoria !== 'undefined')
            {
                setdataCategoria(dataCategoria)
            }
        }
        catch(error)
        {
            console.error(error)
        } 
    }

    const obtenerLocalidades = async () =>
    {
        try
        {
            let res = await fetch(url+'obtener-localidades-por-clientes.php?id_cliente=' + form.id_cliente)
            let dataLocalidades = await res.json()
            
            if(typeof dataLocalidades !== 'undefined')
            {
                console.log(dataLocalidades)
                setdataLocalidades(dataLocalidades)
            }
        }
        catch(error)
        {
            console.error(error)
        }    
    }

    const handelSubmit = e =>
    {
        e.preventDefault()
        Swal.fire(
        {
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => 
        {
            if(result.isConfirmed) 
            {
                crearPedido()
            }
        })
    }

    const crearPedido = async () =>
    {
        try
        {
            let config =
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            }
            let res = await fetch(url+'crear-pedido.php', config)
            let infoPost = await res.json()
            console.log(infoPost[0])
            if(infoPost[0].error == 0)
            {
                Swal.fire(
                    'Operacion realizada correctamente',
                    '',
                    'success'
                )
            }
            else
            {
                Swal.fire(
                    'Error inesperado intentar mas tarde',
                    '',
                    'error'
                )
            }
        }
        catch(error)
        {
            console.error(error)
            Swal.fire(
                'Error inesperado intentar mas tarde',
                '',
                'error'
            )
        }
    }

    const completarCliente = (nombre, id) =>
    {
        setForm(
        {
            ...form,
            cliente: nombre,
            id_cliente: id
        })
    }

    const completarLocalidad = (nombre, id) =>
    {
        setForm(
        {
            ...form,
            localidad: nombre,
            id_localidad: id
        })
    }

    const completarCategoria = (nombre, id) =>
    {
        setForm(
        {
            ...form,
            categorias: nombre,
            id_categoria: id
        })

        obtenerCategoriaCompleta(id)
        obtenerCalibre(id)
        obtenerRaza(id)
        obtenerTipoAnimal(id)
        obtenerDenticion(id)
        obtenerGrasa(id)
        obtenerCobertura(id)
        obtenerOsificacion(id)
        obtenerEvaluacionCorte(id)
        obtenerColorGrasa(id)
        obtenerColorCarne(id)
        obtenerMarmoreado(id)
    }

    const obtenerCategoriaCompleta = async (id) =>
    {
        try
        {
            let res = await fetch(url+'obtener-categorias-completa.php?id=' + id)
            let dataCategoriaComp = await res.json()
            
            if(typeof dataCategoriaComp !== 'undefined')
            {
                setdataCategoriaComp(dataCategoriaComp)
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    const obtenerCalibre = async (id) =>
    {
        try
        {
            let res = await fetch(url+'obtener-calibre.php?id=' + id)
            let dataCalibre = await res.json()
            
            if(typeof dataCalibre !== 'undefined')
            {
                setDataCalibre(dataCalibre)
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    const obtenerRaza = async (id) =>
    {
        try
        {
            let res = await fetch(url+'obtener-raza.php?id=' + id)
            let dataRaza = await res.json()
            
            if(typeof dataRaza !== 'undefined')
            {
                setDataRaza(dataRaza)
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    const obtenerTipoAnimal = async (id) =>
    {
        try
        {
            let res = await fetch(url+'obtener-tipo-animal.php?id=' + id)
            let dataTipoAnimal = await res.json()
            
            if(typeof dataTipoAnimal !== 'undefined')
            {
                setDataTipoAnimal(dataTipoAnimal)
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    const obtenerDenticion = async (id) =>
    {
        try
        {
            let res = await fetch(url+'obtener-denticion.php?id=' + id)
            let dataDenticion = await res.json()
            
            if(typeof dataDenticion !== 'undefined')
            {
                setDataDenticion(dataDenticion)
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    const obtenerGrasa = async (id) =>
    {
        try
        {
            let res = await fetch(url+'obtener-grasa.php?id=' + id)
            let dataGrasa = await res.json()
            
            if(typeof dataGrasa !== 'undefined')
            {
                setDataGrasa(dataGrasa)
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    const obtenerCobertura = async (id) =>
    {
        try
        {
            let res = await fetch(url+'obtener-cobertura.php?id=' + id)
            let dataCobertura = await res.json()
            
            if(typeof dataCobertura !== 'undefined')
            {
                setDataCobertura(dataCobertura)
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    const obtenerOsificacion = async (id) =>
    {
        try
        {
            let res = await fetch(url+'obtener-osificacion.php?id=' + id)
            let dataOsificacion = await res.json()
            
            if(typeof dataOsificacion !== 'undefined')
            {
                setDataOsificacion(dataOsificacion)
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    const obtenerEvaluacionCorte = async (id) =>
    {
        try
        {
            let res = await fetch(url+'obtener-evaluacion-corte.php?id=' + id)
            let dataEvaluacionCorte = await res.json()
            
            if(typeof dataEvaluacionCorte !== 'undefined')
            {
                setDataEvaluacionCorte(dataEvaluacionCorte)
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    const obtenerColorGrasa = async (id) =>
    {
        try
        {
            let res = await fetch(url+'obtener-color-grasa.php?id=' + id)
            let dataColorGrasa = await res.json()
            
            if(typeof dataColorGrasa !== 'undefined')
            {
                setDataColorGrasa(dataColorGrasa)
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    const obtenerColorCarne = async (id) =>
    {
        try
        {
            let res = await fetch(url+'obtener-color-carne.php?id=' + id)
            let dataColorCarne = await res.json()
            
            if(typeof dataColorCarne !== 'undefined')
            {
                setDataColorCarne(dataColorCarne)
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    const obtenerMarmoreado = async (id) =>
    {
        try
        {
            let res = await fetch(url+'obtener-marmoreado.php?id=' + id)
            let dataMarmoreado = await res.json()
            
            if(typeof dataMarmoreado !== 'undefined')
            {
                setDataMarmoreado(dataMarmoreado)
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    const mostrarClientes = () =>
    {
        setActivo('container-clientes active')
    }

    const mostrarCategorias = () =>
    {
        setActivoCategoria('container-categorias active')
    }

    const mostrarLocalidad = () =>
    {
        setActivoLocalidad('container-localidades active')
    }

    const fueraDeFoco = () =>
    {
        setTimeout(function () {
            if(activoCliente === 'container-clientes active')
            {
                setActivo('container-clientes')
            }
            else if(activoCategoria === 'container-categorias active')
            {                
                setActivoCategoria('container-categorias')                
            }
            else if(activoLocalidad === 'container-localidades active')
            {
                setActivoLocalidad('container-localidades')
            }
        }, 200)
    }

    const mostrarInfoCategoria = () =>
    {
        if(activoInfoCategoria === 'container-info-categorias active')
        {
            setActivoInfoCategoria('container-info-categorias')
        }
        else
        {
            setActivoInfoCategoria('container-info-categorias active')
        }
    }

    const handelChangeCliente = e =>
    {
        setForm(
        {
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return(
        <article>
            <Navigation texto="Pedidos" volver="/menu"/>
            <main className="container-pedidos">
                <form className="form-pedidos" onSubmit={handelSubmit}>
                    <label>Usuario: prueba</label>
                    <div>
                        <div className="form-group">
                            <input type="search" className="textbox-genegal textbox-buscar" autoComplete="off" name="cliente" onClick={mostrarClientes} onChange={handelChangeCliente} onBlur={fueraDeFoco} value={form.cliente} placeholder="Cliente" required/>
                            <UilSearch size="20" className="input-icon"/>
                        </div>
                        <div className={activoCliente}>
                            {data.map((fila) =>
                            (
                                <button className="btn-tabla-buscar" type="button" onClick={()=>completarCliente(fila.nombre_apellido, fila.id)} key={fila.id}>{fila.nombre_apellido}</button>
                            ))}
                        </div>                        
                    </div>
                    <div>
                        <div className="form-group">
                            <input type="search"className="textbox-genegal textbox-buscar" autoComplete="off" name="categorias" onClick={mostrarCategorias} onChange={handelChangeCliente} onBlur={fueraDeFoco} value={form.categorias} placeholder="Categoria de seguimiento" required/>
                            <UilSearch size="20" className="input-icon"/>
                        </div>
                        <div className={activoCategoria}>
                            {dataCategoria.map((filaCategoria) =>
                            (
                                <button className="btn-tabla-buscar" type="button" onClick={()=>completarCategoria(filaCategoria.nombre+' '+filaCategoria.color, filaCategoria.id)} key={filaCategoria.id}>{filaCategoria.nombre+' '+filaCategoria.color}</button>
                            ))}
                        </div>  
                    </div>
                    <button onClick={mostrarInfoCategoria} type="button" className="btn-general btn-primario"><UilEye size="20"/></button>
                    <div className={activoInfoCategoria}>
                        <div className="container-info-general">
                            <h4>Informacion</h4>
                            <label>Color: {infoCategoria[0].color}</label>
                            <label>Clasificacion: {infoCategoria[0].clasificacion}</label>
                            <label>Pje Max: {infoCategoria[0].pje_max}</label>
                            <label>Pje Min: {infoCategoria[0].pje_min}</label>
                            <label>PH: {infoCategoria[0].ph}</label>
                            <label>GI: {infoCategoria[0].gi}</label>
                        </div>
                        <div className="container-info-general">
                            <h4>Calibres</h4>
                            {dataCalibre.map((filaCalibre) =>
                            (
                                <label key={filaCalibre.peso}>{filaCalibre.peso}</label>
                            ))}
                        </div>
                        <div className="container-info-general">
                            <h4>Razas</h4>
                            {dataRaza.map((filaRaza) =>
                            (
                                <label key={filaRaza.nombre}>{filaRaza.nombre}</label>
                            ))}
                        </div>     
                        <div className="container-info-general">
                            <h4>Tipo Animal</h4>
                            {dataTipoAnimal.map((filaTipoAnimal) =>
                            (
                                <label key={filaTipoAnimal.tipo}>{filaTipoAnimal.tipo}</label>
                            ))}
                        </div>    
                        <div className="container-info-general">
                            <h4>Denticion</h4>
                            {dataDenticion.map((filaDenticion) =>
                            (
                                <label key={filaDenticion.denticion}>{filaDenticion.denticion}</label>
                            ))}
                        </div>    
                        <div className="container-info-general">
                            <h4>Grasa</h4>
                            {dataGrasa.map((filaGrasa) =>
                            (
                                <label key={filaGrasa.numero}>{filaGrasa.numero}</label>
                            ))}
                        </div>
                        <div className="container-info-general">
                            <h4>Cobertura</h4>
                            {dataCobertura.map((filaCobertura) =>
                            (
                                <label key={filaCobertura.cobertura}>{filaCobertura.cobertura}</label>
                            ))}
                        </div>      
                        <div className="container-info-general">
                            <h4>Osificacion</h4>
                            {dataOsificacion.map((filaOsificacion) =>
                            (
                                <label key={filaOsificacion.letra}>{filaOsificacion.letra}</label>
                            ))}
                        </div>  
                        <div className="container-info-general">
                            <h4>Evaluacion De Corte</h4>
                            {dataEvaluacionCorte.map((filaEvaluacionCorte) =>
                            (
                                <label key={filaEvaluacionCorte.evaluacion}>{filaEvaluacionCorte.evaluacion}</label>
                            ))}
                        </div>   
                        <div className="container-info-general">
                            <h4>Color Grasa</h4>
                            {dataColorGrasa.map((filaColorGrasa) =>
                            (
                                <label key={filaColorGrasa.color}>{filaColorGrasa.color}</label>
                            ))}
                        </div> 
                        <div className="container-info-general">
                            <h4>Color Carne</h4>
                            {dataColorCarne.map((filaColorCarne) =>
                            (
                                <label key={filaColorCarne.color}>{filaColorCarne.color}</label>
                            ))}
                        </div>
                        <div className="container-info-general">
                            <h4>Marmoreado</h4>
                            {dataMarmoreado.map((filaMarmoreado) =>
                            (
                                <label key={filaMarmoreado.marmoreado}>{filaMarmoreado.marmoreado}</label>
                            ))}
                        </div>  
                                     
                    </div>
                    <div>
                        <label>Descripcion del producto</label>
                        <textarea cols="30" rows="5" name="descripcion" onChange={handelChangeCliente} className="textbox-genegal textarea-general" required></textarea>
                    </div>
                    <div>
                        <div className="form-group">
                            <input type="search" className="textbox-genegal textbox-buscar" autoComplete="off" name="localidad" onChange={handelChangeCliente} onClick={mostrarLocalidad} onBlur={fueraDeFoco} value={form.localidad} placeholder="Localidad" required/>
                            <UilSearch size="20" className="input-icon"/>
                        </div>
                        <div className={activoLocalidad}>
                            {dataLocalidades.map((filaLocalidades) =>
                            (
                                <button className="btn-tabla-buscar" type="button" onClick={()=>completarLocalidad(filaLocalidades.nombre, filaLocalidades.id)} key={filaLocalidades.id}>{filaLocalidades.nombre}</button>
                            ))}
                        </div>                          
                    </div>
                    <div className="container-textbox-pedidos">
                        <div className="container-textbox">
                            <input type="number" min="1" pattern="^[0-9]+" className="textbox-genegal" name="cantidad" onChange={handelChangeCliente} required/>
                            <label>Cantidad</label>
                        </div>
                        <div className="container-textbox">
                            <input type="number" step="any" min="0.1" className="textbox-genegal" name="valor" onChange={handelChangeCliente} required/>
                            <label>Valor</label>
                        </div>
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