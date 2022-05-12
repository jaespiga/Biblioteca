
<?php
	// Análisis errores DB 
	
	if ($dbcon->errno !== 0) {
		switch ($dbcon->errno) {
		 	case '1062':
		 		$mensaje = "Operación NO efectuada. Clave ya existe";
		 		break;
		 	
		 	default:
		 		$mensaje = "Operación NO efectuada. Error: " .$dbcon->errno.". ".$dbcon->error;
		 		break;
		 } 
	} else {
			if ($dbcon->query($sql) !== true) {
				$mensaje = "Operación NO efectuada. Error: " . $dbcon->error;
			}
		}
?>



