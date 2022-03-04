<?php 												/* Conexión a la base de datos	*/
	session_start(); 

	require_once 'basedatos/connect.php';  
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
			 
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0 bg-primary p-2 mb-0">
					
					<li class="nav-item">
						<form  method="post" class="row g-3">
							<div class="col-auto">
								<label for="autores" class="form-text text-light fs-4 ps-2 ">Autor</label>
							</div>	
							<div class="col-auto">
								<input type="text" id="autores" list="lista_autores" name="autor" autocomplete="off"
									class="form-control h-100 pb-0 fs-4">
								<datalist id="lista_autores"> </datalist>
							</div>
							<div class="col-auto">
								<button type="button" id="autoresDatos">
									<svg class="bi" width="30" height="30" fill="currentColor">
										<use xlink:href="bootstrap-5.1.3\main\iconos\bootstrap-icons.svg#search"/>
									</svg>
								</button>
							</div>
	
						</form>	
					</li>

					<li class="nav-item">
						<form class="row g-3">
							<div class="col-auto">
								<label for="libros" class="form-text text-light  fs-4 ps-5">Libros</label>
								</div>
							<div class="col-auto">	
								<input type="text" id="libros" list="lista_libros" name="libro" autocomplete="off"
								class="form-control h-100 pb-0 fs-4" >
								<datalist id="lista_libros">  </datalist>
							</div>
							<div class="col-auto">
								<button type="button" id="autoresDatos">
									<svg class="bi" width="30" height="30" fill="currentColor">
										<use xlink:href="bootstrap-5.1.3\main\iconos\bootstrap-icons.svg#search"/>
									</svg>
								</button>
							</div>
						</form>	
					</li>

				</ul>	
				
				<form class="d-flex">
					
					<button type="button" class="d-inline-flex btn btn-info btn-outline-success 
						me-5 mb-2 text-light fs-4" 
						data-bs-toggle="modal" data-bs-target="#autorNuevo">
						Alta lectura &nbsp;
						<svg class="bi" width="30" height="30" fill="currentColor">
							<use xlink:href="bootstrap-5.1.3\main\iconos\bootstrap-icons.svg#plus-square"/>
						</svg>
								
					</button>
				</form>	
			
				<form class="d-flex">
					
					<button type="button" class="d-inline-flex btn btn-warning btn-outline-success 
						me-5 mb-2 text-light fs-4" data-bs-toggle="modal">
						Filtros &nbsp;
						<svg class="bi" width="30" height="30" fill="currentColor">
							<use xlink:href="bootstrap-5.1.3\main\iconos\bootstrap-icons.svg#funnel"/>
						</svg>
								
					</button>
				</form>
        	</div>
    	</nav>



		<!--
			Script para la realización de funcionalidades personalizadas de la página
		-->
		<script type="text/javascript" src="js/lista_autores.js"></script>  <!-- Lista de opciones de datalist  -->
		<script type="text/javascript" src="js/lista_autores_cambio.js"></script>  <!-- Lista de opciones de datalist  -->

	</body>

</html>
