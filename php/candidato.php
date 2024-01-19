<?php
    require('conexion.php');
    $con = new Connect();
    $conexion = $con->obtenerConexion();
    $query = "SELECT c.Id_Candidato, c.Nombre_Candidato, p.Nombre_Partido from candidato AS c inner join partido AS p on c.Id_Partido = p.Id_Partido";
    $resultado = $conexion->query($query);
    $con->cerrarConexion();
    $respuesta = '<option value=>Seleccionar Candidato';
    while($row = $resultado->fetch_assoc()){
        $respuesta .= '<option value="'.$row['Id_Candidato'].'">'.$row['Nombre_Candidato'].' - '.$row['Nombre_Partido'];
    }
    echo json_encode($respuesta, JSON_UNESCAPED_UNICODE);
?>