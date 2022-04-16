$(document).ready(function(){     /* Ejecutar cuando la página esté cargada */
  $("#autores").each(function () {
    usuario = $('#autores').val();
    $.ajax({                        
      type: 'POST',                 
      url: 'basedatos/autores_cargar_lista.php',
      data: {param1: usuario}                  
    })    
    .done(function(lista_select){
        $('#lista_autores').html(lista_select)
    })
    .fail(function(){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error al cargar lista de autores',
        footer: '<a href="">Revise  datos de entrada y base de datos</a>'
      })                   
    })            
  })  
})
