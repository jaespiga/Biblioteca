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
            $ind_validar = 0;       /* 0- correcto resto- error */
            $mensaje = "";
            $campos_salida = "";

            if ($res[0] !== "") {
                list($ind_validar, $mensaje, $fechaSSAA_MM_DD) = validar_fecha ($res[0]);
                if ($ind_validar == 0) {
                    $campos_salida = $fechaSSAA_MM_DD;    
                }    
            } 
            return [$ind_validar, $mensaje, $campos_salida]; 
        break;  
        }

        case 2:{     /* Validar fecha y sumar(+)/ restar(-) años, meses y/o días */
            $ind_validar = 0;       /* 0- correcto resto- error */
            $mensaje = "";
            $campos_salida = "";

            if ($res[0] !== "") {
                $ind_validar = 0;
                list($ind_validar, $mensaje, $fechaSSAA_MM_DD) = validar_fecha ($res[0]);
                if ($ind_validar == 0) {
                    list($ind_validar, $mensaje, $fechaSSAA_MM_DD)
                         = calcular_fecha ($fechaSSAA_MM_DD, $res[1], $res[2], $res[3]);
                    
                    if ($ind_validar == 0) {
                        $campos_salida = $fechaSSAA_MM_DD;    
                    }        
                }
            }
            return [$ind_validar, $mensaje, $campos_salida]; 
        break;  
        }
        
        case 3:{     /* Función: 3- Comparar fechas y dar diferencia: total días / diferencia en años, meses y días */
            $ind_validar = 0;       /* 0- correcto resto- error */
            $mensaje = "";
            $campos_salida = "";

            if ($res[0] !== "") {
                list($ind_error1, $mensaje_error, $fechaSSAA_MM_DD1) = validar_fecha ($res[0]);
                if ($ind_error1 !== 0) { /* Primera fecha comparación */
                    $ind_error1 = 1;
                    $ind_validar = 1;
                    $mensaje .= "Error. Falta primera fecha de la comparación."; 
                }     
            }

            if ($res[1] !== "") { /* Segunda fecha comparación */
                list($ind_error2, $mensaje_error, $fechaSSAA_MM_DD2) = validar_fecha ($res[0]);
                if ($ind_error2 !== 0){ 
                        $ind_error2 = 1;
                        $ind_validar = 1;
                        $mensaje .= "     " . $mensaje_error; 
                    }
            } else {
                    $ind_error2 = 1;
                    $ind_validar = 1;
                    $mensaje .= "     " . "Error. Falta segunda fecha de la comparación.";  
                }
                  
            $dif_annos = 0;
            $dif_meses = 0;
            $dif_dias = 0;
            $dif_total_dias = 0; 

            if ($ind_validar == 0) {             $fechaPrimera = new DateTime($fechaSSAA_MM_DD1);
                    $fechaSegunda = new DateTime($fechaSSAA_MM_DD2);
                    if ($fechaPrimera >= $fechaSegunda) {
                    $ind_orden = 0;                   
                    $intvl = $fechaPrimera->diff($fechaSegunda);
                    } else {
                            $ind_orden = 1; 
                            $intvl = $fechaSegunda->diff($fechaPrimera);
                        }

                    $dif_annos = $intvl->y;
                    $dif_meses = $intvl->m;
                    $dif_dias = $intvl->d;
                    $dif_total_dias =  $intvl->days;     
            }    

            $campos_salida = $ind_error1+  "#&" + $ind_error2+  "#&" + $ind_orden +  "#&" 
                +  $dif_total_dias +  "#&" + $dif_annos +  "#&" + $dif_meses +  "#&" + $dif_dias;
            return [$ind_validar, $mensaje, $campos_salida]; 
        break;  
        }

        default:
                
        break;
    } 
    

    if ($fecha == "") {
        $respuesta = "0";
    } else {
            $delimitadores = [ '/' , '.' ]; 
            $fecha=str_replace($delimitadores,'/',$fecha);
            $valores = explode('-', $fecha);
            if(count($valores) == 3 && checkdate($valores[1], $valores[2], $valores[0])){
                $fechaactual = date('Y-m-d'); // Fecha del día
                $nuevafecha = date("Y-m-d",strtotime($fechaactual."$annos year"));

                $valoresReferencia = explode('-', $nuevafecha);

                $diaPrimera     = $valores[2];  
                $mesPrimera     = $valores[1];  
                $anyoPrimera    = $valores[0]; 

                $diaSegunda     = $valoresReferencia[2];  
                $mesSegunda     = $valoresReferencia[1];  
                $anyoSegunda    = $valoresReferencia[0];

                $diasPrimeraJuliano = gregoriantojd($mesPrimera, $diaPrimera, $anyoPrimera);  
                $diasSegundaJuliano = gregoriantojd($mesSegunda, $diaSegunda, $anyoSegunda);     
                
                if ($diasPrimeraJuliano > $diasSegundaJuliano) {
                    $respuesta = "2";   // Fecha superior a fecha referencia
                    $respuesta = "2". "#&" . $diaSegunda . "-" . $mesSegunda . "-" . $anyoSegunda;
                } else {
                    $respuesta = "0";   // Fecha válida
                    }
            } else {
                $respuesta = "1";       // Fecha ilógica
        }      
    }
    echo $respuesta;
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
        str_pad($fecha_elemento[0], 4, "0", STR_PAD_LEFT);
        $fecha_salida = $fecha_elemento[0] + $fecha_elemento[1] +$fecha_elemento[2];
    } else {
            $cod_retorno = 1; 
            $mensaje = "Error. Fecha errónea."; 
        }
    
    return [$cod_retorno, $mensaje, $fecha_salida];
}

function calcular_fecha ($fecha, $annos, $meses, $dias) {
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