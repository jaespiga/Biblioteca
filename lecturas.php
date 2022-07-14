<?php 												/* Conexión a la base de datos	*/
	session_start(); 

	require_once 'basedatos/connect.php';  

	require_once 'rutinas/recuperar_datos_pantalla.php';  /* Función para informar datos de la pantalla de libros */
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
	    
	    <title>Biblioteca. Lecturas</title>
	    <meta charset="utf-8">
	    <link rel="shortcut icon" href="design/images/favicon.ico" > 	<!-- Símbolo de la página Web en la pestaña -->
	    <!--
			Definición de estilos
		-->
		<link rel="stylesheet" href="bootstrap-5.1.3/css/bootstrap.min.css">
		<link rel="stylesheet" href="design/styles/style.css" type="text/css" media="screen"> 
	
		<!--
			Scripts de bibliotecas públicas para el uso de funciones que facilitan la implantación de funcionalidades
		-->
		<?php require_once "script/externos"; ?> 
	</head>
	<body>

		<?php require_once 'rutinas/ControlSesion.php'; ?>
		<!--
			Pantalla de lecturas del usuario 
		--> 
		<div class="container.fluid"> 

		<?php require_once "rutinas/cabecera.php"; ?>  	<!-- Cabecera estándar en páginas Web	-->
		
		<div class="row">
			<div class="col-12 ">
				<h2 class="me-5 pe-4 mb-0">Historial de lecturas</h2>
			</div>
		</div>	
		<div class="row">
		<nav class="navbar navbar-expand-lg navbar-light bg-light p-3  align-items-center justify-content-center
					 mt-0 me-5 pe-5">
			
			<a class="navbar-brand" href="autores.php">
				<span class="text-danger fs-5 fw-bold">Autores</span>
			</a>

			<span class="pe-3 fs-3 fw-bold"> / </span>
			
			<a class="navbar-brand" href="libros.php">
				<span class="text-danger fs-5 fw-bold"> Libros</span>
			</a>	
    	</nav>
		</div>	
		<nav class="navbar navbar-expand-lg navbar-light bg-orange" >
			<div class="row  col-12"> 
				<div class="d-flex flex-wrap flex-xl-nowrap flex-column flex-md-row collapse navbar-collapse" 
							id="navbarSupportedContent">
					
						<ul class="navbar-nav me-auto mb-2 mb-lg-0 bg-primary p-2 mb-0">
							<li class="nav-item">
									<form class=" g-3">
										<div class="col-12 col-md-4 d-inline-flex w-100">
											<label for="lectores" class="form-text text-light  fs-4 pe-1">Lector</label>
											
											
											<input type="text" id="lectores" list="lista_lectores" name="lectores" 
													autocomplete="off" class="form-control h-100 pb-0 fs-4" >
											<datalist id="lista_lectores">  </datalist>
										
											<button type="button" class="lecturasDatos">
												<svg class="bi" width="30" height="30" fill="currentColor">
													<use xlink:href="bootstrap-5.1.3\main\iconos\bootstrap-icons.svg#search"/>
												</svg>
											</button>
										</div>
									</form>	
							</li>
							<li class="nav-item">
								<form class=" g-3">
									<div class="col-12 col-md-4 d-inline-flex w-100">
										<label for="libros" class="form-text text-light  fs-4 pe-1">Libro</label>
										
										
										<input type="text" id="libros" list="lista_libros" name="libro" 
											autocomplete="off"  class="form-control h-100 pb-0 fs-4 ps-3" >
										<datalist id="lista_libros">  </datalist>
									
										<button type="button" class="lecturasDatos">
											<svg class="bi" width="30" height="30" fill="currentColor">
												<use xlink:href="bootstrap-5.1.3\main\iconos\bootstrap-icons.svg#search"/>
											</svg>
										</button>
									</div>
								</form>	
							</li>

							<li class="nav-item">
								<form  method="post" class=" g-3">
								<div class="col-12 col-md-4 d-inline-flex w-100">
										<label for="autores" class="form-text text-light fs-4 ps-3 pe-1 ">Autor</label>
									
										<input type="text" id="autores" list="lista_autores" name="autor" autocomplete="off"
											class="form-control h-100 pb-0 fs-4">
										<datalist id="lista_autores"> </datalist>
									
										<button type="button" class="lecturasDatos">
											<svg class="bi" width="30" height="30" fill="currentColor">
												<use xlink:href="bootstrap-5.1.3\main\iconos\bootstrap-icons.svg#search"/>
											</svg>
										</button>
									</div>
			
								</form>	
							</li>

						</ul>	
					
					<div class="col-12 col-md-4 d-inline-flex">	
						<form class="d-flex">
							
							<button type="button" class="d-inline-flex btn btn-info btn-outline-success 
								me-5 mb-2 text-light fs-4 ms-5" 
								data-bs-toggle="modal" data-bs-target="#lecturaNuevo">
								Alta lectura &nbsp;
								<svg class="bi" width="30" height="30" fill="currentColor">
									<use xlink:href="bootstrap-5.1.3\main\iconos\bootstrap-icons.svg#plus-square"/>
								</svg>
										
							</button>
						</form>	
					
						<form class="d-flex">
							
							<button type="button" class="d-inline-flex btn btn-warning btn-outline-success 
								me-5 mb-2 text-light fs-4 ms-1" data-bs-toggle="modal">
								Filtros &nbsp;
								<svg class="bi" width="30" height="30" fill="currentColor">
									<use xlink:href="bootstrap-5.1.3\main\iconos\bootstrap-icons.svg#funnel"/>
								</svg>
										
							</button>
						</form>
					</div>	
				</div>
			</div>
    	</nav>

		<div class="row">
			<div class="col-12 ">
				<div id="tabla_lecturas"> </div>
			</div>
		</div>
		 
		<?php 
			// Pantallas modales a las que se puede acceder en la página 
			require_once "Modales/lecturaNuevo"; 
			require_once "Modales/lecturaEdicion"; 
			require_once "Modales/lecturaFiltro"; 

		?> 	
		
		<!-- 
			Script para la realización de funcionalidades personalizadas de la página
		-->
		
		<script type="text/javascript" src="js/consulta_web.js"></script>  <!-- Buscar en Google  -->
		
		<script type="text/javascript" src="js/lectura_validar_formulario.js"></script>  <!-- validar datos lectura: Alta  -->
		<script type="text/javascript" src="js/lectura_validar_formulario_edicion.js"></script>  <!-- validar datos lectura: Edición  -->
		<script type="text/javascript" src="js/lectura_validar_actualizar.js"></script>  <!-- validar y actualizar datos autor  -->
		
		<script type="text/javascript" src="js/libro_lista_clave.js"></script>  <!-- Lista de opciones de datalist  -->
		<script type="text/javascript" src="js/autor_lista_clave.js"></script>  <!-- Lista de opciones de datalist  -->
		<script type="text/javascript" src="js/lista_datos.js"></script>  <!-- Lista lecturas y sus datos  -->
		<!--
			Script para cargar las tablas de códigos
		-->
		
		<script  id="tabla_lector" data-clave="Lector"
				src="js/lista_tabla_codigos_lector.js"></script>  <!-- Lista lectores  -->
		<script  id="tabla_lector_cambio" data-clave="Lector"
				src="js/lista_tabla_codigos.js"></script>  <!-- Lista lectores ordenado por tecleo  -->
		
		<script  id="tabla_idioma" data-clave="Idioma"
				src="js/lista_tabla_codigos_idioma.js"></script>  <!-- Lista idiomas  -->
		<script  id="tabla_idioma_lectura_cambio" data-clave="Idioma"
				src="js/lista_tabla_codigos.js"></script>  <!-- Lista idiomas ordenado por tecleo  -->
	
		<script type="text/javascript" src="js/validar_codigos.js"></script>  <!-- Validar códigos de la pantalla  -->

	</body>

</html>
