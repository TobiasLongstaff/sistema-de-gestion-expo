import React, { useState, useEffect } from 'react'
import Navegacion from '../components/Navegacion/Navegacion'
import '../styles/abm.css'
import url from '../services/Settings'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import Cookies from 'universal-cookie'
import { UilTrash, UilEditAlt } from '@iconscout/react-unicons'
import Loading from '../components/Loading/Loading'

const cookies = new Cookies

const Usuarios = () =>
{
    const idsession = cookies.get('IdSession')
    const [ form, setForm ] = useState(
    { 
        id_usuario: '',
        nombre: '',
        mail: '',
        permisos: '' 
    }) 
    const [ MensajeError, setError ] = useState(null)
    const [ data, setData ] = useState([])
    const [ loading, setLoading ] = useState(true)

    useEffect(() =>
    {
        if(idsession == null)
        {
            navigate('/')
        }
        else
        {
            if(cookies.get('tipo') != 'admin')
            {
                navigate('/menu')
            }
            else
            {
                obtenerUsuarios()
            }
        }
    },[])

    const obtenerUsuarios = async () => 
    {
        try
        {
            let res = await fetch(url+'obtener-usuarios.php')
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
        if(form.id_usuario != '')
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
                let res = await fetch(url+'editar-usuario.php', config)
                let infoPost = await res.json()
                console.log(infoPost[0])
                if(infoPost[0].error == 0)
                {
                    setError('')
                    setForm(
                    {
                        id_usuario: '',
                        nombre: '',
                        mail: '',
                        permisos: '' 
                    }) 

                    Swal.fire(
                        'Operacion realizada correctamente',
                        '',
                        'success'
                    )
                    obtenerUsuarios()
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
        else
        {
            setError('Seleccionar el usuario que se desea editar')
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
                eliminarUsuario(id_fila)
            }
        })
    }

    const eliminarUsuario = async (id_fila) =>
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
            let res = await fetch(url+'eliminar-usuarios.php?id='+id_fila, config)
            let infoDel = await res.json()
            console.log(infoDel[0])
            if(infoDel[0].error == 0)
            {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                obtenerUsuarios()
                setForm(
                {
                    id_usuario: '',
                    nombre: '',
                    mail: '',
                    permisos: '' 
                })
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
        try
        {
            let res = await fetch(url+'obtener-usuarios.php?id='+id_fila)
            let datos = await res.json()
            if(typeof datos !== 'undefined')
            {
                console.log(datos[0].nombre)
                setForm(
                {
                    nombre: datos[0].nombre,
                    mail: datos[0].mail,
                    permisos: datos[0].permisos,
                    id_usuario: id_fila
                })
                console.log(form)
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
                <Navegacion texto="Usuarios" volver="/menu"/>
                <main className="container-abm">
                    <form className="container-form-abm container-login" onSubmit={handelSubmit}>
                        <h2>Editar Usuarios</h2>
                        <div className="container-textbox">
                            <input type="text" value={form.nombre} className="textbox-genegal" name="nombre" onChange={handelChange} required/>
                            <label>Nombre Apellido</label>
                        </div>
                        <div className="container-textbox">
                            <input type="email" value={form.mail} className="textbox-genegal" name="mail" onChange={handelChange} required/>
                            <label>E-mail</label>
                        </div>
                        <div>
                            <label>Seleccionar privilegios del usuario:</label>
                            <select value={form.permisos} className="textbox-genegal" name="permisos" onChange={handelChange} required>
                                <option value="estandar">Estandar</option>
                                <option value="admin">Administrador</option>
                            </select>
                        </div>
                        <label className="text-error">{MensajeError}</label>
                        <input type="submit" value="Editar" className="btn-primario btn-general"/>
                    </form>
                    <div className="container-tabla">
                        <div className="tbl-header">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="th-usuario-nombre">
                                            <span>Nombre Apellido</span>
                                        </th>
                                        <th className="th-usuario-mail">
                                            <span>E-Mail</span>
                                        </th>
                                        <th className="th-permisos">
                                            <span>Permisos</span>
                                        </th>
                                        <th className="th-btn">
                                            <span>Controles</span>   
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div> 
                        <div className="tbl-content-completo">
                            <table>
                                <tbody>
                                    {data.map((fila) =>
                                    (
                                        <tr key={fila.id}>
                                            <td className="td-usuario-nombre">{fila.nombre}</td>
                                            <td className="td-usuario-mail">{fila.mail}</td>
                                            <td className="td-permisos">{fila.permisos}</td>
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
                </main>
            </article>
        )
    return(
        <Loading/>
    )
}

export default Usuarios