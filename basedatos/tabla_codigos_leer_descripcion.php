
<?php 
// Leer la clave asociada a la descripción de la tabla de códigos  
$ind_lectura = "0";
$bdatos_clave = 0;

if ($literal !== "") {
    require_once 'connect.php';

    $sql=	"SELECT cGR00_Tabla, cGR00_Clave, cGR00_Descripcion 
                    FROM tgr00_tcodigos
                    WHERE cGR00_Tabla = '$tabla'
                      AND cGR00_Descripcion = '$literal'";
                        
    $resultados= $dbcon->query($sql);

    if ($resultados->num_rows == 0)  {
        $ind_lectura = "1";   
        $bdatos_clave = 0;
    } else {
            $fila = $resultados->fetch_assoc();
            $ind_lectura = "0";   
            $bdatos_clave = $fila['cGR00_Clave'];
        };  
     
}  
   
?>
