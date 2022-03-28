import React, { useState, useEffect } from 'react'
import Navigation from '../components/Navegacion/Navegacion'
import Cookies from 'universal-cookie'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import url from '../services/Settings'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading/Loading'

const cookies = new Cookies

const Cuenta = () =>
{
    let navigate = useNavigate()
    const idsession = cookies.get('IdSession')
    const tipo = cookies.get('tipo')

    useEffect(() =>
    {
        if(idsession == null)
        { 
            navigate('/')
        }
        else
        {
            obtenerMail()
        }
    },[])

    const [ form, setForm ] = useState(
    {
        id_usuario: cookies.get('IdSession'),
        password: '',
        password_con: ''
    })

    const [ formMail, setFormMail ] = useState({ mail: '' })

    const obtenerMail = async () =>
    {
        try
        {
            let res = await fetch(url+'obtener-mail.php')
            let datosMail = await res.json()
            
            if(typeof datosMail !== 'undefined')
            {
                setFormMail(
                {
                    mail: datosMail[0].mail
                })
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
    }

    const handelChangeMail = e =>
    {
        setFormMail(
        {
            [e.target.name]: e.target.value
        })
    }

    const handelSubmitMail = async e =>
    {
        e.preventDefault()
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
                body: JSON.stringify(formMail)
            }
            let res = await fetch(url+'actualizar-mail.php', config)
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
                    infoPost[0].mensaje,
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
                cambiarPassword()
            }
        })
    }

    const cambiarPassword = async () =>
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
            let res = await fetch(url+'actualizar-password.php', config)
            let infoPost = await res.json()
            console.log(infoPost[0])
            if(infoPost[0].error == 0)
            {
                Swal.fire(
                    'Operacion realizada correctamente',
                    '',
                    'success'
                )

                setForm(
                { 
                    ...form,
                    password: '', 
                    password_con: ''
                })
            }
            else
            {
                Swal.fire(
                    infoPost[0].mensaje,
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

    if(idsession)
        return(
            <article>
                <Navigation texto="Mi Cuenta" volver="/menu"/>
                <main>
                    <form className="form-reclamos" onSubmit={handelSubmit}>
                        <label>Nombre Apellido: {cookies.get('nombre')}</label>
                        <label>E-Mail: {cookies.get('mail')}</label>
                        <label>Perimisos: {cookies.get('tipo')}</label>
                        <div className="container-textbox">
                            <input type="password" name="password" onChange={handelChange} value={form.password} className="textbox-genegal" required/>
                            <label>Contraseña</label>
                        </div>
                        <div className="container-textbox">
                            <input type="password" name="password_con" onChange={handelChange} value={form.password_con} className="textbox-genegal" required/>
                            <label>Confirmar Contraseña</label>
                        </div>
                        <div className="conteiner-btn">
                            <input type="submit" className="btn-primario btn-general" value="Enviar"/>   
                        </div>
                    </form>
                    {(() =>{ 
                        if(tipo == 'admin') 
                        {
                            return(
                                <form className="form-reclamos" onSubmit={handelSubmitMail}>
                                    <p>Actualizar E-Mail al cual se envian los pedidos y reclamos</p>
                                    <div className="container-textbox">
                                        <input type="email" name="mail" onChange={handelChangeMail} value={formMail.mail} className="textbox-genegal" required/>
                                        <label>E-Mail</label>
                                    </div>
                                    <div className="conteiner-btn">
                                        <input type="submit" className="btn-primario btn-general" value="Actualizar"/>   
                                    </div>
                                </form>
                            )
                        }
                    })()}
                </main>
            </article>
        )
    return(
        <Loading/>
    )
}

export default Cuenta