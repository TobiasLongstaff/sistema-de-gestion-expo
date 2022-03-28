<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        header("HTTP/1.1 200 OK");
        $datos = json_decode(file_get_contents('php://input'));
        if($datos != null)
        {
            $mail = $datos->mail;

            $sql = "UPDATE mail SET correo = '$mail'";
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
                $json[] = array(
                    'error' => '0',
                    'mensaje' => 'Mail actualizado'
                );
            }
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }

?>