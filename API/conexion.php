<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Accept, Authorization, X-Requested-With, X-Auth-Token, Origin, Application");
    header("Content-Type: application/json; charset=utf-8");
    $conexion = mysqli_connect('localhost', 'c2530205_admin', 'saki17PEto', 'c2530205_rqvta');
    // $conexion = mysqli_connect('localhost', 'root', '', 'gestion_para_expo');
    if (mysqli_connect_errno())
    {
        $_SESSION['message-error'] = 'Error al conectar la base de datos';
        exit();
    }
    mysqli_select_db($conexion, 'c2530205_rqvta') or die ($_SESSION['message-error'] = 'Error al conectar');
    mysqli_set_charset($conexion, 'utf8');
?>