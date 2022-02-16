import React, { useState, useEffect } from 'react'
import Navigation from '../components/Navegacion/Navegacion'
import '../styles/abm.css'
import url from '../services/Settings'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import Cookies from 'universal-cookie'
import { UilSearch, UilPlus } from '@iconscout/react-unicons'

const cookies = new Cookies

const Colores = () =>
{

    const [ form, setForm ] = useState({ color: '', calibres: '' }) 
    const [ MensajeError, setError ] = useState(null)
    const [ data, setData ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ btn_value, setBtn ] = useState('Crear')
    const [ btnForm, setBtnForm ] = useState('var(--principal)')

    const [ activoCalibres, setActivoCalibres ] = useState('container-categorias active')
    const [ dataList, setDataList ] = useState([])
    const [ ultimoElemento, setUltimoElemento ] = useState(null)

    let editar = false

    // useEffect(() =>
    // {
    //     obtenerClores()
    // },[])

    useEffect(() =>
    {
        obtenerAtributos(ultimoElemento)

        console.log(form)
    },[form])

    const obtenerAtributos = async (elemento) =>
    {
        try
        {
            let res = await fetch(url+'obtener-datos-elementos.php?nombre='+elemento)
            let datos = await res.json()
            
            if(typeof datos !== 'undefined')
            {
                setDataList(datos)
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

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

    const completarTexto = e =>
    {
        setForm(
        {
            ...form,
            [e.target.name]: e
        })
    }

    const handelChange = e =>
    {
        setForm(
        {
            ...form,
            [e.target.name]: e.target.value
        })
        setUltimoElemento(e.target.name)
        console.log(form)
    }

    return(
        <article>
            <Navigation texto="Colores" volver="/menu"/>
            <main className="container-colores">
                <div className="container-abm-colores">
                    <h2>Agregar Colores</h2>
                    <div className="container-info-colores">
                        <div className="container-textbox">
                            <input type="text" value={form.color}  className="textbox-genegal" name="color" onChange={handelChange} required/>
                            <label>Color</label>
                        </div>
                        <form className="container-form-abm-colores">
                            <div>
                                <div className="form-group" style={{width: '140px'}}>
                                    <input type="search" value={form.calibres} style={{width: '140px'}} className="textbox-genegal textbox-buscar" name="calibres" placeholder="Calibres" onChange={handelChange} required/>
                                    <UilSearch size="20" className="input-icon"/>
                                </div>
                                <div className={activoCalibres} style={{width: '140px'}}>
                                    {dataList.map((filaList) =>
                                    (
                                        <button className="btn-tabla-buscar" type="button" onClick={()=>completarTexto()} key={filaList.id}>{filaList.nombre}</button>
                                    ))}
                                </div>                                
                            </div>
                            <button className="btn-agregar-a-color" type="submit"><UilPlus size="22" color="white"/></button>                            
                        </form>
                        <div className="container-textbox">
                            <input type="text" value={form.pje_max} style={{width: '140px'}} className="textbox-genegal" name="pje_max" onChange={handelChange} required/>
                            <label>PJE max</label>
                        </div>
                        <div className="container-textbox">
                            <input type="text" value={form.pje_min} style={{width: '140px'}} className="textbox-genegal" name="pje_min" onChange={handelChange} required/>
                            <label>PJE min</label>
                        </div>
                        <div className="form-group" style={{width: '200px'}}>
                            <input type="search" value={form.raza} style={{width: '200px'}} className="textbox-genegal textbox-buscar" name="raza" placeholder="Raza" onChange={handelChange} required/>
                            <UilSearch size="20" className="input-icon"/>
                        </div>
                        <button className="btn-agregar-a-color" type="button"><UilPlus size="22" color="white"/></button>
                    </div>
                    <div className="container-info-colores">
                        <div className="form-group" style={{width: '160px'}}>
                            <input type="search" value={form.tipo_animal} style={{width: '160px'}} className="textbox-genegal textbox-buscar" name="tipo_animal" placeholder="Tipo animal" onChange={handelChange} required/>
                            <UilSearch size="20" className="input-icon"/>
                        </div>
                        <button className="btn-agregar-a-color" type="button"><UilPlus size="22" color="white"/></button>
                        <div className="form-group" style={{width: '160px'}}>
                            <input type="search" value={form.denticion} style={{width: '160px'}} className="textbox-genegal textbox-buscar" name="denticion" placeholder="Denticion" onChange={handelChange} required/>
                            <UilSearch size="20" className="input-icon"/>
                        </div>
                        <button className="btn-agregar-a-color" type="button"><UilPlus size="22" color="white"/></button>
                        <div className="form-group" style={{width: '140px'}}>
                            <input type="search" value={form.grasa} style={{width: '140px'}} className="textbox-genegal textbox-buscar" name="grasa" placeholder="Grasa" onChange={handelChange} required/>
                            <UilSearch size="20" className="input-icon"/>
                        </div>
                        <button className="btn-agregar-a-color" type="button"><UilPlus size="22" color="white"/></button>
                        <div className="form-group" style={{width: '200px'}}>
                            <input type="search" value={form.cobertura} style={{width: '200px'}} className="textbox-genegal textbox-buscar" name="cobertura" placeholder="Cobertura" onChange={handelChange} required/>
                            <UilSearch size="20" className="input-icon"/>
                        </div>
                        <button className="btn-agregar-a-color" type="button"><UilPlus size="22" color="white"/></button>
                    </div>
                    <div className="container-info-colores">
                        <div className="form-group" style={{width: '160px'}}>
                            <input type="search" value={form.osificacion} style={{width: '160px'}} className="textbox-genegal textbox-buscar" name="osificacion" placeholder="Osificacion" onChange={handelChange} required/>
                            <UilSearch size="20" className="input-icon"/>
                        </div>
                        <button className="btn-agregar-a-color" type="button"><UilPlus size="22" color="white"/></button>
                        <div className="form-group" style={{width: '200px'}}>
                            <input type="search" value={form.evaluacion_corte} style={{width: '200px'}} className="textbox-genegal textbox-buscar" name="evaluacion_corte" placeholder="Evaluacion corte" onChange={handelChange} required/>
                            <UilSearch size="20" className="input-icon"/>
                        </div>
                        <button className="btn-agregar-a-color" type="button"><UilPlus size="22" color="white"/></button>
                        <div className="form-group" style={{width: '200px'}}>
                            <input type="search" value={form.color_grasa} style={{width: '200px'}} className="textbox-genegal textbox-buscar" name="color_grasa" placeholder="Color grasa" onChange={handelChange} required/>
                            <UilSearch size="20" className="input-icon"/>
                        </div>
                        <button className="btn-agregar-a-color" type="button"><UilPlus size="22" color="white"/></button>
                    </div>
                    <div className="container-info-colores">
                    <div className="form-group" style={{width: '200px'}}>
                            <input type="search" value={form.color_carne} style={{width: '200px'}} className="textbox-genegal textbox-buscar" name="color_carne" placeholder="Color carne" onChange={handelChange} required/>
                            <UilSearch size="20" className="input-icon"/>
                        </div>
                        <button className="btn-agregar-a-color" type="button"><UilPlus size="22" color="white"/></button>
                        <div className="form-group" style={{width: '200px'}}>
                            <input type="search" value={form.marmoreado} style={{width: '200px'}} className="textbox-genegal textbox-buscar" name="marmoreado" placeholder="Marmoreado" onChange={handelChange} required/>
                            <UilSearch size="20" className="input-icon"/>
                        </div>
                        <button className="btn-agregar-a-color" type="button"><UilPlus size="22" color="white"/></button>
                        <div className="container-textbox">
                            <input type="text" value={form.ph} style={{width: '140px'}} className="textbox-genegal" name="ph" onChange={handelChange} required/>
                            <label>PH</label>
                        </div>
                        <div className="container-textbox">
                            <input type="text" value={form.gi} style={{width: '140px'}} className="textbox-genegal" name="gi" onChange={handelChange} required/>
                            <label>%GI</label>
                        </div>                        
                    </div>
                    <div className="container-tabla">
                    <div className="tbl-header">
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <span>Color</span>
                                    </th>
                                    <th>
                                        <span>Calibres</span>
                                    </th> 
                                    <th>
                                        <span>PJE max</span>   
                                    </th>
                                    <th>
                                        <span>PJE min</span>   
                                    </th>
                                </tr>
                            </thead>
                        </table>
                    </div> 
                    <div className="tbl-content">
                        <table>
                            <tbody>
                            </tbody>
                        </table>   
                    </div>  
                </div>
                    <label className="text-error">{MensajeError}</label>
                    <input type="submit" style={{ background: btnForm}} value={btn_value} className="btn-primario btn-general"/>
                </div>
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
