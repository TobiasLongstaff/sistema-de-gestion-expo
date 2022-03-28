<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");

        $sql="SELECT * FROM mail";
        $resultado=mysqli_query($conexion,$sql);
        $json = array();
        if($filas = mysqli_fetch_array($resultado))
        {
            $json[] = array(
                'mail' => $filas['correo']
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;            
    }
?>