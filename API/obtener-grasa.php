<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");

        if(isset($_GET['id']))
        {
            $id = $_GET['id'];
            $sql="SELECT grasa.numero FROM categoria
            INNER JOIN clasificacion ON categoria.id_clasificacion = clasificacion.id
            INNER JOIN color_sub_grasa ON categoria.id_color = color_sub_grasa.id_color
            INNER JOIN grasa ON grasa.id = color_sub_grasa.id_grasa
            WHERE categoria.id = '$id'";
            $resultado=mysqli_query($conexion,$sql);
            $json = array();
            while($filas = mysqli_fetch_array($resultado))
            {
                $json[] = array(
                    'numero' => $filas['numero']
                );
            }
            $jsonstring = json_encode($json);
            echo $jsonstring;            
        }
    }
?>