<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");
        if(isset($_GET['nombre']))
        {
            $nombre = $_GET['nombre'];
            $sql = "SELECT * FROM $nombre";
            $resultado=mysqli_query($conexion,$sql);
            $json = array();
            while($filas = mysqli_fetch_array($resultado))
            {
                $nombre = $filas['peso'];
                $json[] = array(
                    'id' => $filas['id'],
                    'nombre' => $nombre,
                    'tabla' => $nombre,
                );
            }
            $jsonstring = json_encode($json);
            echo $jsonstring;
        }
    }
?>