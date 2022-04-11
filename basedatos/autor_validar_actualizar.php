
<?php

// Validación de los campos de la pantalla de autores y su actualización en la base de datos

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
    
    require_once 'tabla_codigos.php';  // tratamiento de todas las operaciones de las tablas de códigos                          
    require_once '../rutinas/Fechas_tratamientos_bloques.php';  // Bloques de operaciones sobre funciones de fechas
    require_once '../rutinas/Fechas_tratamientos.php';  // Funciones de validación de fechas


    $ind_actualizar = 0;    // 0- si actualizar, 1- no actualizar
    $ind_validar = 0;     // 0- sin incidencias, 1- con incidencias
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
                    $ind_actualizar = 1;   
                    return [$ind_actualizar, $ind_validar, $mensaje, $campos_bdatos];  
                };
            } else {
                    if ($res[1] == "alta") {
                        $mensaje = "Error. Autor ya existe.";  
                        $ind_actualizar = 1;   
                        return [$ind_actualizar, $ind_validar, $mensaje, $campos_bdatos];  
                    };
                }   
        }

    $campos_bdatos = $res[2];
    
    // Validar nacionalidad
    $funcion_obtener_clave = 1;
    $tabla = "Nacionalidad";
    $datos_entrada = $res[3];
    $ind_lectura= "";
    $bdatos_clave= 0;   

    list($ind_error_codigo, $ind_validar_codigo, $mensaje_codigo, $campos_salida) 
                            = tabla_códigos($funcion, $tabla, $datos_entrada);
    if ($ind_error_codigo == 0) {
        if ($ind_validar_codigo == 1)  {
            $mensaje .= "<br> <strong> Nacionalidad no existe.</strong> Será ignorada. Dar de alta en tabla de códigos";  
            $ind_validar = 1;   
        } else {
            $res = explode("#&", $campos);
            $bdatos_clave= $res[0];  
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
                            = tabla_códigos($funcion, $tabla, $datos_entrada);

    if ($ind_error_codigo == 0) {
        if ($ind_validar_codigo == 1)  {
            $mensaje .= "<br> <strong> Corriente literaria no existe.</strong> Será ignorada. Dar de alta en tabla de códigos";  
            $ind_validar = 1;   
        } else {
            $res = explode("#&", $campos);
            $bdatos_clave= $res[0];  
            }
    } else {
            $mensaje .= "<br> " . $mensaje_codigo;
        }

    $campos_bdatos .= "#&" . $bdatos_clave;

    // Validar fecha de nacimiento

    $campos_funcion = $res[5];
    
    ssaa = document.getElementById(evento.target.name).value
                mm = document.getElementById('fnacmm').value
                dd = document.getElementById('fnacdd').value
                fecha = ssaa + "-" + mm + "-" + dd
                annos_referencia = -15  // Años a sumar/restar a la fecha del día
                meses_referencia = 0    // Meses a sumar/restar a la fecha del día
                dias_referencia = 0     // Días a sumar/restar a la fecha del día
    
    list($ind_validar, $mensaje, $campos_salida) 
                            = calcular_fechas($funcion_validar_fecha, $campos_funcion);
    
    if ($ind_validar == 0) {
        # code...
    } else {
        # code...
    }
                            
    
    // Validar país de nacimiento
    $funcion_obtener_clave = 1;
    $tabla = "País";
    $datos_entrada = $res[8];
    $ind_lectura= "";
    $bdatos_clave= 0;   

    list($ind_error_codigo, $ind_validar_codigo, $mensaje_codigo, $campos_salida) 
                            = tabla_códigos($funcion, $tabla, $datos_entrada);
                            
    if ($ind_error_codigo == 0) {
        if ($ind_validar_codigo == 1)  {
            $mensaje .= "<br> <strong> País de nacimiento no existe.</strong> Será ignorada. Dar de alta en tabla de códigos";  
            $ind_validar = 1;   
        } else {
            $res = explode("#&", $campos);
            $bdatos_clave= $res[0];  
            }
    } else {
            $mensaje .= "<br> " . $mensaje_codigo;
        }

    $campos_bdatos .= "#&" . $bdatos_clave;

    // Validar país de fallecimiento  
    $funcion_obtener_clave = 1;
    $tabla = "País";
    $datos_entrada = $res[10];
    $ind_lectura= "";
    $bdatos_clave= 0;   

    list($ind_error_codigo, $ind_validar_codigo, $mensaje_codigo, $campos_salida) 
                            = tabla_códigos($funcion, $tabla, $datos_entrada);
                            
    if ($ind_error_codigo == 0) {
        if ($ind_validar_codigo == 1)  {
            $mensaje .= "<br> <strong> País de fallecimiento no existe.</strong> Será ignorada. Dar de alta en tabla de códigos";  
            $ind_validar = 1;   
        } else {
            $res = explode("#&", $campos);
            $bdatos_clave= $res[0];  
            }
    } else {
            $mensaje .= "<br> " . $mensaje_codigo;
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