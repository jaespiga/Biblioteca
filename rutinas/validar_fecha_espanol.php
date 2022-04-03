<?php
   /* Tratamiento de fechas (función, ....campos necesarios para esa función ....)
    Las fechas válidas serán con formato ssaa-mm-dd donde "-" es un delimitador 
    Función: 1- Validar fecha
        Entrada: Función / Fecha
        Salida : Indicador de fecha correcta (0) o errónea (1)
    Función: 2- Validar fecha y sumar(+)/ restar(-) años, meses y/o días
        Entrada: Función / Fecha / años / meses / días a sumar restar
        Salida : Indicador de fecha correcta (0) o errónea (1)
                 Fecha calculada (nula si no ha podido ser calculada)
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
$fecha = trim($_POST['param1']);         // fecha a validar
$fecha = stripslashes($fecha);
$fecha = htmlspecialchars($fecha);
$annos = intval(trim($_POST['param2'])); // años a restar/sumar a fecha del día como frontera

validar_fecha_espanol($fecha, $annos);

function validar_fecha_espanol($fecha, $annos){
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
?>