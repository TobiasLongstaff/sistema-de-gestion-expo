import React, { useState, useEffect } from 'react'
import Navegacion from '../components/Navegacion/Navegacion'
import '../styles/abm.css'
import url from '../services/Settings'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import Cookies from 'universal-cookie'
import { UilTrash, UilEditAlt } from '@iconscout/react-unicons'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading/Loading'
import { motion } from 'framer-motion'

const cookies = new Cookies

const Localidades = () =>
{
    let navigate = useNavigate()
    const idsession = cookies.get('IdSession')

    const [ form, setForm ] = useState({ nombre: '' }) 
    const [ MensajeError, setError ] = useState(null)
    const [ data, setData ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ btn_value, setBtn ] = useState('Crear')
    const [ btnForm, setBtnForm] = useState('var(--principal)')
    const [ editar, setEditar] = useState(false)
    

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
        }
    })

    useEffect(() =>
    {
        obtenerLocalidades()
    },[])

    const obtenerLocalidades = async () => 
    {
        try
        {
            let res = await fetch(url+'obtener-localidades.php')
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

        let url_localidades = ''
        if(editar === true)
        {
            url_localidades = 'editar-localidad.php'
        } 
        else
        {
            url_localidades = 'crear-localidad.php'
        }
        console.log(editar)
        console.log(url_localidades)
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
            let res = await fetch(url+url_localidades, config)
            let infoPost = await res.json()
            console.log(infoPost[0])
            if(infoPost[0].error == 0)
            {
                setEditar(false)
                setError('')
                setBtnForm('var(--principal)')
                setBtn('Crear')
                setForm(
                {
                    nombre: '',
                    id_localidad: '',
                })
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
            title: '¿Está seguro?',
            text: "¿Está seguro que quiere eliminar esta localidad?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => 
        {
            if(result.isConfirmed) 
            {
                eliminarLocalidad(id_fila)
            }
        })
    }

    const eliminarLocalidad = async (id_fila) =>
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
            let res = await fetch(url+'eliminar-localidad.php?id='+id_fila, config)
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
        setEditar(true)
        console.log(editar)
        setBtnForm('var(--verde)')
        try
        {
            let res = await fetch(url+'obtener-localidades.php?id='+id_fila)
            let datos = await res.json()
            if(typeof datos !== 'undefined')
            {
                console.log(datos[0].nombre)
                setForm(
                {
                    nombre: datos[0].nombre,
                    id_localidad: id_fila
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

    const variants = 
    {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    }

    if(!loading)
        return(
            <article>
                <Navegacion texto="ABM Localidades" volver="/menu"/>
                <motion.main
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5 }}
                    variants={variants}   
                    className="container-abm">
                    <form className="container-form-abm container-login" onSubmit={handelSubmit}>
                        <h2>Agregar Localidad</h2>
                        <div className="container-textbox">
                            <input type="text" value={form.nombre} className="textbox-genegal" name="nombre" onChange={handelChange} required/>
                            <label>Nombre</label>
                        </div>
                        <label className="text-error">{MensajeError}</label>
                        <motion.input
                            whileHover={{ backgroundColor: '#88a4ff' }}
                            whileTap={{ scale: 0.9 }}   
                            type="submit" style={{ background: btnForm}} value={btn_value} className="btn-primario btn-general"
                        />
                    </form>
                    <div className="container-tabla">
                        <div className="tbl-header">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="th-nombre-usuario">
                                            <span>Nombre</span>
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
                                            <td className="td-nombre-usuario">{fila.nombre}</td>
                                            <td className="td-btn">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}  
                                                    type="button" className="btn-table-eliminar" onClick={() =>handelEliminar(fila.id)}>
                                                        <UilTrash size="20"/>
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}  
                                                    type="button" className="btn-table-editar" onClick={() =>handelEditar(fila.id)}>
                                                        <UilEditAlt size="20"/>
                                                </motion.button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>   
                        </div>  
                    </div>
                </motion.main>
            </article>
        )
    return(
        <Loading/>
    )
}

export default Localidades