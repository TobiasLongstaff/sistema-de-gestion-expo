<?php
    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'DELETE')
    {
        header("HTTP/1.1 200 OK");
        if(isset($_GET['id_localidad']))
        {
            $id_localidad = $_GET['id_localidad'];
    
            $sql="DELETE FROM clientes_localidad WHERE id = '$id_localidad'";
            $resultado = mysqli_query($conexion, $sql);
            if(!$resultado)
            {
                $json[] = array(
                    'error' => '1',
                    'mensaje' => 'Error volver a intentar mas tarde'
                );
            }
            else
            {
                $json[] = array(
                    'error' => '0',
                    'mensaje' => 'Localidad Eliminada'
                );
            }
        }
        else
        {
            $json[] = array(
                'error' => '1',
                'mensaje' => 'Faltan datos para eliminar esta localidad'
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }

?>