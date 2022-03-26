<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");

        if(isset($_GET['id']))
        {
            $id = $_GET['id'];
            $sql="SELECT id, nombre_apellido, mail, nivel FROM usuarios WHERE id = '$id'";
        }
        else
        {
            $sql="SELECT id, nombre_apellido, mail, nivel FROM usuarios";
        }
        $resultado=mysqli_query($conexion,$sql);
        $json = array();
        while($filas = mysqli_fetch_array($resultado))
        {
            $json[] = array(
                'id' => $filas['id'],
                'nombre' => $filas['nombre_apellido'],
                'mail' => $filas['mail'],
                'permisos' => $filas['nivel']
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
?>