<?php

    include 'conexion.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        header("HTTP/1.1 200 OK");
        $con = '';

        if(!empty($_GET['id']))
        {
            $id = $_GET['id'];
            $con = "WHERE pedidos.id = '$id'";
        }

        $sql_select = "SELECT pedidos.id, pedidos.descripcion, pedidos.valor, 
        pedidos.cantidad, pedidos.fecha_del_pedido, color.ph, color.gi, 
        clientes.nombre_apellido AS nombre_cliente, 
        usuarios.nombre_apellido AS nombre_usuario, localidades.nombre AS localidad, 
        clasificacion.nombre AS clasificacion, color.color, color.id AS id_color, color.pje_max, color.pje_min FROM pedidos
        INNER JOIN clientes ON clientes.id = pedidos.id_cliente
        INNER JOIN usuarios ON usuarios.id = pedidos.id_usuario
        INNER JOIN localidades ON localidades.id = pedidos.id_localidad
        INNER JOIN categoria ON categoria.id = pedidos.id_categoria
        INNER JOIN clasificacion ON categoria.id_clasificacion = clasificacion.id
        INNER JOIN color ON categoria.id_color = color.id ".$con;
        $resultado_select_estado=mysqli_query($conexion,$sql_select);
        $json_pedido = array();
        $json = array();
        while($filas = mysqli_fetch_array($resultado_select_estado))
        {
            $id_color = $filas['id_color'];
            $sql_select_calibre = "SELECT calibres.peso FROM color_calibres
            INNER JOIN calibres ON color_calibres.id_calibres = calibres.id 
            WHERE color_calibres.id_color = '$id_color'";
            $resultado_select_calibre=mysqli_query($conexion,$sql_select_calibre);
            $json_calibre = array();
            while($filas_calibre = mysqli_fetch_array($resultado_select_calibre))
            {
                $json_calibre[] = array(
                    'peso' => $filas_calibre['peso']
                );
            }

            $sql_select_raza = "SELECT razas.nombre FROM color_raza
            INNER JOIN razas ON color_raza.id_raza = razas.id 
            WHERE color_raza.id_color = '$id_color'";
            $resultado_select_raza=mysqli_query($conexion,$sql_select_raza);
            $json_raza = array();
            while($filas_raza = mysqli_fetch_array($resultado_select_raza))
            {
                $json_raza[] = array(
                    'nombre' => $filas_raza['nombre']
                );
            }

            $sql_select_tipo_animal = "SELECT tipo_animal.tipo FROM color_tipo_animal
            INNER JOIN tipo_animal ON color_tipo_animal.id_tipo_animal = tipo_animal.id 
            WHERE color_tipo_animal.id_color = '$id_color'";
            $resultado_select_tipo_animal=mysqli_query($conexion,$sql_select_tipo_animal);
            $json_tipo_animal = array();
            while($filas_tipo_animal = mysqli_fetch_array($resultado_select_tipo_animal))
            {
                $json_tipo_animal[] = array(
                    'tipo' => $filas_tipo_animal['tipo']
                );
            }

            $sql_select_denticion = "SELECT denticion.denticion FROM color_denticion 
            INNER JOIN denticion ON color_denticion.id_denticion = denticion.id 
            WHERE color_denticion.id_color = '$id_color'";
            $resultado_select_denticion=mysqli_query($conexion,$sql_select_denticion);
            $json_denticion = array();
            while($filas_denticion = mysqli_fetch_array($resultado_select_denticion))
            {
                $json_denticion[] = array(
                    'denticion' => $filas_denticion['denticion']
                );
            }

            $sql_select_grasa = "SELECT grasa.numero FROM color_sub_grasa
            INNER JOIN grasa ON color_sub_grasa.id_grasa = grasa.id
            WHERE color_sub_grasa.id_color = '$id_color'";
            $resultado_select_grasa=mysqli_query($conexion,$sql_select_grasa);
            $json_grasa = array();
            while($filas_grasa = mysqli_fetch_array($resultado_select_grasa))
            {
                $json_grasa[] = array(
                    'numero' => $filas_grasa['numero']
                );
            }

            $sql_select_cobertura = "SELECT cobertura.cobertura FROM color_cobertura
            INNER JOIN cobertura ON color_cobertura.id_cobertura = cobertura.id
            WHERE color_cobertura.id_color = '$id_color'";
            $resultado_select_cobertura=mysqli_query($conexion,$sql_select_cobertura);
            $json_cobertura = array();
            while($filas_cobertura = mysqli_fetch_array($resultado_select_cobertura))
            {
                $json_cobertura[] = array(
                    'cobertura' => $filas_cobertura['cobertura']
                );
            }

            $sql_select_osificacion = "SELECT osificacion.letra FROM color_osificacion
            INNER JOIN osificacion ON color_osificacion.id_osificacion = osificacion.id
            WHERE color_osificacion.id_color = '$id_color'";
            $resultado_select_osificacion=mysqli_query($conexion,$sql_select_osificacion);
            $json_osificacion = array();
            while($filas_osificacion = mysqli_fetch_array($resultado_select_osificacion))
            {
                $json_osificacion[] = array(
                    'letra' => $filas_osificacion['letra']
                );
            }

            $sql_select_evaluacion_corte = "SELECT evaluacion_corte.evaluacion FROM color_evaluacion_corte
            INNER JOIN evaluacion_corte ON color_evaluacion_corte.id_evaluacion_corte = evaluacion_corte.id
            WHERE color_evaluacion_corte.id_color = '$id_color'";
            $resultado_select_evaluacion_corte=mysqli_query($conexion,$sql_select_evaluacion_corte);
            $json_evaluacion_corte = array();
            while($filas_evaluacion_corte = mysqli_fetch_array($resultado_select_evaluacion_corte))
            {
                $json_evaluacion_corte[] = array(
                    'evaluacion' => $filas_evaluacion_corte['evaluacion']
                );
            }

            $sql_select_color_grasa = "SELECT color_grasa.color FROM color_color_grasa
            INNER JOIN color_grasa ON color_color_grasa.id_color_grasa = color_grasa.id
            WHERE color_color_grasa.id_color = '$id_color'";
            $resultado_select_color_grasa=mysqli_query($conexion,$sql_select_color_grasa);
            $json_color_grasa = array();
            while($filas_color_grasa = mysqli_fetch_array($resultado_select_color_grasa))
            {
                $json_color_grasa[] = array(
                    'color' => $filas_color_grasa['color']
                );
            }

            $sql_select_color_carne = "SELECT color_carne.color FROM color_color_carne
            INNER JOIN color_carne ON color_color_carne.id_color_carne = color_carne.id
            WHERE color_color_carne.id_color = '$id_color'";
            $resultado_select_color_carne=mysqli_query($conexion,$sql_select_color_carne);
            $json_color_carne = array();
            while($filas_color_carne = mysqli_fetch_array($resultado_select_color_carne))
            {
                $json_color_carne[] = array(
                    'color' => $filas_color_carne['color']
                );
            }

            $sql_select_marmoreado = "SELECT marmoreado.marmoreado FROM color_marmoreado
            INNER JOIN marmoreado ON color_marmoreado.id_marmoreado = marmoreado.id
            WHERE color_marmoreado.id_color = '$id_color'";
            $resultado_select_marmoreado=mysqli_query($conexion,$sql_select_marmoreado);
            $json_marmoreado = array();
            while($filas_marmoreado = mysqli_fetch_array($resultado_select_marmoreado))
            {
                $json_marmoreado[] = array(
                    'marmoreado' => $filas_marmoreado['marmoreado']
                );
            }

            $json[] = array(
                $json_pedido = array(
                    'id' => $filas['id'],
                    'cliente' => $filas['nombre_cliente'],
                    'fecha_del_pedido' => $filas['fecha_del_pedido'],
                    'descripcion' => $filas['descripcion'],
                    'nombre_usuario' => $filas['nombre_usuario'],
                    'localidad' => $filas['localidad'],
                    'valor' => $filas['valor'],
                    'cantidad' => $filas['cantidad'],
                    'clasificacion' => $filas['clasificacion'],
                    'color' => $filas['color'],
                    'calibres' => $json_calibre,
                    'pje_max' => $filas['pje_max'],
                    'pje_min' => $filas['pje_min'],
                    'raza' => $json_raza,
                    'tipo_animal' => $json_tipo_animal,
                    'denticion' => $json_denticion,
                    'grasa' => $json_grasa,
                    'cobertura' => $json_cobertura,
                    'osificacion' => $json_osificacion,
                    'evaluacion_corte' => $json_evaluacion_corte,
                    'color_grasa' => $json_color_grasa,
                    'color_carne' => $json_color_carne,
                    'marmoreado' => $json_marmoreado,
                    'ph' => $filas['ph'],
                    'gi' => $filas['gi']
                )
            );
        }         
    }


    $jsonstring = json_encode($json);
    echo $jsonstring;
    mysqli_close($conexion);

?>