
<!--  Tratamiento de mensaje para sacar por consola -->
<?php 
	if (!empty($mensaje)):  ?>
		<script type="text/javascript">
			Swal.fire({
                        position: 'top',
                        icon: 'error',
                        title: '<?php echo $mensaje ?>',
                        showConfirmButton: false,
                        timer: 3000
                    })
		</script>
<?php endif; ?>	

<!--  Tratamiento de opción de aceptación para sacar por consola para el caso de mantenimiento-->
<?php 
	if (!empty($tratamientoSN_mto)):  ?>
		<div class="tratamientoSN">
		  <div class="tratamientoSN-contenido">
		  	<h3><?php echo $tratamientoSN_mto ?></h3>
		  	<form id="form_respuestaSN_mto" method="post">
			    
			    <button type="button" class= "tratamientoSN-resp tratamientoSN_sí" name ="respuestaSN_mto_Sí" onclick="función_respuestaSN_mto_Sí('<?php echo $datos ?>')" > Sí </button>

			     <button type="button" class= "tratamientoSN-resp tratamientoSN_no" name ="respuestaSN_mto_No" onclick="función_respuestaSN_mto_No('<?php echo $codigoUsuario ?>')" > No </button>

			</form>    
		  </div>  
		</div>
		<div id="mto_Sí" class="mensaje-contenido" style="display:none">
            Actualización realizada
        </div>
        <div id="mto_No" class="mensaje-contenido" style="display:none">
            Actualización cancelada
        </div>
		
<?php endif;?>	

<!--  Tratamiento de opción de aceptación para sacar por consola para el caso de baja-->
<?php 
	if (!empty($tratamientoSN_baja)):  ?>
		<div class="tratamientoSN">
		  <div class="tratamientoSN-contenido">
		  	<h3><?php echo $tratamientoSN_baja ?></h3>
		  	<form id="form_respuestaSN_baja" method="post">
			    
			    <button type="button" class= "tratamientoSN-resp tratamientoSN_sí" name ="respuestaSN_baja_Sí" onclick="función_respuestaSN_baja_Sí('<?php echo $codigoUsuario ?>')" > Sí </button>

			     <button type="button" class= "tratamientoSN-resp tratamientoSN_no" name ="respuestaSN_baja_No" onclick="función_respuestaSN_baja_No('<?php echo $codigoUsuario ?>')" > No </button>

			</form>    
		  </div>  
		</div>
		<div id="baja_Sí" class="mensaje-contenido" style="display:none">
            Baja realizada
        </div>
        <div id="baja_No" class="mensaje-contenido" style="display:none">
            Baja cancelada
        </div>
		
<?php endif;?>	


