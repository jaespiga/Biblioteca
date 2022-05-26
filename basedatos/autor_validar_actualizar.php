
<?php

require_once '../rutinas/Fechas_tratamientos_bloques.php';  // Bloques de operaciones sobre funciones de fechas
require_once '../rutinas/Fechas_tratamientos.php';  // Funciones de validación de fechas

// Validación de los campos de la pantalla de autores y su actualización en la base de datos

list ($respuesta) = autor_validar_actualizar();
echo $respuesta;

// Función para validar todos los campos de autor
function autor_validar_actualizar() {

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

// Validación campos de formulario de autor
function validarSubmit($campos) {
   
    require_once 'connect.php';
    
    require_once '../basedatos/tabla_codigos.php';  // tratamiento de todas las operaciones de las tablas de códigos                          
    require_once '../rutinas/Fechas_tratamientos_bloques.php';  // Bloques de operaciones sobre funciones de fechas
    require_once '../rutinas/Fechas_tratamientos.php';  // Funciones de validación de fechas


    $ind_actualizar = 0;    // 0- si actualizar, 1- no actualizar
    $ind_validar = 0;     // 0- sin incidencias, 1- con incidencias
    $mensaje = "";

    $res = explode("#&", $campos);
    
    $campos_bdatos = $res[0] . "#&" . $res[1];    // Apartado (Autor) / Operación

    // Validar clave de la página web activa

    // Validar autor
    if ($res[2] == "") { 
        $mensaje = "Nombre del autor tiene que estar informado"; 
        $ind_actualizar = 1; 
        return [$ind_actualizar, $ind_validar, $mensaje, $campos_bdatos];  
    } else {
            $sql= "SELECT cGR02_Autor, cGR02_TSUltCambio
                    FROM tgr02_autores
                    WHERE cGR02_Autor = '$res[2]'";  
                    
            $resultados= $dbcon->query($sql);

            if ($dbcon->errno == 0){ 
                if ($resultados->num_rows == 0)  {
                    $fila = $resultados->fetch_assoc();
                    if ($res[1] !== "alta") {
                        $mensaje = "Error. Autor no existe.";  
                        $ind_actualizar = 1;   
                        return [$ind_actualizar, $ind_validar, $mensaje, $campos_bdatos];  
                    } else {
                            if ($res[12] !== $fila[1]) {
                                $mensaje = "Error. Datos del autor han sido modificados desde otro terminal. Refresque datos y repita operación.";  
                                $ind_actualizar = 1;   
                            }
                        };
                } else {
                        if ($res[1] == "alta") {
                            $mensaje = "Error. Autor ya existe.";  
                            $ind_actualizar = 1;   
                            return [$ind_actualizar, $ind_validar, $mensaje, $campos_bdatos];  
                        };
                    } 
            } else {
                    require '../basedatos/errores_db.php';			/* Función para analizar errores DB */ 
                    $ind_actualizar = 1;
                    return [$ind_actualizar, $ind_validar, $mensaje, $campos_bdatos];  
                }  
        }

        $campos_bdatos .= "#&" . $res[2];    // Autor
        
    // Validar nacionalidad
    $funcion_obtener_clave = 1;
    $tabla = "Nacionalidad";
    $datos_entrada = $res[3];
    $ind_lectura= "";
    $bdatos_clave= 0;   

    list($ind_error_codigo, $ind_validar_codigo, $mensaje_codigo, $campos_salida) 
                            = tabla_codigos($funcion_obtener_clave, $tabla, $datos_entrada);
    if ($ind_error_codigo == 0) {
        if ($ind_validar_codigo == 1)  {
            $mensaje .= "<br> <strong> Nacionalidad no existe.</strong> Será ignorada. Dar de alta en tabla de codigos";  
            $ind_validar = 1;   
        } else {
            $res_codigo = explode("#&", $campos_salida);
            $bdatos_clave= $res_codigo[0];  
            }
    } else {
            $mensaje .= "<br> " . $mensaje_codigo;
        }

    $campos_bdatos .= "#&" . $bdatos_clave;

    // Validar corriente literaria
    $funcion_obtener_clave = 1;
    $tabla = "CLiteraria";
    $datos_entrada = $res[4];
    $ind_lectura= "";
    $bdatos_clave= 0;   

    list($ind_error_codigo, $ind_validar_codigo, $mensaje_codigo, $campos_salida) 
                            = tabla_codigos($funcion_obtener_clave, $tabla, $datos_entrada);

    if ($ind_error_codigo == 0) {
        if ($ind_validar_codigo == 1)  {
            $mensaje .= "<br> <strong> Corriente literaria no existe.</strong> Será ignorada. Dar de alta en tabla de codigos";  
            $ind_validar = 1;   
        } else {
            $res_codigo = explode("#&", $campos_salida);
            $bdatos_clave= $res_codigo[0];  
            }
    } else {
            $mensaje .= "<br> " . $mensaje_codigo;
        }

    $campos_bdatos .= "#&" . $bdatos_clave;

    // Validar fecha de nacimiento
    $ind_error_fechas = 0;      // Ver si se pueden comparar fechas de nacimiento y fallecimiento

    $fecha = $res[5];
    $fecha_referencia = date('Y-m-d');
    $annos_minimos = -15;
    
    $annos = $annos_minimos;    // Años a sumar/restar a la fecha del día
    $meses = 0;                 // Meses a sumar/restar a la fecha del día
    $dias = 0;                  // Días a sumar/restar a la fecha del día
    
    list($respuesta) = validar_limites_fecha($fecha, $fecha_referencia, $annos, $meses, $dias);
    
    $res_fecha = explode("#&", $respuesta);
    
    if ($res_fecha[0] == "0") {        // Indicador de validación 0- Correcto, Resto- Error
        if ($res_fecha[7] !== "0") {   // 0- Fecha inicial <= final 1- Fecha final < inicial 
            $mensaje .= "<br> <strong> Aviso. Edad del autor inferior a " . abs($annos_minimos) . " años.</strong>";  
            $ind_validar = 1; 
        }
    } else {
            if ($res_fecha[3] !== "0") {   // Indicador de error de fecha inicial 0- Correcto, Resto- Error
                $mensaje .= "<br> <strong> Fecha de nacimiento. " . $res_fecha[4] . "</strong>";  
                $ind_actualizar = 1;
                $ind_error_fechas = 1;
            }
            if ($res_fecha[5] !== "0") {   // Indicador de error de fecha final 0- Correcto, Resto- Error
                $mensaje .= "<br> <strong> Fecha de nacimiento. " . $res_fecha[6] . "</strong>";  
                $ind_actualizar = 1;
                $ind_error_fechas = 1;
            }
        }
  
    // Validar fecha de fallecimiento
    $fecha = $res[6];
    $fecha_referencia = date('Y-m-d');
    $annos_minimos = 0;
    
    $annos = $annos_minimos;    // Años a sumar/restar a la fecha del día
    $meses = 0;                 // Meses a sumar/restar a la fecha del día
    $dias = 0;                  // Días a sumar/restar a la fecha del día
    
    list($respuesta) = validar_limites_fecha($fecha, $fecha_referencia, $annos, $meses, $dias);
    
    $res_fecha = explode("#&", $respuesta);
    
    if ($res_fecha[0] == "0") {        // Indicador de validación 0- Correcto, Resto- Error
        if ($res_fecha[7] !== "0") {   // 0- Fecha inicial <= final 1- Fecha final < inicial 
            $mensaje .= "<br> <strong> Error. Fecha de fallecimiento no puede ser superior a " . $res_fecha[9] . ".</strong>";  
            $ind_actualizar = 1; 
            $ind_error_fechas = 1;
        }
    } else {
            if ($res_fecha[3] !== "0") {   // Indicador de error de fecha inicial 0- Correcto, Resto- Error
                $mensaje .= "<br> <strong> Fecha de fallecimiento. " . $res_fecha[4] . "</strong>";  
                $ind_actualizar = 1;
                $ind_error_fechas = 1;
            }
            if ($res_fecha[5] !== "0") {   // Indicador de error de fecha final 0- Correcto, Resto- Error
                $mensaje .= "<br> <strong> Fecha de fallecimiento. " . $res_fecha[6] . "</strong>";  
                $ind_actualizar = 1;
                $ind_error_fechas = 1;
            }
        }

    // Comparar fechas de nacimiento y fallecimiento
    if ($ind_error_fechas == 0) {
        list($respuesta) = comparar_fechas($res[5], $res[6]);    
        $res_fecha = explode("#&", $respuesta);
        
        if ($res_fecha[0] == 0) {        // Indicador de validación 0- Correcto, Resto- Error
            if ($res_fecha[7] !== "0") {   // 0- Fecha inicial <= final 1- Fecha final < inicial 
                $mensaje .= "<br> <strong> Fecha de fallecimiento (" . $res_fecha[9] . " no puede ser inferior a fecha de nacimiento (" . $res_fecha[8] . ").</strong>";  
                $ind_actualizar = 1; 
            }
        } else {
                if ($res_fecha[3] !== 0) {   // Indicador de error de fecha inicial 0- Correcto, Resto- Error
                    $mensaje .= "<br> <strong> Fecha de nacimiento. " . $res_fecha[4] . "</strong>";  
                    $ind_actualizar = 1;
                    $ind_error_fechas = 1;
                }
                if ($res_fecha[5] !== 0) {   // Indicador de error de fecha final 0- Correcto, Resto- Error
                    $mensaje .= "<br> <strong> Fecha de fallecimiento. " . $res_fecha[6] . "</strong>";  
                    $ind_actualizar = 1;
                    $ind_error_fechas = 1;
                }
            }
    }
    $mascara = array("s", "a", "d", "m");   // Máscara de fecha ssaa-mm-dd para pasar a valor ("")
    $fecha_ajustada = str_replace($mascara, "", $res[5]);
    
    if ($fecha_ajustada == "--") {
        $fecha_ajustada = "";
    } 

    $campos_bdatos .= "#&" . $fecha_ajustada;      // fecha nacimiento 

    $fecha_ajustada = str_replace($mascara, "", $res[6]);

    if ($fecha_ajustada == "--") {
        $fecha_ajustada = "";
    } 

    $campos_bdatos .= "#&" . $fecha_ajustada;      // fecha fallecimiento

    // Lugar de nacimiento
    $campos_bdatos .= "#&" . $res[7];

    // Validar país de nacimiento
    $funcion_obtener_clave = 1;
    $tabla = "País";
    $datos_entrada = $res[8];
    $ind_lectura= "";
    $bdatos_clave= 0;   

    list($ind_error_codigo, $ind_validar_codigo, $mensaje_codigo, $campos_salida) 
                            = tabla_codigos($funcion_obtener_clave, $tabla, $datos_entrada);
                            
    if ($ind_error_codigo == 0) {
        if ($ind_validar_codigo == 1)  {
            $mensaje .= "<br> <strong> País de nacimiento no existe.</strong> Será ignorada. Dar de alta en tabla de códigos";  
            $ind_validar = 1;   
        } else {
            $res_codigo = explode("#&", $campos_salida);
            $bdatos_clave= $res_codigo[0];  
            }
    } else {
            $mensaje .= "<br> " . $mensaje_codigo;
        }

    $campos_bdatos .= "#&" . $bdatos_clave;

    // Lugar de fallecimiento
    $campos_bdatos .= "#&" . $res[9];
    
    // Validar país de fallecimiento  
    $funcion_obtener_clave = 1;
    $tabla = "País";
    $datos_entrada = $res[10];
    $ind_lectura= "";
    $bdatos_clave= 0;   

    list($ind_error_codigo, $ind_validar_codigo, $mensaje_codigo, $campos_salida) 
                            = tabla_codigos($funcion_obtener_clave, $tabla, $datos_entrada);
                            
    if ($ind_error_codigo == 0) {
        if ($ind_validar_codigo == 1)  {
            $mensaje .= "<br> <strong> País de fallecimiento no existe.</strong> Será ignorada. Dar de alta en tabla de códigos";  
            $ind_validar = 1;   
        } else {
            $res_codigo = explode("#&", $campos_salida);
            $bdatos_clave= $res_codigo[0];  
            }
    } else {
            $mensaje .= "<br> " . $mensaje_codigo;
        }
        
    $campos_bdatos .= "#&" . $bdatos_clave;

    // Web
    $campos_bdatos .= "#&" . $res[11];

    return [$ind_actualizar, $ind_validar, $mensaje, $campos_bdatos];
}

// Actualización campos de formulario de autor
function actualizarSubmit($campos_pantalla, $campos_bdatos) {
    
    require 'connect.php';

    $ind_actualizar = 0;
    $mensaje_actualizar = "";

    $res = explode("#&", $campos_bdatos);

    if ($res[1] == "alta") {
        
        $Autor = $res[2];
        $FNacimiento = $res[5];
        $FDefunción = $res[6];
        $LNacimiento = $res[7];
        $PNacimiento = $res[8];
        $LFallecimiento = $res[9];
        $PFallecimiento = $res[10];
        $Nacionalidad = $res[3];
        $CLiteraria = $res[4];
        $WEB = $res[11];

        $sql="INSERT INTO tgr02_autores(cGR02_Autor, cGR02_FNacimiento, cGR02_FDefunción, cGR02_LNacimiento, 
                                        cGR02_PNacimiento, cGR02_LFallecimiento, cGR02_PFallecimiento, 
                                        cGR02_Nacionalidad, cGR02_CLiteraria, cGR02_WEB) 
                    VALUES ('$res[2]', '$res[5]', '$res[6]', '$res[7]', '$res[8]', '$res[9]', '$res[10]', '$res[3]', 
                            '$res[4]', '$res[11]')";
		
        if($dbcon->query($sql) === true){
			$mensaje = "Alta efectuada <br />";

		} else {
				require '../basedatos/errores_db.php';			/* Función para analizar errores DB */ 
                $ind_actualizar = 1;
                $mensaje_actualizar = $mensaje;
			} 
        
    } else { 
            if ($res[1] == "edición") {
                $sql= "UPDATE tgr02_autores 
                            SET cGR02_FNacimiento='$res[5]',
                                cGR02_FDefunción='$res[6]',
                                cGR02_LNacimiento='$res[7]',
                                cGR02_PNacimiento='$res[8]',
                                cGR02_LFallecimiento='$res[9]',
                                cGR02_PFallecimiento='$res[10]',
                                cGR02_Nacionalidad='$res[3]',
                                cGR02_CLiteraria='$res[4]',
                                cGR02_WEB='$res[11]',
                                cGR02_TSUltCambio='CURRENT_TIMESTAMP'
                            WHERE cGR02_Autor = '$res[2]'";

                if($dbcon->query($sql) === true){
                    $mensaje = "Datos actualizados <br />";       
                } else {
                        require '../basedatos/errores_db.php';			/* Función para analizar errores DB */ 
                        $ind_actualizar = 1;
                        $mensaje_actualizar = $mensaje;
                    }                
            } else {
                    if ($res[1] == "baja") {
                
                    } 
                } 
                
        }


    return [$ind_actualizar, $mensaje_actualizar];   
}    
?>