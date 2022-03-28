import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navigation from '../components/Navegacion/Navegacion'
import '../styles/menu.css'
import Cookies from 'universal-cookie'
import Loading from '../components/Loading/Loading'
import { motion } from 'framer-motion'

const cookies = new Cookies

const Menu = () =>
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
    })

    if(idsession)
        return(
            <motion.article>
                <Navigation texto="Menu"/>
                <div className="container-web-menu">
                    <main className="container-menu">
                        <Link to="/pedidos">
                            <motion.button 
                                whileHover={{ backgroundColor: '#88a4ff' }}
                                whileTap={{ scale: 0.9 }}
                                type="button" className="btn-general-menu">
                                <h3>
                                    Pedidos
                                </h3>
                            </motion.button>
                        </Link>
                        <Link to="/reclamos">
                            <motion.button 
                                whileHover={{ backgroundColor: '#88a4ff' }}
                                whileTap={{ scale: 0.9 }}
                                type="button" className="btn-general-menu">
                                <h3>
                                    Reclamos
                                </h3>
                            </motion.button >
                        </Link>
                        <Link to="/seguimiento-de-pedidos">
                            <motion.button 
                                whileHover={{ backgroundColor: '#88a4ff' }}
                                whileTap={{ scale: 0.9 }}
                                type="button" className="btn-general-menu">
                                <h3>
                                    Seguimiento de pedidos
                                </h3>
                            </motion.button>
                        </Link>
                        <Link to="/seguimiento-de-reclamos">
                            <motion.button 
                                whileHover={{ backgroundColor: '#88a4ff' }}
                                whileTap={{ scale: 0.9 }} 
                                type="button" className="btn-general-menu">
                                <h3>
                                    Seguimiento de reclamos
                                </h3>
                            </motion.button>
                        </Link>
                        {(() =>{ 
                            if(tipo == 'admin') 
                            {
                                return(
                                    <>
                                        <Link to="/clientes">
                                            <motion.button 
                                                whileHover={{ backgroundColor: '#88a4ff' }}
                                                whileTap={{ scale: 0.9 }} 
                                                type="button" className="btn-general-menu">
                                                <h3>
                                                    ABM Clientes
                                                </h3>
                                            </motion.button>
                                        </Link>
                                        {/* <Link to="/colores">
                                            <button type="button" className="btn-general-menu">
                                                <h3>
                                                    ABM Colores
                                                </h3>
                                            </button>
                                        </Link> */}
                                        <Link to="/localidades">
                                            <motion.button 
                                                whileHover={{ backgroundColor: '#88a4ff' }}
                                                whileTap={{ scale: 0.9 }} 
                                                type="button" className="btn-general-menu">
                                                <h3>
                                                    ABM Localidades
                                                </h3>
                                            </motion.button>
                                        </Link>
                                        <Link to="/usuarios">
                                            <motion.button 
                                                whileHover={{ backgroundColor: '#88a4ff' }}
                                                whileTap={{ scale: 0.9 }}
                                                type="button" className="btn-general-menu">
                                                <h3>
                                                    Usuarios
                                                </h3>
                                            </motion.button>
                                        </Link>
                                    </>
                                )
                            }
                        })()}
                    </main>
                </div>
            </motion.article>
        )
    return(
        <Loading/>
    )

}

export default Menu