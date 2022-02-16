import React, { useEffect, useState } from 'react'
import Navigation from '../components/Navegacion/Navegacion'
import '../styles/pedidos.css'
import { UilSearch } from '@iconscout/react-unicons'
import url from '../services/Settings'
import Cookies from 'universal-cookie'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'

const cookies = new Cookies

const Pedidos = () =>
{
    const [ data, setData ] = useState([])
    const [ dataCategoria, setdataCategoria ] = useState([])
    const [ form, setForm ] = useState(
    { 
        cliente: '', 
        id_usuario: cookies.get('IdSession'), 
        id_cliente: '', 
        id_categoria: '',
        categorias: '', 
        descripcion: '', 
        cantidad: '', 
        valor: ''
    })
    const [ activoCliente, setActivo ] = useState('container-clientes')
    const [ activoCategoria, setActivoCategoria] = useState('container-categorias')

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
        console.log(form)
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

    const completarCategoria = (nombre, id) =>
    {
        setForm(
        {
            ...form,
            categorias: nombre,
            id_categoria: id
        })
    }

    const mostrarClientes = () =>
    {
        setActivo('container-clientes active')
    }

    const mostrarCategorias = () =>
    {
        setActivoCategoria('container-categorias active')
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
        }, 200)
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
                            <input type="search"className="textbox-genegal textbox-buscar" autoComplete="off" name="categorias" onClick={mostrarCategorias} onChange={handelChangeCliente} onClick={mostrarCategorias} onChange={handelChangeCliente} onBlur={fueraDeFoco} value={form.categorias} placeholder="Categoria de seguimiento" required/>
                            <UilSearch size="20" className="input-icon"/>
                        </div>
                        <div className={activoCategoria}>
                            {dataCategoria.map((filaCategoria) =>
                            (
                                <button className="btn-tabla-buscar" type="button" onClick={()=>completarCategoria(filaCategoria.nombre+' '+filaCategoria.color, filaCategoria.id)} key={filaCategoria.id}>{filaCategoria.nombre+' '+filaCategoria.color}</button>
                            ))}
                        </div>  
                    </div>
                    <div className="container-textbox-pedidos">
                        <div className="container-textbox">
                            <textarea cols="30" rows="5" name="descripcion" onChange={handelChangeCliente} className="textbox-genegal textarea-general" required></textarea>
                            <label>Descripcion del producto</label>
                        </div>
                        <div className="container-textbox">
                            <input type="text" className="textbox-genegal" name="cantidad" onChange={handelChangeCliente} required/>
                            <label>Cantidad</label>
                        </div>
                        <div className="container-textbox">
                            <input type="text" className="textbox-genegal" name="valor" onChange={handelChangeCliente} required/>
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