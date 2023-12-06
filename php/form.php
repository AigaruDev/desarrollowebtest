<?php
require_once('connect.php');
$nombreApellido = $_POST['nombreApellido'];
$alias = $_POST['alias'];
$rut = $_POST['rut'];
$email = $_POST['email'];
$comoSeEntero = isset($_POST['web']) ? 'Web, ' : '';
$comoSeEntero .= isset($_POST['tv']) ? 'TV, ' : '';
$comoSeEntero .= isset($_POST['rrss']) ? 'Redes Sociales, ' : '';
$comoSeEntero .= isset($_POST['amigo']) ? 'Amigo, ' : '';
$comoSeEntero = rtrim($comoSeEntero);

$con = new Connect();
$conexion = $con->obtenerConexion();

// Verificar la conexión
if ($conexion->connect_error) {
  die("Conexión fallida: " . $conexion->connect_error);
}

// Insertar los datos en la base de datos
$sql = "INSERT INTO candidato (Rut, Nombre_Apellido, Alias, ComunaId, ComoSeEntero, Email)
VALUES ('$rut', '$nombreApellido', '$alias', 1,'$comoSeEntero', '$email')";

if ($conexion->query($sql) === TRUE) {
  echo json_encode("Datos guardados correctamente");
} else {
  echo json_encode("Error al guardar los datos: " . $conexion->error);
}

$conexion->close();
?>