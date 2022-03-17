<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");

        if(isset($_GET['id']))
        {
            $id = $_GET['id'];
            $sql="SELECT evaluacion_corte.evaluacion FROM categoria
            INNER JOIN clasificacion ON categoria.id_clasificacion = clasificacion.id
            INNER JOIN color_evaluacion_corte ON categoria.id_color = color_evaluacion_corte.id_color
            INNER JOIN evaluacion_corte ON evaluacion_corte.id = color_evaluacion_corte.id_evaluacion_corte
            WHERE categoria.id = '$id'";
            $resultado=mysqli_query($conexion,$sql);
            $json = array();
            while($filas = mysqli_fetch_array($resultado))
            {
                $json[] = array(
                    'evaluacion' => $filas['evaluacion']
                );
            }
            $jsonstring = json_encode($json);
            echo $jsonstring;            
        }
    }
?>