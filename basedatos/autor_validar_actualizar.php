
<?php
list ($respuesta) = autor_validar_actualizar();

// Función para validar todos los campos de autor
function autor_validar_actualizar() {

    $campos_pantalla = trim($_POST['param1']);

    list($ind_actualizar, $ind_validar, $mensaje_validar, $campos_bdatos) 
                    = validarSubmit($campos_pantalla);

    if ($ind_actualizar == 0) {
        list($ind_actualizar, $mensaje_actualizar) = actualizarSubmit($campos_bdatos);
    } else {
            $ind_actualizar = 1;
            $mensaje_actualizar = $mensaje_validar;
        }

    $respuesta =  $ind_actualizar . "#&" .  $ind_validar . "#&" .  $mensaje_validar . "#&" .  $mensaje_actualizar;

return ($respuesta);
}

// Validación campos de formulario de autor
function validarSubmit($campos) {
   
    require_once 'connect.php';
    
    require_once '../rutinas/Fechas_tratamientos.php';  // Funciones de validación de fechas

    $ind_actualizar = 0;    // 0- si actualizar, 1- no actualizar
    $ind_validar = "0";     // 0- sin incidencias, 1- con incidencias
    $mensaje = "";
    $campos_bdatos="";

    $res = explode("#&", $campos);
    

    // Validar clave de la página web activa

    // Validar autor
    if ($res[2] == "") { 
        $mensaje = "Nombre del autor tiene que estar informado"; 
        $ind_actualizar = 1; 
        return [$ind_actualizar, $ind_validar, $mensaje, $campos_bdatos];  
    } else {
            $sql= "SELECT cGR02_Autor
                    FROM tgr02_autores
                    WHERE cGR02_Autor = '$res[2]'";  
                    
            $resultados= $dbcon->query($sql);

            if ($resultados->num_rows == 0)  {
                if ($res[1] !== "alta") {
                    $mensaje = "Error. Autor no existe.";  
                    $ind_actualizar = "1";   
                    return [$ind_actualizar, $ind_validar, $mensaje, $campos_bdatos];  
                };
            } else {
                    if ($res[1] == "alta") {
                        $mensaje = "Error. Autor ya existe.";  
                        $ind_actualizar = "1";   
                        return [$ind_actualizar, $ind_validar, $mensaje, $campos_bdatos];  
                    };
                }   
        }

    $campos_bdatos = $res[2];
    
    // Validar nacionalidad
    $tabla = "Nacionalidad";
    $literal = $res[3];
    $ind_lectura= "";
    $bdatos_clave= 0;   

    require 'tabla_codigos_leer_descripcion.php';

    if ($ind_lectura == "1")  {
        $mensaje .= "<br> <strong> Nacionalidad no existe.</strong> Será ignorada. Dar de alta en tabla de códigos";  
        $ind_validar = 1;   
    } 
    $campos_bdatos .= "#&" . $bdatos_clave;

    // Validar corriente literaria
    $tabla = "CLiteraria";
    $literal = $res[4];
    $ind_lectura= "";
    $bdatos_clave= 0;   

    require 'tabla_codigos_leer_descripcion.php';

    if ($ind_lectura == "1")  {
        $mensaje .= "<br> <strong> Corriente literaria no existe.</strong> Será ignorada. Dar de alta en tabla de códigos";  
        $ind_validar = 1;   
    } 
    $campos_bdatos .= "#&" . $bdatos_clave;

    // Validar fecha de nacimiento

    $campos_funcion = $res[5];

    $funcion_validar_fecha = 1;
    list($ind_validar, $mensaje, $campos_salida) 
                            = fechas($funcion_validar_fecha, $campos_funcion);
    
    if ($ind_validar == 0) {
        # code...
    } else {
        # code...
    }
                            
    
    // Validar país de nacimiento
    $tabla = "País";
    $literal = $res[8];
    $ind_lectura= "";
    $bdatos_clave= 0;   

    require 'tabla_codigos_leer_descripcion.php';

    if ($ind_lectura == "1")  {
        $mensaje .= "<br> <strong> País de nacimiento no existe.</strong> Será ignorada. Dar de alta en tabla de códigos";  
        $ind_validar = 1;   
    } 
    $campos_bdatos .= "#&" . $bdatos_clave;
    
    // Validar país de fallecimiento
    $tabla = "País";
    $literal = $res[10];
    $ind_lectura= "";
    $bdatos_clave= 0;   

    require 'tabla_codigos_leer_descripcion.php';

    if ($ind_lectura == "1")  {
        $mensaje .= "<br> <strong> País de fallecimiento no existe.</strong> Será ignorada. Dar de alta en tabla de códigos";  
        $ind_validar = 1;   
    } 
    $campos_bdatos .= "#&" . $bdatos_clave;
    return [$ind_actualizar, $ind_validar, $mensaje, $campos_bdatos];   
    
}

// Actualización campos de formulario de autor
function actualizarSubmit($campos) {
    $ind_actualizar = 0;
    $mensaje_actualizar = "";

    $res = explode("#&", $campos);

    return [$ind_actualizar, $mensaje_actualizar];   
}    
?>