<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");

        if(isset($_GET['id']))
        {
            $id = $_GET['id'];
            $sql="SELECT calibres.peso FROM categoria
            INNER JOIN clasificacion ON categoria.id_clasificacion = clasificacion.id
            INNER JOIN color_calibres ON categoria.id_color = color_calibres.id
            INNER JOIN calibres ON color_calibres.id_calibres = calibres.id
            WHERE categoria.id = '$id'";
            $resultado=mysqli_query($conexion,$sql);
            $json = array();
            while($filas = mysqli_fetch_array($resultado))
            {
                $json[] = array(
                    'peso' => $filas['peso']
                );
            }
            $jsonstring = json_encode($json);
            echo $jsonstring;            
        }
    }
?>