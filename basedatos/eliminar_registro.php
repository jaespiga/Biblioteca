<?php
/* Eliminar el registro de la tabla correspondiente: Autor / Libros / Lecturas */

$datos = $_POST['param'];

list ($ind_error, $mensaje, $datos_salida) = eliminarRegistro($datos);

$datos = $ind_error. "#&" . $mensaje. "#&" . $datos_salida;    

echo $datos;

// Borrar registro de la tabla correspondiente
function eliminarRegistro($datos) {
    
    require 'connect.php';
    require_once '../basedatos/tabla_codigos.php';  // tratamiento de todas las operaciones de las tablas de códigos                          

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
                // Obtener clave lector
                    $funcion_obtener_clave = 1;
                    $tabla = "Lector";
                    $datos_entrada = $res[1];
                    $ind_lectura= ""; 

                    list($ind_error_codigo, $ind_validar_codigo, $mensaje_codigo, $campos_salida) 
                                            = tabla_codigos($funcion_obtener_clave, $tabla, $datos_entrada);
                    if ($ind_error_codigo == 0) {
                        if ($ind_validar_codigo == 1)  {
                            $num_lector = 0;
                        } else {
                            $res_codigo = explode("#&", $campos_salida);
                            $num_lector= $res_codigo[0];  
                            }
                    } else {
                            $num_lector = 0;
                        }

                    $sql="DELETE FROM tgr04_lecturas 
                            WHERE cGR04_Lector = '$num_lector'
                              AND cGR04_Título = '$res[2]'
                              AND cGR04_Autor = '$res[3]'";
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