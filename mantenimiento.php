
<?php 												/* Conexión a la base de datos	*/
	session_start(); 

	require_once 'basedatos/connect.php'; 
	require_once 'rutinas/VerOculto.php';				/* Función para ver campos ocultos */
?>


<!DOCTYPE html>
<!--
	Página WEB para el mantenimiento de la base de datos de usuarios del CPPP
-->
<html>
	<head>
	    
	    <title>Biblioteca. Mto de usuarios</title>
	    <meta charset="utf-8">
	    <link rel="shortcut icon" href="design/images/favicon.ico"> 	<!-- Símbolo de la página Web en la pestaña	-->
	    
	    <!--
			Definición de estilos
		-->
		<link rel="stylesheet" href="design/styles/style.css" type="text/css" media="screen"> 
		<link rel="stylesheet" href="design/styles/style_datos.css" type="text/css" media="screen">
		<link rel="stylesheet" href="design/styles/style_mensajes.css" type="text/css" media="screen">

		<!--
			Bibliotecas públicas para el uso de funciones que facilitan la implantación de funcionalidades
		-->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

	</head>
	<body>
		
		<?php require_once 'rutinas/ControlSesion.php'; ?>

		<?php
			if (!empty($_POST['codigoUsuario'])) {			
				$codigoUsuario= $_POST['codigoUsuario'];
				$sql="SELECT cGR01_Usuario, cGR01_Clave, cGR01_Nombre, cGR01_NAutGral  FROM tgr01_acceso WHERE  cGR01_Usuario = '$codigoUsuario'";

				$resultados= $dbcon->query($sql); 
				
				if ($resultados->num_rows > 0) {
    					// output data of each row
    				while($fila = $resultados->fetch_assoc()) {	
    					if (empty($_POST['claveUsuario']) && empty($fila["cGR01_Clave"])) {
							$_POST['indClaveUsuario'] = 0;
							$IndActClave = 0;
						} else {	
								if (!empty($_POST['claveUsuario'])) {
									$_POST['indClaveUsuario'] = 1;
									$IndActClave = 1;
								} else { 
										if (empty($_POST['indClaveUsuario'])) {
											$IndActClave = 1;
										} else {
											$IndActClave = 0;}
									}
							}
						
						if ($_POST['NAutGral']=="09") {
							if (empty($_POST['indClaveUsuario'])) {
								$mensaje = "Error. Administrador no puede tener la clave sin informar";
							} 
						} else {
								if ($fila["cGR01_NAutGral"] == "09") {

									$sql="SELECT count(*)  FROM tgr01_acceso WHERE  cGR01_NAutGral = '09'";
		
									$contador= $dbcon->query($sql);
									$nrofilas = $contador->fetch_row();
		
									if ($nrofilas[0] < 2) {
										$mensaje = "Modificación rechazada. No existe más que este administrador.";
									}
								} 
							}
						if (empty($mensaje)) {
							
							$nombreUsuario = $_POST['nombreUsuario']; 
							$NAutGral = $_POST['NAutGral']; 

							if (!empty($fila["cGR01_Clave"]) && empty($_POST['indClaveUsuario'])) {
								$claveUsuario= "";
								$datos = $codigoUsuario. "#&" . $claveUsuario . "#&" . $nombreUsuario . "#&" . $NAutGral; 
								$tratamientoSN_mto = "¿Confirma que quiere borrar clave de usuario?";
								require_once 'rutinas/TratarMensajes.php';	 
							} else {
									if (empty($_POST['claveUsuario'])) {
										$claveUsuario= "";
									} else {$claveUsuario = password_hash($_POST['claveUsuario'], PASSWORD_BCRYPT);
										}

									require_once 'basedatos/actualizar_datos_usuario.php'; 
									
								}		
						}
					}	
				} else {$mensaje = "Error. Usuario no existe.";}
			} 	 
		?>  

		<!--  Tratamiento de mensaje para sacar por consola -->
		<?php require_once 'rutinas/TratarMensajes.php'; ?> 
			
	    <?php require_once "rutinas/cabecera.php"; ?> 			<!-- Cabecera estándar en páginas Web	-->
	   
	    <h1>Mantenimiento de usuario</h1>
	    <div class = "opciones">    
			<a href="alta.php"> Alta</a> o
			<a href="baja.php"> Baja</a>
		</div>	 
		
		<form id="form_datos_usuario" method="post" action="mantenimiento.php">

			    <div class="container">	

			      <fieldset>	 
			      	<legend> Datos del usuario </legend>

					  <div>
						<!--  Las opciones de la lista se obtienen a traves del script lista_select.js -->  
			      		<select id="lista_usuarios"  name="codigoUsuario" required autofocus >	</select>				            	
			      	</div>

				    <div> 
				      	<input type="password" placeholder="Clave de acceso. No informar si no se quiere cambiar." name="claveUsuario" id="Clave"  class="grupo_clave">
							
						<img src="design/images/ojo.jpg" onclick="VerPassword()" alt="Ver clave" class="ojo grupo_clave" > 
	
				       	<input type="checkbox" id="IndClave" class="IndClave" name="indClaveUsuario" >

				        <label for="IndClave" id="EtIndClave" class="IndClave">Indicador de existencia de clave. Sin marca no tiene clave.</label>
					</div>   
			      				
			      	<div>
			      		<input type="text" id="NUsuario" placeholder="Nombre del usuario" name="nombreUsuario" />
			      	</div>

			      </fieldset>		
			  
			      <fieldset class="boton_opciones">
				    <legend> Nivel de autorización </legend>
				      <div>

				        <label for="NAutGral9" class="autorización">Administrador</label>
				       	<input type="radio" id="NAutGral9" name="NAutGral" value="09" >
				        
				        <label for="NAutGral1" class="autorización">Usuario</label>
				        <input type="radio" id="NAutGral1" name="NAutGral" value="01">
				
					  </div>
					  	
				  </fieldset>
			      
			      <input type="submit" value= "Actualizar" id="procesar"> 
			      <input type="button" value= "Anular" id="resetear">   
    
		</form>

		<!--
			Script para la realización de funcionalidades personalizadas de la página
		-->
		<!-- Importante ponerlas en este orden	-->

		<script type="text/javascript" src="js/lista_select.js"></script>  <!-- Lista de opciones de select  -->

		<script type="text/javascript" src="js/datos_pantalla.js"></script>  <!-- Datos pantalla a partir select  -->

		<script type="text/javascript" src="js/salir_pantalla_mensajes.js"></script>  <!-- Salir pantalla mensajes -->

		<script type="text/javascript" src="js/inicializar_pantalla.js"></script>  <!-- Inicializar datos pantalla -->

		<script type="text/javascript" src="js/analizar_respuesta.js"></script>  <!-- Analizar respuesta -->
	

	</body>

</html>