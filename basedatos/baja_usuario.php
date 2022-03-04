<?php 

function bajaUsuario(){ 

    require_once '../basedatos/connect.php';
    
    $param_usuario= $_POST['param1'];
    
    $sql="DELETE FROM tgr01_acceso WHERE cGR01_Usuario = '$param_usuario'";

    $resultados= $dbcon->query($sql);
       
    return $param_usuario;
}
echo bajaUsuario();

?>