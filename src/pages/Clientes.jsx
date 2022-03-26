import React, { useState, useEffect } from 'react'
import Navegacion from '../components/Navegacion/Navegacion'
import '../styles/abm.css'
import url from '../services/Settings'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import Cookies from 'universal-cookie'
import { UilTrash, UilEditAlt, UilPlus } from '@iconscout/react-unicons'

const cookies = new Cookies

const Clientes = () =>
{
    const [ form, setForm ] = useState({ nombre_apellido: '', id_usuario: '1', id_cliente: '' }) 
    const [ MensajeError, setError ] = useState(null)
    const [ data, setData ] = useState([])
    const [ dataLocalidad, setDataLocalidad ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ btn_value, setBtn ] = useState('Crear')
    const [ btnForm, setBtnForm] = useState('var(--principal)')
    const [ data_usuarios, setDataUsuarios] = useState([])
    const [ dataLocalidades, setDataLocalidades] = useState([])
    const [ editar, setEditar ] = useState(false)
    const [ idCliente, setIdCliente ] = useState('')
    const [ formLocalidad, setFromLocalidades ] = useState({ id_localidad: '', id_cliente: ''})

    useEffect(() =>
    {
        obtenerClientes()
        obtenerTodasLasLocalidades()
    },[])

    useEffect(() =>
    {
        obtenerLocalidades()
    },[idCliente])

    const obtenerClientes = async () => 
    {
        try
        {
            let res = await fetch(url+'obtener-clientes.php')
            let datos = await res.json()
            let res_usuarios = await fetch(url+'obtener-usuarios.php')
            let datos_usuarios = await res_usuarios.json()
            
            if(typeof datos !== 'undefined' && typeof datos_usuarios !== 'undefined')
            {
                setData(datos)
                setDataUsuarios(datos_usuarios)
                setLoading(false)
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    const obtenerTodasLasLocalidades = async () =>
    {
        try
        {
            let res = await fetch(url+'obtener-localidades.php')
            let datosLocalidad = await res.json()
            
            if(typeof datosLocalidad !== 'undefined')
            {
                setDataLocalidades(datosLocalidad)
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    const handelSubmitLocalidad = async e =>
    {
        e.preventDefault();
        console.log(formLocalidad)
        if(formLocalidad.id_cliente == '')
        {
            Swal.fire(
                'Agregar o seleccionar un cliente',
                'Agregar o seleccionar un cliente antes de asociar una localidad',
                'error'
            )
        }
        else
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
                    body: JSON.stringify(formLocalidad)
                }
                let res = await fetch(url+'agregar-localidad.php', config)
                let infoPost = await res.json()
                console.log(infoPost[0])
                if(infoPost[0].error == 0)
                {
                    Swal.fire(
                        'Operacion realizada correctamente',
                        '',
                        'success'
                    )
                    obtenerLocalidades()
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

    }

    const handelSubmit = async e =>
    {
        e.preventDefault();
        
        let url_cliente = ''
        if(editar === true)
        {
            url_cliente = 'editar-cliente.php'
        } 
        else
        {
            url_cliente = 'crear-cliente.php'
        }

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
            let res = await fetch(url+url_cliente, config)
            let infoPost = await res.json()
            console.log(infoPost[0])
            if(infoPost[0].error == 0)
            {
                setIdCliente(infoPost[0].id_cliente)
                setEditar(false)
                setError('')
                setBtnForm('var(--principal)')
                setBtn('Crear')
                setForm(
                {
                    nombre_apellido: '',
                    id_usuario: '',
                    id_cliente: ''
                })
                Swal.fire(
                    'Operacion realizada correctamente',
                    '',
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

    const handelChangeLocalidad = e =>
    {
        setFromLocalidades(
        {
            ...formLocalidad,
            id_cliente: idCliente,
            [e.target.name]: e.target.value
        })
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

    const handelEliminarLocalidad = async (id_localidad) =>
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
            let res = await fetch(url+'eliminar-localidad-de-cliente.php?id_localidad='+id_localidad, config)
            let infoDel = await res.json()
            console.log(infoDel[0])
            if(infoDel[0].error == 0)
            {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                obtenerLocalidades()
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

    const handelEditar = async (id_fila) =>
    {
        setIdCliente(id_fila)
        setEditar(true)
        setBtnForm('var(--verde)')
        try
        {
            let res = await fetch(url+'obtener-clientes.php?id='+id_fila)
            let datos = await res.json()
            if(typeof datos !== 'undefined') 
            {
                console.log(datos[0].usuario)
                setForm(
                {
                    nombre_apellido: datos[0].nombre_apellido,
                    id_usuario: datos[0].usuario,
                    id_cliente: id_fila
                })
                console.log(form)
                setBtn('Editar')
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
            let res = await fetch(url+'obtener-localidades-por-clientes.php?id_cliente='+idCliente)
            let datosLocalidad = await res.json()
            if(typeof datosLocalidad !== 'undefined') 
            {
                setDataLocalidad(datosLocalidad)
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    if(!loading)
        return(
            <article>
                <Navegacion texto="ABM Clientes" volver="/menu"/>
                <main className="container-abm">
                    <div className="container-form-abm container-login container-form-clientes">
                        <form className="form-agregar-cliente" onSubmit={handelSubmit}>
                            <h2>Agregar Cliente</h2>
                            <div className="container-textbox">
                                <input type="text" value={form.nombre_apellido}  className="textbox-genegal" name="nombre_apellido" onChange={handelChange} required/>
                                <label>Nombre y Apellido</label>
                            </div>
                            <div>
                                <label>Usuario</label>
                                <select value={form.id_usuario} name="id_usuario" className="select-general" onChange={handelChange}>
                                    <option disabled>Usuario</option>
                                    {data_usuarios.map((fila_usuarios) =>
                                    (
                                        <option key={fila_usuarios.id} value={fila_usuarios.id}>{fila_usuarios.nombre}</option>
                                    ))}
                                </select>                                
                            </div>
                            <label className="text-error">{MensajeError}</label>
                            <input type="submit" style={{ background: btnForm}} value={btn_value} className="btn-primario btn-general"/>
                        </form>
                        <form className="form-agregar-localidad-cliente" onSubmit={handelSubmitLocalidad}>
                            <div>
                                <label>Localidad</label>
                                <select value={formLocalidad.id_localidad} name="id_localidad" className="select-general" onChange={handelChangeLocalidad}>
                                    {dataLocalidades.map((filaLocalidades) =>
                                    (
                                        <option key={filaLocalidades.id} value={filaLocalidades.id}>{filaLocalidades.nombre}</option>
                                    ))}
                                </select>
                            </div>
                            <button style={{ background: btnForm}} className="btn-agregar-a-color" type="submit"><UilPlus size="22" color="white"/></button>
                        </form>                        
                    </div>
                    <div className="container-tablas-clientes">
                        <div className="container-tabla">
                            <div className="tbl-header">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="th-nombre">
                                                <span>Nombre y Apellido</span>
                                            </th>
                                            <th className="th-usuario">
                                                <span>Usuario</span>
                                            </th> 
                                            <th className="th-btn">
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
                                                <td className="td-nombre">{fila.nombre_apellido}</td>
                                                <td className="td-usuario">{fila.usuario}</td>
                                                <td className="td-btn">
                                                    <button type="button" className="btn-table-eliminar" onClick={() =>handelEliminar(fila.id)}>
                                                        <UilTrash size="20"/>
                                                    </button>
                                                    <button type="button" className="btn-table-editar" onClick={() =>handelEditar(fila.id)}>
                                                        <UilEditAlt size="20"/>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>   
                            </div>  
                        </div>
                        <div className="container-tabla">
                            <div className="tbl-header">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="th-localidad-cliente">
                                                <span>Localidad</span>
                                            </th>
                                            <th className="th-btn">
                                                <span>Controles</span>   
                                            </th>
                                        </tr>
                                    </thead>
                                </table>
                            </div> 
                            <div className="tbl-content">
                                <table>
                                    <tbody>
                                        {dataLocalidad.map((filaLocalidad) =>
                                        (
                                            <tr key={filaLocalidad.id}>
                                                <td className="td-localidad-cliente">{filaLocalidad.nombre}</td>
                                                <td className="td-btn">
                                                    <button type="button" className="btn-table-eliminar" onClick={() =>handelEliminarLocalidad(filaLocalidad.id_clientes_localidad)}>
                                                        <UilTrash size="20"/>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>   
                            </div>  
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