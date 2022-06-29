
<?php 
require_once '../basedatos/leer_datos_bdatos.php';  // leer datos de Autor / Libro / Lectura                         

/* Leer toda la información del Autor / Libros / Lecturas */

$clave = $_POST['param1'];
$apartado = $_POST['param2'];

list ($ind_error, $mensaje, $datos_salida) = leerDatosBDatos($apartado, $clave);

$datos = $ind_error. "#&" . $mensaje. "#&" . $datos_salida;    

echo $datos;
?>
    