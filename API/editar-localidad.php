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
            $id = $datos->id_localidad;
            $sql_veri_cli = "SELECT id FROM localidades WHERE nombre = '$nombre' AND id != '$id'";
            $resultado_veri_cli = mysqli_query($conexion, $sql_veri_cli);
            if(mysqli_num_rows($resultado_veri_cli) <= 0)
            {
                $sql = "UPDATE localidades SET nombre = '$nombre' WHERE id = '$id'";
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
                        'mensaje' => 'Localidad Editada'
                    );
                }
            }
            else
            {
                $json[] = array(
                    'error' => '1',
                    'mensaje' => 'Esta localidad ya fue creada'
                );
            }
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
?>