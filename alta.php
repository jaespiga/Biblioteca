
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
	    
	    <title>Biblioteca. Alta de usuarios</title>
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
				if ($_POST['NAutGral']=="09") {
					if (empty($_POST['claveUsuario'])) {
						$mensaje = "Error. Administrador no puede tener la clave sin informar";
					}
				} else {
					/* Comprobar si se trata del primer usuario para exigir que sea administrador */
						$sql = "SELECT cGR01_Usuario  FROM tgr01_acceso limit 1";
						$resultados= $dbcon->query($sql);
						if ($resultados->num_rows == 0)  {
							$mensaje = "Alta no efectuada. No existen usuarios. El primer usuario tiene que ser un administrador";					
						}
				}
				
				if (empty($mensaje)) {	
					$codigoUsuario= $_POST['codigoUsuario'];

					if (empty($_POST['claveUsuario'])) {
						$claveUsuario = "";
					} else {$claveUsuario = password_hash($_POST['claveUsuario'], PASSWORD_BCRYPT);
						}

					$nombreUsuario = $_POST['nombreUsuario'];
					$NAutGral = $_POST['NAutGral'];

					$administrador_id = $_SESSION['administrador_id'];
						
					$sql="INSERT INTO tgr01_acceso(cGR01_Usuario, cGR01_Clave, cGR01_Nombre, cGR01_NAutGral,  cGR01_Usuario_ModClave) VALUES ('$codigoUsuario', '$claveUsuario', '$nombreUsuario', '$NAutGral', '$administrador_id')";

					if($dbcon->query($sql) === true){
						$mensaje = "Alta efectuada <br />";

					} else {
							require_once 'basedatos/errores_db.php';			/* Función para analizar errores DB */ 
						} 
				}
			}			
		?>  
		
		<!--  Tratamiento de mensaje para sacar por consola -->
		<?php require_once 'rutinas/TratarMensajes.php'; ?>  	  
			
	    <?php require_once "rutinas/cabecera.php"; ?> 			<!-- Cabecera estándar del CPPP en páginas Web	-->
	    
	    <h1>Alta de usuario</h1>
	    <div class = "opciones">    
			<a href="mantenimiento.php"> Mantenimiento</a> o
			<a href="baja.php"> Baja</a>
		</div>	 

		<form action="alta.php" method="post">

			    <div class="container">	
			      <fieldset>	 
			      	<legend> Datos del usuario </legend>
			      	<div>
			      		<input type="text" id="IdUsuario" placeholder="Identificación del usuario" name="codigoUsuario" value='<?php echo $_POST['codigoUsuario']; ?>' required autofocus>
			      	</div>


				    <div>
				      	<input type="password" id="Clave" placeholder="Clave de acceso" name="claveUsuario" value='<?php echo $_POST['claveUsuario']; ?>' id="Clave"  class="grupo_botones">
							
						<img src="design/images/ojo.jpg" onclick="VerPassword()" alt="Ver clave" class="ojo" > 
					</div>   
			      				
			      	<div>
			      		<input type="text" id="NUsuario" placeholder="Nombre del usuario" name="nombreUsuario" value='<?php echo $_POST['nombreUsuario']; ?>' />
			      	</div>

			      </fieldset>		
			  
			      <fieldset class="boton_opciones">
				    <legend> Nivel de autorización </legend>
				      <div>

				      	<label for="Administrador" class="autorización">Administrador</label>
				      	<input type="radio" id="Administrador" name="NAutGral" value="09">

					    <label for="Usuario" class="autorización">Usuario</label>
					    <input type="radio" id="Usuario" name="NAutGral" value="01" checked>
				
					  </div>
					  	
				  </fieldset>
			      
			      <input type="submit" value= "Alta"> 
			      <input type="button" value= "Anular" id="borrar">      	    	
			    
		</form>

		<!--
			Script para la realización de funcionalidades personalizadas de la página
		-->
		<script type="text/javascript" src="js/salir_pantalla_mensajes.js"></script>  <!-- Salir pantalla mensajes -->

		<script type="text/javascript" src="js/pantalla_en_blanco.js"></script>  <!-- Inicializar datos pantalla -->

	</body>

</html>