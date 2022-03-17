<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");

        if(isset($_GET['id']))
        {
            $id = $_GET['id'];
            $sql="SELECT cobertura.cobertura FROM categoria
            INNER JOIN clasificacion ON categoria.id_clasificacion = clasificacion.id
            INNER JOIN color_cobertura ON categoria.id_color = color_cobertura.id_color
            INNER JOIN cobertura ON cobertura.id = color_cobertura.id_cobertura
            WHERE categoria.id = '$id'";
            $resultado=mysqli_query($conexion,$sql);
            $json = array();
            while($filas = mysqli_fetch_array($resultado))
            {
                $json[] = array(
                    'cobertura' => $filas['cobertura']
                );
            }
            $jsonstring = json_encode($json);
            echo $jsonstring;            
        }
    }
?>