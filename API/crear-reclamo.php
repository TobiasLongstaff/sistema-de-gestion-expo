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
                    'mensaje' => 'Error al cargar los datos, consultar con soporte'
                );
            }
            else
            { 
                $json[] = array(
                    'error' => '0',
                    'mensaje' => 'Reclamo Creado'
                );
            }
            $jsonstring = json_encode($json);
            echo $jsonstring;
        }
    }
    
?>