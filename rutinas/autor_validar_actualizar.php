
<script>

// Validación campos de formulario de autor
function validarSubmitAutor() {
    // Validar autor
    <?php
    $autor = $_POST['autor'];
    

    $datos = "";

    leerDatosAutor($autor);  
    ?>    

    $res = explode("#&", $datos);

    echo ("Valor leído: " + $res[0] + "   Valor pantalla: " + $autor);

    if ($res[0] == $autor) {
        $ind_error = false;
    } else {
        $ind_error = true;       
        }
      
}
 echo ("indicador de error: " +  $ind_error);  

</script>
