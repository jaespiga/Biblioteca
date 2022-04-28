
<?php 
// Tratamiento de las tablas de códigos
//
// Función 1. Leer la clave asociada a la descripción de la tabla de códigos  
//      Entrada: Función / Tabla / Descripción
//      Salida : Indicador de lectura (0) o errónea (1) / Clave 

function tabla_codigos($funcion, $tabla, $datos_entrada){

    $ind_validar = 0;       /* 0- correcto resto- error */
    $mensaje = "";
    $campos_salida = "";
    $res = explode("#&", $datos_entrada);

    switch ($funcion) {  
        case 1: {       // Función 1. Leer la clave asociada a la descripción de la tabla de códigos 
            $ind_error = 0;         /* 0- correcto resto- error */
            $ind_validar = 0;       /* 0- correcto 1- no existe clave para esa descripción */
            $mensaje = "";
            $campos_salida = 0;     /* clave asociada a la descripción */

            if ($res[0] !== "") {
                list($ind_error, $ind_validar, $mensaje, $campos_salida) 
                            = obtener_clave($tabla, $res[0]);
            } 
            return [$ind_error, $ind_validar, $mensaje, $campos_salida]; 

        break;
        }
        case 2: {       // Función 2. Leer la descripción asociada a una clave de la tabla de códigos 
            $ind_error = 0;         /* 0- correcto resto- error */
            $ind_validar = 0;       /* 0- correcto 1- no existe clave para esa descripción */
            $mensaje = "";
            $campos_salida = "";     /* descripción asociada a la clave */

            if ($res[0] !== "") {
                list($ind_error, $ind_validar, $mensaje, $campos_salida) 
                            = obtener_descripcion($tabla, $res[0]);
            } 
            return [$ind_error, $ind_validar, $mensaje, $campos_salida]; 

        break;
        }
        case 3: {       // Función 3. Dar de alta un nuevo código a partir de la descripción
            $ind_error = 0;         /* 0- correcto resto- error */
            $ind_validar = 0;       /* 0- correcto 1- no existe clave para esa descripción */
            $mensaje = "";
            $campos_salida = "";     /* descripción asociada a la clave */

            if ($res[0] !== "") {
                list($ind_error, $ind_validar, $mensaje, $campos_salida) 
                            = alta_clave_descripcion($tabla, $res[0]);
            } 
            return [$ind_error, $ind_validar, $mensaje, $campos_salida]; 

        break;
        }

        default:
            
        break;
    }
}

function obtener_clave ($nombre_tabla, $descripcion) { 
    // Obtener la clave numérica asociada a una descripción. Si no existe se devuelve 0.

    $ind_error = 0;
    $ind_validar = 0;
    $mensaje= "";
    $bdatos_clave = 0;

    if ($descripcion !== "") {
       
        require 'connect.php';

        $sql=	"SELECT cGR00_Tabla, cGR00_Clave, cGR00_Descripcion 
                        FROM tgr00_tcodigos
                        WHERE cGR00_Tabla = '$nombre_tabla'
                        AND cGR00_Descripcion = '$descripcion'";
                            
        $resultados= $dbcon->query($sql);

        if ($resultados->num_rows == 0)  {
            $ind_validar = 1;   
            $bdatos_clave = 0;
        } else {
                $fila = $resultados->fetch_assoc();
                $ind_validar = 0;   
                $bdatos_clave = $fila['cGR00_Clave'];
            };  
        
    } 
    return [$ind_error, $ind_validar, $mensaje, $bdatos_clave]; 
}

function obtener_descripcion ($nombre_tabla, $clave) { 
    // Obtener la descripción asociada a una clave numérica. Si no existe se devuelve "".

    $ind_error = 0;
    $ind_validar = 0;
    $mensaje= "";
    $bdatos_descripcion = "";

    if ($clave !== 0) {
       
        require 'connect.php';

        $sql=	"SELECT cGR00_Tabla, cGR00_Clave, cGR00_Descripcion 
                        FROM tgr00_tcodigos
                        WHERE cGR00_Tabla = '$nombre_tabla'
                        AND cGR00_Clave = '$clave'";
                            
        $resultados= $dbcon->query($sql);

        if ($resultados->num_rows == 0)  {
            $ind_validar = 1;   
            $bdatos_descripcion = "";
        } else {
                $fila = $resultados->fetch_assoc();
                $ind_validar = 0;   
                $bdatos_descripcion = $fila['cGR00_Descripcion'];
            };  
        
    } 
    return [$ind_error, $ind_validar, $mensaje, $bdatos_descripcion]; 
}

function alta_clave_descripcion ($nombre_tabla, $descripcion) { 
    // Dar de alta nuevo código para una descripción dada. Se comprueba que no exista antes.

    $ind_error = 0;
    $ind_validar = 0;
    $mensaje= "";
    $bdatos_clave = 0;

    if ($descripcion !== "") {
       
        require 'connect.php';

        $sql=	"SELECT cGR00_Tabla, cGR00_Clave, cGR00_Descripcion 
                        FROM tgr00_tcodigos
                        WHERE cGR00_Tabla = '$nombre_tabla'
                        AND cGR00_Descripcion = '$descripcion'";
                            
        $resultados= $dbcon->query($sql);

        if($dbcon->errno == 0){
			
            if ($resultados->num_rows == 0)  {
                $sql= "SELECT MAX(cGR00_Clave)
                        FROM tgr00_tcodigos
                        WHERE cGR00_Tabla = '$nombre_tabla'";

                
                if($dbcon->errno == 0){
                    $resultados= $dbcon->query($sql);
                    if ($resultados->num_rows == 0)  {
                        $max_clave = 1;
                    } else {    
                        $fila = $resultados->fetch_assoc(); 
                        $ind_validar = 0;   
                        $max_clave = $fila['MAX(cGR00_Clave)'] + 1;   // Máximo número de clave que existe para esa tabla
                        }

                    $sql="INSERT INTO tgr00_tcodigos(cGR00_Tabla, cGR00_Clave, cGR00_Descripcion) 
                               VALUES ('$nombre_tabla', '$max_clave', '$descripcion')";
                    
                    if($dbcon->errno == 0){
                        $ind_error = 0;
                        $bdatos_clave = $max_clave;
                    } else {
                            require '../basedatos/errores_db.php';			/* Función para analizar errores DB */ 
                            $ind_error = 1;
                        } 
                } else {
                    require '../basedatos/errores_db.php';			/* Función para analizar errores DB */ 
                    $ind_error = 1;
                    } 
                
            } else {
                    $ind_error = 1;  
                    $mensaje = "Error. Descripción ya existe.";
                }  
        } else {
            require '../basedatos/errores_db.php';			/* Función para analizar errores DB */ 
            $ind_actualizar = 1;
            } 
    } 
    return [$ind_error, $ind_validar, $mensaje, $bdatos_clave]; 
}

?>