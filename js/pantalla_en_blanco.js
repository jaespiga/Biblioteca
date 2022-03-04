/* borrar los campos de pantalla */ 
$(document).ready(function(){     /* Ejecutar cuando la página esté cargada */
	$("#borrar").click(function () {
	  document.getElementById("IdUsuario").value = "";
	  document.getElementById("Clave").value = ""
	  document.getElementById("NUsuario").value = ""
	  document.getElementById("Usuario").value = "01"	
	})
})

