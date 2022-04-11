<?php
/* Tratamiento de fechas (función, ....campos necesarios para esa función ....)
    Las fechas válidas serán con formato ssaa-mm-dd donde "-" es un delimitador 
    Función: 1- Validar fecha
        Entrada: Función / Fecha
        Salida : Indicador de fecha correcta (0) o errónea (1)
    Función: 2- Validar fecha y sumar(+)/ restar(-) años, meses y/o días
        Entrada: Función / Fecha / años / meses / días a sumar restar
        Salida : Indicador de fecha correcta (0) o errónea (1)
                 Fecha calculada (fecha de entrada si no ha podido ser calculada)
    Función: 3- Comparar fechas y dar diferencia: total días / diferencia en años, meses y días
        Entrada: Función / Fecha1 / Fecha2
        Salida : Indicador de primera fecha correcta (0) o errónea (1) 
                 Indicador de segunda fecha correcta (0) o errónea (1)
                 Indicador de cuál fecha es mayor: 0- Primera menor o igual, 1- Segunda menor 
                 Diferencia de fechas en días
                 Diferencia de fechas en años, meses y días
    Función: 4- Días del año
        Entrada: Función / Año
        Salida : Indicador año correcto (0) o erróneo (1)
                 Días. 0 si el año es incorrecto
    Función: 5- Fecha fin de mes
        Entrada: Función / Fecha de la que se quiere saber cuál es el último día del mes
        Salida : Indicador de fecha correcta (0) o errónea (1)
                 Fecha de fin de mes. Nula si entrada es incorrecta.
*/
function fechas($funcion, $campos){
    $ind_validar = 0;       /* 0- correcto resto- error */
    $mensaje = "";
    $campos_salida = "";
    $res = explode("#&", $campos);

    /* Fecha */
    switch ($funcion) {  
        case 1: {     /* Función: 1- Validar fecha */
            
            if ($res[0] !== "") {
                list($ind_validar, $mensaje, $fechaSSAA_MM_DD) = validar_fecha ($res[0]);
                if ($ind_validar == 0) {
                    $campos_salida = $funcion . "#&" . $fechaSSAA_MM_DD;    
                }   
            } 
            return [$ind_validar, $mensaje, $campos_salida]; 
        break;  
        }

        case 2:{     /* Validar fecha y sumar(+)/ restar(-) años, meses y/o días */
            
            if ($res[0] !== "") {
                $ind_validar = 0;
                list($ind_validar, $mensaje, $fechaSSAA_MM_DD) = validar_fecha ($res[0]);
                if ($ind_validar == 0) {
                    list($ind_validar, $mensaje, $fechaSSAA_MM_DD)
                         = nueva_fecha ($fechaSSAA_MM_DD, $res[1], $res[2], $res[3]);
                    
                    if ($ind_validar == 0) {
                        $campos_salida = $funcion . "#&" . $fechaSSAA_MM_DD;    
                    }        
                }
            }
            return [$ind_validar, $mensaje, $campos_salida]; 
        break;  
        }
        
        case 3:{     /* Función: 3- Comparar fechas y dar diferencia: total días / diferencia en años, meses y días */
            $mensaje1 = "";
            $mensaje2 = "";
            
            $dif_annos = 0;
            $dif_meses = 0;
            $dif_dias = 0;
            $dif_total_dias = 0; 

            $ind_orden = 0;
            $ind_error1 = 0;
            $ind_error2 = 0;

            if ($res[0] !== "") {
                list($ind_error1, $mensaje_error, $fechaSSAA_MM_DD1) = validar_fecha ($res[0]);
                if ($ind_error1 !== 0) { /* Primera fecha comparación */
                    $ind_error1 = 1;
                    $ind_validar = 1;
                    $mensaje1 = $mensaje_error; 
                }     
            }

            if ($res[1] !== "") { /* Segunda fecha comparación */
                list($ind_error2, $mensaje_error, $fechaSSAA_MM_DD2) = validar_fecha ($res[1]);
                if ($ind_error2 !== 0){ 
                        $ind_error2 = 1;
                        $ind_validar = 1;
                        $mensaje2 = $mensaje_error; 
                    }
            }
                  
            if ($res[0] !== "" 
            && $res[1] !== "") {
                if ($ind_validar == 0) {
                        $fechaPrimera = new DateTime($fechaSSAA_MM_DD1);
                        $fechaSegunda = new DateTime($fechaSSAA_MM_DD2);
                        if ($fechaPrimera <= $fechaSegunda) {
                            $ind_orden = 0;                   
                            $intvl = date_diff($fechaPrimera,$fechaSegunda);
                        } else {
                                $ind_orden = 1; 
                                $intvl = date_diff($fechaSegunda,$fechaPrimera);
                            }

                        $dif_annos = $intvl->y;
                        $dif_meses = $intvl->m;
                        $dif_dias = $intvl->d;
                        $dif_total_dias =  $intvl->days;     
                }  
            }  

            $campos_salida = $funcion . "#&" . $ind_error1 ."#&" . $mensaje1 . "#&" . $ind_error2 
                . "#&" . $mensaje2 . "#&" . $ind_orden . "#&" . $fechaSSAA_MM_DD1 .  "#&" . $fechaSSAA_MM_DD2 
                . "#&" . $dif_total_dias . "#&" . $dif_annos . "#&" . $dif_meses . "#&" . $dif_dias;
            
            return [$ind_validar, $mensaje, $campos_salida]; 
        break;  
        }
        
        case 4:{     /* Función: 4- Días del año */
            
            $dif_total_dias =  0;
            
            if ($res[0] !== ""){
                $fecha_inicio_anno = $res[0] . "/01/01";
                $fecha_prox_anno = $res[0] + 1 . "/01/01";
                $fechaPrimera = new DateTime($fecha_inicio_anno);
                $fechaSegunda = new DateTime($fecha_prox_anno);
                $intvl = date_diff($fechaPrimera,$fechaSegunda);
                $dif_total_dias =  $intvl->days;               
                $campos_salida = $funcion . "#&" . $dif_total_dias;        
            }  

            return [$ind_validar, $mensaje, $campos_salida]; 
            break;  
        }  

        case 5:{     /* Fecha fin de mes */
            
            $dif_total_dias =  0;
            
            if ($res[0] !== ""){
                list($ind_validar, $mensaje, $fechaSSAA_MM_DD) = validar_fecha ($res[0]);
                if ($ind_validar == 0) {
                    $fecha_inicio_mes = date("Y", $fechaSSAA_MM_DD);
                    $fecha_inicio_mes .= "-" . date("Y", $fechaSSAA_MM_DD);
                    $fecha_inicio_mes .= "-01";
                    list($ind_validar, $mensaje, $fechaSSAA_MM_DD)
                         = nueva_fecha ($fecha_inicio_mes, 0, 1, -1);
                    
                    if ($ind_validar == 0) {
                        $campos_salida = $funcion . "#&" . $fechaSSAA_MM_DD;    
                    }        
                }
            }      
            return [$ind_validar, $mensaje, $campos_salida]; 
            break;  
        }  

        default:
                
        break;
    } 
    
}

