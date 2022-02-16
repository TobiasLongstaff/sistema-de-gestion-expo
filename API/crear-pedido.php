<?php
    require 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        header("HTTP/1.1 200 OK");
        $datos = json_decode(file_get_contents('php://input'));
        if($datos != null)
        {
            $id_usuario = $datos->id_usuario;
            $id_cliente = $datos->id_cliente;
            $id_categoria = $datos->id_categoria;
            $descripcion = $datos->descripcion;
            $cantidad = $datos->cantidad;
            $valor = $datos->valor;

            $sql = "INSERT INTO pedidos (id_cliente, id_usuario, id_categoria, descripcion, cantidad, valor) 
            VALUES ('$id_cliente', '$id_usuario', '$id_categoria', '$descripcion', '$cantidad', '$valor')";
            $resultado = mysqli_query($conexion, $sql);
            if(!$resultado)
            {
                $json[] = array(
                    'error' => '1',
                    'mensaje' => 'Error al cargar los datos, consultar con soporte'
                );
            }
            else
            { 
                $json[] = array(
                    'error' => '0',
                    'mensaje' => 'Cliente Creado'
                );
            }
            $jsonstring = json_encode($json);
            echo $jsonstring;
        }
    }
    
?>