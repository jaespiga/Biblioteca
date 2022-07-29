<?php

// Validación de los campos de la pantalla de filtros para seleccionar autores

list ($respuesta) = autor_validar_filtro();
echo $respuesta;

// Función para validar los campos de la pantalla de filtro y obtener los número de códigos correspondientes 
function autor_validar_filtro() {

    $campos_pantalla = trim($_POST['param1']);

    list($ind_validar, $mensaje_validar, $campos_bdatos) 
                    = validarSubmit($campos_pantalla);


    $respuesta =  $ind_validar . "#&" .  $mensaje_validar. "#&" .  $campos_bdatos;

return [$respuesta];
}

// Validación campos de formulario de la pantalla de filtro
function validarSubmit($campos) {
    
    require_once '../basedatos/tabla_codigos.php';  // tratamiento de todas las operaciones de las tablas de códigos                          
    require_once '../rutinas/Fechas_tratamientos_bloques.php';  // Bloques de operaciones sobre funciones de fechas
    require_once '../rutinas/Fechas_tratamientos.php';  // Funciones de validación de fechas

    $ind_validar = 0;     // 0- sin incidencias, 1- con incidencias
    $mensaje = "";
    
    $mascara = array("s", "a", "d", "m");   // Máscara de fecha ssaa-mm-dd para pasar a valor ("")

    $res = explode("#&", $campos);
    
    $campos_bdatos = $res[0] . "#&" . $res[1];    // Apartado (Autor) / Operación
        
    // Validar nacionalidad

    if ($res[2] !== "") {
        $funcion_obtener_clave = 1;
        $tabla = "Nacionalidad";
        $datos_entrada = $res[2];
        $ind_lectura= "";
        $bdatos_clave= 0;   

        list($ind_error_codigo, $ind_validar_codigo, $mensaje_codigo, $campos_salida) 
                                = tabla_codigos($funcion_obtener_clave, $tabla, $datos_entrada);
        if ($ind_error_codigo == 0) {
            if ($ind_validar_codigo == 1)  {
                $bdatos_clave= 0;   
            } else {
                $res_codigo = explode("#&", $campos_salida);
                $bdatos_clave= $res_codigo[0];  
                }
        } else {
                $mensaje .= "<br> " . $mensaje_codigo;
            }
    } else {
            $bdatos_clave= 0;  
        }

    $campos_bdatos .= "#&" . $bdatos_clave;

    // Validar corriente literaria
    if ($res[3] !== "") {
        $funcion_obtener_clave = 1;
        $tabla = "CLiteraria";
        $datos_entrada = $res[3];
        $ind_lectura= "";
        $bdatos_clave= 0;   

        list($ind_error_codigo, $ind_validar_codigo, $mensaje_codigo, $campos_salida) 
                                = tabla_codigos($funcion_obtener_clave, $tabla, $datos_entrada);

        if ($ind_error_codigo == 0) {
            if ($ind_validar_codigo == 1)  {
                $bdatos_clave= 0;   
            } else {
                $res_codigo = explode("#&", $campos_salida);
                $bdatos_clave= $res_codigo[0];  
                }
        } else {
                $mensaje .= "<br> " . $mensaje_codigo;
            }
    } else {
            $bdatos_clave= 0;  
        }

    $campos_bdatos .= "#&" . $bdatos_clave;
    
    // Validar país de nacimiento
    if ($res[4] !== "") {
        $funcion_obtener_clave = 1;
        $tabla = "País";
        $datos_entrada = $res[4];
        $ind_lectura= "";
        $bdatos_clave= 0;   

        list($ind_error_codigo, $ind_validar_codigo, $mensaje_codigo, $campos_salida) 
                                = tabla_codigos($funcion_obtener_clave, $tabla, $datos_entrada);
                                
        if ($ind_error_codigo == 0) {
            if ($ind_validar_codigo == 1)  {
                $bdatos_clave= 0;    
            } else {
                $res_codigo = explode("#&", $campos_salida);
                $bdatos_clave= $res_codigo[0];  
                }
        } else {
                $mensaje .= "<br> " . $mensaje_codigo;
            }
    } else {
            $bdatos_clave= 0;  
        }

    $campos_bdatos .= "#&" . $bdatos_clave;
    
    // Comparar límites de la fecha de nacimiento
    
    list($respuesta) = comparar_fechas($res[5], $res[6]);    
    $res_fecha = explode("#&", $respuesta);
    
    if ($res_fecha[0] == 0) {        // Indicador de validación 0- Correcto, Resto- Error
        if ($res_fecha[7] !== "0") {   // 0- Fecha inicial <= final 1- Fecha final < inicial 
            $mensaje .= "<br> <strong> Límite superior de la fecha de nacimiento (" . $res_fecha[9] . " no puede ser menor al límite inferior (" . $res_fecha[8] . ").</strong>";  
            $ind_validar = 1; 
        }
    } else {
            if ($res_fecha[3] !== 0) {   // Indicador de error de fecha inicial 0- Correcto, Resto- Error
                $mensaje .= "<br> <strong> Límite inferior de la fecha de nacimiento. " . $res_fecha[4] . "</strong>";  
                $ind_validar = 1;
            }
            if ($res_fecha[5] !== 0) {   // Indicador de error de fecha final 0- Correcto, Resto- Error
                $mensaje .= "<br> <strong> Límite superior de la fecha de nacimiento. " . $res_fecha[6] . "</strong>";  
                $ind_validar = 1;
            }
        }

        $fecha_ajustada = str_replace($mascara, "", $res[5]);
    
        if ($fecha_ajustada == "--") {
            $fecha_ajustada = "";
        } 
    
        $campos_bdatos .= "#&" . $fecha_ajustada;      // fecha nacimiento. Límite inferior.
    
        $fecha_ajustada = str_replace($mascara, "", $res[6]);
    
        if ($fecha_ajustada == "--") {
            $fecha_ajustada = "";
        } 
    
        $campos_bdatos .= "#&" . $fecha_ajustada;      // fecha nacimiento. Límite superior.

    // Validar país de fallecimiento
    if ($res[7] !== "") {
        $funcion_obtener_clave = 1;
        $tabla = "País";
        $datos_entrada = $res[7];
        $ind_lectura= "";
        $bdatos_clave= 0;   

        list($ind_error_codigo, $ind_validar_codigo, $mensaje_codigo, $campos_salida) 
                                = tabla_codigos($funcion_obtener_clave, $tabla, $datos_entrada);
                                
        if ($ind_error_codigo == 0) {
            if ($ind_validar_codigo == 1)  {
                $bdatos_clave= 0;    
            } else {
                $res_codigo = explode("#&", $campos_salida);
                $bdatos_clave= $res_codigo[0];  
                }
        } else {
                $mensaje .= "<br> " . $mensaje_codigo;
            }
    } else {
            $bdatos_clave= 0;  
        }

    $campos_bdatos .= "#&" . $bdatos_clave;
    
    // Comparar límites de la fecha de fallecimiento
    list($respuesta) = comparar_fechas($res[8], $res[9]);    
    $res_fecha = explode("#&", $respuesta);
    
    if ($res_fecha[0] == 0) {        // Indicador de validación 0- Correcto, Resto- Error
        if ($res_fecha[7] !== "0") {   // 0- Fecha inicial <= final 1- Fecha final < inicial 
            $mensaje .= "<br> <strong> Límite superior de la fecha de fallecimiento (" . $res_fecha[9] . " no puede ser menor al límite inferior (" . $res_fecha[8] . ").</strong>";  
            $ind_validar = 1; 
        }
    } else {
            if ($res_fecha[3] !== 0) {   // Indicador de error de fecha inicial 0- Correcto, Resto- Error
                $mensaje .= "<br> <strong> Límite inferior de la fecha de fallecimiento. " . $res_fecha[4] . "</strong>";  
                $ind_validar = 1;
            }
            if ($res_fecha[5] !== 0) {   // Indicador de error de fecha final 0- Correcto, Resto- Error
                $mensaje .= "<br> <strong> Límite superior de la fecha de fallecimiento. " . $res_fecha[6] . "</strong>";  
                $ind_validar = 1;
            }
        }
    
    $fecha_ajustada = str_replace($mascara, "", $res[8]);
    
    if ($fecha_ajustada == "--") {
        $fecha_ajustada = "";
    } 

    $campos_bdatos .= "#&" . $fecha_ajustada;      // fecha fallecimiento. Límite inferior.

    $fecha_ajustada = str_replace($mascara, "", $res[9]);

    if ($fecha_ajustada == "--") {
        $fecha_ajustada = "";
    } 

    $campos_bdatos .= "#&" . $fecha_ajustada;      // fecha fallecimiento. Límite superior.

    return [$ind_validar, $mensaje, $campos_bdatos];
}