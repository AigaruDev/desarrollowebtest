<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>Formulario</title>
</head>
<body>
    <h1>Formulario de Votacion</h1>
    <form action="php/form.php" id='formulario' method="POST">
        <label>Nombre y Apellido</label>
        <br>
        <input type="text" name="nombreApellido" id="nombreApellido" required maxlength="60" />
        <br>
        <label>Alias</label>
        <br>
        <input type="text" name="alias" id="alias" required maxlength="20" />
        <br>
        <label>RUT</label>
        <br>
        <input type="text" name="rut" id ="rut"required maxlength="10" placeholder="Ejemplo 123456789-0" />
        <br>
        <label>Email</label>
        <br>
        <input type="email" name="email" id ="email" maxlength="50" />
        <br>
        <label>Region</label>
        <br>
        <select name="region" id="region">
            <option value="">Seleccionar Region</option>
                <?php
                    require_once('./php/connect.php');
                    require_once('./php/region.php');
                    $conexion = new Connect();
                    $regionClass = new Region($conexion->obtenerConexion());
                    $regiones = $regionClass->obtenerRegiones();
                    foreach ($regiones as $region) {
                        $romano = $regionClass->romanNumber($region['numeroRegion']);
                        echo '<option value="'.$region['numeroRegion'].'">'.$romano.' - '.$region['nombreRegion'].'</option>';
                    }
                ?>
        </select>
        <br>
        <label>Comuna</label>
        <br>
        <select name="comuna" id="comuna">
            <option value="">Seleccionar Comuna</option>
        </select>
        <br>
        <label>Candidato</label>
        <br>
        <select name="candidato" id="candidato">
            <option value="">Seleccionar Candidato</option>
        </select>
        <br>
        <label>Como Se enteeró de Nosotros</label>
        <br>
        <input type="checkbox" id="web" value="web" />
        <label>Web</label>
        <br>
        <input type="checkbox" id="tv" value="tv" />
        <label>TV</label>
        <br>
        <input type="checkbox" id="rrss" value="redesSociales" />
        <label>Redes Sociales</label>
        <br>
        <input type="checkbox" id="amigo" value="amigo" />
        <label>Amigo</label>
        <br>
        <input name="enviar" type="submit" value="Votar" onclick="enviarFormulario" class="btn">
    </form>
    <script src="js/validaRut.js"></script>
    <script src="js/main.js"></script>
</body>
</html>