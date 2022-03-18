
<?php
// Validación campos de formulario de autor
function validarSubmit($campos) {
    $res = explode("#&", $campos);
    echo ("campos: " + $campos);

    $mensaje_error = "";

    // Validar clave de la página web activa
    if ($res[2] = "") { 
        $mensaje_error = "Nombre del autor tiene que estar informado";      
    }
    
    
    // Validar autor
    $datos = "";

    leerDatosAutor($res[2]);    

    $registro = explode("#&", $datos);

    echo ("Valor leído: " + $registro[0] + "   Valor pantalla: " + $res[2]);

    if ($registro[0] == $res[2]) {
        $ind_error = false;
    } else {
        $ind_error = true;       
        }
      
}
?>