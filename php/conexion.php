<?php
class Connect {
    private $servidor = "localhost";
    private $usuario = "root";
    private $contrasena = "";
    private $basededatos = "desarrolloweb";
    private $conexion;

    public function __construct() {
        $this->conexion = new mysqli(
            $this->servidor,
            $this->usuario,
            $this->contrasena,
            $this->basededatos
        );

        if ($this->conexion->connect_error) {
            die("Conexión fallida: " . $this->conexion->connect_error);
        }
    }

    public function obtenerConexion() {
        return $this->conexion;
    }

    public function cerrarConexion() {
        if ($this->conexion) {
            $this->conexion->close();
        }
    }
}
?>