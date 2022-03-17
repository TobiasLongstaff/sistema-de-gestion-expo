<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");

        if(isset($_GET['id']))
        {
            $id = $_GET['id'];
            $sql="SELECT denticion.denticion FROM categoria
            INNER JOIN clasificacion ON categoria.id_clasificacion = clasificacion.id
            INNER JOIN color_denticion ON categoria.id_color = color_denticion.id_color
            INNER JOIN denticion ON denticion.id = color_denticion.id_denticion
            WHERE categoria.id = '$id'";
            $resultado=mysqli_query($conexion,$sql);
            $json = array();
            while($filas = mysqli_fetch_array($resultado))
            {
                $json[] = array(
                    'denticion' => $filas['denticion']
                );
            }
            $jsonstring = json_encode($json);
            echo $jsonstring;            
        }
    }
?>