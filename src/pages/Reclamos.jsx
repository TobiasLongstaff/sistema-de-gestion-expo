import React, { useEffect, useState, useRef, useCallback } from 'react'
import Navigation from '../components/Navegacion/Navegacion'
import '../styles/reclamos.css'
import { UilSearch, UilPaperclip, UilTimes } from '@iconscout/react-unicons'
import url from '../services/Settings'
import Cookies from 'universal-cookie'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import { useDropzone } from 'react-dropzone'

const cookies = new Cookies

const Reclamos = () =>
{
    const [ activoCliente, setActivo ] = useState('container-clientes')
    const [ data, setData ] = useState([])
    const [ fechaActual, setFechaActual ] = useState('')
    const [ form, setForm ] = useState(
    { 
        cliente: '', 
        id_usuario: cookies.get('IdSession'), 
        id_cliente: '', 
        categoria: '', 
        motivo: '',
        fechaReclamo: '', 
        fechaRecepcion: '',
        observacion: '',
        imagenes: []
    })
    const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/dvc29rwuo/image/upload`
    const CLOUDINARY_UPLOAD_PRESET = 'siebycml'
    const [ imagenes, setImagenes ] = useState([])
    const formReclamos = useRef()
    const motivo = useRef()
    const btnForm = useRef()

    useEffect(() =>
    {
        obtenerFechaActual()

        if(activoCliente === 'container-clientes active')
        {
            obtenerClientes()
        }

        if(form.categoria == 'Calidad')
        {
            motivo.current.disabled = false;
        }
        else if(form.categoria != 'Calidad' && form.motivo != '')
        {
            motivo.current.disabled = true;
            motivo.current.value = ''
            setForm(
                {
                    ...form,
                    motivo: ''
                }
            )
        }
        else
        {
            motivo.current.disabled = true;
        }
    },[form])

    useEffect(() =>
    {
        if(form.fechaRecepcion != '')
        {
            crearReclamos()
        }

    }, [form.imagenes])

    const onDrop = useCallback(acceptedFiles => 
    {
        acceptedFiles.forEach((file) =>
            enviarImagenes(file)
        )
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone(
    {
        accept: 'image/jpeg,image/png',
        onDrop
    })

    const enviarImagenes =  async (acceptedFiles) =>
    {
        const file = acceptedFiles
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

        try 
        {
            let config =
            {
                method: 'POST',
                body: formData
            }
            let res = await fetch(CLOUDINARY_URL, config)
            let infoPost = await res.json()
            if(typeof infoPost !== 'undefined')
            {
                const arrayImagen = 
                {
                    nombre: infoPost.original_filename+'.'+infoPost.format,
                    url: infoPost.url
                }
                setImagenes(imagenes =>
                [
                    ...imagenes,
                    arrayImagen
                ])
                btnForm.current.focus()

            }
        }
        catch(err)
        {
            console.error(err)
        }
    }

    const obtenerFechaActual = () =>
    {
        const fecha = new Date()
        const num = fecha.getDate()
        let mes = String(fecha.getMonth() + 1)
        const year = fecha.getFullYear()

        if(mes.length === 1)
        {
            mes = '0'+mes
        }

        setFechaActual(year+'-'+mes+'-'+num)
    }

    const obtenerClientes = async () =>
    {
        try
        {
            let res = await fetch(url+'obtener-clientes.php?nombre=' + form.cliente + '&id_usuario=' + form.id_usuario)
            let datos = await res.json()
            
            if(typeof datos !== 'undefined')
            {
                console.log(datos)
                setData(datos)
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
                setForm({
                    ...form,
                    imagenes: imagenes
                })
            }
        })
    }

    const crearReclamos = async () =>
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
            let res = await fetch(url+'crear-reclamo.php', config)
            let infoPost = await res.json()
            console.log(infoPost[0])
            if(infoPost[0].error == 0)
            {
                Swal.fire(
                    'Operacion realizada correctamente',
                    '',
                    'success'
                )
                formReclamos.current.reset()
                setForm(
                { 
                    ...form,
                    cliente: '',  
                    id_cliente: '',
                    categoria: '', 
                    motivo: '',
                    fechaRecepcion: '',
                    observacion: '',
                    imagenes: []
                })
                setImagenes([])
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

    const mostrarClientes = () =>
    {
        setActivo('container-clientes active')
    }

    const handelChangeCliente = e =>
    {
        setForm(
        {
            ...form,
            [e.target.name]: e.target.value
        })
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

    const eliminarImagen = file =>
    {
        const newFiles = [...imagenes];
        newFiles.splice(file, 1);
        setImagenes(newFiles);
    }

    const handelChange = e =>
    {
        setForm(
        {
            ...form,
            [e.target.name]: e.target.value,
            fechaReclamo: fechaActual
        })
    }

    return(
        <article>
            <Navigation texto="Reclamos" volver="/menu"/>
            <main className="container-pedidos">
                <form ref={formReclamos} className="form-reclamos" onSubmit={handelSubmit}>
                    <div>
                        <span>Fecha del Reclamo</span>
                        <input type="date" name="fechaReclamo" value={fechaActual} className="textbox-genegal" onChange={handelChange} required disabled/>                        
                    </div>
                    <div>
                        <span>Fecha de recepción de la mercadería</span>
                        <input type="date" max={fechaActual} name="fechaRecepcion" value={form.fechaRecepcion} className="textbox-genegal" onChange={handelChange} required />                        
                    </div>
                    <div>
                        <div className="form-group">
                            <input type="search" className="textbox-genegal textbox-buscar" autoComplete="off" name="cliente" onClick={mostrarClientes} onChange={handelChangeCliente} onBlur={fueraDeFoco} value={form.cliente} placeholder="Cliente" required="" />
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
                        <span>Observaciones</span>
                        <textarea className="textbox-genegal textarea-general" name="observacion" onChange={handelChange} rows="5" cols="30" required></textarea>                        
                    </div>
                    <div>
                        <span>Categoría del reclamo o motivo</span>
                        <div className="conteiner-select">
                            <select className="textbox-genegal selectbox-general" onChange={handelChange} name="categoria" size="10" required>
                                <option value="Calidad">Calidad</option>
                                <option value="Descuento por Pago de Contado">Descuento por Pago de Contado</option>
                                <option value="Diferencia en el Kilaje">Diferencia en el Kilaje</option>
                                <option value="Diferencia en el Precio">Diferencia en el Precio</option>
                                <option value="Error de Etiquetado">Error de Etiquetado</option>
                                <option value="Error Documental Facturación">Error Documental Facturación</option>
                                <option value="Faltante de Mercadería">Faltante de Mercadería</option>
                                <option value="Llegada fuera de Horario">Llegada fuera de Horario</option>
                                <option value="Pedido Erroneo">Pedido Erroneo</option>
                                <option value="Acuerdo Comercial">Acuerdo Comercial</option>
                            </select>
                            <select ref={motivo} className="textbox-genegal selectbox-general-2" onChange={handelChange} name="motivo" size="7" required disabled>
                                <option value="Calidad Especifica">Calidad Especifica</option>
                                <option value="Color">Color</option>
                                <option value="Estado">Estado</option>
                                <option value="Golpe">Golpe</option>
                                <option value="Grasa">Grasa</option>
                                <option value="Packaging">Packaging</option>
                                <option value="Vencimiento">Vencimiento</option>
                            </select>                            
                        </div>
                    </div>
                    <div className="dropzone" {...getRootProps()}>
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                            <p>Drop the files here ...</p> :
                            <>
                                <p className="dropzone-p">Agregue un archivo</p>
                                <p>o suelte archivos aquí</p>
                            </>
                        }
                    </div>
                    <div>
                        {imagenes.map((filaImagenes, i) =>
                        (
                            <div key={i}>                     
                                <div className="container-row-archivo">
                                    <div className="container-text-archivo">
                                        <UilPaperclip size="20" color="#4d76fd"/>
                                        <p>{filaImagenes.nombre}</p>
                                    </div>
                                    <button type="button" className="btn-eliminar-archivo" onClick={()=> eliminarImagen(i)}>
                                        <UilTimes size="20" color="#4d76fd"/>
                                    </button>
                                </div>
                                <progress value="100" max="100" className="progress-archivo"></progress>
                            </div>
                        ))}
                    </div>
                    <div className="conteiner-btn">
                        <input ref={btnForm} type="submit" className="btn-primario btn-general" value="Enviar"/>   
                    </div>
                </form>
            </main>
        </article>

    )
}

export default Reclamos