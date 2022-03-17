<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");

        if(isset($_GET['id']))
        {
            $id = $_GET['id'];
            $sql="SELECT color_grasa.color FROM categoria
            INNER JOIN clasificacion ON categoria.id_clasificacion = clasificacion.id
            INNER JOIN color_color_grasa ON categoria.id_color = color_color_grasa.id_color
            INNER JOIN color_grasa ON color_grasa.id = color_color_grasa.id_color_grasa
            WHERE categoria.id = '$id'";
            $resultado=mysqli_query($conexion,$sql);
            $json = array();
            while($filas = mysqli_fetch_array($resultado))
            {
                $json[] = array(
                    'color' => $filas['color']
                );
            }
            $jsonstring = json_encode($json);
            echo $jsonstring;            
        }
    }
?>