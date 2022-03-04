<?php 												/* Conexión a la base de datos	*/
	session_start(); 

	require_once 'basedatos/connect.php'; 
?>


<!DOCTYPE html>
<!--
	Página WEB para el mantenimiento de la base de datos de usuarios del CPPP
-->
<html>
	<head>
	    
	    <title>Biblioteca. Baja de usuarios</title>
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

						if ($fila["cGR01_NAutGral"] == "09") {

							$sql="SELECT count(*)  FROM tgr01_acceso WHERE  cGR01_NAutGral = '09'";

							$contador= $dbcon->query($sql);
							$nrofilas = $contador->fetch_row();

							if ($nrofilas[0] < 2) {
							   $mensaje = "Baja rechazada. No existe más que este administrador.";
							}
						}

						if (empty($mensaje)) {
							
							$tratamientoSN_baja = "¿Confirma que quiere borrar clave de usuario?";	 
							
						}
					}	
				} else {$mensaje = "Error. Usuario no existe.";}
			} 	 
		?>  

		<!--  Tratamiento de mensaje para sacar por consola -->
		<?php require_once 'rutinas/TratarMensajes.php'; ?> 
			
	    <?php require_once "rutinas/cabecera.php"; ?> 			<!-- Cabecera estándar del CPPP en páginas Web	-->
	   
	    <h1>Baja de usuario</h1>
	    <div class = "opciones">    
			<a href="alta.php"> Alta</a> o
			<a href="mantenimiento.php"> Mantenimiento</a>
		</div>	 
		
		<form id="form_baja" method="post" action="baja.php">
				
			    <div class="container">	

			      <fieldset>	 
			      	<legend> Datos del usuario </legend>
			      	<div>
			      		<select id="lista_usuarios"  name="codigoUsuario"> </select>
			            <option id="lista_usuarios_opción">  </option>
			            
			      	</div>

			      	<div>
			      		<input type="text" id="NUsuario" placeholder="Nombre del usuario" name="nombreUsuario" disabled value='<?php echo $_POST['nombreUsuario']; ?>' />
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
			      
			      <input type="submit" value= "Eliminar"> 
    
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