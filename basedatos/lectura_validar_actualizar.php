<?php
    
// Validación de los campos de la pantalla de lectura y su actualización en la base de datos

list ($respuesta) = lectura_validar_actualizar();
echo $respuesta;

// Función para validar todos los campos de libro
function lectura_validar_actualizar() {

    $ind_actualizar = 1;
    $ind_validar = 0;
    $mensaje_validar = "Validación no realizada";
    $campos_bdatos = "";
    
    $campos_pantalla = trim($_POST['param1']);

    list($ind_actualizar, $ind_validar, $mensaje_validar, $campos_bdatos) 
                    = validarSubmit($campos_pantalla);

    if ($ind_actualizar == 0) {
        list($ind_actualizar, $mensaje_actualizar) 
                    = actualizarSubmit($campos_pantalla, $campos_bdatos);
    } else {
            $ind_actualizar = 1;
            $mensaje_actualizar = $mensaje_validar;
        }

    $respuesta =  $ind_actualizar . "#&" .  $ind_validar . "#&" .  $mensaje_validar . "#&" .  $mensaje_actualizar;

return [$respuesta];
}

// Validación campos de formulario de libro
function validarSubmit($campos) {
    
    require_once '../basedatos/tabla_codigos.php';  // tratamiento de todas las operaciones de las tablas de códigos 
    require_once '../basedatos/leer_datos_bdatos.php';  // leer datos de Autor / Libro / Lectura                         
    require_once '../rutinas/Fechas_tratamientos_bloques.php';  // Bloques de operaciones sobre funciones de fechas
    require_once '../rutinas/Fechas_tratamientos.php';  // Funciones de validación de fechas


    $ind_actualizar = 0;    // 0- si actualizar, 1- no actualizar
    $ind_validar = 0;       // 0- sin incidencias, 1- con incidencias
    $ind_error_fechas = 0;  // fechas publicación/adquisición: 0- correctas, 1- incorrectas
    $mensaje = "";

    $mascara = array("s", "a", "d", "m");   // Máscara de fecha ssaa-mm-dd para pasar a valor ("")

    $res = explode("#&", $campos);
    
    $campos_bdatos = $res[0] . "#&" . $res[1];    // Apartado (Libro) / Operación

    // Validar clave de la página web activa
    
    // Validar lector
    $funcion_obtener_clave = 1;
    $tabla = "Lector";
    $datos_entrada = $res[2];
    $ind_lectura= "";
    $bdatos_clave= 0;   

    if ($res[2] == "") {
        $mensaje .= "<br> <strong> Error.</strong>. Lector tiene que estar informado.";  
        $ind_actualizar = 1;
        return [$ind_actualizar, $ind_validar, $mensaje, $datos_salida];
    } else {
            list($ind_error_codigo, $ind_validar_codigo, $mensaje_codigo, $campos_salida) 
                                    = tabla_codigos($funcion_obtener_clave, $tabla, $datos_entrada);
            if ($ind_error_codigo == 0) {
                if ($ind_validar_codigo == 1)  {
                    $mensaje .= "<br> <strong> Error. Lector no existe.</strong>. Dar de alta previamente.";  
                    $ind_actualizar = 1;
                    return [$ind_actualizar, $ind_validar, $mensaje, $datos_salida];
                } else {
                    $res_codigo = explode("#&", $campos_salida);
                    $bdatos_clave= $res_codigo[0];  
                    }
            } else {
                    $mensaje .= "<br> " . $mensaje_codigo;
                }
        }

    $campos_bdatos .= "#&" . $bdatos_clave;

    // Validar libro
    
    if ($res[3] == "") { 
        $mensaje = "Nombre del libro tiene que estar informado"; 
        $ind_actualizar = 1; 
        return [$ind_actualizar, $ind_validar, $mensaje, $campos_bdatos];  
    } else {
            $apartado = "Libro";
            $clave = $res[3];
            list($ind_error, $mensaje, $datos_salida) = leerDatosBDatos($apartado, $clave);
             
            if ($ind_error == 0) {
                if ($datos_salida == ""){ 
                    $mensaje = "Error. Libro no existe. Dar de alta previamente.";  
                    $ind_actualizar = 1;   
                    return [$ind_actualizar, $ind_validar, $mensaje, $campos_bdatos];  
                }
            } else {
                    $ind_actualizar = 1;
                    return [$ind_actualizar, $ind_validar, $mensaje, $datos_salida];  
                }  
        }

    $campos_bdatos .= "#&" . $res[3];       // Libro    
        
    // Validar autor
    if ($res[4] == "") { 
        $mensaje = "Nombre del autor tiene que estar informado"; 
        $ind_actualizar = 1; 
        return [$ind_actualizar, $ind_validar, $mensaje, $campos_bdatos];  
    } else {
            $apartado = "Autor";
            $clave = $res[4];
            list($ind_error, $mensaje, $datos_salida) = leerDatosBDatos($apartado, $clave);
            
            if ($ind_error == 0) {

                if ($datos_salida == ""){ 
                    $mensaje = "Error. Autor no existe.";  
                    $ind_actualizar = 1;   
                    return [$ind_actualizar, $ind_validar, $mensaje, $campos_bdatos];      
                } 
            } else {
                    $ind_actualizar = 1;
                    return [$ind_actualizar, $ind_validar, $mensaje, $datos_salida];  
                }  
        }

        $campos_bdatos .= "#&" . $res[4];    // Autor
    
    // Validar idioma de lectura
    $funcion_obtener_clave = 1;
    $tabla = "Idioma";
    $datos_entrada = $res[5];
    $ind_lectura= "";
    $bdatos_clave= 0;   

    list($ind_error_codigo, $ind_validar_codigo, $mensaje_codigo, $campos_salida) 
                            = tabla_codigos($funcion_obtener_clave, $tabla, $datos_entrada);

    if ($ind_error_codigo == 0) {
        if ($ind_validar_codigo == 1)  {
            $mensaje .= "<br> <strong> Idioma no existe.</strong> Será ignorado. Dar de alta en tabla de codigos";  
            $ind_validar = 1;   
        } else {
            $res_codigo = explode("#&", $campos_salida);
            $bdatos_clave= $res_codigo[0];  
            }
    } else {
            $mensaje .= "<br> " . $mensaje_codigo;
        }

    $campos_bdatos .= "#&" . $bdatos_clave;
    
    // Calificación de la lectura
    $campos_bdatos .= "#&" . $res[6];

    // Validar fecha de inicio de la lectura
    $fecha = $res[7];
    $fecha_referencia = date('Y-m-d');
    
    $annos = 0;                 // Años a sumar/restar a la fecha del día
    $meses = 0;                 // Meses a sumar/restar a la fecha del día
    $dias = 0;                  // Días a sumar/restar a la fecha del día
    
    list($respuesta) = validar_limites_fecha($fecha, $fecha_referencia, $annos, $meses, $dias);
    
    $res_fecha = explode("#&", $respuesta);
    
    if ($res_fecha[0] == "0") {        // Indicador de validación 0- Correcto, Resto- Error
        if ($res_fecha[7] !== "0") {   // 0- Fecha inicial <= final 1- Fecha final < inicial 
            $mensaje .= "<br> <strong> Aviso. Fecha de inicio de la lectura no puede ser superior a la del día.</strong>";  
            $ind_actualizar = 1;
            $ind_error_fechas = 1;
        }
    } else {
            if ($res_fecha[3] !== "0") {   // Indicador de error de fecha inicial 0- Correcto, Resto- Error
                $mensaje .= "<br> <strong> Fecha de inicio de la lectura. " . $res_fecha[4] . "</strong>";  
                $ind_actualizar = 1;
                $ind_error_fechas = 1;
            }
            if ($res_fecha[5] !== "0") {   // Indicador de error de fecha final 0- Correcto, Resto- Error
                $mensaje .= "<br> <strong> Fecha del día. " . $res_fecha[6] . "</strong>";  
                $ind_actualizar = 1;
                $ind_error_fechas = 1;
            }
        }
        
        if ($ind_error_fechas == 0) {
            $fecha_ajustada = str_replace($mascara, "", $res[7]);
            if ($fecha_ajustada == "--") {
                $fecha_ajustada = "";
            } 
            $campos_bdatos .= "#&" . $fecha_ajustada;       // fecha inicio de la lectura         
        } else {
                $campos_bdatos .= "#&" . $res[7];           // fecha de inicio de la lectura errónea de entrada
            }

    
    // Validar fecha de fin de la lectura
    $fecha = $res[8];
    $fecha_referencia = date('Y-m-d');
    
    $annos = 0;                 // Años a sumar/restar a la fecha del día
    $meses = 0;                 // Meses a sumar/restar a la fecha del día
    $dias = 0;                  // Días a sumar/restar a la fecha del día
    
    list($respuesta) = validar_limites_fecha($fecha, $fecha_referencia, $annos, $meses, $dias);
    
    $res_fecha = explode("#&", $respuesta);
    
    if ($res_fecha[0] == "0") {        // Indicador de validación 0- Correcto, Resto- Error
        if ($res_fecha[7] !== "0") {   // 0- Fecha inicial <= final 1- Fecha final < inicial 
            $mensaje .= "<br> <strong> Aviso. Fecha de fin de la lectura no puede ser superior a la del día.</strong>";  
            $ind_validar = 1; 
        }
    } else {
            if ($res_fecha[3] !== "0") {   // Indicador de error de fecha inicial 0- Correcto, Resto- Error
                $mensaje .= "<br> <strong> Fecha de fin de la lectura. " . $res_fecha[4] . "</strong>";  
                $ind_actualizar = 1;
                $ind_error_fechas = 1;
            }
            if ($res_fecha[5] !== "0") {   // Indicador de error de fecha final 0- Correcto, Resto- Error
                $mensaje .= "<br> <strong> Fecha del día. " . $res_fecha[6] . "</strong>";  
                $ind_actualizar = 1;
                $ind_error_fechas = 1;
            }
        }
        
    if ($ind_error_fechas == 0) {
        $fecha_ajustada = str_replace($mascara, "", $res[8]);
        if ($fecha_ajustada == "--") {
            $fecha_ajustada = "";
        } 
        $campos_bdatos .= "#&" . $fecha_ajustada;       // fecha de fin de la lectura         
    } else {
            $campos_bdatos .= "#&" . $res[8];           // fecha de fin de la lectura errónea de entrada
        }

    // Opinión
    $campos_bdatos .= "#&" . $res[9];

    // VALIDACIONES RELACIONALES 

    // Comparar fechas de publicación y adquisición
    if ($ind_error_fechas == 0) {
        list($respuesta) = comparar_fechas($res[7], $res[8]);    
        $res_fecha = explode("#&", $respuesta);
        
        if ($res_fecha[0] == 0) {        // Indicador de validación 0- Correcto, Resto- Error
            if ($res_fecha[7] !== "0") {   // 0- Fecha inicial <= final 1- Fecha final < inicial 
                $mensaje .= "<br> <strong> Fecha de fin de lectura (" . $res_fecha[9] . " no puede ser inferior a fecha de inicio de lectura (" . $res_fecha[8] . ").</strong>";  
                $ind_actualizar = 1; 
            }
        } else {
                if ($res_fecha[3] !== 0) {   // Indicador de error de fecha inicial 0- Correcto, Resto- Error
                    $mensaje .= "<br> <strong> Fecha de inicio de lectura. " . $res_fecha[4] . "</strong>";  
                    $ind_actualizar = 1;
                    $ind_error_fechas = 1;
                }
                if ($res_fecha[5] !== 0) {   // Indicador de error de fecha final 0- Correcto, Resto- Error
                    $mensaje .= "<br> <strong> Fecha de fin de lectura. " . $res_fecha[6] . "</strong>";  
                    $ind_actualizar = 1;
                    $ind_error_fechas = 1;
                }
            }
    }
    $mascara = array("s", "a", "d", "m");   // Máscara de fecha ssaa-mm-dd para pasar a valor ("")
    $fecha_ajustada = str_replace($mascara, "", $res[7]);
    
    if ($fecha_ajustada == "--") {
        $fecha_ajustada = "";
    } 

    $campos_bdatos .= "#&" . $fecha_ajustada;      // fecha inicio de lectura 

    $fecha_ajustada = str_replace($mascara, "", $res[8]);

    if ($fecha_ajustada == "--") {
        $fecha_ajustada = "";
    } 

    $campos_bdatos .= "#&" . $fecha_ajustada;      // fecha fin de lectura

    return [$ind_actualizar, $ind_validar, $mensaje, $campos_bdatos];
}

