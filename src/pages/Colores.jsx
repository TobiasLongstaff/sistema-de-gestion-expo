import React, { useState, useEffect } from 'react'
import Navigation from '../components/Navegacion/Navegacion'
import '../styles/abm.css'
import url from '../services/Settings'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import Cookies from 'universal-cookie'

const cookies = new Cookies

const Colores = () =>
{

    const [ form, setForm ] = useState({ nombre_apellido: '', id_usuario: cookies.get('IdSession'), id_cliente: '' }) 
    const [ MensajeError, setError ] = useState(null)
    const [ data, setData ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ btn_value, setBtn ] = useState('Crear')
    const [ btnForm, setBtnForm] = useState('var(--principal)')

    let editar = false

    useEffect(() =>
    {
        obtenerClores()
    },[])

    const obtenerClores = async () => 
    {
        try
        {
            let res = await fetch(url+'obtener-colores.php')
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
        let url_colores = editar === false ? 'editar-colores.php' : 'crear-colores.php';

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
            let res = await fetch(url+url_colores, config)
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
                obtenerColores()
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
                eliminarColores(id_fila)
            }
        })
    }

    const eliminarColores = async (id_fila) =>
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
            let res = await fetch(url+'eliminar-colores.php?id='+id_fila, config)
            let infoDel = await res.json()
            console.log(infoDel[0])
            if(infoDel[0].error == 0)
            {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                obtenerColores()
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
            let res = await fetch(url+'obtener-colores.php?id='+id_fila)
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

    const handelChange = e =>
    {
        setForm(
        {
            ...form,
            [e.target.name]: e.target.value
        })
        console.log(form)
    }

    return(
        <article>
            <Navigation texto="Colores" volver="/menu"/>
            <main className="container-colores">
                <form className="container-form-abm container-login" onSubmit={handelSubmit}>
                    <h2>Agregar Colores</h2>
                    <div className="container-textbox">
                        <input type="text" value={form.color}  className="textbox-genegal" name="color" onChange={handelChange} required/>
                        <label>Color</label>
                    </div>
                    <div className="container-textbox">
                        <input type="text" value={form.calibres}  className="textbox-genegal" name="calibres" onChange={handelChange} required/>
                        <label>Calibres</label>
                    </div>
                    <div className="container-textbox">
                        <input type="text" value={form.pje_max}  className="textbox-genegal" name="pje_max" onChange={handelChange} required/>
                        <label>PJE max</label>
                    </div>
                    <div className="container-textbox">
                        <input type="text" value={form.pje_min}  className="textbox-genegal" name="pje_min" onChange={handelChange} required/>
                        <label>PJE min</label>
                    </div>
                    <div className="container-textbox">
                        <input type="text" value={form.raza}  className="textbox-genegal" name="raza" onChange={handelChange} required/>
                        <label>Raza</label>
                    </div>
                    <div className="container-textbox">
                        <input type="text" value={form.tipo_animal}  className="textbox-genegal" name="tipo_animal" onChange={handelChange} required/>
                        <label>Tipo animal</label>
                    </div>
                    <div className="container-textbox">
                        <input type="text" value={form.denticion}  className="textbox-genegal" name="denticion" onChange={handelChange} required/>
                        <label>Denticion</label>
                    </div>
                    <div className="container-textbox">
                        <input type="text" value={form.grasa}  className="textbox-genegal" name="grasa" onChange={handelChange} required/>
                        <label>Grasa</label>
                    </div>
                    <div className="container-textbox">
                        <input type="text" value={form.cobertura}  className="textbox-genegal" name="cobertura" onChange={handelChange} required/>
                        <label>Cobertura</label>
                    </div>
                    <div className="container-textbox">
                        <input type="text" value={form.osificacion}  className="textbox-genegal" name="osificacion" onChange={handelChange} required/>
                        <label>Osificacion</label>
                    </div>
                    <div className="container-textbox">
                        <input type="text" value={form.evaluacion_corte}  className="textbox-genegal" name="evaluacion_corte" onChange={handelChange} required/>
                        <label>Evaluacion corte</label>
                    </div>
                    <div className="container-textbox">
                        <input type="text" value={form.color_grasa}  className="textbox-genegal" name="color_grasa" onChange={handelChange} required/>
                        <label>Color grasa</label>
                    </div>
                    <div className="container-textbox">
                        <input type="text" value={form.color_carne}  className="textbox-genegal" name="color_carne" onChange={handelChange} required/>
                        <label>Color carne</label>
                    </div>
                    <div className="container-textbox">
                        <input type="text" value={form.marmoreado}  className="textbox-genegal" name="marmoreado" onChange={handelChange} required/>
                        <label>Marmoreado</label>
                    </div>
                    <div className="container-textbox">
                        <input type="text" value={form.ph}  className="textbox-genegal" name="ph" onChange={handelChange} required/>
                        <label>PH</label>
                    </div>
                    <div className="container-textbox">
                        <input type="text" value={form.gi}  className="textbox-genegal" name="gi" onChange={handelChange} required/>
                        <label>%GI</label>
                    </div>
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
                                {/* {data.map((fila) =>
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
                                ))} */}
                            </tbody>
                        </table>   
                    </div>  
                </div>
            </main>
        </article>
    )
}

export default Colores
