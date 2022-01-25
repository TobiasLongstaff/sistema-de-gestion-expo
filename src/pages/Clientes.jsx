import React, { useState, useEffect } from 'react'
import Navegacion from '../components/Navegacion/Navegacion'
import '../styles/abm.css'
import url from '../services/Settings'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import Cookies from 'universal-cookie'

const cookies = new Cookies

const Clientes = () =>
{
    const [ form, setForm ] = useState({ nombre_apellido: '', id_usuario: cookies.get('IdSession') }) 
    const [ MensajeError, setError ] = useState(null)
    const [ data, setData ] = useState([])
    const [ loading, setLoading ] = useState(true)

    useEffect(() =>
    {
        obtenerClientes()
    },[])

    const obtenerClientes = async () => 
    {
        try
        {
            let res = await fetch(url+'obtener-clientes.php')
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

    const handelSubmit = async e =>
    {
        e.preventDefault();
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
            let res = await fetch(url+'crear-cliente.php', config)
            let infoPost = await res.json()
            console.log(infoPost[0])
            if(infoPost[0].error == 0)
            {
                setError('')
                Swal.fire(
                    'Cliente creado!',
                    'Operacion realizada correctamente',
                    'success'
                )
                obtenerClientes()
            }
            else
            {
                setError(infoPost[0].mensaje)
            }
        }
        catch(error)
        {
            console.error(error)
            setError('Error al iniciar sesion intentar mas tarde')
        }
    }

    const handelChange = e =>
    {
        setForm(
        {
            ...form,
            [e.target.name]: e.target.value
        })
        console.log(form)
    }

    const handelEliminar = (id_fila) =>
    {
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
                eliminarCliente(id_fila)
            }
        })
    }

    const eliminarCliente = async (id_fila) =>
    {
        try
        {
            let config = 
            {
                method: 'DELETE',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
            let res = await fetch(url+'eliminar-cliente.php?id='+id_fila, config)
            let infoDel = await res.json()
            console.log(infoDel[0])
            if(infoDel[0].error == 0)
            {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                obtenerClientes()
            }
            else
            {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'error'
                )
            }
        }
        catch (error)
        {
            console.error(error)
        }
    }

    const handelEditar = () => 
    {
        
    }

    if(!loading)
        return(
            <article>
                <Navegacion texto="ABM Clientes" volver="/menu"/>
                <main className="container-abm">
                    <form className="container-form-abm container-login" onSubmit={handelSubmit}>
                        <h2>Agregar Cliente</h2>
                        <div className="container-textbox">
                            <input type="text" className="textbox-genegal" name="nombre_apellido" onChange={handelChange} required/>
                            <label>Nombre y Apellido</label>
                        </div>
                        <label className="text-error">{MensajeError}</label>
                        <input type="submit" value="Crear" className="btn-primario btn-general"/>
                    </form>
                    <div className="container-tabla">
                        <div className="tbl-header">
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            <span>Nombre y Apellido</span>
                                        </th>     
                                        <th>
                                            <span>Usuario</span>
                                        </th>  
                                        <th>
                                            <span>Controles</span>   
                                        </th>
                                    </tr> 
                                </thead>
                            </table>  
                        </div> 
                        <div className="tbl-content">
                            <table>    
                                <tbody> 
                                    {data.map((fila) =>
                                    (
                                        <tr key={fila.id}>
                                            <td>{fila.nombre_apellido}</td>
                                            <td>{fila.usuario}</td>
                                            <td className="td-btn">
                                                <button type="button" className="btn-table-deshacer" onClick={() =>handelEliminar(fila.id)}>
                                                    eliminar
                                                </button>
                                                <button type="button" className="btn-table-deshacer" onClick={() =>handelEditar(fila.id)}>
                                                    editar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>   
                        </div>  
                    </div>
                </main>
            </article>
        )
    return(
        <label>Cargando..</label>
    )
}

export default Clientes