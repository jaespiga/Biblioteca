/* Inicializar los campos de pantalla */ 
$(document).ready(function(){     /* Ejecutar cuando la página esté cargada */

	$("#resetear").click(function () {

	  $.ajax({
	    type: 'POST',
	    url: 'basedatos/cargar_lista_usuarios.php'
	  })
	  .done(function(lista_select){
	    $('#lista_usuarios').html(lista_select)
	    document.getElementById("Clave").value = ""
	    $('#IndClave').prop("checked", false)
	    document.getElementById("NUsuario").value = ""
	    $('#NAutGral1').prop("checked", true)
	  })
	  .fail(function(){
	    alert('Hubo un error al cargar la lista de usuarios')
	  })
	})
})

