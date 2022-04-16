<?php
require_once '../rutinas/Fechas_tratamientos_bloques.php';  // Bloques de operaciones sobre funciones de fechas
require_once '../rutinas/Fechas_tratamientos.php';  // Funciones de validación de fechas

   /* Tratamiento de fechas (función, ....campos necesarios para esa función ....)
    Las fechas válidas serán con formato ssaa-mm-dd donde "-" es un delimitador 
   
   */

$funcion = $_POST['param0'];

switch ($funcion) {  
    case 1: {     /* Función: 1- Calcular fecha a partir de una dada */

        $fecha = trim($_POST['param1']);         // fecha a validar
        $fecha_referencia = date('Y-m-d');       // Fecha del día
        $annos = intval(trim($_POST['param2'])); // años a restar/sumar a fecha del día
        $meses = intval(trim($_POST['param3'])); // meses a restar/sumar a fecha del día
        $dias = intval(trim($_POST['param4']));  // dias a restar/sumar a fecha del día

        list($respuesta) = validar_limites_fecha($fecha, $fecha_referencia, $annos, $meses, $dias);
    break;
    }

    case 2: {   /* Función: 2- Comparar fechas  */
            
        $fecha_inicial = trim($_POST['param1']);  // fecha inicial
        $fecha_final = trim($_POST['param2']); // fecha final       
            
        list($respuesta) = comparar_fechas($fecha_inicial, $fecha_final);
    break;
    } 
        
    default: {
        $respuesta = "";
    }
                
    break;
}

echo ($respuesta);


?>
