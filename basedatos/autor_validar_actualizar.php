
<?php

$campos_pantalla = trim($_POST['param1']);

list($ind_validar, $mensaje_validar, $campos_bdatos) = validarSubmit($campos_pantalla);

if ($ind_validar == "0" || $ind_validar == "2") {
    list($ind_actualizar, $mensaje_actualizar) = actualizarSubmit($campos_bdatos);
} else {
        $ind_actualizar = 9;
        $mensaje_actualizar = $mensaje_validar;
    }

$respuesta =  $ind_validar . "#&" .  $mensaje_validar . "#&" . $ind_actualizar . "#&" .  $mensaje_actualizar;

echo ($respuesta);


// Validación campos de formulario de autor
function validarSubmit($campos) {
   
    require_once 'connect.php';

    $ind_validar = "0";
    $mensaje = "";
    $campos_bdatos="";

    $res = explode("#&", $campos);
    

    // Validar clave de la página web activa

    // Validar autor
    if ($res[2] == "") { 
        $mensaje = "Nombre del autor tiene que estar informado";  
        $ind_validar = "1";  
        return [$ind_validar, $mensaje, $campos_bdatos];  
    } else {
            $sql= "SELECT cGR02_Autor
                    FROM tgr02_autores
                    WHERE cGR02_Autor = '$res[2]'";  
                    
            $resultados= $dbcon->query($sql);

            if ($resultados->num_rows == 0)  {
                if ($res[1] !== "alta") {
                    $mensaje = "Error. Autor no existe.";  
                    $ind_validar = "1";   
                    return [$ind_validar, $mensaje, $campos_bdatos];  
                };
            } else {
                    if ($res[1] == "alta") {
                        $mensaje = "Error. Autor ya existe.";  
                        $ind_validar = "1";   
                        return [$ind_validar, $mensaje, $campos_bdatos];  
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
        $ind_validar = "2";   
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
        $ind_validar = "2";   
    } 
    $campos_bdatos .= "#&" . $bdatos_clave;

    
    // Validar país de nacimiento
    $tabla = "País";
    $literal = $res[8];
    $ind_lectura= "";
    $bdatos_clave= 0;   

    require 'tabla_codigos_leer_descripcion.php';

    if ($ind_lectura == "1")  {
        $mensaje .= "<br> <strong> País de nacimiento no existe.</strong> Será ignorada. Dar de alta en tabla de códigos";  
        $ind_validar = "2";   
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
        $ind_validar = "2";   
    } 
    $campos_bdatos .= "#&" . $bdatos_clave;
    return [$ind_validar, $mensaje, $campos_bdatos];   
    
}

// Actualización campos de formulario de autor
function actualizarSubmit($campos) {
    $ind_actualizar = 0;
    $mensaje_actualizar = "";

    $res = explode("#&", $campos);

    return [$ind_actualizar, $mensaje_actualizar];   
}    
?>