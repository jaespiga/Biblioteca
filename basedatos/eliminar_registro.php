<?php
/* Eliminar el registro de la tabla correspondiente: Autor / Libros / Lecturas */

$datos = $_POST['param'];

list ($ind_error, $mensaje, $datos_salida) = eliminarRegistro($datos);

$datos = $ind_error. "#&" . $mensaje. "#&" . $datos_salida;    

echo $datos;

// Borrar registro de la tabla correspondiente
function eliminarRegistro($datos) {
    
    require 'connect.php';

    $res = explode("#&", $datos);

    $ind_actualizar = 0;
    $mensaje_actualizar = "";
    $datos_salida = $res[1];

    if ($res[0] == "Autor") {
        $sql="DELETE FROM tgr02_autores 
                    WHERE cGR02_Autor = '$res[1]'";
        $mensaje = "Autor eliminado <br />";            
    } else {
            if ($res[0] == "Libro") {
                $sql="DELETE FROM tgr03_libros 
                    WHERE cGR03_Título = '$res[1]'";
                $mensaje = "Libro eliminado <br />";
            } else {
                    $sql="DELETE FROM tgr04_lecturas 
                            WHERE cGR04_Lector = '$res[1]'
                              and cGR04_Título = '$res[2]'
                              AND cGR04_Autor = '$res[3]";
                    $mensaje = "Lectura eliminada <br />";
                } 
        }                      

    if($dbcon->query($sql) === true){
        $mensaje_actualizar = $mensaje;       
    } else {
            require '../basedatos/errores_db.php';			/* Función para analizar errores DB */ 
            $ind_actualizar = 1;
            $mensaje_actualizar = $mensaje;
        }    
    
    return [$ind_actualizar, $mensaje_actualizar, $datos_salida];                 
}                 

?>