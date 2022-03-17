<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");

        if(isset($_GET['id']))
        {
            $id = $_GET['id'];
            $sql="SELECT osificacion.letra FROM categoria
            INNER JOIN clasificacion ON categoria.id_clasificacion = clasificacion.id
            INNER JOIN color_osificacion ON categoria.id_color = color_osificacion.id_color
            INNER JOIN osificacion ON osificacion.id = color_osificacion.id_osificacion
            WHERE categoria.id = '$id'";
            $resultado=mysqli_query($conexion,$sql);
            $json = array();
            while($filas = mysqli_fetch_array($resultado))
            {
                $json[] = array(
                    'letra' => $filas['letra']
                );
            }
            $jsonstring = json_encode($json);
            echo $jsonstring;            
        }
    }
?>