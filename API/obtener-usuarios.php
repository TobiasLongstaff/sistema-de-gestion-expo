<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");

        $sql="SELECT id, nombre_apellido FROM usuarios";
        $resultado=mysqli_query($conexion,$sql);
        $json = array();
        while($filas = mysqli_fetch_array($resultado))
        {
            $json[] = array(
                'id' => $filas['id'],
                'nombre' => $filas['nombre_apellido'],
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
?>