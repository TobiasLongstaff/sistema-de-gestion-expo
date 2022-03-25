<?php

    include 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");
        $con = '';

        if(!empty($_GET['id']))
        {
            $id = $_GET['id'];
            $con = "WHERE reclamos.id = '$id'";
        }

        $sql_select = "SELECT reclamos.id, reclamos.fecha_reclamo, 
        reclamos.fecha_recepcion, reclamos.observacion, 
        reclamos.categoria, reclamos.motivo, clientes.nombre_apellido 
        AS nombre_cliente, usuarios.nombre_apellido AS nombre_usuario FROM reclamos
        INNER JOIN clientes ON clientes.id = reclamos.id_cliente
        INNER JOIN usuarios ON usuarios.id = reclamos.id_usuario ".$con;
        $resultado_select_estado=mysqli_query($conexion,$sql_select);
        $json_reclamos = array();
        $json = array();
        while($filas = mysqli_fetch_array($resultado_select_estado))
        {
            $id_reclamo = $filas['id'];

            $sql_select_imagenes_reclamo = "SELECT imagenes_reclamo.id, imagenes_reclamo.url, imagenes_reclamo.nombre FROM imagenes_reclamo
            INNER JOIN reclamos ON imagenes_reclamo.id_reclamo = reclamos.id 
            WHERE reclamos.id = '$id_reclamo'";
            $resultado_select_imagenes_reclamo=mysqli_query($conexion,$sql_select_imagenes_reclamo);
            $json_imagenes_reclamo = array();
            while($filas_imagenes_reclamo = mysqli_fetch_array($resultado_select_imagenes_reclamo))
            {
                $json_imagenes_reclamo[] = array(
                    'id' => $filas_imagenes_reclamo['id'],
                    'url' => $filas_imagenes_reclamo['url'],
                    'nombre' => $filas_imagenes_reclamo['nombre'],

                );
            }
            $json[] = array(
                $json_reclamos = array(
                    'id' => $id_reclamo,
                    'cliente' => $filas['nombre_cliente'],
                    'fecha_recepcion' => $filas['fecha_recepcion'],
                    'fecha_reclamo' => $filas['fecha_reclamo'],
                    'observacion' => $filas['observacion'],
                    'nombre_usuario' => $filas['nombre_usuario'],
                    'categoria' => $filas['categoria'],
                    'motivo' => $filas['motivo'],
                    'imagenes' => $json_imagenes_reclamo
                )
            );
        }   
    }

    $jsonstring = json_encode($json);
    echo $jsonstring;
    mysqli_close($conexion);
?>