<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");

        if(isset($_GET['id']))
        {
            $id = $_GET['id'];
            $sql="SELECT tipo_animal.tipo FROM categoria
            INNER JOIN clasificacion ON categoria.id_clasificacion = clasificacion.id
            INNER JOIN color_tipo_animal ON categoria.id_color = color_tipo_animal.id_color
            INNER JOIN tipo_animal ON tipo_animal.id = color_tipo_animal.id_tipo_animal
            WHERE categoria.id = '$id'";
            $resultado=mysqli_query($conexion,$sql);
            $json = array();
            while($filas = mysqli_fetch_array($resultado))
            {
                $json[] = array(
                    'tipo' => $filas['tipo']
                );
            }
            $jsonstring = json_encode($json);
            echo $jsonstring;            
        }
    }
?>