
<?php 
// Tratamiento de las tablas de códigos
//
// Función 1. Leer la clave asociada a la descripción de la tabla de códigos  
//      Entrada: Función / Tabla / Descripción
//      Salida : Indicador de lectura (0) o errónea (1) / Clave 

function tabla_códigos($funcion, $tabla, $datos_entrada){

    $ind_validar = 0;       /* 0- correcto resto- error */
    $mensaje = "";
    $campos_salida = "";
    $res = explode("#&", $datos_entrada);

    switch ($funcion == 1) {
        case '1':
            $ind_validar = 0;       /* 0- correcto resto- error */
            $mensaje = "";
            $campos_salida = "";

            if ($res[0] !== "") {
                list($ind_validar, $mensaje, $fechaSSAA_MM_DD) = validar_fecha ($res[0]);
                if ($ind_validar == 0) {
                    $campos_salida = $funcion . "#&" . $fechaSSAA_MM_DD;    
                }   
            } 
            return [$ind_validar, $mensaje, $campos_salida]; 

        break;
        
        default:
            
        break;
    }
        
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
}

?>
