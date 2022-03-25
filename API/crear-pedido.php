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
            $id_localidad = $datos->id_localidad;

            $fecha_actual = date('Y-m-d H:i');
            $fecha_actual = str_replace(' ','T', $fecha_actual);

            $sql = "INSERT INTO pedidos (id_cliente, id_usuario, id_categoria, descripcion, id_localidad, cantidad, valor, fecha_del_pedido) 
            VALUES ('$id_cliente', '$id_usuario', '$id_categoria', '$descripcion', '$id_localidad', '$cantidad', '$valor', '$fecha_actual')";
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