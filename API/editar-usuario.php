<?php
    require 'conexion.php';

    // crear cuenta
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        header("HTTP/1.1 200 OK");
        $datos = json_decode(file_get_contents('php://input'));
        if($datos != null)
        {
            $nombre = $datos->nombre;
            $id = $datos->id_usuario;
            $mail = $datos->mail;
            $permisos = $datos->permisos;

            $sql_veri_cli = "SELECT id FROM usuarios WHERE nombre_apellido = '$nombre' AND id != '$id'";
            $resultado_veri_cli = mysqli_query($conexion, $sql_veri_cli);
            if(mysqli_num_rows($resultado_veri_cli) <= 0)
            {
                $sql = "UPDATE usuarios SET nombre_apellido = '$nombre', mail = '$mail', nivel = '$permisos' WHERE id = '$id'";
                $resultado = mysqli_query($conexion, $sql);
                if(!$resultado)
                {
                    $json[] = array(
                        'error' => '1',
                        'mensaje' => 'Error al cargar los datos, consultar con soporte',
                        'sql' => $sql
                    );
                }
                else
                { 
                    $json[] = array(
                        'error' => '0',
                        'mensaje' => 'Usuario Editado'
                    );
                }
            }
            else
            {
                $json[] = array(
                    'error' => '1',
                    'mensaje' => 'Este usuario ya fue creado'
                );
            }
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
?>