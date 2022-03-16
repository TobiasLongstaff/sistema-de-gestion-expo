<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");

        if(isset($_GET['id']))
        {
            $id = $_GET['id'];
            $sql="SELECT razas.nombre FROM categoria
            INNER JOIN clasificacion ON categoria.id_clasificacion = clasificacion.id
            INNER JOIN color_raza ON categoria.id_color = color_raza.id
            INNER JOIN razas ON color_raza.id_raza = razas.nombre
            WHERE categoria.id = '$id'";
            $resultado=mysqli_query($conexion,$sql);
            $json = array();
            while($filas = mysqli_fetch_array($resultado))
            {
                $json[] = array(
                    'nombre' => $filas['nombre']
                );
            }
            $jsonstring = json_encode($json);
            echo $jsonstring;            
        }
    }
?>