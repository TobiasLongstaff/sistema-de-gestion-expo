import React, { useState, useEffect } from 'react'
import Navegacion from '../components/Navegacion/Navegacion'
import '../styles/abm.css'
import url from '../services/Settings'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import Cookies from 'universal-cookie'

const cookies = new Cookies

const Clientes = () =>
{
    const [ form, setForm ] = useState({ nombre_apellido: '', id_usuario: cookies.get('IdSession'), id_cliente: '' }) 
    const [ MensajeError, setError ] = useState(null)
    const [ data, setData ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ btn_value, setBtn ] = useState('Crear')
    const [ btnForm, setBtnForm] = useState('var(--principal)')
    const [ data_usuarios, setDataUsuarios] = useState([])

    let editar = false

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

    const handelSubmit = async e =>
    {
        e.preventDefault();
        let url_cliente = editar === false ? 'editar-cliente.php' : 'crear-cliente.php';

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

    const handelEditar = async (id_fila) =>
    {
        editar = true
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

    if(!loading)
        return(
            <article>
                <Navegacion texto="ABM Clientes" volver="/menu"/>
                <main className="container-abm">
                    <form className="container-form-abm container-login" onSubmit={handelSubmit}>
                        <h2>Agregar Cliente</h2>
                        <div className="container-textbox">
                            <input type="text" value={form.nombre_apellido}  className="textbox-genegal" name="nombre_apellido" onChange={handelChange} required/>
                            <label>Nombre y Apellido</label>
                        </div>
                        <select value={form.id_usuario} className="select-general">
                            <option disabled>Usuario</option>
                            {data_usuarios.map((fila_usuarios) =>
                            (
                                <option key={fila_usuarios.id} value={fila_usuarios.id}>{fila_usuarios.nombre}</option>
                            ))}
                        </select>
                        <label className="text-error">{MensajeError}</label>
                        <input type="submit" style={{ background: btnForm}} value={btn_value} className="btn-primario btn-general"/>
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