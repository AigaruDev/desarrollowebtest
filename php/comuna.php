<?php
    require('conexion.php');
    $con = new Connect();
    $conexion = $con->obtenerConexion();
    $nRegion = $_POST['numeroRegion'];
    $query = "SELECT * from Comuna WHERE Id_Region =$nRegion";
    $resultado = $conexion->query($query);
    $con->cerrarConexion();
    $respuesta = '<option value="">Seleccionar Comuna</option>';
    while($row = $resultado->fetch_assoc()){
        $respuesta .= '<option value="'.$row['Id_Comuna'].'">'.$row['Nombre_Comuna'].'</option>';
    }
    echo json_encode($respuesta);
?>