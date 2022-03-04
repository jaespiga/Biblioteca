<?php 

function leerDatosUsuario(){ 

    require_once '../basedatos/connect.php';
    
    $param_usuario= $_POST['param1'];
    
    $sql="SELECT cGR01_Usuario, cGR01_Clave, cGR01_Nombre, cGR01_NAutGral FROM tgr01_acceso 
            WHERE cGR01_Usuario = '$param_usuario' 
            ORDER BY cGR01_Usuario";

    $resultados= $dbcon->query($sql);

    while($fila = $resultados->fetch_assoc()) { 
           $datos = $fila["cGR01_Usuario"]. "#&" . $fila["cGR01_Clave"] . "#&" . $fila["cGR01_Nombre"] . "#&" . $fila["cGR01_NAutGral"]; 
        }
       
    return $datos;
}
echo leerDatosUsuario();

?>