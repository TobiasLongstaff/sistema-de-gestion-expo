<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");

        if(isset($_GET['nombre']))
        {
            $nombre = $_GET['nombre'];
            $sql="SELECT categoria.id, clasificacion.nombre, color.color FROM categoria 
            INNER JOIN clasificacion ON categoria.id_clasificacion = clasificacion.id 
            INNER JOIN color ON categoria.id_color = color.id WHERE clasificacion.nombre LIKE '%".$nombre."%'";
            
            $resultado=mysqli_query($conexion,$sql);
            $json = array();
            while($filas = mysqli_fetch_array($resultado))
            {
                $json[] = array(
                    'id' => $filas['id'],
                    'nombre' => $filas['nombre'],
                    'color' => $filas['color']
                );
            }
            $jsonstring = json_encode($json);
            echo $jsonstring;            
        }
    }
?>