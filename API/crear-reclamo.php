<?php
    require 'conexion.php';

    /**
    * @version 1.0
    */

    require 'class.phpmailer.php';
    require 'class.smtp.php';

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        header("HTTP/1.1 200 OK");
        $datos = json_decode(file_get_contents('php://input'));
        if($datos != null)
        {
            $id_usuario = $datos->id_usuario;
            $id_cliente = $datos->id_cliente;
            $fecha_reclamo = $datos->fechaReclamo;
            $fecha_recepcion = $datos->fechaRecepcion;
            $observacion = $datos->observacion;
            $categoria = $datos->categoria;
            $motivo = $datos->motivo;

            $nombre = 'rqvtaexpo.com';

            // Datos de la cuenta de correo utilizada para enviar vía SMTP
            $smtpHost = "c2530205.ferozo.com";  // Dominio alternativo brindado en el email de alta 
            $smtpUsuario = "no-reply@rqvtaexpo.com";  // Mi cuenta de correo
            $smtpClave = "0@Uu6*b4uY";  // Mi contraseña

            $sql = "INSERT INTO reclamos (id_cliente, id_usuario, fecha_reclamo, fecha_recepcion, 
            observacion, categoria, motivo) 
            VALUES ('$id_cliente', '$id_usuario', '$fecha_reclamo', '$fecha_recepcion', '$observacion', 
            '$categoria', '$motivo')";
            $resultado = mysqli_query($conexion, $sql);
            if(!$resultado)
            {
                $json[] = array(
                    'error' => '1',
                    'mensaje' => 'Error al cargar los datos, consultar con soporte',
                );
            }
            else
            {
                if($datos->imagenes != [])
                {
                    $imagenes = json_decode(json_encode($datos->imagenes), true);

                    $sql="SELECT id FROM reclamos ORDER BY id DESC LIMIT 1";
                    $resultado=mysqli_query($conexion,$sql);
                    if($filas = mysqli_fetch_array($resultado))
                    {
                        $id_reclamo = $filas['id'];
                        foreach($imagenes as $filasImagen)
                        {
                            $url = $filasImagen['url'];
                            $nombre = $filasImagen['nombre'];
    
                            $sql = "INSERT INTO imagenes_reclamo (url, nombre, id_reclamo) 
                            VALUES ( '$url', '$nombre', '$id_reclamo' )";
                            $resultado = mysqli_query($conexion, $sql);
                            if(!$resultado)
                            {
                                $json[] = array(
                                    'error' => '1',
                                    'mensaje' => 'Error al cargar las imagenes, consultar con soporte',
                                );
                            }
                            else
                            {
                            }
                        }
                    }
                }

                $sql_correo="SELECT correo FROM mail";
                $resultado_correo=mysqli_query($conexion,$sql_correo);
                if($filas_correo = mysqli_fetch_array($resultado_correo))
                {
                    $mail_cliente = $filas_correo['correo'];

                    $sql_cliente="SELECT nombre_apellido FROM clientes WHERE id = '$id_cliente'";
                    $resultado_cliente=mysqli_query($conexion,$sql_cliente);
                    if($filas_cliente = mysqli_fetch_array($resultado_cliente))
                    {

                        $cliente = $filas_cliente['nombre_apellido'];
                    
                        $mail = new PHPMailer();
                        $mail->IsSMTP();
                        $mail->SMTPAuth = true;
                        $mail->Port = 465; 
                        $mail->SMTPSecure = 'ssl';
                        $mail->IsHTML(true); 
                        // $mail->SMTPDebug  = 2;
                    
                    
                        // VALORES A MODIFICAR //
                        $mail->Host = $smtpHost; 
                        $mail->Username = $smtpUsuario; 
                        $mail->Password = $smtpClave;
                    
                        $mail->From = $smtpUsuario;
                        $mail->FromName = $nombre;
                        $mail->AddAddress($mail_cliente);
                    
                        $mail->Subject = "Tu cuenta de '$nombre' se encuentra a espera de aprobación"; // Este es el titulo del email.
                        $mail->Body = '
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    
                            <style type="text/css">
                                body
                                {
                                    margin: 0;
                                    padding: 0;
                                    background-color: #F3F5F9;
                                }
                    
                                table
                                {
                                    border-spacing: 0;
                                }
                    
                                td
                                {
                                    padding: 0;
                                }
                    
                                .contenido
                                {
                                    width: 100%;
                                    padding-bottom: 40px;
                                    display: flex;
                                    justify-content: center;
                                    margin-top: 2%;
                                }
                    
                                a
                                {
                                    color: #F3F5F9;
                                    background-color: #00C3E3;
                                    border-radius: 5px;
                                    padding: 20px;
                                    font-size: 25px;
                                    text-decoration: none;
                                }
                    
                    
                                h1
                                {
                                    color: #00C3E3;
                                }
                    
                                h2
                                {
                                    margin-bottom: 50px;
                                }
                    
                            </style>
                        </head>
                        <body>
                            <div class="contenido">
                                <div>
                                    <div>
                                        <h1>Nuevo Reclamo</h1>
                                        <h2 style="color: #7D7D7D;">El cliente '.$cliente.' ha realizado un nuevo reclamo</h2>                 
                                    </div>
                                    <a style="color: #ffffff;" href="https://'.$nombre.'/">Iniciar sesion</a>                 
                                </div>     
                            </div>
                        </body>';
                        if(!$mail->send())
                        {
                            $json[] = array(
                                'error' => '1',
                                'mensaje' => 'Error mail 1'
                            );
                        }
                        else
                        {
                            $json[] = array(
                                'error' => '0',
                                'mensaje' => 'Reclamo Creado',
                            );
                        }
                    }
                }
            }
        }
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;
    
?>