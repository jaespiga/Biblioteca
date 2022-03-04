<?php
	session_start(); 									/* Inicializar las variables de sesión  */		

	require_once 'basedatos/connect.php'; 				/* Conexión a la base de datos	*/
	require_once 'rutinas/VerOculto.php';				/* Función para ver campos ocultos */

?>


<!DOCTYPE html>
<!--
	Página WEB de control para acceder a la aplicación de la biblioteca de usuarios
-->
<html>
	<head>
	    
	    <title>Biblioteca. </title>
	    <meta charset="utf-8">
	    <link rel="shortcut icon" href="design/images/favicon.ico"> 	<!-- Símbolo de la página Web en la pestaña	-->
	    
	    <!--
			Definición de estilos
		-->
		<link rel="stylesheet" href="bootstrap-5.1.3/css/bootstrap.min.css">
		<link href="design/styles/style.css" rel="stylesheet" type="text/css" media="screen"> 
		<link href="design/styles/style_acceso.css" rel="stylesheet" type="text/css" media="screen">
		<!--
			Scripts de bibliotecas públicas para el uso de funciones que facilitan la implantación de funcionalidades
		-->
		<?php require_once "script/externos"; ?> 

	</head>
	<body>
		<!--
			Validación de los datos de los datos del formulario que se defina más abajo
		--> 	

		<?php 
			
			if (!empty($_POST['codigoUsuario'])) {	

				$codigoUsuario= $_POST['codigoUsuario'];
				$claveUsuario = $_POST['claveUsuario'];
				
				$sql="SELECT cGR01_Usuario, cGR01_Clave, cGR01_NAutGral  FROM tgr01_acceso WHERE  cGR01_Usuario = '$codigoUsuario'";

				$resultados= $dbcon->query($sql);
				
				if ($resultados->num_rows > 0) {
						// output data of each row
					while($fila = $resultados->fetch_assoc()) {
						if ($fila["cGR01_Clave"] != "") {
							if (password_verify($claveUsuario, $fila["cGR01_Clave"])) {
				
								$_SESSION['usuario_id'] = $codigoUsuario;
								$_SESSION['nautorización'] = $fila["cGR01_NAutGral"];
								header('Location: lecturas.php');
								exit;
							} else {
	
								$mensaje = "Usuario y/o clave de usuario erróneos";
								}
						}		
					}		
				} else {
						$mensaje = "Dato de entrada desconocidos. Revise. ";
		
					}
			}					
			
		?>

		<!--  Tratamiento de mensaje para sacar por consola -->
		<?php require_once 'rutinas/TratarMensajes.php'; ?>
		
    	<!--
			Formulario validación del usuario
		--> 
		<div class="container.fluid"> 

	    <?php require_once "rutinas/cabecera.php" ?> 		<!-- Cabecera estándar en páginas Web	-->
		
		<div class="row">
			<div class="col-12 ">
				<h2 class="me-5 pe-4">Validación de acceso</h2>
			</div>
		</div>
		
		<nav class="navbar navbar-expand-lg navbar-light bg-light pt-5 pe-5 d-flex 
						align-items-center justify-content-center">
	
			<form action="acceso_pagina.php" method="post">	

				<div class="input-group-text border-primary col-12">
					<fieldset class="form-group form-control-sm ">	 
						<legend class="text-primary fs-5 fw-bold mt-3 mb-5 ms-1 border border-light border-1"> 
							Datos de acceso del usuario
						</legend>
						
						<input type="text" id="IdUsuario" placeholder="Identificación del usuario" 
						class="form-control border border-secondary border-1" 
						name="codigoUsuario"  required autofocus d-flex autocomplete="off">

						<div class="d-flex bloque_password ">
							<input type="password" id="Clave" placeholder="Clave de acceso" 
							class="form-control d-inline-flex form-control-sm mt-4 border border-secondary border-1" 
							name="claveUsuario">
							
							<button type="button" class="form-control d-inline-flex ojo form-control-sm" 
									onclick="VerPassword()">
								<svg class="bi" width="30" height="30" fill="currentColor">
									<use xlink:href="bootstrap-5.1.3\main\iconos\bootstrap-icons.svg#eye"/>
								</svg>
							</button>	
						</div>

						  
					</fieldset>
				</div> 

				<input type="submit" class= "btn btn-success btn-lg mt-5 form-control-sm" value="Validar">	
				 
			</form>
	
		</nav>
	</body>

</html>