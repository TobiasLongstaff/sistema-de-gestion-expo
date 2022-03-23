<?php

    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");

        if(isset($_GET['id_usuario']))
        {
            $id_usuario = $_GET['id_usuario'];

            $sql_pedido = "SELECT pedidos.id, pedidos.descripcion, pedidos.cantidad, pedidos.valor, clientes.nombre_apellido, clasificacion.nombre, color.color, localidades.nombre AS localidad  FROM pedidos
            INNER JOIN clientes ON pedidos.id_cliente = clientes.id
            INNER JOIN categoria ON pedidos.id_categoria = categoria.id
            INNER JOIN clasificacion ON categoria.id_clasificacion = clasificacion.id
            INNER JOIN color ON categoria.id_color = color.id
            INNER JOIN localidades ON pedidos.id_localidad = localidades.id
            WHERE pedidos.id_usuario = '$id_usuario'";
            $resultado_pedido=mysqli_query($conexion,$sql_pedido);
            $json = array();
            while($filas = mysqli_fetch_array($resultado_pedido))
            {
                
                $json[] = array(
                    'id' => $filas['id'],
                    'cliente' => $filas['nombre_apellido'],
                    'categoria' => $filas['nombre'].' '.$filas['color'],
                    'descripcion' => $filas['descripcion'],
                    'localidad' => $filas['localidad'],
                    'cantidad' => $filas['cantidad'],
                    'valor' => $filas['valor']
                );
            }
            $jsonstring = json_encode($json);
            echo $jsonstring;
        }
    }

?>