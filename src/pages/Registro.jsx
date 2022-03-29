import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import url from '../services/Settings'
import '../styles/registro.css'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import { motion } from 'framer-motion'


const Registro = () =>
{
    const [ MensajeError, setError ] = useState(null) 
    const [ form, setForm ] = useState({nombre_apellido: '', mail: '', password: '', password_con: ''}) 
    const initialState = {nombre_apellido: '', mail: '', password: '', password_con: ''}

    const handelSubmit = async e =>
    {
        e.preventDefault();
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
            Swal.fire('Creando Cuenta')
            Swal.showLoading()
            let res = await fetch(url+'crear-cuenta.php', config)
            let infoPost = await res.json()
            console.log(infoPost[0])
            if(infoPost[0].mensaje == 'Cuenta creada')
            {
                Swal.fire(
                    'Cuenta creada exitosamente',
                    'Te llegara un mail avisando cuando tu cuenta esta lista para usarse ',
                    'success'
                )
                setForm({ ...initialState });
                setError('')
            }
            else
            {
                setError(infoPost[0].mensaje)
            }
        }
        catch(error)
        {
            console.error(error)
            setError('Error al registrarte intentar mas tarde')
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

    const variants = 
    {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    }

    return(
        <article className="back-registro">
            <motion.main
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5 }}
                variants={variants}  
                className="container-registro">
                <header className="header-registro">
                    <h1>Registro</h1>
                </header>
                <form onSubmit={handelSubmit} className="menu-registro">
                    <div className="container-textbox">
                        <input type="text" name="nombre_apellido" onChange={handelChange} className="textbox-genegal" value={form.nombre_apellido} required/>                    
                        <label>Nombre y Apellido</label>
                    </div>
                    <div className="container-textbox">
                        <input type="mail" name="mail" onChange={handelChange} className="textbox-genegal" value={form.mail} required/>                
                        <label>E-mail</label>
                    </div>
                    <div className="container-textbox">
                        <input type="password" name="password" onChange={handelChange} className="textbox-genegal" value={form.password} required/>                
                        <label>Contraseña</label>
                    </div>
                    <div className="container-textbox">
                        <input type="password" name="password_con" onChange={handelChange} className="textbox-genegal" value={form.password_con} required/>
                        <label>Confirmar Contraseña</label>
                    </div>
                    <label className="text-error">{MensajeError}</label>
                    <div className="container-btn">
                        <motion.button
                            whileHover={{ backgroundColor: '#88a4ff' }}
                            whileTap={{ scale: 0.9 }}   
                            type="submit" className="btn-primario btn-general">
                                Crear cuenta
                        </motion.button>
                        <Link to="/">
                            <button type="button" className="btn-general">Volver</button>
                        </Link>              
                    </div>
                </form>
            </motion.main>                
    </article> 
    )
}

export default Registro