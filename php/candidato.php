<?php
class Candidato {
    private $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    public function obtenerRegiones() {
        $query = "SELECT * FROM candidato order by Rut";
        $result = $this->conexion->query($query);

        $regiones = array();

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $regiones[] = array(
                    'numeroRegion' => $row['Numero_Region'],
                    'nombreRegion' => $row['Nombre_Region']
                );
            }
        }

        return $regiones;
    }

    public function romanNumber($num){
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
}
?>