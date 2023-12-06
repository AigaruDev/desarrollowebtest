<?php
class Region {
    private $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    public function obtenerRegiones() {
        $query = "SELECT Numero_Region, Nombre_Region FROM region order by Numero_Region";
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
}
?>