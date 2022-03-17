<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");

        if(isset($_GET['id']))
        {
            $id = $_GET['id'];
            $sql="SELECT marmoreado.marmoreado FROM categoria
            INNER JOIN clasificacion ON categoria.id_clasificacion = clasificacion.id
            INNER JOIN color_marmoreado ON categoria.id_color = color_marmoreado.id_color
            INNER JOIN marmoreado ON marmoreado.id = color_marmoreado.id_marmoreado
            WHERE categoria.id = '$id'";
            $resultado=mysqli_query($conexion,$sql);
            $json = array();
            while($filas = mysqli_fetch_array($resultado))
            {
                $json[] = array(
                    'marmoreado' => $filas['marmoreado']
                );
            }
            $jsonstring = json_encode($json);
            echo $jsonstring;            
        }
    }
?>