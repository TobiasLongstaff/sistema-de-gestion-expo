<?php
    require 'conexion.php';

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
                if($datos->imagenes == [])
                {
                    $json[] = array(
                        'error' => '0',
                        'mensaje' => 'Reclamo Creado',
                        'img' => $datos->imagenes
                    );
                }
                else
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
                                $json[] = array(
                                    'error' => '0',
                                    'mensaje' => 'Reclamo Creado con imagen',
                                    'img' => $imagenes
                                );
                            }
                        }
                    }
                }
            }
        }
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;
    
?>