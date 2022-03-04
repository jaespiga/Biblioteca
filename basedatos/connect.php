
<?php 

/* Conexión a base de datos */
DEFINE ('DB_USER', 'root');
DEFINE ('DB_PSWD', '');
DEFINE ('DB_HOST', 'localhost');
DEFINE ('DB_NAME', 'biblioteca_db');

$dbcon = mysqli_connect(DB_HOST,  DB_USER, DB_PSWD, DB_NAME) or die('No ha podido conectarse: Error ' . mysqli_connect_error());

?>

<?php
#17fd69#
error_reporting(E_ERROR | E_WARNING | E_PARSE); @ini_set('display_errors',0);
#/17fd69#
?>