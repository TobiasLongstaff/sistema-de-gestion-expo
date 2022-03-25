<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");
        if(isset($_GET['id']))
        {
            $id_cliente = $_GET['id'];
            $sql="SELECT clientes.nombre_apellido AS nombre_cliente, clientes.id, usuarios.id
            AS nombre_usuario FROM clientes INNER JOIN usuarios ON clientes.id_usuario = usuarios.id WHERE clientes.id = $id_cliente";
        }
        else
        {
            if(isset($_GET['nombre']) && isset($_GET['id_usuario']))
            {
                $id_usuario = $_GET['id_usuario'];
                $nombre_apellido = $_GET['nombre'];

                $sql="SELECT id, nombre_apellido AS nombre_cliente, id_usuario AS 
                nombre_usuario from clientes WHERE id_usuario = '$id_usuario' AND 
                nombre_apellido LIKE '%".$nombre_apellido."%'"; 
            }
            else
            {
                $sql="SELECT clientes.nombre_apellido AS nombre_cliente, clientes.id, usuarios.id AS id_usuario, 
                usuarios.nombre_apellido 
                AS nombre_usuario FROM clientes INNER JOIN usuarios ON clientes.id_usuario = usuarios.id";                
            }

        }
        $resultado=mysqli_query($conexion,$sql);
        $json = array();
        while($filas = mysqli_fetch_array($resultado))
        {
            $json[] = array(
                'id' => $filas['id'],
                'nombre_apellido' => $filas['nombre_cliente'],
                'usuario' => $filas['nombre_usuario']
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
?>