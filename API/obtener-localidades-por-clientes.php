<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");

        if(isset($_GET['id_cliente']))
        {
            $id_cliente = $_GET['id_cliente'];
            $sql="SELECT localidades.id, localidades.nombre FROM clientes_localidad 
            INNER JOIN localidades ON localidades.id = clientes_localidad.id_localidad
            WHERE clientes_localidad.id_cliente = '$id_cliente'";
            
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
    }
?>