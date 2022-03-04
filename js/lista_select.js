$(document).ready(function(){     /* Ejecutar cuando la página esté cargada */
  $.ajax({
    type: 'POST',
    url: 'basedatos/cargar_lista_usuarios.php'
  })
  .done(function(lista_select){
    $('#lista_usuarios').html(lista_select)
  })
  .fail(function(){
    alert('Hubo un error al cargar la lista de usuarios')
  })
})