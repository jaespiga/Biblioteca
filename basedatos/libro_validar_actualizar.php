<?php
    
// Validación de los campos de la pantalla de libros y su actualización en la base de datos

list ($respuesta) = libro_validar_actualizar();
echo $respuesta;

// Función para validar todos los campos de libro
function libro_validar_actualizar() {

    $campos_pantalla = $_POST['param1'];

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
   
    require_once 'connect.php';
    
    require_once '../basedatos/tabla_codigos.php';  // tratamiento de todas las operaciones de las tablas de códigos                          
    require_once '../basedatos/leer_datos.php';  // leer datos de Autor / Libro / Lectura
    require_once '../rutinas/Fechas_tratamientos_bloques.php';  // Bloques de operaciones sobre funciones de fechas
    require_once '../rutinas/Fechas_tratamientos.php';  // Funciones de validación de fechas


    $ind_actualizar = 0;    // 0- si actualizar, 1- no actualizar
    $ind_validar = 0;     // 0- sin incidencias, 1- con incidencias
    $mensaje = "";

    $mascara = array("s", "a", "d", "m");   // Máscara de fecha ssaa-mm-dd para pasar a valor ("")

    $res = explode("#&", $campos);
    
    $campos_bdatos = $res[0] . "#&" . $res[1];    // Apartado (Libro) / Operación

    // Validar clave de la página web activa

    // Validar libro
    echo "validar libro";
    if ($res[2] == "") { 
        $mensaje = "Nombre del libro tiene que estar informado"; 
        $ind_actualizar = 1; 
        return [$ind_actualizar, $ind_validar, $mensaje, $campos_bdatos];  
    } else {
            list ($ind_error, $mensaje, $datos_salida) = leerDatosLibro($res[2]);
            
            if ($ind_error == 0) {

                if ($datos_salida == ""){ 
                    if ($res[1] !== "alta") {
                        $mensaje = "Error. Libro no existe.";  
                        $ind_actualizar = 1;   
                        return [$ind_actualizar, $ind_validar, $mensaje, $campos_bdatos];  
                    }
                } else {
                            if ($res[1] == "alta") {
                                $mensaje = "Error. Autor ya existe.";  
                                $ind_actualizar = 1;   
                                return [$ind_actualizar, $ind_validar, $mensaje, $campos_bdatos];  
                            } else {
                                    $fila = explode("#&", $datos_salida);
                                    if ($res[12] !== $fila[15]) {
                                        $mensaje = "Error. Datos del libro han sido modificados desde otro terminal. Refresque datos y repita operación.";  
                                        $ind_actualizar = 1; 
                                        return [$ind_actualizar, $ind_validar, $mensaje, $campos_bdatos];   
                                    }
                                };
                        } 
            } else {
                    $ind_actualizar = 1;
                    return [$ind_actualizar, $ind_validar, $mensaje, $datos_salida];  
                }  
        }

        $campos_bdatos .= "#&" . $res[2];    // Libro
    
    // Validar autor
    if ($res[3] == "") { 
        $mensaje = "Nombre del autor tiene que estar informado"; 
        $ind_actualizar = 1; 
        return [$ind_actualizar, $ind_validar, $mensaje, $campos_bdatos];  
    } else {
            list ($ind_error, $mensaje, $datos_salida) = leerDatosAutor($res[3]);
            
            if ($ind_error == 0) {

                if ($datos_salida == ""){ 
                    $mensaje = "Error. Libro no existe.";  
                    $ind_actualizar = 1;   
                    return [$ind_actualizar, $ind_validar, $mensaje, $campos_bdatos];      
                } 
            } else {
                    $ind_actualizar = 1;
                    return [$ind_actualizar, $ind_validar, $mensaje, $datos_salida];  
                }  
        }

        $campos_bdatos .= "#&" . $res[3];    // Autor
    
    // Validar editorial
    $funcion_obtener_clave = 1;
    $tabla = "Editorial";
    $datos_entrada = $res[4];
    $ind_lectura= "";
    $bdatos_clave= 0;   

    list($ind_error_codigo, $ind_validar_codigo, $mensaje_codigo, $campos_salida) 
                            = tabla_codigos($funcion_obtener_clave, $tabla, $datos_entrada);
    if ($ind_error_codigo == 0) {
        if ($ind_validar_codigo == 1)  {
            $mensaje .= "<br> <strong> Editorial no existe.</strong> Será ignorada. Dar de alta en tabla de codigos";  
            $ind_validar = 1;   
        } else {
            $res_codigo = explode("#&", $campos_salida);
            $bdatos_clave= $res_codigo[0];  
            }
    } else {
            $mensaje .= "<br> " . $mensaje_codigo;
        }

    $campos_bdatos .= "#&" . $bdatos_clave;

    // Validar fecha de publicación
    $ind_error_fechas = 0;      

    $fecha = $res[5];
    $fecha_referencia = date('Y-m-d');
    
    $annos = 0;                 // Años a sumar/restar a la fecha del día
    $meses = 0;                 // Meses a sumar/restar a la fecha del día
    $dias = 0;                  // Días a sumar/restar a la fecha del día
    
    list($respuesta) = validar_limites_fecha($fecha, $fecha_referencia, $annos, $meses, $dias);
    
    $res_fecha = explode("#&", $respuesta);
    
    if ($res_fecha[0] == "0") {        // Indicador de validación 0- Correcto, Resto- Error
        if ($res_fecha[7] !== "0") {   // 0- Fecha inicial <= final 1- Fecha final < inicial 
            $mensaje .= "<br> <strong> Aviso. Fecha de publicación no puede ser superior a la del día.</strong>";  
            $ind_actualizar = 1;
            $ind_error_fechas = 1;
        }
    } else {
            if ($res_fecha[3] !== "0") {   // Indicador de error de fecha inicial 0- Correcto, Resto- Error
                $mensaje .= "<br> <strong> Fecha de publicación. " . $res_fecha[4] . "</strong>";  
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
            $fecha_ajustada = str_replace($mascara, "", $res[5]);
            if ($fecha_ajustada == "--") {
                $fecha_ajustada = "";
            } 
            $campos_bdatos .= "#&" . $fecha_ajustada;       // fecha publicación         
        } else {
                $campos_bdatos .= "#&" . $res[5];           // fecha de publicación errónea de entrada
            }

    // Propietario
    $campos_bdatos .= "#&" . $res[6];
    
    // Validar fecha de adquisición
    $ind_error_fechas = 0;      

    $fecha = $res[7];
    $fecha_referencia = date('Y-m-d');
    
    $annos = 0;                 // Años a sumar/restar a la fecha del día
    $meses = 0;                 // Meses a sumar/restar a la fecha del día
    $dias = 0;                  // Días a sumar/restar a la fecha del día
    
    list($respuesta) = validar_limites_fecha($fecha, $fecha_referencia, $annos, $meses, $dias);
    
    $res_fecha = explode("#&", $respuesta);
    
    if ($res_fecha[0] == "0") {        // Indicador de validación 0- Correcto, Resto- Error
        if ($res_fecha[7] !== "0") {   // 0- Fecha inicial <= final 1- Fecha final < inicial 
            $mensaje .= "<br> <strong> Aviso. Fecha de adquisición no puede ser superior a la del día.</strong>";  
            $ind_validar = 1; 
        }
    } else {
            if ($res_fecha[3] !== "0") {   // Indicador de error de fecha inicial 0- Correcto, Resto- Error
                $mensaje .= "<br> <strong> Fecha de adquisición. " . $res_fecha[4] . "</strong>";  
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
        $campos_bdatos .= "#&" . $fecha_ajustada;       // fecha adquisición         
    } else {
            $campos_bdatos .= "#&" . $res[7];           // fecha de adquisición errónea de entrada
        }
  
    // Validar género literario
    $funcion_obtener_clave = 1;
    $tabla = "GenLit";
    $datos_entrada = $res[8];
    $ind_lectura= "";
    $bdatos_clave= 0;   

    list($ind_error_codigo, $ind_validar_codigo, $mensaje_codigo, $campos_salida) 
                            = tabla_codigos($funcion_obtener_clave, $tabla, $datos_entrada);

    if ($ind_error_codigo == 0) {
        if ($ind_validar_codigo == 1)  {
            $mensaje .= "<br> <strong> Género literario no existe.</strong> Será ignorado. Dar de alta en tabla de codigos";  
            $ind_validar = 1;   
        } else {
            $res_codigo = explode("#&", $campos_salida);
            $bdatos_clave= $res_codigo[0];  
            }
    } else {
            $mensaje .= "<br> " . $mensaje_codigo;
        }

    $campos_bdatos .= "#&" . $bdatos_clave;

    // Validar idioma
    $funcion_obtener_clave = 1;
    $tabla = "Idioma";
    $datos_entrada = $res[9];
    $ind_lectura= "";
    $bdatos_clave= 0;   

    list($ind_error_codigo, $ind_validar_codigo, $mensaje_codigo, $campos_salida) 
                            = tabla_codigos($funcion_obtener_clave, $tabla, $datos_entrada);

    if ($ind_error_codigo == 0) {
        if ($ind_validar_codigo == 1)  {
            $mensaje .= "<br> <strong> Género literario no existe.</strong> Será ignorado. Dar de alta en tabla de codigos";  
            $ind_validar = 1;   
        } else {
            $res_codigo = explode("#&", $campos_salida);
            $bdatos_clave= $res_codigo[0];  
            }
    } else {
            $mensaje .= "<br> " . $mensaje_codigo;
        }

    $campos_bdatos .= "#&" . $bdatos_clave;

    // Validar soporte físico del libro
    $funcion_obtener_clave = 1;
    $tabla = "SopLib";
    $datos_entrada = $res[10];
    $ind_lectura= "";
    $bdatos_clave= 0;   

    list($ind_error_codigo, $ind_validar_codigo, $mensaje_codigo, $campos_salida) 
                            = tabla_codigos($funcion_obtener_clave, $tabla, $datos_entrada);

    if ($ind_error_codigo == 0) {
        if ($ind_validar_codigo == 1)  {
            $mensaje .= "<br> <strong> Soporte físico del libro no existe.</strong> Será ignorado. Dar de alta en tabla de codigos";  
            $ind_validar = 1;   
        } else {
            $res_codigo = explode("#&", $campos_salida);
            $bdatos_clave= $res_codigo[0];  
            }
    } else {
            $mensaje .= "<br> " . $mensaje_codigo;
        }

    $campos_bdatos .= "#&" . $bdatos_clave;

    // Validar estatus de situación del libro
    $funcion_obtener_clave = 1;
    $tabla = "SitLib";
    $datos_entrada = $res[11];
    $ind_lectura= "";
    $bdatos_clave= 0;   

    list($ind_error_codigo, $ind_validar_codigo, $mensaje_codigo, $campos_salida) 
                            = tabla_codigos($funcion_obtener_clave, $tabla, $datos_entrada);

    if ($ind_error_codigo == 0) {
        if ($ind_validar_codigo == 1)  {
            $mensaje .= "<br> <strong> Estatus de situación del libro no existe.</strong> Será ignorado. Dar de alta en tabla de codigos";  
            $ind_validar = 1;   
        } else {
            $res_codigo = explode("#&", $campos_salida);
            $bdatos_clave= $res_codigo[0];  
            }
    } else {
            $mensaje .= "<br> " . $mensaje_codigo;
        }

    $campos_bdatos .= "#&" . $bdatos_clave;

    // Persona asociada al estatus de situación del libro
    $campos_bdatos .= "#&" . $res[12];
    
    // Validar fecha de entrada en esa situación del libro
    $ind_error_fechas = 0;      

    $fecha = $res[13];
    $fecha_referencia = date('Y-m-d');
    
    $annos = 0;                 // Años a sumar/restar a la fecha del día
    $meses = 0;                 // Meses a sumar/restar a la fecha del día
    $dias = 0;                  // Días a sumar/restar a la fecha del día
    
    list($respuesta) = validar_limites_fecha($fecha, $fecha_referencia, $annos, $meses, $dias);
    
    $res_fecha = explode("#&", $respuesta);
    
    if ($res_fecha[0] == "0") {        // Indicador de validación 0- Correcto, Resto- Error
        if ($res_fecha[7] !== "0") {   // 0- Fecha inicial <= final 1- Fecha final < inicial 
            $mensaje .= "<br> <strong> Aviso. Fecha de entrada en la situación en la que se encuentra el libro no puede ser superior a la del día.</strong>";  
            $ind_validar = 1; 
        }
    } else {
            if ($res_fecha[3] !== "0") {   // Indicador de error de fecha inicial 0- Correcto, Resto- Error
                $mensaje .= "<br> <strong> Fecha de entrada en la situación en la que se encuentra el libro. " . $res_fecha[4] . "</strong>";  
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
        $fecha_ajustada = str_replace($mascara, "", $res[13]);
        if ($fecha_ajustada == "--") {
            $fecha_ajustada = "";
        } 
        $campos_bdatos .= "#&" . $fecha_ajustada;       // fecha de entrada en esa situación del libro
    } else {
            $campos_bdatos .= "#&" . $res[13];           // fecha de entrada en esa situación del libro errónea
        }

    // Sinopsis
    $campos_bdatos .= "#&" . $res[13];
    
    // Web
    $campos_bdatos .= "#&" . $res[11];

    // VALIDACIONES RELACIONALES 

    // Comparar fechas de publicación y adquisición
    if ($ind_error_fechas == 0) {
        list($respuesta) = comparar_fechas($res[5], $res[7]);    
        $res_fecha = explode("#&", $respuesta);
        
        if ($res_fecha[0] == 0) {        // Indicador de validación 0- Correcto, Resto- Error
            if ($res_fecha[7] !== "0") {   // 0- Fecha inicial <= final 1- Fecha final < inicial 
                $mensaje .= "<br> <strong> Fecha de adquisición (" . $res_fecha[9] . " no puede ser inferior a fecha de publicación (" . $res_fecha[8] . ").</strong>";  
                $ind_actualizar = 1; 
            }
        } else {
                if ($res_fecha[3] !== 0) {   // Indicador de error de fecha inicial 0- Correcto, Resto- Error
                    $mensaje .= "<br> <strong> Fecha de publicación. " . $res_fecha[4] . "</strong>";  
                    $ind_actualizar = 1;
                    $ind_error_fechas = 1;
                }
                if ($res_fecha[5] !== 0) {   // Indicador de error de fecha final 0- Correcto, Resto- Error
                    $mensaje .= "<br> <strong> Fecha de adquisición. " . $res_fecha[6] . "</strong>";  
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

    return [$ind_actualizar, $ind_validar, $mensaje, $campos_bdatos];
}

// Actualización campos de formulario de autor
function actualizarSubmit($campos_pantalla, $campos_bdatos) {
    
    require 'connect.php';

    $ind_actualizar = 0;
    $mensaje_actualizar = "";

    $res = explode("#&", $campos_bdatos);

    if ($res[1] == "alta") {

        $sql="INSERT INTO tgr03_libros(cGR03_Título, cGR03_Autor, cGR03_Editorial, cGR03_FPublicación, 
                                        cGR03_FAdquisición, cGR03_Idioma, cGR03_Soporte, cGR03_Género, 
                                        cGR03_Propietario, cGR03_Sinopsis, cGR03_Estado_S, cGR03_Estado_Q_U, 
                                        cGR03_Estado_F, cGR03_WEB) 
                    VALUES ('$res[2]', '$res[3]', '$res[4]', '$res[5]', '$res[7]', '$res[9]', '$res[10]', 
                            '$res[8]', '$res[6]', '$res[14]', '$res[11]', '$res[12]', '$res[13]', '$res[15]')";
		
        if($dbcon->query($sql) === true){
			$mensaje = "Alta efectuada <br />";

		} else {
				require '../basedatos/errores_db.php';			/* Función para analizar errores DB */ 
                $ind_actualizar = 1;
                $mensaje_actualizar = $mensaje;
			} 
        
    } else { 
            if ($res[1] == "edición") {
                $sql= "UPDATE tgr03_libros 
                            SET cGR03_Autor ='$res[3]', 
                                cGR03_Editorial ='$res[4]', 
                                cGR03_FPublicación ='$res[5]', 
                                cGR03_FAdquisición ='$res[7]', 
                                cGR03_Idioma ='$res[9]', 
                                cGR03_Soporte ='$res[10]', 
                                cGR03_Género ='$res[8]', 
                                cGR03_Propietario ='$res[6]', 
                                cGR03_Sinopsis ='$res[14]', 
                                cGR03_Estado_S ='$res[11]', 
                                cGR03_Estado_Q_U ='$res[12]', 
                                cGR03_Estado_F ='$res[13]', 
                                cGR03_WEB ='$res[15]', 
                                cGR03_TSUltCambio= CURRENT_TIMESTAMP
                            WHERE cGR03_Título = '$res[2]'";

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