<?php 

/* Leer toda la información del Autor / Libros / Lecturas */

function leerDatosBDatos($apartado, $clave) { 

$ind_error = 1;
$mensaje = "Apartado " . $apartado . " desconocido";
$datos_salida = "";

if ($apartado == "Autor") {
    list($ind_error, $mensaje, $datos_salida) = leerDatosAutor($clave);
} else {
        if ($apartado == "Libro") {
            list($ind_error, $mensaje, $datos_salida) = leerDatosLibro($clave);
        } else {
                if ($apartado == "Lectura") {
                    list($ind_error, $mensaje, $datos_salida) = leerDatosLectura($clave);
                }   
            } 
    }

return[$ind_error, $mensaje, $datos_salida];

}

function leerDatosAutor($lit_autor) { 

    require 'connect.php';
    
    $ind_error = 0;
    $mensaje = "";
    $datos_salida = "";

    if($lit_autor !== ""){
        $sql= "SELECT cGR02_Autor, cGR02_Foto, cGR02_FNacimiento, cGR02_FDefunción, cGR02_LNacimiento, 
                        cGR02_PNacimiento, cGR02_LFallecimiento, cGR02_PFallecimiento,
                        cGR02_Nacionalidad, cGR02_CLiteraria, cGR02_WEB, cGR02_TSUltCambio 
                FROM tgr02_autores
                WHERE cGR02_Autor = '$lit_autor'";
        
        $resultados= $dbcon->query($sql); 
        
        if ($dbcon->errno == 0){          
            if ($resultados->num_rows == 0)  {
                $datos_salida= "";
            } else {
                    $fila = $resultados->fetch_assoc();
                    $datos_salida = $fila["cGR02_Autor"]. "#&" . $fila["cGR02_Foto"]
                            . "#&" . $fila["cGR02_FNacimiento"] . "#&" . $fila["cGR02_FDefunción"]
                            . "#&" . $fila["cGR02_LNacimiento"] . "#&" . $fila["cGR02_PNacimiento"]
                            . "#&" . $fila["cGR02_LFallecimiento"] . "#&" . $fila["cGR02_PFallecimiento"]
                            . "#&" . $fila["cGR02_Nacionalidad"] . "#&" . $fila["cGR02_CLiteraria"] 
                            . "#&" . $fila["cGR02_WEB"]. "#&" . $fila["cGR02_TSUltCambio"];    
                }      
        } else {
                require '../basedatos/errores_db.php';			/* Función para analizar errores DB */ 
                $ind_error = 1;
            }
    } 
    return [$ind_error, $mensaje, $datos_salida];
}

function leerDatosLibro($lit_libro) { 

    require 'connect.php';
    $ind_error = 0;
    $mensaje = "";
    $datos_salida = "";

    if($lit_libro !== ""){
        $sql= "SELECT cGR03_Título, cGR03_Autor, cGR03_Editorial, cGR03_FPublicación, cGR03_FAdquisición, 
                        cGR03_Idioma, cGR03_Soporte, cGR03_Género, cGR03_Propietario, cGR03_Sinopsis, 
                        cGR03_Estado_S, cGR03_Estado_Q_U, cGR03_Estado_F, cGR03_WEB, cGR03_TSUltCambio 
                FROM tgr03_libros
                WHERE cGR03_Título = '$lit_libro'";
        
        $resultados= $dbcon->query($sql); 
        
        if($dbcon->errno == 0){
            
            if ($resultados->num_rows == 0)  {
                $datos_salida= "";
            } else{
                    $fila = $resultados->fetch_assoc();
                    $datos_salida = $fila["cGR03_Título"] . "#&" . $fila["cGR03_Autor"] 
                    . "#&" . $fila["cGR03_Editorial"] . "#&" . $fila["cGR03_FPublicación"] 
                    . "#&" . $fila["cGR03_FAdquisición"] . "#&" . $fila["cGR03_Idioma"] 
                    . "#&" . $fila["cGR03_Soporte"] . "#&" . $fila["cGR03_Género"] 
                    . "#&" . $fila["cGR03_Propietario"] . "#&" . $fila["cGR03_Sinopsis"] 
                    . "#&" . $fila["cGR03_Estado_S"] . "#&" . $fila["cGR03_Estado_Q_U"] 
                    . "#&" . $fila["cGR03_Estado_F"] . "#&" . $fila["cGR03_WEB"] 
                    . "#&" . $fila["cGR03_TSUltCambio"];  
                }      
        } else {
                require '../basedatos/errores_db.php';			/* Función para analizar errores DB */ 
                $ind_error = 1;
        }
    } 
    return [$ind_error, $mensaje, $datos_salida];
}

function leerDatosLectura($lit_lectura) { 

    require 'connect.php';
    $ind_error = 0;
    $mensaje = "";
    $datos_salida = "";

    if($lit_lectura !== ""){
        $sql= "SELECT cGR04_Lector, cGR04_Título, cGR04_Autor, cGR04_IdLectura, cGR04_FIniLectura, 
                        cGR04_FFinLectura, cGR04_Calificacion, cGR04_Opinión, cGR04_TSUltCambio 
                FROM tgr04_lecturas
                WHERE cGR04_Lector = '$lit_lectura'";
        
        $resultados= $dbcon->query($sql); 
        
        if($dbcon->errno == 0){
            
            if ($resultados->num_rows == 0)  {
                $datos_salida= "";
            } else{
                    $fila = $resultados->fetch_assoc();
                    $datos_salida = $fila["cGR04_Lector"] . "#&" . $fila["cGR04_Título"] 
                    . "#&" . $fila["cGR04_Autor"] . "#&" . $fila["cGR04_IdLectura"] 
                    . "#&" . $fila["cGR04_FIniLectura"] . "#&" . $fila["cGR04_FFinLectura"] 
                    . "#&" . $fila["cGR04_Calificacion"] . "#&" . $fila["cGR04_Opinión"] 
                    . "#&" . $fila["cGR04_TSUltCambio"];  
                }      
        } else {
                require '../basedatos/errores_db.php';			/* Función para analizar errores DB */ 
                $ind_error = 1;
        }
    } 
    return [$ind_error, $mensaje, $datos_salida];
}

?>