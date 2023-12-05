<?php
    require('connect.php');
    $con = new Connect();
    $conexion = $con->obtenerConexion();
    $nRegion = $_POST['numeroRegion'];
    $query = "SELECT * from Comuna WHERE RegionComuna =$nRegion";
    $resultado = $conexion->query($query);
    $respuesta = '<option value="">Seleccionar Comuna</option>';
    while($row = $resultado->fetch_assoc()){
        $respuesta .= '<option value="'.$row['IdComuna'].'">'.$row['NombreComuna'].'</option>';
    }
    echo json_encode($respuesta);
?>