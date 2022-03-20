
<?php


$campos_pantalla = trim($_POST['param1']);

list($campos_bdatos, $ind_validar, $mensaje) = validarSubmit($campos_pantalla);

if ($ind_validar) {
    list($ind_validar, $mensaje) = actualizarSubmit($campos_bdatos);
}

$respuesta =  $ind_validar . "#&" .  $mensaje;

echo ($respuesta);


// Validación campos de formulario de autor
function validarSubmit($campos) {
   
    require_once 'connect.php';

    $ind_validar = true;
    $mensaje = "";

    $res = explode("#&", $campos);
    

    // Validar clave de la página web activa

    // Validar autor
    if ($res[2] == "") { 
        $mensaje = "Nombre del autor tiene que estar informado";  
        $ind_validar = false;  
        return [$campos, $ind_validar, $mensaje];  
    } else {
            $sql= "SELECT cGR02_Autor
                    FROM tgr02_autores
                    WHERE cGR02_Autor = '$res[2]'";  
                    
            $resultados= $dbcon->query($sql);

            if ($resultados->num_rows == 0)  {
                if ($res[1] !== "alta") {
                    $mensaje = "Error. Autor no existe.";  
                    $ind_validar = false;   
                    return [$campos, $ind_validar, $mensaje];  
                };
            } else {
                    if ($res[1] == "alta") {
                        $mensaje = "Error. Autor ya existe.";  
                        $ind_validar = false;   
                        return [$campos, $ind_validar, $mensaje];  
                    };
                }   
        }
    

    
    
    
}

// Actualización campos de formulario de autor
function actualizarSubmit($campos) {

}    
?>