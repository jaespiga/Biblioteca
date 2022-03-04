<?php
   /* Validar fecha */
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