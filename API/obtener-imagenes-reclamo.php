<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");

        if(isset($_GET['id_reclamo']))
        {
            $id_reclamo = $_GET['id_reclamo'];

            $sql_select_imagenes_reclamo = "SELECT imagenes_reclamo.id, imagenes_reclamo.url, imagenes_reclamo.nombre FROM imagenes_reclamo
            INNER JOIN reclamos ON imagenes_reclamo.id_reclamo = reclamos.id 
            WHERE reclamos.id = '$id_reclamo'";
            $resultado_select_imagenes_reclamo=mysqli_query($conexion,$sql_select_imagenes_reclamo);
            $json = array();
            while($filas_imagenes_reclamo = mysqli_fetch_array($resultado_select_imagenes_reclamo))
            {
                $json[] = array(
                    'id' => $filas_imagenes_reclamo['id'],
                    'url' => $filas_imagenes_reclamo['url'],
                    'nombre' => $filas_imagenes_reclamo['nombre'],

                );
            }
            
            $jsonstring = json_encode($json);
            echo $jsonstring;            
        }
    }
?>