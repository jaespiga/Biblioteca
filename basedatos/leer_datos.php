
<?php 

$datos = "";

/* Leer datos del autor */
$buscar = trim($_POST['param1']);
$apartado = $_POST['param2'];

if ($apartado = "Autor") {
    leerDatosAutor($buscar);
} else {
        if ($apartado = "Libro") {
            leerDatosLibro($buscar);
        } else {
                if ($apartado = "Lectura") {
                    leerDatosLectura($buscar);
                }    
            }
    }


function leerDatosAutor($lit_autor) { 

    require_once 'connect.php';
    
    if($lit_autor == ""){
            $datos= "";
    } else{
            $sql= "SELECT cGR02_Autor, cGR02_Nacionalidad, cGR02_PNacimiento, cGR02_LNacimiento,  cGR02_WEB
                        FROM tgr02_autores
                        WHERE cGR02_Autor = '$lit_autor'";
            $resultados= $dbcon->query($sql); 
            
            if ($resultados->num_rows == 0)  {
                $datos= "";
            } else{
                $fila = $resultados->fetch_assoc();
                $datos = $fila["cGR02_Autor"]. "#&" . $fila["cGR02_Nacionalidad"] . "#&" . $fila["cGR02_PNacimiento"] 
                        . "#&" . $fila["cGR02_LNacimiento"] . "#&" . $fila["cGR02_WEB"];  
            }    
    } 
    echo $datos;
}

function leerDatosLibro($lit_libro) { 

    require_once 'connect.php';
    
    if($lit_libro == ""){
            $datos= "";
    } else{
            $sql= "SELECT cGR03_Título, cGR03_Autor, cGR03_Editorial, cGR03_FPublicación, cGR03_FAdquisición, cGR03_Idioma, cGR03_Soporte, cGR03_Género, cGR03_Propietario, cGR03_Sinopsis, cGR03_Estado_S, cGR03_Estado_Q_U, cGR03_Estado_F, cGR03_WEB 
                        FROM tgr03_libros
                        WHERE cGR03_Título = '$lit_libro'";
            $resultados= $dbcon->query($sql); 
            
            if ($resultados->num_rows == 0)  {
                $datos= "";
            } else{
                $fila = $resultados->fetch_assoc();
                $datos = $fila["cGR02_Autor"]. "#&" . $fila["cGR02_Nacionalidad"] . "#&" . $fila["cGR02_PNacimiento"] 
                        . "#&" . $fila["cGR02_LNacimiento"] . "#&" . $fila["cGR02_WEB"];  
            }    
    } 
    echo $datos;
}

function leerDatosLectura($lit_lectura) { 

    require_once 'connect.php';
    
    if($lit_lectura == ""){
            $datos= "";
    } else{
            $sql= "SELECT cGR04_Lector, cGR04_Título, cGR04_Autor, cGR04_IdLectura, cGR04_FIniLectura, cGR04_FFinLectura, cGR04_Opinión 
                        FROM tgr04_lecturas
                        WHERE cGR04_Lector = '$lit_lectura'";
            $resultados= $dbcon->query($sql); 
            
            if ($resultados->num_rows == 0)  {
                $datos= "";
            } else{
                $fila = $resultados->fetch_assoc();
                $datos = $fila["cGR02_Autor"]. "#&" . $fila["cGR02_Nacionalidad"] . "#&" . $fila["cGR02_PNacimiento"] 
                        . "#&" . $fila["cGR02_LNacimiento"] . "#&" . $fila["cGR02_WEB"];  
            }    
    } 
    echo $datos;
}
?>
    