<?php
/* Tratamiento de fechas (función, ....campos necesarios para esa función ....)
    Las fechas válidas serán con formato ssaa-mm-dd donde "-" es un delimitador 
    Función: 1- Validar fecha
        Entrada: Función / Fecha
        Salida : Indicador de fecha correcta (0) o errónea (1)
                 Fecha válida en formato dd-mm-ssaa o espacios en caso contrario
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
    
    $mascara = array("s", "a", "d", "m", "0000-00-00");   // Máscara de fecha ssaa-mm-dd para pasar a valor ("--")

    $res = explode("#&", $campos);

    /* Fecha */
    switch ($funcion) {  
        case 1: {     /* Función: 1- Validar fecha */
            $fecha_ajustada = str_replace($mascara, "", $res[0]);

            if ($fecha_ajustada !== "--" 
            && $fecha_ajustada !== "") {
                list($ind_validar, $mensaje, $campos_salida) = validar_fecha ($fecha_ajustada);
                /* campos_salida es la misma fecha en formato: ssaa-mm-dd y dd-mm-ssaa o espacios  */
                if ($ind_validar == 0) {
                    $campos_salida = $funcion . "#&" . $campos_salida;    
                }   
            } 
            return [$ind_validar, $mensaje, $campos_salida]; 
        break;  
        }

        case 2:{     /* Validar fecha y sumar(+)/ restar(-) años, meses y/o días */
            
            $fecha_ajustada = str_replace($mascara, "", $res[0]);

            if ($fecha_ajustada !== "--"
            && $fecha_ajustada !== "") {
                list($ind_validar, $mensaje, $campos_salida) = validar_fecha ($fecha_ajustada);

                if ($ind_validar == 0) {
                    $fechas_elemento = explode("#&", $campos_salida);
                    $fechaSSAA_MM_DD = $fechas_elemento[0];

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

            $fecha_ajustada1 = str_replace($mascara, "", $res[0]);

            if ($fecha_ajustada1 !== "--"
            && $fecha_ajustada1 !== "") {
                list($ind_error1, $mensaje_error, $campos_salida) = validar_fecha ($fecha_ajustada1);

                if ($ind_error1 !== 0) { /* Primera fecha comparación */
                    $ind_error1 = 1;
                    $ind_validar = 1;
                    $mensaje1 = $mensaje_error; 
                } else {
                        $fechas_elemento = explode("#&", $campos_salida);
                        $fechaSSAA_MM_DD1 = $fechas_elemento[0];
                    }    
            }

            $fecha_ajustada2 = str_replace($mascara, "", $res[1]);

            if ($fecha_ajustada2 !== "--"
            && $fecha_ajustada2 !== "") { /* Segunda fecha comparación */
                list($ind_error2, $mensaje_error, $campos_salida) = validar_fecha ($fecha_ajustada2);
                if ($ind_error2 !== 0){ 
                        $ind_error2 = 1;
                        $ind_validar = 1;
                        $mensaje2 = $mensaje_error; 
                    } else {
                            $fechas_elemento = explode("#&", $campos_salida);
                            $fechaSSAA_MM_DD2 = $fechas_elemento[0];
                        }   
            }
                  
            if ($fecha_ajustada1 !== "--"
            && $fecha_ajustada1 !== "" 
            && $fecha_ajustada2 !== "--"
            && $fecha_ajustada2 !== "") {
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
            
            if ($res[0] !== "--"
            && $res[0] !== ""){
                $fecha_inicio_anno = $res[0] . "-01-01";
                $fecha_prox_anno = $res[0] + 1 . "-01-01";
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
            
            $fecha_ajustada = str_replace($mascara, "", $res[0]);

            if ($fecha_ajustada !== "--"
            && $fecha_ajustada !== "") {
            
                list($ind_validar, $mensaje, $fechaSSAA_MM_DD) = validar_fecha ($fecha_ajustada);
                if ($ind_validar == 0) {
                    $fechas_elemento = explode("#&", $campos_salida);
                    $fechaSSAA_MM_DD = $fechas_elemento[0];
                    
                    $fecha_inicio_mes = date("Y", $fechaSSAA_MM_DD);
                    $fecha_inicio_mes .= "-" . date("m", $fechaSSAA_MM_DD);
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
    $fecha_salida_ssaa_mm_dd = "";
    $fecha_salida_dd_mm_ssaa = "";
    $campos_salida="";
    
    $delimitadores = [ '/' , '.', '-' ]; 
    $fecha=str_replace($delimitadores,'/',$fecha);
    $fecha_elemento = explode("/", $fecha); 

    if (ctype_digit($fecha_elemento[0])
    &&  ctype_digit($fecha_elemento[1])
    &&  ctype_digit($fecha_elemento[2])) {
        $fecha_elemento[0] = str_pad($fecha_elemento[0], 4, "0", STR_PAD_LEFT);
        $fecha_salida_ssaa_mm_dd = $fecha_elemento[0] . "-" . $fecha_elemento[1] . "-" . $fecha_elemento[2];
        $fecha_salida_dd_mm_ssaa = $fecha_elemento[2] . "-" . $fecha_elemento[1] . "-" . $fecha_elemento[0];
        if(!checkdate($fecha_elemento[1], $fecha_elemento[2], $fecha_elemento[0])){
            $cod_retorno = 1; 
            $mensaje = "Error. Fecha ilógica."; 
        }
    } else {
            $cod_retorno = 1; 
            $mensaje = "Error. Fecha errónea."; 
        }
    $campos_salida = $fecha_salida_ssaa_mm_dd . "#&" . $fecha_salida_dd_mm_ssaa; 

    return [$cod_retorno, $mensaje, $campos_salida];
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