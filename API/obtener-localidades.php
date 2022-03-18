<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");

        if(isset($_GET['id']))
        {
            $id_localidad = $_GET['id'];
            $sql="SELECT id, nombre FROM localidades WHERE id = $id_localidad";
        }
        else
        {
            $sql="SELECT id, nombre FROM localidades";                
        }
        $resultado=mysqli_query($conexion,$sql);
        $json = array();
        while($filas = mysqli_fetch_array($resultado))
        {
            $json[] = array(
                'id' => $filas['id'],
                'nombre' => $filas['nombre'],
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
?>