<?php 

function leerListaUsuarios(){ 
	require_once '../basedatos/connect.php';

	$sql="SELECT cGR01_Usuario, cGR01_Nombre FROM tgr01_acceso order by cGR01_Usuario";

	$resultados= $dbcon->query($sql);

	$listas = '<option value="" disabled selected hidden>Seleccione usuario</option>';

    while($fila = $resultados->fetch_assoc()) {	
    		$listas .= "<option value='$fila[cGR01_Usuario]'>$fila[cGR01_Usuario]</option>";
    	}
	return $listas;
}

echo leerListaUsuarios();

?>
