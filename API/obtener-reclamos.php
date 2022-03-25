<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");

        if(isset($_GET['id_usuario']))
        {
            $id_usuario = $_GET['id_usuario'];

            $sql_pedido = "SELECT reclamos.id, reclamos.fecha_reclamo, 
            reclamos.fecha_recepcion, reclamos.observacion, 
            reclamos.categoria, reclamos.motivo, clientes.nombre_apellido 
            AS nombre_cliente FROM reclamos
            INNER JOIN clientes ON clientes.id = reclamos.id_cliente
            INNER JOIN usuarios ON usuarios.id = reclamos.id_usuario
            WHERE reclamos.id_usuario = '$id_usuario'";
            $resultado_pedido=mysqli_query($conexion,$sql_pedido);
            $json = array();
            while($filas = mysqli_fetch_array($resultado_pedido))
            {
                
                $json[] = array(
                    'id' => $filas['id'],
                    'cliente' => $filas['nombre_cliente'],
                    'fecha_recepcion' => $filas['fecha_recepcion'],
                    'fecha_reclamo' => $filas['fecha_reclamo'],
                    'observacion' => $filas['observacion'],
                    'categoria' => $filas['categoria'],
                    'motivo' => $filas['motivo'],
                );
            }
            $jsonstring = json_encode($json);
            echo $jsonstring;
        }
    }

?>