
<?php 
	if ($IndActClave == 0) {

		$sql= "UPDATE tgr01_acceso
					SET	cGR01_Nombre = '$nombreUsuario',
						cGR01_NAutGral = '$NAutGral'
					WHERE cGR01_Usuario = '$codigoUsuario'";

	}	else {
			$administrador_id = $_SESSION['administrador_id'];

			$sql= "UPDATE tgr01_acceso
					SET	cGR01_Clave = '$claveUsuario', 
						cGR01_Nombre = '$nombreUsuario',
						cGR01_NAutGral = '$NAutGral',
						cGR01_Usuario_ModClave = '$administrador_id'
					WHERE cGR01_Usuario = '$codigoUsuario'";
			}	
	
	if($dbcon->query($sql) === true){
		$mensaje = "Actualización efectuada <br />";

	} else {
			require_once 'basedatos/errores_db.php';			/* Función para analizar errores DB */ 
		} 
?>