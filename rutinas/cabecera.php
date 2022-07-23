<!--  Cabecera común a todas las páginas WEB -->

<div class="row h-75">
	<div class="col-2">
		<div class="card-body w-75 h-75">
			<a href= "/páginas WEB/Biblioteca">	
				<img	src="design/images/Biblioteca.jpg"
						class="rounded-circle border border-3 border-secondary img-fluid"
						alt="Imagen de una biblioteca"
				/>
			</a>	
		</div>
	</div>	

	<div class="col-7 text-dark h1 display-3 ps-5"> Biblioteca </div>

	<div class="col-3 py-4 pe-5">
		<div id="date">
			<h4><span class="day"><?php setlocale(LC_ALL,"es.utf8"); echo strftime("%A"); ?>
				</span> - <?php echo date('d/m/Y'); ?></h4> <!-- Fecha del día. Formato: día de la semana dd/mm/ssaa -->
		</div><!-- end date -->	
	</div>	

</div>