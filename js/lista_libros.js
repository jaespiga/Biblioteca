$(document).ready(function(){     /* Ejecutar cuando la página esté cargada */
  usuario = $(this).val();
  $.ajax({                        
    type: 'POST',                 
    url: 'basedatos/cargar_lista_autores.php',
    data: {param1: usuario}                  
  })    
  .done(function(lista_select){
    $('#lista_autores').html(lista_select)
  })
  .fail(function(){
    alert('Hubo un error al cargar autores');                
  })            
})
