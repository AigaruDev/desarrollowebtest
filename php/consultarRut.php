<?php
    require('conexion.php');
    $con = new Connect();
    $conexion = $con->obtenerConexion();
    $nRut = $_POST['rut'];
    $query = "SELECT * from voto WHERE Rut = '$nRut'";
    $resultado = $conexion->query($query);
    $con->cerrarConexion();
    if ($resultado->num_rows > 0) {
        $respuesta = true;
    } else {
        $respuesta = false;
    }
    echo json_encode($respuesta);
?>