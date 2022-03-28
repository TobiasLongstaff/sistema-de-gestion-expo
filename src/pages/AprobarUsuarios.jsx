import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Cookies from 'universal-cookie'
import Navegacion from '../components/Navegacion/Navegacion'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import url from '../services/Settings'

const cookies = new Cookies()

const AprobarUsuarios = () =>
{
    let { mail, hash, nombre } = useParams()
    const idsession = cookies.get('IdSession')
    let navigate = useNavigate()
    const permisos = React.createRef()

    const [form, setForm] = useState({ mail: mail, hash: hash, permisos: ''})

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

    const handelSubmit = e =>
    {
        e.preventDefault()
        Swal.fire(
        {
            title: '¿Esta seguro?',
            text: "¿Estás seguro de aprobar este usuario?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00C3E3',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aprobar'
        }).then((result) => 
        {
            if(result.isConfirmed) 
            {
                AprobarUsuario()
            }
        })
    }

    const AprobarUsuario = async () =>
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
            Swal.fire('Aprobando Cuenta')
            Swal.showLoading()
            let res = await fetch(url+'aprobar-usuario.php', config)
            let infoPost = await res.json()
            console.log(infoPost[0])
            if(infoPost[0].error == '0')
            {
                Swal.fire(
                    'Usuario aprobado correctamente',
                    'El usuario recibira un mail avisando que su cuenta esta lista para usarse',
                    'success'
                )
            }
            else
            {
                Swal.fire(
                    'Error',
                    'Error al aprobar el usuario intentar mas tarde',
                    'error'
                )
            }
        }
        catch(error)
        {
            console.error(error)
            Swal.fire(
                'Error',
                'Error al aprobar el usuario intentar mas tarde',
                'error'
            )
        }
    }

    const handelChange = e =>
    {
        setForm(
        {
            ...form,
            permisos: permisos.current.value
        })
    }

    return(
        <article>
            <Navegacion texto="Aprobar Usuario" volver="/menu" />
            <main className="container-aprobar-usuario">
                <form className="form-reclamos" onSubmit={handelSubmit}>
                    <label>Nombre y Apellido: {nombre}</label>
                    <label>E-Mail: {mail}</label>
                    <label>Hash: {hash}</label>
                    <label>Seleccionar privilegios del usuario:</label>
                    <select ref={permisos} className="textbox-genegal" name="permisos" onChange={handelChange} required>
                        <option value="estandar">Estandar</option>
                        <option value="admin">Administrador</option>
                    </select>
                    <button type="submit" className="btn-primario btn-general">Aprobar</button>
                </form>
            </main>
        </article>
    )
}

export default AprobarUsuarios