<?php 

// Acceder a las funciones de tratar las tablas de códigos desde Ajax

require_once '../basedatos/tabla_codigos.php';  // tratamiento de todas las operaciones de las tablas de códigos                            

$funcion = $_POST['param0'];   
$tabla = $_POST['param1'];
$campos_entrada = $_POST['param2'];

list ($ind_error, $ind_validar, $mensaje, $campos_salida) = tabla_codigos($funcion, $tabla, $campos_entrada);

$respuesta =  $ind_error . "#&" .  $ind_validar . "#&" .  $mensaje . "#&" .  $campos_salida;

echo $respuesta;

?>