<?php
require('conexion.php');
$con = new Connect();
$conexion = $con->obtenerConexion();
$query = "SELECT * from Region ORDER BY Id_Region ASC";
$resultado = $conexion->query($query);
$respuesta = '<option value=>Seleccionar Region';
$con->cerrarConexion();
while($row = $resultado->fetch_assoc()){
    $numeroRegion = trim($row['Id_Region']);
    $nRomano = romanNumber($row['Id_Region']);
    $respuesta .= '<option value='.$numeroRegion.'>'.$nRomano.' - '.$row['Nombre_Region'];
}
echo json_encode($respuesta, JSON_UNESCAPED_UNICODE);

function romanNumber($num){
    // intval(xxx) para que convierta explícitamente a int
    $n = intval($num);
    $res = '';
    // Array con los números romanos
    $roman_numerals = array('M' => 1000, 'CM' => 900, 'D' => 500, 'CD' => 400, 'C' => 100, 'XC' => 90, 'L' => 50, 'XL' => 40, 'X' => 10, 'IX' => 9, 'V' => 5, 'IV' => 4, 'I' => 1);
    foreach ($roman_numerals as $roman => $number) {
        // Dividir para encontrar resultados en array
        $matches = intval($n / $number);
        // Asignar el numero romano al resultado
        $res .= str_repeat($roman, $matches);
        // Descontar el numero romano al total
        $n = $n % $number;
    }
    // Res = String
    return $res;
}
?>