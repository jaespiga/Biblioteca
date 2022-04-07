<?php

require '../rutinas/Fechas_tratamientos.php';  // Funciones de validación de fechas

   /* Tratamiento de fechas (función, ....campos necesarios para esa función ....)
    Las fechas válidas serán con formato ssaa-mm-dd donde "-" es un delimitador 
   
   */

$funcion = $_POST['param0'];

if ($funcion==1) {
    $fecha = trim($_POST['param1']);         // fecha a validar
    $annos = intval(trim($_POST['param2'])); // años a restar/sumar a fecha del día
    $meses = intval(trim($_POST['param3'])); // meses a restar/sumar a fecha del día
    $dias = intval(trim($_POST['param4']));  // dias a restar/sumar a fecha del día

    list($respuesta) = calcular_fecha($fecha, $annos, $meses, $dias);
}
echo ($respuesta);

function calcular_fecha($fecha, $annos, $meses, $dias){
/*
 Función 1 Comparar fechas
        - Validar fecha.
        - Obtener fecha del día.
        - Calcular fecha referencia (a partir de la del día) en función de los años, meses, día  
        - Comparar fechas
*/  
    $ind_validar = 0;
    $mensaje = "";
    $campos_salida = "";      
    
    if ($fecha !== "") {
        $campos_funcion = $fecha;

        $funcion_validar_fecha = 1;
        list($ind_validar, $mensaje, $campos_salida) 
                                = fechas($funcion_validar_fecha, $campos_funcion);
        
        if ($ind_validar == 0) {
            // Obtener límite de fecha a no sobrepasar a partir de la del día
            $fechaactual = date('Y-m-d'); // Fecha del día
            $campos_funcion = $fechaactual. "#&" . $annos . "#&" . $meses . "#&" . $dias;

            $funcion_calcular_fecha = 2;
            list($ind_validar, $mensaje, $campos_salida) 
                                = fechas($funcion_calcular_fecha, $campos_funcion);

            if ($ind_validar == 0) {
                $elemento = explode ("#&", $campos_salida);
                $campos_funcion = $fecha. "#&" . $elemento[1];

                $funcion_comparar_fecha = 3;
                list($ind_validar, $mensaje, $campos_salida) 
                                = fechas($funcion_comparar_fecha, $campos_funcion);     
            }    
        }    
    }
    $respuesta = $ind_validar. "#&" . $mensaje . "#&" . $campos_salida;
    return [$respuesta];
}

?>
