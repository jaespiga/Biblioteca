<?php 
	function actualizarDatosUsuario(){ 

	    require_once '../basedatos/connect.php';
	    
	    $param_datos= $_POST['param1']; 

	    list($codigoUsuario, $claveUsuario, $nombreUsuario, $NAutGral) = explode("#&", $param_datos);
		
		$administrador_id = $_SESSION['administrador_id'];

		$IndActClave = 1;

		require_once '../basedatos/actualizar_datos_usuario.php';

		return $param_datos;	
	}
	echo actualizarDatosUsuario();	
?>