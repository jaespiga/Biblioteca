<?php 
	/* Tratamiento de libros: alta, edición, baja, consultas	*/
	
	session_start(); 						/* Inicializar las variables de sesión  */

	require_once 'basedatos/connect.php';  /* Conexión a la base de datos	*/

    require_once 'rutinas/recuperar_datos_pantalla.php';  /* Función para informar datos de la pantalla de autor */
	require_once 'rutinas/borrar_datos.php';  /* Función para confirmar el borrado */
	/*
	Scripts de bibliotecas públicas para el uso de funciones que facilitan la implantación de funcionalidades
	*/
 	require_once "script/externos";  
?> 

<!DOCTYPE html>
<!--
	Página Web con las lecturas de ese usuario 
-->
<html>
	<head>
	    
	    <title>Biblioteca. Libros</title>
	    <meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">

	    <link rel="shortcut icon" href="design/images/favicon.ico" > 	<!-- Símbolo de la página Web en la pestaña -->
	    <!--
			Definición de estilos
		-->
		<link rel="stylesheet" href="bootstrap-5.1.3/css/bootstrap.min.css">
		<link rel="stylesheet" href="design/styles/style.css" type="text/css" media="screen"> 
		
		
	</head>
	<body>

		<?php require_once 'rutinas/ControlSesion.php'; ?>
		<!--
			Pantalla de autores
		--> 
		<div class="container.fluid"> 

		<?php require_once "rutinas/cabecera.php"; ?>  	<!-- Cabecera estándar en páginas Web	-->
		
		<div class="row">
			<div class="col-12 ">
				<h2 class="me-5 pe-4">Libros</h2>
			</div>
		</div>	
		
		<nav class="navbar navbar-expand-lg navbar-light bg-light p-3  align-items-center justify-content-center
					 mt-0 me-5 pe-4">
            
			<a class="navbar-brand" href="autores.php">
				<span class="text-danger fs-5 fw-bold"> Autores</span>
			</a>	
            
			<span class="pe-3 fs-3 fw-bold"> / </span>

			<a class="navbar-brand" href="lecturas.php">
				<span class="text-danger fs-5 fw-bold">Lecturas</span>
			</a>
			
    	</nav>
	
		<nav class="navbar navbar-expand-lg navbar-light bg-orange p-3 h-50" >
			 
			<div class="d-flex collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0 bg-primary p-2 mb-0">
					<li class="nav-item">
						<form  method="post" class="row g-4 mb-0">
							<div class="col-auto">
								<label for="libros" class="form-text text-light fs-4 ps-2 ">Libro</label>
							</div>	
							<div class="col-auto">
								<input type="text" id="libros" list="lista_libros" name="libro" autocomplete="off"
									class="form-control h-100 pb-0 fs-4">
								<datalist id="lista_libros"> </datalist>
							</div>
							<div class="col-auto">
								<button type="button" id="librosDatos">
									<svg class="bi" width="30" height="30" fill="currentColor">
										<use xlink:href="bootstrap-5.1.3\main\iconos\bootstrap-icons.svg#search"/>
									</svg>
								</button>
							</div>
						</form>	
					</li>
				</ul>	

				<form>
					<button type="button" class="d-inline-flex btn btn-info btn-outline-success 
						me-5 mb-0 text-light fs-4" 
						data-bs-toggle="modal" data-bs-target="#libroNuevo"
						onclick="libroInicializarDatosPantalla()"> Alta libro &nbsp;

						<svg class="bi" width="30" height="30" fill="currentColor">
							<use xlink:href="bootstrap-5.1.3\main\iconos\bootstrap-icons.svg#plus-square"/>
						</svg>								
					</button>
				</form>	
			
				<form>
					<button class="d-inline-flex btn btn-warning btn-outline-success me-5 mb-0 text-light fs-4"
						data-bs-toggle="collapse" type="button">Filtros  &nbsp;
						<svg class="bi" width="30" height="30" fill="currentColor">
							<use xlink:href="bootstrap-5.1.3\main\iconos\bootstrap-icons.svg#funnel"/>
						</svg>
					</button>
				</form>
        	</div>
    	</nav>

		<div class="row">
			<div class="col-12 ">
				<div id="tabla_libros"> </div>
			</div>
		</div>
		 
		<?php 
			// Pantallas modales a las que se puede acceder en la página 
			require_once "Modales/libroNuevo"; 
			require_once "Modales/libroEdicion"; 
			require_once "Modales/libroFiltro"; 
		?> 	
		
		<!--
			Script para la realización de funcionalidades personalizadas de la página
		-->
		
		<script type="text/javascript" src="js/consulta_web.js"></script>  <!-- Buscar en Google  -->
		
		<script type="text/javascript" src="js/libro_validar_formulario.js"></script>  <!-- validar datos libro: Alta  -->
		<script type="text/javascript" src="js/libro_validar_formulario_edicion.js"></script>  <!-- validar datos libro: Edición  -->
		<script type="text/javascript" src="js/libro_validar_actualizar.js"></script>  <!-- validar y actualizar datos autor  -->

		<script type="text/javascript" src="js/lista_libros.js"></script>  <!-- Lista de opciones de datalist  -->
		<script type="text/javascript" src="js/lista_libros_cambio.js"></script>  <!-- Lista de libros dinámica  -->
		<script type="text/javascript" src="js/lista_libros_datos.js"></script>  <!-- Lista libros y sus datos  -->
		<!--
			Script para cargar las tablas de códigos
		-->
		<script  id="tabla_nacionalidad" data-clave="Nacionalidad"
				src="js/lista_tabla_codigos_nacionalidad.js"></script>  <!-- Lista nacionalidades  -->
		<script  id="tabla_nacionalidad_cambio" data-clave="Nacionalidad"
				src="js/lista_tabla_codigos_nacionalidad_cambio.js"></script>  <!-- Lista nacionalidades ordenado por tecleo  -->		
		
		<script  id="tabla_clit" data-clave="CLiteraria"
				src="js/lista_tabla_codigos_clit.js"></script>  <!-- Lista corrientes literarias  -->
		<script  id="tabla_clit_cambio" data-clave="CLiteraria"
				src="js/lista_tabla_codigos_clit_cambio.js"></script>  <!-- Lista corrientes literarias  ordenado por tecleo  -->

		<script  id="tabla_paises" data-clave="País"
				src="js/lista_tabla_codigos_paises.js"></script>  <!-- Lista países  -->	
		<script  id="tabla_paises_cambio" data-clave="País"
				src="js/lista_tabla_codigos_paises_cambio.js"></script>  <!-- Lista países ordenados por tecleo  -->									

		<script type="text/javascript" src="js/validar_codigos.js"></script>  <!-- Validar códigos de la pantalla  -->

	</body>

</html>