function validar_fecha ($fecha) {
    $cod_retorno = 0;
    $mensaje = "";
    $fecha_salida = "";

    $delimitadores = [ '/' , '.', '-' ]; 
    $fecha=str_replace($delimitadores,'/',$fecha);
    $fecha_elemento = explode('/', $fecha); 

    if (ctype_digit($fecha_elemento[0])
    &&  ctype_digit($fecha_elemento[1])
    &&  ctype_digit($fecha_elemento[2])) {
        $fecha_elemento[0] = str_pad($fecha_elemento[0], 4, "0", STR_PAD_LEFT);
        $fecha_salida = $fecha_elemento[0] . "-" . $fecha_elemento[1] . "-" . $fecha_elemento[2];
        if(!checkdate($fecha_elemento[1], $fecha_elemento[2], $fecha_elemento[0])){
            $cod_retorno = 1; 
            $mensaje = "Error. Fecha ilógica."; 
        }
    } else {
            $cod_retorno = 1; 
            $mensaje = "Error. Fecha errónea."; 
        }
    
    return [$cod_retorno, $mensaje, $fecha_salida];
}

function nueva_fecha ($fecha, $annos, $meses, $dias) {
    $cod_retorno = 0;
    $mensaje = "";
    $fecha_salida = $fecha;

    if (is_numeric($annos)) {
        $fecha_salida = date("Y-m-d",strtotime($fecha_salida."$annos year"));
    }
   
    if (is_numeric($meses)) {
        $fecha_salida = date("Y-m-d",strtotime($fecha_salida."$meses month"));
    }
    
    if (is_numeric($dias)) {
        $fecha_salida = date("Y-m-d",strtotime($fecha_salida."$dias day"));
    }
    
    return [$cod_retorno, $mensaje, $fecha_salida];
}

?>