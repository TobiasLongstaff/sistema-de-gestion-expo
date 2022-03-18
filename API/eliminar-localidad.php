<?php
    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'DELETE')
    {
        header("HTTP/1.1 200 OK");
        if(isset($_GET['id']))
        {
            $id = $_GET['id'];
    
            $sql="DELETE FROM localidades WHERE id = '$id'";
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
                    'mensaje' => 'Localidad Eliminarda'
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