<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");

        if(isset($_GET['id']))
        {
            $id = $_GET['id'];
            $sql="SELECT clasificacion.nombre AS clasificacion, color.* FROM categoria
            INNER JOIN clasificacion ON categoria.id_clasificacion = clasificacion.id  
            INNER JOIN color ON categoria.id_color = color.id 
            WHERE categoria.id = '$id'";
            $resultado=mysqli_query($conexion,$sql);
            $json = array();
            while($filas = mysqli_fetch_array($resultado))
            {
                $json[] = array(
                    'id' => $filas['id'],
                    'color' => $filas['color'],
                    'clasificacion' => $filas['clasificacion'],
                    // 'id_calibre' => $filas['id_calibre'],
                    'pje_max' => $filas['pje_max'],
                    'pje_min' => $filas['pje_min'],
                    // 'id_raza' => $filas['id_raza'],
                    // 'id_tipo_animal' => $filas['id_tipo_animal'],
                    // 'id_denticion' => $filas['id_denticion'],
                    // 'id_grasa' => $filas['id_grasa'],
                    // 'id_cobertura' => $filas['id_cobertura'],
                    // 'id_osificacion' => $filas['id_osificacion'],
                    // 'id_evaluacion_corte' => $filas['id_evaluacion_corte'],
                    // 'id_color_grasa' => $filas['id_color_grasa'],
                    // 'id_color_carne' => $filas['id_color_carne'],
                    // 'id_marmoreado' => $filas['id_marmoreado'],
                    'ph' => $filas['ph'],
                    'gi' => $filas['gi']
                );
            }
            $jsonstring = json_encode($json);
            echo $jsonstring;            
        }
    }
?>