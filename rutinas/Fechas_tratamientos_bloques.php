<?php

// Funciones que preparan secuencias de operaciones con fechas

function validar_limites_fecha($fecha, $fecha_referencia, $annos, $meses, $dias){
/*
 Función 1 Validar limites de una fecha
        - Obtener fecha del día.
        - Calcular fecha referencia (a partir de una dada) en función de los años, meses, día  
        - Comparar fechas
*/  
    $ind_validar = 0;
    $mensaje = "";
    $campos_salida = "";      
    
    $funcion_validar_fecha = 1;
    $campos_funcion = $fecha;

    list($ind_validar, $mensaje, $campos_salida) 
                        = fechas($funcion_validar_fecha, $campos_funcion);

    if ($ind_validar == 0) {     
        // Obtener límite de fecha a no sobrepasar a partir de la del día
        $campos_funcion = $fecha_referencia . "#&" . $annos . "#&" . $meses . "#&" . $dias;

        $funcion_validar_limites_fecha = 2;
        list($ind_validar, $mensaje, $campos_salida) 
                            = fechas($funcion_validar_limites_fecha, $campos_funcion);

        if ($ind_validar == 0) {
            $elemento = explode ("#&", $campos_salida);
            $campos_funcion = $fecha. "#&" . $elemento[1];

            $funcion_comparar_fecha = 3;
            list($ind_validar, $mensaje, $campos_salida) 
                            = fechas($funcion_comparar_fecha, $campos_funcion); 
        } else {
                $funcion = $funcion_validar_fecha;
                $ind_error1 = 0;
                $mensaje1 = "";
                $ind_error2 = $ind_validar;
                $mensaje2 = $mensaje;
                $ind_orden = 0;
                $fechaSSAA_MM_DD1 = $fecha;
                $fechaSSAA_MM_DD2 = $fecha_referencia;
                $dif_total_dias = 0;
                $dif_annos = 0;
                $dif_meses = 0;
                $dif_dias = 0;
                $campos_salida = $funcion . "#&" . $ind_error1 ."#&" . $mensaje1 . "#&" . $ind_error2 
                . "#&" . $mensaje2 . "#&" . $ind_orden . "#&" . $fechaSSAA_MM_DD1 .  "#&" . $fechaSSAA_MM_DD2 
                . "#&" . $dif_total_dias . "#&" . $dif_annos . "#&" . $dif_meses . "#&" . $dif_dias;
            
            }
    } else {
            $funcion = $funcion_validar_fecha;
            $ind_error1 = $ind_validar;
            $mensaje1 = $mensaje;
            $ind_error2 = 0;
            $mensaje2 = "";
            $ind_orden = 0;
            $fechaSSAA_MM_DD1 = $fecha;
            $fechaSSAA_MM_DD2 = "";
            $dif_total_dias = 0;
            $dif_annos = 0;
            $dif_meses = 0;
            $dif_dias = 0;
            $campos_salida = $funcion . "#&" . $ind_error1 ."#&" . $mensaje1 . "#&" . $ind_error2 
                . "#&" . $mensaje2 . "#&" . $ind_orden . "#&" . $fechaSSAA_MM_DD1 .  "#&" . $fechaSSAA_MM_DD2 
                . "#&" . $dif_total_dias . "#&" . $dif_annos . "#&" . $dif_meses . "#&" . $dif_dias;
            
        }
    $respuesta = $ind_validar . "#&" . $mensaje . "#&" . $campos_salida;
    return [$respuesta];
}

function comparar_fechas($fecha_inicial, $fecha_final){
    /*
     Función 2 Comparar fechas
    */  
        $ind_validar = 0;
        
        $campos_funcion = $fecha_inicial. "#&" . $fecha_final;

        $funcion_comparar_fecha = 3;
        list($ind_validar, $mensaje, $campos_salida) 
                        = fechas($funcion_comparar_fecha, $campos_funcion); 
        
        $respuesta = $ind_validar . "#&" . $mensaje . "#&" . $campos_salida;
        return [$respuesta];
    }

?>