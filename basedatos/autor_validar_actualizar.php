
<?php

$campos_pantalla = trim($_POST['param1']);

list($ind_validar, $mensaje, $campos_bdatos) = validarSubmit($campos_pantalla);

if ($ind_validar == "0" || $ind_validar == "2") {
    list($ind_validar, $mensaje) = actualizarSubmit($campos_bdatos);
}

$respuesta =  $ind_validar . "#&" .  $mensaje;

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

    require_once 'tabla_codigos_leer_descripcion.php';

    if ($ind_lectura == "1")  {
        $mensaje .= "<br> Nacionalidad no existe. Será ignorada. Dar de alta en tabla de códigos";  
        $ind_validar = "2";   
    } 
    $campos_bdatos .= "#&" . $bdatos_clave;


    


    
    return [$ind_validar, $mensaje, $campos_bdatos];   
    
}

// Actualización campos de formulario de autor
function actualizarSubmit($campos) {
    $ind_validar = 0;
    $mensaje = "";

    $res = explode("#&", $campos);

    return [$ind_validar, $mensaje];   
}    
?>