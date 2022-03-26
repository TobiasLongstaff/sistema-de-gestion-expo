<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        header("HTTP/1.1 200 OK");
        $datos = json_decode(file_get_contents('php://input'));
        if($datos != null)
        {
            $id_usuario = $datos->id_usuario;
            $password = sha1($datos->password);
            $password_con = sha1($datos->password_con);

            if($password == $password_con)
            {
                $sql = "UPDATE usuarios SET password = '$password' WHERE id = '$id_usuario'";
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
                        'mensaje' => 'Usuario actualizado'
                    );
                }
            }
            else
            {
                $json[] = array(
                    'error' => '1',
                    'mensaje' => 'Las contraseñas no son distintas',
                );   
            }
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }

?>