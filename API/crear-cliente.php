<?php
    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        header("HTTP/1.1 200 OK");
        $datos = json_decode(file_get_contents('php://input'));
        if($datos != null)
        {
            $nombre_apellido = $datos->nombre_apellido;
            $id_usuario = $datos->id_usuario;

            $sql_veri_cli = "SELECT id FROM clientes WHERE nombre_apellido = '$nombre_apellido'";
            $resultado_veri_cli = mysqli_query($conexion, $sql_veri_cli);
            if(mysqli_num_rows($resultado_veri_cli) <= 0)
            {
                $sql = "INSERT INTO clientes (nombre_apellido, id_usuario) 
                VALUES ('$nombre_apellido', '$id_usuario')";
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
                    $sql="SELECT id FROM clientes ORDER BY id DESC LIMIT 1";
                    $resultado=mysqli_query($conexion,$sql);
                    if($filas = mysqli_fetch_array($resultado))
                    {
                        $id_cliente = $filas['id'];
                        $json[] = array(
                            'error' => '0',
                            'id_cliente' => $id_cliente,
                            'mensaje' => 'Cliente Creado'
                        );
                    }
                }
            }
            else
            {
                $json[] = array(
                    'error' => '1',
                    'mensaje' => 'Este cliente ya se encuentra creado'
                );
            }
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
?>