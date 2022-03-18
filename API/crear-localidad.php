<?php
    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        header("HTTP/1.1 200 OK");
        $datos = json_decode(file_get_contents('php://input'));
        if($datos != null)
        {
            $nombre = $datos->nombre;

            $sql_veri_cli = "SELECT id FROM localidades WHERE nombre = '$nombre'";
            $resultado_veri_cli = mysqli_query($conexion, $sql_veri_cli);
            if(mysqli_num_rows($resultado_veri_cli) <= 0)
            {
                $sql = "INSERT INTO localidades (nombre) VALUES ('$nombre')";
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
                        'mensaje' => 'Localidad Creada'
                    );
                }
            }
            else
            {
                $json[] = array(
                    'error' => '1',
                    'mensaje' => 'Esta localidad ya se encuentra creada'
                );
            }
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
?>