
<?php 

$datos = "";

/* Leer datos del autor */
$buscar = trim($_POST['param1']);

leerDatosAutor($buscar);

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
?>
    