import React, { useEffect, useState } from 'react'
import './navegacion.css'
import LogoSvg from '../../img/frigopico.svg'
import { Link } from 'react-router-dom'
import { UilSignout, UilUserCircle, UilAngleLeft } from '@iconscout/react-unicons'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'

const cookies = new Cookies

const Navigation = ({texto, volver}) =>
{
    const [botonVolver, setVolver] = useState(null)
    let navigate = useNavigate();

    useEffect(() =>
    {
        if(volver != null)
        {
            setVolver(
                <Link to={volver}>
                    <button className="btn-nav-general-volver">
                        <UilAngleLeft size="32"/>
                    </button>
                </Link>
            )
        }
    },[])

    const handelClick = () =>
    {
        Swal.fire(
        {
            title: '¿Cerrar Sesión?',
            text: "¿Estás seguro que queres cerrar sesión?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00C3E3',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Cerrar Sesión'
        }).then((result) => 
        {
            if(result.isConfirmed) 
            {
                cookies.remove('IdSession')
                cookies.remove('nombre')
                cookies.remove('mail')
                cookies.remove('tipo')
                navigate('/')
            }
        })
    }

    return (
        <nav>
            <header className="container-header-nav">
                {botonVolver}
                <h1>{texto}</h1>
            </header>
            <main className="container-controles-nav">
                <img className="img-logo-nav" src={LogoSvg} alt="logo frigopico" />
                <div>
                    <button className="btn-nav-general">
                        <UilUserCircle size="32"/>
                    </button>
                    <button onClick={handelClick} className="btn-nav-general">
                        <UilSignout size="32"/>
                    </button>
                </div>
            </main>
        </nav>
    )
}

export default Navigation