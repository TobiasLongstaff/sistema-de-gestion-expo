<?php
    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        header("HTTP/1.1 200 OK");
        $datos = json_decode(file_get_contents('php://input'));
        if($datos != null)
        {
            $id_cliente = $datos->id_cliente;
            $id_localidad = $datos->id_localidad;

            $sql_veri_cli = "SELECT id FROM clientes_localidad WHERE id_localidad = '$id_localidad' AND id_cliente = '$id_cliente'";
            $resultado_veri_cli = mysqli_query($conexion, $sql_veri_cli);
            if(mysqli_num_rows($resultado_veri_cli) <= 0)
            {
                $sql = "INSERT INTO clientes_localidad (id_localidad, id_cliente) 
                VALUES ('$id_localidad', '$id_cliente')";
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
                        'mensaje' => 'Localidad Agregada'
                    );
                }
            }
            else
            {
                $json[] = array(
                    'error' => '1',
                    'mensaje' => 'Esta localidad ya se encuentra agregada'
                );
            }
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
?>