// Actualización campos de formulario de autor
function actualizarSubmit($campos_pantalla, $campos_bdatos) {
    
    require 'connect.php';

    $ind_actualizar = 0;
    $mensaje_actualizar = "";

    $res = explode("#&", $campos_bdatos);

    if ($res[1] == "alta") {

        $sql="INSERT INTO tgr04_lecturas(cGR04_Lector, cGR04_Título, cGR04_Autor, cGR04_IdLectura, cGR04_FIniLectura,
                                         cGR04_FFinLectura, cGR04_Calificacion, cGR04_Opinión) 
                    VALUES ('$res[2]', '$res[3]', '$res[4]', '$res[5]', '$res[7]', '$res[8]', '$res[6]', '$res[9]')";
		
        if($dbcon->query($sql) === true){
			$mensaje = "Alta efectuada <br />";

		} else {
				require '../basedatos/errores_db.php';			/* Función para analizar errores DB */ 
                $ind_actualizar = 1;
                $mensaje_actualizar = $mensaje;
			} 
        
    } else { 
            if ($res[1] == "edición") {
                $sql= "UPDATE tgr04_lecturas 
                            SET cGR04_Lector ='$res[2]', 
                                cGR04_Título ='$res[3]', 
                                cGR04_Autor ='$res[4]', 
                                cGR04_IdLectura ='$res[5]', 
                                cGR04_FIniLectura ='$res[7]', 
                                cGR04_FFinLectura ='$res[8]', 
                                cGR04_Calificacion ='$res[6]', 
                                cGR04_Opinión ='$res[9]', 
                                cGR04_TSUltCambio= CURRENT_TIMESTAMP
                            WHERE cGR04_Lector ='$res[2]'
                              AND cGR04_Título = '$res[3]'
                              AND cGR04_Autor ='$res[4]'";

                if($dbcon->query($sql) === true){
                    $mensaje = "Datos actualizados <br />";       
                } else {
                        require '../basedatos/errores_db.php';			/* Función para analizar errores DB */ 
                        $ind_actualizar = 1;
                        $mensaje_actualizar = $mensaje;
                    }                
            }                 
        }
    return [$ind_actualizar, $mensaje_actualizar];   
}    
?>