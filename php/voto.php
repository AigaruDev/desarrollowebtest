<?php
// procesar.php
$json = file_get_contents('php://input');
$datos = json_decode($json, true);

// Conectar a la base de datos (asegúrate de llenar los detalles correctos)
require('conexion.php');
$con = new Connect();
$conexion = $con->obtenerConexion();

// Escapar los datos para evitar inyección de SQL
$nombre = $conexion->real_escape_string($datos['nombre']);
$alias = $conexion->real_escape_string($datos['alias']);
$rut = $conexion->real_escape_string($datos['rut']);
$email = $conexion->real_escape_string($datos['email']);
$comuna = $conexion->real_escape_string($datos['comuna']);
$candidato = $conexion->real_escape_string($datos['candidato']);
$medioPopular = $conexion->real_escape_string($datos['medioPopular']);

$insertpersona = "INSERT INTO persona VALUES (?, ?, ?, ?, ?)";
// Preparar la consulta
$stmt = $conexion->prepare($insertpersona);
// Vincular parámetros
$stmt->bind_param("ssssi", $rut, $nombre, $alias, $email, $comuna);

// Query para insertar en la tabla voto
$insertvoto = "INSERT INTO voto VALUES (NULL, ?, ?, ?)";
// Preparar la consulta
$stmt2 = $conexion->prepare($insertvoto);
// Vincular parámetros
$stmt2->bind_param("sis", $rut, $candidato, $medioPopular);

// Ejecutar la consulta
if ($stmt->execute() && $stmt2->execute()) {
    echo "true";
} else {
    echo "Error al insertar datos en la tabla voto: " . $stmt2->error." ". $stmt->error;
}
// Cerrar la declaración
$stmt2->close();
$stmt->close();
$con->cerrarConexion();
?>